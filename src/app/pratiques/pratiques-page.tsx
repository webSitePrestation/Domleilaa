import Link from 'next/link'
import { Check, X } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pratiques & Limites — Duo de Petons',
  description: 'Ce que je pratique, ce que je ne pratique pas. Mon style de domination, mes règles, mon cadre.',
  robots: { index: false, follow: false },
}

/* ─────────────────────────────────────────────────────────────────
   DONNÉES
───────────────────────────────────────────────────────────────── */
interface PratiqueItem {
  label: string
  note?: string
}

const OUI: PratiqueItem[] = [
  { label: 'Fétichisme des pieds (massage, léchage, odeur, chatouilles)' },
  { label: 'Trampling' },
  { label: 'Jeux de nourriture et d’odeur' },
  { label: 'Domination soft en complément' },
  { label: 'Ordres, petites gifles, crachats' },
  { label: 'Martinet, insultes, moqueries, footgagging' },
  { label: 'Sessions en duo ou trio (minimum deux dominatrices)' },
  { label: 'Disponibilités en journée ou début de soirée' },
  { label: 'Accueil à Charenton-le-Pont (métro Liberté)' },
]

const NON: PratiqueItem[] = [
  { label: 'Nudité pendant la séance (vous ou nous)' },
  { label: 'Masturbation pendant la séance (vous ou nous)' },
  { label: 'Non-respect du cadre annoncé' },
  { label: 'Insistance après un refus ou une limite posée' },
]

const STYLE: string[] = [
  'Les séances sont centrées sur le fétichisme des pieds, avec un cadre clair et assumé.',
  'Des pratiques de domination soft peuvent être ajoutées selon vos envies et validation.',
  'Le respect des limites est non négociable : ni nudité, ni masturbation, pour tout le monde.',
  'Contact uniquement par SMS ou WhatsApp au 06 42 21 80 42.',
]

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT
───────────────────────────────────────────────────────────────── */
export default function PratiquesPage() {
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
          Cadre & limites
        </span>
      </header>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col gap-20">

        {/* ── Titre ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#B22222]" />
            <span
              className="text-[9px] tracking-[0.5em] uppercase text-[#B22222] font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Mon cadre
            </span>
          </div>
          <h1
            className="text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] italic font-normal text-[#E8E0D8]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Pratiques
            <br />
            <span className="not-italic font-bold text-[#B22222]">&amp; Limites.</span>
          </h1>
          <p
            className="text-[13px] leading-[1.9] text-[#E8E0D8]/50 font-light max-w-lg mt-2"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Avant de nous contacter, lisez cette page attentivement.
            Nos séances réelles ont un cadre précis, des pratiques claires et des tarifs fixes.
          </p>
        </div>

        {/* ── Mon style ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-[1.4rem] italic font-normal text-[#E8E0D8]/80"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Conditions et cadre des séances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STYLE.map((s, i) => (
              <div
                key={i}
                className="border border-[#E8E0D8]/6 p-6 bg-[#161616]/60"
              >
                <p
                  className="text-[13px] leading-[1.85] text-[#E8E0D8]/55 font-light italic"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  &ldquo;{s}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-[#B22222]/20 bg-[#161616]/60 p-6">
          <h2
            className="text-[1.1rem] italic font-normal text-[#B22222]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Tarifs annoncés
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            <li className="text-[13px] text-[#E8E0D8]/65 font-light" style={{ fontFamily: 'var(--font-jost)' }}>
              Fétichisme pieds : 55€ par domina (30 min) · 90€ par domina (1 h)
            </li>
            <li className="text-[13px] text-[#E8E0D8]/65 font-light" style={{ fontFamily: 'var(--font-jost)' }}>
              Fétichisme + domination soft : 70€ par domina (30 min) · 120€ par domina (1 h)
            </li>
          </ul>
        </div>

        {/* Séparateur */}
        <div
          className="w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(178,34,34,0.2), transparent)' }}
        />

        {/* ── Grille Oui / Non ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* OUI */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#B22222]" />
              <h2
                className="text-[1.1rem] italic font-normal text-[#B22222]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Ce que je pratique
              </h2>
            </div>
            <ul className="flex flex-col gap-3">
              {OUI.map(({ label, note }) => (
                <li key={label} className="flex items-start gap-3 group">
                  <Check
                    size={13}
                    strokeWidth={1.5}
                    className="text-[#B22222] mt-[3px] flex-shrink-0"
                  />
                  <span
                    className="text-[13px] text-[#E8E0D8]/65 font-light leading-relaxed"
                    style={{ fontFamily: 'var(--font-jost)' }}
                  >
                    {label}
                    {note && (
                      <span className="text-[#E8E0D8]/30 ml-2 text-[11px] italic">
                        — {note}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* NON */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#E8E0D8]/20" />
              <h2
                className="text-[1.1rem] italic font-normal text-[#E8E0D8]/50"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Mes limites
              </h2>
            </div>
            <ul className="flex flex-col gap-3">
              {NON.map(({ label }) => (
                <li key={label} className="flex items-start gap-3">
                  <X
                    size={13}
                    strokeWidth={1.5}
                    className="text-[#E8E0D8]/25 mt-[3px] flex-shrink-0"
                  />
                  <span
                    className="text-[13px] text-[#E8E0D8]/35 font-light leading-relaxed line-through decoration-[#E8E0D8]/15"
                    style={{ fontFamily: 'var(--font-jost)' }}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Note bas */}
            <div className="border-l border-[#B22222]/30 pl-4 mt-4">
              <p
                className="text-[12px] italic text-[#E8E0D8]/35 leading-relaxed"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Ces limites sont définitives. Toute tentative de les
                dépasser entraîne un blocage immédiat.
              </p>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div
          className="w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(178,34,34,0.2), transparent)' }}
        />

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6 text-center">
          <p
            className="text-[13px] text-[#E8E0D8]/40 font-light max-w-sm"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Mon cadre vous convient ? Lisez ensuite mon protocole de contact
            avant de m&apos;écrire.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/protocole"
              className="px-8 py-4 border border-[#B22222]/45 hover:border-[#B22222]/80 text-[9px] tracking-[0.35em] uppercase font-light text-[#E8E0D8] hover:text-[#B22222] transition-colors duration-400"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Protocole de contact
            </Link>
            <Link
              href="/"
              className="text-[9px] tracking-[0.3em] uppercase font-light text-[#E8E0D8]/25 hover:text-[#E8E0D8]/50 transition-colors duration-300"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
