import type { Metadata } from 'next'
import './globals.css'

/** URL canonique du site (OG, etc.). Définir `NEXT_PUBLIC_SITE_URL` dans `.env.local`. */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://example.com'
const WHATSAPP_URL = 'https://wa.me/33642218042'
const X_URL = 'https://x.com/DuoDePetons'

/* ─────────────────────────────────────────────────────────────────
   METADATA
───────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:       'Duo de Petons — Foot Goddess · Findom 👑',
  description:
    'Duo de Petons. Foot Goddess française.\n' +
    'Adoration des pieds, findom, tribute.\n' +
    'Contenu exclusif sur mes plateformes.\n' +
    'Tu sais ce que tu dois faire.',
  robots: { index: false, follow: false }, // ← passe à true quand tu veux indexer

  openGraph: {
    title:       'Duo de Petons — Foot Goddess 👑',
    description:
      'Foot worship. Findom. Tribute obligatoire.\nAucune exception.',
    url: SITE_URL,
  },

  twitter: {
    card:    'summary_large_image',
    site:    '@DuoDePetons',
    creator: '@DuoDePetons',
  },
}

/* ─────────────────────────────────────────────────────────────────
   LAYOUT — polices chargées via @import dans globals.css
───────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#E8E0D8]">
        {children}
        <div className="fixed bottom-5 right-5 z-[95] flex items-center gap-3">
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter sur X"
            className="h-12 w-12 rounded-full bg-black text-white border border-white/30 shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-105 hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] flex items-center justify-center"
          >
            <span className="text-lg font-semibold leading-none">X</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter sur WhatsApp"
            className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-7 w-7 fill-current"
            >
              <path d="M19.05 4.94A9.87 9.87 0 0012 2C6.48 2 2 6.48 2 12a9.9 9.9 0 001.47 5.2L2 22l4.95-1.42A10 10 0 0012 22c5.52 0 10-4.48 10-10a9.9 9.9 0 00-2.95-7.06zm-7.05 15.39a8.3 8.3 0 01-4.24-1.16l-.3-.18-2.93.84.88-2.85-.2-.3A8.3 8.3 0 013.67 12c0-4.6 3.73-8.33 8.33-8.33 2.23 0 4.33.87 5.9 2.43A8.3 8.3 0 0120.33 12c0 4.6-3.73 8.33-8.33 8.33zm4.57-6.23c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.12-.17.25-.65.8-.8.97-.15.17-.3.19-.55.06-.25-.12-1.06-.39-2.02-1.24-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.12-.12.25-.3.37-.45.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.12.17 1.73 2.64 4.18 3.71.58.25 1.04.4 1.4.52.59.19 1.12.17 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
            </svg>
          </a>
        </div>
      </body>
    </html>
  )
}
