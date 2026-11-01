'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { site } from '@/config/site'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface GalleryItem {
  src:  string
  alt:  string
  size: 'tall' | 'wide' | 'small'
}

const ITEMS: GalleryItem[] = [
  { src: '/media/gallery-1.jpg', alt: site.name, size: 'tall'  },
  { src: '/media/gallery-2.jpg', alt: site.name, size: 'small' },
  { src: '/media/gallery-3.jpg', alt: site.name, size: 'small' },
  { src: '/media/gallery-4.jpg', alt: site.name, size: 'wide'  },
  { src: '/media/gallery-5.jpg', alt: site.name, size: 'small' },
  { src: '/media/gallery-6.jpg', alt: site.name, size: 'small' },
]

export default function TeasingSection() {
  const titleRef  = useRef<HTMLDivElement>(null)
  const gridRef   = useRef<HTMLDivElement>(null)
  const isInView  = useInView(titleRef, { once: true, amount: 0.2 })
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 })
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  useEffect(() => {
    if (!selectedImage) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedImage])

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { delay, duration: 0.85, ease: EASE },
  })

  return (
    <section
      id="gallery"
      aria-label={`Galerie — ${site.name}`}
      className="relative w-full bg-[#0A0A0A] overflow-hidden py-28 lg:py-40 px-6 md:px-12 lg:px-20"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-16 left-6 lg:left-20 text-[clamp(6rem,18vw,14rem)] font-bold italic leading-none text-[#E8E0D8]/[0.025]"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        04
      </span>

      <div className="relative z-10 max-w-6xl mx-auto">

        <div ref={titleRef}>
          <motion.div {...fadeUp(0)} className="flex items-center gap-4 flex-wrap mb-6">
            <div className="w-8 h-px bg-[#B22222] flex-shrink-0" />
            <span
              className="text-[9px] tracking-[0.35em] text-[#E8E0D8]/50 font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              — 04
            </span>
            <span
              className="text-[9px] tracking-[0.5em] uppercase text-[#B22222] font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Galerie
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-16 lg:mb-20">
            <motion.h2
              {...fadeUp(0.1)}
              className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.06] tracking-tight text-[#E8E0D8] font-normal"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Un aperçu libre et accessible.
            </motion.h2>

            <motion.p
              {...fadeUp(0.18)}
              className="text-[13px] leading-[1.8] text-[#E8E0D8]/55 font-light italic max-w-xs lg:text-right"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Parcours les visuels ici — sans barrière.
            </motion.p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="
            grid gap-2 lg:gap-3
            grid-cols-2 lg:grid-cols-3
            auto-rows-[180px] lg:auto-rows-[220px]
          "
        >
          {ITEMS.map((item, i) => (
            <motion.button
              key={i}
              type="button"
              aria-label={`Ouvrir l'image ${i + 1}`}
              onClick={() => setSelectedImage(item)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={gridInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: EASE }}
              className={`
                group relative overflow-hidden bg-[#111] cursor-zoom-in
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B22222]/60
                ${item.size === 'tall'  ? 'row-span-2' : ''}
                ${item.size === 'wide'  ? 'col-span-2' : ''}
              `}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="
                  object-cover object-top
                  scale-[1.03] group-hover:scale-[1.07]
                  transition-transform duration-700 ease-out
                  brightness-100 group-hover:brightness-105
                  transition-[transform,filter] duration-700
                "
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent 55%, rgba(10,10,10,0.35) 100%)',
                }}
              />

              <div
                className="
                  absolute inset-0 border border-[#B22222]/0
                  group-hover:border-[#B22222]/40
                  transition-colors duration-500 pointer-events-none
                "
              />
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ delay: 0.65, duration: 0.85, ease: EASE }}
          className="mt-16 lg:mt-20 flex flex-col items-center gap-6"
        >
          <div
            className="w-full h-px"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(178,34,34,0.25), transparent)',
            }}
          />

          <p
            className="text-[13px] text-[#E8E0D8]/40 font-light text-center max-w-sm whitespace-pre-line"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            {`Pour échanger,\nécris-moi sur Telegram.`}
          </p>

          <motion.a
            href={site.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            className="
              group relative
              flex items-center justify-center
              px-10 py-4 lg:px-14 lg:py-5
              border border-[#B22222]/40 hover:border-[#B22222]/80
              overflow-hidden transition-colors duration-500
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B22222]/60
            "
            style={{ animation: 'luxePulse 4s ease-in-out 1s infinite' }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[#B22222]/0 group-hover:bg-[#B22222]/8 transition-colors duration-500"
            />
            <span
              aria-hidden="true"
              className="
                absolute top-0 -left-full h-full w-1/2
                bg-gradient-to-r from-transparent via-[#B22222]/20 to-transparent
                group-hover:left-[160%] transition-[left] duration-700 ease-out
              "
            />
            <span
              className="relative z-10 text-[9px] tracking-[0.38em] uppercase font-light text-[#E8E0D8]"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Telegram — {site.name}
            </span>
          </motion.a>

          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-[#E8E0D8]/10" aria-hidden="true" />
            <span
              className="text-[7.5px] tracking-[0.3em] uppercase text-[#E8E0D8]/20"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Galerie gratuite · Accès direct
            </span>
            <div className="w-8 h-px bg-[#E8E0D8]/10" aria-hidden="true" />
          </div>
        </motion.div>

      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Aperçu image"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-2 text-[10px] tracking-[0.25em] uppercase text-[#E8E0D8]/90 border border-[#B22222]/50 hover:border-[#B22222]/80 transition-colors"
            >
              Fermer
            </button>

            <div className="h-full w-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="relative"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1600}
                  height={2200}
                  sizes="100vw"
                  className="max-h-[90vh] w-auto max-w-[92vw] object-contain"
                  priority
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
