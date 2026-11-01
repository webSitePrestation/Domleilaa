import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import type { Metadata } from 'next'
import { site } from '@/config/site'

export const metadata: Metadata = {
  title: `Protocole de contact — ${site.name}`,
  description: 'Comment m\'approcher : premier message, tribute, validation, séance et safeword.',
  robots: { index: false, follow: false },
}

const CONTACT_URL = site.links.telegram

interface Etape {
  numero: string
  titre:  string
  texte:  string
  note?:  string
}

const ETAPES: Etape[] = [
  {
    numero: '01',
    titre:  'Lis d\'abord',
    texte:  'Lis la page Pratiques & Limites en entier. Une question dont la réponse est déjà écrite sera ignorée.',
  },
  {
    numero: '02',
    titre:  'Écris sur Telegram',
    texte:  'Contact uniquement sur Telegram. Pas de message vague, pas de simple « salut ».',
  },
  {
    numero: '03',
    titre:  'Le premier message',
    texte:  'Présente-toi en quelques lignes : qui tu es, ce que tu cherches, la durée (30 min ou 1 h) et la formule choisie. Confirme que tu es majeur.',
    note:   'Les vrais savent déjà comment s\'adresser à moi. Les autres apprennent.',
  },
  {
    numero: '04',
    titre:  'Patience',
    texte:  'Je réponds quand je le décide. Relancer avant d\'avoir une réponse, c\'est un blocage. Je peux refuser sans me justifier : un refus n\'est pas une invitation à insister.',
  },
  {
    numero: '05',
    titre:  'Tribute et validation',
    texte:  'Je valide ou je refuse. Si c\'est oui, le tribute se règle avant la séance, selon les modalités données en privé. Pas de tribute, pas de séance.',
  },
  {
    numero: '06',
    titre:  'Séance et safeword',
    texte:  'Les règles et les limites sont rappelées au début. Le safeword est obligatoire : un mot, et tout s\'arrête, immédiatement, sans discussion.',
    note:   'Tout est un jeu de rôle consenti et encadré.',
  },
]

const ERREURS: string[] = [
  'Envoyer un premier message sexuellement explicite',
  'Demander de la nudité ou un acte sexuel',
  'Ignorer les limites de la page Pratiques',
  'Négocier ou contester le tribute',
  'Demander des photos ou des enregistrements sans mon accord',
  'Tenter de passer outre le safeword ou une limite',
  'Relancer après un silence ou un refus',
]

export default function ProtocolePage() {
  return (
    <main className="min-h-screen w-full bg-bg text-fg">

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="w-full border-b border-brown px-6 py-8 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="text-[11px] tracking-[0.5em] uppercase text-accent hover:text-accent transition-colors duration-300"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          ← {site.name}
        </Link>
        <span
          className="text-[11px] tracking-[0.4em] uppercase text-muted font-normal"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Protocole
        </span>
      </header>

      <div className="reveal-group max-w-3xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col gap-20">

        {/* ── Titre ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-accent" />
            <span
              className="text-[11px] tracking-[0.5em] uppercase text-accent font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Comment m&apos;approcher
            </span>
          </div>
          <h1
            className="text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] italic font-normal text-fg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Protocole
            <br />
            <span className="glow-text not-italic font-bold text-accent">de contact.</span>
          </h1>
          <p
            className="text-[15px] leading-[1.9] text-muted font-normal max-w-lg mt-2"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Écris-moi seulement si tu acceptes le cadre : jeu de rôle consenti,
            règles claires, safeword obligatoire et respect strict des limites posées.
          </p>
        </div>

        {/* ── Étapes ──────────────────────────────────────────────── */}
        <div className="flex flex-col gap-0">
          {ETAPES.map(({ numero, titre, texte, note }, i) => (
            <div key={numero} className="relative flex gap-8 pb-12 last:pb-0">

              {/* Ligne verticale entre étapes */}
              {i < ETAPES.length - 1 && (
                <div className="absolute left-[22px] top-10 bottom-0 w-px bg-brown" />
              )}

              {/* Numéro */}
              <div className="flex-shrink-0 w-11 h-11 border border-accent/30 flex items-center justify-center bg-bg relative z-10">
                <span
                  className="text-[11px] tracking-[0.2em] text-accent font-normal"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  {numero}
                </span>
              </div>

              {/* Contenu */}
              <div className="flex flex-col gap-3 pt-2 flex-1">
                <h2
                  className="text-[1.2rem] italic font-normal text-fg/90"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {titre}
                </h2>
                <p
                  className="text-[15px] leading-[1.9] text-muted font-normal"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  {texte}
                </p>
                {note && (
                  <div className="border-l border-accent/30 pl-4 mt-1">
                    <p
                      className="text-[14px] italic text-accent leading-relaxed"
                      style={{ fontFamily: 'var(--font-display)' }}
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
          style={{ background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 20%, transparent), transparent)' }}
        />

        {/* ── Erreurs à éviter ────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-[1.3rem] italic font-normal text-fg/70"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ce qui mène à un blocage immédiat
          </h2>
          <ul className="flex flex-col gap-3">
            {ERREURS.map((e) => (
              <li key={e} className="flex items-start gap-3">
                <span className="text-muted flex-shrink-0 text-[11px] mt-[3px]">✕</span>
                <span
                  className="text-[15px] text-muted font-normal leading-relaxed"
                  style={{ fontFamily: 'var(--font-ui)' }}
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
          style={{ background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 20%, transparent), transparent)' }}
        />

        {/* ── CTA final ───────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6 text-center">
          <p
            className="text-[1.1rem] italic text-muted leading-relaxed"
            style={{ fontFamily: 'var(--font-display)' }}
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
              glow-box px-10 py-4 border border-accent/40 hover:border-accent/80
              overflow-hidden transition-colors duration-500
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60
            "
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-accent/0 group-hover:bg-accent/8 transition-colors duration-500"
            />
            <MessageSquare size={12} strokeWidth={1.5} className="relative z-10 text-accent" />
            <span
              className="relative z-10 text-[11px] tracking-[0.38em] uppercase font-normal text-fg"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Écrire sur Telegram
            </span>
          </a>

          <Link
            href="/"
            className="text-[11px] tracking-[0.3em] uppercase font-normal text-muted hover:text-fg transition-colors duration-300"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>

      </div>
    </main>
  )
}
