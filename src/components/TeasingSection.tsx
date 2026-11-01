'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { site } from '@/config/site'
import WatermarkedImage, { type MediaStatus } from '@/components/WatermarkedImage'
import ReelVideo from '@/components/ReelVideo'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

/**
 * 9 emplacements /media/gallery-1.jpg → gallery-9.jpg.
 * Les ratios variés créent l'effet masonry ; les images sont recadrées par
 * `object-cover` : recadre les fichiers SANS VISAGE avant de les importer.
 */
interface GalleryItem {
  src:   string
  alt:   string
  ratio: string
}

const RATIOS = [
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/5]',
  'aspect-[3/5]',
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[3/5]',
  'aspect-[4/5]',
] as const

const ITEMS: GalleryItem[] = RATIOS.map((ratio, i) => ({
  src:   `/media/gallery-${i + 1}.jpg`,
  alt:   `${site.name} — visuel ${i + 1}`,
  ratio,
}))

/** 2 emplacements vidéo, avec leurs posters. */
const REELS = [
  { src: '/media/reel-1.mp4', poster: '/media/reel-1-poster.jpg', label: `${site.name} — reel 1` },
  { src: '/media/reel-2.mp4', poster: '/media/reel-2-poster.jpg', label: `${site.name} — reel 2` },
] as const

export default function TeasingSection() {
  const titleRef  = useRef<HTMLDivElement>(null)
  const gridRef   = useRef<HTMLDivElement>(null)
  const reelsRef  = useRef<HTMLDivElement>(null)
  const isInView  = useInView(titleRef, { once: true, amount: 0.2 })
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 })
  const reelsInView = useInView(reelsRef, { once: true, amount: 0.15 })
  const [selected, setSelected] = useState<number | null>(null)
  // Un emplacement n'est cliquable que lorsque son image existe et s'est chargée
  const [statuses, setStatuses] = useState<Record<number, MediaStatus>>({})

  const selectedImage = selected !== null ? ITEMS[selected] : null

  useEffect(() => {
    if (selected === null) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selected])

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { delay, duration: 0.85, ease: EASE },
  })

  return (
    <section
      id="gallery"
      aria-label={`Galerie — ${site.name}`}
      className="relative w-full bg-bg overflow-hidden py-28 lg:py-40 px-6 md:px-12 lg:px-20"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-16 left-6 lg:left-20 text-[clamp(6rem,18vw,14rem)] font-bold italic leading-none text-fg/[0.025]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        04
      </span>

      <div className="relative z-10 max-w-6xl mx-auto">

        <div ref={titleRef}>
          <motion.div {...fadeUp(0)} className="flex items-center gap-4 flex-wrap mb-6">
            <div className="w-8 h-px bg-accent flex-shrink-0" />
            <span
              className="text-[11px] tracking-[0.35em] text-muted font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              — 04
            </span>
            <span
              className="text-[11px] tracking-[0.5em] uppercase text-accent font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Galerie
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-16 lg:mb-20">
            <motion.h2
              {...fadeUp(0.1)}
              className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.06] tracking-tight text-fg font-normal"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Un aperçu libre et accessible.
            </motion.h2>

            <motion.p
              {...fadeUp(0.18)}
              className="text-[15px] leading-[1.8] text-muted font-normal italic max-w-xs lg:text-right"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Parcours les visuels ici — sans barrière.
            </motion.p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="columns-2 lg:columns-3 gap-2 lg:gap-3"
        >
          {ITEMS.map((item, i) => {
            const loaded = statuses[i] === 'loaded'

            return (
              <motion.button
                key={item.src}
                type="button"
                disabled={!loaded}
                aria-label={loaded ? `Ouvrir le visuel ${i + 1}` : `Visuel ${i + 1} à venir`}
                onClick={() => setSelected(i)}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={gridInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.7, ease: EASE }}
                className={`
                  group relative block w-full overflow-hidden bg-surface
                  mb-2 lg:mb-3 break-inside-avoid
                  enabled:cursor-zoom-in disabled:cursor-default
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60
                  ${item.ratio}
                `}
              >
                <WatermarkedImage
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="
                    object-cover object-center
                    scale-[1.03] group-hover:scale-[1.07]
                    brightness-100 group-hover:brightness-105
                  "
                  onStatusChange={(status) =>
                    setStatuses((prev) => (prev[i] === status ? prev : { ...prev, [i]: status }))
                  }
                />

                {loaded && (
                  <>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to bottom, transparent 55%, color-mix(in srgb, var(--bg) 35%, transparent) 100%)',
                      }}
                    />
                    <div
                      className="
                        absolute inset-0 border border-accent/0
                        group-hover:border-accent/40
                        transition-colors duration-500 pointer-events-none
                      "
                    />
                  </>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Reels */}
        <div ref={reelsRef} className="mt-20 lg:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={reelsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-accent flex-shrink-0" />
              <span
                className="text-[11px] tracking-[0.5em] uppercase text-accent font-normal"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Reels
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              {REELS.map((reel) => (
                <ReelVideo key={reel.src} {...reel} />
              ))}
            </div>
          </motion.div>
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
                'linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 25%, transparent), transparent)',
            }}
          />

          <p
            className="text-[15px] text-muted font-normal text-center max-w-sm whitespace-pre-line"
            style={{ fontFamily: 'var(--font-ui)' }}
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
              glow-box border border-accent/40 hover:border-accent/80
              overflow-hidden transition-colors duration-500
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60
            "
            style={{ animation: 'luxePulse 4s ease-in-out 1s infinite' }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-accent/0 group-hover:bg-accent/8 transition-colors duration-500"
            />
            <span
              aria-hidden="true"
              className="
                absolute top-0 -left-full h-full w-1/2
                bg-gradient-to-r from-transparent via-accent/20 to-transparent
                group-hover:left-[160%] transition-[left] duration-700 ease-out
              "
            />
            <span
              className="relative z-10 text-[11px] tracking-[0.38em] uppercase font-normal text-fg"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Telegram — {site.name}
            </span>
          </motion.a>

          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-brown" aria-hidden="true" />
            <span
              className="text-[11px] tracking-[0.3em] uppercase text-muted"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Galerie gratuite · Accès direct
            </span>
            <div className="w-8 h-px bg-brown" aria-hidden="true" />
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
            className="fixed inset-0 z-[90] bg-bg/90 backdrop-blur-sm p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Aperçu image"
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="glow-box absolute top-4 right-4 md:top-6 md:right-6 px-3 py-2 text-[11px] tracking-[0.25em] uppercase text-fg border border-accent/50 hover:border-accent/80 transition-colors"
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
                <WatermarkedImage
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1600}
                  height={2200}
                  sizes="92vw"
                  loading="eager"
                  className="h-auto w-auto max-h-[85vh] max-w-[92vw] object-contain"
                  watermarkClassName="bottom-3 right-3"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
