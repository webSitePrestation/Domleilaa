/**
 * `true` tant qu'un lien est encore un placeholder (« # », vide, ou numéro en XXXXXXXXX).
 * Les composants n'affichent alors pas de lien cliquable : aucun lien mort.
 */
export function isPlaceholderLink(url: string): boolean {
  return url === '#' || url.trim() === '' || url.includes('XXXXXXXXX')
}

export const site = {
  name: 'DeesseAlhya',
  handle: '@ursugarbab21',
  /** Une phrase. La seconde est `signature`. */
  tagline: 'L’élégance d’une reine, la morsure d’une prédatrice.',
  signature: 'Ta liberté s’arrête là où mon plaisir commence.',
  /** Identité. Ne sert pas à trier les hommes : « hommes de tous horizons ». */
  origin: 'Marocaine',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://example.com',
  links: {
    x: 'https://x.com/ursugarbab21',
    linktree: 'https://linktr.ee/DeeseAlhya',
    revolut: 'https://revolut.me/celyawvuo',
    paypal: 'https://paypal.me/LauraMeyer200',
  },
  city: 'Strasbourg',
  region: 'Grand Est',
  travelCities: ['Paris'] as const,
  /**
   * Tarifs. Source unique : uniquement les montants donnés.
   * Le réel est indicatif (30 min) : il varie selon la demande, la durée et l’humeur.
   */
  prices: {
    virtual: [
      { label: 'Cam 10 min', value: '30 €', note: '' },
      { label: 'Appel 10 min', value: '30 €', note: '' },
      {
        label: 'Blackmail',
        value: '20 € de participation',
        note: 'Jeu de rôle consenti. Jamais un vrai chantage.',
      },
    ],
    content: [
      { label: 'Photo collant / chaussure / talon / bottines / basket', value: '10 €' },
      { label: 'Photo pieds nus', value: '15 €' },
      { label: 'Vidéo 1 min', value: '20 €' },
      { label: 'Vidéo pieds nus 1 min', value: '25 €' },
      { label: 'Vidéo trampling 1 min', value: '35 €' },
      { label: 'Vidéo footjob 1 min', value: '35 €' },
      { label: 'Vidéo foodcrush 1 min', value: '40 €' },
    ],
    realNote:
      'Les tarifs varient selon les pratiques demandées, la durée et mon humeur. Indicatifs pour 30 minutes.',
    real: [
      {
        label: 'Séance simple',
        value: '80 €',
        detail: 'Nettoyage de chaussures, léchage de pieds, massage.',
      },
      {
        label: 'Séance plus poussée',
        value: '100 €',
        detail: 'Selon les pratiques demandées, la durée et mon humeur.',
      },
      {
        label: 'Séance hard',
        value: '150 €',
        detail: 'Facesitting, cuck, uro, douleurs fortes.',
      },
    ],
  },
  /** Contrat d’appartenance totale. L’application Obedience en fait partie. */
  belonging: {
    title: 'Contrat d’appartenance totale',
    price: '50 à 100 € / mois',
    summary: 'Rituels, fidélité, protocole.',
    priority: 'Priorité sur les disponibilités.',
    app: 'Obedience',
    obedience: [
      'Règles personnalisées, écrites par moi.',
      'Tâches quotidiennes.',
      'Un système de points, selon ta régularité.',
      'Des récompenses si tu es régulier et docile.',
      'Des punitions que je choisis, si tu ne l’es pas.',
    ],
  },
  /** Phrase cadre. Toutes les pratiques, dans le consentement. */
  practicesAll:
    'Toutes les pratiques possibles. Dans le consentement. Avec safeword.',
  /**
   * Mentions légales : modèle à compléter. Aucune donnée personnelle ne doit
   * être écrite ici tant que tu ne l'as pas décidé. TODO : tous les champs.
   */
  legal: {
    editorName: 'TODO',
    editorStatus: 'TODO',
    editorRegistration: 'TODO',
    editorAddress: 'TODO',
    publicationDirector: 'TODO',
    hostName: 'TODO',
    hostAddress: 'TODO',
    hostWebsite: 'TODO',
  },
} as const

/**
 * Contact principal.
 * Linktree dès qu'il est renseigné (offrande). Sinon X, le seul lien réel connu.
 */
export function primaryContact(): { href: string; label: string; short: string } {
  if (!isPlaceholderLink(site.links.linktree)) {
    return {
      href: site.links.linktree,
      label: 'Poser une offrande',
      short: 'Linktree',
    }
  }
  return {
    href: site.links.x,
    label: 'Écrire sur X',
    short: 'X',
  }
}
