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
   * Tarifs. Seuls les montants explicitement donnés sont écrits.
   * Le reste reste TODO.
   */
  prices: {
    /** TODO */
    pieds: 'TODO',
    /** TODO */
    domination: 'TODO',
    /** Supplément uro, sur une séance de domination. */
    uroSupplement: '+50 €',
    /** TODO : séance BDSM hard, déchéance. */
    decheance: 'TODO',
    /** Plancher du cashmeet. */
    cashmeetFrom: '250 €',
    /** TODO : contenu, snap, cam, contrats, jeux. */
    virtuel: 'TODO',
  },
  /**
   * Options à l’intérieur d’une séance de domination.
   * Ce ne sont pas des séances séparées, ni des tarifs séparés.
   */
  dominationOptions:
    'CBT, facesitting, uro, ballbusting, humiliation. Des options. Pas des séances à part.',
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
