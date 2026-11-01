'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Footprints, Crown, Sparkles } from 'lucide-react'
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

const SERVICES: Service[] = [
  {
    icon:      <Footprints size={18} strokeWidth={1} />,
    label:     'Fétichisme des pieds',
    title:     'Session pieds',
    description:
      "Massage, léchage, odeur, chatouilles,\ntrampling et jeux de nourriture.\nSession dédiée au fétichisme des pieds.",
    details: [
      `30 min : ${site.prices.feet30} par domina`,
      `1 h : ${site.prices.feet60} par domina`,
      'Duo ou trio uniquement',
    ],
    cta: 'Écrire sur Telegram',
  },
  {
    icon:      <Crown size={18} strokeWidth={1} />,
    label:     'Domination soft',
    title:     'Pieds + domination',
    description:
      "Pratiques soft possibles en complément :\nordres, petites gifles, crachats, martinet,\ninsultes, moqueries, footgagging.",
    details: [
      `30 min : ${site.prices.domination30} par domina`,
      `1 h : ${site.prices.domination60} par domina`,
      'Cadre strict et sans nudité',
    ],
    cta: 'Demander un créneau',
  },
  {
    icon:      <Sparkles size={18} strokeWidth={1} />,
    label:     'Conditions IRL',
    title:     'Cadre des séances',
    description:
      `Nous recevons à ${site.city}\nen journée ou début de soirée.\nContact uniquement si vous acceptez le cadre.`,
    details: [
      'Ni nudité ni masturbation',
      'Ni vous ni nous, sans exception',
      'Contact Telegram uniquement',
    ],
    cta: 'Lire les conditions',
  },
]

/* ── Sous-composant card ────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
  isInView,
}: {
  service:  Service
  index:    number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ delay: 0.28 + index * 0.13, duration: 0.9, ease: EASE }}
      className="
        group relative flex flex-col gap-6 p-8 lg:p-10
        border border-[#E8E0D8]/8 bg-[#111111]/60
        transition-[border-color,box-shadow] duration-500 overflow-hidden
        hover:border-[color:var(--red-primary)]
        hover:shadow-[0_0_40px_var(--red-glow)]
      "
    >
      {/* Shimmer au hover */}
      <span
        aria-hidden="true"
        className="
          absolute top-0 -left-full h-full w-1/2 pointer-events-none
          bg-gradient-to-r from-transparent via-[#B22222]/6 to-transparent
          group-hover:left-[160%] transition-[left] duration-700 ease-out
        "
      />

      {/* Icône */}
      <div
        className="
          w-10 h-10 flex items-center justify-center border flex-shrink-0
          border-[#E8E0D8]/10 text-[#E8E0D8]/45
          transition-colors duration-300
          group-hover:border-[color:var(--red-primary)] group-hover:text-[#B22222]
        "
      >
        {service.icon}
      </div>

      <span
        className="text-[8px] tracking-[0.4em] uppercase text-[#E8E0D8]/28 font-light -mb-3"
        style={{ fontFamily: 'var(--font-jost)' }}
      >
        {service.label}
      </span>

      <h3
        className="text-[1.35rem] lg:text-[1.55rem] leading-tight tracking-tight italic font-normal text-[#E8E0D8]"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {service.title}
      </h3>

      <p
        className="text-[13px] leading-[1.85] text-[#E8E0D8]/48 font-light whitespace-pre-line"
        style={{ fontFamily: 'var(--font-jost)' }}
      >
        {service.description}
      </p>

      <div className="w-full h-px bg-[#E8E0D8]/6" />

      <ul className="flex flex-col gap-3">
        {service.details.map((d) => (
          <li key={d} className="flex items-start gap-3">
            <span className="text-[#B22222] flex-shrink-0 text-[10px] mt-[3px]">—</span>
            <span
              className="text-[12px] text-[#E8E0D8]/52 font-light leading-relaxed"
              style={{ fontFamily: 'var(--font-jost)' }}
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
            block w-full py-4 text-center
            text-[9px] tracking-[0.35em] uppercase font-light
            border border-[#E8E0D8]/12 text-[#E8E0D8]/60
            transition-all duration-400
            hover:border-[color:var(--red-primary)] hover:text-[#B22222]
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B22222]/60
          "
          style={{ fontFamily: 'var(--font-jost)' }}
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
      className="relative w-full bg-[#0A0A0A] overflow-hidden py-28 lg:py-40 px-6 md:px-12 lg:px-20"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-16 right-6 lg:right-20 text-[clamp(6rem,18vw,14rem)] font-bold italic leading-none text-[#E8E0D8]/[0.025]"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        03
      </span>

      <div ref={titleRef} className="relative z-10 max-w-6xl mx-auto">

        <motion.div {...fadeUp(0)} className="flex items-center gap-4 flex-wrap mb-6">
          <div className="w-8 h-px bg-[#B22222] flex-shrink-0" />
          <span
            className="text-[9px] tracking-[0.35em] text-[#E8E0D8]/50 font-light"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            — 03
          </span>
          <span
            className="text-[9px] tracking-[0.5em] uppercase text-[#B22222] font-light"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Le Culte
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-16 lg:mb-20">
          <motion.h2
            {...fadeUp(0.1)}
            className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-tight text-[#E8E0D8] font-normal max-w-3xl"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Tu ne choisis pas comment me servir.
            <br />
            <em className="italic font-normal text-[color:var(--red-primary)]">
              C&apos;est moi qui décide.
            </em>
          </motion.h2>

          <motion.p
            {...fadeUp(0.18)}
            className="text-[13px] leading-[1.8] text-[#E8E0D8]/42 font-light max-w-xs lg:text-right whitespace-pre-line"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            {`Mes conditions ne se négocient pas.\nElles s'acceptent — ou tu passes ton chemin.`}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          {...fadeUp(0.35)}
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            paddingTop: '3rem',
            borderTop: '1px solid var(--red-border)',
          }}
        >
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
            }}
          >
            Tu veux une séance réelle ?
          </p>
          <a
            href={site.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-[background,filter] duration-300 hover:brightness-110"
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--ivory)',
              background: 'var(--red-primary)',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
            }}
          >
            Écrire sur Telegram
          </a>
          <p
            style={{
              marginTop: '0.8rem',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Duo ou Trio · 30 min · 1 h · {site.city} · {site.travelCities.join(' · ')}
          </p>
        </motion.div>

      </div>
    </section>
  )
}
