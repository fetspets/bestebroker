import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById, transactiekost } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'
import { EtfKostenTabel } from '@/components/broker/EtfKostenTabel'

const broker = getBrokerById('bolero')!
const vergelijk = ['bolero', 'saxo', 'medirect', 'trade-republic'].map(id => getBrokerById(id)!)

const NAGEKEKEN = '2026-11-19'
const URL = 'https://www.bestebroker.be/reviews/bolero'
const TITLE = 'Bolero review 2026: wat een order echt kost (en 1 deadline)'
const DESCRIPTION =
  'Bolero (KBC) nagekeken op 19/11: wat je maandelijkse ETF-aankoop echt kost, welke taksen Bolero inhoudt en welke belastingkeuze voor 2027 nu openstaat.'

const BRON = {
  tarieven: 'https://www.bolero.be/uploads/media/667ecf0aabd9a/101-tarieven-nl.pdf',
  review: 'https://curvo.eu/nl/artikel/bolero-review',
  tob: 'https://curvo.eu/nl/artikel/hoe-je-de-beurstaks-van-een-etf-berekent',
  optOut: 'https://www.bolero.be/nl/support/veelgestelde-vragen/kan-ik-nog-een-opt-out-aanvragen-na-1-juni',
  bronheffing: 'https://www.bolero.be/nl/lp/meerwaardebelasting/bronheffing-en-opt-out',
  crypto: 'https://www.bolero.be/nl/markten-en-producten/producten/crypto',
  cryptoFaq: 'https://www.bolero.be/nl/lp/crypto/crypto-veelgestelde-vragen',
  testAankoopCrypto: 'https://www.test-aankoop.be/invest/beleggen/crypto/artikels/2026/01/bolero-bitcoin-ether-rechtstreeks-beleggen',
}

const bronnen: Bron[] = [
  { staaft: 'Transactiekosten (staffel), geen bewaarloon, overdracht €50 per lijn (gratis naar KBC/CBC)', label: 'Bolero, tarieflijst S101 (geldig vanaf 11/06/2025)', href: BRON.tarieven },
  { staaft: 'Inhouding TOB, roerende voorheffing en Reynderstaks, itsme, geen uitlenen van effecten, Invest & Repeat zonder automatische afschrijving', label: 'Curvo, Bolero review (08/10/2026)', href: BRON.review },
  { staaft: 'Beurstaks ETF’s: 0,12% (niet in België geregistreerd, EER) en 1,32% (in België geregistreerd, kapitaliserend)', label: 'Curvo, beurstaks ETF (08/10/2026)', href: BRON.tob },
  { staaft: 'Inhouding 10% meerwaardebelasting, vrijstelling, opt-out, aangifte midden 2027', label: 'Bolero, bronheffing en opt-out (gelezen 19/11/2026)', href: BRON.bronheffing },
  { staaft: 'Opt-out online niet meer sinds 29 mei; nieuwe aanvraag vanaf november 2026, ingang 1 januari 2027', label: 'Bolero, FAQ "Ik kan online geen opt-out meer aanvragen" (gelezen 19/11/2026)', href: BRON.optOut },
  { staaft: 'Crypto: enkel bitcoin en ether, €5 tot €1.000, 0,50% erboven, geen beurstaks, bewaring door KBC, geen depositogarantie, geen inhouding meerwaardebelasting', label: 'Bolero, crypto en crypto-FAQ (gelezen 19/11/2026)', href: BRON.cryptoFaq },
  { staaft: 'Bitcoin en ether bij Bolero sinds midden februari 2026', label: 'Test-Aankoop Invest, Bolero: bitcoin en ether (17/02/2026)', href: BRON.testAankoopCrypto },
]

const staffel = [
  { bedrag: 'tot €250', kost: '€2,50' },
  { bedrag: '€250,01 tot €1.000', kost: '€5' },
  { bedrag: '€1.000,01 tot €2.500', kost: '€7,50' },
  { bedrag: '€2.500,01 tot €70.000', kost: '€15 per begonnen €10.000, maximum €50' },
  { bedrag: 'boven €70.000', kost: '€50 + €15 per extra €10.000' },
]

const eur = (n: number) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

// Rekenvoorbeeld: één ETF-aankoop van €300 per maand, berekend uit brokers.ts en de TOB-tarieven.
const MAAND = 300
const kostPerOrder = transactiekost(broker.fees, MAAND)
// Beurstaks ETF's (Curvo, beurstaks ETF, 08/10/2026), zelfde tarieven als TOB_ETF in EtfJaarkostRekenhulp
const tobIwda = Math.min(MAAND * 0.0012, 1300)
const tobVwce = Math.min(MAAND * 0.0132, 4000)
const pctOrder = ((kostPerOrder / MAAND) * 100).toFixed(2).replace('.', ',')
const kost1000 = transactiekost(broker.fees, 1000)
const kost1001 = transactiekost(broker.fees, 1001)

