# TODO restants — Domleilaa

Rien n'est inventé : tout ce qui est listé ici reste à renseigner par toi.

## 1. Liens et contacts (`src/config/site.ts`)
- [ ] `links.whatsapp` : remplacer `https://wa.me/33XXXXXXXXX` par le vrai lien (le lien devient cliquable tout seul).
- [ ] `whatsappDisplay` : numéro affiché, si tu veux le montrer.
- [ ] `links.mym` : remplacer `'#'` par le lien MYM (Footer, bandeau de preuve, mentions légales).
- [ ] `NEXT_PUBLIC_SITE_URL` : définir l'URL finale du site (sinon `https://example.com`).
  Elle sert aux URLs absolues des images Open Graph / Twitter.

## 2. Tarifs (`src/config/site.ts` → `prices`)
- [ ] `general30` / `general60` (Séance générale)
- [ ] `humiliation30` / `humiliation60`
- [ ] `dressage30` / `dressage60`
- [ ] `soubrette30` / `soubrette60`
- [ ] `custom30` / `custom60` (Pratiques sur demande)

Affichés dans les cartes de services et sur `/pratiques`.

## 3. Preuve sociale (`src/config/proof.ts`)
- [ ] `activeSince` : année de début d'activité.
- [ ] `followers` : nombre d'abonnés réel.
- [ ] `testimonials` : 3 retours anonymisés (`quote`, `author` ex. « M., Paris »).
  Liste vide `[]` = la section « Ils en parlent » disparaît.

## 4. Prochaines dates (`src/data/dates.json`)
- [ ] Lille : renseigner `dates` et `status`.
- [ ] Paris : renseigner `dates` et `status`.
- [ ] Ajouter d'autres villes si besoin (ville uniquement, jamais d'adresse).

## 5. Mentions légales (`src/config/site.ts` → `legal`)
- [ ] `editorName`, `editorStatus`, `editorRegistration`, `editorAddress`, `publicationDirector`
- [ ] `hostName`, `hostAddress`, `hostWebsite`

Aucune donnée personnelle n'est écrite : à toi de décider quoi publier (une obligation légale peut s'appliquer, à vérifier).

## 6. Médias à déposer dans `public/media/`
Les placeholders disparaissent dès que les fichiers existent. Le script `npm run strip-exif` nettoie les métadonnées avant chaque build.
- [ ] `hero.mp4` et `hero.webm` + `hero-poster.jpg`
- [ ] `about.jpg`
- [ ] `gallery-1.jpg` à `gallery-9.jpg`
- [ ] `reel-1.mp4` + `reel-1-poster.jpg`
- [ ] `reel-2.mp4` + `reel-2-poster.jpg`
- [ ] `og.jpg` (1200 × 630 conseillé, visage jamais visible). À défaut, `hero-poster.jpg` est utilisé, sinon une carte sombre avec le monogramme.
- [ ] Installer **ffmpeg** : il est indispensable pour nettoyer les métadonnées des vidéos. Sans lui, le build échoue si une vidéo contient des marqueurs GPS / EXIF (contournement : `SKIP_VIDEO_EXIF=1`, déconseillé).

## 7. SEO et validation
- [ ] Valider le site, puis me dire d'enlever `noindex, nofollow` (`src/app/layout.tsx`, bloc `robots`).
- [ ] Relire title et description (`src/app/layout.tsx`) avant la mise en ligne.
- [ ] Vérifier l'aperçu Open Graph / Twitter une fois le domaine défini.

## 8. Textes à relire
- [ ] FAQ (`src/components/Faq.tsx`) : paiement, annulation, lieux, refus. Confirmer que les règles décrites sont bien les tiennes.
- [ ] Section Tournage (`src/components/CastingSection.tsx`) : critères et message Telegram pré-rempli.
- [ ] `/pratiques` et `/protocole` : confirmer les limites et les étapes.
- [ ] Écran +18 (`src/components/AgeGate.tsx`) : URL du bouton « Quitter » (`https://www.google.fr` par défaut).
