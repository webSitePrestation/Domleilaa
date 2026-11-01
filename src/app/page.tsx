'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import AboutSection    from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import TeasingSection  from '@/components/TeasingSection'
import Footer          from '@/components/Footer'
import { site } from '@/config/site'

interface NavLink { label: string; href: string; external?: boolean }

const NAV_LINKS: NavLink[] = [
  { label: 'Sanctuaire', href: '#hero'     },
  { label: 'La Déesse',  href: '#about'    },
  { label: 'Culte',      href: '#services' },
  { label: 'Galerie',    href: '#gallery'  },
  { label: 'Tribute',    href: '#contact'  },
  { label: 'Telegram', href: site.links.telegram, external: true },
]

function NavbarLogo({ className = '' }: { className?: string }) {
  return (
    <a
      href="#hero"
      className={`font-light text-[#E8E0D8] select-none ${className}`}
      style={{ fontFamily: 'var(--font-playfair)', letterSpacing: '0.3em' }}
    >
      {site.name}
    </a>
  )
}

/* ─────────────────────────────────────────────────────────────────
   VARIANTS
───────────────────────────────────────────────────────────────── */
const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
}

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
}

const lineExpand: Variants = {
  hidden:  { scaleX: 0, opacity: 0, originX: '0%' },
  visible: { scaleX: 1, opacity: 1, originX: '0%', transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
}

const menuOverlay: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
}

