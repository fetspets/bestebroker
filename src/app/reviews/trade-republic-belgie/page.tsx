import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'
import { KrososBlok } from '@/components/partners/KrososBlok'

const broker = getBrokerById('trade-republic')!
const NAGEKEKEN = '2026-11-17'
const URL = 'https://www.bestebroker.be/reviews/trade-republic-belgie'

const BRON = {
  curvoReview: 'https://curvo.eu/nl/artikel/trade-republic-review',
  curvoSparen: 'https://curvo.eu/nl/artikel/trade-republic-spaarrekening-review',
  curvoAangeven: 'https://curvo.eu/nl/artikel/trade-republic-aangeven-belgie',
  testAankoop: 'https://www.test-aankoop.be/invest/beleggen/etf/artikels/2026/09/trade-republic-belgie-beoordeling-kosten-fiscaliteit-beleggingen',
}

const bronnen: Bron[] = [
  { staaft: 'Orderkosten (€1 Best Price, €2 Direct Price), eigen marktmaker sinds 2/7/2026, klantendienst, overdracht €25 per lijn, bescherming', label: 'Curvo, Trade Republic review (3/11/2026)', href: BRON.curvoReview },
  { staaft: 'Rente 3% tot €50.000 voor nieuwe klanten, ECB-rente 2,50% voor bestaande klanten, roerende voorheffing van 30% vanaf de eerste euro', label: 'Curvo, spaarrekening Trade Republic (22/10/2026)', href: BRON.curvoSparen },
  { staaft: 'Oude Duitse rekening: melding bij het centraal aanspreekpunt van de NBB en sluitingsdatum doorgeven', label: 'Curvo, Trade Republic aangeven in België (22/10/2026)', href: BRON.curvoAangeven },
  { staaft: 'Belgisch bijkantoor sinds 15/09/2026, BE-IBAN, inhouding TOB/RV/Reynders, meerwaardebelasting opt-in, spaarplannen, overstap naar keuze, aangifte 2027 voor de Duitse rekening', label: 'Test-Aankoop, Trade Republic wordt echt Belgisch (15/09/2026)', href: BRON.testAankoop },
]

const TITLE = 'Trade Republic België review 2026: 3% rente, maar lees dit'
const DESCRIPTION =
  'Belgische rekening sinds 15/09/2026. Wie krijgt die 3% rente, wat houdt de app aan taksen in, en wanneer moet je je oude Duitse rekening toch nog zelf aangeven?'

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

