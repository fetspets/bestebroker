import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById, transactiekost } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { BookRecommendationBlock } from '@/components/book/BookRecommendationBlock'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'
import { EtfKostenTabel } from '@/components/broker/EtfKostenTabel'

const broker = getBrokerById('degiro')!
const vergelijk = ['degiro', 'bolero', 'saxo', 'trade-republic'].map(id => getBrokerById(id)!)

const NAGEKEKEN = '2026-11-20'
const URL = 'https://www.bestebroker.be/reviews/degiro-belgie'
const TITLE = 'DEGIRO België review: €1 per order, maar wat doe je zelf?'
const DESCRIPTION =
  'DEGIRO nagekeken op 20/11: wanneer je echt €1 per order betaalt, welke taksen je zelf aangeeft en hoeveel dat scheelt met Bolero of Saxo.'

const BRON = {
  review: 'https://curvo.eu/nl/artikel/degiro-review',
  kostenEtf: 'https://curvo.eu/nl/artikel/degiro-kosten-etf',
  vsBolero: 'https://curvo.eu/nl/artikel/degiro-vs-bolero',
  hellosafe: 'https://hellosafe.be/nl/investeren/broker/degiro',
  tob: 'https://www.test-aankoop.be/invest/fiscaliteit-en-wetgeving/belastingheffing/dossiers/taks-op-beursverrichtingen-tob',
}

const bronnen: Bron[] = [
  { staaft: 'Kernselectie enkel via Tradegate sinds oktober 2025, geen fair-use-regel meer, €3 op andere beurzen; enkel Basis-account (geen kinder-, gezamenlijke of bedrijfsrekening); geen spaarplan, fracties of itsme; taksen die je zelf aangeeft; NBB-melding; uitlenen volgens de voorwaarden; bescherming €20.000/€100.000; aandelentarieven rekening via degiro.nl; registratie via degiro.nl of degiro.fr', label: 'Curvo, DEGIRO review (03/11/2026)', href: BRON.review },
  { staaft: '€1 enkel via Tradegate; elders €2 + €1 behandelingskosten; €2,50 aansluitingskosten per beurs per jaar buiten de thuisbeurs; overdracht €20 per lijn', label: 'Curvo, DEGIRO-kosten voor ETF’s (22/10/2026)', href: BRON.kostenEtf },
  { staaft: 'Taksen en NBB-melding DEGIRO naast Bolero; €1.000 IWDA: DEGIRO €1, Bolero €5', label: 'Curvo, DEGIRO vs Bolero (04/11/2026)', href: BRON.vsBolero },
  { staaft: 'Wisselkoerskost 0,25% per conversie (AutoFX)', label: 'HelloSafe, DEGIRO review (update 08/10/2026)', href: BRON.hellosafe },
  { staaft: 'Beurstaks ETF’s: 0,12% (niet in België geregistreerd) en 1,32% (in België geregistreerd, kapitaliserend)', label: 'Curvo, beurstaks ETF (08/10/2026)', href: 'https://curvo.eu/nl/artikel/hoe-je-de-beurstaks-van-een-etf-berekent' },
  { staaft: 'DEGIRO houdt de beurstaks in en stort ze door aan de Belgische fiscus', label: 'Test-Aankoop, taks op beursverrichtingen', href: BRON.tob },
]

const eur = (n: number) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

// Rekenvoorbeeld: één ETF-aankoop van €300 per maand.
const MAAND = 300
const kernOrder = transactiekost(broker.fees, MAAND) // €1: kernselectie via Tradegate
const andereOrder = broker.fees.etfStandard ?? 3 // €3: buiten de kernselectie of op een andere beurs
const boleroOrder = transactiekost(getBrokerById('bolero')!.fees, MAAND)
// Beurstaks ETF's (Curvo, beurstaks ETF, 08/10/2026), zelfde tarieven als op /belgie/tob-uitleg
const tobLaag = MAAND * 0.0012
const tobHoog = MAAND * 0.0132