const menuLinkVariants: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT
───────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const mounted = true
  const [showStickyNav, setShowStickyNav] = useState<boolean>(false)
  const [introVisible, setIntroVisible] = useState<boolean>(true)

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setIntroVisible(false)
    }, 1800)

    return () => window.clearTimeout(introTimer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || introVisible ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, introVisible])

  useEffect(() => {
    const toggleStickyNav = () => {
      const heroHeight = window.innerHeight
      setShowStickyNav(window.scrollY > heroHeight - 140)
    }

    toggleStickyNav()
    window.addEventListener('scroll', toggleStickyNav, { passive: true })
    window.addEventListener('resize', toggleStickyNav)

    return () => {
      window.removeEventListener('scroll', toggleStickyNav)
      window.removeEventListener('resize', toggleStickyNav)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {introVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-[70] bg-[#050505] flex items-center justify-center"
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-5"
            >
              <motion.span
                initial={{ letterSpacing: '0.32em', opacity: 0 }}
                animate={{ letterSpacing: '0.3em', opacity: 1 }}
                transition={{ delay: 0.15, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.6rem,11vw,5.6rem)] italic leading-none text-[#E8E0D8]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {site.name}
              </motion.span>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="w-14 h-px bg-[#B22222]/65"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        aria-label="Navigation sections"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={
          showStickyNav
            ? {
                backgroundColor: 'rgba(10,10,10,0.97)',
                borderBottom: '1px solid var(--red-border)',
              }
            : { backgroundColor: 'transparent', borderBottom: '1px solid transparent' }
        }
        className={`
          fixed top-0 inset-x-0 z-50
          hidden md:flex items-center justify-between gap-6 lg:gap-8
          px-6 lg:px-12 py-3 backdrop-blur-md
          pointer-events-auto
        `}
      >
        <NavbarLogo className="text-[10px] shrink-0" />

        <div className="flex flex-1 items-center justify-center gap-6 lg:gap-8 min-w-0">
          {NAV_LINKS.map(({ label, href, external }) => (
            <a
              key={`sticky-${label}`}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-[9px] uppercase tracking-[0.34em] text-[#E8E0D8]/58 hover:text-[#B22222] transition-colors duration-300 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href={site.links.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 text-[9px] uppercase tracking-[0.28em] text-[#E8E0D8]/85 transition-colors duration-300 hover:text-[color:var(--red-bright)] border"
          style={{
            fontFamily: 'var(--font-jost)',
            borderColor: 'var(--red-primary)',
          }}
        >
          Écrire sur Telegram
        </a>

        <div className="relative group shrink-0">
          <Link
            href="/blog"
            className="text-[9px] uppercase tracking-[0.3em] text-[#B22222]/85 hover:text-[#B22222] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Ressources
          </Link>

          <div
            className="
              absolute left-1/2 top-full -translate-x-1/2
              pt-2 min-w-[170px]
              opacity-0 pointer-events-none translate-y-1
              transition-all duration-200
              group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
              group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0
            "
          >
            <div
              className="
                border border-[#B22222]/20 bg-[#0A0A0A]/95 backdrop-blur-md
                px-4 py-3 flex flex-col gap-2 shadow-[0_14px_38px_rgba(0,0,0,0.38)]
              "
            >
              <Link
                href="/pratiques"
                className="text-[9px] uppercase tracking-[0.24em] text-[#E8E0D8]/65 hover:text-[#B22222] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                Pratiques
              </Link>
              <Link
                href="/protocole"
                className="text-[9px] uppercase tracking-[0.24em] text-[#E8E0D8]/65 hover:text-[#B22222] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                Protocole
              </Link>
              <Link
                href="/blog"
                className="text-[9px] uppercase tracking-[0.24em] text-[#E8E0D8]/65 hover:text-[#B22222] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                Journal
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3 pl-2 ml-1 border-l border-[#E8E0D8]/10">
          <a
            href={site.links.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="text-[#E8E0D8]/40 hover:text-[#B22222]/70 transition-colors duration-300"
          >
            <X size={14} strokeWidth={1} aria-hidden="true" />
          </a>
        </div>
      </motion.nav>

      <button
        onClick={() => setMenuOpen((p) => !p)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        className="fixed top-5 right-5 z-[60] p-2 rounded-sm border border-[#B22222]/28 bg-[#0A0A0A]/78 backdrop-blur-sm text-[#E8E0D8] hover:text-[#B22222] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B22222]/60 md:hidden"
      >
        {menuOpen
          ? <X size={20} strokeWidth={1} aria-hidden="true" />
          : <Menu size={20} strokeWidth={1} aria-hidden="true" />
        }
      </button>

      {/* ════════════════════════════════════════════════════════
          HERO — plein écran
      ════════════════════════════════════════════════════════ */}
      <main
        id="hero"
        className="relative z-10 w-full h-[100dvh] min-h-[600px] overflow-hidden flex flex-col bg-[#0A0A0A]"
        aria-label={`Hero — ${site.name}`}
      >
        {/* Fond image */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="/media/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0.65) 65%, #0A0A0A 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,1) 100%)',
            }}
          />
        </div>

        {/* Navigation */}
        <nav
          className="relative z-30 flex items-center justify-between px-6 pt-10 md:px-12"
          aria-label="Navigation principale"
        >
          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <NavbarLogo className="text-[10px] text-[#E8E0D8]" />
            </motion.div>
          )}

          <div aria-hidden="true" className="w-8 md:w-0" />
        </nav>

        {/* Menu overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              variants={menuOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[55] bg-[#0A0A0A] flex flex-col items-center justify-start gap-6 overflow-y-auto px-6 pt-24 pb-10"
            >
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
                className="absolute top-6 right-6 p-2 text-[#E8E0D8]/40 hover:text-[#B22222] transition-colors"
              >
                <X size={20} strokeWidth={1} />
              </button>

              {NAV_LINKS.map(({ label, href, external }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  custom={i}
                  variants={menuLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setMenuOpen(false)}
                  className="text-xl tracking-[0.18em] uppercase italic text-[#E8E0D8]/75 hover:text-[#B22222] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {label}
                </motion.a>
              ))}

              <motion.a
                href={site.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                custom={NAV_LINKS.length}
                variants={menuLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setMenuOpen(false)}
                className="mt-1 px-5 py-2.5 text-[9px] uppercase tracking-[0.24em] text-[#E8E0D8]/90 transition-colors duration-300 hover:text-[color:var(--red-bright)] border"
                style={{
                  fontFamily: 'var(--font-jost)',
                  borderColor: 'var(--red-primary)',
                }}
              >
                Écrire sur Telegram
              </motion.a>

              <motion.div
                custom={NAV_LINKS.length + 1}
                variants={menuLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-2 flex flex-col items-center gap-3"
              >
                <span
                  className="text-[8px] tracking-[0.35em] uppercase text-[#E8E0D8]/28"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  Ressources
                </span>
                <div className="flex flex-col items-center gap-2">
                  <Link
                    href="/pratiques"
                    onClick={() => setMenuOpen(false)}
                    className="text-[11px] tracking-[0.22em] uppercase text-[#E8E0D8]/62 hover:text-[#B22222] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-jost)' }}
                  >
                    Pratiques
                  </Link>
                  <Link
                    href="/protocole"
                    onClick={() => setMenuOpen(false)}
                    className="text-[11px] tracking-[0.22em] uppercase text-[#E8E0D8]/62 hover:text-[#B22222] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-jost)' }}
                  >
                    Protocole
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setMenuOpen(false)}
                    className="text-[11px] tracking-[0.22em] uppercase text-[#E8E0D8]/62 hover:text-[#B22222] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-jost)' }}
                  >
                    Journal
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 mt-1"
              >
                <a
                  href={site.links.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="text-[#E8E0D8]/40 hover:text-[#B22222]/70 transition-colors duration-300"
                >
                  <X size={14} strokeWidth={1} aria-hidden="true" />
                </a>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="w-8 h-px bg-[#B22222]/50 mt-4"
                aria-hidden="true"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenu hero centré */}
        {mounted && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex-1 flex flex-col items-center justify-end px-6 pb-6"
          >
            <motion.div
              variants={lineExpand}
              className="w-10 h-px bg-[#B22222] mb-5 self-center"
              aria-hidden="true"
            />

            <motion.p
              variants={fadeUp}
              className="text-[9px] md:text-[10px] tracking-[0.28em] uppercase font-light text-[#E8E0D8]/70 text-center mb-5 max-w-[min(100%,28rem)] px-2"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              👑  Foot Goddess · Findom  👑
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.4rem,12vw,6.5rem)] leading-[0.95] tracking-tight text-[#E8E0D8] font-normal text-center"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {site.name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-[clamp(1.5rem,6vw,2.75rem)] leading-tight text-[#B22222] italic font-normal text-center mb-5"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              La Déesse
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-[11px] md:text-[12px] tracking-[0.12em] font-light text-[#E8E0D8]/55 text-center max-w-md px-4 mb-10"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Adorez. Payez. Ne demandez rien en retour.
            </motion.p>
          </motion.div>
        )}

        {/* CTA zone pouce */}
        <div className="relative z-10 pb-12 px-8 flex flex-col items-center gap-3">
          {mounted && (
            <>
              <motion.a
                href={site.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full max-w-[280px] py-[18px] px-6 text-center border border-[#B22222]/38 hover:border-[#B22222]/80 transition-colors duration-500 overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B22222]/60"
                style={{ animation: 'luxePulse 3.8s ease-in-out 2.8s infinite' }}
                aria-label="Écrire sur Telegram"
              >
                <span aria-hidden="true" className="absolute inset-0 bg-[#B22222]/0 group-hover:bg-[#B22222]/8 transition-colors duration-500" />
                <span aria-hidden="true" className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-[#B22222]/22 to-transparent group-hover:left-[160%] transition-[left] duration-700 ease-out" />
                <span
                  className="relative z-10 text-[9px] tracking-[0.35em] uppercase font-light text-[#E8E0D8]"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  Écrire sur Telegram
                </span>
              </motion.a>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.8 }}
                className="flex items-center gap-3"
              >
                <div className="w-px h-2 bg-[#E8E0D8]/15" aria-hidden="true" />
                <span
                  className="text-[7.5px] tracking-[0.3em] uppercase text-[#E8E0D8]/22"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  Tribute obligatoire · Aucune exception
                </span>
                <div className="w-px h-2 bg-[#E8E0D8]/15" aria-hidden="true" />
              </motion.div>
            </>
          )}
        </div>
      </main>

      {/* ════════════════════════════════════════════════════════
          SECTIONS
      ════════════════════════════════════════════════════════ */}
      <AboutSection    />
      <ServicesSection />
      <TeasingSection  />
      <Footer          />
    </>
  )
}