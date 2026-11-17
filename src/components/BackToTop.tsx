'use client'

import { ArrowUp } from 'lucide-react'

/**
 * Flèche fixe, toujours visible. Le scroll respecte `prefers-reduced-motion`.
 * Sur mobile, elle reste au-dessus de la barre de contact.
 */
export default function BackToTop() {
  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut"
      className="
        glow-box fixed z-[46]
        right-4 bottom-[calc(6.25rem+env(safe-area-inset-bottom))]
        md:bottom-5 md:right-[5.75rem]
        flex h-11 w-11 items-center justify-center rounded-sm
        border border-accent/40 bg-surface/90 text-muted backdrop-blur-sm
        transition-colors duration-300
        hover:border-accent hover:text-accent
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
      "
    >
      <ArrowUp size={18} strokeWidth={1.5} aria-hidden="true" />
    </button>
  )
}
