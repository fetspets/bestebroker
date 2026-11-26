import type { Metadata } from 'next'
import Link from 'next/link'
import { brokers, transactiekost } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'

// Zoekwoord van de startpagina: "brokers vergelijken België". "Beste broker België" hoort bij /beste-broker-belgie
// (geen twee pagina's op hetzelfde zoekwoord; beide titels begonnen tot 26/11/2026 met "Beste broker België 2026").
const TITLE = 'Brokers vergelijken in België: wie houdt welke taks in?'
const DESCRIPTION =
  'Zes brokers naast elkaar: orderkost, beurstaks, meerwaardebelasting en NBB-melding. Bij één ervan regel je bijna alles zelf. Met bron en datum.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.bestebroker.be',
    type: 'website',
    locale: 'nl_BE',
  },
  alternates: { canonical: 'https://www.bestebroker.be' },
}

// Volgorde = totaalscore uit /methodologie (berekend in brokers.ts), geen aanbeveling.
const topBrokers = [...brokers].sort((a, b) => b.rating - a.rating).slice(0, 3)
// Meest recente controle van de brokerdata, voor het label bovenaan.
const NAGEKEKEN = brokers.map(b => b.lastVerified).sort().reverse()[0]
const MAANDEN = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
const nagekekenLabel = `${MAANDEN[Number(NAGEKEKEN.slice(5, 7)) - 1]} ${NAGEKEKEN.slice(0, 4)}`

// Overzicht "in één oogopslag": alles berekend uit src/data/brokers.ts, volgorde = totaalscore (geen aanbeveling).
const opScore = [...brokers].sort((a, b) => b.rating - a.rating)
const eur = (n: number) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 }).format(n)
const REVIEW: Record<string, string> = {
  saxo: '/reviews/saxo-bank-belgie',
  bolero: '/reviews/bolero',
  medirect: '/reviews/medirect',
  degiro: '/reviews/degiro-belgie',
  'trade-republic': '/reviews/trade-republic-belgie',
  keytrade: '/reviews/keytrade-belgie',
}
function takslabel(b: (typeof brokers)[number]): { tekst: string; zelf: boolean } {
  const alles = b.taxes.tob && b.taxes.dividendTax && b.taxes.reynders && b.taxes.capitalGainsTax
  if (alles && !b.nbbRegistrationRequired) {
    // Trade Republic: meerwaardebelasting enkel bij opt-in (zie brokers.ts)
    return { tekst: b.id === 'trade-republic' ? 'Alles ingehouden, meerwaardebelasting als je dat kiest' : 'Alles ingehouden', zelf: false }
  }
  if (b.taxes.tob && !b.taxes.dividendTax) return { tekst: 'Enkel beurstaks; rest zelf aangeven + NBB-melding', zelf: true }
  return { tekst: 'Deels zelf aangeven', zelf: true }
}
const overzicht = opScore.map(b => ({ b, etf: transactiekost(b.fees, 1000), taks: takslabel(b) }))

const vergelijkingen = [
  { href: '/vergelijking/bolero-vs-saxo', title: 'Bolero vs Saxo', sub: 'Vaste staffel of 0,08% per order' },
  { href: '/vergelijking/saxo-vs-medirect', title: 'Saxo vs MeDirect', sub: 'AutoInvest of €0 per ETF-order' },
  { href: '/vergelijking/saxo-vs-degiro', title: 'Saxo vs DEGIRO', sub: 'Alles ingehouden of alles zelf aangeven' },
  { href: '/vergelijking/degiro-vs-bolero', title: 'DEGIRO vs Bolero', sub: '€1 per ETF-order of een Belgische bank' },
]

const NAGEKEKEN_HOME = '2026-11-26'
const bronnen: Bron[] = [
  { staaft: 'Kost per ETF-order van €1.000: Saxo €2, Trade Republic €1, DEGIRO €1 (kernselectie), MeDirect €0, Bolero €5, Keytrade €5,95', label: 'Curvo, beste broker België voor ETF’s (03/11/2026)', href: 'https://curvo.eu/nl/artikel/beste-broker-belgie-etf' },
  { staaft: 'DEGIRO: €1 enkel voor de kernselectie via Tradegate, anders €3; enkel TOB ingehouden, NBB-melding', label: 'Curvo, DEGIRO-kosten voor ETF’s (22/10/2026)', href: 'https://curvo.eu/nl/artikel/degiro-kosten-etf' },
  { staaft: 'Trade Republic: Belgische rekening sinds 15/09/2026, taksen ingehouden, meerwaardebelasting bij opt-in', label: 'Test-Aankoop (15/09/2026)', href: 'https://www.test-aankoop.be/invest/beleggen/etf/artikels/2026/09/trade-republic-belgie-beoordeling-kosten-fiscaliteit-beleggingen' },
  { staaft: 'Staffel Bolero (€5 tot €1.000)', label: 'Bolero, tarievenlijst S101', href: 'https://www.bolero.be/uploads/media/667ecf0aabd9a/101-tarieven-nl.pdf' },
  { staaft: 'Staffel Keytrade (€5,95 van €250 tot €2.500)', label: 'Keytrade Bank, tarieven 2025', href: 'https://keytradebank.be/en/new-trading-tariffs-2025' },
]

