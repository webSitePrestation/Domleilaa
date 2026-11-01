'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WatermarkedImage from '@/components/WatermarkedImage'
import { site } from '@/config/site'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const ABOUT_BADGES = ['Findom', 'Domination', 'Tribute'] as const

function Badges({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`} aria-label="Univers">
      {ABOUT_BADGES.map((badge) => (
        <li
          key={badge}
          className="glow-box border border-accent/50 px-4 py-2 text-[11px] tracking-[0.32em] uppercase text-accent font-normal"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          {badge}
        </li>
      ))}
    </ul>
  )
}

function InfoCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`shadow-glow border border-accent/30 bg-bg/80 backdrop-blur-sm px-4 py-3 flex flex-col gap-1.5 ${className}`}
    >
      <span
        className="text-[11px] tracking-[0.12em] text-fg font-normal"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {site.name}
      </span>
      <span
        className="text-[11px] tracking-[0.22em] uppercase text-accent font-normal"
        style={{ fontFamily: 'var(--font-ui)' }}
      >
        Findom · Domination
      </span>
      <span
        className="text-[11px] tracking-[0.28em] uppercase text-muted font-normal"
        style={{ fontFamily: 'var(--font-ui)' }}
      >
        {site.city} / {site.travelCities.join(' / ')} / France
      </span>
    </div>
  )
}

const ABOUT_IMAGE_SRC = '/media/about.jpg'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 24 },
    animate:    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { delay, duration: 0.85, ease: EASE },
  })

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label={`À propos — ${site.name}`}
      className="relative w-full bg-bg"
    >

      {/* ═══════════════════════════════════════════════════════════
          DESKTOP LAYOUT (lg+)
          Image positionnée en absolute à gauche — hauteur 100%
          garantie sans dépendre d'une hauteur calculée par flex.
      ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        <div className="relative min-h-[780px] xl:min-h-[860px]">

          {/* Image — occupe tout le panneau gauche en absolute */}
          <div className="absolute inset-y-0 left-0 w-[46%] xl:w-[44%] overflow-hidden rounded-r-[2.5rem]">
            <WatermarkedImage
              src={ABOUT_IMAGE_SRC}
              alt={site.name}
              fill
              sizes="46vw"
              className="object-cover object-[50%_20%] brightness-[1.08] contrast-[1.02]"
              watermarkClassName="bottom-4 left-4"
            />
            <div className="absolute inset-0 border-r border-accent/25" />
            {/* Fondu latéral droite → noir pour raccorder avec le texte */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, color-mix(in srgb, var(--bg) 8%, transparent) 0%, color-mix(in srgb, var(--bg) 10%, transparent) 40%, color-mix(in srgb, var(--bg) 92%, transparent) 100%)',
              }}
            />
            {/* Fondu bas subtil */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, color-mix(in srgb, var(--bg) 15%, transparent) 0%, transparent 42%, color-mix(in srgb, var(--bg) 58%, transparent) 100%)',
              }}
            />
          </div>

          {/* Texte — décalé à droite, centré verticalement */}
          <div className="relative ml-[42%] xl:ml-[40%] flex items-center min-h-[780px] xl:min-h-[860px]">
            <div className="w-full max-w-[560px] xl:max-w-[620px] px-14 xl:px-20 py-24 flex flex-col gap-8 rounded-[2rem] bg-surface/45 backdrop-blur-[1.5px] border border-accent/10 shadow-deep">

              {/* Numéro décoratif */}
              <span
                aria-hidden="true"
                className="absolute top-12 right-8 text-[11rem] xl:text-[14rem] font-bold italic leading-none text-fg/[0.028] pointer-events-none select-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                02
              </span>

              {/* Numéro + label */}
              <motion.div {...fadeUp(0)} className="flex items-center gap-4 flex-wrap">
                <div className="w-8 h-px bg-accent flex-shrink-0" />
                <span
                  className="text-[11px] tracking-[0.35em] text-muted font-normal"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  — 02
                </span>
                <span
                  className="text-[11px] tracking-[0.5em] uppercase text-accent font-normal"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  La Déesse
                </span>
              </motion.div>

              {/* Titre */}
              <motion.h2
                {...fadeUp(0.1)}
                className="text-[2.6rem] xl:text-[3.2rem] leading-[1.08] tracking-tight text-fg font-normal"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Jeune. Cash.{' '}
                <em style={{ color: 'var(--accent)' }}>Exigeante.</em>
              </motion.h2>

              {/* Corps */}
              <motion.div {...fadeUp(0.2)} className="flex flex-col gap-5">
                <p
                  className="text-[16px] leading-[1.95] text-muted font-normal"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  Jeune, cash, sans détour.
                  <br />
                  Connue pour ce que j&apos;exige.
                  <br />
                  Moqueuse en séance : tu ris jaune.
                </p>
                <p
                  className="text-[16px] leading-[1.95] text-muted font-normal italic"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  Mon temps a un prix.
                  <br />
                  Ton obéissance aussi.
                </p>
              </motion.div>

              {/* Citation */}
              <motion.blockquote
                {...fadeUp(0.3)}
                className="pl-6"
                style={{ borderLeft: '2px solid var(--accent)' }}
              >
                <p
                  className="text-[16px] italic leading-relaxed text-muted"
                >
                  « Tu paies. Je décide. »
                </p>
              </motion.blockquote>

              {/* Séparateur */}
              <motion.div {...fadeUp(0.35)} className="w-16 h-px bg-accent/25" />

              {/* Badges */}
              <motion.div {...fadeUp(0.4)}>
                <Badges />
              </motion.div>

              {/* Carte info */}
              <motion.div {...fadeUp(0.48)}>
                <InfoCard className="inline-flex max-w-full rounded-sm" />
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE LAYOUT (< lg)
          Empilement vertical : image → texte
      ══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden">

        {/* Image mobile — hauteur fixe explicite */}
        <div className="relative w-full h-[460px] overflow-hidden rounded-b-[2rem]">
          <WatermarkedImage
            src={ABOUT_IMAGE_SRC}
            alt={site.name}
            fill
            sizes="100vw"
            className="object-cover object-[50%_16%] brightness-[1.08] contrast-[1.02]"
            watermarkClassName="top-4 right-4"
          />
          <div className="absolute inset-0 border-b border-accent/25" />
          {/* Fondu bas */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, color-mix(in srgb, var(--bg) 20%, transparent) 0%, transparent 45%, var(--bg) 100%)',
            }}
          />
          {/* Carte info flottante (mobile) */}
          <div className="absolute bottom-5 left-5 max-w-[min(calc(100%-2.5rem),240px)]">
            <InfoCard className="rounded-sm" />
          </div>
        </div>

        {/* Texte mobile */}
        <div className="px-6 pb-20 pt-10 flex flex-col gap-6">

          <motion.div {...fadeUp(0)} className="flex items-center gap-3 flex-wrap">
            <div className="w-7 h-px bg-accent flex-shrink-0" />
            <span
              className="text-[11px] tracking-[0.32em] text-muted font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              — 02
            </span>
            <span
              className="text-[11px] tracking-[0.48em] uppercase text-accent font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              La Déesse
            </span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            className="text-[clamp(1.9rem,8vw,2.4rem)] leading-[1.1] tracking-tight text-fg font-normal"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Jeune. Cash.{' '}
            <em style={{ color: 'var(--accent)' }}>Exigeante.</em>
          </motion.h2>

          <motion.div {...fadeUp(0.16)} className="flex flex-col gap-4">
            <p
              className="text-[15px] leading-[1.9] text-muted font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Jeune, cash, sans détour.
              <br />
              Connue pour ce que j&apos;exige.
              <br />
              Moqueuse en séance : tu ris jaune.
            </p>
            <p
              className="text-[15px] leading-[1.9] text-muted font-normal italic"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Mon temps a un prix.
              <br />
              Ton obéissance aussi.
            </p>
          </motion.div>

          <motion.blockquote
            {...fadeUp(0.24)}
            className="pl-5"
            style={{ borderLeft: '2px solid var(--accent)' }}
          >
            <p
              className="text-[15px] italic leading-relaxed text-muted"
            >
              « Tu paies. Je décide. »
            </p>
          </motion.blockquote>

          <motion.div {...fadeUp(0.3)} className="w-12 h-px bg-accent/25" />

          <motion.div {...fadeUp(0.36)}>
            <Badges />
          </motion.div>

        </div>
      </div>

    </section>
  )
}