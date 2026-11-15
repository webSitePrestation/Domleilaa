import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/**
 * Apple touch icon généré : monogramme DA bordeaux sur fond noir.
 * Les couleurs reprennent les tokens de globals.css
 * (--bg #050405, --accent #D64556) : un ImageResponse ne peut pas lire les variables CSS.
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
          background: '#050405',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
          <path
            d="M10 16 H18 C28 16 33 22 33 32 C33 42 28 48 18 48 H10 Z"
            stroke="#D64556"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 48 L46 16 L54 48"
            stroke="#D64556"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40.5 36 H51.5"
            stroke="#D64556"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  )
}