const faq = [
  {
    q: 'Wat kost een maandelijkse ETF-aankoop van €300 bij Bolero?',
    a: `€5 makelaarsloon per order, of ${eur(kostPerOrder * 12)} per jaar. Daarbovenop komt de beurstaks: €0,36 per aankoop voor een ETF die niet in België geregistreerd is (0,12%), maar €3,96 voor een in België geregistreerde kapitaliserende ETF zoals VWCE (1,32%). Bolero rekent geen bewaarloon.`,
  },
  {
    q: 'Kan ik de inhouding van de meerwaardebelasting bij Bolero nog uitzetten?',
    a: 'Online kan dat sinds 29 mei 2026 niet meer. Deed je sinds 1 juni een verkoop waarop meerwaardebelasting van toepassing is, dan kun je volgens Bolero vanaf november 2026 een nieuwe opt-out aanvragen die ingaat op 1 januari 2027. Zonder opt-out houdt Bolero 10% in op elke meerwaarde; wat je te veel betaalde, krijg je via je aangifte terug.',
  },
  {
    q: 'Kan ik bij Bolero bitcoin kopen?',
    a: 'Ja, enkel bitcoin en ether. Een order tot €1.000 kost €5, daarboven 0,50% van het bedrag. Er is geen beurstaks en geen depositogarantie; KBC bewaart de munten. Bolero houdt op crypto geen meerwaardebelasting in: je geeft ze zelf aan. Crypto is zeer volatiel; dit is geen aanbeveling.',
  },
  {
    q: 'Moet ik mijn Bolero-rekening melden bij de Nationale Bank?',
    a: 'Nee. Bolero is een Belgische rekening van KBC Bank. Enkel rekeningen bij een buitenlandse broker meld je bij het centraal aanspreekpunt van de NBB.',
  },
  {
    q: 'Is mijn geld veilig bij Bolero?',
    a: 'Bolero is een merk van KBC Bank NV, een Belgische bank. Je effecten blijven je eigendom en worden apart bewaard. Kan de bank ze bij een faillissement niet teruggeven, dan beschermt het Belgische stelsel effecten tot €20.000 en cash tot €100.000. Dat dekt geen koersverlies.',
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
    itemReviewed: { '@type': 'FinancialService', name: 'Bolero', url: 'https://bolero.be' },
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
  breadcrumbJsonLd([{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Bolero' }]),
]

export default function BoleroReviewPage() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Bolero' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">Bolero — Review 2026</h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Bolero is de online broker van KBC Bank. Bolero houdt de Belgische taksen in, ook de
            meerwaardebelasting, en leent je effecten niet uit. De orderkost hangt af van het bedrag:
            van €2,50 tot €250 tot €7,50 tot €2.500.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-8 border-l-4 border-l-accent" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>Kosten:</strong> €2,50 tot €250, €5 tot €1.000, €7,50 tot €2.500. Geen bewaarloon. <a href="#rekenvoorbeeld" className="text-accent hover:underline">Wat dat per jaar kost</a>.</li>
            <li><strong>Taksen:</strong> Bolero houdt beurstaks, roerende voorheffing, Reynderstaks en 10% meerwaardebelasting in. Geen NBB-melding.</li>
            <li><strong>Deadline:</strong> wil je de inhouding van de meerwaardebelasting uitzetten voor 2027? <a href="#opt-out" className="text-accent hover:underline">Dat vraag je nu aan</a>.</li>
            <li><strong>Minpunt:</strong> orders tussen €1.000 en €2.500 zijn duurder dan bij Saxo of Trade Republic; geen fracties, geen automatische afschrijving.</li>
          </ul>
        </section>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="bolero-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat kost een order bij Bolero?</h2>
          <p>
            Voor aandelen en ETF&apos;s op Euronext (Brussel, Amsterdam, Parijs) geldt één staffel.
            Een aparte, goedkopere Playlist-prijs bestaat niet meer: de tarieflijst van 11 juni 2025
            rekent voor alle genoteerde effecten hetzelfde.
          </p>
          <div className="not-prose overflow-x-auto my-4">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr><th scope="col" className="text-left p-2">Orderbedrag</th><th scope="col" className="text-left p-2">Makelaarsloon</th></tr>
              </thead>
              <tbody>
                {staffel.map(r => (
                  <tr key={r.bedrag} className="border-t border-gray-100"><td className="p-2">{r.bedrag}</td><td className="p-2 font-medium">{r.kost}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Daarbovenop betaal je de beurstaks (TOB), die Bolero inhoudt. Er is geen bewaarloon.
            Effecten overzetten naar een andere bank kost €50 per lijn; naar KBC, KBC Brussels of CBC is het gratis.
          </p>
          <p>
            Let op de grens van €1.000: een order van {eur(1000)} kost {eur(kost1000)}, een order van {eur(1001)} al {eur(kost1001)}.
            Wie maandelijks belegt, blijft dus best net onder zo&apos;n grens.
          </p>

          <h2 id="rekenvoorbeeld">Rekenvoorbeeld: €300 per maand in een ETF</h2>
          <p>
            Je koopt elke maand voor €{MAAND} een wereldwijde ETF. Bij Bolero kost elke order {eur(kostPerOrder)}, of {pctOrder}% van
            je inleg. Over een jaar is dat {eur(kostPerOrder * 12)} makelaarsloon.
          </p>
          <p>
            De beurstaks hangt af van de ETF, niet van de broker. Voor een ETF die niet in België geregistreerd is
            (bv. IWDA) betaal je 0,12%: {eur(tobIwda)} per aankoop. Voor een in België geregistreerde kapitaliserende
            ETF (bv. VWCE) is het 1,32%: {eur(tobVwce)} per aankoop, of {eur(tobVwce * 12)} per jaar. Bij die ETF
            kost de taks dus bijna evenveel als het makelaarsloon. Meer uitleg: <Link href="/belgie/tob-uitleg" className="text-accent underline">beurstaks (TOB) uitgelegd</Link>.
          </p>
          <p>Zo verhoudt het makelaarsloon van Bolero zich tot andere brokers, berekend met dezelfde tarieven als op de rest van de site:</p>
        </div>

        <div className="card mb-10 max-w-3xl">
          <EtfKostenTabel brokers={vergelijk} maandbedragen={[100, 300]} eenmalig={2000} />
          <p className="text-xs text-gray-500 mt-3">
            Makelaarsloon per jaar (eenmalig: per order), zonder beurstaks. Goedkoopste manier per broker: losse order, spaarplan
            of AutoInvest. Reken je eigen bedrag door met de <Link href="/beste-etf-broker-belgie#rekenhulp" className="text-accent underline">ETF-rekenhulp met beurstaks</Link>.
          </p>
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Welke taksen houdt Bolero in?</h2>
          <ul>
            <li><strong>Beurstaks (TOB):</strong> ingehouden bij elke transactie.</li>
            <li><strong>Roerende voorheffing</strong> op dividenden: ingehouden.</li>
            <li><strong>Reynderstaks</strong> op fondsen met obligaties: ingehouden bij verkoop.</li>
            <li>
              <strong>Meerwaardebelasting:</strong> Bolero houdt standaard 10% in op de meerwaarde bij elke verkoop.
              De bank weet niet of je over het hele jaar onder de vrijstelling blijft. Wat je te veel betaalde,
              vraag je terug via je belastingaangifte (volgens Bolero midden 2027, terugbetaling eind 2027 of begin 2028).
              Winst door wisselkoersen houdt Bolero niet in: die geef je altijd zelf aan.
              Meer uitleg: <Link href="/belgie/meerwaardebelasting-2026-uitleg" className="text-accent underline">meerwaardebelasting 2026</Link>.
            </li>
          </ul>
          <p>Omdat Bolero een Belgische rekening is, hoef je ze niet te melden bij de Nationale Bank.</p>

          <h2 id="opt-out">Inhouding uitzetten voor 2027: dit is het moment</h2>
          <p>
            Met een <strong>opt-out</strong> vraag je Bolero om de 10% niet meer in te houden. Bolero meldt die keuze aan de fiscus
            en geeft je een overzicht van je meer- en minderwaarden; jij neemt ze zelf op in je aangifte. Zo betaal je niet eerst
            te veel om het pas een jaar later terug te krijgen, maar je moet de aangifte wel zelf correct invullen.
          </p>
          <p>
            Online kan een opt-out sinds 29 mei 2026 niet meer. Deed je sinds 1 juni een verkoop waarop meerwaardebelasting
            van toepassing is, dan kun je volgens Bolero <strong>vanaf november 2026</strong> een nieuwe opt-out aanvragen,
            die ingaat op <strong>1 januari 2027</strong>. Een opt-out geldt per rekening; heb je meerdere rekeningen, dan
            vraag je ze voor elke rekening apart aan. Bolero noemt (nagekeken op 19/11/2026) geen einddatum voor die aanvraag.
          </p>
          <p>
            Opt-out of niet hangt af van je situatie, niet van de broker. Blijf je jaarlijks ruim onder de vrijstelling, dan
            kost de inhouding je vooral wachttijd. Twijfel je, lees dan eerst{' '}
            <Link href="/broker-meerwaardebelasting-2026" className="text-accent underline">welke broker de meerwaardebelasting voor je regelt</Link>.
          </p>

          <h2>Invest & Repeat</h2>
          <p>
            Met <strong>Invest & Repeat</strong> kun je een herhalende aankooporder instellen.
            Let op de beperkingen: Invest & Repeat debiteert <em>niet</em> automatisch van je bankrekening.
            Je moet zelf voldoende geld op je Bolero-rekening zetten. En enkel gehele stuks worden aangekocht —
            fractionele stuks zijn niet mogelijk.
          </p>

          <h2>Crypto bij Bolero</h2>
          <p>
            Sinds februari 2026 kun je bij Bolero <strong>bitcoin en ether</strong> kopen, en geen andere munten. Een order tot
            €1.000 kost €5, daarboven 0,50% van het bedrag. Er is geen beurstaks. KBC bewaart de munten zelf; er geldt geen
            depositogarantie en je kunt geen crypto van een andere wallet of beurs naar Bolero overzetten. Op crypto houdt Bolero
            <strong> geen meerwaardebelasting</strong> in: die geef je altijd zelf aan in je aangifte.
          </p>
          <p>
            Crypto kan in korte tijd sterk in waarde dalen. BesteBroker.be vergelijkt brokers voor beleggen in aandelen en
            ETF&apos;s; dit is enkel informatie over wat Bolero aanbiedt, geen aanbeveling.
          </p>

          <h2>Geen securities lending</h2>
          <p>
            Bolero leent je effecten niet uit aan derden. Bij brokers die dat wel doen, loop je een
            klein bijkomend risico als de lener in gebreke blijft.
          </p>

          <h2>De minpunten</h2>
          <ul>
            <li><strong>Duur tussen €1.000 en €2.500:</strong> €7,50 per order, waar Saxo (0,08%, min. €2) of Trade Republic (€1) veel minder vragen.</li>
            <li><strong>Geen fractionele stuks:</strong> met €300 koop je enkel hele aandelen of ETF-stukken; de rest blijft als cash staan.</li>
            <li><strong>Geen automatische afschrijving:</strong> voor Invest & Repeat zet je zelf geld op je rekening.</li>
            <li><strong>Overstappen kost geld:</strong> €50 per lijn naar een andere bank dan KBC of CBC.</li>
          </ul>

          <h2>Bescherming en veiligheid</h2>
          <p>
            Bolero is een merk van KBC Bank, een bank met Belgische vergunning. Je effecten blijven je eigendom en
            worden gescheiden bewaard. Kan de bank ze bij een faillissement toch niet teruggeven, dan beschermt het
            Belgische stelsel effecten tot €20.000 en cash tot €100.000. Hoe we veiligheid scoren, lees je in de{' '}
            <Link href="/methodologie" className="text-accent underline">methodologie</Link>.
          </p>

          <h2>Samengevat</h2>
          <p>
            Bolero past bij wie de Belgische taksen wil laten inhouden, een Belgische bank wil en geen effecten wil laten
            uitlenen. Voor kleine orders tot €250 is de kost €2,50; vanaf €1.000 tot €2.500 betaal je €7,50 per order.
            Wie maandelijks automatisch wil beleggen, vindt bij Bolero geen automatische afschrijving.
            Vergelijk zelf met <Link href="/vergelijking/bolero-vs-saxo" className="text-accent underline">Bolero vs Saxo</Link>{' '}
            of <Link href="/vergelijking/degiro-vs-bolero" className="text-accent underline">DEGIRO vs Bolero</Link>.
            Dit is algemene informatie, geen persoonlijk advies.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">Bolero account openen</p>
              <AffiliateLabel broker={broker} />
              <p className="text-sm text-gray-600">Onboarding mogelijk via itsme — in enkele minuten klaar.</p>
            </div>
            <a href={goLink(broker.id, 'bolero-review-cta')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen over Bolero</h2>
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
              { href: '/vergelijking/bolero-vs-saxo', label: 'Bolero vs Saxo — welke is goedkoper?' },
              { href: '/vergelijking/degiro-vs-bolero', label: 'DEGIRO vs Bolero: kosten en taksen' },
              { href: '/beste-etf-broker-belgie', label: 'Beste ETF-broker: broker en beurstaks samen' },
              { href: '/broker-meerwaardebelasting-2026', label: 'Meerwaardebelasting 2026 — wie regelt het?' },
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
