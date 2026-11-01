import Link from 'next/link'
import type { Metadata } from 'next'
import { site } from '@/config/site'

export const metadata: Metadata = {
  title: `Journal — ${site.name}`,
  description: 'Réflexions sur la domination, le lifestyle et l\'art de la soumission.',
  robots: { index: true, follow: true },
}

/* ─────────────────────────────────────────────────────────────────
   ARTICLES — ajoute ici tes futurs articles
   slug     = URL : /blog/[slug]
   date     = format lisible
   readTime = estimation en minutes
───────────────────────────────────────────────────────────────── */
export interface Article {
  slug:     string
  titre:    string
  extrait:  string
  date:     string
  readTime: number
  tag:      string
}

export const ARTICLES: Article[] = [
  {
    slug:     'dresser-une-sissy',
    titre:    'Dresser une sissy — de zéro à parfaite',
    extrait:  'La transformation sissy ne s\'improvise pas. C\'est un travail de fond, méthodique, qui touche à l\'identité. Voici comment j\'approche ce dressage particulier.',
    date:     '2 mai 2025',
    readTime: 5,
    tag:      'Sissy',
  },
  {
    slug:     'destruction-totale',
    titre:    'La destruction totale — ce que ça signifie vraiment',
    extrait:  'Quand je parle de destruction, certains imaginent de la brutalité gratuite. C\'est autre chose. C\'est une déconstruction chirurgicale de l\'ego, du contrôle, des certitudes.',
    date:     '25 avril 2025',
    readTime: 6,
    tag:      'Domination Hard',
  },
  {
    slug:     'humiliation-publique',
    titre:    'Humiliation publique — pourquoi c\'est le test ultime',
    extrait:  'Être humilié en privé, c\'est facile. Face à d\'autres, c\'est là que la vraie soumission se révèle. Ce que j\'observe chez ceux qui passent ce cap.',
    date:     '14 avril 2025',
    readTime: 4,
    tag:      'Humiliation',
  },
  {
    slug:     'ce-que-j-attends-d-un-soumis',
    titre:    'Ce que j\'attends d\'un soumis',
    extrait:  'La soumission n\'est pas de la faiblesse. C\'est un choix conscient, exigeant, qui demande autant de caractère que de dominer. Voici ce que j\'observe chez ceux qui méritent mon attention.',
    date:     '18 avril 2025',
    readTime: 4,
    tag:      'Soumission',
  },
  {
    slug:     'art-du-teasing',
    titre:    'L\'art du teasing — pourquoi l\'attente est une punition',
    extrait:  'Le teasing n\'est pas de la cruauté gratuite. C\'est un outil de contrôle. Quand je vous fais attendre, je ne joue pas — je travaille. Explications.',
    date:     '5 avril 2025',
    readTime: 5,
    tag:      'Domination',
  },
  {
    slug:     'domination-lifestyle-ce-que-c-est',
    titre:    'Domination lifestyle : ce que c\'est, ce que ce n\'est pas',
    extrait:  'Beaucoup confondent domination et jeu de rôle ponctuel. Le lifestyle, c\'est autre chose. C\'est une dynamique de pouvoir qui infuse le quotidien, pas un costume qu\'on enlève après.',
    date:     '22 mars 2025',
    readTime: 6,
    tag:      'Lifestyle',
  },
  {
    slug:     'comment-ecrire-un-premier-message',
    titre:    'Comment m\'écrire — le guide du premier message',
    extrait:  'Je reçois des dizaines de messages par semaine. La plupart ne méritent pas de réponse. Voici ce qui distingue un message qui retient mon attention de ceux que j\'ignore.',
    date:     '10 mars 2025',
    readTime: 3,
    tag:      'Contact',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen w-full bg-[#0A0A0A] text-[#E8E0D8]">

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="w-full border-b border-[#E8E0D8]/6 px-6 py-8 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="text-[10px] tracking-[0.5em] uppercase text-[#B22222] hover:text-[#B22222]/70 transition-colors duration-300"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          ← {site.name}
        </Link>
        <span
          className="text-[9px] tracking-[0.4em] uppercase text-[#E8E0D8]/25 font-light"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          Journal
        </span>
      </header>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col gap-16">

        {/* ── Titre ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#B22222]" />
            <span
              className="text-[9px] tracking-[0.5em] uppercase text-[#B22222] font-light"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Réflexions
            </span>
          </div>
          <h1
            className="text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] italic font-normal text-[#E8E0D8]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Mon journal.
          </h1>
          <p
            className="text-[13px] leading-[1.9] text-[#E8E0D8]/45 font-light max-w-md"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Ce que j&apos;observe. Ce que j&apos;exige. Ce que peu comprennent.
          </p>
        </div>

        {/* ── Liste articles ───────────────────────────────────────── */}
        <div className="flex flex-col gap-0">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block border-t border-[#E8E0D8]/6 py-10 last:border-b hover:border-[#B22222]/20 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                {/* Gauche */}
                <div className="flex flex-col gap-4 flex-1">
                  {/* Tag + date */}
                  <div className="flex items-center gap-4">
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

                  {/* Titre */}
                  <h2
                    className="text-[clamp(1.2rem,3vw,1.7rem)] italic font-normal text-[#E8E0D8]/85 group-hover:text-[#E8E0D8] leading-[1.2] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {article.titre}
                  </h2>

                  {/* Extrait */}
                  <p
                    className="text-[13px] leading-[1.8] text-[#E8E0D8]/40 font-light max-w-xl"
                    style={{ fontFamily: 'var(--font-jost)' }}
                  >
                    {article.extrait}
                  </p>
                </div>

                {/* Droite — flèche + temps */}
                <div className="flex md:flex-col items-center md:items-end gap-4 md:pt-1 md:pl-8 flex-shrink-0">
                  <span
                    className="text-[9px] tracking-[0.25em] uppercase text-[#E8E0D8]/20 font-light"
                    style={{ fontFamily: 'var(--font-jost)' }}
                  >
                    {article.readTime} min
                  </span>
                  <span
                    className="text-[#B22222]/40 group-hover:text-[#B22222] group-hover:translate-x-1 transition-all duration-300 text-lg"
                  >
                    →
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
