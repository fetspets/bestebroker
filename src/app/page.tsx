import type { Metadata } from 'next'
import Link from 'next/link'
import { brokers } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'

export const metadata: Metadata = {
  title: 'Beste Broker België 2026 — Eerlijke Nederlandstalige Vergelijking',
  description:
    'Vergelijk de beste brokers in België voor 2026. TOB, meerwaardebelasting, bewaarloon — alles uitgelegd in het Nederlands. Onafhankelijk en fact-checked.',
  openGraph: {
    title: 'Beste Broker België 2026',
    description: 'Eerlijke, Nederlandstalige vergelijking van brokers voor Belgische beleggers.',
    url: 'https://bestebroker.be',
    type: 'website',
    locale: 'nl_BE',
  },
  alternates: { canonical: 'https://bestebroker.be' },
}

const topBrokers = brokers.slice(0, 3)

const stats = [
  { value: '6', label: 'brokers vergeleken' },
  { value: '100%', label: 'Nederlandstalig' },
  { value: '2026', label: 'fiscaal bijgewerkt' },
  { value: '0', label: 'verborgen agenda' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="section-container text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Bijgewerkt april 2026 · Meerwaardebelasting inbegrepen
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            De beste broker in België — <span className="text-accent">eerlijk vergeleken</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            100% Nederlandstalig · Belgische fiscale diepgang · Geen verborgen agenda.
            Wij vergelijken TOB, meerwaardebelasting, bewaarloon en meer — zodat jij de juiste keuze maakt.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/beste-broker-belgie" className="bg-accent text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-opacity-90 transition-colors">
              Vergelijk alle brokers →
            </Link>
            <Link href="/tools/welke-broker-past-bij-mij" className="bg-white/10 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/20 transition-colors border border-white/20">
              Welke broker past bij mij?
            </Link>
          </div>
        </div>
      </section>

      {/* Calculator teaser */}
      <section className="bg-teal-50 border-b border-teal-100">
        <div className="section-container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">📊</span>
              <div>
                <p className="font-semibold text-primary text-sm">Bereken wat elke broker je kost over 20 jaar</p>
                <p className="text-xs text-gray-500 mt-0.5">Inclusief transactiekosten, bewaarloon en meerwaardebelasting</p>
              </div>
            </div>
            <Link
              href="/tools/brokerkosten-calculator"
              className="flex-shrink-0 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-opacity-90 transition-colors whitespace-nowrap"
            >
              Open kostencalculator →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="section-container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-3xl font-bold text-accent">{value}</p>
                <p className="text-sm text-gray-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USP */}
      <section className="py-14 bg-gray-50">
        <div className="section-container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary text-center mb-10">
            Waarom BesteBroker.be?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🇧🇪',
                title: 'Belgische fiscale diepgang',
                text: 'TOB, roerende voorheffing, Reynders-taks, meerwaardebelasting 2026 — wij leggen elke belasting uit en vergelijken welke broker ze automatisch afhandelt.',
              },
              {
                icon: '🔍',
                title: 'Fact-checked, niet gesponsord',
                text: 'Elke tariefvergelijking heeft een datum en bron. Brokers met een affiliatelink scoren niet automatisch beter. Ons redactioneel oordeel is onafhankelijk.',
              },
              {
                icon: '🛠',
                title: 'Interactieve tools',
                text: 'Bereken zelf wat elke broker je kost over 20 jaar. Of laat onze wizard je naar de juiste broker leiden op basis van jouw situatie.',
              },
            ].map(({ icon, title, text }) => (
              <div key={title} className="card text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display font-semibold text-lg text-primary mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top brokers */}
      <section className="py-14">
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary">
                Beste brokers van 2026
              </h2>
              <p className="text-gray-600 mt-1">Op basis van kosten, fiscale afhandeling en gebruiksgemak</p>
            </div>
            <Link href="/beste-broker-belgie" className="text-accent hover:underline text-sm font-medium hidden sm:block">
              Alle {brokers.length} brokers →
            </Link>
          </div>
          <div className="space-y-6">
            {topBrokers.map((broker, i) => (
              <BrokerCard key={broker.id} broker={broker} rank={i + 1} source="homepage" />
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/beste-broker-belgie" className="btn-outline">
              Bekijk volledige vergelijking →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-14 bg-gray-50">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-primary text-center mb-8">Populaire vergelijkingen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/vergelijking/degiro-vs-bolero', title: 'DEGIRO vs Bolero', sub: 'Goedkoop vs Belgisch' },
              { href: '/vergelijking/saxo-vs-degiro', title: 'Saxo vs DEGIRO', sub: 'Fiscaal compleet vs goedkoop' },
              { href: '/vergelijking/bolero-vs-saxo', title: 'Bolero vs Saxo', sub: 'KBC-dochter vs Deense bank' },
              { href: '/vergelijking/saxo-vs-medirect', title: 'Saxo vs MeDirect', sub: 'AutoInvest vs gratis ETFs' },
            ].map(({ href, title, sub }) => (
              <Link
                key={href}
                href={href}
                className="card hover:shadow-md transition-shadow group text-center"
              >
                <p className="font-display font-semibold text-primary group-hover:text-accent transition-colors">{title}</p>
                <p className="text-sm text-gray-500 mt-1">{sub}</p>
                <p className="text-accent text-sm mt-2 font-medium">Vergelijk →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools CTA */}
      <section className="py-14 bg-primary text-white">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Welke broker kost je het minst?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 text-lg">
            Bereken zelf het verschil over 20 jaar — inclusief transactiekosten, bewaarloon en meerwaardebelasting.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tools/brokerkosten-calculator" className="bg-accent text-white font-semibold px-8 py-4 rounded-xl hover:bg-opacity-90 transition-colors">
              Open kostencalculator →
            </Link>
            <Link href="/tools/welke-broker-past-bij-mij" className="bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors border border-white/20">
              Broker-quiz starten
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
