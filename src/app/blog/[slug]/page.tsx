import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { site } from '@/config/site'
import { ARTICLES, type Article } from '../blog-page'

/* ─────────────────────────────────────────────────────────────────
   CONTENU COMPLET DES ARTICLES
   Ajoute ici le texte de chaque article en correspondance avec son slug.
───────────────────────────────────────────────────────────────── */
const CONTENUS: Record<string, string[]> = {
  'dresser-une-sissy': [
    'Une sissy ne se fabrique pas en une nuit. Je commence toujours par casser les illusions : vous ne devenez pas une version fantasmée de vous-même, vous devenez ce que j\'impose. Le dressage commence quand vous arrêtez de négocier avec votre ego.',
    'La première phase est mentale. J\'installe des règles simples, répétitives, non discutables. Posture, langage, rituels quotidiens, compte-rendu précis. Si vous échouez sur la rigueur, vous échouez sur tout le reste. Je ne construis rien sur l\'instabilité.',
    'Ensuite, je travaille l\'identité. Je corrige votre manière de parler, de vous présenter, de penser votre propre désir. Une sissy disciplinée ne demande pas la permission d\'exister : elle prouve, par ses actes, qu\'elle mérite d\'être modelée. Chaque détail devient un levier.',
    'Le corps suit, mais il ne dirige jamais. Tenue, maintien, endurance, tolérance à la frustration : tout est mesuré, progressif, consigné. Je veux une transformation propre, contrôlée, sans théâtre inutile. Le spectaculaire m\'intéresse moins que la précision.',
    'Je sanctionne les écarts sans émotion. Une punition n\'est pas une colère, c\'est une correction. Quand vous comprenez ça, vous progressez vite. Quand vous le contestez, vous stagnez et vous sortez de mon cadre.',
    'Le résultat final n\'est pas un costume, c\'est une structure interne. Une sissy réussie sait obéir avant qu\'on insiste, anticipe avant qu\'on ordonne, et reste stable même sous pression. C\'est exactement ce que je cherche : une soumission entraînée, fiable, et utile.',
  ],
  'destruction-totale': [
    'La destruction totale n\'est pas de la violence aveugle. C\'est une méthode. Je retire, couche après couche, ce qui vous sert de masque : l\'orgueil, le contrôle apparent, les récits que vous utilisez pour vous protéger de vous-même.',
    'Je commence par identifier vos points d\'ancrage : statut, habitudes, certitudes, langage. Ensuite je les attaque dans l\'ordre qui vous déstabilise le plus. Rien de chaotique ici. Je veux une chute propre, progressive, impossible à nier.',
    'La douleur utile est psychologique avant d\'être physique. Je vous fais voir votre incohérence, je la répète, je vous oblige à la regarder jusqu\'à ce qu\'elle devienne intenable. Quand votre ancien cadre mental se fissure, le travail réel commence.',
    'Beaucoup réclament l\'intensité, peu supportent la répétition. Pourtant c\'est la répétition qui détruit l\'ego, pas le coup d\'éclat. Les mêmes consignes, les mêmes exigences, la même impossibilité de fuir vos limites. Jour après jour, vous cédez.',
    'Je ne détruis pas pour le plaisir de ruiner. Je détruis pour reconstruire sous autorité, avec une architecture claire. Sans cette seconde étape, ce n\'est qu\'un effondrement. Moi, je vise la reprogrammation, pas le désordre.',
    'Si vous entrez dans ce processus, vous perdez vos anciennes défenses. En échange, vous gagnez une place nette : moins de bruit, moins d\'ego, plus d\'obéissance réelle. La destruction totale, c\'est la fin de vos excuses et le début de votre utilité.',
  ],
  'humiliation-publique': [
    'L\'humiliation privée est un exercice préparatoire. L\'humiliation publique, elle, révèle la vérité. Devant les autres, vous ne pouvez plus tricher avec l\'image que vous voulez préserver. C\'est là que je mesure votre niveau réel de soumission.',
    'En public, chaque réaction compte : votre posture, votre respiration, votre regard, votre capacité à tenir une consigne simple sous pression sociale. Ceux qui se disent soumis mais s\'effondrent au premier témoin n\'étaient que performatifs.',
    'Je n\'utilise jamais le public au hasard. Je choisis le contexte, l\'intensité et l\'objectif. Une humiliation efficace n\'est pas un scandale : c\'est une mise en situation calibrée qui vous force à obéir sans vous cacher derrière le confort du privé.',
    'Le point crucial, c\'est la honte. Vous devez apprendre à la traverser au lieu de la fuir. Quand vous cessez de vous débattre contre ce que les autres peuvent penser, vous devenez enfin disponible à mon autorité.',
    'Ce test distingue les curieux des engagés. Les curieux veulent le frisson puis reculent dès qu\'il y a un enjeu social. Les engagés absorbent l\'impact, restent centrés, exécutent la consigne, et comprennent que l\'exposition est un outil de formation.',
    'Si vous passez ce cap, votre soumission change de nature. Elle devient plus stable, plus lucide, plus profonde. Vous ne cherchez plus à paraître soumis : vous l\'êtes, même quand le monde regarde.',
  ],
  'ce-que-j-attends-d-un-soumis': [
    'On me pose souvent la question : « Qu\'est-ce que vous cherchez chez un soumis ? » Comme si la réponse était une liste de cases à cocher. Ce n\'est pas comme ça que ça fonctionne.',
    'La première chose que j\'observe, c\'est le rapport au silence. Un soumis qui écrit dix messages d\'affilée sans réponse n\'a pas compris que l\'attente fait partie du jeu. Pire — il n\'a pas compris que son impatience lui retire le contrôle qu\'il pense encore avoir.',
    'Ce que j\'attends, c\'est de la conscience. Savoir pourquoi on cherche la soumission. Pas « parce que c\'est excitant » — ça, tout le monde le sait. Mais comprendre ce que ça révèle de soi. Ce besoin de poser la charge. Ce plaisir à obéir à quelqu\'un qui le mérite vraiment.',
    'J\'attends aussi de la discrétion. Ceux qui parlent de leur vie D/s à tout le monde n\'ont pas compris que le secret est une forme de respect. Ce qui se passe entre nous appartient à nous.',
    'Enfin, j\'attends de la constance. Pas de la perfection — personne n\'est parfait. Mais la régularité prouve l\'engagement. Un soumis qui disparaît deux semaines puis revient comme si de rien n\'était ne mérite pas qu\'on l\'attende.',
    'La soumission bien vécue est l\'une des postures les plus nobles qui soit. Elle demande une confiance absolue, une honnêteté totale, et un courage que beaucoup sous-estiment. Ceux qui la pratiquent vraiment le savent.',
  ],
  'art-du-teasing': [
    'Le teasing est mal compris. On le réduit souvent à une forme de jeu érotique, comme si son seul but était l\'excitation physique. C\'est passer à côté de ce qu\'il est vraiment.',
    'Le teasing est un outil de pouvoir. Quand je vous fais attendre, je ne joue pas à un jeu — je pose les fondations d\'une dynamique. Celui qui attend prouve qu\'il accepte de ne pas contrôler le tempo. C\'est déjà une forme de soumission.',
    'L\'attente crée un espace mental. Dans cet espace, je suis présente même quand je suis absente. Vous pensez à moi, vous anticipez, vous espérez. Ce travail psychologique est infiniment plus puissant que n\'importe quelle interaction directe.',
    'Il y a une technique dans le teasing. Trop peu, et l\'intérêt s\'évapore. Trop, et la frustration devient stérile. Le bon teasing entretient une tension — il donne juste assez pour que vous restiez, pas assez pour que vous soyez satisfaits.',
    'Le teasing bien exécuté finit par remodeler les attentes. Vous commencez à trouver de la satisfaction dans l\'attente elle-même. C\'est là que le vrai contrôle s\'installe. Plus besoin d\'agir — j\'ai déjà gagné.',
    'C\'est pourquoi je ne me précipite jamais. L\'urgence appartient à ceux qui n\'ont pas le contrôle.',
  ],
  'domination-lifestyle-ce-que-c-est': [
    'La domination lifestyle est souvent confondue avec du BDSM de chambre — une scène qui commence, une scène qui finit, chacun rentre chez soi. C\'est une vision réductrice.',
    'Le lifestyle, c\'est quand la dynamique de pouvoir dépasse le cadre de la scène pour infuser les interactions quotidiennes. Pas forcément de façon spectaculaire — souvent dans les détails. Un message envoyé au moment que je choisis. Une tâche accomplie sans que j\'aie besoin de la demander deux fois. Une présence attentive, constante.',
    'Ça ne signifie pas être disponible 24h/24 ou vivre dans un état permanent de soumission active. Ça signifie que la dynamique est intégrée. Elle fait partie de l\'identité, pas d\'un rôle qu\'on joue.',
    'La confusion naît souvent de la pornographie et des représentations faussées du BDSM. On imagine latex, fouets, ordres criés. La réalité du lifestyle est beaucoup plus subtile — et beaucoup plus puissante précisément parce qu\'elle est subtile.',
    'Ce qui caractérise la domination lifestyle, c\'est la continuité. La relation ne s\'éteint pas entre les interactions. Elle existe dans l\'espace entre elles. Dans l\'anticipation, dans le respect des règles établies, dans la conscience permanente de la dynamique.',
    'Ce n\'est pas fait pour tout le monde. Ça demande une maturité émotionnelle, une communication sans ego, et une confiance qui se construit lentement. Ceux qui cherchent du frisson ponctuel trouveront ça ailleurs.',
  ],
  'comment-ecrire-un-premier-message': [
    'Je vais être directe : la majorité des premiers messages que je reçois ne méritent pas de réponse. Pas parce que les gens sont mauvais — mais parce qu\'ils n\'ont pas réfléchi à ce qu\'ils écrivaient.',
    'Le premier message dit tout. Il révèle si vous avez lu ma page ou si vous avez simplement cliqué. Il révèle votre rapport au respect. Il révèle si vous cherchez quelque chose de réel ou si vous envoyez le même message à vingt Dominas en espérant que l\'une réponde.',
    'Ce que je veux lire : qui vous êtes, brièvement. Pas votre CV — deux phrases. Votre expérience ou votre inexpérience en soumission — l\'honnêteté vaut mieux que le bluff. Ce que vous cherchez — pas ce que vous imaginez que je veux entendre.',
    'Ce que je ne veux pas lire : une demande de photos ou de vidéos en premier message. Des compliments excessifs qui sonnent faux. Une familiarité que rien ne justifie. Des questions auxquelles j\'ai déjà répondu sur mon site.',
    'La longueur idéale ? Trois à cinq phrases. Pas plus. Quelqu\'un qui écrit dix paragraphes au premier contact cherche à impressionner — ce n\'est pas ce que je demande. Quelqu\'un qui écrit « bonjour » et s\'arrête là ne mérite pas qu\'on dépense de l\'énergie pour lui.',
    'Et surtout : envoyez ce message une seule fois. Si je ne réponds pas, c\'est une réponse. Relancer après 48h est acceptable une fois. Au-delà, c\'est un blocage.',
  ],
}

