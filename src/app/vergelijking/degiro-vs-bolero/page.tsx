import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { Bronnen, articleJsonLd, type Bron } from '@/components/ui/Bronnen'

const degiro = getBrokerById('degiro')!
const bolero = getBrokerById('bolero')!

const NAGEKEKEN = '2026-10-22'
const URL = 'https://www.bestebroker.be/vergelijking/degiro-vs-bolero'
const TITLE = 'DEGIRO vs Bolero (2026): kosten en belastingen in België'
const DESCRIPTION =
  'DEGIRO of Bolero? Kosten per order, welke taksen je zelf aangeeft, NBB-melding, uitlenen van effecten en overdrachtkosten. Nagekeken oktober 2026.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, locale: 'nl_BE', type: 'article' },
  alternates: { canonical: URL },
}

const BRON = {
  degiroReview: 'https://curvo.eu/nl/artikel/degiro-review',
  degiroVsBolero: 'https://curvo.eu/nl/artikel/degiro-vs-bolero',
  boleroTarieven: 'https://www.bolero.be/uploads/media/667ecf0aabd9a/101-tarieven-nl.pdf',
  boleroReview: 'https://curvo.eu/nl/artikel/bolero-review',
}

const rows: { label: string; degiro: string; bolero: string }[] = [
  { label: 'Wie is het?', degiro: 'flatexDEGIRO Bank AG (Duitsland), toezicht BaFin; buitenlandse rekening', bolero: 'Online broker van KBC Bank (Belgische bank)' },
  { label: 'ETF-transactiekost', degiro: '€1 voor ETF’s uit de kernselectie (via Tradegate) · €3 voor andere ETF’s', bolero: '€2,50 tot €250 · €5 tot €1.000 · €7,50 tot €2.500 · daarboven €15 per €10.000 (max. €50 tot €70.000)' },
  { label: 'Beurstaks (TOB)', degiro: 'Afgehandeld door DEGIRO', bolero: 'Ingehouden door Bolero' },
  { label: 'Roerende voorheffing op dividenden, Reynderstaks', degiro: 'Zelf aangeven', bolero: 'Ingehouden door Bolero' },
  { label: 'Meerwaardebelasting (sinds 2026)', degiro: 'Zelf berekenen en aangeven', bolero: 'Ingehouden door Bolero' },
  { label: 'Melding bij de Nationale Bank (NBB)', degiro: 'Verplicht (buitenlandse rekening) + vermelden in je aangifte', bolero: 'Niet nodig' },
  { label: 'Automatisch spaarplan', degiro: 'Nee', bolero: 'Periodiek beleggen, enkel hele stuks; je stort zelf het geld vooraf' },
  { label: 'Bewaarloon', degiro: 'Geen', bolero: 'Geen' },
  { label: 'Securities lending (effecten uitlenen)', degiro: 'Toegelaten volgens de voorwaarden van het Basis-account', bolero: 'Nee' },
  { label: 'Bescherming effecten / cash', degiro: '€20.000 / €100.000 (Duitse stelsels)', bolero: '€20.000 / €100.000 (Belgische stelsels)' },
  { label: 'Effecten overzetten naar een andere bank', degiro: '€20 per lijn (plus eventuele externe kosten)', bolero: '€50 per lijn (gratis naar KBC/CBC)' },
  { label: 'Rekening openen met itsme', degiro: 'Nee', bolero: 'Ja' },
]

const kosten = [
  { bedrag: '€150', degiroKern: 1, degiroAnder: 3, bolero: 2.5 },
  { bedrag: '€300', degiroKern: 1, degiroAnder: 3, bolero: 5 },
  { bedrag: '€1.000', degiroKern: 1, degiroAnder: 3, bolero: 5 },
  { bedrag: '€2.000', degiroKern: 1, degiroAnder: 3, bolero: 7.5 },
]
const eur = (n: number) => `€${n.toFixed(2).replace('.', ',')}`

