import type { Metadata } from 'next'
import Link from 'next/link'
import { brokers } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'

export const metadata: Metadata = {
  title: 'Beste ETF-Broker België 2026 — Voor Passieve Beleggers',
  description:
    'Welke broker is het beste voor ETF-beleggers in België? Vergelijking van kosten, spaarplannen en belastingafhandeling voor breed gespreide indexfondsen.',
  openGraph: {
    title: 'Beste ETF-Broker België 2026',
    url: 'https://bestebroker.be/beste-etf-broker-belgie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/beste-etf-broker-belgie' },
}

const etfBrokers = brokers.filter(b => ['saxo', 'bolero', 'medirect', 'degiro', 'trade-republic'].includes(b.id))

export default function BestEtfBrokerPage() {
  return (
    <>
      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Beste broker België', href: '/beste-broker-belgie' }, { label: 'Beste ETF-broker' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Beste ETF-broker in België 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Voor passieve beleggers die maandelijks een breed gespreid ETF aankopen, tellen transactiekosten
            en fiscale afhandeling het zwaarst. Dit zijn onze aanbevelingen.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        {/* Criteria table */}
        <section className="mb-10 card">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Waarop letten bij een ETF-broker?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left border-b border-gray-100">
                <tr>
                  <th className="pb-3 font-semibold text-gray-700">Criterium</th>
                  <th className="pb-3 font-semibold text-gray-700">Waarom belangrijk?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['Transactiekosten', 'Bij maandelijkse aankopen telt elke euro kosten op over 20 jaar'],
                  ['Spaarplan / AutoInvest', 'Automatische maandelijkse aankoop zonder handmatig ingrijpen'],
                  ['TOB automatisch', 'Anders moet je zelf aangifte doen en betalen'],
                  ['Meerwaardebelasting', 'Nieuw in 2026: 10% op winst boven €10.000/jaar vrijstelling'],
                  ['Securities lending', 'Bij uitleen draag je tegenpartijrisico — vermijden als beginner'],
                ].map(([crit, why]) => (
                  <tr key={crit}>
                    <td className="py-2.5 font-medium text-primary">{crit}</td>
                    <td className="py-2.5 text-gray-600">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Broker verdicts */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-6">Brokers voor ETF-beleggers</h2>
          <div className="space-y-6">
            {etfBrokers.map((broker, i) => (
              <BrokerCard key={broker.id} broker={broker} rank={i + 1} source="etf-broker-page" />
            ))}
          </div>
        </section>

        <div className="prose-custom max-w-3xl mb-8">
          <h2>Onze conclusie</h2>
          <p>
            Voor de meeste Belgische ETF-beleggers is <strong>Saxo Bank</strong> de beste keuze:
            de AutoInvest-functie maakt maandelijks automatisch beleggen mogelijk voor slechts €2/maand,
            alle belastingen worden automatisch afgehandeld, en de transactiekosten zijn laag (0,08%, min €2).
          </p>
          <p>
            Als je <em>absoluut niks</em> wil betalen aan ETF-transacties, is <strong>MeDirect</strong> de logische keuze
            — maar houd er rekening mee dat er geen spaarplan is en je handmatig moet aankopen.
          </p>
          <p>
            <Link href="/beste-broker-belgie" className="text-accent hover:underline">← Terug naar de algemene brokervergelijking</Link>
          </p>
        </div>
      </div>
    </>
  )
}
