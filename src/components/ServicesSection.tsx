'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ScrollText } from 'lucide-react'
import { site, primaryContact } from '@/config/site'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface Service {
  icon:        React.ReactNode
  label:       string
  title:       string
  description: string
  details:     string[]
}

/** Trois formats réels. Tarifs indicatifs, 30 minutes. */
const REAL_SESSIONS: Service[] = site.prices.real.map((item, index) => ({
  icon: <span className="text-[11px] tracking-[0.2em]">0{index + 1}</span>,
  label: '30 min · indicatif',
  title: item.label,
  description: item.detail,
  details: [
    item.value,
    'Règles et safeword avant',
    `${site.city} et ${site.travelCities.join(', ')}. La ville seulement.`,
  ],
}))

function PriceRows({
  items,
}: {
  items: readonly { readonly label: string; readonly value: string; readonly note?: string }[]
}) {
  return (
    <ul className="flex flex-col border border-accent/20 bg-surface/60 shadow-glow">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex flex-col gap-1 border-b border-brown px-6 py-4 last:border-b-0 sm:px-7"
        >
          <div className="flex items-baseline justify-between gap-4">
            <span
              className="text-[15px] leading-snug text-fg font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {item.label}
            </span>
            <span
              className="shrink-0 text-[14px] text-accent font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {item.value}
            </span>
          </div>
          {item.note ? (
            <span
              className="text-[13px] leading-relaxed text-muted font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {item.note}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

/** Cadre des cashmeets, affiché sous les cartes. */
const FRAME_RULES = [
  `Cashmeets à ${site.city} et à ${site.travelCities.join(', ')}.`,
  `Basée à ${site.city}, ${site.region}.`,
  'Consentement, règles claires et safeword obligatoires.',
  'Jeu de rôle consenti et encadré. Latex et cuir, dans ce cadre.',
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
        group relative flex flex-col gap-6 p-7 sm:p-8 lg:p-10
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
          href={primaryContact().href}
          target="_blank"
          rel="noopener noreferrer"
          className="
            glow-box flex min-h-14 w-full items-center justify-center py-4 text-center
            text-[11px] tracking-[0.35em] uppercase font-medium
            border border-accent/40 text-fg
            transition-all duration-400
            hover:border-accent hover:text-accent
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60
          "
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          {primaryContact().label}
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
      className="relative w-full bg-bg overflow-hidden py-20 sm:py-28 lg:py-40 px-5 sm:px-8 md:px-12 lg:px-20"
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
            {`Mes conditions ne se négocient pas.\nElles s’acceptent. Ou tu passes.`}
          </motion.p>
        </div>

        <div className="flex flex-col gap-16 sm:gap-20">
          {/* A. Virtuel */}
          <div className="flex flex-col gap-8 sm:gap-10">
            <div className="flex flex-col gap-3">
              <span
                className="text-[11px] tracking-[0.5em] uppercase text-accent font-normal"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                A — Virtuel
              </span>
              <h3
                className="text-[clamp(1.8rem,6vw,2.6rem)] leading-[1.12] text-fg font-normal"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                À distance. <em className="italic font-normal text-accent">Sans relâche.</em>
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <h4
                className="text-[11px] tracking-[0.45em] uppercase text-muted font-normal"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Séances
              </h4>
              <PriceRows items={site.prices.virtual} />
            </div>

            <div className="flex flex-col gap-4">
              <h4
                className="text-[11px] tracking-[0.45em] uppercase text-muted font-normal"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Vente de contenu
              </h4>
              <PriceRows items={site.prices.content} />
            </div>

            <article className="flex flex-col gap-5 border border-accent/50 bg-surface/60 p-7 sm:p-8 shadow-glow">
              <div className="flex items-center gap-3 text-accent">
                <ScrollText size={18} strokeWidth={1} aria-hidden="true" />
                <h4
                  className="text-[1.35rem] italic font-normal text-fg"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {site.belonging.title}
                </h4>
              </div>
              <p
                className="text-[16px] leading-[1.75] text-accent font-normal"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {site.belonging.price}
              </p>
              <p
                className="text-[16px] leading-[1.75] text-muted font-normal"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {site.belonging.summary} {site.belonging.priority}
              </p>
              <p
                className="text-[16px] leading-[1.75] text-fg font-normal"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Application {site.belonging.app}. C’est moi qui écris les règles.
              </p>
              <ul className="flex flex-col gap-3">
                {site.belonging.obedience.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0 text-[11px] mt-[5px]">—</span>
                    <span
                      className="text-[15px] leading-relaxed text-muted font-normal"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contrat"
                className="mt-1 inline-flex min-h-12 items-center text-[11px] uppercase tracking-[0.28em] text-accent"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Voir le contrat
              </a>
            </article>
          </div>

          {/* B. Réel */}
          <div className="flex flex-col gap-8 sm:gap-10">
            <div className="flex flex-col gap-3">
              <span
                className="text-[11px] tracking-[0.5em] uppercase text-accent font-normal"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                B — Réel
              </span>
              <h3
                className="text-[clamp(1.8rem,6vw,2.6rem)] leading-[1.12] text-fg font-normal"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {site.city}. <em className="italic font-normal text-accent">Paris.</em>
              </h3>
              <p
                className="max-w-xl text-[16px] leading-[1.75] text-muted"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {site.prices.realNote}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              {REAL_SESSIONS.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Cadre des cashmeets */}
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
            Tu veux un cashmeet ?
          </p>
          <a
            href={primaryContact().href}
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
            {primaryContact().label}
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
            {site.city} · {site.travelCities.join(' · ')} · Virtuel
          </p>
        </motion.div>

      </div>
    </section>
  )
}