const faq = [
  {
    q: 'Is DEGIRO goedkoper dan Bolero?',
    a: 'Voor ETF-aankopen meestal wel. Een ETF uit de kernselectie van DEGIRO kost €1 per order via Tradegate, een andere ETF €3. Bolero rekent €2,50 tot €250, €5 tot €1.000 en €7,50 tot €2.500. Bij één aankoop van €300 per maand betaal je bij DEGIRO €12 tot €36 per jaar, bij Bolero €60. Daar staat tegenover dat je bij DEGIRO meer taksen zelf moet aangeven.',
  },
  {
    q: 'Welke belastingen moet ik bij DEGIRO zelf aangeven?',
    a: 'DEGIRO handelt de beurstaks (TOB) af. De meerwaardebelasting (10% boven een vrijstelling van €10.000 per jaar, op meerwaarden vanaf 2026), de Reynderstaks en de roerende voorheffing op buitenlandse dividenden geef je zelf aan. Je meldt je DEGIRO-rekening ook bij de Nationale Bank en vermeldt ze in je belastingaangifte.',
  },
  {
    q: 'Houdt Bolero alle taksen in?',
    a: 'Ja. Bolero houdt de beurstaks, de roerende voorheffing, de Reynderstaks en de meerwaardebelasting in. Blijft je meerwaarde onder de vrijstelling van €10.000 per jaar, dan recupereer je de ingehouden taks via je belastingaangifte.',
  },
  {
    q: 'Is DEGIRO veilig voor Belgische beleggers?',
    a: 'DEGIRO is een Duitse bank onder toezicht van BaFin. Je effecten worden apart van het eigen vermogen van DEGIRO bewaard. Als de bank failliet gaat, is cash beschermd tot €100.000 en zijn effecten gedekt tot €20.000; bij Bolero zijn die bedragen hetzelfde. Volgens de voorwaarden van het Basis-account mag DEGIRO effecten uitlenen; Bolero doet dat niet.',
  },
]

const bronnen: Bron[] = [
  { staaft: 'Kosten, taksen, NBB-melding, securities lending, bescherming, overdracht en itsme DEGIRO', label: 'Curvo, DEGIRO review (03/09/2026)', href: BRON.degiroReview },
  { staaft: 'Taksen en bescherming van beide', label: 'Curvo, DEGIRO vs Bolero (03/09/2026)', href: BRON.degiroVsBolero },
  { staaft: 'Transactiekosten, bewaarloon en overdracht Bolero', label: 'Bolero, tarievenlijst S101 (geldig vanaf 11/06/2025)', href: BRON.boleroTarieven },
  { staaft: 'Spaarplan, itsme en securities lending Bolero', label: 'Curvo, Bolero review (08/10/2026)', href: BRON.boleroReview },
]

