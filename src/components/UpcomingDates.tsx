import { CalendarDays, MapPin } from 'lucide-react'
import { site } from '@/config/site'
import Reveal from '@/components/Reveal'
import SectionHeader from '@/components/SectionHeader'
import rawDates from '@/data/dates.json'

/**
 * Prochaines dates — lues dans src/data/dates.json.
 * Format d'une entrée : { "city": "Lille", "dates": "12-14 mars", "status": "ouvert" }
 * Statuts : "ouvert" | "complet" | "a-confirmer" (toute autre valeur = « À confirmer »).
 * Seule la VILLE est affichée : aucun autre champ (adresse…) n'est jamais lu ni montré.
 */
const STATUS: Record<string, { label: string; className: string }> = {
  ouvert:         { label: 'Places ouvertes', className: 'border-accent text-accent' },
  complet:        { label: 'Complet',         className: 'border-brown text-muted' },
  'a-confirmer':  { label: 'À confirmer',     className: 'border-cold/60 text-cold' },
}

interface DateEntry {
  city:   string
  dates:  string
  status: string
}

const DATES: DateEntry[] = (rawDates as Partial<DateEntry>[])
  .filter((d): d is DateEntry => typeof d.city === 'string' && d.city.trim() !== '')
  .map((d) => ({
    city:   d.city.trim(),
    dates:  typeof d.dates === 'string' && d.dates.trim() !== '' ? d.dates.trim() : 'TODO',
    status: typeof d.status === 'string' ? d.status : 'a-confirmer',
  }))

export default function UpcomingDates() {
  if (DATES.length === 0) return null

  return (
    <section
      id="dates"
      aria-label="Prochaines dates"
      className="relative w-full bg-bg border-y border-accent/20 scroll-mt-20 py-20 lg:py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader
          label="Agenda"
          title={
            <>
              Prochaines{' '}
              <em className="italic font-normal text-accent">dates.</em>
            </>
          }
          aside={`Basée à ${site.city}.\nJe me déplace partout en France.`}
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-7">
          {DATES.map((d, i) => {
            const status = STATUS[d.status] ?? STATUS['a-confirmer']
            return (
              <li key={`${d.city}-${i}`}>
                <Reveal delay={0.1 + i * 0.1}>
                  <div
                    className="
                      flex flex-col gap-5 p-8 lg:p-10
                      border border-accent/20 bg-surface/60 shadow-glow
                      transition-[border-color,box-shadow] duration-500
                      hover:border-accent hover:shadow-glow-strong
                    "
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        className="inline-flex items-center gap-3 text-[1.6rem] italic font-normal text-fg"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        <MapPin size={18} strokeWidth={1} className="text-accent" aria-hidden="true" />
                        {d.city}
                      </h3>
                      <span
                        className={`shrink-0 border px-3 py-1 text-[11px] tracking-[0.25em] uppercase font-normal ${status.className}`}
                        style={{ fontFamily: 'var(--font-ui)' }}
                      >
                        {status.label}
                      </span>
                    </div>

                    <p
                      className="inline-flex items-center gap-3 text-[15px] text-muted font-normal"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      <CalendarDays size={16} strokeWidth={1} className="text-accent" aria-hidden="true" />
                      {d.dates}
                    </p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <Reveal delay={0.2} className="mt-8">
          <p
            className="text-center text-[11px] tracking-[0.28em] uppercase text-muted font-normal"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Ville uniquement · Le lieu exact n&apos;est donné qu&apos;après validation
          </p>
        </Reveal>
      </div>
    </section>
  )
}
