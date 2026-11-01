import type { Metadata } from 'next'
import { Cormorant_Garamond, Rajdhani } from 'next/font/google'
import { site } from '@/config/site'
import AgeGate from '@/components/AgeGate'
import MotionProvider from '@/components/MotionProvider'
import MobileContactBar from '@/components/MobileContactBar'
import './globals.css'

/* ─────────────────────────────────────────────────────────────────
   POLICES — Cormorant Garamond (titres) + Rajdhani (interface)
   `display: swap` : le texte s'affiche tout de suite, la police arrive ensuite.
   Seules les graisses réellement utilisées sont chargées (le gras tombe sur 600).
───────────────────────────────────────────────────────────────── */
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const ui = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-rajdhani',
  display: 'swap',
})

/* ─────────────────────────────────────────────────────────────────
   METADATA
   L'image Open Graph / Twitter est générée par opengraph-image.tsx
   et twitter-image.tsx (même dossier).
───────────────────────────────────────────────────────────────── */
const TITLE = `${site.name} — Findom · Domination · Lille / Paris`
const DESCRIPTION =
  `${site.name} : findom et domination. Basée à ${site.city}, séances partout en France ` +
  'et souvent à Paris. Jeu de rôle consenti et encadré. Contenu réservé aux adultes (+18).'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title:        TITLE,
  description:  DESCRIPTION,
  applicationName: site.name,

  // ← noindex, nofollow tant que la mise en ligne n'est pas validée
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },

  openGraph: {
    type:        'website',
    locale:      'fr_FR',
    siteName:    site.name,
    title:       TITLE,
    description: DESCRIPTION,
    url:         site.url,
  },

  twitter: {
    card:        'summary_large_image',
    site:        site.handle,
    creator:     site.handle,
    title:       TITLE,
    description: DESCRIPTION,
  },
}

/* ─────────────────────────────────────────────────────────────────
   LAYOUT
───────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${display.variable} ${ui.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        {/* Écran d'entrée +18 : au-dessus de tout, rend #site-root inerte tant qu'il est affiché */}
        <AgeGate />

        {/* pb : réserve la place de la barre fixe mobile pour ne rien masquer en bas de page */}
        <div
          id="site-root"
          className="flex flex-1 flex-col pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0"
        >
          <MotionProvider>
            {children}
          </MotionProvider>
          <MobileContactBar />
          {/* Boutons flottants : desktop uniquement (sur mobile, c'est la barre fixe) */}
          <div className="fixed bottom-5 right-5 z-[95] hidden md:flex items-center gap-3">
            <a
              href={site.links.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter sur X"
              className="glow-box h-12 w-12 rounded-full bg-surface text-fg border border-accent/40 transition-all duration-300 hover:scale-105 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg flex items-center justify-center"
            >
              <span className="text-lg font-semibold leading-none">X</span>
            </a>
            <a
              href={site.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Écrire sur Telegram"
              className="glow-box h-14 w-14 rounded-full bg-surface text-accent border border-accent/60 transition-all duration-300 hover:scale-105 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg flex items-center justify-center"
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
        </div>
      </body>
    </html>
  )
}
