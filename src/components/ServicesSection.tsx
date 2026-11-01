'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Crown, Flame, Dog, Sparkles, Lock } from 'lucide-react'
import { site } from '@/config/site'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface Service {
  icon:        React.ReactNode
  label:       string
  title:       string
  description: string
  details:     string[]
  cta:         string
}

/* 5 cartes. Tarifs : placeholders TODO dans src/config/site.ts */
const SERVICES: Service[] = [
  {
    icon:      <Crown size={18} strokeWidth={1} />,
    label:     'Le classique',
    title:     'Séance générale',
    description:
      "Tu arrives. Je mène.\nOrdres, regards, silences.\nTu comprends vite qui décide.",
    details: [
      `30 min : ${site.prices.general30}`,
      `1 h : ${site.prices.general60}`,
      'Règles et safeword fixés avant',
    ],
    cta: 'Écrire sur Telegram',
  },
  {
    icon:      <Flame size={18} strokeWidth={1} />,
    label:     'Mental',
    title:     'Humiliation',
    description:
      "Je te remets à ta place.\nAvec des mots, des rires, du mépris.\nTu rougis. Tu reviens.",
    details: [
      `30 min : ${site.prices.humiliation30}`,
      `1 h : ${site.prices.humiliation60}`,
      'Limites définies avant, safeword actif',
    ],
    cta: 'Écrire sur Telegram',
  },
  {
    icon:      <Dog size={18} strokeWidth={1} />,
    label:     'Discipline',
    title:     'Dressage',
    description:
      "Laisse, dog training, prosternation.\nTu te tiens. Tu obéis.\nSans un mot de trop.",
    details: [
      `30 min : ${site.prices.dressage30}`,
      `1 h : ${site.prices.dressage60}`,
      'Laisse · dog training · prosternation',
    ],
    cta: 'Écrire sur Telegram',
  },
  {
    icon:      <Sparkles size={18} strokeWidth={1} />,
    label:     'Service',
    title:     'Soubrette',
    description:
      "Ménage, tenue, consignes.\nEt moqueries pendant que tu t'appliques.\nSolo ou duo.",
    details: [
      `30 min : ${site.prices.soubrette30}`,
      `1 h : ${site.prices.soubrette60}`,
      'Ménage · moqueries · solo ou duo',
    ],
    cta: 'Écrire sur Telegram',
  },
  {
    icon:      <Lock size={18} strokeWidth={1} />,
    label:     'Sur mesure',
    title:     'Pratiques sur demande',
    description:
      "Une idée précise en tête ?\nTout se discute en privé, hors site.\nJe décide si ça m'amuse.",
    details: [
      `30 min : ${site.prices.custom30}`,
      `1 h : ${site.prices.custom60}`,
      'Échange privé, hors site',
    ],
    cta: 'Écrire sur Telegram',
  },
]

/** Cadre des séances, affiché sous les cartes. */
const FRAME_RULES = [
  'Séances partout en France, en Airbnb.',
  `Basée à ${site.city}. Souvent à ${site.travelCities.join(', ')}.`,
  'Consentement, règles claires et safeword obligatoires.',
  'Jeu de rôle consenti et encadré. Rien d\u2019autre.',
] as const

