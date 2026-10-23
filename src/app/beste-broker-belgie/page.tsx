import type { Metadata } from 'next'
import Link from 'next/link'
import { brokers } from '@/data/brokers'
import { BrokerComparisonTable } from '@/components/broker/BrokerComparisonTable'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { EtfKostenTabel, maandelijkseEtfKost } from '@/components/broker/EtfKostenTabel'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { Bronnen, articleJsonLd, type Bron } from '@/components/ui/Bronnen'
import { BookRecommendationBlock } from '@/components/book/BookRecommendationBlock'

const URL = 'https://www.bestebroker.be/beste-broker-belgie'
const TITLE = 'Beste broker België 2026: wat kost €100 per maand echt?'
const DESCRIPTION =
  'Zes brokers naast elkaar: wat je per jaar betaalt, wie TOB en meerwaardebelasting inhoudt en waar je zelf aangifte doet. Met bronnen, oktober 2026.'
const NAGEKEKEN = '2026-10-23'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: URL },
}

// Volgorde = totaalscore uit /methodologie (berekend in brokers.ts), geen aanbeveling.
const opScore = [...brokers].sort((a, b) => b.rating - a.rating)
const metNaam = (id: string) => brokers.find(b => b.id === id)!

const BRON = {
  saxoAutoInvest: 'https://www.home.saxo/nl-be/products/autoinvest',
  saxoReview: 'https://curvo.eu/nl/artikel/saxo-bank-review',
  boleroTarieven: 'https://www.bolero.be/uploads/media/667ecf0aabd9a/101-tarieven-nl.pdf',
  boleroReview: 'https://curvo.eu/nl/artikel/bolero-review',
  medirectReview: 'https://curvo.eu/nl/artikel/medirect-review',
  medirectAandelen: 'https://www.test-aankoop.be/invest/beleggen/aandelen/artikels/2026/06/medirect-verlaagt-transactiekosten-aandelen',
  degiroReview: 'https://curvo.eu/nl/artikel/degiro-review',
  trReview: 'https://curvo.eu/nl/artikel/trade-republic-review',
  trTestAankoop: 'https://www.test-aankoop.be/invest/beleggen/etf/artikels/2026/09/trade-republic-belgie-beoordeling-kosten-fiscaliteit-beleggingen',
  spaarplannen: 'https://curvo.eu/article/best-etf-savings-plan-belgium',
  keytradeTarieven: 'https://keytradebank.be/en/new-trading-tariffs-2025',
  keytradeReview: 'https://curvo.eu/nl/artikel/keytrade-review',
  tob: 'https://curvo.eu/nl/artikel/hoe-je-de-beurstaks-van-een-etf-berekent',
  mwb: 'https://kpmg.com/be/nl/insights/my-tax-compass-de-trends-die-op-uw-fiscale-radar-moeten-staan/people-services-updates/meerwaardebelasting-goedgekeurd-door-het-parlement.html',
}

