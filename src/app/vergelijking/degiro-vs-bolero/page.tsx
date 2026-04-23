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
    {
      '@type': 'Question',
      name: 'Hoeveel goedkoper is DEGIRO dan Bolero?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bij Playlist-ETFs (onder €250) is Bolero zelfs goedkoper: €2,50 vs €3 bij DEGIRO. Bij hogere bedragen (€300-€1.000) is Bolero duurder: €5 vs €3. Bij €1.000+/trade is DEGIRO significant goedkoper: €3 vs €7,50. Reken ook de waarde van fiscale administratie mee: Bolero doet alles, DEGIRO niets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Moet ik als DEGIRO-gebruiker zelf de meerwaardebelasting aangeven?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. DEGIRO handelt geen enkele Belgische belasting af. Je bent zelf verantwoordelijk voor de aangifte van de meerwaardebelasting (10% op meerwaarden boven €10.000), TOB (0,12% per transactie) en roerende voorheffing op dividenden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kan ik bij Bolero automatisch maandelijks beleggen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bolero heeft Invest & Repeat: een herhalende aankooporder. Maar let op: Bolero debiteert je rekening niet automatisch. Je moet zelf voldoende geld op je Bolero-rekening zetten. Bij Saxo werkt AutoInvest volledig automatisch inclusief debitering.',
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

        {/* Wie wint in jouw situatie? */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Wie wint in jouw situatie?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card border-t-4 border-t-orange-400">
              <p className="text-xs font-semibold text-orange-600 mb-2">Starter</p>
              <p className="font-semibold text-primary mb-2">Kleine maandelijkse bedragen (&lt;€250)</p>
              <p className="text-sm text-gray-600">Bolero Playlist kost slechts €2,50 — goedkoper dan DEGIRO (€3). Bovendien geen fiscale zorgen. <strong>Winnaar: Bolero</strong></p>
            </div>
            <div className="card border-t-4 border-t-green-400">
              <p className="text-xs font-semibold text-green-700 mb-2">Actieve belegger</p>
              <p className="font-semibold text-primary mb-2">Hogere bedragen (€300–€1.000), doe-het-zelf fiscaal</p>
              <p className="text-sm text-gray-600">Bij €300/trade is DEGIRO €2 goedkoper per transactie. Maar reken de uren fiscale administratie mee. <strong>Winnaar: situatieafhankelijk</strong></p>
            </div>
            <div className="card border-t-4 border-t-blue-400">
              <p className="text-xs font-semibold text-blue-700 mb-2">Fiscaal comfort-zoeker</p>
              <p className="font-semibold text-primary mb-2">Wil niets regelen, automatisch alles</p>
              <p className="text-sm text-gray-600">Bolero regelt TOB, RV, Reynders én meerwaardebelasting. Nul securities lending. <strong>Winnaar: Bolero</strong></p>
            </div>
          </div>
        </section>

        {/* Kostenvergelijking */}
        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Kostenvergelijking (1 trade/maand)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 text-gray-600 font-semibold">Maandelijks bedrag</th>
                  <th className="text-center py-3 font-semibold text-orange-600">DEGIRO</th>
                  <th className="text-center py-3 font-semibold text-red-600">Bolero (Playlist)</th>
                  <th className="text-center py-3 text-gray-600 font-semibold">Verschil/jaar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€150/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€3/trade</td>
                  <td className="py-2.5 text-center text-gray-600">€2,50/trade</td>
                  <td className="py-2.5 text-center text-green-700 font-medium">Bolero €6 goedkoper/jaar</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€300/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€3/trade</td>
                  <td className="py-2.5 text-center text-gray-600">€5/trade</td>
                  <td className="py-2.5 text-center text-orange-700 font-medium">DEGIRO €24 goedkoper/jaar</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€1.000/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€3/trade</td>
                  <td className="py-2.5 text-center text-gray-600">€7,50/trade</td>
                  <td className="py-2.5 text-center text-orange-700 font-medium">DEGIRO €54 goedkoper/jaar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Exclusief fiscale administratietijd. Bij DEGIRO berekening en aangifte TOB + MWB zelf doen.</p>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Is DEGIRO of Bolero beter voor Belgische beleggers?',
                a: 'Voor de meeste Belgische beleggers is Bolero beter: volledige fiscale afhandeling, geen securities lending, €100K bescherming. DEGIRO is interessant voor ervaren beleggers die fiscale administratie niet erg vinden en op kosten willen besparen bij hogere bedragen.',
              },
              {
                q: 'Hoeveel goedkoper is DEGIRO dan Bolero?',
                a: 'Bij bedragen onder €250 is Bolero zelfs goedkoper (€2,50 vs €3). Daarboven is DEGIRO goedkoper: €3 vs €5 (€250–€1.000) of €7,50 (>€1.000). Reken ook de waarde van jouw tijd mee voor de fiscale administratie.',
              },
              {
                q: 'Moet ik als DEGIRO-gebruiker zelf de meerwaardebelasting aangeven?',
                a: 'Ja. DEGIRO doet niets automatisch. Je moet zelf TOB, roerende voorheffing én de meerwaardebelasting (10% boven €10.000 meerwaarde/jaar) berekenen en aangeven.',
              },
              {
                q: 'Is DEGIRO veilig?',
                a: 'DEGIRO valt onder €20.000 beleggersbescherming (Duits fonds, EdW). Belgische brokers bieden €100.000. Bovendien is securities lending verplicht in het basisaccount van DEGIRO, wat tegenpartijrisico meebrengt.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="card">
                <p className="font-semibold text-primary mb-2">{q}</p>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

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