export default function DegiroVsBoleroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'DEGIRO vs Bolero' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ headline: 'DEGIRO vs Bolero: kosten en belastingen voor Belgische beleggers', description: DESCRIPTION, url: URL, datePublished: '2026-04-18', dateModified: NAGEKEKEN })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'DEGIRO vs Bolero' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            DEGIRO vs Bolero: kosten en belastingen voor Belgische beleggers
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            DEGIRO rekent lagere transactiekosten, maar je geeft de meeste Belgische taksen zelf aan en meldt je rekening bij de
            Nationale Bank. Bolero is duurder per order en houdt alle taksen voor je in.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-10 border-l-4 border-l-accent" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>Kosten:</strong> DEGIRO €1 (kernselectie) of €3 per ETF-order; Bolero €2,50 tot €7,50 per order tot €2.500.</li>
            <li><strong>Belastingen:</strong> DEGIRO handelt enkel de beurstaks af. Meerwaardebelasting, Reynderstaks en buitenlandse dividenden geef je zelf aan. Bolero houdt alles in.</li>
            <li><strong>Administratie:</strong> een DEGIRO-rekening meld je bij de Nationale Bank; bij Bolero hoeft dat niet.</li>
            <li><strong>Uitlenen van effecten:</strong> toegelaten in de voorwaarden van DEGIRO; Bolero doet het niet.</li>
          </ul>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel DEGIRO en Bolero</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 pr-3 text-gray-600 font-semibold">Criterium</th>
                  <th scope="col" className="text-left py-3 px-2 font-semibold text-orange-600">DEGIRO</th>
                  <th scope="col" className="text-left py-3 pl-2 font-semibold text-red-600">Bolero</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map(({ label, degiro: vd, bolero: vb }) => (
                  <tr key={label}>
                    <th scope="row" className="py-2.5 pr-3 text-left font-medium text-gray-700 align-top">{label}</th>
                    <td className="py-2.5 px-2 text-gray-600 align-top">{vd}</td>
                    <td className="py-2.5 pl-2 text-gray-600 align-top">{vb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Tarieven exclusief beurstaks. Bronnen onderaan deze pagina, nagekeken op 22 oktober 2026.</p>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-2">Wat kost één ETF-aankoop per maand?</h2>
          <p className="text-sm text-gray-600 mb-4">Makelaarsloon voor één ETF-aankoop per maand, zonder beurstaks.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 text-gray-600 font-semibold">Bedrag per maand</th>
                  <th scope="col" className="text-center py-3 font-semibold text-orange-600">DEGIRO kernselectie</th>
                  <th scope="col" className="text-center py-3 font-semibold text-orange-600">DEGIRO andere ETF</th>
                  <th scope="col" className="text-center py-3 font-semibold text-red-600">Bolero</th>
                  <th scope="col" className="text-center py-3 text-gray-600 font-semibold">Bolero per jaar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {kosten.map(k => (
                  <tr key={k.bedrag}>
                    <th scope="row" className="py-2.5 text-left font-medium text-gray-700">{k.bedrag}</th>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.degiroKern)}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.degiroAnder)}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.bolero)}</td>
                    <td className="py-2.5 text-center text-gray-700 font-medium">{eur(k.bolero * 12)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Per jaar bij DEGIRO: €12 (kernselectie) of €36 (andere ETF). Reken je eigen situatie na met de{' '}
            <Link href="/tools/brokerkosten-calculator" className="text-accent hover:underline">brokerkosten-calculator</Link>.
          </p>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Belastingen: wat doe je zelf bij DEGIRO?</h2>
          <p>
            DEGIRO handelt de <Link href="/belgie/tob-uitleg">beurstaks (TOB)</Link> af. De rest doe je zelf: de meerwaardebelasting (10% op
            meerwaarden vanaf 2026, met een vrijstelling van €10.000 per jaar), de Reynderstaks op obligatie-ETF’s en de roerende voorheffing op
            buitenlandse dividenden. Je meldt je rekening ook bij het Centraal Aanspreekpunt van de Nationale Bank. Zie{' '}
            <Link href="/belgie/buitenlandse-broker-nbb-aangifte">NBB-aangifte bij een buitenlandse broker</Link> en{' '}
            <Link href="/broker-meerwaardebelasting-2026">meerwaardebelasting 2026 bij brokers</Link>.
          </p>

          <h2>Kosten: wanneer weegt het verschil door?</h2>
          <p>
            Hoe groter en frequenter je orders, hoe meer je bij Bolero betaalt. Bij één aankoop van €300 per maand is het verschil €24 tot €48
            per jaar. Weeg dat af tegen de tijd die je aan de eigen aangifte besteedt.
          </p>

          <h2>Voor wie is welk verschil belangrijk?</h2>
          <ul>
            <li><strong>Je wil zo weinig mogelijk administratie:</strong> bij Bolero worden alle taksen ingehouden en is geen NBB-melding nodig.</li>
            <li><strong>Je doet je aangifte graag zelf en belegt vaak:</strong> de lagere orderkosten van DEGIRO tellen dan zwaarder.</li>
            <li><strong>Je wil geen uitlening van je effecten:</strong> Bolero sluit dat uit; bij DEGIRO staat het in de voorwaarden.</li>
            <li><strong>Je wil later misschien overstappen:</strong> overzetten kost €20 per lijn bij DEGIRO en €50 bij Bolero.</li>
          </ul>
          <p>
            Meer details: <Link href="/reviews/degiro-belgie">review van DEGIRO</Link>, <Link href="/reviews/bolero">review van Bolero</Link>{' '}
            en <Link href="/vergelijking/bolero-vs-saxo">Bolero vs Saxo</Link>.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen over DEGIRO en Bolero</h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="card">
                <h3 className="font-semibold text-primary mb-2">{q}</h3>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[degiro, bolero].map(broker => (
            broker.affiliateUrl && (
              <div key={broker.id} className="card flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{broker.name}</p>
                  <p className="text-sm text-gray-500">{broker.tagline}</p>
                  <AffiliateLabel broker={broker} />
                </div>
                <a href={goLink(broker.id, 'degiro-vs-bolero')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0 text-sm py-2">Naar {broker.name} →</a>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}
