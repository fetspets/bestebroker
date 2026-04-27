import type { Metadata } from 'next'
import { brokers } from '@/data/brokers'
import { BrokerCostCalculator } from '@/components/tools/BrokerCostCalculator'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { LastUpdated } from '@/components/ui/LastUpdated'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Brokerkosten Calculator 2026 — Bereken het Verschil over 20 Jaar',
  description:
    'Bereken welke Belgische broker jou het meeste kost over 10, 20 of 30 jaar. Inclusief transactiekosten, bewaarloon en meerwaardebelasting (10%, vrijstelling €10K).',
  openGraph: {
    title: 'Brokerkosten Calculator 2026',
    url: 'https://www.bestebroker.be/tools/brokerkosten-calculator',
    locale: 'nl_BE',
    type: 'website',
  },
  alternates: { canonical: 'https://www.bestebroker.be/tools/brokerkosten-calculator' },
}

export default function BrokerkostenCalculatorPage() {
  return (
    <div className="section-container py-10">
      <BreadcrumbNav items={[{ label: 'Tools' }, { label: 'Brokerkosten calculator' }]} />

      <header className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
          Brokerkosten calculator 2026
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-4">
          Kleine kostenverschillen worden groot over de tijd. Bereken zelf het effect van
          transactiekosten, bewaarloon en meerwaardebelasting op jouw portefeuille over 10 tot 40 jaar.
        </p>
        <LastUpdated date="2026-04-01" />
      </header>

      <BrokerCostCalculator brokers={brokers} />

      <div className="mt-10 prose-custom max-w-3xl">
        <h2>Hoe werkt de calculator?</h2>
        <p>
          De calculator simuleert de groei van jouw portefeuille op basis van:
        </p>
        <ul>
          <li><strong>Transactiekosten</strong>: vaste en procentuele kosten per transactie</li>
          <li><strong>Bewaarloon</strong>: jaarlijks percentage op portefeuillewaarde (waar van toepassing)</li>
          <li><strong>Rendement</strong>: aanpasbaar van 3% tot 12% — standaard 7% (historisch gemiddelde)</li>
          <li><strong>Meerwaardebelasting</strong>: 10% op eindwinst boven €10.000 vrijstelling (vereenvoudigde projectie)</li>
        </ul>

        <p className="text-sm text-gray-500">
          ⚠ De meerwaardebelasting-berekening is een vereenvoudigde eenmalige projectie op de eindwaarde.
          In realiteit wordt de belasting per belastingjaar berekend op gerealiseerde winsten. Raadpleeg
          een fiscalist voor persoonlijk advies.
        </p>

        <h2>Disclaimer</h2>
        <p>
          Rendementen uit het verleden zijn geen garantie voor de toekomst. De calculator is informatief en
          geen financieel advies. De belastingwetgeving kan wijzigen.
          Zie onze <Link href="/disclaimer" className="text-accent hover:underline">volledige disclaimer</Link>.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { href: '/beste-broker-belgie', label: 'Brokers vergelijken', sub: 'Volledige vergelijkingstabel' },
          { href: '/tools/welke-broker-past-bij-mij', label: 'Welke broker past bij mij?', sub: 'Persoonlijke aanbeveling in 4 vragen' },
        ].map(({ href, label, sub }) => (
          <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
            <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label}</p>
            <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
