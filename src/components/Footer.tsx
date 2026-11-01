'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────────────────────────── */
const WHATSAPP_URL = 'https://wa.me/33642218042'
const X_URL = 'https://x.com/DuoDePetons'
/** Remplace par ton lien MYM / OnlyFans / Fansly agrégé */
const MYM_ONLYFANS_URL = '#'

const FOOTER_BAR_LINKS = [
  { label: 'X', href: X_URL, external: true },
  { label: 'MYM / OnlyFans', href: MYM_ONLYFANS_URL, external: true },
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
      aria-label="Pied de page — Duo de Petons"
      className="relative w-full bg-[#0A0A0A] overflow-hidden"
    >
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B22222]/30 to-transparent" />

      {/* ── Bloc CTA ─────────────────────────────────────────── */}
      <div className="px-6 pt-20 pb-14 md:px-12 flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-[9px] tracking-[0.38em] uppercase text-[#E8E0D8]/45 font-light"
          style={{ fontFamily: 'var(--font-jost)' }}
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
            className="text-[clamp(1.4rem,5vw,2rem)] font-normal text-[#E8E0D8]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Tu sais ce que tu dois{' '}
            <em className="italic font-normal text-[color:var(--red-primary)]">faire.</em>
          </h2>
          <p
            className="text-[13px] leading-[1.65] text-[#E8E0D8]/50 font-light"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Mes pieds n&apos;attendent pas. Ton portefeuille non plus.
          </p>
        </motion.div>

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.32, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Contacter sur WhatsApp"
          className="
            group relative
            flex items-center justify-center
            px-8 py-4
            border border-[#B22222]/40 hover:border-[#B22222]/80
            transition-colors duration-500 overflow-hidden
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B22222]/60
          "
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[#B22222]/0 group-hover:bg-[#B22222]/8 transition-colors duration-500"
          />
          <span
            aria-hidden="true"
            className="
              absolute top-0 -left-full h-full w-1/2
              bg-gradient-to-r from-transparent via-[#B22222]/20 to-transparent
              group-hover:left-[160%] transition-[left] duration-700 ease-out
            "
          />
          <span
            className="relative z-10 text-[9px] tracking-[0.32em] uppercase font-light text-[#E8E0D8]"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Contacter sur WhatsApp
          </span>
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.42, duration: 0.75 }}
          className="text-[7.5px] tracking-[0.28em] uppercase text-[#E8E0D8]/22 font-light"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          Tribute obligatoire · Sans condition
        </motion.p>
      </div>

      {/* ── Barre pied de page ───────────────────────────────── */}
      <div
        className="px-6 py-8 md:px-12 flex flex-col items-center gap-6"
        style={{ borderTop: '1px solid var(--red-border)' }}
      >
        <a
          href="#hero"
          className="text-[11px] tracking-[0.3em] font-light text-[#E8E0D8] select-none hover:text-[#B22222]/80 transition-colors"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          D <span style={{ color: 'var(--red-primary)' }}>·</span> P
        </a>

        <nav
          aria-label="Liens pied de page"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {FOOTER_BAR_LINKS.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-[9px] tracking-[0.22em] uppercase font-light text-[#E8E0D8]/30 hover:text-[#B22222]/70 transition-colors duration-300"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              {label}
            </a>
          ))}
        </nav>

        <p
          className="text-[9px] tracking-[0.22em] uppercase text-[#E8E0D8]/22 font-light text-center"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          © 2026 Duo de Petons — Tous droits réservés
        </p>
      </div>
    </footer>
  )
}
