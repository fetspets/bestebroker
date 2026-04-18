import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { brokerLink } from '@/lib/affiliateLinks'

const saxo = getBrokerById('saxo')!
const medirect = getBrokerById('medirect')!

export const metadata: Metadata = {
  title: 'Saxo vs MeDirect 2026 — AutoInvest vs Gratis ETF-Transacties',
  description:
    'Saxo Bank of MeDirect? Beide zijn Belgische brokers. MeDirect heeft gratis ETF-transacties, Saxo heeft AutoInvest. Wij vergelijken voor Belgische beleggers.',
  openGraph: {
    title: 'Saxo vs MeDirect 2026',
    url: 'https://bestebroker.be/vergelijking/saxo-vs-medirect',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/vergelijking/saxo-vs-medirect' },
}

const rows = [
  { label: 'ETF-transactiekost', saxo: '0,08% min €2', medirect: 'Gratis ✅' },
  { label: 'AutoInvest / spaarplan', saxo: '✅ €2/maand', medirect: '❌' },
  { label: 'Automatische debitering', saxo: '✅', medirect: '❌' },
  { label: 'Bewaarloon', saxo: 'Geen', medirect: 'Geen' },
  { label: 'TOB automatisch', saxo: '✅', medirect: '✅' },
  { label: 'Meerwaardebelasting auto', saxo: '✅', medirect: '✅ (verifieer datum)' },
  { label: 'Securities lending', saxo: 'Opt-in', medirect: 'Nooit ✅' },
  { label: 'Depositobescherming', saxo: '€100.000', medirect: '€100.000' },
  { label: 'Overdrachtkost', saxo: '€75/lijn', medirect: 'Verifieer' },
]

export default function SaxoVsMeDirectPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs MeDirect' }])) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs MeDirect' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Saxo Bank vs MeDirect 2026 — AutoInvest vs gratis ETF-transacties
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Beide zijn Belgische brokers die alle belastingen automatisch regelen. Het grote verschil:
            MeDirect rekent nul transactiekosten voor ETFs, Saxo biedt automatische maandelijkse beleggingen aan.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 text-gray-600 font-semibold">Criterium</th>
                  <th className="text-center py-3 font-semibold text-blue-700">Saxo Bank</th>
                  <th className="text-center py-3 font-semibold text-green-700">MeDirect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map(({ label, saxo: vs, medirect: vm }) => (
                  <tr key={label}>
                    <td className="py-2.5 font-medium text-gray-700">{label}</td>
                    <td className="py-2.5 text-center text-gray-600">{vs}</td>
                    <td className="py-2.5 text-center text-gray-600">{vm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wanneer kies je MeDirect?</h2>
          <p>
            MeDirect is de beste keuze als je <strong>handmatig wil aankopen</strong> en de laagst
            mogelijke transactiekosten wil. Als buy-and-hold belegger die 1–2 keer per maand ETFs koopt,
            betaal je bij MeDirect letterlijk niets aan transactiekosten.
          </p>

          <h2>Wanneer kies je Saxo?</h2>
          <p>
            Saxo is beter als je <strong>volledige automatisering</strong> wil. Met AutoInvest stel je
            eenmalig in hoeveel je maandelijks wil beleggen, en Saxo regelt de rest — inclusief de belastingen.
            De €2/maand kost voor AutoInvest is verwaarloosbaar voor de meeste beleggers.
          </p>

          <h2>Kostenberekening bij €300/maand over 20 jaar</h2>
          <p>
            Bij 1 transactie per maand van €300: Saxo kost €2/trade (of €2/maand AutoInvest = €24/jaar).
            MeDirect kost €0. Verschil over 20 jaar: ~€480 aan transactiekosten. Maar: bij Saxo is alles
            geautomatiseerd. Bereken het zelf via onze{' '}
            <Link href="/tools/brokerkosten-calculator" className="text-accent hover:underline">kostencalculator</Link>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[saxo, medirect].map(broker => (
            broker.affiliateUrl && (
              <div key={broker.id} className="card flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{broker.name}</p>
                  <p className="text-sm text-gray-500">{broker.tagline}</p>
                </div>
                <a href={brokerLink(broker.affiliateUrl, 'saxo-vs-medirect')} target="_blank" rel="noopener noreferrer sponsored" className="btn-primary flex-shrink-0 text-sm py-2">Account →</a>
              </div>
            )
          ))}
        </div>
        <p className="text-xs text-gray-400 mb-8">Affiliate links — zie <Link href="/disclaimer" className="underline">disclaimer</Link>.</p>
      </div>
    </>
  )
}
