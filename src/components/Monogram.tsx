interface MonogramProps {
  className?: string
  /** Si fourni, le SVG est exposé aux lecteurs d'écran. Sinon il est décoratif. */
  title?: string
}

/**
 * Monogramme « DL » en SVG. La couleur suit `currentColor` :
 * on la règle avec une classe (ex. `text-accent`), jamais en dur.
 * Même dessin que `src/app/icon.svg` et `src/app/apple-icon.tsx`.
 */
export default function Monogram({ className = '', title }: MonogramProps) {
  return (
    <svg
      viewBox="4 0 82 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
    >
      {/* D */}
      <path d="M12 10 H24 C41 10 50 20 50 32 C50 44 41 54 24 54 H12 Z" />
      {/* L */}
      <path d="M62 10 V54 H78" />
    </svg>
  )
}