/* ─────────────────────────────────────────────────────────────────
   METADATA DYNAMIQUE
───────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = ARTICLES.find((a) => a.slug === params.slug)
  if (!article) return { title: 'Article introuvable' }
  return {
    title:       `${article.titre} — ${site.name}`,
    description: article.extrait,
    robots:      { index: true, follow: true },
  }
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

/* ─────────────────────────────────────────────────────────────────
   COMPOSANT
───────────────────────────────────────────────────────────────── */
export default function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = ARTICLES.find((a: Article) => a.slug === params.slug)
  if (!article) notFound()

  const contenu = CONTENUS[article.slug] ?? []
  const index   = ARTICLES.findIndex((a) => a.slug === params.slug)
  const suivant = ARTICLES[index + 1] ?? null
  const precedent = ARTICLES[index - 1] ?? null

  return (
    <main className="min-h-screen w-full bg-[#0A0A0A] text-[#E8E0D8]">

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="w-full border-b border-[#E8E0D8]/6 px-6 py-8 md:px-12 flex items-center justify-between">
        <Link
          href="/blog"
          className="text-[10px] tracking-[0.5em] uppercase text-[#B22222] hover:text-[#B22222]/70 transition-colors duration-300"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          ← Journal
        </Link>
        <span
          className="text-[9px] tracking-[0.4em] uppercase text-[#E8E0D8]/25 font-light"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          {article.readTime} min de lecture
        </span>
      </header>

      <article className="max-w-2xl mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* ── Meta ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-8">
          <span
            className="text-[8px] tracking-[0.4em] uppercase text-[#B22222] font-light border border-[#B22222]/30 px-2.5 py-1"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            {article.tag}
          </span>
          <span
            className="text-[9px] text-[#E8E0D8]/25 font-light"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            {article.date}
          </span>
        </div>

        {/* ── Titre ───────────────────────────────────────────────── */}
        <h1
          className="text-[clamp(1.8rem,5vw,3rem)] leading-[1.1] italic font-normal text-[#E8E0D8] mb-6"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {article.titre}
        </h1>

        {/* Ligne déco */}
        <div className="w-12 h-px bg-[#B22222] mb-12" />

        {/* ── Corps ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {contenu.map((paragraphe, i) => (
            <p
              key={i}
              className="text-[14px] leading-[2] text-[#E8E0D8]/60 font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              {paragraphe}
            </p>
          ))}
        </div>

        {/* Signature */}
        <div className="mt-16 flex items-center gap-4">
          <div className="w-8 h-px bg-[#B22222]/40" />
          <span
            className="text-[11px] tracking-[0.35em] italic text-[#B22222]/50"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {site.name}
          </span>
        </div>

        {/* ── Navigation entre articles ────────────────────────────── */}
        <div className="mt-20 pt-10 border-t border-[#E8E0D8]/6 flex flex-col sm:flex-row justify-between gap-6">
          {precedent ? (
            <Link
              href={`/blog/${precedent.slug}`}
              className="group flex flex-col gap-2 max-w-[220px]"
            >
              <span
                className="text-[8px] tracking-[0.3em] uppercase text-[#E8E0D8]/25 group-hover:text-[#B22222]/50 transition-colors"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                ← Précédent
              </span>
              <span
                className="text-[13px] italic text-[#E8E0D8]/50 group-hover:text-[#E8E0D8]/80 transition-colors leading-snug"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {precedent.titre}
              </span>
            </Link>
          ) : <div />}

          {suivant && (
            <Link
              href={`/blog/${suivant.slug}`}
              className="group flex flex-col gap-2 max-w-[220px] sm:text-right"
            >
              <span
                className="text-[8px] tracking-[0.3em] uppercase text-[#E8E0D8]/25 group-hover:text-[#B22222]/50 transition-colors"
                style={{ fontFamily: 'var(--font-jost)' }}
              >
                Suivant →
              </span>
              <span
                className="text-[13px] italic text-[#E8E0D8]/50 group-hover:text-[#E8E0D8]/80 transition-colors leading-snug"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {suivant.titre}
              </span>
            </Link>
          )}
        </div>

      </article>
    </main>
  )
}