/**
 * `true` tant qu'un lien est encore un placeholder (« # » ou numéro en XXXXXXXXX).
 * Les composants n'affichent alors pas de lien cliquable : aucun lien mort.
 */
export function isPlaceholderLink(url: string): boolean {
  return url === '#' || url.includes('XXXXXXXXX')
}

/** Lien Telegram, avec un message pré-rempli si `text` est fourni. */
export function telegramLink(text?: string): string {
  const base = site.links.telegram
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export const site = {
  name: 'Domleilaa',
  handle: '@domleilaa',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://example.com',
  links: {
    telegram: 'https://t.me/domleilaa',
    x: 'https://x.com/domleilaa',
    /** TODO */
    whatsapp: 'https://wa.me/33XXXXXXXXX',
    /** TODO */
    mym: '#',
  },
  /** TODO */
  whatsappDisplay: 'TODO',
  city: 'Lille',
  travelCities: ['Paris'] as const,
  prices: {
    /** TODO : tarifs des 5 cartes de services (30 min / 1 h) */
    general30: 'TODO',
    general60: 'TODO',
    humiliation30: 'TODO',
    humiliation60: 'TODO',
    dressage30: 'TODO',
    dressage60: 'TODO',
    soubrette30: 'TODO',
    soubrette60: 'TODO',
    custom30: 'TODO',
    custom60: 'TODO',
  },
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
