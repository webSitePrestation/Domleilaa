import { Check } from 'lucide-react'
import { telegramLink } from '@/config/site'
import Reveal from '@/components/Reveal'
import SectionHeader from '@/components/SectionHeader'

/** Message pré-rempli dans Telegram (la personne le complète avant d'envoyer). */
const APPLY_MESSAGE = [
  'Bonjour, je postule pour un tournage.',
  'Je confirme être majeur(e).',
  'Ville :',
  'Disponibilités :',
  'Expérience :',
].join('\n')

const GUARANTEES = [
  'Majeurs uniquement',
  'Consentement écrit',
  'Discrétion totale',
  "Rien n'est publié sans ton accord",
] as const

const CRITERIA: { title: string; text: string }[] = [
  { title: 'Majeur(e)',      text: 'Obligatoire. Aucune exception.' },
  { title: 'Disponibilité',  text: 'Indique tes créneaux, sans promesse vague.' },
  { title: 'Localisation',   text: 'Ta ville : Lille, Paris ou ailleurs en France.' },
  { title: 'Expérience',     text: 'Décris-la. Aucune expérience, c\u2019est aussi une réponse.' },
]

/** Section « Tournage » : recherche de personnes pour tourner du contenu. */
export default function CastingSection() {
  return (
    <section
      id="tournage"
      aria-label="Tournage"
      className="relative w-full bg-bg overflow-hidden scroll-mt-20 py-24 lg:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader
          label="Tournage"
          title={
            <>
              Tu veux{' '}
              <em className="italic font-normal text-accent">tourner</em>{' '}
              avec moi ?
            </>
          }
          aside={'Je cherche des personnes\npour tourner du contenu.'}
        />

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
          {/* Engagements */}
          <Reveal className="flex">
            <div className="flex w-full flex-col gap-6 p-8 lg:p-10 border border-accent/20 bg-surface/60 shadow-glow">
              <h3
                className="text-[1.35rem] lg:text-[1.55rem] leading-tight tracking-tight italic font-normal text-fg"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Le cadre
              </h3>
              <ul className="flex flex-col gap-4">
                {GUARANTEES.map((g) => (
                  <li key={g} className="flex items-start gap-3">
                    <Check
                      size={16}
                      strokeWidth={1.5}
                      className="mt-[3px] shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span
                      className="text-[15px] leading-[1.7] text-fg/85 font-normal"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      {g}
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className="mt-auto text-[13px] leading-[1.7] text-muted font-normal"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Jeu de rôle consenti et encadré. Règles claires et safeword obligatoires.
              </p>
            </div>
          </Reveal>

          {/* Critères */}
          <Reveal delay={0.12} className="flex">
            <div className="flex w-full flex-col gap-6 p-8 lg:p-10 border border-accent/20 bg-surface/60 shadow-glow">
              <h3
                className="text-[1.35rem] lg:text-[1.55rem] leading-tight tracking-tight italic font-normal text-fg"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Critères
              </h3>
              <ul className="flex flex-col gap-5">
                {CRITERIA.map((c) => (
                  <li key={c.title} className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0 text-[11px] mt-[5px]">—</span>
                    <span
                      className="text-[15px] leading-[1.7] text-muted font-normal"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      <strong className="font-semibold text-fg">{c.title}</strong>
                      {' : '}
                      {c.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-12 flex flex-col items-center gap-4 text-center">
          <a
            href={telegramLink(APPLY_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-box inline-block bg-accent px-10 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.3em] text-bg transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Postuler par Telegram
          </a>
          <p
            className="text-[11px] tracking-[0.25em] uppercase text-muted font-normal"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Un message est déjà prêt : tu le complètes, tu l&apos;envoies
          </p>
        </Reveal>
      </div>
    </section>
  )
}
