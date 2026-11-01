'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import Monogram from '@/components/Monogram'
import { site } from '@/config/site'

export type MediaStatus = 'loading' | 'loaded' | 'error'

function join(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/* ─────────────────────────────────────────────────────────────────
   FILIGRANE — monogramme DL + « @domleilaa », discret, en bas à droite
───────────────────────────────────────────────────────────────── */
// Une classe de position fournie (top-, bottom-, left-, right-, inset-) remplace la position par défaut
const HAS_POSITION = /(^|\s)(?:[\w-]+:)*-?(?:top|bottom|left|right|inset)-/

export function Watermark({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={join(
        'pointer-events-none select-none absolute z-20',
        !HAS_POSITION.test(className) && 'bottom-2 right-2',
        'flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] text-fg/70',
        '[text-shadow:0_1px_6px_color-mix(in_srgb,var(--bg)_90%,transparent)]',
        className,
      )}
    >
      <Monogram className="h-3.5 w-auto text-accent/80" />
      {site.handle}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────
   PLACEHOLDER — fond surface + monogramme très discret.
   Il est recouvert dès que l'image existe et se charge.
───────────────────────────────────────────────────────────────── */
export function MediaPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={join('absolute inset-0 flex items-center justify-center bg-surface', className)}
    >
      <Monogram className="h-10 w-auto text-accent/20" />
    </div>
  )
}

type WatermarkedImageProps = Omit<ImageProps, 'src' | 'alt' | 'onLoad' | 'onError'> & {
  src: string
  alt: string
  /** Classes du conteneur (taille, ratio, arrondi…). */
  wrapperClassName?: string
  /** Position du filigrane (surcharge de bottom-2 right-2). */
  watermarkClassName?: string
  /** `false` : pas de filigrane (le parent en affiche un lui-même). */
  watermark?: boolean
  /** Remonte l'état de chargement (ex. désactiver un clic tant que l'image n'existe pas). */
  onStatusChange?: (status: MediaStatus) => void
}

/**
 * Toute image publique passe par ce composant.
 * - placeholder propre tant que le fichier n'existe pas (ou ne charge pas)
 * - filigrane « @domleilaa » en bas à droite, une fois l'image affichée
 * - mode `fill` : remplit son parent ; sinon : épouse la taille de l'image
 */
export default function WatermarkedImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  watermarkClassName,
  watermark = true,
  onStatusChange,
  fill,
  ...imageProps
}: WatermarkedImageProps) {
  const [status, setStatus] = useState<MediaStatus>('loading')

  const update = (next: MediaStatus) => {
    setStatus(next)
    onStatusChange?.(next)
  }

  return (
    <div
      className={join(
        'overflow-hidden bg-surface',
        fill ? 'absolute inset-0' : 'relative inline-block max-w-full align-top',
        wrapperClassName,
      )}
    >
      {status !== 'loaded' && <MediaPlaceholder />}

      {status !== 'error' && (
        <Image
          {...imageProps}
          src={src}
          alt={alt}
          fill={fill}
          className={join(
            className,
            'transition-[opacity,transform,filter] duration-700 ease-out',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => update('loaded')}
          onError={() => update('error')}
        />
      )}

      {watermark && status === 'loaded' && <Watermark className={watermarkClassName} />}
    </div>
  )
}
