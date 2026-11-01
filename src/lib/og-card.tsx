import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { site } from '@/config/site'

export const OG_SIZE = { width: 1200, height: 630 } as const
export const OG_ALT = `${site.name} — Findom · Domination · ${site.city} / Paris`

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
 *   --bg #0B0710 · --surface #1A0F1C · --accent #FF2E93 · --fg #F5E9F0 · --muted #B79AAE
 * (rgba(11,7,16,…) dans les dégradés = --bg avec transparence)
 */
const BG = '#0B0710'
const ACCENT = '#FF2E93'
const FG = '#F5E9F0'
const MUTED = '#B79AAE'

function Monogram({ height }: { height: number }) {
  return (
    <svg width={Math.round(height * 1.28)} height={height} viewBox="4 0 82 64" fill="none">
      <path
        d="M12 10 H24 C41 10 50 20 50 32 C50 44 41 54 24 54 H12 Z"
        stroke={ACCENT}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62 10 V54 H78"
        stroke={ACCENT}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Carte Open Graph / Twitter.
 * L'image (si elle existe) porte le même filigrane « @domleilaa » en bas à droite
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
              ? `linear-gradient(to top, ${BG} 8%, rgba(11,7,16,0.55) 55%, rgba(11,7,16,0.25) 100%)`
              : `linear-gradient(135deg, ${BG} 40%, #1A0F1C 100%)`,
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
            Findom · Domination · {site.city} / Paris
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
