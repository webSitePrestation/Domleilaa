#!/usr/bin/env node
/**
 * Supprime les métadonnées (EXIF, GPS, XMP, IPTC, commentaires) de tous les
 * fichiers de public/media avant le build.
 *
 *  - JPEG / PNG / WebP : nettoyage natif, sans ré-encodage (aucune perte).
 *  - Autres images (avif, gif, tiff…) : ré-encodage via `sharp` si disponible.
 *  - Vidéos (mp4, mov, m4v, webm) : `ffmpeg -c copy -map_metadata -1` si ffmpeg
 *    est installé. Sans ffmpeg, le script échoue uniquement si des marqueurs
 *    de métadonnées sensibles (GPS, EXIF) sont détectés dans le fichier.
 *    Contournement explicite : SKIP_VIDEO_EXIF=1.
 *
 * Usage : npm run strip-exif   (lancé automatiquement par `npm run build`)
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MEDIA_DIR = path.join(ROOT, 'public', 'media')

const JPEG_EXT = new Set(['.jpg', '.jpeg'])
const PNG_EXT = new Set(['.png'])
const WEBP_EXT = new Set(['.webp'])
const OTHER_IMAGE_EXT = new Set(['.avif', '.gif', '.tif', '.tiff', '.heic', '.heif'])
const VIDEO_EXT = new Set(['.mp4', '.m4v', '.mov', '.webm'])

/* ------------------------------------------------------------------ */
/* JPEG : retire APP1 (Exif/XMP), APP12-15 (IPTC, Adobe…) et COM        */
/* On garde APP0 (JFIF), APP2 (profil ICC) et APP14 (Adobe, couleur).   */
/* ------------------------------------------------------------------ */
function stripJpeg(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error('JPEG invalide')
  const out = [buf.subarray(0, 2)]
  let i = 2
  while (i < buf.length) {
    if (buf[i] !== 0xff) throw new Error('JPEG corrompu (marqueur attendu)')
    // Octets de bourrage 0xFF
    while (buf[i + 1] === 0xff) i++
    const marker = buf[i + 1]
    // Fin d'image ou début des données compressées : on recopie tout le reste.
    if (marker === 0xda || marker === 0xd9) {
      out.push(buf.subarray(i))
      break
    }
    // Marqueurs sans longueur
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) {
      out.push(buf.subarray(i, i + 2))
      i += 2
      continue
    }
    const length = buf.readUInt16BE(i + 2)
    const end = i + 2 + length
    const drop =
      marker === 0xe1 || // APP1 : Exif, XMP
      marker === 0xed || // APP13 : Photoshop / IPTC
      marker === 0xfe || // COM : commentaire
      (marker >= 0xe3 && marker <= 0xec) || // APP3 à APP12
      marker === 0xef // APP15
    if (!drop) out.push(buf.subarray(i, end))
    i = end
  }
  return Buffer.concat(out)
}

/* ------------------------------------------------------------------ */
/* PNG : retire eXIf, tEXt, zTXt, iTXt, tIME                           */
/* ------------------------------------------------------------------ */
function stripPng(buf) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  if (!buf.subarray(0, 8).equals(signature)) throw new Error('PNG invalide')
  const DROP = new Set(['eXIf', 'tEXt', 'zTXt', 'iTXt', 'tIME'])
  const out = [buf.subarray(0, 8)]
  let i = 8
  while (i < buf.length) {
    const length = buf.readUInt32BE(i)
    const type = buf.toString('latin1', i + 4, i + 8)
    const end = i + 12 + length
    if (!DROP.has(type)) out.push(buf.subarray(i, end))
    i = end
  }
  return Buffer.concat(out)
}

/* ------------------------------------------------------------------ */
/* WebP : retire les chunks EXIF et XMP, nettoie les drapeaux VP8X     */
/* ------------------------------------------------------------------ */
function stripWebp(buf) {
  if (buf.toString('latin1', 0, 4) !== 'RIFF' || buf.toString('latin1', 8, 12) !== 'WEBP') {
    throw new Error('WebP invalide')
  }
  const chunks = []
  let i = 12
  while (i + 8 <= buf.length) {
    const fourcc = buf.toString('latin1', i, i + 4)
    const size = buf.readUInt32LE(i + 4)
    const end = i + 8 + size + (size % 2)
    if (fourcc !== 'EXIF' && fourcc !== 'XMP ') {
      const chunk = Buffer.from(buf.subarray(i, Math.min(end, buf.length)))
      if (fourcc === 'VP8X') chunk[8] &= ~(0x08 | 0x04) // drapeaux EXIF (0x08) et XMP (0x04)
      chunks.push(chunk)
    }
    i = end
  }
  const body = Buffer.concat([Buffer.from('WEBP', 'latin1'), ...chunks])
  const header = Buffer.alloc(8)
  header.write('RIFF', 0, 'latin1')
  header.writeUInt32LE(body.length, 4)
  return Buffer.concat([header, body])
}