const stats = [
  { value: '6', label: 'brokers vergeleken' },
  { value: '100%', label: 'Nederlandstalig' },
  { value: '2026', label: 'fiscaal bijgewerkt' },
  { value: '7', label: 'fiscale gidsen' },
]

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BesteBroker.be',
  url: 'https://www.bestebroker.be',
  logo: 'https://www.bestebroker.be/img/favicon-32x32.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@bestebroker.be',
    contactType: 'customer support',
    areaServed: 'BE',
    availableLanguage: 'nl',
  },
  sameAs: [],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BesteBroker.be',
  url: 'https://www.bestebroker.be',
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="section-container text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Brokerdata nagekeken {nagekekenLabel} · Meerwaardebelasting inbegrepen
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Brokers vergelijken in België — <span className="text-accent">met bron en datum</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            100% Nederlandstalig · Belgische fiscale diepgang.
            Wij vergelijken TOB, meerwaardebelasting, bewaarloon en meer, met bron en datum. Kiezen doe je zelf.
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

      {/* Overzicht in één oogopslag */}
      <section className="py-10 md:py-14 bg-white" aria-labelledby="overzicht">
        <div className="section-container max-w-4xl">
          <h2 id="overzicht" className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
            Zes brokers in één oogopslag
          </h2>
          <p className="text-gray-600 mb-5">
            Twee dingen verschillen het meest: wat één order kost en welke taksen de broker voor je inhoudt. De beurstaks
            (TOB) houden ze alle zes in. Het verschil zit in de roerende voorheffing, de Reynderstaks, de
            meerwaardebelasting en de melding bij de Nationale Bank.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-fixed break-words hyphens-auto">
              <caption className="sr-only">Kost per ETF-order van €1.000 en Belgische taksen per broker</caption>
              <thead className="text-left border-b border-gray-200">
                <tr>
                  <th scope="col" className="py-2 pr-2 w-[34%]">Broker</th>
                  <th scope="col" className="py-2 pr-2 w-[22%]">ETF-order €1.000</th>
                  <th scope="col" className="py-2">Taksen</th>
                </tr>
              </thead>
              <tbody>
                {overzicht.map(({ b, etf, taks }) => (
                  <tr key={b.id} className="border-b border-gray-100 align-top">
                    <th scope="row" className="py-3 pr-2 text-left font-semibold text-primary">
                      <Link href={REVIEW[b.id] ?? '/beste-broker-belgie'} className="hover:text-accent hover:underline">
                        {b.name}
                      </Link>
                      <span className="block text-xs font-normal text-gray-500">score {b.rating.toFixed(1).replace('.', ',')}/5</span>
                    </th>
                    <td className="py-3 pr-2">
                      {eur(etf)}
                      {b.id === 'degiro' && <span className="block text-xs text-gray-500">kernselectie; anders €3</span>}
                    </td>
                    <td className={`py-3 ${taks.zelf ? 'text-orange-700' : 'text-gray-700'}`}>{taks.tekst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Volgorde = onze totaalscore (<Link href="/methodologie" className="text-accent hover:underline">methodologie</Link>), geen
            persoonlijk advies. Kosten zonder beurstaks; bronnen onderaan deze pagina.
          </p>
          <p className="mt-5 text-gray-700">
            Wat is de <Link href="/beste-broker-belgie" className="text-accent font-semibold hover:underline">beste broker in België voor jouw situatie</Link>?
            Daar rekenen we €100 of €500 per maand, één aankoop van €5.000 en automatisch beleggen door. Twijfel je tussen twee
            brokers? Kies hieronder een rechtstreekse vergelijking.
          </p>
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
                title: 'Geen gekochte posities',
                text: 'De volgorde volgt onze vaste score, ook bij brokers waarmee we samenwerken. Elke tariefvergelijking heeft een bron en datum, en bij affiliate-links staat altijd "betaalde samenwerking".',
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
                Hoogste totaalscore in 2026
              </h2>
              <p className="text-gray-600 mt-1">
                Volgens onze <Link href="/methodologie" className="text-accent hover:underline">methodologie</Link> (kosten, fiscale afhandeling, veiligheid, gebruiksgemak). Geen persoonlijk advies.
              </p>
            </div>
            <Link href="/beste-broker-belgie" className="text-accent hover:underline text-sm font-medium hidden sm:block">
              Alle {brokers.length} brokers →
            </Link>
          </div>
          <div className="space-y-6">
            {topBrokers.map(broker => (
              <BrokerCard key={broker.id} broker={broker} source="homepage" />
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
          <h2 className="font-display text-2xl font-bold text-primary text-center mb-8">Twee brokers rechtstreeks vergelijken</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vergelijkingen.map(({ href, title, sub }) => (
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

      <div className="section-container max-w-4xl py-10">
        <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN_HOME} datumPerBron />
      </div>
    </>
  )
}
