'use client'

import { useState } from 'react'
import { MediaPlaceholder, Watermark } from '@/components/WatermarkedImage'

interface ReelVideoProps {
  /** Ex. /media/reel-1.mp4 */
  src: string
  /** Ex. /media/reel-1-poster.jpg */
  poster: string
  /** Libellé accessible */
  label: string
}

type ReelStatus = 'loading' | 'ready' | 'error'

/**
 * Emplacement vidéo vertical (9:16) avec poster.
 * Tant que le fichier n'existe pas, un placeholder propre (fond surface)
 * occupe la place ; il disparaît dès que la vidéo est disponible.
 */
export default function ReelVideo({ src, poster, label }: ReelVideoProps) {
  const [status, setStatus] = useState<ReelStatus>('loading')

  return (
    <figure className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden border border-accent/20 bg-surface shadow-glow">
      {status !== 'ready' && <MediaPlaceholder />}

      {status !== 'error' && (
        <video
          controls
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={label}
          onLoadedMetadata={() => setStatus('ready')}
          onError={() => setStatus('error')}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            status === 'ready' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={src} type="video/mp4" onError={() => setStatus('error')} />
        </video>
      )}

      {/* Au-dessus de la barre de contrôle native */}
      {status === 'ready' && <Watermark className="bottom-14 right-2" />}
    </figure>
  )
}
