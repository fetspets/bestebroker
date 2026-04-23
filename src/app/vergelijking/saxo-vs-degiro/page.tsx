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
    title: 'Saxo vs DEGIRO 2026 — Fiscaal Compleet vs Goedkoop',
    description: 'Saxo Bank of DEGIRO? Vergelijking van kosten, belastingafhandeling en gemak voor Belgische beleggers. Inclusief meerwaardebelasting 2026.',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Is Saxo of DEGIRO beter voor Belgen?', acceptedAnswer: { '@type': 'Answer', text: 'Voor de meeste Belgische beleggers is Saxo beter: volledige fiscale afhandeling (TOB, RV, Reynders, meerwaardebelasting), AutoInvest en €100K bescherming. DEGIRO heeft lagere vaste transactiekosten maar doet niets fiscaal.' } },
          { '@type': 'Question', name: 'Is Saxo duurder dan DEGIRO?', acceptedAnswer: { '@type': 'Answer', text: 'Via Saxo AutoInvest kost maandelijks beleggen slechts €2/maand — ongeacht het bedrag. DEGIRO rekent €3/trade. Voor de meeste reguliere beleggers is Saxo dus zelfs goedkoper dan DEGIRO.' } },
          { '@type': 'Question', name: 'Regelt Saxo de meerwaardebelasting automatisch?', acceptedAnswer: { '@type': 'Answer', text: 'Ja. Saxo Bank handelt de meerwaardebelasting volledig automatisch af voor Belgische beleggers. DEGIRO doet dit niet — jij moet zelf aangifte doen.' } },
        ],
      }) }} />

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

        {/* Wie wint in jouw situatie? */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Wie wint in jouw situatie?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card border-t-4 border-t-blue-400">
              <p className="text-xs font-semibold text-blue-700 mb-2">Starter</p>
              <p className="font-semibold text-primary mb-2">Beginner, wil automatisch beleggen</p>
              <p className="text-sm text-gray-600">Saxo AutoInvest regelt alles voor €2/maand. Geen fiscale kennis nodig. <strong>Winnaar: Saxo</strong></p>
            </div>
            <div className="card border-t-4 border-t-orange-400">
              <p className="text-xs font-semibold text-orange-600 mb-2">Actieve belegger</p>
              <p className="font-semibold text-primary mb-2">Frequent handelaar, fiscaal zelfstandig</p>
              <p className="text-sm text-gray-600">DEGIRO heeft lage kosten voor actieve handelaars. Maar fiscale last is zwaarder met meerwaardebelasting. <strong>Winnaar: situatieafhankelijk</strong></p>
            </div>
            <div className="card border-t-4 border-t-green-400">
              <p className="text-xs font-semibold text-green-700 mb-2">Fiscaal comfort-zoeker</p>
              <p className="font-semibold text-primary mb-2">Wil nul fiscale zorgen, alles automatisch</p>
              <p className="text-sm text-gray-600">Saxo regelt alles: TOB, RV, Reynders, meerwaardebelasting. Geen NBB-aangifte nodig. <strong>Winnaar: Saxo</strong></p>
            </div>
          </div>
        </section>

        {/* Kostenvergelijking */}
        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Kostenvergelijking (1 trade/maand via AutoInvest)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 text-gray-600 font-semibold">Maandelijks bedrag</th>
                  <th className="text-center py-3 font-semibold text-blue-700">Saxo (AutoInvest)</th>
                  <th className="text-center py-3 font-semibold text-orange-600">DEGIRO</th>
                  <th className="text-center py-3 text-gray-600 font-semibold">Verschil/jaar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€150/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€2/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€3/trade</td>
                  <td className="py-2.5 text-center text-blue-700 font-medium">Saxo €12 goedkoper/jaar</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€300/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€2/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€3/trade</td>
                  <td className="py-2.5 text-center text-blue-700 font-medium">Saxo €12 goedkoper/jaar</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€1.000/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€2/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€3/trade</td>
                  <td className="py-2.5 text-center text-blue-700 font-medium">Saxo €12 goedkoper/jaar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Saxo AutoInvest: vaste €2/maand ongeacht bedrag. DEGIRO: €3/ETF-trade via Euronext. Exclusief fiscale administratietijd bij DEGIRO.</p>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {[
              { q: 'Is Saxo duurder dan DEGIRO?', a: 'Via AutoInvest kost Saxo €2/maand — ongeacht het bedrag. DEGIRO rekent €3/trade. Voor reguliere maandelijkse beleggers is Saxo dus goedkoper dan DEGIRO, en dan regelt Saxo ook nog alle belastingen.' },
              { q: 'Regelt Saxo de meerwaardebelasting automatisch?', a: 'Ja. Saxo Bank handelt de meerwaardebelasting automatisch af voor Belgische beleggers. DEGIRO doet dit niet — jij moet zelf aangifte doen via MyMinfin.be.' },
              { q: 'Moet ik als DEGIRO-klant een NBB-aangifte doen?', a: 'Ja. Als buitenlandse broker moet je jaarlijks een aangifte van buitenlandse rekening bij de NBB indienen via het CAP-formulier. Bij Saxo (Belgisch bijkantoor) is dit niet verplicht.' },
            ].map(({ q, a }) => (
              <div key={q} className="card">
                <p className="font-semibold text-primary mb-2">{q}</p>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

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
