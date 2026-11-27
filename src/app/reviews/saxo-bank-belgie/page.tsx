import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById, transactiekost } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { BookRecommendationBlock } from '@/components/book/BookRecommendationBlock'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { RekeningOpenen } from '@/components/broker/RekeningOpenen'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'
import { EtfKostenTabel } from '@/components/broker/EtfKostenTabel'
import { KrososBlok } from '@/components/partners/KrososBlok'
import { EindejaarTip } from '@/components/partners/EindejaarTip'

const broker = getBrokerById('saxo')!
const bolero = getBrokerById('bolero')!
const vergelijk = ['saxo', 'bolero', 'medirect'].map(id => getBrokerById(id)!)

const NAGEKEKEN = '2026-11-25'
const URL = 'https://www.bestebroker.be/reviews/saxo-bank-belgie'
const TITLE = 'Saxo Bank review België: let op deze ene inhouding'
const DESCRIPTION =
  'Saxo nagekeken op 25/11: wat een ETF-order echt kost, wanneer AutoInvest loont en waarom teveel ingehouden taks lang op zich laat wachten.'

const BRON = {
  tarieven: 'https://www.home.saxo/nl-be/rates-and-conditions/commissions-charges-and-margin-schedule',
  rekening: 'https://www.home.saxo/nl-be/accounts/individual',
  autoinvest: 'https://www.home.saxo/nl-be/products/autoinvest',
  mwb: 'https://www.home.saxo/nl-be/campaigns/meerwaardebelasting-arizona-regering',
  curvo: 'https://curvo.eu/nl/artikel/saxo-bank-review',
  curvoVsDegiro: 'https://curvo.eu/nl/artikel/degiro-vs-saxo',
  boete: 'https://www.fintechfutures.com/regulatory-actions/saxo-bank-fined-by-danish-fsa',
  tob: 'https://curvo.eu/nl/artikel/hoe-je-de-beurstaks-van-een-etf-berekent',
}

const bronnen: Bron[] = [
  { staaft: 'Wisselkoerskost middenkoers ± 0,25%; uitgaande transfer effecten €75 per lijn; manuele order via telefoon €15; Belgisch bijkantoor van Saxo Bank A/S, toezicht DFSA, FSMA en NBB', label: 'Saxo België, commissies, kosten en margeschema (gelezen 25/11/2026)', href: BRON.tarieven },
  { staaft: 'Niveaus Bronze, Silver (vanaf €200.000) en Gold (vanaf €1.000.000); VS-aandelen 0,08% met minimum $1', label: 'Saxo België, individuele rekening (gelezen 06/11/2026)', href: BRON.rekening },
  { staaft: 'AutoInvest €2 per maand', label: 'Saxo België, AutoInvest (gelezen 23/11/2026)', href: BRON.autoinvest },
  { staaft: 'Standaard inhouding van 10%; vrijstelling €10.000 per jaar, overdraagbaar met €1.000 per jaar tot €15.000; geen taks op verlies; opt-out-keuze', label: 'Saxo België, meerwaardebelasting (FAQ op basis van info van 31/03/2026, gelezen 25/11/2026)', href: BRON.mwb },
  { staaft: 'Aandelen en ETF’s 0,08% (min. €2, Bronze); €1.000 IWDA = €2; AutoInvest op de 5de van de maand, geen minimumbedrag, tot 10 ETF’s, geen fracties; terugbetaling meerwaardebelasting kan tot 2,5 jaar duren; TOB, roerende voorheffing en Reynderstaks ingehouden; geen NBB-melding; itsme; gezamenlijke en bedrijfsrekening, geen kinderrekening; uitlenen opt-in; bescherming €20.000/€100.000', label: 'Curvo, Saxo review (24/11/2026)', href: BRON.curvo },
  { staaft: 'Verkoop van een ETF: ook 0,08% met minimum €2', label: 'Curvo, DEGIRO vs Saxo (03/09/2026)', href: BRON.curvoVsDegiro },
  { staaft: 'Beurstaks ETF’s 0,12% of 1,32%', label: 'Curvo, beurstaks ETF (08/10/2026)', href: BRON.tob },
  { staaft: 'Boete Deense toezichthouder (januari 2026)', label: 'FinTech Futures', href: BRON.boete },
]

