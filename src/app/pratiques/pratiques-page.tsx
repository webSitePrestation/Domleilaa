import Link from 'next/link'
import { Check, X } from 'lucide-react'
import type { Metadata } from 'next'
import { site } from '@/config/site'

export const metadata: Metadata = {
  title: `Pratiques & Limites — ${site.name}`,
  description: 'Ce que je pratique, ce que je refuse. Cashmeets à Strasbourg et à Paris. Jeu de rôle consenti, règles claires, safeword obligatoire.',
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
  { label: 'CBT', note: 'option, séance de domination' },
  { label: 'Facesitting', note: 'option, séance de domination' },
  { label: 'Uro', note: 'option, supplément à part' },
  { label: 'Ballbusting', note: 'option, séance de domination' },
  { label: 'Fétichisme des pieds', note: 'séance dédiée, ou dans la domination' },
  { label: 'Humiliation', note: 'mots, mépris, déchéance' },
  { label: 'Latex', note: 'tenue et cadre' },
  { label: 'Contrats d’appartenance', note: 'du suivi au quotidien complet' },
  { label: 'Findom', note: 'offrande avant toute attention' },
  { label: site.practicesAll },
  { label: 'Hommes de tous horizons' },
  { label: `Cashmeets à ${site.city} et à ${site.travelCities.join(', ')}` },
  { label: `Basée à ${site.city}, ${site.region}` },
]

const NON: PratiqueItem[] = [
  { label: 'Toute pratique sans accord préalable ni safeword' },
  { label: 'Un vrai chantage, hors jeu de rôle' },
  { label: 'Photos ou enregistrements sans mon accord' },
  { label: 'Insultes visant l’origine ou la couleur de peau' },
  { label: 'Tout contact avec un mineur, jamais' },
  { label: 'Insister après un refus ou une limite posée' },
  { label: 'Négocier l’offrande' },
]

const STYLE: string[] = [
  'Tout est un jeu de rôle consenti et encadré.',
  'Les règles et les limites sont posées avant le cashmeet.',
  'Le safeword est obligatoire. Un mot, et tout s’arrête.',
  'Contact sur X. L’offrande se règle avant.',
]

/** Tarifs : seuls les montants donnés sont écrits. Le reste est TODO dans site.ts */
const TARIFS: { label: string; value: string }[] = [
  { label: 'Fétichisme des pieds', value: site.prices.pieds },
  { label: 'Domination', value: site.prices.domination },
  { label: 'Uro, en plus', value: site.prices.uroSupplement },
  { label: 'BDSM hard — déchéance', value: site.prices.decheance },
  { label: 'Cashmeet', value: `À partir de ${site.prices.cashmeetFrom}` },
  { label: 'Virtuel', value: site.prices.virtuel },
]

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT
───────────────────────────────────────────────────────────────── */
export default function PratiquesPage() {
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
          Cadre & limites
        </span>
      </header>

      <div className="reveal-group max-w-4xl mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-20 md:py-28 flex flex-col gap-16 sm:gap-20">

        {/* ── Titre ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-accent" />
            <span
              className="text-[11px] tracking-[0.5em] uppercase text-accent font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Mon cadre
            </span>
          </div>
          <h1
            className="text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] italic font-normal text-fg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Pratiques
            <br />
            <span className="glow-text not-italic font-bold text-accent">&amp; Limites.</span>
          </h1>
          <p
            className="text-[15px] leading-[1.9] text-muted font-normal max-w-lg mt-2"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Lis cette page avant de m&apos;écrire.
            Cashmeets à {site.city} et à Paris. Règles claires. Safeword obligatoire.
          </p>
        </div>

        {/* ── Mon style ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-[1.4rem] italic font-normal text-fg/80"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Conditions et cadre des cashmeets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STYLE.map((s, i) => (
              <div
                key={i}
                className="border border-brown p-6 bg-surface/60"
              >
                <p
                  className="text-[15px] leading-[1.85] text-muted font-normal italic"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  &ldquo;{s}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-glow border border-accent/20 bg-surface/60 p-6 sm:p-8">
          <h2
            className="text-[1.25rem] italic font-normal text-accent"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tarifs
          </h2>
          <ul className="mt-5 flex flex-col gap-4">
            {TARIFS.map(({ label, value }) => (
              <li key={label} className="text-[16px] leading-relaxed text-muted font-normal" style={{ fontFamily: 'var(--font-ui)' }}>
                {label} : {value}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[15px] leading-relaxed text-muted" style={{ fontFamily: 'var(--font-ui)' }}>
            {site.dominationOptions}
          </p>
        </div>

        {/* Séparateur */}
        <div
          className="w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 20%, transparent), transparent)' }}
        />

        {/* ── Grille Oui / Non ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* OUI */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-accent" />
              <h2
                className="text-[1.1rem] italic font-normal text-accent"
                style={{ fontFamily: 'var(--font-display)' }}
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
                    className="text-accent mt-[3px] flex-shrink-0"
                  />
                  <span
                    className="text-[15px] text-muted font-normal leading-relaxed"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    {label}
                    {note && (
                      <span className="text-muted ml-2 text-[11px] italic">
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
              <div className="w-6 h-px bg-brown" />
              <h2
                className="text-[1.1rem] italic font-normal text-muted"
                style={{ fontFamily: 'var(--font-display)' }}
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
                    className="text-muted mt-[3px] flex-shrink-0"
                  />
                  <span
                    className="text-[15px] text-muted font-normal leading-relaxed line-through decoration-muted/50"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Note bas */}
            <div className="border-l border-accent/30 pl-4 mt-4">
              <p
                className="text-[14px] italic text-muted leading-relaxed"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Ces limites sont définitives. Tenter de les dépasser,
                c&apos;est un blocage immédiat.
              </p>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div
          className="w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 20%, transparent), transparent)' }}
        />

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6 text-center">
          <p
            className="text-[15px] text-muted font-normal max-w-sm"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Mon cadre te convient ? Lis ensuite mon protocole de contact
            avant de m&apos;écrire.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/protocole"
              className="glow-box px-8 py-4 border border-accent/40 hover:border-accent/80 text-[11px] tracking-[0.35em] uppercase font-normal text-fg hover:text-accent transition-colors duration-400"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Protocole de contact
            </Link>
            <Link
              href="/"
              className="text-[11px] tracking-[0.3em] uppercase font-normal text-muted hover:text-fg transition-colors duration-300"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
