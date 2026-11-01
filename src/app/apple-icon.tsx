import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/**
 * Apple touch icon généré : monogramme DL rose sur fond sombre.
 * Les couleurs reprennent les tokens de globals.css
 * (--bg #0B0710, --accent #FF2E93) : un ImageResponse ne peut pas lire les variables CSS.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B0710',
        }}
      >
        <svg width="120" height="94" viewBox="4 0 82 64" fill="none">
          <path
            d="M12 10 H24 C41 10 50 20 50 32 C50 44 41 54 24 54 H12 Z"
            stroke="#FF2E93"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M62 10 V54 H78"
            stroke="#FF2E93"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  )
}
