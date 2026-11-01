'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Respecte `prefers-reduced-motion` pour toutes les animations framer-motion :
 * les translations/échelles sont désactivées, les fondus restent.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
