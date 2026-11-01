'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { site, isPlaceholderLink } from '@/config/site'
import ContactLinks from '@/components/ContactLinks'

/* MYM : TODO — affiché en texte grisé (non cliquable) tant que le lien n'est pas renseigné */
const FOOTER_BAR_LINKS = [
  { label: 'X', href: site.links.x, external: true },
  { label: 'Telegram', href: site.links.telegram, external: true },
  { label: 'MYM', href: site.links.mym, external: true },
  { label: 'Mentions légales', href: '/mentions-legales', external: false },
] as const

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT
───────────────────────────────────────────────────────────────── */
export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer
      ref={ref}
      id="contact"
      role="contentinfo"
      aria-label={`Pied de page — ${site.name}`}
      className="relative w-full bg-bg overflow-hidden"
    >
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* ── Bloc CTA ─────────────────────────────────────────── */}
      <div className="px-6 pt-20 pb-14 md:px-12 flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] tracking-[0.38em] uppercase text-muted font-normal"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Tribute · Adoration · Culte
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3"
        >
          <h2
            className="text-[clamp(1.4rem,5vw,2rem)] font-normal text-fg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tu sais ce que tu dois{' '}
            <em className="italic font-normal text-accent">faire.</em>
          </h2>
          <p
            className="text-[15px] leading-[1.65] text-muted font-normal"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Mon temps est précieux. Ton portefeuille le sait.
          </p>
        </motion.div>

        <motion.a
          href={site.links.telegram}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.32, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Écrire sur Telegram"
          className="
            group relative
            flex items-center justify-center
            px-8 py-4
            glow-box border border-accent/40 hover:border-accent/80
            transition-colors duration-500 overflow-hidden
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60
          "
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-accent/0 group-hover:bg-accent/8 transition-colors duration-500"
          />
          <span
            aria-hidden="true"
            className="
              absolute top-0 -left-full h-full w-1/2
              bg-gradient-to-r from-transparent via-accent/20 to-transparent
              group-hover:left-[160%] transition-[left] duration-700 ease-out
            "
          />
          <span
            className="relative z-10 text-[11px] tracking-[0.32em] uppercase font-normal text-fg"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Écrire sur Telegram
          </span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.38, duration: 0.75 }}
        >
          <ContactLinks />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.42, duration: 0.75 }}
          className="text-[11px] tracking-[0.28em] uppercase text-muted font-normal"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Tribute obligatoire · Sans condition
        </motion.p>
      </div>

      {/* ── Barre pied de page ───────────────────────────────── */}
      <div
        className="px-6 py-8 md:px-12 flex flex-col items-center gap-6"
        style={{ borderTop: '1px solid var(--accent-border)' }}
      >
        <a
          href="#hero"
          className="text-[11px] tracking-[0.3em] font-normal text-fg select-none hover:text-accent transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {site.name}
        </a>

        <nav
          aria-label="Liens pied de page"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {FOOTER_BAR_LINKS.map(({ label, href, external }) =>
            isPlaceholderLink(href) ? (
              <span
                key={label}
                aria-disabled="true"
                className="text-[11px] tracking-[0.22em] uppercase font-normal text-muted/60"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {label} · bientôt
              </span>
            ) : (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-[11px] tracking-[0.22em] uppercase font-normal text-muted hover:text-accent transition-colors duration-300"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {label}
              </a>
            ),
          )}
        </nav>

        <p
          className="text-[11px] tracking-[0.22em] uppercase text-muted font-normal text-center"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          © 2026 {site.name} — Tous droits réservés
        </p>
      </div>
    </footer>
  )
}