const faq = [
  {
    q: 'Betaal je bij DEGIRO altijd €1 per order?',
    a: `Nee. €1 geldt enkel voor ETF's uit de kernselectie die je koopt op de beurs Tradegate. Een andere ETF, of dezelfde ETF op Euronext of Xetra, kost €3 per order (€2 + €1 behandelingskosten). Handel je op een beurs buiten je thuisbeurs, dan komt er €2,50 aansluitingskosten per beurs per jaar bij.`,
  },
  {
    q: 'Houdt DEGIRO de meerwaardebelasting in?',
    a: 'Nee. DEGIRO houdt in België enkel de beurstaks in. De meerwaardebelasting (10% boven de jaarlijkse vrijstelling, sinds 2026), de Reynderstaks en de roerende voorheffing op buitenlandse dividenden geef je zelf aan in je belastingaangifte. Een eerste aangifte met meerwaarden over 2026 doe je in 2027.',
  },
  {
    q: 'Moet ik mijn DEGIRO-rekening melden bij de Nationale Bank?',
    a: 'Ja. DEGIRO is een buitenlandse rekening (flatexDEGIRO Bank AG, Duitsland). Je meldt ze eenmalig bij het centraal aanspreekpunt van de NBB en vermeldt ze elk jaar in je belastingaangifte.',
  },
  {
    q: 'Wat kost €300 per maand in een ETF bij DEGIRO?',
    a: `In een ETF uit de kernselectie via Tradegate: ${eur(kernOrder)} per order, of ${eur(kernOrder * 12)} per jaar. Buiten de kernselectie: ${eur(andereOrder)} per order, of ${eur(andereOrder * 12)} per jaar. Daarbovenop betaal je de beurstaks: ${eur(tobLaag)} per aankoop bij 0,12% of ${eur(tobHoog)} bij 1,32%. Bij Bolero kost dezelfde order ${eur(boleroOrder)}.`,
  },
  {
    q: 'Is DEGIRO veilig voor Belgische beleggers?',
    a: 'DEGIRO is een onderdeel van flatexDEGIRO Bank AG, onder toezicht van de Duitse BaFin. Je effecten worden apart bewaard. Bij een faillissement is cash beschermd tot €100.000 en zijn effecten gedekt tot €20.000. Volgens de voorwaarden mag DEGIRO je effecten uitlenen; DEGIRO zegt dat het dat nu niet doet. Bescherming dekt geen koersverlies.',
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
    itemReviewed: { '@type': 'FinancialService', name: 'DEGIRO', url: 'https://www.degiro.nl' },
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
  breadcrumbJsonLd([{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'DEGIRO' }]),
]

export default function DegiroReviewPage() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'DEGIRO' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">DEGIRO België — Review 2026</h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            DEGIRO is een buitenlandse broker (flatexDEGIRO, Duitsland) met lage orderkosten. De beurstaks houdt DEGIRO zelf in.
            De meerwaardebelasting, de Reynderstaks en de roerende voorheffing op buitenlandse dividenden geef je zelf aan, en
            je meldt de rekening bij de Nationale Bank.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-8 border-l-4 border-l-accent" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>Kosten:</strong> €1 per order, maar <a href="#een-euro" className="text-accent hover:underline">enkel onder twee voorwaarden</a>. Anders €3. Geen bewaarloon.</li>
            <li><strong>Taksen:</strong> DEGIRO houdt enkel de beurstaks in. <a href="#zelf-doen" className="text-accent hover:underline">Vier dingen regel je zelf</a>, waaronder de meerwaardebelasting.</li>
            <li><strong>Rekening:</strong> buitenlandse rekening, dus melden bij de NBB. Openen via degiro.nl; geen itsme.</li>
            <li><strong>Minpunten:</strong> geen spaarplan, geen fracties, enkel een rekening op eigen naam, uitlenen van effecten toegelaten volgens de voorwaarden.</li>
          </ul>
        </section>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="degiro-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2 id="een-euro">Wanneer betaal je echt €1 per order?</h2>
          <p>Het tarief van €1 geldt enkel als <strong>beide</strong> voorwaarden kloppen:</p>
          <ol>
            <li>De ETF staat in de <strong>kernselectie</strong> van DEGIRO.</li>
            <li>Je koopt ze op de beurs <strong>Tradegate</strong>. Sinds oktober 2025 geldt de kernselectie enkel daar.</li>
          </ol>
          <p>
            Koop je dezelfde ETF op Euronext Amsterdam of Xetra, of een ETF buiten de kernselectie, dan betaal je €3 per order:
            €2 makelaarsloon plus €1 behandelingskosten. Handel je op een beurs buiten je thuisbeurs, dan rekent DEGIRO
            daarbovenop €2,50 aansluitingskosten per beurs per jaar. Op Tradegate valt die kost weg voor de kernselectie.
            De oude fair-use-regel (één gratis order per ETF per maand) bestaat niet meer.
          </p>
          <p>
            <strong>Losse aandelen:</strong> het tarief hangt af van de beurs en van het land van je rekening. Curvo (3/11/2026)
            noemt voor een rekening via degiro.nl €2 tot €3 per order op Euronext en €2 in de VS. Voor aandelen in dollar komt er
            0,25% wisselkoerskost bij (AutoFX, volgens HelloSafe). Kijk de tarievenlijst in je account na vóór je een order plaatst.
          </p>
          <p>
            Er is geen bewaarloon. Effecten overzetten naar een andere bank kost €20 per lijn, plus eventuele externe kosten.
          </p>

          <h2 id="rekenvoorbeeld">Rekenvoorbeeld: €300 per maand in een ETF</h2>
          <p>
            Koop je elke maand voor €{MAAND} een ETF uit de kernselectie via Tradegate, dan betaal je {eur(kernOrder)} per order,
            of <strong>{eur(kernOrder * 12)} per jaar</strong>. Staat je ETF niet in de kernselectie, dan wordt het {eur(andereOrder)} per
            order, of {eur(andereOrder * 12)} per jaar. Bij Bolero kost dezelfde order {eur(boleroOrder)}.
          </p>
          <p>
            De beurstaks hangt af van de ETF, niet van de broker: {eur(tobLaag)} per aankoop bij 0,12% (bv. IWDA) of {eur(tobHoog)} bij
            1,32% (in België geregistreerde kapitaliserende ETF&apos;s, bv. VWCE). Meer uitleg:{' '}
            <Link href="/belgie/tob-uitleg" className="text-accent underline">beurstaks (TOB) uitgelegd</Link>.
          </p>
          <p>Zo verhoudt DEGIRO zich tot andere brokers, berekend met dezelfde tarieven als op de rest van de site:</p>
        </div>

        <div className="card mb-10 max-w-3xl">
          <EtfKostenTabel brokers={vergelijk} maandbedragen={[100, 300]} />
          <p className="text-xs text-gray-500 mt-3">
            Makelaarsloon per jaar, zonder beurstaks. DEGIRO gerekend aan €1: kernselectie via Tradegate.
            Reken je eigen bedrag door met de{' '}
            <Link href="/beste-etf-broker-belgie#rekenhulp" className="text-accent underline">ETF-rekenhulp met beurstaks</Link>.
          </p>
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2 id="zelf-doen">Wat regel je zelf bij DEGIRO?</h2>
          <p>
            Een lage orderkost is maar de helft van het verhaal. Bij een Belgische broker zoals Bolero gebeurt het volgende
            vanzelf; bij DEGIRO doe je het zelf:
          </p>
          <ol>
            <li>
              <strong>NBB-melding (eenmalig):</strong> je meldt de buitenlandse rekening bij het centraal aanspreekpunt van de
              Nationale Bank. <Link href="/belgie/buitenlandse-broker-nbb-aangifte" className="text-accent underline">Zo doe je dat</Link>.
            </li>
            <li>
              <strong>Belastingaangifte (elk jaar):</strong> je vermeldt de rekening in je aangifte.
            </li>
            <li>
              <strong>Meerwaardebelasting:</strong> 10% op meerwaarden boven de jaarlijkse vrijstelling, sinds 1 januari 2026. Je
              berekent ze zelf en geeft ze aan; de eerste keer in 2027, over 2026.{' '}
              <Link href="/belgie/meerwaardebelasting-2026-uitleg" className="text-accent underline">Meerwaardebelasting uitgelegd</Link>.
            </li>
            <li>
              <strong>Dividenden en Reynderstaks:</strong> de roerende voorheffing van 30% wordt enkel op Belgische aandelen
              ingehouden. Buitenlandse dividenden en de Reynderstaks (bij verkoop van fondsen met minstens 10% obligaties) geef je zelf aan.
            </li>
          </ol>
          <p>
            Wie enkel kapitaliserende ETF&apos;s koopt en weinig verkoopt, heeft het minste werk: geen dividenden, en een
            meerwaarde pas bij verkoop. Wil je dat alles voor je geregeld wordt, lees dan{' '}
            <Link href="/broker-meerwaardebelasting-2026" className="text-accent underline">welke broker de meerwaardebelasting voor je inhoudt</Link>.
          </p>

          <h2>Rekening openen</h2>
          <p>
            Er is geen Belgische website: Belgen openen een rekening via degiro.nl (of degiro.fr). Je hebt een identiteitskaart
            of paspoort, een bankrekening op je naam en een adresbewijs nodig; itsme werkt niet. DEGIRO biedt één rekeningtype aan,
            het Basis-account, op eigen naam: geen kinderrekening, gezamenlijke rekening of bedrijfsrekening.
          </p>

          <h2>Uitlenen van effecten</h2>
          <p>
            De aparte Custody-rekening bestaat sinds 2021 niet meer. Volgens de voorwaarden van het Basis-account mag DEGIRO
            je effecten uitlenen; DEGIRO meldt dat het dat momenteel niet doet.
          </p>

          <h2>De minpunten</h2>
          <ul>
            <li><strong>€1 met voorwaarden:</strong> buiten de kernselectie of buiten Tradegate betaal je €3 per order.</li>
            <li><strong>Taksen zelf aangeven:</strong> meerwaardebelasting, buitenlandse dividenden, Reynderstaks en NBB-melding.</li>
            <li><strong>Geen spaarplan en geen fracties:</strong> elke maand zelf een order plaatsen, enkel hele stukken.</li>
            <li><strong>Geen itsme</strong> en geen kinder- of bedrijfsrekening.</li>
            <li><strong>Sancties:</strong> de Duitse BaFin beboette flatexDEGIRO in 2023 en eind 2025 (zie de score hierboven).</li>
          </ul>

          <h2>Hoe veilig is je geld?</h2>
          <p>
            DEGIRO staat onder toezicht van de Duitse BaFin. Je effecten worden apart van het vermogen van DEGIRO bewaard.
            Gaat DEGIRO failliet, dan is cash beschermd tot €100.000 en zijn effecten gedekt tot €20.000. Dat zijn dezelfde
            bedragen als bij een Belgische bank. Beleggersbescherming dekt geen koersverliezen. Hoe we veiligheid scoren, lees je
            in de <Link href="/methodologie" className="text-accent underline">methodologie</Link>.
          </p>

          <h2>Samengevat</h2>
          <p>
            DEGIRO is goedkoop voor wie ETF&apos;s uit de kernselectie via Tradegate koopt en zijn aangifte zelf in orde brengt.
            Wie de taksen liever laat inhouden, betaalt bij een Belgische broker meer per order maar heeft minder werk.
            Vergelijk zelf met <Link href="/vergelijking/degiro-vs-bolero" className="text-accent underline">DEGIRO vs Bolero</Link>{' '}
            of <Link href="/vergelijking/saxo-vs-degiro" className="text-accent underline">Saxo vs DEGIRO</Link>.
            Dit is algemene informatie, geen persoonlijk advies.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">DEGIRO account openen</p>
              <AffiliateLabel broker={broker} />
              <p className="text-xs text-orange-700 mt-1">
                Meerwaardebelasting, Reynderstaks en NBB-melding regel je zelf.
              </p>
            </div>
            <a href={goLink(broker.id, 'degiro-review-cta')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen over DEGIRO</h2>
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
          <h2 className="font-display text-xl font-bold text-primary mb-4">Gerelateerde pagina&apos;s</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/vergelijking/degiro-vs-bolero', label: 'DEGIRO vs Bolero: kosten en taksen' },
              { href: '/vergelijking/saxo-vs-degiro', label: 'Saxo vs DEGIRO' },
              { href: '/belgie/buitenlandse-broker-nbb-aangifte', label: 'NBB-aangifte uitgelegd' },
              { href: '/beste-etf-broker-belgie', label: 'Beste ETF-broker: broker en beurstaks samen' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
                <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label} →</p>
              </Link>
            ))}
          </div>
        </section>

        <BookRecommendationBlock bookIds={['hangmatbelegger']} />
      </div>
    </>
  )
}
