import Link from 'next/link'
import { site } from '@/config/site'
import Reveal from '@/components/Reveal'
import SectionHeader from '@/components/SectionHeader'

interface Step {
  title: string
  text:  string
}

const STEPS: Step[] = [
  {
    title: 'Écris sur Telegram',
    text:  "Présente-toi en deux phrases.\nDis ce que tu cherches.\nPas de message vague.",
  },
  {
    title: 'Tribute et validation',
    text:  "Je valide ou je refuse.\nSi c'est oui, le tribute se règle avant.\nPas de tribute, pas de séance.",
  },
  {
    title: 'Séance',
    text:  "Les règles sont rappelées au début.\nLe safeword arrête tout, tout de suite.\nSans discussion.",
  },
]

/** Protocole en 3 étapes (le détail complet est sur /protocole). */
export default function ProtocolSteps() {
  return (
    <section
      id="etapes"
      aria-label="Protocole en 3 étapes"
      className="relative w-full bg-bg overflow-hidden scroll-mt-20 py-24 lg:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader
          label="Protocole"
          title={
            <>
              Trois étapes.{' '}
              <em className="italic font-normal text-accent">Aucune exception.</em>
            </>
          }
          aside={'Tu suis le protocole.\nOu tu ne viens pas.'}
        />

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex">
              <Reveal delay={0.1 + i * 0.12} className="flex w-full">
                <div
                  className="
                    group relative flex w-full flex-col gap-5 p-8 lg:p-10 overflow-hidden
                    border border-accent/20 bg-surface/60 shadow-glow
                    transition-[border-color,box-shadow] duration-500
                    hover:border-accent hover:shadow-glow-strong
                  "
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -top-4 right-4 text-[7rem] font-bold italic leading-none text-fg/[0.04]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {i + 1}
                  </span>

                  <span
                    className="text-[11px] tracking-[0.4em] uppercase text-accent font-normal"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    Étape {i + 1}
                  </span>

                  <h3
                    className="text-[1.35rem] lg:text-[1.55rem] leading-tight tracking-tight italic font-normal text-fg"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-[15px] leading-[1.85] text-muted font-normal whitespace-pre-line"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    {step.text}
                  </p>

                  {i === 0 && (
                    <a
                      href={site.links.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        glow-box mt-auto block w-full py-4 text-center
                        text-[11px] tracking-[0.35em] uppercase font-medium
                        border border-accent/40 text-fg
                        transition-colors duration-300 hover:border-accent hover:text-accent
                        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60
                      "
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      Écrire sur Telegram
                    </a>
                  )}

                  {i === 2 && (
                    <p
                      className="mt-auto border-l-2 border-accent pl-4 text-[13px] leading-[1.7] text-fg/85"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      Rappel : le safeword est obligatoire. Un mot, et tout s&apos;arrête.
                    </p>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Link
            href="/protocole"
            className="text-[11px] tracking-[0.3em] uppercase text-muted hover:text-accent transition-colors duration-300"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Lire le protocole complet
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
