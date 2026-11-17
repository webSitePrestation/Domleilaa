import { Check } from 'lucide-react'
import { site, primaryContact } from '@/config/site'
import Reveal from '@/components/Reveal'
import SectionHeader from '@/components/SectionHeader'

/** Message à copier sur X (les messages privés ne se préremplissent pas). */
const APPLY_MESSAGE = [
  'DeesseAlhya, je demande un contrat.',
  'Je confirme être majeur(e).',
  'Ville :',
  'Disponibilités :',
  'Offrande proposée :',
].join('\n')

const GUARANTEES = [
  'Majeurs uniquement',
  'Consentement clair',
  'Discrétion totale',
  "Rien n'est publié sans ton accord",
] as const

const LEVELS: { title: string; text: string }[] = [
  {
    title: 'Appartenance',
    text: `${site.belonging.summary} ${site.belonging.price}.`,
  },
  { title: 'Priorité', text: site.belonging.priority },
  {
    title: site.belonging.app,
    text: 'L’application du contrat. Règles, tâches, points. Je mène.',
  },
]

/** Section « Contrat » : appartenance, latex et cuir, dans un cadre consenti. */
export default function CastingSection() {
  const contact = primaryContact()

  return (
    <section
      id="contrat"
      aria-label="Contrat"
      className="relative w-full bg-bg overflow-hidden scroll-mt-20 py-20 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-20"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader
          label="Contrat"
          title={
            <>
              Tu veux{' '}
              <em className="italic font-normal text-accent">m’appartenir</em>{' '}
              ?
            </>
          }
          aside={`${site.belonging.price}.\n${site.belonging.app} tient le quotidien.`}
        />

        <ol className="mb-8 grid grid-cols-1 gap-4 sm:mb-10 sm:grid-cols-3 sm:gap-5">
          {LEVELS.map((level, i) => (
            <li key={level.title}>
              <Reveal delay={0.05 * i} className="h-full">
                <article className="flex h-full flex-col gap-3 border border-accent/40 bg-surface/60 p-6 sm:p-7 shadow-glow">
                  <span
                    className="text-[11px] tracking-[0.35em] uppercase text-accent"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="text-[1.45rem] italic font-normal text-fg"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {level.title}
                  </h3>
                  <p
                    className="text-[16px] leading-[1.7] text-muted"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    {level.text}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mb-8 sm:mb-10">
          <article className="flex flex-col gap-5 border border-accent/40 bg-surface/60 p-6 sm:p-8 shadow-glow">
            <span
              className="text-[11px] tracking-[0.35em] uppercase text-accent"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {site.belonging.app}
            </span>
            <h3
              className="text-[1.45rem] italic font-normal text-fg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Comment je te tiens.
            </h3>
            <ul className="flex flex-col gap-3">
              {site.belonging.obedience.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="text-accent flex-shrink-0 text-[11px] mt-[5px]">—</span>
                  <span
                    className="text-[16px] leading-[1.7] text-muted font-normal"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-7">
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
                Jeu de rôle consenti et encadré. Latex, cuir, règles claires, safeword obligatoire.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex">
            <div className="flex w-full flex-col gap-6 p-8 lg:p-10 border border-accent/20 bg-surface/60 shadow-glow">
              <h3
                className="text-[1.35rem] lg:text-[1.55rem] leading-tight tracking-tight italic font-normal text-fg"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Pour entrer
              </h3>
              <ul className="flex flex-col gap-5">
                {[
                  { title: 'Majeur(e)', text: 'Obligatoire. Aucune exception.' },
                  { title: 'Offrande', text: 'Tu la poses avant. Elle ne se négocie pas.' },
                  {
                    title: 'Contrat',
                    text: `${site.belonging.price}. Appartenance totale. ${site.belonging.app} inclus.`,
                  },
                  { title: 'Ville', text: 'Strasbourg, Paris, ou à distance.' },
                ].map((c) => (
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
          <p
            className="max-w-md whitespace-pre-line border border-accent/20 bg-surface/60 px-6 py-5 text-left text-[14px] leading-[1.7] text-muted"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {APPLY_MESSAGE}
          </p>
          <a
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-box inline-flex min-h-14 w-full max-w-sm items-center justify-center bg-accent px-10 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-bg transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {contact.label}
          </a>
          <p
            className="text-[11px] tracking-[0.25em] uppercase text-muted font-normal"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Tu copies le message. Tu le complètes. Tu l’envoies sur X.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