const faq = [
  {
    q: 'Krijg ik 3% rente bij Trade Republic?',
    a: 'Als nieuwe Belgische klant krijg je 3% bruto op cash tot €50.000; daarboven de ECB-rente (2,50%). Bestaande klanten krijgen de ECB-rente op het hele saldo. Na 30% roerende voorheffing blijft van 3% nog 2,10% over (Curvo en Test-Aankoop, september–november 2026). Trade Republic kan de rente wijzigen.',
  },
  {
    q: 'Moet ik mijn oude Duitse Trade Republic-rekening zelf overzetten?',
    a: 'Trade Republic zet bestaande klanten geleidelijk over en je beslist zelf of je overstapt. Tot dan blijft je rekening Duits: je geeft de taksen zelf aan en meldt de rekening bij de Nationale Bank. Na de overstap geef je bij het centraal aanspreekpunt de sluitingsdatum van de Duitse rekening door.',
  },
  {
    q: 'Moet ik Trade Republic nog aangeven in mijn belastingaangifte?',
    a: 'Een nieuwe Belgische rekening hoef je niet bij de Nationale Bank te melden. Had je in 2026 nog een Duitse rekening, dan vermeld je die volgens Test-Aankoop nog in de aangifte van 2027, en taksen van vóór de overstap geef je wellicht zelf aan.',
  },
  {
    q: 'Is Trade Republic veilig voor Belgen?',
    a: 'Trade Republic is een Duitse bank onder toezicht van BaFin. Cash is beschermd tot €100.000 en effecten tot €20.000 als de bank failliet gaat. Dat dekt geen koersverliezen. Cash in een geldmarktfonds valt niet onder de depositogarantie.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: TITLE,
    itemReviewed: { '@type': 'FinancialService', name: 'Trade Republic', url: 'https://traderepublic.com/be' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5', worstRating: '1' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://www.bestebroker.be/over-mij' },
    publisher: { '@type': 'Organization', name: 'BesteBroker.be' },
    datePublished: '2026-01-15',
    dateModified: NAGEKEKEN,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  },
  breadcrumbJsonLd([{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Trade Republic' }]),
]

export default function TradeRepublicReviewPage() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Trade Republic' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Trade Republic België — Review 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Trade Republic is een Duitse bank met een eenvoudige app, €1 per order en spaarplannen zonder transactiekost.
            Sinds 15 september 2026 heeft ze een Belgisch bijkantoor: nieuwe klanten krijgen een rekening met een IBAN die
            begint met BE, en de Belgische taksen worden ingehouden.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-8 border-l-4 border-l-accent" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>Kosten:</strong> €1 per order, spaarplannen gratis. Wil je zelf de beurs kiezen, dan €2.</li>
            <li><strong>Rente:</strong> 3% bruto tot €50.000 voor nieuwe klanten, 2,10% netto na roerende voorheffing. <a href="#rente" className="text-accent hover:underline">Rekenvoorbeeld</a>.</li>
            <li><strong>Taksen:</strong> op de Belgische rekening houdt Trade Republic beurstaks, roerende voorheffing en Reynderstaks in; meerwaardebelasting enkel als je dat kiest.</li>
            <li><strong>Oude klant?</strong> Je rekening blijft Duits tot je zelf overstapt. <a href="#overstappen" className="text-accent hover:underline">Wat je dan moet doen</a>.</li>
            <li><strong>Minpunt:</strong> geen telefoon of chat; Trade Republic is sinds juli 2026 zelf de tegenpartij van je orders.</li>
          </ul>
        </section>

        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-sm text-orange-800">
            <strong>Let op het verschil tussen oude en nieuwe rekeningen.</strong> Opende je je rekening vóór 15 september 2026,
            dan blijft ze Duits tot je ze overzet. Op een Duitse rekening geef je de beurstaks, roerende voorheffing,
            Reynderstaks en meerwaardebelasting zelf aan, en meld je de rekening bij de Nationale Bank (NBB).
          </p>
        </div>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="tr-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat kost een order bij Trade Republic?</h2>
          <p>
            Een aankoop of verkoop van een ETF, aandeel of obligatie kost <strong>€1 per order</strong> met &quot;Best Price&quot;,
            de standaardinstelling. Kies je zelf de beurs (&quot;Direct Price&quot;), dan betaal je €2. Een spaarplan in
            ETF&apos;s kost geen transactiekost, ook niet als je fracties koopt; je kiest wekelijks, tweewekelijks, maandelijks
            of per kwartaal.
          </p>
          <p>
            Daarbovenop komt de beurstaks, die Trade Republic op een Belgische rekening inhoudt. Die hangt af van de ETF:
            0,12% voor de meeste wereld-ETF&apos;s, 1,32% voor een ETF die in België geregistreerd is. Op de pagina{' '}
            <Link href="/beste-etf-broker-belgie">beste ETF-broker</Link> reken je uit wat broker en taks samen kosten, en in de{' '}
            <Link href="/belgie/tob-uitleg">uitleg over de beurstaks</Link> zie je welke ETF in welke schijf valt.
          </p>
          <p>
            Andere kosten: dividenden in een vreemde munt worden omgezet in euro, met wisselkosten. Effecten overzetten naar
            een andere bank kost €25 per lijn, plus eventuele externe kosten.
          </p>

          <h2 id="rente">Hoeveel rente krijg je op je cash?</h2>
          <p>
            Nieuwe Belgische klanten krijgen <strong>3% bruto</strong> op cash tot €50.000. Op het deel daarboven, en voor
            bestaande klanten op het hele saldo, geldt de ECB-rente: 2,50% volgens Curvo (22/10/2026). Voor de 3% is geen
            einddatum aangekondigd, maar Trade Republic kan de rente op elk moment wijzigen.
          </p>
          <p>
            Op de Belgische rekening houdt Trade Republic <strong>30% roerende voorheffing</strong> in, vanaf de eerste euro.
            De vrijstelling van een gereglementeerde spaarrekening geldt hier niet.
          </p>
          <div className="not-prose overflow-x-auto mb-4">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <caption className="text-left text-xs text-gray-500 mb-1">Rekenvoorbeeld voor een nieuwe klant, één jaar, rente ongewijzigd</caption>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="text-left p-2">Cash</th>
                  <th scope="col" className="text-right p-2">Bruto</th>
                  <th scope="col" className="text-right p-2">Netto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200"><td className="p-2">€10.000</td><td className="text-right p-2">€300</td><td className="text-right p-2">€210</td></tr>
                <tr className="border-t border-gray-200"><td className="p-2">€50.000</td><td className="text-right p-2">€1.500</td><td className="text-right p-2">€1.050</td></tr>
                <tr className="border-t border-gray-200"><td className="p-2">€60.000</td><td className="text-right p-2">€1.750</td><td className="text-right p-2">€1.225</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500">
            Bij €60.000: 3% op €50.000 plus 2,50% op €10.000. Een deel van je cash kan in een geldmarktfonds staan; dat valt
            niet onder de depositogarantie van €100.000.
          </p>

          <h2>Welke taksen houdt Trade Republic in?</h2>
          <p>Op een Belgische rekening (nieuw sinds 15 september 2026):</p>
          <ul>
            <li><strong>Beurstaks (TOB):</strong> ingehouden</li>
            <li><strong>Roerende voorheffing</strong> op dividenden en rente (30%): ingehouden</li>
            <li><strong>Reynderstaks</strong> op ETF&apos;s met minstens 10% obligaties: ingehouden</li>
            <li>
              <strong>Meerwaardebelasting (10%, sinds 2026):</strong> je kiest. Bij <em>opt-in</em> houdt Trade Republic ze in bij
              verkoop; bij <em>opt-out</em> geef je ze zelf aan. Meer in{' '}
              <Link href="/broker-meerwaardebelasting-2026">welke broker regelt de meerwaardebelasting?</Link>
            </li>
            <li><strong>Melding bij de NBB:</strong> niet nodig voor de Belgische rekening</li>
          </ul>

          <h2 id="overstappen">Je oude Duitse rekening: overstappen of niet?</h2>
          <p>
            Trade Republic zet bestaande klanten <strong>geleidelijk</strong> over naar het Belgische bijkantoor, en je beslist zelf
            of je overstapt. Zolang je dat niet doet, blijft alles zoals vroeger: je geeft beurstaks, roerende voorheffing,
            Reynderstaks en meerwaardebelasting zelf aan, en de rekening staat gemeld bij het centraal aanspreekpunt van de
            Nationale Bank (<Link href="/belgie/buitenlandse-broker-nbb-aangifte">zo doe je die melding</Link>).
          </p>
          <p>Stap je over, denk dan aan drie dingen:</p>
          <ul>
            <li>Geef bij het centraal aanspreekpunt de <strong>sluitingsdatum</strong> van de Duitse rekening door, in dezelfde melding.</li>
            <li>Vermeld de Duitse rekening nog in je <strong>aangifte van 2027</strong>, omdat ze in 2026 open stond.</li>
            <li>Taksen van vóór de overstap geef je volgens Test-Aankoop <strong>wellicht nog zelf</strong> aan.</li>
          </ul>
          <KrososBlok bron="trade-republic-review" />
          <p>
            Hoe de overstap in de app precies verloopt en of er een uiterste datum is, vonden we in geen enkele bron: kijk het na
            in de app of het helpcenter van Trade Republic.
          </p>

          <h2>De minpunten</h2>
          <ul>
            <li>
              <strong>Klantendienst:</strong> geen telefoon en geen chat, enkel e-mail en een webformulier. Curvo noemt de
              klantendienst &quot;vrij slecht&quot;.
            </li>
            <li>
              <strong>Eigen marktmaker:</strong> sinds 2 juli 2026 treedt Trade Republic zelf op als tegenpartij van je orders
              (Curvo). Bij €1 per order is dat goedkoop, maar je ziet niet hoeveel de koers afwijkt van een gewone beurs.
            </li>
            <li><strong>Overdracht naar een andere bank:</strong> €25 per lijn.</li>
            <li><strong>Geen itsme</strong> bij het openen van een rekening.</li>
          </ul>

          <h2>Hoe veilig is je geld?</h2>
          <p>
            Trade Republic staat onder toezicht van de Duitse BaFin. Gaat de bank failliet, dan is cash beschermd tot €100.000
            en zijn effecten gedekt tot €20.000 door de Duitse stelsels. Dat zijn dezelfde bedragen als bij een Belgische bank.
            Je effecten worden apart van het vermogen van de bank bewaard. Beleggersbescherming dekt geen koersverliezen.
          </p>

          <h2>Spaarplannen</h2>
          <p>
            Je kan automatisch een vast bedrag beleggen in ETF&apos;s, ook in fracties, zonder transactiekost. DEGIRO heeft geen
            automatisch spaarplan; bij Saxo kost AutoInvest €2 per maand.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">Trade Republic account openen</p>
              <AffiliateLabel broker={broker} />
            </div>
            <a href={goLink(broker.id, 'tr-review-cta')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen over Trade Republic in België</h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="card">
                <h3 className="font-semibold text-primary mb-2">{q}</h3>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN} datumPerBron />

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Gerelateerde pagina&apos;s</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/beste-etf-broker-belgie', label: 'Beste ETF-broker: broker en beurstaks samen' },
              { href: '/belgie/buitenlandse-broker-nbb-aangifte', label: 'NBB-aangifte buitenlandse rekening' },
              { href: '/broker-meerwaardebelasting-2026', label: 'Meerwaardebelasting 2026 — wie regelt het?' },
              { href: '/beste-broker-belgie', label: 'Alle brokers vergelijken — beste keuze?' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
                <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label} →</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
