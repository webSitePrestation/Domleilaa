import Link from 'next/link'
import { site } from '@/config/site'

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E8E0D8] px-6 py-12 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col gap-8 mb-14">
          <Link
            href="/"
            className="inline-flex w-fit items-center text-[10px] tracking-[0.5em] uppercase text-[#B22222]/85 hover:text-[#B22222] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-jost)' }}
            aria-label="Retour à l'accueil"
          >
            {site.name}
          </Link>

          <div className="flex flex-col gap-4">
            <h1
              className="text-[clamp(2rem,5vw,3rem)] italic font-normal leading-tight text-[#E8E0D8]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Mentions Légales
            </h1>
            <div className="w-16 h-px bg-[#B22222]/60" />
          </div>
        </header>

        <div className="space-y-10">
          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-[#E8E0D8]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Éditeur du site
            </h2>
            <p
              className="text-[14px] leading-[1.9] text-[#E8E0D8]/75 font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Éditeur : TODO. Identité publique : {site.name}. Adresse : TODO. SIRET : TODO.
            </p>
            <div className="w-full h-px bg-[#B22222]/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-[#E8E0D8]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Hébergement
            </h2>
            <p
              className="text-[14px] leading-[1.9] text-[#E8E0D8]/75 font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Hébergeur : TODO.
            </p>
            <div className="w-full h-px bg-[#B22222]/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-[#E8E0D8]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Propriété intellectuelle
            </h2>
            <p
              className="text-[14px] leading-[1.9] text-[#E8E0D8]/75 font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Les textes, visuels et éléments présents sur cette plateforme sont protégés. Toute reproduction,
              diffusion ou utilisation non autorisée est interdite sans accord préalable.
            </p>
            <div className="w-full h-px bg-[#B22222]/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-[#E8E0D8]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Contenu réservé aux majeurs (+18)
            </h2>
            <p
              className="text-[14px] leading-[1.9] text-[#E8E0D8]/75 font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Le contenu proposé est strictement réservé aux personnes majeures, âgées de 18 ans et plus.
            </p>
            <div className="w-full h-px bg-[#B22222]/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-[#E8E0D8]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Données personnelles (pas de collecte)
            </h2>
            <p
              className="text-[14px] leading-[1.9] text-[#E8E0D8]/75 font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Aucune donnée personnelle n&apos;est collectée via ce site. Aucun formulaire ni compte utilisateur
              n&apos;est proposé.
            </p>
            <div className="w-full h-px bg-[#B22222]/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-[#E8E0D8]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Liens externes
            </h2>
            <p
              className="text-[14px] leading-[1.9] text-[#E8E0D8]/75 font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Cette plateforme peut rediriger vers des services externes :
              {' '}
              <a href={site.links.telegram} target="_blank" rel="noopener noreferrer" className="text-[#E8E0D8]/80 hover:text-[#B22222] transition-colors duration-300">
                Telegram
              </a>
              {', '}
              <a href={site.links.x} target="_blank" rel="noopener noreferrer" className="text-[#E8E0D8]/80 hover:text-[#B22222] transition-colors duration-300">
                X
              </a>
              {', '}
              <a href={site.links.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#E8E0D8]/80 hover:text-[#B22222] transition-colors duration-300">
                WhatsApp (TODO)
              </a>
              {' '}et{' '}
              <a href={site.links.mym} className="text-[#E8E0D8]/80 hover:text-[#B22222] transition-colors duration-300">
                MYM (TODO)
              </a>
              . Leur consultation implique leurs propres conditions d&apos;utilisation.
            </p>
            <div className="w-full h-px bg-[#B22222]/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-[#E8E0D8]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Contact
            </h2>
            <p
              className="text-[14px] leading-[1.9] text-[#E8E0D8]/75 font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Pour toute demande, le contact s&apos;effectue via
              {' '}
              <a href={site.links.telegram} target="_blank" rel="noopener noreferrer" className="text-[#E8E0D8]/80 hover:text-[#B22222] transition-colors duration-300">
                Telegram
              </a>
              {' '}ou{' '}
              <a href={site.links.x} target="_blank" rel="noopener noreferrer" className="text-[#E8E0D8]/80 hover:text-[#B22222] transition-colors duration-300">
                X
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-14 pt-8 border-t border-[#E8E0D8]/8">
          <Link
            href="/"
            className="inline-flex items-center text-[10px] tracking-[0.35em] uppercase text-[#E8E0D8]/40 hover:text-[#B22222]/70 transition-colors duration-300"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
