import type { Metadata } from 'next'
import { site } from '@/config/site'
import './globals.css'

/* ─────────────────────────────────────────────────────────────────
   METADATA
───────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title:       `${site.name} — Foot Goddess · Findom 👑`,
  description:
    `${site.name}. Foot Goddess française.\n` +
    'Adoration des pieds, findom, tribute.\n' +
    'Contenu exclusif sur mes plateformes.\n' +
    'Tu sais ce que tu dois faire.',
  robots: { index: false, follow: false }, // ← passe à true quand tu veux indexer

  openGraph: {
    title:       `${site.name} — Foot Goddess 👑`,
    description:
      'Foot worship. Findom. Tribute obligatoire.\nAucune exception.',
    url: site.url,
  },

  twitter: {
    card:    'summary_large_image',
    site:    site.handle,
    creator: site.handle,
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
            href={site.links.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter sur X"
            className="h-12 w-12 rounded-full bg-black text-white border border-white/30 shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-105 hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] flex items-center justify-center"
          >
            <span className="text-lg font-semibold leading-none">X</span>
          </a>
          <a
            href={site.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Écrire sur Telegram"
            className="h-14 w-14 rounded-full bg-[#0A0A0A] text-[#E8E0D8] border border-[#B22222]/50 shadow-[0_10px_30px_rgba(178,34,34,0.28)] transition-all duration-300 hover:scale-105 hover:border-[#B22222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B22222] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-7 w-7 fill-current"
            >
              <path d="M21.5 3.3 2.8 10.5c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 11.1-7c.5-.3 1-.1.6.2l-9 8.2-.3 4.8c.4 0 .6-.2.8-.4l2.1-2 4.4 3.2c.8.5 1.4.2 1.6-.7l2.9-13.7c.3-1.2-.4-1.8-1.1-1.4z" />
            </svg>
          </a>
        </div>
      </body>
    </html>
  )
}