const bronnen: Bron[] = [
  { staaft: 'Transactiekosten Saxo (0,08%, minimum €2) en securities lending', label: 'Curvo, Saxo review', href: BRON.saxoReview },
  { staaft: 'AutoInvest Saxo (€2 per maand)', label: 'Saxo, AutoInvest', href: BRON.saxoAutoInvest },
  { staaft: 'Staffel Bolero (€2,50 tot €250, €5 tot €1.000, €7,50 tot €2.500, €15 per €10.000)', label: 'Bolero, tarievenlijst S101', href: BRON.boleroTarieven },
  { staaft: 'Taksen, spaarplan en bescherming Bolero', label: 'Curvo, Bolero review (08/10/2026)', href: BRON.boleroReview },
  { staaft: 'MeDirect: geen makelaarsloon op ETF’s, taksen ingehouden', label: 'Curvo, MeDirect review (03/09/2026)', href: BRON.medirectReview },
  { staaft: 'MeDirect: aandelen minimum €2,50 sinds 1/7/2026', label: 'Test-Aankoop (06/2026)', href: BRON.medirectAandelen },
  { staaft: 'DEGIRO: €1 kernselectie, €3 andere ETF’s, TOB ingehouden, rest zelf, NBB-melding', label: 'Curvo, DEGIRO review (03/09/2026)', href: BRON.degiroReview },
  { staaft: 'Trade Republic: Belgisch bijkantoor sinds 15/09/2026, taksen ingehouden', label: 'Test-Aankoop (15/09/2026)', href: BRON.trTestAankoop },
  { staaft: 'Trade Republic: €1 per order', label: 'Curvo, Trade Republic review (18/09/2026)', href: BRON.trReview },
  { staaft: 'Spaarplannen Saxo, Trade Republic en Bolero', label: 'Curvo, beste ETF-spaarplan België (22/10/2026)', href: BRON.spaarplannen },
  { staaft: 'Staffel Keytrade (€2,45 / €5,95 / €14,95, +€7,50 per €10.000)', label: 'Keytrade Bank, tarieven 2025', href: BRON.keytradeTarieven },
  { staaft: 'Keytrade: taksen, bescherming FGDR', label: 'Curvo, Keytrade review', href: BRON.keytradeReview },
  { staaft: 'TOB-tarieven ETF’s (0,12% / 1,32% / 0,35%) en maxima; VWCE in België geregistreerd', label: 'Curvo, beurstaks ETF (08/10/2026)', href: BRON.tob },
  { staaft: 'Meerwaardebelasting: 10%, vrijstelling €10.000, vanaf 1/1/2026, inhouding met opt-out', label: 'KPMG België, meerwaardebelasting goedgekeurd', href: BRON.mwb },
]

const faq = [
  {
    q: 'Welke broker is de beste in België?',
    a: 'Er is geen broker die voor iedereen de beste is. Drie dingen maken het verschil: hoeveel je per keer belegt (dat bepaalt de kost per order), of je een automatisch spaarplan wil, en of de broker alle Belgische taksen voor je inhoudt. Op deze pagina zie je per broker wat €100 of €500 per maand kost en welke taksen je zelf moet aangeven. Onze totaalscore en de weging staan op /methodologie. Dit is algemene informatie, geen persoonlijk advies.',
  },
  {
    q: 'Wat kost €100 per maand beleggen in een ETF?',
    a: `Aan transactiekosten per jaar: ${opScore.map(b => `${b.name} €${(maandelijkseEtfKost(b, 100).perMaand * 12).toFixed(2).replace('.', ',')}`).join(', ')}. Bij DEGIRO geldt dat voor een ETF uit de kernselectie. Daarbovenop betaal je bij elke broker dezelfde beurstaks (TOB): 0,12% voor een ETF die niet in België geregistreerd is, 1,32% voor een in België geregistreerde kapitaliserende ETF zoals VWCE.`,
  },
  {
    q: 'Welke brokers houden alle Belgische taksen in?',
    a: 'Saxo, Bolero, MeDirect en Keytrade houden de TOB, de roerende voorheffing, de Reynderstaks en de meerwaardebelasting in (die laatste kan je uitzetten). Trade Republic doet dat op de Belgische rekening, de meerwaardebelasting enkel als je ervoor kiest. DEGIRO houdt alleen de TOB in: de rest geef je zelf aan, en je meldt de rekening bij de Nationale Bank.',
  },
  {
    q: 'Moet ik meerwaardebelasting betalen in België?',
    a: 'Sinds 1 januari 2026 betaal je 10% op meerwaarden op financiële activa boven een vrijstelling van €10.000 per jaar. Brokers met een Belgische rekening houden de belasting in bij verkoop, tenzij je kiest voor opt-out en ze zelf aangeeft. Bij DEGIRO geef je ze altijd zelf aan.',
  },
  {
    q: 'Hoe veilig is mijn geld bij een broker?',
    a: 'Je effecten blijven jouw eigendom en worden apart bewaard. Gaat een broker failliet, dan beschermt een Europees stelsel de effecten tot €20.000 en cash tot €100.000 (bij Keytrade via het Franse fonds: effecten tot €70.000). Die bescherming dekt geen koersverliezen.',
  },
  {
    q: 'Waarom staat Interactive Brokers of Lightyear niet in deze vergelijking?',
    a: 'We vergelijken voorlopig zes brokers die we volledig hebben nagekeken. Lightyear houdt bijvoorbeeld geen TOB in en vraagt een NBB-melding; die gegevens moeten we nog op dezelfde manier controleren voor we ze naast de andere zetten. Platformen die vooral CFD’s aanbieden, nemen we niet op.',
  },
]

