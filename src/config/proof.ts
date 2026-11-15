/**
 * Preuve sociale — UN SEUL fichier à modifier.
 * Rien n'est inventé : tout ce qui est marqué TODO reste à renseigner.
 * Un champ TODO n'est pas affiché.
 */

/** Bandeau sous le hero (liens : `site.links` dans site.ts). */
export const proof = {
  /** TODO : ex. « 2023 » */
  activeSince: 'TODO',
  /** TODO : ex. « 12 k » (à renseigner avec le vrai chiffre) */
  followers: 'TODO',
  officialLabel: 'Profil officiel',
}

export interface Testimonial {
  /** Retour anonymisé, sans nom ni détail identifiant. */
  quote: string
  /** Initiale + ville uniquement, ex. « M., Paris ». */
  author: string
}

/**
 * Section « Ils en parlent ».
 * Liste vide (`[]`) = section masquée automatiquement.
 * Ne rien inventer : laisser vide tant qu'il n'y a pas de vrais retours, avec accord.
 */
export const testimonials: Testimonial[] = []
