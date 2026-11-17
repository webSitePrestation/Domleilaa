import type { Metadata } from 'next'
import { Cormorant_Garamond, Rajdhani } from 'next/font/google'
import { site, primaryContact } from '@/config/site'
import AgeGate from '@/components/AgeGate'
import MotionProvider from '@/components/MotionProvider'
import MobileContactBar from '@/components/MobileContactBar'
import BackToTop from '@/components/BackToTop'
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
const TITLE = `${site.name} — Findom · ${site.city} / Paris`
const DESCRIPTION =
  `${site.tagline} ${site.signature} Basée à ${site.city} (${site.region}), cashmeets à Paris. ` +
  'Jeu de rôle consenti et encadré. Contenu réservé aux adultes (+18).'

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
  const contact = primaryContact()

  // Une extension Chrome ajoute data-thieve-chrome-ext sur <html> avant l'hydratation.
  return (
    <html
      lang="fr"
      className={`${display.variable} ${ui.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        {/* Écran d'entrée +18 : au-dessus de tout, rend #site-root inerte tant qu'il est affiché */}
        <AgeGate />

        {/* pb : réserve la place de la barre fixe mobile pour ne rien masquer en bas de page */}
        <div
          id="site-root"
          className="flex flex-1 flex-col pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0"
        >
          <MotionProvider>
            {children}
          </MotionProvider>
          <MobileContactBar />
          <BackToTop />
          {/* Boutons flottants : desktop uniquement (sur mobile, c'est la barre fixe) */}
          <div className="fixed bottom-5 right-5 z-[95] hidden md:flex items-center gap-3">
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={contact.label}
              className="glow-box h-14 w-14 rounded-full bg-surface text-accent border border-accent/60 transition-all duration-300 hover:scale-105 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg flex items-center justify-center"
            >
              <span className="text-lg font-semibold leading-none">{contact.short === 'X' ? 'X' : '↗'}</span>
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
