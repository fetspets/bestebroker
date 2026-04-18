import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { brokerLink } from '@/lib/affiliateLinks'

const saxo = getBrokerById('saxo')!
const degiro = getBrokerById('degiro')!

export const metadata: Metadata = {
  title: 'Saxo vs DEGIRO 2026 — Fiscaal Compleet vs Goedkoop',
  description:
    'Saxo Bank of DEGIRO? Vergelijking van kosten, belastingafhandeling en gemak voor Belgische beleggers. Inclusief meerwaardebelasting 2026.',
  openGraph: {
    title: 'Saxo vs DEGIRO 2026',
    url: 'https://bestebroker.be/vergelijking/saxo-vs-degiro',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/vergelijking/saxo-vs-degiro' },
}

const rows = [
  { label: 'Type', saxo: saxo.type, degiro: degiro.type },
  { label: 'Min. transactiekost', saxo: `€${saxo.fees.transactionFeeMin.toFixed(2)}`, degiro: `€${degiro.fees.transactionFeeMin.toFixed(2)}` },
  { label: 'AutoInvest / spaarplan', saxo: '✅ €2/maand', degiro: '❌' },
  { label: 'TOB automatisch', saxo: '✅', degiro: '❌' },
  { label: 'Meerwaardebelasting auto', saxo: '✅', degiro: '❌' },
  { label: 'Securities lending', saxo: '✅ Opt-in', degiro: '⚠ Verplicht (basis)' },
  { label: 'Depositobescherming', saxo: '€100.000', degiro: '€20.000' },
  { label: 'NBB-aangifte vereist', saxo: '✅ Nee', degiro: '⚠ Ja' },
]

export default function SaxoVsDegiroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs DEGIRO' }])) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs DEGIRO' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Saxo Bank vs DEGIRO 2026 — Fiscaal compleet vs goedkoop
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Saxo Bank en DEGIRO zitten aan de andere kant van hetzelfde spectrum: Saxo doet alles voor je,
            DEGIRO is goedkoop maar laat jou alle fiscale administratie doen. Wij zetten ze naast elkaar.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Saxo Bank — onze aanbeveling</p>
            <p className="font-display font-bold text-primary">Compleet, fiscaal zorgeloos</p>
            <p className="text-sm text-gray-600 mt-1">AutoInvest, alle belastingen automatisch, €100K bescherming. Min €2/ETF-trade.</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-orange-600 mb-1">DEGIRO</p>
            <p className="font-display font-bold text-primary">Laagste kosten, maximale zelfbeheer</p>
            <p className="text-sm text-gray-600 mt-1">€1+€2/trade op Euronext. Maar: volledige fiscale verantwoordelijkheid bij jou.</p>
          </div>
        </div>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 text-gray-600 font-semibold">Criterium</th>
                  <th className="text-center py-3 font-semibold text-blue-700">Saxo Bank</th>
                  <th className="text-center py-3 font-semibold text-orange-600">DEGIRO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map(({ label, saxo: vs, degiro: vd }) => (
                  <tr key={label}>
                    <td className="py-2.5 font-medium text-gray-700">{label}</td>
                    <td className="py-2.5 text-center text-gray-600">{vs}</td>
                    <td className="py-2.5 text-center text-gray-600">{vd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Onze conclusie</h2>
          <p>
            Voor de overgrote meerderheid van Belgische beleggers wint <strong>Saxo Bank</strong>.
            Het minimale kostenverschil (€1–€2 per trade) weegt niet op tegen de complete fiscale afhandeling,
            AutoInvest en de hogere bescherming. Enkel voor heel actieve of zeer ervaren beleggers die
            de fiscale administratie bewust willen bijhouden kan DEGIRO interessant blijven.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[saxo, degiro].map(broker => (
            broker.affiliateUrl && (
              <div key={broker.id} className="card flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{broker.name}</p>
                  <p className="text-sm text-gray-500">{broker.tagline}</p>
                </div>
                <a href={brokerLink(broker.affiliateUrl, 'saxo-vs-degiro')} target="_blank" rel="noopener noreferrer sponsored" className="btn-primary flex-shrink-0 text-sm py-2">Account →</a>
              </div>
            )
          ))}
        </div>
        <p className="text-xs text-gray-400 mb-8">Affiliate links — zie <Link href="/disclaimer" className="underline">disclaimer</Link>.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/reviews/saxo-bank-belgie', label: 'Saxo Bank volledige review' },
            { href: '/reviews/degiro-belgie', label: 'DEGIRO volledige review' },
            { href: '/vergelijking/degiro-vs-bolero', label: 'DEGIRO vs Bolero' },
            { href: '/tools/brokerkosten-calculator', label: 'Kostencalculator' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
              <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label} →</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
