import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { site } from '@/config/site'

export const OG_SIZE = { width: 1200, height: 630 } as const
export const OG_ALT = `${site.name} — Findom · ${site.city} / Paris`

/**
 * Photos candidates pour l'image de partage (premier fichier trouvé dans /public/media).
 * Aucun fichier = carte sombre avec le monogramme.
 */
const CANDIDATES = ['og.jpg', 'hero-poster.jpg'] as const

async function loadPhoto(): Promise<string | null> {
  for (const file of CANDIDATES) {
    try {
      const data = await readFile(join(process.cwd(), 'public', 'media', file))
      return `data:image/jpeg;base64,${data.toString('base64')}`
    } catch {
      /* fichier absent : on essaie le suivant */
    }
  }
  return null
}

/*
 * Couleurs : un ImageResponse ne peut pas lire les variables CSS.
 * Elles reprennent les tokens de globals.css :
 *   --bg #050405 · --surface #141012 · --accent #D64556 · --fg #F6F1EE · --muted #BBA9A6
 * (rgba(5,4,5,…) dans les dégradés = --bg avec transparence)
 */
const BG = '#050405'
const SURFACE = '#141012'
const ACCENT = '#D64556'
const FG = '#F6F1EE'
const MUTED = '#BBA9A6'

function Monogram({ height }: { height: number }) {
  return (
    <svg width={height} height={height} viewBox="0 0 64 64" fill="none">
      <path
        d="M10 16 H18 C28 16 33 22 33 32 C33 42 28 48 18 48 H10 Z"
        stroke={ACCENT}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 48 L46 16 L54 48"
        stroke={ACCENT}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.5 36 H51.5"
        stroke={ACCENT}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Carte Open Graph / Twitter.
 * L'image (si elle existe) porte le même filigrane que le site, en bas à droite
 * que le composant <WatermarkedImage> du site (un ImageResponse ne peut pas utiliser
 * un composant React client, on reproduit donc le filigrane ici).
 */
export async function renderOgCard() {
  const photo = await loadPhoto()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: BG,
          color: FG,
        }}
      >
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            width={OG_SIZE.width}
            height={OG_SIZE.height}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* Dégradé de lisibilité */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: photo
              ? `linear-gradient(to top, ${BG} 8%, rgba(5,4,5,0.55) 55%, rgba(5,4,5,0.25) 100%)`
              : `linear-gradient(135deg, ${BG} 40%, ${SURFACE} 100%)`,
          }}
        />

        {/* Texte */}
        <div
          style={{
            position: 'absolute',
            left: 72,
            bottom: 84,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <Monogram height={72} />
          <div style={{ display: 'flex', fontSize: 104, lineHeight: 1, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div style={{ display: 'flex', fontSize: 36, color: ACCENT, fontStyle: 'italic' }}>
            Findom · {site.city} / Paris
          </div>
        </div>

        {/* Filigrane */}
        <div
          style={{
            position: 'absolute',
            right: 36,
            bottom: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 26,
            letterSpacing: 4,
            color: MUTED,
          }}
        >
          <Monogram height={26} />
          {site.handle}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  )
}
