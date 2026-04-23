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
    title: 'Saxo vs MeDirect 2026 — AutoInvest vs Gratis ETF-Transacties',
    description: 'Saxo Bank of MeDirect? Beide zijn Belgische brokers. MeDirect heeft gratis ETF-transacties, Saxo heeft AutoInvest. Wij vergelijken voor Belgische beleggers.',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Saxo of MeDirect: wat is goedkoper?', acceptedAnswer: { '@type': 'Answer', text: 'MeDirect is goedkoper voor ETF-transacties: volledig gratis. Saxo AutoInvest kost €2/maand. Over een jaar is dat €24 verschil, maar Saxo debiteert automatisch en heeft een breder platform.' } },
          { '@type': 'Question', name: 'Heeft MeDirect een spaarplan voor ETFs?', acceptedAnswer: { '@type': 'Answer', text: 'Nee. MeDirect heeft geen automatisch spaarplan of auto-invest functie. Je moet elke aankoop handmatig plaatsen. Saxo heeft wel AutoInvest met automatische maandelijkse debitering.' } },
          { '@type': 'Question', name: 'Regelt MeDirect de meerwaardebelasting automatisch?', acceptedAnswer: { '@type': 'Answer', text: 'MeDirect is een Belgische broker en handelt belastingen automatisch af. Verifieer de exacte implementatiedatum voor de meerwaardebelasting 2026 rechtstreeks bij MeDirect.' } },
        ],
      }) }} />

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

        {/* Wie wint in jouw situatie? */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Wie wint in jouw situatie?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card border-t-4 border-t-green-400">
              <p className="text-xs font-semibold text-green-700 mb-2">Starter / handmatige belegger</p>
              <p className="font-semibold text-primary mb-2">Koopt 1–2 keer per maand ETFs handmatig</p>
              <p className="text-sm text-gray-600">MeDirect rekent nul transactiekosten. Ideaal voor wie niet wil automatiseren maar wel goedkoop wil beleggen. <strong>Winnaar: MeDirect</strong></p>
            </div>
            <div className="card border-t-4 border-t-blue-400">
              <p className="text-xs font-semibold text-blue-700 mb-2">Automatische belegger</p>
              <p className="font-semibold text-primary mb-2">Wil alles op de automatische piloot zetten</p>
              <p className="text-sm text-gray-600">Saxo AutoInvest debiteert automatisch en koopt maandelijks ETFs aan voor €2/maand. MeDirect heeft geen spaarplan. <strong>Winnaar: Saxo</strong></p>
            </div>
            <div className="card border-t-4 border-t-purple-400">
              <p className="text-xs font-semibold text-purple-700 mb-2">Actieve belegger</p>
              <p className="font-semibold text-primary mb-2">Frequent handelen, breed aanbod nodig</p>
              <p className="text-sm text-gray-600">Saxo heeft een breder platform, opties, obligaties en meer. MeDirect is beperkt tot ETFs en aandelen. <strong>Winnaar: Saxo</strong></p>
            </div>
          </div>
        </section>

        {/* Kostenvergelijking */}
        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Kostenvergelijking (1 ETF-trade/maand)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 text-gray-600 font-semibold">Maandelijks bedrag</th>
                  <th className="text-center py-3 font-semibold text-blue-700">Saxo (AutoInvest)</th>
                  <th className="text-center py-3 font-semibold text-green-700">MeDirect</th>
                  <th className="text-center py-3 text-gray-600 font-semibold">Verschil/jaar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€150/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€2/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€0</td>
                  <td className="py-2.5 text-center text-green-700 font-medium">MeDirect €24 goedkoper/jaar</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€300/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€2/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€0</td>
                  <td className="py-2.5 text-center text-green-700 font-medium">MeDirect €24 goedkoper/jaar</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€1.000/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€2/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€0</td>
                  <td className="py-2.5 text-center text-green-700 font-medium">MeDirect €24 goedkoper/jaar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">MeDirect: gratis ETF-transacties. Saxo AutoInvest: vaste €2/maand. Verschil is altijd €24/jaar — maar Saxo automatiseert alles.</p>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {[
              { q: 'Saxo of MeDirect: welke is goedkoper?', a: 'MeDirect is goedkoper voor transactiekosten: volledig gratis ETF-aankopen. Saxo AutoInvest kost €2/maand (€24/jaar). Maar Saxo automatiseert alles inclusief de debitering van je bankrekening.' },
              { q: 'Heeft MeDirect een automatisch spaarplan?', a: 'Nee, MeDirect heeft geen automatisch spaarplan of auto-invest. Je plaatst elke aankoop handmatig. Als je automatisch wil beleggen, kies dan Saxo.' },
              { q: 'Zijn Saxo en MeDirect beide veilig?', a: 'Beide zijn Belgische brokers met €100.000 beleggersprotectie. Beiden doen nooit aan verplichte securities lending. MeDirect leent nooit uit (contractueel), Saxo heeft opt-in securities lending standaard uitgeschakeld.' },
            ].map(({ q, a }) => (
              <div key={q} className="card">
                <p className="font-semibold text-primary mb-2">{q}</p>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

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
      </div>
    </>
  )
}
