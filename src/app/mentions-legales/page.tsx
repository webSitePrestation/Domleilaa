import Link from 'next/link'
import { site } from '@/config/site'
import { MaybeLink } from '@/components/ContactLinks'

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-bg text-fg px-6 py-12 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col gap-8 mb-14">
          <Link
            href="/"
            className="inline-flex w-fit items-center text-[11px] tracking-[0.5em] uppercase text-accent hover:text-accent transition-colors duration-300"
            style={{ fontFamily: 'var(--font-ui)' }}
            aria-label="Retour à l'accueil"
          >
            {site.name}
          </Link>

          <div className="flex flex-col gap-4">
            <h1
              className="text-[clamp(2rem,5vw,3rem)] italic font-normal leading-tight text-fg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Mentions Légales
            </h1>
            <div className="w-16 h-px bg-accent/60" />
          </div>
        </header>

        <div className="reveal-group space-y-10">
          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-fg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Éditeur du site
            </h2>
            <p
              className="text-[16px] leading-[1.9] text-fg/75 font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Nom public : {site.name} ({site.handle}).
            </p>
            <ul
              className="space-y-1 text-[16px] leading-[1.9] text-fg/75 font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              <li>Éditeur : {site.legal.editorName}</li>
              <li>Statut : {site.legal.editorStatus}</li>
              <li>Immatriculation (SIREN / SIRET) : {site.legal.editorRegistration}</li>
              <li>Adresse de contact : {site.legal.editorAddress}</li>
              <li>Directeur de la publication : {site.legal.publicationDirector}</li>
            </ul>
            <div className="w-full h-px bg-accent/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-fg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Hébergement
            </h2>
            <ul
              className="space-y-1 text-[16px] leading-[1.9] text-fg/75 font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              <li>Hébergeur : {site.legal.hostName}</li>
              <li>Adresse : {site.legal.hostAddress}</li>
              <li>Site web : {site.legal.hostWebsite}</li>
            </ul>
            <div className="w-full h-px bg-accent/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-fg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Propriété intellectuelle
            </h2>
            <p
              className="text-[16px] leading-[1.9] text-fg/75 font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Les textes, visuels et éléments présents sur cette plateforme sont protégés. Toute reproduction,
              diffusion ou utilisation non autorisée est interdite sans accord préalable.
            </p>
            <div className="w-full h-px bg-accent/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-fg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Contenu réservé aux majeurs (+18)
            </h2>
            <p
              className="text-[16px] leading-[1.9] text-fg/75 font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Le contenu proposé est strictement réservé aux personnes majeures, âgées de 18 ans et plus.
            </p>
            <div className="w-full h-px bg-accent/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-fg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Données personnelles (pas de collecte)
            </h2>
            <p
              className="text-[16px] leading-[1.9] text-fg/75 font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Aucune donnée personnelle n&apos;est collectée via ce site. Aucun formulaire ni compte utilisateur
              n&apos;est proposé.
            </p>
            <div className="w-full h-px bg-accent/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-fg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Liens externes
            </h2>
            <p
              className="text-[16px] leading-[1.9] text-fg/75 font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Cette plateforme peut rediriger vers des services externes :
              {' '}
              <a href={site.links.telegram} target="_blank" rel="noopener noreferrer" className="text-fg/80 hover:text-accent transition-colors duration-300">
                Telegram
              </a>
              {', '}
              <a href={site.links.x} target="_blank" rel="noopener noreferrer" className="text-fg/80 hover:text-accent transition-colors duration-300">
                X
              </a>
              {', '}
              {/* TODO : WhatsApp et MYM deviennent cliquables dès que les liens sont renseignés dans site.ts */}
              <MaybeLink href={site.links.whatsapp}>WhatsApp (TODO)</MaybeLink>
              {' '}et{' '}
              <MaybeLink href={site.links.mym}>MYM (TODO)</MaybeLink>
              . Leur consultation implique leurs propres conditions d&apos;utilisation.
            </p>
            <div className="w-full h-px bg-accent/25" />
          </section>

          <section className="space-y-4">
            <h2
              className="text-[1.2rem] italic text-fg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Contact
            </h2>
            <p
              className="text-[16px] leading-[1.9] text-fg/75 font-normal"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Pour toute demande, le contact s&apos;effectue via
              {' '}
              <a href={site.links.telegram} target="_blank" rel="noopener noreferrer" className="text-fg/80 hover:text-accent transition-colors duration-300">
                Telegram
              </a>
              {' '}ou{' '}
              <a href={site.links.x} target="_blank" rel="noopener noreferrer" className="text-fg/80 hover:text-accent transition-colors duration-300">
                X
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-14 pt-8 border-t border-brown">
          <Link
            href="/"
            className="inline-flex items-center text-[11px] tracking-[0.35em] uppercase text-muted hover:text-accent transition-colors duration-300"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