/* ------------------------------------------------------------------ */
/* Autres images : sharp (ré-encodage, sans métadonnées par défaut)     */
/* ------------------------------------------------------------------ */
async function stripWithSharp(file) {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    throw new Error('sharp est introuvable : impossible de nettoyer ce format')
  }
  return sharp(file, { animated: true }).rotate().toBuffer()
}

/* ------------------------------------------------------------------ */
/* Vidéos                                                              */
/* ------------------------------------------------------------------ */
function hasFfmpeg() {
  const res = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' })
  return res.status === 0
}

/** Marqueurs de métadonnées sensibles (GPS QuickTime / iTunes, EXIF). */
function suspectVideoMetadata(buf) {
  const markers = [
    Buffer.from([0xa9, 0x78, 0x79, 0x7a]), // « ©xyz » : coordonnées GPS
    Buffer.from('com.apple.quicktime.location', 'latin1'),
    Buffer.from('Exif', 'latin1'),
    Buffer.from('GPSLatitude', 'latin1'),
  ]
  return markers.some((m) => buf.includes(m))
}

async function stripVideo(file, ffmpegAvailable) {
  if (ffmpegAvailable) {
    const ext = path.extname(file)
    const tmp = `${file}.clean${ext}`
    const res = spawnSync(
      'ffmpeg',
      ['-y', '-loglevel', 'error', '-i', file, '-map', '0', '-map_metadata', '-1', '-c', 'copy', tmp],
      { stdio: ['ignore', 'ignore', 'pipe'] },
    )
    if (res.status !== 0) {
      await rm(tmp, { force: true })
      throw new Error(`ffmpeg a échoué : ${res.stderr?.toString().trim()}`)
    }
    await rename(tmp, file)
    return 'nettoyé (ffmpeg)'
  }
  const buf = await readFile(file)
  if (suspectVideoMetadata(buf) && process.env.SKIP_VIDEO_EXIF !== '1') {
    throw new Error(
      'métadonnées suspectes (GPS/EXIF) et ffmpeg est absent. Installe ffmpeg ou nettoie la vidéo à la main (SKIP_VIDEO_EXIF=1 pour ignorer).',
    )
  }
  return 'ffmpeg absent, aucun marqueur sensible détecté (non modifié)'
}

/* ------------------------------------------------------------------ */
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (entry.isFile()) files.push(full)
  }
  return files
}

async function main() {
  if (!existsSync(MEDIA_DIR)) await mkdir(MEDIA_DIR, { recursive: true })
  const files = await walk(MEDIA_DIR)

  let cleaned = 0
  let unchanged = 0
  let skipped = 0
  const errors = []
  let ffmpegChecked = false
  let ffmpegAvailable = false

  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    const rel = path.relative(ROOT, file)
    try {
      if (JPEG_EXT.has(ext) || PNG_EXT.has(ext) || WEBP_EXT.has(ext) || OTHER_IMAGE_EXT.has(ext)) {
        const original = await readFile(file)
        let result
        if (JPEG_EXT.has(ext)) result = stripJpeg(original)
        else if (PNG_EXT.has(ext)) result = stripPng(original)
        else if (WEBP_EXT.has(ext)) result = stripWebp(original)
        else result = await stripWithSharp(file)

        if (result.equals(original)) {
          unchanged++
        } else {
          await writeFile(file, result)
          cleaned++
          console.log(`  nettoyé   ${rel}`)
        }
      } else if (VIDEO_EXT.has(ext)) {
        if (!ffmpegChecked) {
          ffmpegAvailable = hasFfmpeg()
          ffmpegChecked = true
          if (!ffmpegAvailable) console.warn('  ! ffmpeg introuvable : les vidéos ne peuvent pas être nettoyées.')
        }
        const status = await stripVideo(file, ffmpegAvailable)
        if (status.startsWith('nettoyé')) cleaned++
        else skipped++
        console.log(`  ${status.padEnd(9)} ${rel}`)
      } else {
        skipped++ // .gitkeep, etc.
      }
    } catch (error) {
      errors.push(`${rel} : ${error.message}`)
    }
  }

  console.log(
    `strip-exif : ${files.length} fichier(s), ${cleaned} nettoyé(s), ${unchanged} déjà propre(s), ${skipped} ignoré(s).`,
  )

  if (errors.length > 0) {
    console.error('\nstrip-exif : ERREUR, build interrompu pour éviter de publier des métadonnées.')
    for (const message of errors) console.error(`  - ${message}`)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
