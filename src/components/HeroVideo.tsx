'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import WatermarkedImage, { Watermark, type MediaStatus } from '@/components/WatermarkedImage'

const POSTER = '/media/hero-poster.jpg'

/**
 * Fond du hero : vidéo en boucle, sans son.
 * Couches (de bas en haut) :
 *   1. placeholder sombre (fond surface) tant qu'aucun média n'est dispo
 *   2. image fixe de repli (poster) — aussi utilisée si la vidéo ne charge pas
 *      ou si l'utilisateur demande moins de mouvement
 *   3. vidéo (webm si présent, sinon mp4), visible dès qu'elle est prête
 *   4. overlay dégradé pour la lisibilité du texte
 *   5. filigrane
 */
export default function HeroVideo() {
  const reduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [posterStatus, setPosterStatus] = useState<MediaStatus>('loading')

  const showVideo = !reduceMotion && !videoFailed

  // React ne reflète pas l'attribut `muted` dans le HTML rendu côté serveur :
  // on le force avant de lancer la lecture pour que l'autoplay soit autorisé.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !showVideo) return
    video.muted = true
    video.play().catch(() => {
      /* autoplay refusé : le poster reste affiché */
    })
  }, [showVideo])

  const mediaVisible = (showVideo && videoReady) || posterStatus === 'loaded'

  return (
    <div className="absolute inset-0 z-0 bg-surface" aria-hidden="true">
      {/* Image de repli (+ placeholder tant qu'elle n'existe pas) */}
      <WatermarkedImage
        src={POSTER}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        watermark={false}
        className="object-cover object-center"
        onStatusChange={setPosterStatus}
      />

      {/* Vidéo : webm d'abord (s'il existe), mp4 ensuite */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/media/hero.webm" type="video/webm" />
          {/* Dernière source : si elle échoue, plus rien ne peut jouer → repli sur l'image */}
          <source
            src="/media/hero.mp4"
            type="video/mp4"
            onError={() => setVideoFailed(true)}
          />
        </video>
      )}

      {/* Overlay dégradé : texte lisible sur n'importe quelle vidéo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in srgb, var(--bg) 60%, transparent) 0%, color-mix(in srgb, var(--bg) 0%, transparent) 30%, color-mix(in srgb, var(--bg) 65%, transparent) 65%, var(--bg) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--bg) 20%, transparent) 0%, color-mix(in srgb, var(--bg) 60%, transparent) 60%, var(--bg) 100%)',
        }}
      />

      {/* Filigrane : au-dessus des boutons flottants (X / Telegram) */}
      {mediaVisible && <Watermark className="bottom-24 right-4 md:bottom-7 md:right-40" />}
    </div>
  )
}
