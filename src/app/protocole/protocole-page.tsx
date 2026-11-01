import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Protocole de contact — Duo de Petons',
  description: 'Comment m\'approcher correctement. Ce que j\'attends d\'un premier message.',
  robots: { index: false, follow: false },
}

const CONTACT_URL = 'https://wa.me/33642218042'

interface Etape {
  numero: string
  titre:  string
  texte:  string
  note?:  string
}

const ETAPES: Etape[] = [
  {
    numero: '01',
    titre:  'Lisez d\'abord',
    texte:  'Avant d\'écrire quoi que ce soit, lisez entièrement la page Pratiques & Limites. Un message qui pose une question déjà répondue ici sera ignoré.',
  },
  {
    numero: '02',
    titre:  'Contact SMS / WhatsApp',
    texte:  'Contactez-nous uniquement par SMS ou WhatsApp au 06 42 21 80 42 si vous êtes déjà aligné avec nos conditions.',
  },
  {
    numero: '03',
    titre:  'Le premier message',
    texte:  'Présentez-vous brièvement : qui vous êtes, ce que vous recherchez, durée souhaitée (30 min ou 1 h) et formule (duo ou trio).',
    note:   'Les vrais savent déjà comment s\'adresser à moi. Les autres apprennent à leurs dépens.',
  },
  {
    numero: '04',
    titre:  'Patience',
    texte:  'Je réponds quand je le décide. Je ne suis pas disponible en permanence. Relancer plusieurs fois avant d\'avoir une réponse est rédhibitoire.',
  },
  {
    numero: '05',
    titre:  'Acceptez le refus',
    texte:  'Je me réserve le droit de refuser tout contact sans justification. Un refus n\'est pas une invitation à insister.',
  },
]

const ERREURS: string[] = [
  'Envoyer un premier message sexuellement explicite',
  'Demander de la nudité ou de la masturbation',
  'Ignorer les limites listées sur la page Pratiques',
  'Vouvoyer puis tutoyer sans autorisation',
  'Demander des pratiques hors cadre annoncé',
  'Relancer après un silence ou un refus',
]

export default function ProtocolePage() {
  return (
    <main className="min-h-screen w-full bg-[#0A0A0A] text-[#E8E0D8]">

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="w-full border-b border-[#E8E0D8]/6 px-6 py-8 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="text-[10px] tracking-[0.5em] uppercase text-[#B22222] hover:text-[#B22222]/70 transition-colors duration-300"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          ← D · J
        </Link>
        <span
          className="text-[9px] tracking-[0.4em] uppercase text-[#E8E0D8]/25 font-light"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          Protocole
        </span>
      </header>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col gap-20">

        {/* ── Titre ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#B22222]" />
            <span
              className="text-[9px] tracking-[0.5em] uppercase text-[#B22222] font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Comment m&apos;approcher
            </span>
          </div>
          <h1
            className="text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] italic font-normal text-[#E8E0D8]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Protocole
            <br />
            <span className="not-italic font-bold text-[#B22222]">de contact.</span>
          </h1>
          <p
            className="text-[13px] leading-[1.9] text-[#E8E0D8]/50 font-light max-w-lg mt-2"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Contactez-nous seulement si vous acceptez le cadre :
            ni nudité, ni masturbation, et un respect strict des limites posées.
          </p>
        </div>

        {/* ── Étapes ──────────────────────────────────────────────── */}
        <div className="flex flex-col gap-0">
          {ETAPES.map(({ numero, titre, texte, note }, i) => (
            <div key={numero} className="relative flex gap-8 pb-12 last:pb-0">

              {/* Ligne verticale entre étapes */}
              {i < ETAPES.length - 1 && (
                <div className="absolute left-[22px] top-10 bottom-0 w-px bg-[#E8E0D8]/6" />
              )}

              {/* Numéro */}
              <div className="flex-shrink-0 w-11 h-11 border border-[#B22222]/30 flex items-center justify-center bg-[#0A0A0A] relative z-10">
                <span
                  className="text-[10px] tracking-[0.2em] text-[#B22222] font-light"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  {numero}
                </span>
              </div>

              {/* Contenu */}
              <div className="flex flex-col gap-3 pt-2 flex-1">
                <h2
                  className="text-[1.2rem] italic font-normal text-[#E8E0D8]/90"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {titre}
                </h2>
                <p
                  className="text-[13px] leading-[1.9] text-[#E8E0D8]/50 font-light"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  {texte}
                </p>
                {note && (
                  <div className="border-l border-[#B22222]/30 pl-4 mt-1">
                    <p
                      className="text-[12px] italic text-[#B22222]/60 leading-relaxed"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Séparateur */}
        <div
          className="w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(178,34,34,0.2), transparent)' }}
        />

        {/* ── Erreurs à éviter ────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-[1.3rem] italic font-normal text-[#E8E0D8]/70"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Ce qui mène à un blocage immédiat
          </h2>
          <ul className="flex flex-col gap-3">
            {ERREURS.map((e) => (
              <li key={e} className="flex items-start gap-3">
                <span className="text-[#E8E0D8]/20 flex-shrink-0 text-[10px] mt-[3px]">✕</span>
                <span
                  className="text-[13px] text-[#E8E0D8]/40 font-light leading-relaxed"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  {e}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Séparateur */}
        <div
          className="w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(178,34,34,0.2), transparent)' }}
        />

        {/* ── CTA final ───────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6 text-center">
          <p
            className="text-[1.1rem] italic text-[#E8E0D8]/60 leading-relaxed"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            &ldquo; Ceux qui respectent ces règles savent déjà
            ce qu&apos;ils cherchent. &rdquo;
          </p>

          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative flex items-center gap-3
              px-10 py-4 border border-[#B22222]/40 hover:border-[#B22222]/80
              overflow-hidden transition-colors duration-500
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B22222]/60
            "
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[#B22222]/0 group-hover:bg-[#B22222]/8 transition-colors duration-500"
            />
            <MessageSquare size={12} strokeWidth={1.5} className="relative z-10 text-[#B22222]" />
            <span
              className="relative z-10 text-[9px] tracking-[0.38em] uppercase font-light text-[#E8E0D8]"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Écrire sur WhatsApp
            </span>
          </a>

          <Link
            href="/"
            className="text-[9px] tracking-[0.3em] uppercase font-light text-[#E8E0D8]/25 hover:text-[#E8E0D8]/50 transition-colors duration-300"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>

      </div>
    </main>
  )
}
