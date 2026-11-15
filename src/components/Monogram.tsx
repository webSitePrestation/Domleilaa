interface MonogramProps {
  className?: string
  /** Si fourni, le SVG est exposé aux lecteurs d'écran. Sinon il est décoratif. */
  title?: string
}

/**
 * Monogramme « DA » en SVG. La couleur suit `currentColor` :
 * on la règle avec une classe (ex. `text-accent`), jamais en dur.
 * Même dessin que `src/app/icon.svg` et `src/app/apple-icon.tsx`.
 */
export default function Monogram({ className = '', title }: MonogramProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
    >
      {/* D */}
      <path d="M10 16 H18 C28 16 33 22 33 32 C33 42 28 48 18 48 H10 Z" />
      {/* A */}
      <path d="M38 48 L46 16 L54 48" />
      <path d="M40.5 36 H51.5" />
    </svg>
  )
}
