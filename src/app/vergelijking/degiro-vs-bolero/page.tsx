import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { brokerLink } from '@/lib/affiliateLinks'

const a = getBrokerById('degiro')!
const b = getBrokerById('bolero')!

export const metadata: Metadata = {
  title: 'DEGIRO vs Bolero 2026 — Welke Broker Wint voor Belgen?',
  description:
    'DEGIRO of Bolero? Wij vergelijken kosten, fiscale afhandeling, securities lending en gebruiksgemak voor Belgische beleggers in 2026.',
  openGraph: {
    title: 'DEGIRO vs Bolero 2026',
    url: 'https://bestebroker.be/vergelijking/degiro-vs-bolero',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/vergelijking/degiro-vs-bolero' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is DEGIRO of Bolero beter voor Belgische beleggers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Voor de meeste Belgische beleggers is Bolero de betere keuze: het regelt alle belastingen automatisch (TOB, roerende voorheffing, Reynders en meerwaardebelasting), er is geen securities lending en je hoeft geen NBB-aangifte te doen. DEGIRO heeft lagere transactiekosten maar vereist volledige fiscale zelfbeheer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is DEGIRO veilig voor Belgische beleggers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DEGIRO valt onder het German Investor Protection Fund (EdW) voor €20.000. Belgische brokers bieden €100.000 bescherming. Bovendien is securities lending verplicht in het basisaccount van DEGIRO, wat tegenpartijrisico meebrengt.',
      },
    },
  ],
}

const breadcrumbs = breadcrumbJsonLd([
  { label: 'Vergelijkingen', href: '/beste-broker-belgie' },
  { label: 'DEGIRO vs Bolero' },
])

const rows = [
  { label: 'Type', a: a.type, b: b.type },
  { label: 'Min. transactiekost', a: `€${a.fees.transactionFeeMin.toFixed(2)}`, b: `€${b.fees.transactionFeeMin.toFixed(2)}` },
  { label: 'ETF-transactie Playlist', a: 'N/A', b: '€2,50–€7,50' },
  { label: 'Bewaarloon', a: 'Geen', b: 'Geen' },
  { label: 'TOB automatisch', a: '❌', b: '✅' },
  { label: 'Roerende voorheffing auto', a: '❌', b: '✅' },
  { label: 'Meerwaardebelasting auto', a: '❌', b: '✅' },
  { label: 'Spaarplan', a: '❌', b: '✅ (Invest & Repeat)' },
  { label: 'Securities lending', a: '⚠ Verplicht (basis)', b: '✅ Nooit' },
  { label: 'Depositobescherming', a: '€20.000', b: '€100.000' },
  { label: 'NBB-aangifte vereist', a: '⚠ Ja', b: '✅ Nee' },
  { label: 'FSMA-geregistreerd', a: '❌', b: '✅' },
]

export default function DegiroVsBoleroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'DEGIRO vs Bolero' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            DEGIRO vs Bolero 2026 — Welke broker wint voor Belgische beleggers?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            DEGIRO en Bolero zijn twee van de meest populaire brokers in België. Ze zijn elkaars tegenpolen:
            goedkoop-maar-fiscaal-doe-het-zelf vs. iets duurder-maar-fiscaal-volledig. Wij doen het eerlijk uiteen.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        {/* Verdict box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-orange-600 mb-1">DEGIRO</p>
            <p className="font-display font-bold text-primary text-lg">Goedkoper, meer werk</p>
            <p className="text-sm text-gray-600 mt-1">€3/trade op Euronext Amsterdam. Maar: zelf TOB, RV, meerwaardebelasting en NBB-aangifte regelen.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-red-600 mb-1">Bolero — onze aanbeveling</p>
            <p className="font-display font-bold text-primary text-lg">Iets duurder, nul werk</p>
            <p className="text-sm text-gray-600 mt-1">€2,50–€7,50/trade. Maar: alles automatisch, geen securities lending, €100K bescherming.</p>
          </div>
        </div>

        {/* Comparison table */}
        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 text-gray-600 font-semibold">Criterium</th>
                  <th className="text-center py-3 font-semibold text-orange-600">DEGIRO</th>
                  <th className="text-center py-3 font-semibold text-red-600">Bolero</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map(({ label, a: va, b: vb }) => (
                  <tr key={label}>
                    <td className="py-2.5 font-medium text-gray-700">{label}</td>
                    <td className="py-2.5 text-center text-gray-600">{va}</td>
                    <td className="py-2.5 text-center text-gray-600">{vb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wanneer kies je voor DEGIRO?</h2>
          <p>
            DEGIRO is een goede keuze als je <strong>ervaren bent met fiscale administratie</strong>,
            al jouw transacties bijhoudt en het niet erg vindt om elk kwartaal TOB aan te geven en
            bij de volgende belastingaangifte de meerwaardes te berekenen. In dat geval bespaar je
            op transactiekosten.
          </p>

          <h2>Wanneer kies je voor Bolero?</h2>
          <p>
            Bolero is de betere keuze voor de meerderheid van de Belgische beleggers: je wilt gewoon
            beleggen zonder fiscale administratie. Bolero regelt alles. De hogere transactiekosten
            zijn een klein prijsje voor die zekerheid — zeker nu de meerwaardebelasting erbij komt.
          </p>

          <h2>Het eerlijke kostenplaatje</h2>
          <p>
            Bij €300/maand, 1 transactie/maand: DEGIRO kost €3/trade, Bolero €5/trade voor Playlist-ETFs.
            Dat is €24 verschil per jaar. Maar reken de waarde van jouw tijd voor fiscale administratie mee,
            en de balans kantelt snel.
          </p>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[a, b].map(broker => (
            broker.affiliateUrl && (
              <div key={broker.id} className="card flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{broker.name}</p>
                  <p className="text-sm text-gray-500">{broker.tagline}</p>
                </div>
                <a
                  href={brokerLink(broker.affiliateUrl, 'degiro-vs-bolero')}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn-primary flex-shrink-0 text-sm py-2"
                >
                  Account →
                </a>
              </div>
            )
          ))}
        </div>
        <p className="text-xs text-gray-400 mb-8 text-center">Affiliate links — zie <Link href="/disclaimer" className="underline">disclaimer</Link>.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/vergelijking/saxo-vs-degiro', label: 'Saxo vs DEGIRO' },
            { href: '/vergelijking/bolero-vs-saxo', label: 'Bolero vs Saxo' },
            { href: '/beste-broker-belgie', label: 'Alle brokers vergelijken' },
            { href: '/tools/brokerkosten-calculator', label: 'Bereken het kostenverschil' },
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