/* ── Sous-composant card ────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
  isInView,
  className = '',
}: {
  service:    Service
  index:      number
  isInView:   boolean
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ delay: 0.28 + index * 0.13, duration: 0.9, ease: EASE }}
      className={`
        group relative flex flex-col gap-6 p-8 lg:p-10
        border border-accent/20 bg-surface/60 shadow-glow
        transition-[border-color,box-shadow] duration-500 overflow-hidden
        hover:border-accent
        hover:shadow-glow-strong
        ${className}
      `}
    >
      {/* Shimmer au hover */}
      <span
        aria-hidden="true"
        className="
          absolute top-0 -left-full h-full w-1/2 pointer-events-none
          bg-gradient-to-r from-transparent via-accent/6 to-transparent
          group-hover:left-[160%] transition-[left] duration-700 ease-out
        "
      />

      {/* Icône */}
      <div
        className="
          w-10 h-10 flex items-center justify-center border flex-shrink-0
          border-brown text-muted
          transition-colors duration-300
          group-hover:border-accent group-hover:text-accent
        "
      >
        {service.icon}
      </div>

      <span
        className="text-[11px] tracking-[0.4em] uppercase text-muted font-normal -mb-3"
        style={{ fontFamily: 'var(--font-ui)' }}
      >
        {service.label}
      </span>

      <h3
        className="text-[1.35rem] lg:text-[1.55rem] leading-tight tracking-tight italic font-normal text-fg"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {service.title}
      </h3>

      <p
        className="text-[15px] leading-[1.85] text-muted font-normal whitespace-pre-line"
        style={{ fontFamily: 'var(--font-ui)' }}
      >
        {service.description}
      </p>

      <div className="w-full h-px bg-brown" />

      <ul className="flex flex-col gap-3">
        {service.details.map((d) => (
          <li key={d} className="flex items-start gap-3">
            <span className="text-accent flex-shrink-0 text-[11px] mt-[3px]">—</span>
            <span
              className="text-[14px] text-muted font-normal leading-relaxed"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {d}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        <a
          href={site.links.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="
            glow-box block w-full py-4 text-center
            text-[11px] tracking-[0.35em] uppercase font-medium
            border border-accent/40 text-fg
            transition-all duration-400
            hover:border-accent hover:text-accent
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60
          "
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          {service.cta}
        </a>
      </div>
    </motion.div>
  )
}

/* ── Composant principal ────────────────────────────────────────── */
export default function ServicesSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, amount: 0.15 })

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { delay, duration: 0.85, ease: EASE },
  })

  return (
    <section
      id="services"
      aria-label={`Services — ${site.name}`}
      className="relative w-full bg-bg overflow-hidden py-28 lg:py-40 px-6 md:px-12 lg:px-20"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-16 right-6 lg:right-20 text-[clamp(6rem,18vw,14rem)] font-bold italic leading-none text-fg/[0.025]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        03
      </span>

      <div ref={titleRef} className="relative z-10 max-w-6xl mx-auto">

        <motion.div {...fadeUp(0)} className="flex items-center gap-4 flex-wrap mb-6">
          <div className="w-8 h-px bg-accent flex-shrink-0" />
          <span
            className="text-[11px] tracking-[0.35em] text-muted font-normal"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            — 03
          </span>
          <span
            className="text-[11px] tracking-[0.5em] uppercase text-accent font-normal"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Le Culte
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-16 lg:mb-20">
          <motion.h2
            {...fadeUp(0.1)}
            className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-tight text-fg font-normal max-w-3xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tu ne choisis pas comment me servir.
            <br />
            <em className="italic font-normal text-accent">
              C&apos;est moi qui décide.
            </em>
          </motion.h2>

          <motion.p
            {...fadeUp(0.18)}
            className="text-[15px] leading-[1.8] text-muted font-normal max-w-xs lg:text-right whitespace-pre-line"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {`Mes conditions ne se négocient pas.\nElles s'acceptent — ou tu passes ton chemin.`}
          </motion.p>
        </div>

        {/* 5 cartes : 3 + 2 sur desktop, 2 + 2 + 1 sur tablette, 1 colonne sur mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-7">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              index={i}
              isInView={isInView}
              className={
                i < 3
                  ? 'lg:col-span-2'
                  : i === 3
                    ? 'lg:col-span-3'
                    : 'md:col-span-2 lg:col-span-3'
              }
            />
          ))}
        </div>

        {/* Cadre des séances */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-16 lg:mt-20 border border-accent/20 bg-surface/60 shadow-glow p-8 lg:p-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center"
        >
          <div className="flex flex-col gap-4">
            <span
              className="text-[11px] tracking-[0.5em] uppercase text-accent font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Le cadre
            </span>
            <h3
              className="text-[1.6rem] lg:text-[2rem] leading-tight tracking-tight text-fg font-normal"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Un jeu.{' '}
              <em className="italic font-normal text-accent">Des règles.</em>
            </h3>
          </div>

          <ul className="flex flex-col gap-4">
            {FRAME_RULES.map((rule) => (
              <li key={rule} className="flex items-start gap-3">
                <span className="text-accent flex-shrink-0 text-[11px] mt-[5px]">—</span>
                <span
                  className="text-[15px] leading-[1.7] text-muted font-normal"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  {rule}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          {...fadeUp(0.35)}
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            paddingTop: '3rem',
            borderTop: '1px solid var(--accent-border)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '1.25rem',
              color: 'var(--muted)',
              marginBottom: '1.5rem',
            }}
          >
            Tu veux une séance réelle ?
          </p>
          <a
            href={site.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-box inline-block transition-[background,filter] duration-300 hover:brightness-110"
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--accent)',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
            }}
          >
            Écrire sur Telegram
          </a>
          <p
            style={{
              marginTop: '0.8rem',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            30 min · 1 h · {site.city} · {site.travelCities.join(' · ')} · Toute la France
          </p>
        </motion.div>

      </div>
    </section>
  )
}
