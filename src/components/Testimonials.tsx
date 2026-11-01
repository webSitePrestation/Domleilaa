import { Quote } from 'lucide-react'
import { testimonials } from '@/config/proof'
import Reveal from '@/components/Reveal'
import SectionHeader from '@/components/SectionHeader'

/**
 * « Ils en parlent » — retours anonymisés.
 * Données : src/config/proof.ts. Liste vide = section masquée.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section
      id="retours"
      aria-label="Ils en parlent"
      className="relative w-full bg-bg overflow-hidden scroll-mt-20 py-24 lg:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader
          label="Retours"
          title={
            <>
              Ils en{' '}
              <em className="italic font-normal text-accent">parlent.</em>
            </>
          }
          aside={'Retours anonymisés.\nAucun nom, aucune photo.'}
        />

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {testimonials.map((t, i) => (
            <li key={`${t.author}-${i}`} className="flex">
              <Reveal delay={0.1 + i * 0.1} className="flex w-full">
                <figure
                  className="
                    group relative flex w-full flex-col gap-6 p-8 lg:p-10
                    border border-accent/20 bg-surface/60 shadow-glow
                    transition-[border-color,box-shadow] duration-500
                    hover:border-accent hover:shadow-glow-strong
                  "
                >
                  <Quote size={18} strokeWidth={1} className="text-accent" aria-hidden="true" />
                  <blockquote
                    className="text-[1.15rem] leading-[1.6] italic text-fg/90"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    « {t.quote} »
                  </blockquote>
                  <figcaption
                    className="mt-auto pt-2 text-[11px] tracking-[0.3em] uppercase text-muted font-normal"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    — {t.author}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
