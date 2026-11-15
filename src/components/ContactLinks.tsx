import type { ReactNode } from 'react'
import { site, isPlaceholderLink } from '@/config/site'

const LINK_CLASS =
  'text-[11px] tracking-[0.22em] uppercase font-normal transition-colors duration-300'

/**
 * Lien externe qui n'est cliquable que s'il est configuré.
 * Tant que c'est un placeholder (TODO), le libellé s'affiche en texte atténué.
 */
export function MaybeLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  if (isPlaceholderLink(href)) {
    return (
      <span className={`text-muted/60 ${className}`} aria-disabled="true">
        {children}
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-fg/80 hover:text-accent transition-colors duration-300 ${className}`}
    >
      {children}
    </a>
  )
}

const CONTACT_LINKS = [
  { label: 'X', href: site.links.x },
  { label: 'Linktree', href: site.links.linktree },
  { label: 'Revolut', href: site.links.revolut },
  { label: 'PayPal', href: site.links.paypal },
] as const

/** Liens secondaires sous le CTA : X, Linktree, Revolut, PayPal. */
export default function ContactLinks({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-2 ${className}`}
      style={{ fontFamily: 'var(--font-ui)' }}
    >
      {CONTACT_LINKS.map(({ label, href }, index) => (
        <span key={label} className="inline-flex items-center gap-3">
          {index > 0 && <span className="w-px h-2 bg-brown" aria-hidden="true" />}
          {isPlaceholderLink(href) ? (
            <MaybeLink href={href} className={LINK_CLASS}>
              {label} · bientôt
            </MaybeLink>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${LINK_CLASS} text-muted hover:text-accent`}
            >
              {label}
            </a>
          )}
        </span>
      ))}
    </div>
  )
}
