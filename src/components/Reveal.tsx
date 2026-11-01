'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

/** Apparition douce au scroll (respecte prefers-reduced-motion via MotionProvider). */
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay, duration: 0.85, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
