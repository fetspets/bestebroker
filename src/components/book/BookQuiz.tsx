'use client'

import { useState } from 'react'
import Link from 'next/link'
import { books, type Book } from '@/data/books'
import { bolLink } from '@/lib/affiliateLinks'

type QuizAnswer = {
  label: string
  scores: Partial<Record<string, number>>
}

type QuizQuestion = {
  question: string
  insight: string
  answers: QuizAnswer[]
}

const quizQuestions: QuizQuestion[] = [
  {
    question: 'Hoe lang beleg jij al?',
    insight: '💡 Wist je dat de meeste succesvolle beleggers zijn gestart met een goed boek — niet met een hot tip?',
    answers: [
      {
        label: '🌱 Ik heb nog nooit belegd',
        scores: { 'hangmatbelegger': 3, 'psychology-of-money-nl': 2, 'rich-dad-poor-dad': 3, 'jong-beleggen': 2, 'meer-geld-minder-stress': 1 },
      },
      {
        label: '📚 Minder dan 1 jaar',
        scores: { 'hangmatbelegger': 2, 'psychology-of-money-nl': 2, 'beleggen-doe-je-zo': 2, 'thomas-guenter': 1 },
      },
      {
        label: '📈 1 tot 5 jaar',
        scores: { 'beleggen-doe-je-zo': 2, 'random-walk-down-wall-street': 2, 'thomas-guenter': 2, 'fire-charlotte-van-brabander': 1 },
      },
      {
        label: '🏆 Meer dan 5 jaar',
        scores: { 'intelligente-belegger': 3, 'one-up-on-wall-street': 3, 'random-walk-down-wall-street': 2, 'simple-path-to-wealth': 2 },
      },
    ],
  },
  {
    question: 'Wat is je voornaamste financiële doel?',
    insight: '🎯 Je doel bepaalt welke strategie én welk boek het beste bij jou past.',
    answers: [
      {
        label: '🏖️ Zo vroeg mogelijk stoppen met werken (FIRE)',
        scores: { 'fire-charlotte-van-brabander': 4, 'simple-path-to-wealth': 3, 'hangmatbelegger': 2, 'random-walk-down-wall-street': 2 },
      },
      {
        label: '💰 Vermogen opbouwen op lange termijn',
        scores: { 'hangmatbelegger': 2, 'beleggen-doe-je-zo': 2, 'random-walk-down-wall-street': 2, 'simple-path-to-wealth': 2, 'thomas-guenter': 1 },
      },
      {
        label: '🧠 Beter omgaan met geld en minder stress',
        scores: { 'psychology-of-money-nl': 3, 'meer-geld-minder-stress': 4, 'rich-dad-poor-dad': 2, 'thomas-guenter': 2 },
      },
      {
        label: '🔬 Begrijpen hoe de markt echt werkt',
        scores: { 'random-walk-down-wall-street': 3, 'intelligente-belegger': 3, 'one-up-on-wall-street': 2, 'beleggen-doe-je-zo': 1 },
      },
    ],
  },
  {
    question: 'Hoeveel tijd wil je wekelijks besteden aan beleggen?',
    insight: '⏱️ Goed nieuws: passief beleggen verslaat de meeste actieve beleggers structureel — en kost nauwelijks tijd.',
    answers: [
      {
        label: '⚡ Zo weinig mogelijk — automatisch en vergeten',
        scores: { 'hangmatbelegger': 3, 'beleggen-doe-je-zo': 2, 'simple-path-to-wealth': 3, 'random-walk-down-wall-street': 1 },
      },
      {
        label: '📅 Een uurtje per maand',
        scores: { 'hangmatbelegger': 1, 'beleggen-doe-je-zo': 2, 'random-walk-down-wall-street': 2, 'thomas-guenter': 2 },
      },
      {
        label: '🔍 Meerdere uren per week analyseren',
        scores: { 'intelligente-belegger': 3, 'one-up-on-wall-street': 3, 'random-walk-down-wall-street': 2 },
      },
    ],
  },
  {
    question: 'Wat houdt je het meest tegen om meer te beleggen?',
    insight: '❤️ Je bent niet alleen — dit zijn de meest voorkomende drempels bij Belgische beleggers.',
    answers: [
      {
        label: '🤷 Ik weet niet goed waar ik moet beginnen',
        scores: { 'hangmatbelegger': 3, 'jong-beleggen': 3, 'beleggen-doe-je-zo': 2 },
      },
      {
        label: '😰 Angst om geld te verliezen',
        scores: { 'psychology-of-money-nl': 3, 'meer-geld-minder-stress': 3, 'random-walk-down-wall-street': 2, 'rich-dad-poor-dad': 1 },
      },
      {
        label: '💸 Het gevoel dat ik te weinig verdien',
        scores: { 'rich-dad-poor-dad': 3, 'psychology-of-money-nl': 2, 'meer-geld-minder-stress': 2, 'fire-charlotte-van-brabander': 2 },
      },
      {
        label: '📉 Beleggen lijkt te ingewikkeld',
        scores: { 'hangmatbelegger': 3, 'beleggen-doe-je-zo': 2, 'jong-beleggen': 2 },
      },
    ],
  },
  {
    question: 'Welk onderwerp boeit je het meest?',
    insight: '🌟 Het juiste boek wekt intrinsieke motivatie die je bijblijft — en dat verbetert je rendement.',
    answers: [
      {
        label: '📊 Passief beleggen, ETFs & indexfondsen',
        scores: { 'hangmatbelegger': 3, 'beleggen-doe-je-zo': 3, 'random-walk-down-wall-street': 3, 'simple-path-to-wealth': 2 },
      },
      {
        label: '🧠 De psychologie achter geldbeslissingen',
        scores: { 'psychology-of-money-nl': 4, 'meer-geld-minder-stress': 4, 'rich-dad-poor-dad': 2 },
      },
      {
        label: '🔎 Individuele aandelen selecteren',
        scores: { 'intelligente-belegger': 4, 'one-up-on-wall-street': 4, 'random-walk-down-wall-street': 1 },
      },
      {
        label: '🇧🇪 Belgische fiscaliteit & personal finance',
        scores: { 'thomas-guenter': 4, 'hangmatbelegger': 2, 'jong-beleggen': 2 },
      },
    ],
  },
  {
    question: 'In welke levensfase zit je?',
    insight: '📆 De beste tijd om te beginnen was 10 jaar geleden. De tweede beste tijd is vandaag.',
    answers: [
      {
        label: '🎓 Jonger dan 25 — net begonnen',
        scores: { 'jong-beleggen': 4, 'fire-charlotte-van-brabander': 3, 'hangmatbelegger': 2, 'rich-dad-poor-dad': 2 },
      },
      {
        label: '🚀 25 tot 35 — carrière & toekomst opbouwen',
        scores: { 'fire-charlotte-van-brabander': 3, 'hangmatbelegger': 2, 'beleggen-doe-je-zo': 2, 'simple-path-to-wealth': 2, 'psychology-of-money-nl': 1 },
      },
      {
        label: '🏡 35 tot 50 — midden in het leven',
        scores: { 'thomas-guenter': 2, 'random-walk-down-wall-street': 2, 'intelligente-belegger': 2, 'beleggen-doe-je-zo': 1 },
      },
      {
        label: '🎯 50 of ouder — optimaliseren wat ik heb',
        scores: { 'intelligente-belegger': 2, 'random-walk-down-wall-street': 2, 'thomas-guenter': 3, 'psychology-of-money-nl': 1 },
      },
    ],
  },
  {
    question: 'Welke leerstijl past het best bij jou?',
    insight: '📖 Het beste boek is niet het hoogst gewaardeerde — het is het boek dat jij ook echt uitleest.',
    answers: [
      {
        label: '✅ Een concreet stappenplan dat ik kan volgen',
        scores: { 'hangmatbelegger': 3, 'beleggen-doe-je-zo': 3, 'jong-beleggen': 2, 'thomas-guenter': 2 },
      },
      {
        label: '💭 Verhalen, metaforen en psychologie',
        scores: { 'psychology-of-money-nl': 4, 'meer-geld-minder-stress': 3, 'rich-dad-poor-dad': 3 },
      },
      {
        label: '📐 Wetenschappelijke onderbouwing & data',
        scores: { 'random-walk-down-wall-street': 4, 'intelligente-belegger': 3, 'simple-path-to-wealth': 2 },
      },
      {
        label: '⚡ Praktische tips die ik meteen kan toepassen',
        scores: { 'thomas-guenter': 3, 'meer-geld-minder-stress': 2, 'fire-charlotte-van-brabander': 2, 'hangmatbelegger': 1 },
      },
    ],
  },
  {
    question: 'Hoe belangrijk is de Belgische context voor jou?',
    insight: '🇧🇪 Belgen betalen TOB, roerende voorheffing en werken met andere brokers — dat maakt een groot verschil.',
    answers: [
      {
        label: '🔑 Heel belangrijk — ik wil Belgische voorbeelden',
        scores: { 'hangmatbelegger': 4, 'jong-beleggen': 3, 'thomas-guenter': 4, 'fire-charlotte-van-brabander': 3, 'meer-geld-minder-stress': 2 },
      },
      {
        label: '📝 Handig, maar niet strikt noodzakelijk',
        scores: { 'hangmatbelegger': 1, 'jong-beleggen': 1, 'thomas-guenter': 2, 'beleggen-doe-je-zo': 1 },
      },
      {
        label: '🌍 Niet belangrijk — principes zijn universeel',
        scores: { 'random-walk-down-wall-street': 2, 'simple-path-to-wealth': 2, 'intelligente-belegger': 2, 'one-up-on-wall-street': 2, 'psychology-of-money-nl': 1 },
      },
    ],
  },
  {
    question: 'Hoe zou jij je relatie met geld omschrijven?',
    insight: '💡 Hoe je over geld denkt is vaak bepalender voor je resultaat dan je kennis of inkomen.',
    answers: [
      {
        label: '💰 Ik spaar braaf maar doe er verder niets mee',
        scores: { 'hangmatbelegger': 3, 'jong-beleggen': 3, 'rich-dad-poor-dad': 2, 'psychology-of-money-nl': 2 },
      },
      {
        label: '😟 Ik maak me regelmatig zorgen over geld',
        scores: { 'meer-geld-minder-stress': 4, 'psychology-of-money-nl': 3, 'rich-dad-poor-dad': 2 },
      },
      {
        label: '📈 Ik wil mijn geld slimmer laten werken',
        scores: { 'hangmatbelegger': 2, 'beleggen-doe-je-zo': 3, 'random-walk-down-wall-street': 3, 'simple-path-to-wealth': 2 },
      },
      {
        label: '🏝️ Ik droom van financiële onafhankelijkheid',
        scores: { 'fire-charlotte-van-brabander': 4, 'simple-path-to-wealth': 3, 'hangmatbelegger': 2, 'random-walk-down-wall-street': 2 },
      },
    ],
  },
  {
    question: 'Ben je bereid een Engelstalig boek te lezen?',
    insight: '🌐 Sommige absolute klassiekers bestaan niet in het Nederlands — maar zijn elk euro waard.',
    answers: [
      {
        label: '✅ Ja, geen enkel probleem',
        scores: { 'random-walk-down-wall-street': 3, 'simple-path-to-wealth': 3, 'one-up-on-wall-street': 3, 'intelligente-belegger': 2 },
      },
      {
        label: '🇳🇱 Ik lees liever in het Nederlands',
        scores: { 'hangmatbelegger': 3, 'jong-beleggen': 3, 'thomas-guenter': 3, 'fire-charlotte-van-brabander': 3, 'meer-geld-minder-stress': 3, 'psychology-of-money-nl': 2, 'beleggen-doe-je-zo': 2 },
      },
      {
        label: '🤔 Alleen als het echt de moeite waard is',
        scores: { 'intelligente-belegger': 2, 'random-walk-down-wall-street': 2, 'simple-path-to-wealth': 2, 'one-up-on-wall-street': 2 },
      },
    ],
  },
]

