# TODO restants — DeesseAlhya

Rien n'est inventé : tout ce qui est listé ici reste à renseigner.

## 1. Liens (`src/config/site.ts`)
- [ ] `links.linktree` : remplacer `'#'` par l'URL Linktree réelle (Unlockt, Revolut, PayPal, Throne). Le bouton principal bascule tout seul de X vers « Poser une offrande ».
- [ ] X est déjà posé : https://x.com/ursugarbab21
- [ ] `NEXT_PUBLIC_SITE_URL` : URL finale du site (sinon `https://example.com`). Sert aux images Open Graph / Twitter.

## 2. Tarifs (`src/config/site.ts` → `prices`)
- [x] Uro : `+50 €` (supplément). Cashmeet : à partir de `250 €`.
- [ ] `pieds` — séance fétichisme des pieds
- [ ] `domination` — séance domination
- [ ] `decheance` — BDSM hard
- [ ] `virtuel` — contenu, snap, cam, contrats, jeux

Affichés dans Le Culte et sur `/pratiques`.

## 3. Preuve sociale (`src/config/proof.ts`)
- [ ] `activeSince` et `followers` : un champ encore à `TODO` reste masqué.
- [ ] `testimonials` : retours anonymisés réels, ou laisser `[]` (la section disparaît).

## 4. Prochaines dates (`src/data/dates.json`)
- [ ] Strasbourg : `dates` et `status`.
- [ ] Paris : `dates` et `status`.
- [ ] Ville uniquement, jamais d'adresse.

## 5. Mentions légales (`src/config/site.ts` → `legal`)
- [ ] Tous les champs `editor*` et `host*` sont encore `TODO`.

## 6. Médias dans `public/media/`
Les placeholders disparaissent dès que les fichiers existent. `npm run strip-exif` tourne avant chaque build.
- [ ] `hero.mp4`, `hero.webm`, `hero-poster.jpg`
- [ ] `about.jpg`
- [ ] `gallery-1.jpg` à `gallery-9.jpg`
- [ ] `reel-1.mp4` + `reel-1-poster.jpg`
- [ ] `reel-2.mp4` + `reel-2-poster.jpg`
- [ ] `og.jpg` (1200 × 630, visage jamais visible)

## 7. SEO
- [ ] Enlever `noindex, nofollow` seulement après validation (`src/app/layout.tsx`).
