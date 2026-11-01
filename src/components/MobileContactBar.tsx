import { site } from '@/config/site'

/**
 * Barre fixe en bas, mobile uniquement : le bouton Telegram est toujours visible.
 * z-40 : passe sous le menu, l'écran d'intro et la lightbox.
 */
export default function MobileContactBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden border-t border-accent/30 bg-bg/90 backdrop-blur-md px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-md items-center gap-3">
        <a
          href={site.links.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-box flex h-12 flex-1 items-center justify-center bg-accent text-bg text-[12px] font-semibold uppercase tracking-[0.28em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Écrire sur Telegram
        </a>
        <a
          href={site.links.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter sur X"
          className="glow-box flex h-12 w-12 shrink-0 items-center justify-center border border-accent/40 bg-surface text-fg text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          X
        </a>
      </div>
    </div>
  )
}
