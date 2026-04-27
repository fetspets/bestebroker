import type { Metadata } from 'next'
import Link from 'next/link'
import { brokers } from '@/data/brokers'
import { BrokerComparisonTable } from '@/components/broker/BrokerComparisonTable'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { BookRecommendationBlock } from '@/components/book/BookRecommendationBlock'

export const metadata: Metadata = {
  title: 'Beste Broker België 2026 — Vergelijking van 6 Brokers',
  description:
    'Welke broker is het beste in België in 2026? Wij vergelijken Saxo, Bolero, MeDirect, DEGIRO en Trade Republic op kosten, fiscale afhandeling en gemak. Fact-checked.',
  openGraph: {
    title: 'Beste Broker België 2026',
    description: 'Vergelijking van 6 brokers voor Belgische beleggers — inclusief meerwaardebelasting 2026.',
    url: 'https://www.bestebroker.be/beste-broker-belgie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/beste-broker-belgie' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Welke broker is het beste in België in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Voor de meeste Belgische beleggers is Saxo Bank de beste keuze in 2026: het regelt alle Belgische belastingen automatisch (TOB, roerende voorheffing, Reynders en meerwaardebelasting), heeft concurrerende kosten en biedt AutoInvest aan. Bolero is een goed alternatief voor wie zekerheid wil bij een Belgische bank (KBC-groep).',
      },
    },
    {
      '@type': 'Question',
      name: 'Moet ik meerwaardebelasting betalen in België?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'België voert in 2026 een meerwaardebelasting van 10% in op financiële vermogenswinsten boven een jaarlijkse vrijstelling van €10.000. Belgische brokers zoals Saxo en Bolero zullen dit automatisch inhouden. Buitenlandse brokers zoals DEGIRO en Trade Republic doen dit niet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat is TOB en wie betaalt het?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TOB staat voor Taks op Beursverrichtingen. Voor ETF-aandelen (accumulerend) bedraagt het 0,12% per transactie. Belgische brokers betalen dit automatisch voor jou. Bij buitenlandse brokers zoals DEGIRO moet je zelf aangifte doen en betalen.',
      },
    },
  ],
}

export default function BesteBrokerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Beste broker België' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Beste broker in België 2026 — eerlijke vergelijking
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Wij vergelijken 6 brokers op kosten, Belgische belastingafhandeling, veiligheid en gebruiksgemak.
            Inclusief de nieuwe <Link href="/broker-meerwaardebelasting-2026" className="text-accent hover:underline">meerwaardebelasting 2026</Link>.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        {/* Quick verdict */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { badge: '🏆 Beste overall', broker: 'Saxo Bank', reason: 'Alle belastingen automatisch + AutoInvest' },
            { badge: '🥇 Beste Belgische bank', broker: 'Bolero', reason: 'KBC-groep, geen securities lending' },
            { badge: '💶 Goedkoopste ETFs', broker: 'MeDirect', reason: 'Gratis ETF-transacties' },
          ].map(({ badge, broker: bname, reason }) => (
            <div key={bname} className="bg-teal-50 border border-teal-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-accent mb-1">{badge}</p>
              <p className="font-display font-bold text-primary text-lg">{bname}</p>
              <p className="text-sm text-gray-600 mt-0.5">{reason}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">Vergelijkingstabel</h2>
          <BrokerComparisonTable brokers={brokers} />
        </section>

        {/* Per-broker cards */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-6">Brokers van dichtbij bekeken</h2>
          <div className="space-y-6">
            {brokers.map((broker, i) => (
              <BrokerCard key={broker.id} broker={broker} rank={i + 1} source="beste-broker-page" />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10 prose-custom max-w-3xl">
          <h2>Veelgestelde vragen over Belgische brokers</h2>

          <h3>Welke broker is het beste in België in 2026?</h3>
          <p>
            Voor de meeste Belgische beleggers is <strong>Saxo Bank</strong> de beste keuze: het regelt alle Belgische
            belastingen automatisch (TOB, roerende voorheffing, Reynders én meerwaardebelasting), heeft concurrerende
            kosten en biedt <em>AutoInvest</em> aan voor maandelijks automatisch beleggen.
            <Link href="/reviews/saxo-bank-belgie" className="text-accent hover:underline ml-1">Lees onze volledige Saxo-review →</Link>
          </p>

          <h3>Moet ik meerwaardebelasting betalen?</h3>
          <p>
            Ja. België voert in 2026 een meerwaardebelasting van 10% in op financiële vermogenswinsten boven een
            vrijstelling van €10.000 per jaar. Belgische brokers zoals Saxo en Bolero zullen dit automatisch inhouden.
            Buitenlandse brokers doen dit niet — jij moet dan zelf aangifte doen.
            <Link href="/broker-meerwaardebelasting-2026" className="text-accent hover:underline ml-1">Meer over meerwaardebelasting en brokers →</Link>
          </p>

          <h3>Is DEGIRO nog de moeite waard voor Belgische beleggers?</h3>
          <p>
            DEGIRO heeft nog steeds lage kosten, maar de fiscale administratielast maakt het minder aantrekkelijk
            dan vroeger. Je moet zelf TOB aangeven, zelf dividendbelasting bijhouden én straks zelf aangifte doen
            voor de meerwaardebelasting. En in het basisaccount is securities lending verplicht.
            <Link href="/reviews/degiro-belgie" className="text-accent hover:underline ml-1">Volledige DEGIRO-review →</Link>
          </p>

          <h3>Wat is securities lending en moet ik me zorgen maken?</h3>
          <p>
            Securities lending betekent dat de broker jouw effecten uitleent aan andere partijen (voor short selling).
            Jij draagt dan tegenpartijrisico. Belgische brokers zoals Bolero doen dit nooit. Saxo biedt het als opt-in
            aan (zet het uit!). Bij DEGIRO is het in het basisaccount verplicht.
          </p>
        </section>

        {/* Internal links */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            { href: '/beste-etf-broker-belgie', label: 'Beste ETF-broker', sub: 'Specifiek voor ETF-beleggers' },
            { href: '/goedkoopste-broker-belgie', label: 'Goedkoopste broker', sub: 'Minimale kosten' },
            { href: '/broker-meerwaardebelasting-2026', label: 'Meerwaardebelasting 2026', sub: 'Welke broker regelt het?' },
            { href: '/tools/brokerkosten-calculator', label: 'Kostencalculator', sub: 'Bereken zelf het verschil' },
            { href: '/tools/welke-broker-past-bij-mij', label: 'Broker-quiz', sub: 'Persoonlijke aanbeveling' },
            { href: '/belgie/tob-uitleg', label: 'TOB uitgelegd', sub: 'Wat is de taks op beursverrichtingen?' },
          ].map(({ href, label, sub }) => (
            <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
              <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label}</p>
              <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
            </Link>
          ))}
        </nav>

        <BookRecommendationBlock bookIds={['hangmatbelegger', 'psychologie-geld-nl']} />
      </div>
    </>
  )
}
