/**
 * Preuve sociale — UN SEUL fichier à modifier.
 * Rien n'est inventé : tout ce qui est marqué TODO reste à renseigner.
 */

/** Bandeau sous le hero (liens X / Telegram / MYM : voir `site.links` dans site.ts). */
export const proof = {
  /** TODO : ex. « 2023 » */
  activeSince: 'TODO',
  /** TODO : ex. « 12 k » (à renseigner avec le vrai chiffre) */
  followers: 'TODO',
  officialLabel: 'Profil officiel',
} as const

export interface Testimonial {
  /** Retour anonymisé, sans nom ni détail identifiant. */
  quote: string
  /** Initiale + ville uniquement, ex. « M., Paris ». */
  author: string
}

/**
 * Section « Ils en parlent ».
 * Liste vide (`[]`) = section masquée automatiquement.
 * Les entrées ci-dessous sont des placeholders : remplace-les par de vrais retours
 * (avec accord de la personne) ou vide la liste.
 */
export const testimonials: Testimonial[] = [
  { quote: 'TODO', author: 'M., Paris' },
  { quote: 'TODO', author: 'TODO' },
  { quote: 'TODO', author: 'TODO' },
]
