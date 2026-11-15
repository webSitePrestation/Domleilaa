import { primaryContact } from '@/config/site'

/**
 * Barre fixe en bas, mobile uniquement : le contact principal est toujours visible.
 * z-40 : passe sous le menu, l'écran d'intro et la lightbox.
 */
export default function MobileContactBar() {
  const contact = primaryContact()

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden border-t border-accent/30 bg-bg/90 backdrop-blur-md px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-md items-center gap-3">
        <a
          href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-box flex h-14 flex-1 items-center justify-center bg-accent text-bg text-[13px] font-semibold uppercase tracking-[0.22em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          {contact.label}
        </a>
      </div>
    </div>
  )
}