// Pre-calculate max achievable score per book (sum of highest score per question)
const MAX_SCORES: Record<string, number> = (() => {
  const result: Record<string, number> = {}
  for (const q of quizQuestions) {
    const maxPerQ: Record<string, number> = {}
    for (const a of q.answers) {
      for (const [id, pts] of Object.entries(a.scores)) {
        maxPerQ[id] = Math.max(maxPerQ[id] ?? 0, pts as number)
      }
    }
    for (const [id, pts] of Object.entries(maxPerQ)) {
      result[id] = (result[id] ?? 0) + pts
    }
  }
  return result
})()

// ── Sub-components ─────────────────────────────────────────────────────────

function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-6">
      <div className="text-6xl mb-5">📚</div>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">
        Welk beleggingsboek past perfect bij jou?
      </h1>
      <p className="text-gray-600 text-lg mb-6 max-w-lg mx-auto">
        Beantwoord 10 vragen en ontdek welk boek het meeste impact zal hebben op jouw financiële toekomst.
      </p>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-8">
        <span>✅ 10 vragen</span>
        <span>⏱️ 2 minuten</span>
        <span>🎯 Persoonlijk advies</span>
        <span>💯 Gratis</span>
      </div>
      <button onClick={onStart} className="btn-primary text-base px-8 py-3">
        Start de quiz →
      </button>
      <p className="text-xs text-gray-400 mt-4">
        Uit 12 zorgvuldig geselecteerde boeken voor Belgische beleggers
      </p>
    </div>
  )
}

function MatchBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-accent h-1.5 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-accent w-10 text-right">{pct}%</span>
    </div>
  )
}

function QuizResult({
  scores,
  onRestart,
}: {
  scores: Record<string, number>
  onRestart: () => void
}) {
  const topBooks = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([id]) => books.find(b => b.id === id))
    .filter((b): b is Book => b !== undefined)

  function matchPct(bookId: string, score: number): number {
    const max = MAX_SCORES[bookId] ?? 1
    return Math.min(Math.round((score / max) * 100), 99)
  }

  const [topBook, ...otherBooks] = topBooks

  if (!topBook) return null

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
          Jouw persoonlijke aanbeveling
        </h2>
        <p className="text-gray-600">
          Op basis van jouw antwoorden zijn dit de boeken die het meeste impact zullen hebben.
        </p>
      </div>

      {/* #1 Best match */}
      <div className="mb-5 p-5 md:p-6 rounded-2xl border-2 border-accent bg-gradient-to-br from-accent/10 to-white">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-white bg-accent px-3 py-1 rounded-full">🏆 Beste match</span>
        </div>
        <div className="flex gap-4 md:gap-5">
          {topBook.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={topBook.coverImageUrl}
              alt={`Omslag ${topBook.title}`}
              className="w-20 h-28 object-cover rounded-lg flex-shrink-0 shadow-md"
            />
          ) : (
            <div className="w-20 h-28 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-3xl">📚</div>
          )}
          <div className="flex-1 min-w-0">
            <Link
              href={`/boeken/${topBook.slug}`}
              className="font-display font-bold text-lg md:text-xl text-primary hover:text-accent transition-colors block"
            >
              {topBook.title}
            </Link>
            <p className="text-sm text-gray-500 mb-2">{topBook.author}</p>
            <MatchBar pct={matchPct(topBook.id, scores[topBook.id] ?? 0)} />
            <p className="text-sm text-gray-700 mt-3 mb-4">{topBook.whyBelgium}</p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-lg text-accent">€{topBook.priceEur.toFixed(2)}</span>
              <a
                href={bolLink(topBook.bolUrl)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-primary text-sm py-2"
              >
                Bekijk op bol.com →
              </a>
              <Link href={`/boeken/${topBook.slug}`} className="text-sm text-gray-500 hover:text-accent transition-colors">
                Meer info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Social proof nudge */}
      <p className="text-center text-sm text-gray-500 italic mb-6">
        &ldquo;Beleggers die dit boek lazen, zeggen achteraf dat ze wensten dat ze eerder waren begonnen.&rdquo;
      </p>

      {/* #2 and #3 */}
      {otherBooks.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Ook een goede match</h3>
          <div className="space-y-3">
            {otherBooks.map((book, i) => (
              <div
                key={book.id}
                className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-accent transition-colors"
              >
                <span className="text-xl font-bold text-gray-300 w-5 flex-shrink-0 mt-0.5">{i + 2}</span>
                {book.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={book.coverImageUrl}
                    alt={`Omslag ${book.title}`}
                    className="w-12 h-16 object-cover rounded flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center text-xl">📚</div>
                )}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/boeken/${book.slug}`}
                    className="font-semibold text-primary hover:text-accent text-sm block mb-0.5"
                  >
                    {book.title}
                  </Link>
                  <p className="text-xs text-gray-400 mb-2">{book.author}</p>
                  <MatchBar pct={matchPct(book.id, scores[book.id] ?? 0)} />
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm font-semibold text-accent">€{book.priceEur.toFixed(2)}</span>
                    <a
                      href={bolLink(book.bolUrl)}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-xs bg-accent text-white px-2.5 py-1 rounded-lg hover:opacity-90 font-medium"
                    >
                      bol.com →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer actions */}
      <div className="flex flex-wrap items-center gap-4 pt-5 border-t border-gray-100">
        <button
          onClick={onRestart}
          className="text-sm text-gray-500 hover:text-primary border border-gray-200 rounded-lg px-4 py-2 hover:border-gray-300 transition-colors"
        >
          ↺ Quiz opnieuw doen
        </button>
        <Link href="/boeken" className="text-sm text-accent hover:underline">
          Bekijk alle aanbevolen boeken →
        </Link>
      </div>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────

export function BookQuiz() {
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [visible, setVisible] = useState(true)

  const question = quizQuestions[currentQ]
  const progress = (currentQ / quizQuestions.length) * 100

  function handleSelect(idx: number) {
    if (answered) return
    setSelectedIdx(idx)
    setAnswered(true)
    const answer = question.answers[idx]
    setScores(prev => {
      const next = { ...prev }
      for (const [id, pts] of Object.entries(answer.scores)) {
        next[id] = (next[id] ?? 0) + (pts as number)
      }
      return next
    })
  }

  function handleNext() {
    setVisible(false)
    setTimeout(() => {
      if (currentQ + 1 >= quizQuestions.length) {
        setPhase('result')
      } else {
        setCurrentQ(q => q + 1)
        setSelectedIdx(null)
        setAnswered(false)
      }
      setVisible(true)
    }, 180)
  }

  function handleRestart() {
    setPhase('intro')
    setCurrentQ(0)
    setSelectedIdx(null)
    setAnswered(false)
    setScores({})
    setVisible(true)
  }

  if (phase === 'intro') return <QuizIntro onStart={() => setPhase('quiz')} />
  if (phase === 'result') return <QuizResult scores={scores} onRestart={handleRestart} />

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-primary">Vraag {currentQ + 1} van {quizQuestions.length}</span>
          <span className="text-gray-400">{currentQ} beantwoord</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question + answers */}
      <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.18s ease' }}>
        <h2 className="font-display text-xl md:text-2xl font-bold text-primary mb-6">
          {question.question}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {question.answers.map((answer, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered && selectedIdx !== idx}
              className={[
                'text-left p-4 rounded-xl border-2 transition-all duration-150',
                selectedIdx === idx
                  ? 'border-accent bg-accent/10 shadow-sm'
                  : answered
                  ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-default opacity-60'
                  : 'border-gray-200 bg-white hover:border-accent hover:shadow-sm cursor-pointer',
              ].join(' ')}
            >
              <span className={`text-sm font-medium leading-snug ${selectedIdx === idx ? 'text-primary' : ''}`}>
                {answer.label}
              </span>
            </button>
          ))}
        </div>

        {/* Insight shown after answering */}
        {answered && (
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800 mb-6">
            {question.insight}
          </div>
        )}

        {/* Next / finish button */}
        {answered && (
          <button onClick={handleNext} className="btn-primary">
            {currentQ + 1 < quizQuestions.length ? 'Volgende vraag →' : 'Bekijk mijn aanbeveling →'}
          </button>
        )}
      </div>
    </div>
  )
}
