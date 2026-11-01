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

/**
 * Liens secondaires sous le CTA Telegram : X, puis WhatsApp (placeholder TODO).
 */
export default function ContactLinks({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      style={{ fontFamily: 'var(--font-ui)' }}
    >
      <a
        href={site.links.x}
        target="_blank"
        rel="noopener noreferrer"
        className={`${LINK_CLASS} text-muted hover:text-accent`}
      >
        X
      </a>
      <span className="w-px h-2 bg-brown" aria-hidden="true" />
      {/* TODO : renseigner site.links.whatsapp (https://wa.me/33XXXXXXXXX) */}
      <MaybeLink href={site.links.whatsapp} className={LINK_CLASS}>
        WhatsApp · bientôt
      </MaybeLink>
    </div>
  )
}