const eur = (n: number) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

// Rekenvoorbeelden, berekend uit brokers.ts
const MAAND = 300
const orderMaand = transactiekost(broker.fees, MAAND) // 0,08% van €300 = €0,24 → minimum €2
const autoinvest = broker.fees.autoinvestMonthly ?? 2
const GROOT = 10000
const orderGroot = transactiekost(broker.fees, GROOT)
const boleroGroot = transactiekost(bolero.fees, GROOT)
const omslag = broker.fees.transactionFeeMin / broker.fees.transactionFeePercent // vanaf hier betaal je meer dan het minimum
// Wisselkoerskost (Saxo-tarievenpagina): 0,25% op het omgezette bedrag
const FX = 0.0025
const VS_ORDER = 1000

const faq = [
  {
    q: 'Wat kost een ETF-order bij Saxo?',
    a: `0,08% van het orderbedrag met een minimum van €2 (niveau Bronze). Tot ${eur(omslag)} betaal je dus €2; een order van ${eur(GROOT)} kost ${eur(orderGroot)}. Verkopen kost hetzelfde. De beurstaks (0,12% of 1,32% bij ETF's) komt erbovenop en houdt Saxo zelf in.`,
  },
  {
    q: 'Is AutoInvest goedkoper dan zelf een order plaatsen?',
    a: `Voor één ETF per maand niet: AutoInvest kost €${autoinvest} per maand en een losse order van €${MAAND} kost ook ${eur(orderMaand)}. Het verschil komt met meerdere ETF's: AutoInvest koopt tot 10 ETF's voor die ene €${autoinvest}, terwijl je met losse orders €2 per ETF betaalt. AutoInvest koopt enkel hele stuks.`,
  },
  {
    q: 'Houdt Saxo de meerwaardebelasting in?',
    a: 'Ja, standaard houdt Saxo 10% in op elke gerealiseerde meerwaarde, zonder rekening te houden met je jaarlijkse vrijstelling van €10.000. Wat te veel ingehouden is, vraag je terug via je belastingaangifte. Curvo wijst erop dat die terugbetaling tot tweeënhalf jaar kan duren. Je kan de inhouding ook uitzetten (opt-out) en zelf aangeven.',
  },
  {
    q: 'Moet ik mijn Saxo-rekening melden bij de Nationale Bank?',
    a: 'Nee. Je rekening loopt via het Belgische bijkantoor van Saxo Bank. Een melding bij het centraal aanspreekpunt van de NBB is niet nodig.',
  },
  {
    q: 'Wat kost overstappen van Saxo naar een andere broker?',
    a: 'Saxo rekent €75 per lijn (per ETF of aandeel) om je effecten over te zetten. Met vier verschillende ETF\'s betaal je dus €300. Bij Bolero en MeDirect is dat €50 per lijn, bij DEGIRO €20.',
  },
]

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

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: TITLE,
    itemReviewed: { '@type': 'FinancialService', name: 'Saxo Bank', url: 'https://www.home.saxo/be' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5', worstRating: '1' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://www.bestebroker.be/over-mij' },
    publisher: { '@type': 'Organization', name: 'BesteBroker.be', url: 'https://www.bestebroker.be' },
    datePublished: '2026-01-15',
    dateModified: NAGEKEKEN,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  },
  breadcrumbJsonLd([{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Saxo Bank' }]),
]

export default function SaxoReviewPage() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Saxo Bank' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">Saxo Bank België — Review 2026</h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Saxo Bank is een Deense bank met een Belgisch bijkantoor. Saxo houdt alle Belgische beleggingstaksen voor je in,
            ook de meerwaardebelasting. Dat is handig, maar die inhouding kent je vrijstelling niet. Hieronder lees je wat
            Saxo echt kost en waar je op let.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-8 border-l-4 border-l-accent" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>Kosten:</strong> 0,08% per order, minimum €2. Geen bewaarloon. <a href="#kosten" className="text-accent hover:underline">Vanaf welk bedrag je meer betaalt</a>.</li>
            <li><strong>AutoInvest:</strong> €2 per maand voor tot 10 ETF&apos;s. <a href="#autoinvest" className="text-accent hover:underline">Pas voordelig vanaf twee ETF&apos;s</a>.</li>
            <li><strong>Taksen:</strong> alles ingehouden, geen NBB-melding. Maar de meerwaardebelasting wordt ingehouden <a href="#meerwaardebelasting" className="text-accent hover:underline">zonder je vrijstelling</a>.</li>
            <li><strong>Minpunten:</strong> €75 per lijn om over te stappen, 0,25% wisselkoerskost, geen fracties, geen kinderrekening.</li>
          </ul>
          <RekeningOpenen brokers={[broker]} bron="saxo-review-kort" className="mt-5" />
        </section>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="saxo-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2 id="kosten">Wat kost een order bij Saxo?</h2>
          <p>
            Op het standaardniveau (Bronze) betaal je <strong>0,08% per order met een minimum van €2</strong>, voor ETF&apos;s
            en aandelen. Verkopen kost hetzelfde. Tot een order van {eur(omslag)} betaal je dus altijd €2; pas daarboven loopt
            de kost op. Een order van {eur(GROOT)} kost {eur(orderGroot)}; bij Bolero is dat {eur(boleroGroot)}.
          </p>
          <p>
            Aandelen op de Amerikaanse beurs kosten 0,08% met een minimum van $1. Je betaalt dan wel <strong>0,25%
            wisselkoerskost</strong> bij de omzetting van euro naar dollar, en opnieuw als je terug wisselt. Op een aankoop
            van {eur(VS_ORDER)} is dat {eur(VS_ORDER * FX)} bovenop de orderkost.
          </p>
          <p>
            Beleg je meer dan €200.000 (Silver) of €1.000.000 (Gold) bij Saxo, dan krijg je lagere tarieven. Er is{' '}
            <strong>geen bewaarloon</strong> en geen jaarlijkse rekeningkost. Een order die je telefonisch laat plaatsen,
            kost €15.
          </p>

          <h2 id="rekenvoorbeeld">Rekenvoorbeeld: €300 per maand in een ETF</h2>
          <p>
            Koop je elke maand voor €{MAAND} één ETF, dan kost een losse order {eur(orderMaand)} (0,08% van €{MAAND} is maar
            €0,24, dus geldt het minimum). Dat is <strong>{eur(orderMaand * 12)} per jaar</strong>. Met AutoInvest betaal je
            hetzelfde: €{autoinvest} per maand. Daarbovenop komt de beurstaks: {eur(MAAND * 0.0012)} per aankoop bij 0,12%
            (bv. IWDA) of {eur(MAAND * 0.0132)} bij 1,32% (bv. VWCE). Meer uitleg:{' '}
            <Link href="/belgie/tob-uitleg" className="text-accent underline">beurstaks (TOB) uitgelegd</Link>.
          </p>
          <p>Zo verhoudt Saxo zich tot twee andere Belgische banken, berekend met dezelfde tarieven als op de rest van de site:</p>
        </div>

        <div className="card mb-10 max-w-3xl">
          <EtfKostenTabel brokers={vergelijk} maandbedragen={[100, 300]} />
          <p className="text-xs text-gray-500 mt-3">
            Makelaarsloon per jaar voor één ETF, zonder beurstaks. Reken je eigen bedrag door met de{' '}
            <Link href="/beste-etf-broker-belgie#rekenhulp" className="text-accent underline">ETF-rekenhulp met beurstaks</Link>.
          </p>
          <RekeningOpenen brokers={[broker]} bron="saxo-review-tabel" className="mt-5" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2 id="autoinvest">AutoInvest: wanneer loont het?</h2>
          <p>
            Met AutoInvest stel je een vast maandbedrag in. Saxo koopt daarmee automatisch, op de 5de van de maand, één of meer
            ETF&apos;s (tot 10 per plan). Er is geen minimumbedrag. Je betaalt <strong>€{autoinvest} per maand</strong>, ongeacht
            hoeveel ETF&apos;s je koopt.
          </p>
          <ul>
            <li><strong>Eén ETF:</strong> geen besparing. Een losse order kost ook €2, maar met AutoInvest hoef je niets te doen.</li>
            <li><strong>Twee of meer ETF&apos;s:</strong> wel voordelig. Met losse orders betaal je €2 per ETF, dus €4 voor twee en €6 voor drie; met AutoInvest blijft het €2.</li>
          </ul>
          <p>
            AutoInvest koopt <strong>enkel hele stuks</strong>. Volstaat je bedrag niet voor een volledig stuk, dan blijft het
            geld staan tot de volgende maand. Bij een ETF van ±€100 per stuk en €150 per maand koop je dus de ene maand één en
            de andere maand twee stuks.
          </p>

          <h2 id="meerwaardebelasting">De inhouding die je moet kennen: meerwaardebelasting</h2>
          <p>
            Saxo houdt de beurstaks, de roerende voorheffing op dividenden en de Reynderstaks in. Sinds 2026 houdt Saxo ook de
            nieuwe <strong>meerwaardebelasting van 10%</strong> in bij elke verkoop met winst. Dat lijkt handig, maar let op drie dingen:
          </p>
          <ol>
            <li>
              <strong>Saxo kent je vrijstelling niet.</strong> Elke belegger heeft een vrijstelling van €10.000 meerwaarde per jaar
              (enkel het ongebruikte deel van de eerste €1.000 schuift door, tot €15.000). Saxo houdt toch 10% in vanaf de eerste euro winst. Verkoop je met
              €3.000 winst, dan houdt Saxo €300 in, ook al blijf je onder je vrijstelling.
            </li>
            <li>
              <strong>Terugkrijgen duurt lang.</strong> Wat te veel ingehouden is, vraag je terug via je belastingaangifte. Voor
              een verkoop in 2026 is dat de aangifte van 2027. Curvo (24/11/2026) wijst erop dat de terugbetaling tot tweeënhalf
              jaar kan duren.
            </li>
            <li>
              <strong>Eén vrijstelling voor al je rekeningen.</strong> Heb je ook een rekening bij een andere broker, dan geldt de
              €10.000 voor alles samen, niet per broker.
            </li>
          </ol>
          <p>
            Je kan de inhouding ook <strong>uitzetten (opt-out)</strong> en je meerwaarden zelf aangeven. Volgens Saxo geldt
            die keuze in principe voor het hele jaar; de werkwijze meldt Saxo aan zijn klanten. Met opt-out houdt Saxo niets in,
            maar reken je zelf je meerwaarde uit. Op verlies betaal je geen taks. Meer over de regels:{' '}
            <Link href="/belgie/meerwaardebelasting-2026-uitleg" className="text-accent underline">meerwaardebelasting uitgelegd</Link>{' '}
            en <Link href="/broker-meerwaardebelasting-2026" className="text-accent underline">wat elke broker inhoudt</Link>.
          </p>
          <KrososBlok bron="saxo-review" />
          <EindejaarTip />

          <h2>Rekening openen</h2>
          <p>
            Je opent een rekening online, ook met itsme. Naast een rekening op eigen naam zijn er een gezamenlijke rekening en
            een bedrijfsrekening; een kinderrekening biedt Saxo niet aan. Je rekening loopt via het Belgische bijkantoor, dus je
            hoeft ze <strong>niet bij de Nationale Bank te melden</strong>.
          </p>

          <h2>Uitlenen van effecten</h2>
          <p>
            Saxo leent je effecten enkel uit als je dat zelf aanzet (opt-in). Doe je niets, dan worden ze niet uitgeleend. Zet je
            het aan, dan krijg je een vergoeding, maar draag je ook een tegenpartijrisico.
          </p>

          <h2>De minpunten</h2>
          <ul>
            <li><strong>Overstappen is duur:</strong> €75 per lijn (Bolero en MeDirect €50, DEGIRO €20).</li>
            <li><strong>Wisselkoerskost:</strong> 0,25% per omzetting bij aandelen in dollar of een andere munt.</li>
            <li><strong>Minimum €2:</strong> voor kleine orders (€50 of €100) betaal je verhoudingsgewijs veel; MeDirect rekent €0 op ETF&apos;s.</li>
            <li><strong>Geen fracties en geen kinderrekening.</strong></li>
            <li><strong>Uitgebreid platform:</strong> opties, futures en margin maken het overweldigend voor wie enkel ETF&apos;s koopt.</li>
            <li><strong>Sanctie:</strong> in januari 2026 legde de Deense toezichthouder Saxo een boete op van DKK 313 miljoen voor tekortkomingen in de antiwitwascontroles (2021–2023). Saxo aanvaardde de boete.</li>
          </ul>

          <h2>Hoe veilig is je geld?</h2>
          <p>
            Saxo België is het Belgische bijkantoor van Saxo Bank A/S. De Deense toezichthouder houdt toezicht op de bank; de
            FSMA en de NBB op het Belgische bijkantoor. Je effecten worden gescheiden bewaard. Kan de bank ze bij een faillissement
            toch niet teruggeven, dan beschermt het Deense garantiefonds effecten tot €20.000 en cash tot €100.000. Dat dekt geen
            koersverlies. Hoe de boete meetelt in de score, lees je in de{' '}
            <Link href="/methodologie" className="text-accent underline">methodologie</Link>.
          </p>

          <h2>Samengevat</h2>
          <p>
            Saxo past bij wie meerdere ETF&apos;s automatisch wil kopen (AutoInvest) en de Belgische taksen wil laten inhouden.
            Wie maandelijks één ETF koopt, betaalt €2 per order, net als bij AutoInvest. Verkoop je met winst, hou dan rekening
            met de inhouding zonder vrijstelling. Vergelijk met{' '}
            <Link href="/vergelijking/bolero-vs-saxo" className="text-accent underline">Bolero vs Saxo</Link>,{' '}
            <Link href="/vergelijking/saxo-vs-medirect" className="text-accent underline">MeDirect vs Saxo</Link> of{' '}
            <Link href="/vergelijking/saxo-vs-degiro" className="text-accent underline">Saxo vs DEGIRO</Link>.
            Dit is algemene informatie, geen persoonlijk advies.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">Saxo Bank bekijken</p>
              <AffiliateLabel broker={broker} />
              <p className="text-sm text-gray-600">Rekening openen kan online, ook met itsme.</p>
            </div>
            <a
              href={goLink(broker.id, 'saxo-review-cta')}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="btn-primary flex-shrink-0"
            >
              Rekening openen bij Saxo →
            </a>
          </div>
        )}

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen over Saxo</h2>
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

        <section className="mt-8 mb-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Saxo vergelijken?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/vergelijking/bolero-vs-saxo', label: 'Bolero vs Saxo', sub: 'KBC-dochter vs Deense bank' },
              { href: '/vergelijking/saxo-vs-medirect', label: 'Saxo vs MeDirect', sub: 'AutoInvest vs gratis ETF’s' },
              { href: '/vergelijking/saxo-vs-degiro', label: 'Saxo vs DEGIRO', sub: 'Alles ingehouden vs zelf aangeven' },
              { href: '/beste-etf-broker-belgie', label: 'Beste ETF-broker', sub: 'Broker en beurstaks samen' },
            ].map(({ href, label, sub }) => (
              <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
                <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label}</p>
                <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
              </Link>
            ))}
          </div>
        </section>

        <BookRecommendationBlock bookIds={['hangmatbelegger', 'psychologie-geld-nl']} />
      </div>
    </>
  )
}
