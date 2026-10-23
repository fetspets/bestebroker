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
    'Saxo, Bolero, MeDirect, Keytrade, DEGIRO en Trade Republic naast elkaar: kosten per order, welke taksen ze inhouden en toezicht. Met bronnen, oktober 2026.',
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
        text: 'Dat hangt af van hoe je belegt. Wil je automatisch maandelijks beleggen, dan bieden Saxo (AutoInvest, €2 per maand) en Trade Republic (spaarplannen) dat aan. Koop je zelf ETF\'s, dan rekent MeDirect geen makelaarsloon. Saxo, Bolero, MeDirect, Keytrade en de Belgische rekening van Trade Republic houden de Belgische taksen in. Onze scores en hoe we ze berekenen staan op /methodologie. Dit is geen persoonlijk advies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Moet ik meerwaardebelasting betalen in België?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'België voert in 2026 een meerwaardebelasting van 10% in op financiële vermogenswinsten boven een jaarlijkse vrijstelling van €10.000. Saxo, Bolero, MeDirect en Keytrade houden ze in bij verkoop (uitzetten kan). Trade Republic doet dat op de Belgische rekening als je ervoor kiest. Bij DEGIRO geef je ze zelf aan.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat is TOB en wie betaalt het?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TOB staat voor Taks op Beursverrichtingen. Voor ETF-aandelen (accumulerend) bedraagt het 0,12% per transactie. Belgische brokers en ook DEGIRO houden dit automatisch in. Bij een broker die de TOB niet inhoudt, moet je zelf aangifte doen en betalen.',
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
          <LastUpdated date="2026-10-23" />
        </header>

        {/* Quick verdict */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { badge: 'Automatisch maandelijks beleggen', broker: 'Saxo Bank', reason: 'AutoInvest €2 per maand, Belgische taksen ingehouden' },
            { badge: 'Online broker van KBC Bank', broker: 'Bolero', reason: '€2,50 per order tot €250, geen uitlenen van effecten' },
            { badge: 'Geen makelaarsloon op ETF’s', broker: 'MeDirect', reason: 'Sinds augustus 2025; aandelen wel betalend' },
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
            {brokers.map(broker => (
              <BrokerCard key={broker.id} broker={broker} source="beste-broker-page" />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10 prose-custom max-w-3xl">
          <h2>Veelgestelde vragen over Belgische brokers</h2>

          <h3>Welke broker is het beste in België in 2026?</h3>
          <p>
            Dat hangt af van hoe je belegt. Wil je automatisch maandelijks beleggen, dan bieden{' '}
            <Link href="/reviews/saxo-bank-belgie" className="text-accent hover:underline">Saxo</Link> (AutoInvest, €2 per maand) en{' '}
            <Link href="/reviews/trade-republic-belgie" className="text-accent hover:underline">Trade Republic</Link> (spaarplannen) dat aan.
            Koop je zelf ETF&apos;s, dan rekent <Link href="/reviews/medirect" className="text-accent hover:underline">MeDirect</Link> geen
            makelaarsloon. Saxo, Bolero, MeDirect, Keytrade en de Belgische rekening van Trade Republic houden de Belgische
            taksen in. Hoe we de scores berekenen, lees je in de{' '}
            <Link href="/methodologie" className="text-accent hover:underline">methodologie</Link>. Dit is geen persoonlijk advies.
          </p>

          <h3>Moet ik meerwaardebelasting betalen?</h3>
          <p>
            Ja. België voert in 2026 een meerwaardebelasting van 10% in op financiële vermogenswinsten boven een
            vrijstelling van €10.000 per jaar. Saxo, Bolero, MeDirect en Keytrade houden ze in bij verkoop; je kan de
            inhouding uitzetten en zelf aangeven. Trade Republic doet het op de Belgische rekening als je ervoor kiest.
            Bij DEGIRO geef je ze zelf aan.
            <Link href="/broker-meerwaardebelasting-2026" className="text-accent hover:underline ml-1">Meer over meerwaardebelasting en brokers →</Link>
          </p>

          <h3>Is DEGIRO nog de moeite waard voor Belgische beleggers?</h3>
          <p>
            DEGIRO heeft lage orderkosten (€1 voor ETF’s uit de kernselectie) en houdt de beurstaks in. De
            meerwaardebelasting, de Reynderstaks en de roerende voorheffing op buitenlandse dividenden geef je zelf aan,
            en je meldt de rekening bij de Nationale Bank. Het Basis-account laat het uitlenen van effecten toe.
            <Link href="/reviews/degiro-belgie" className="text-accent hover:underline ml-1">Volledige DEGIRO-review →</Link>
          </p>

          <h3>Wat is securities lending en moet ik me zorgen maken?</h3>
          <p>
            Securities lending betekent dat de broker jouw effecten uitleent aan andere partijen (voor short selling).
            Jij draagt dan tegenpartijrisico. Belgische brokers zoals Bolero doen dit nooit. Saxo biedt het als opt-in
            aan. Bij DEGIRO staat het in de voorwaarden van het Basis-account (DEGIRO meldt dat het momenteel niet uitleent).
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
