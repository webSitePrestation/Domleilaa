'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const ABOUT_STATS = [
  { value: 'Foot', label: 'Goddess' },
  { value: 'Findom', label: 'Tribute' },
  { value: '∞', label: 'Adoration' },
] as const

function InfoCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`border border-[#B22222]/30 bg-[#0A0A0A]/80 backdrop-blur-sm px-4 py-3 flex flex-col gap-1.5 ${className}`}
    >
      <span
        className="text-[11px] tracking-[0.12em] text-[#E8E0D8] font-light"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Duo de Petons
      </span>
      <span
        className="text-[8px] tracking-[0.22em] uppercase text-[#B22222]/90 font-light"
        style={{ fontFamily: 'var(--font-jost)' }}
      >
        Foot Goddess · Findom 👑
      </span>
      <span
        className="text-[8px] tracking-[0.28em] uppercase text-[#E8E0D8]/45 font-light"
        style={{ fontFamily: 'var(--font-jost)' }}
      >
        France
      </span>
    </div>
  )
}

const ABOUT_IMAGE_SRC = '/WhatsApp%20Image%202026-05-05%20at%2014.36.52.jpeg'

export default function AboutSection() {
  const [aboutImageSrc, setAboutImageSrc] = useState(ABOUT_IMAGE_SRC)
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
      aria-label="À propos — Duo de Petons"
      className="relative w-full bg-[#0A0A0A]"
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
            <Image
              src={aboutImageSrc}
              alt="Duo de Petons"
              fill
              sizes="46vw"
              className="object-cover object-[50%_20%] brightness-[1.08] contrast-[1.02]"
              loading="eager"
              onError={() => setAboutImageSrc(ABOUT_IMAGE_SRC)}
            />
            <div className="absolute inset-0 border-r border-[#B22222]/25" />
            {/* Fondu latéral droite → noir pour raccorder avec le texte */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.1) 40%, rgba(10,10,10,0.92) 100%)',
              }}
            />
            {/* Fondu bas subtil */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 42%, rgba(10,10,10,0.58) 100%)',
              }}
            />
          </div>

          {/* Texte — décalé à droite, centré verticalement */}
          <div className="relative ml-[42%] xl:ml-[40%] flex items-center min-h-[780px] xl:min-h-[860px]">
            <div className="w-full max-w-[560px] xl:max-w-[620px] px-14 xl:px-20 py-24 flex flex-col gap-8 rounded-[2rem] bg-[#161616]/45 backdrop-blur-[1.5px] border border-[#B22222]/10 shadow-[0_40px_120px_rgba(0,0,0,0.55)]">

              {/* Numéro décoratif */}
              <span
                aria-hidden="true"
                className="absolute top-12 right-8 text-[11rem] xl:text-[14rem] font-bold italic leading-none text-[#E8E0D8]/[0.028] pointer-events-none select-none"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                02
              </span>

              {/* Numéro + label */}
              <motion.div {...fadeUp(0)} className="flex items-center gap-4 flex-wrap">
                <div className="w-8 h-px bg-[#B22222] flex-shrink-0" />
                <span
                  className="text-[9px] tracking-[0.35em] text-[#E8E0D8]/50 font-light"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  — 02
                </span>
                <span
                  className="text-[9px] tracking-[0.5em] uppercase text-[#B22222] font-light"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  La Déesse
                </span>
              </motion.div>

              {/* Titre */}
              <motion.h2
                {...fadeUp(0.1)}
                className="text-[2.6rem] xl:text-[3.2rem] leading-[1.08] tracking-tight text-[#E8E0D8] font-normal"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Vous n&apos;êtes ici{' '}
                <em style={{ color: 'var(--red-primary)' }}>que pour ça.</em>
              </motion.h2>

              {/* Corps */}
              <motion.div {...fadeUp(0.2)} className="flex flex-col gap-5">
                <p
                  className="text-[14px] leading-[1.95] text-[#E8E0D8]/55 font-light"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  Mes pieds sont un privilège.
                  <br />
                  Pas un droit.
                  <br />
                  Avant de lever les yeux vers moi,
                  <br />
                  vous avez déjà une dette.
                </p>
                <p
                  className="text-[14px] leading-[1.95] text-[#E8E0D8]/55 font-light italic"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  J&apos;accepte l&apos;adoration sous une seule forme :
                  <br />
                  sincère, financière, et sans condition.
                </p>
              </motion.div>

              {/* Citation */}
              <motion.blockquote
                {...fadeUp(0.3)}
                className="pl-6"
                style={{ borderLeft: '2px solid var(--red-primary)' }}
              >
                <p
                  className="text-[14px] italic leading-relaxed text-[#E8E0D8]/38"
                >
                  « Tu ne mérites pas mes pieds.
                  <br />
                  Mais tu peux essayer de le devenir. »
                </p>
              </motion.blockquote>

              {/* Séparateur */}
              <motion.div {...fadeUp(0.35)} className="w-16 h-px bg-[#B22222]/25" />

              {/* Stats */}
              <motion.div {...fadeUp(0.4)} className="flex gap-12">
                {ABOUT_STATS.map(({ value, label }) => (
                  <div key={label} className="flex flex-col gap-2">
                    <span
                      className="text-[26px] font-bold leading-none text-[#B22222]"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {value}
                    </span>
                    <span
                      className="text-[9px] tracking-[0.4em] uppercase text-[#E8E0D8]/28 font-light"
                      style={{ fontFamily: 'var(--font-jost)' }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
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
          <Image
            src={aboutImageSrc}
            alt="Duo de Petons"
            fill
            sizes="100vw"
            className="object-cover object-[50%_16%] brightness-[1.08] contrast-[1.02]"
            onError={() => setAboutImageSrc(ABOUT_IMAGE_SRC)}
          />
          <div className="absolute inset-0 border-b border-[#B22222]/25" />
          {/* Fondu bas */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 45%, #0A0A0A 100%)',
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
            <div className="w-7 h-px bg-[#B22222] flex-shrink-0" />
            <span
              className="text-[8.5px] tracking-[0.32em] text-[#E8E0D8]/50 font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              — 02
            </span>
            <span
              className="text-[8.5px] tracking-[0.48em] uppercase text-[#B22222] font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              La Déesse
            </span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            className="text-[clamp(1.9rem,8vw,2.4rem)] leading-[1.1] tracking-tight text-[#E8E0D8] font-normal"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Vous n&apos;êtes ici{' '}
            <em style={{ color: 'var(--red-primary)' }}>que pour ça.</em>
          </motion.h2>

          <motion.div {...fadeUp(0.16)} className="flex flex-col gap-4">
            <p
              className="text-[13px] leading-[1.9] text-[#E8E0D8]/55 font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Mes pieds sont un privilège.
              <br />
              Pas un droit.
              <br />
              Avant de lever les yeux vers moi,
              <br />
              vous avez déjà une dette.
            </p>
            <p
              className="text-[13px] leading-[1.9] text-[#E8E0D8]/55 font-light italic"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              J&apos;accepte l&apos;adoration sous une seule forme :
              <br />
              sincère, financière, et sans condition.
            </p>
          </motion.div>

          <motion.blockquote
            {...fadeUp(0.24)}
            className="pl-5"
            style={{ borderLeft: '2px solid var(--red-primary)' }}
          >
            <p
              className="text-[13px] italic leading-relaxed text-[#E8E0D8]/40"
            >
              « Tu ne mérites pas mes pieds.
              <br />
              Mais tu peux essayer de le devenir. »
            </p>
          </motion.blockquote>

          <motion.div {...fadeUp(0.3)} className="w-12 h-px bg-[#B22222]/25" />

          <motion.div {...fadeUp(0.36)} className="flex gap-10">
            {ABOUT_STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <span
                  className="text-[22px] font-bold leading-none text-[#B22222]"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {value}
                </span>
                <span
                  className="text-[8px] tracking-[0.38em] uppercase text-[#E8E0D8]/30 font-light"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

    </section>
  )
}