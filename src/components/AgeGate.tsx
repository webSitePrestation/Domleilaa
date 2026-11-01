'use client'

import { useEffect, useRef, useState } from 'react'
import Monogram from '@/components/Monogram'
import { site } from '@/config/site'

const STORAGE_KEY = 'domleilaa-age-ok'
const EXIT_URL = 'https://www.google.fr'
/** Id du conteneur du site : rendu inerte (clavier, lecteur d'écran) tant que l'écran est affiché. */
const ROOT_ID = 'site-root'

/**
 * 'checking' : premier rendu (serveur + avant lecture du stockage) → écran déjà opaque, pas de flash du site.
 * 'locked'   : accès non confirmé.
 * 'open'     : majorité confirmée.
 */
type GateState = 'checking' | 'locked' | 'open'

function readConfirmation(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    // Stockage indisponible (navigation privée, cookies bloqués…) : on redemande.
    return false
  }
}

function saveConfirmation() {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Impossible de mémoriser : la confirmation ne vaut que pour cette page.
  }
}

/** Écran d'entrée +18, plein écran, obligatoire. */
export default function AgeGate() {
  const [state, setState] = useState<GateState>('checking')
  const acceptRef = useRef<HTMLButtonElement>(null)
  const exitRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    setState(readConfirmation() ? 'open' : 'locked')
  }, [])

  // Tant que l'écran est là : pas de scroll, site inerte
  useEffect(() => {
    const root = document.getElementById(ROOT_ID)
    const html = document.documentElement

    if (state === 'open') {
      root?.removeAttribute('inert')
      html.style.removeProperty('overflow')
      return
    }

    root?.setAttribute('inert', '')
    html.style.overflow = 'hidden'
    return () => {
      root?.removeAttribute('inert')
      html.style.removeProperty('overflow')
    }
  }, [state])

  useEffect(() => {
    if (state === 'locked') acceptRef.current?.focus()
  }, [state])

  if (state === 'open') return null

  // Piège à focus : Tab reste entre les deux boutons
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Tab') return
    const first = acceptRef.current
    const last = exitRef.current
    if (!first || !last) return

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const accept = () => {
    saveConfirmation()
    setState('open')
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-text"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-bg px-6 py-10"
    >
      {state === 'locked' && (
        <div className="flex w-full max-w-md flex-col items-center gap-8 text-center">
          <Monogram
            className="h-14 w-auto text-accent [filter:drop-shadow(0_0_10px_var(--glow-strong))]"
            title={site.name}
          />

          <div className="flex flex-col items-center gap-4">
            <span
              className="glow-box border border-accent/50 px-4 py-1.5 text-[11px] font-semibold tracking-[0.4em] text-accent"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              +18
            </span>
            <h2
              id="age-gate-title"
              className="text-[clamp(2rem,8vw,2.8rem)] leading-[1.05] tracking-tight text-fg font-normal"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Réservé aux{' '}
              <em className="italic font-normal text-accent">adultes.</em>
            </h2>
            <p
              id="age-gate-text"
              className="max-w-sm text-[15px] leading-[1.8] text-muted font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Ce site contient du contenu pour adultes. Tu dois avoir 18 ans ou plus pour entrer.
              Tout est un jeu de rôle consenti et encadré.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3">
            <button
              ref={acceptRef}
              type="button"
              onClick={accept}
              className="glow-box w-full bg-accent px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-bg transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              J&apos;ai 18 ans ou plus
            </button>
            <a
              ref={exitRef}
              href={EXIT_URL}
              rel="noopener noreferrer"
              className="w-full border border-brown px-8 py-4 text-center text-[12px] uppercase tracking-[0.3em] text-muted transition-colors duration-300 hover:border-accent/60 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Quitter
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
