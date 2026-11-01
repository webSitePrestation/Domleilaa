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
    /** TODO */
    feet30: 'TODO',
    feet60: 'TODO',
    domination30: 'TODO',
    domination60: 'TODO',
    duo30: 'TODO',
    duo60: 'TODO',
    trio30: 'TODO',
    trio60: 'TODO',
  },
} as const
