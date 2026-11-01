import { BadgeCheck } from 'lucide-react'
import { site, isPlaceholderLink } from '@/config/site'
import { proof } from '@/config/proof'
import Reveal from '@/components/Reveal'
import { MaybeLink } from '@/components/ContactLinks'

const PROFILE_LINKS = [
  { label: 'X', href: site.links.x },
  { label: 'Telegram', href: site.links.telegram },
  { label: 'MYM', href: site.links.mym },
] as const

const ITEM_CLASS =
  'text-[11px] tracking-[0.28em] uppercase text-muted font-normal'

/**
 * Bandeau sous le hero.
 * Données : src/config/proof.ts (chiffres) et src/config/site.ts (liens).
 */
export default function SocialProofBar() {
  return (
    <section
      aria-label="Preuves et profils officiels"
      className="relative w-full bg-bg border-y border-accent/20 px-6 py-7 md:px-12 lg:px-20"
    >
      <Reveal className="max-w-6xl mx-auto flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
        <ul
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          <li className={ITEM_CLASS}>
            Active depuis{' '}
            <strong className="font-semibold text-accent">{proof.activeSince}</strong>
          </li>
          <li className={ITEM_CLASS}>
            <strong className="font-semibold text-accent">{proof.followers}</strong>{' '}
            abonnés
          </li>
          <li className={`${ITEM_CLASS} inline-flex items-center gap-2 text-fg/85`}>
            <BadgeCheck size={14} strokeWidth={1.25} className="text-accent" aria-hidden="true" />
            {proof.officialLabel}
          </li>
        </ul>

        <nav
          aria-label="Profils officiels"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          {PROFILE_LINKS.map(({ label, href }) => (
            <MaybeLink
              key={label}
              href={href}
              className="text-[11px] tracking-[0.28em] uppercase font-normal"
            >
              {label}
              {isPlaceholderLink(href) ? ' · bientôt' : ''}
            </MaybeLink>
          ))}
        </nav>
      </Reveal>
    </section>
  )
}
