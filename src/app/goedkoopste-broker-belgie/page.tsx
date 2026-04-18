import type { Metadata } from 'next'
import Link from 'next/link'
import { brokers } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'

export const metadata: Metadata = {
  title: 'Goedkoopste Broker België 2026 — Kosten Vergeleken',
  description:
    'Welke broker heeft de laagste kosten voor Belgische beleggers in 2026? Vergelijking van transactiekosten, bewaarloon en TOB voor ETFs en aandelen.',
  openGraph: {
    title: 'Goedkoopste Broker België 2026',
    url: 'https://bestebroker.be/goedkoopste-broker-belgie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/goedkoopste-broker-belgie' },
}

const sortedByFee = [...brokers].sort((a, b) => a.fees.transactionFeeMin - b.fees.transactionFeeMin)

export default function GoedkoopsteBrokerPage() {
  return (
    <>
      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Beste broker België', href: '/beste-broker-belgie' }, { label: 'Goedkoopste broker' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Goedkoopste broker in België 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Kosten maken een enorm verschil over de lange termijn. Wij vergelijken transactiekosten, bewaarloon
            en de fiscale administratielast — want &quot;goedkoop&quot; is meer dan enkel de transactiekost.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        {/* Cost table */}
        <section className="mb-10 card">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Kostenvergelijking 2026</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left border-b border-gray-100">
                <tr className="text-gray-600 font-semibold">
                  <th className="pb-3">Broker</th>
                  <th className="pb-3 text-right">Min. transactiekost</th>
                  <th className="pb-3 text-right">% kosten</th>
                  <th className="pb-3 text-right">Bewaarloon</th>
                  <th className="pb-3 text-center">TOB auto</th>
                  <th className="pb-3 text-center">MWB auto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sortedByFee.map((broker, i) => (
                  <tr key={broker.id} className={i === 0 ? 'bg-teal-50' : ''}>
                    <td className="py-3">
                      <Link href={`/reviews/${broker.slug}`} className="font-semibold text-primary hover:text-accent">
                        {broker.name}
                      </Link>
                      {i === 0 && <span className="ml-2 text-xs bg-accent text-white px-1.5 py-0.5 rounded font-medium">Goedkoopst</span>}
                    </td>
                    <td className="py-3 text-right font-medium">
                      {broker.fees.transactionFeeMin === 0 ? (
                        <span className="text-success font-semibold">Gratis</span>
                      ) : (
                        `€${broker.fees.transactionFeeMin.toFixed(2)}`
                      )}
                    </td>
                    <td className="py-3 text-right">
                      {broker.fees.transactionFeePercent === 0 ? '—' : `${(broker.fees.transactionFeePercent * 100).toFixed(3)}%`}
                    </td>
                    <td className="py-3 text-right">
                      {broker.fees.custodyFeePercent === 0 && broker.fees.custodyFeeFixed === 0 ? (
                        <span className="text-success">Gratis</span>
                      ) : (
                        `${(broker.fees.custodyFeePercent * 100).toFixed(2)}%/jaar`
                      )}
                    </td>
                    <td className="py-3 text-center">{broker.taxes.tob ? '✅' : '❌'}</td>
                    <td className="py-3 text-center">{broker.taxes.capitalGainsTax ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat maakt een broker &quot;goedkoop&quot;?</h2>
          <p>
            De goedkoopste broker is niet altijd de broker met de laagste transactiekosten.
            Reken ook mee:
          </p>
          <ul>
            <li><strong>TOB (Taks op Beursverrichtingen):</strong> 0,12% per ETF-transactie. Als de broker dit niet regelt, betaal je dit zelf — plus administratie.</li>
            <li><strong>Meerwaardebelasting (2026):</strong> Als je dit zelf moet aangeven, kost dat tijd en mogelijk een fiscalist.</li>
            <li><strong>Bewaarloon:</strong> Sommige brokers rekenen een jaarlijks percentage op je volledige portefeuille.</li>
            <li><strong>Transferkosten:</strong> Wil je later overstappen? Rekening houden met €50–€75/lijn.</li>
          </ul>
          <p>
            Op zuivere transactiekost wint MeDirect (gratis voor ETFs), gevolgd door Trade Republic (€1 flat).
            Maar zodra je de fiscale administratielast meerekenst, verschuift het beeld.
          </p>
          <Link href="/tools/brokerkosten-calculator" className="text-accent hover:underline">
            → Gebruik onze kostencalculator om het 20-jaar verschil te berekenen
          </Link>
        </div>

        <section>
          <h2 className="font-display text-2xl font-bold text-primary mb-6">Brokers van goedkoopst naar duurste</h2>
          <div className="space-y-6">
            {sortedByFee.map((broker, i) => (
              <BrokerCard key={broker.id} broker={broker} rank={i + 1} source="goedkoopste-page" />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
