'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { site } from '@/config/site'
import Reveal from '@/components/Reveal'
import SectionHeader from '@/components/SectionHeader'

interface FaqItem {
  question: string
  answer:   string
}

const FAQ: FaqItem[] = [
  {
    question: 'Comment se passe l’offrande ?',
    answer:
      "L'offrande se règle avant le cashmeet.\nLes moyens te sont donnés en privé, après ma validation : Unlockt, Revolut, PayPal, Throne.\nRien n'est demandé avant mon accord.",
  },
  {
    question: 'Et si je dois annuler ?',
    answer:
      "Préviens-moi le plus tôt possible sur X.\nLes conditions d'annulation te sont précisées à la validation.\nUn rendez-vous ignoré, c'est une porte fermée.",
  },
  {
    question: 'Où ont lieu les cashmeets ?',
    answer: `À ${site.city} et à ${site.travelCities.join(', ')}. Grand Est pour le reste.\nSeule la ville est annoncée. Le lieu exact n'est donné qu'après validation.`,
  },
  {
    question: 'Quels sont les tarifs ?',
    answer: [
      'Virtuel.',
      ...site.prices.virtual.map((item) =>
        item.note ? `${item.label} : ${item.value}. ${item.note}` : `${item.label} : ${item.value}.`,
      ),
      `${site.belonging.title} : ${site.belonging.price}.`,
      `${site.belonging.summary} ${site.belonging.priority}`,
      `Application ${site.belonging.app}.`,
      ...site.belonging.obedience,
      'Vente de contenu.',
      ...site.prices.content.map((item) => `${item.label} : ${item.value}.`),
      site.prices.realNote,
      ...site.prices.real.map((item) => `${item.label} : ${item.value}. ${item.detail}`),
      'Je ne négocie pas.',
    ].join('\n'),
  },
  {
    question: "Qu'est-ce qui est refusé ?",
    answer:
      "Les mineurs, toujours.\nToute pratique sans accord, ni safeword.\nLe vrai chantage, hors jeu de rôle.\nLes photos et enregistrements sans mon accord.\nLes insultes visant l'origine ou la couleur de peau.\nLes messages vagues ou insistants.",
  },
  {
    question: 'Et le consentement ?',
    answer:
      "Tout est un jeu de rôle consenti et encadré.\nLes règles et les limites sont posées avant.\nLe safeword est obligatoire : un mot, et tout s'arrête, sans discussion.",
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      id="faq"
      aria-label="Questions fréquentes"
      className="relative w-full bg-bg overflow-hidden scroll-mt-20 py-20 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-20"
    >
      <div className="relative z-10 max-w-3xl mx-auto">
        <SectionHeader
          label="FAQ"
          title={
            <>
              Tout est{' '}
              <em className="italic font-normal text-accent">dit.</em>
            </>
          }
        />

        <Reveal className="border-t border-accent/20">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.question} className="border-b border-accent/20">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="
                      group flex w-full items-center justify-between gap-6 py-7 sm:py-6 text-left
                      focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60
                    "
                  >
                    <span
                      className={`text-[1.15rem] lg:text-[1.3rem] italic font-normal transition-colors duration-300 group-hover:text-accent ${
                        isOpen ? 'text-accent' : 'text-fg'
                      }`}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.25}
                      aria-hidden="true"
                      className={`shrink-0 text-accent transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div
                    className={`overflow-hidden transition-[visibility] duration-500 ${
                      isOpen ? 'visible' : 'invisible'
                    }`}
                  >
                    <p
                      className="pb-6 text-[15px] leading-[1.85] text-muted font-normal whitespace-pre-line"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