const ja = <span className="text-green-700 font-semibold">ja</span>
const zelf = <span className="text-orange-600 font-semibold">zelf</span>

export default function BesteBrokerPage() {
  const jsonLd = [
    articleJsonLd({ headline: TITLE, description: DESCRIPTION, url: URL, dateModified: NAGEKEKEN }),
    breadcrumbJsonLd([{ label: 'Beste broker België', href: '/beste-broker-belgie' }]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]
  const medirect = metNaam('medirect')
  const tr = metNaam('trade-republic')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Beste broker België' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Beste broker in België 2026: zes brokers vergeleken op kosten en taksen
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Wat betaal je echt per jaar, welke taksen houdt de broker voor je in, en wat moet je zelf aangeven? We zetten
            Saxo, Bolero, MeDirect, Keytrade, DEGIRO en Trade Republic naast elkaar, telkens met bron.
          </p>
          <LastUpdated date={NAGEKEKEN} />
        </header>

        {/* Kort antwoord */}
        <section className="card mb-10 max-w-3xl" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">Kort antwoord</h2>
          <p className="text-gray-700 mb-3">
            Er is geen broker die voor iedereen de beste is. Drie vragen bepalen het meest wat je betaalt en hoeveel werk je hebt:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Hoeveel beleg je per keer?</strong> Bij kleine bedragen weegt een minimumkost per order zwaar. Bij{' '}
              {medirect.name} kost een ETF-order €0, bij {tr.name} €1 (een spaarplan €0). Bolero en Keytrade werken met een staffel.{' '}
              <a href="#kosten" className="text-accent hover:underline">Zie de kosten per jaar</a>.
            </li>
            <li>
              <strong>Wil je automatisch elke maand beleggen?</strong> Saxo (AutoInvest, €2 per maand) en Trade Republic
              (spaarplan, ook in fracties) kopen automatisch. Bij Bolero kan het enkel in hele stuks. MeDirect, Keytrade en
              DEGIRO hebben geen ETF-spaarplan.
            </li>
            <li>
              <strong>Wil je zelf geen belastingaangifte doen voor je beleggingen?</strong> Vijf van de zes houden alles in.
              Bij DEGIRO geef je de meerwaardebelasting, de Reynderstaks en de buitenlandse dividenden zelf aan.{' '}
              <a href="#taksen" className="text-accent hover:underline">Zie wie wat inhoudt</a>.
            </li>
          </ol>
          <p className="text-sm text-gray-500 mt-4">
            Totaalscore volgens onze <Link href="/methodologie" className="text-accent hover:underline">methodologie</Link>:{' '}
            {opScore.map((b, i) => (
              <span key={b.id}>
                {b.name} {b.rating.toFixed(1).replace('.', ',')}{i < opScore.length - 1 ? ' · ' : ''}
              </span>
            ))}
            . De score volgt uit vaste wegingen, niet uit een samenwerking. Geen persoonlijk advies.
          </p>
        </section>

        {/* Kosten */}
        <section className="mb-10" aria-labelledby="kosten">
          <h2 id="kosten" className="font-display text-2xl font-bold text-primary mb-2">Wat kost beleggen per jaar bij elke broker?</h2>
          <p className="text-gray-600 max-w-3xl mb-4">
            Transactiekosten voor één ETF-aankoop per maand, berekend met de tarieven van oktober 2026. We nemen telkens de
            goedkoopste manier bij die broker (losse order, spaarplan of AutoInvest). Geen enkele van de zes rekent
            bewaarloon.
          </p>
          <EtfKostenTabel brokers={opScore} maandbedragen={[100, 500]} eenmalig={5000} id="kostentabel" />
          <p className="text-sm text-gray-500 mt-3 max-w-3xl">
            Niet inbegrepen, want gelijk bij elke broker: de beurstaks (TOB), 0,12% per aankoop of verkoop voor een ETF die niet in België geregistreerd is (max.
            €1.300), 1,32% voor een in België geregistreerde kapitaliserende ETF zoals VWCE. Wisselkosten tellen enkel bij effecten in vreemde munt. Bereken je eigen bedrag met de{' '}
            <Link href="/tools/brokerkosten-calculator" className="text-accent hover:underline">kostencalculator</Link>.
          </p>
        </section>

        {/* Taksen */}
        <section className="mb-10" aria-labelledby="taksen">
          <h2 id="taksen" className="font-display text-2xl font-bold text-primary mb-2">Welke broker houdt welke Belgische taks in?</h2>
          <p className="text-gray-600 max-w-3xl mb-4">
            &quot;Ja&quot; betekent dat de broker de taks inhoudt en doorstort. &quot;Zelf&quot; betekent dat je ze in je
            belastingaangifte zet.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <caption className="sr-only">Inhouding van Belgische taksen per broker</caption>
              <thead className="text-left border-b border-gray-200">
                <tr>
                  <th scope="col" className="py-3 pr-3 font-semibold text-gray-700">Broker</th>
                  <th scope="col" className="py-3 px-2 font-semibold text-gray-700">Beurstaks (TOB)</th>
                  <th scope="col" className="py-3 px-2 font-semibold text-gray-700">Roerende voorheffing</th>
                  <th scope="col" className="py-3 px-2 font-semibold text-gray-700">Reynderstaks</th>
                  <th scope="col" className="py-3 px-2 font-semibold text-gray-700">Meerwaardebelasting</th>
                  <th scope="col" className="py-3 pl-2 font-semibold text-gray-700">Melden bij NBB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {opScore.map(b => (
                  <tr key={b.id}>
                    <th scope="row" className="py-2.5 pr-3 text-left font-medium text-primary">{b.name}</th>
                    <td className="py-2.5 px-2">{b.taxes.tob ? ja : zelf}</td>
                    <td className="py-2.5 px-2">{b.taxes.dividendTax ? ja : zelf}</td>
                    <td className="py-2.5 px-2">{b.taxes.reynders ? ja : zelf}</td>
                    <td className="py-2.5 px-2">
                      {b.taxes.capitalGainsTax ? ja : zelf}
                      {b.id === 'trade-republic' && <span className="block text-xs text-gray-500">als je ervoor kiest</span>}
                      {b.taxes.capitalGainsTax && b.id !== 'trade-republic' && <span className="block text-xs text-gray-500">opt-out mogelijk</span>}
                    </td>
                    <td className="py-2.5 pl-2">{b.nbbRegistrationRequired ? <span className="text-orange-600 font-semibold">ja</span> : 'nee'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3 max-w-3xl">
            Trade Republic: dit geldt voor de Belgische rekening (sinds 15/09/2026). Een oude Duitse rekening houdt niets in.
            Meer uitleg: <Link href="/belgie/tob-uitleg" className="text-accent hover:underline">TOB uitgelegd</Link> ·{' '}
            <Link href="/broker-meerwaardebelasting-2026" className="text-accent hover:underline">meerwaardebelasting per broker</Link> ·{' '}
            <Link href="/belgie/buitenlandse-broker-nbb-aangifte" className="text-accent hover:underline">NBB-melding</Link>.
          </p>
        </section>

        {/* Veiligheid */}
        <section className="mb-10 prose-custom max-w-3xl" aria-labelledby="veiligheid">
          <h2 id="veiligheid">Hoe veilig zijn je beleggingen bij deze brokers?</h2>
          <p>
            Bij alle zes blijven je effecten jouw eigendom en worden ze gescheiden van het geld van de broker bewaard. Gaat een
            broker failliet, dan dekt een Europees beschermingsstelsel effecten tot €20.000 en cash tot €100.000. Bij
            Keytrade loopt dat via het Franse fonds FGDR, dat effecten tot €70.000 dekt. Bescherming dekt nooit koersverlies.
          </p>
          <p>
            Verschillen zitten in het toezicht en het uitlenen van effecten (securities lending). Bolero, MeDirect en Keytrade
            lenen je effecten niet uit. Bij Saxo kan het enkel als je ervoor kiest. Bij DEGIRO en Trade Republic staat het in de
            voorwaarden. Hoe we toezicht en publieke sancties in de veiligheidsscore verwerken, lees je op{' '}
            <Link href="/methodologie" className="text-accent hover:underline">onze methodologie</Link>.
          </p>
        </section>

        {/* Table */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">Alle brokers in één tabel</h2>
          <BrokerComparisonTable brokers={brokers} />
        </section>

        {/* Per-broker cards */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-2">Elke broker van dichtbij</h2>
          <p className="text-sm text-gray-500 mb-6">Gerangschikt op totaalscore volgens de methodologie.</p>
          <div className="space-y-6">
            {opScore.map(broker => (
              <BrokerCard key={broker.id} broker={broker} source="beste-broker-page" />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10 prose-custom max-w-3xl" aria-labelledby="faq">
          <h2 id="faq">Veelgestelde vragen over brokers in België</h2>
          {faq.map(f => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a.replace('/methodologie', 'onze methodologiepagina')}</p>
            </div>
          ))}
          <p>
            Twijfel je tussen twee brokers? Lees{' '}
            <Link href="/vergelijking/bolero-vs-saxo" className="text-accent hover:underline">Bolero vs Saxo</Link>,{' '}
            <Link href="/vergelijking/saxo-vs-medirect" className="text-accent hover:underline">Saxo vs MeDirect</Link> of{' '}
            <Link href="/vergelijking/degiro-vs-bolero" className="text-accent hover:underline">DEGIRO vs Bolero</Link>.
          </p>
        </section>

        <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN} />

        {/* Internal links */}
        <nav aria-label="Verder lezen" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            { href: '/beste-etf-broker-belgie', label: 'ETF-broker vergelijken', sub: 'Spaarplannen en kosten per maand' },
            { href: '/goedkoopste-broker-belgie', label: 'Goedkoopste broker', sub: 'Kosten per order naast elkaar' },
            { href: '/broker-meerwaardebelasting-2026', label: 'Meerwaardebelasting 2026', sub: 'Welke broker houdt ze in?' },
            { href: '/tools/brokerkosten-calculator', label: 'Kostencalculator', sub: 'Reken je eigen bedrag na' },
            { href: '/tools/welke-broker-past-bij-mij', label: 'Welke broker past bij mij?', sub: 'Vier vragen over hoe je belegt' },
            { href: '/belgie/tob-uitleg', label: 'TOB uitgelegd', sub: 'Wat is de taks op beursverrichtingen?' },
          ].map(({ href, label, sub }) => (
            <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
              <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label}</p>
              <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
            </Link>
          ))}
        </nav>

        <BookRecommendationBlock bookIds={['hangmatbelegger', 'psychologie-geld-nl']} />
      </div>
    </>
  )
}
