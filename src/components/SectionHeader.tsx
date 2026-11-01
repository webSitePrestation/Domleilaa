import type { ReactNode } from 'react'
import Reveal from '@/components/Reveal'

/** En-tête de section : filet rose + label, titre serif (mot en italique via <em>), texte à droite. */
export default function SectionHeader({
  label,
  title,
  aside,
}: {
  label: string
  title: ReactNode
  aside?: string
}) {
  return (
    <div className="mb-14 lg:mb-16">
      <Reveal className="flex items-center gap-4 flex-wrap mb-6">
        <div className="w-8 h-px bg-accent flex-shrink-0" />
        <span
          className="text-[11px] tracking-[0.5em] uppercase text-accent font-normal"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          {label}
        </span>
      </Reveal>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
        <Reveal delay={0.1} className="max-w-3xl">
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-fg font-normal"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
        </Reveal>

        {aside && (
          <Reveal delay={0.18} className="max-w-xs lg:text-right">
            <p
              className="text-[15px] leading-[1.8] text-muted font-normal whitespace-pre-line"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {aside}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  )
}
