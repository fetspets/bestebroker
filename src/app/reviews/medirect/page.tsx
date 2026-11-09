import type { Metadata } from 'next'
import Link from 'next/link'
import { brokers, getBrokerById, aandelenKost } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'
import { maandelijkseEtfKost } from '@/components/broker/EtfKostenTabel'

const broker = getBrokerById('medirect')!
const URL = 'https://www.bestebroker.be/reviews/medirect'
const TITLE = 'MeDirect review 2026: echt gratis? Dit betaal je wél'
const DESCRIPTION =
  'ETF’s zonder makelaarsloon, maar wat kosten aandelen, taksen en maandelijks beleggen? Rekenvoorbeelden per bedrag en wat er bij MeDirect ontbreekt.'

const eur = (n: number) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 }).format(n)

// Rekenvoorbeelden: berekend uit src/data/brokers.ts, nooit met de hand ingevuld.
const orderBedragen = [250, 500, 1000, 2500, 5000]
const MAAND = 200
const jaarKost = brokers
  .map(b => {
    const k = maandelijkseEtfKost(b, MAAND)
    return { b, perJaar: k.perMaand * 12, hoe: k.hoe, perMaand: k.perMaand }
  })
  .sort((x, y) => x.perJaar - y.perJaar || x.b.name.localeCompare(y.b.name))

// MeManaged (Curvo, 03/11/2026): 0,90% MeDirect + 0,40% fondskosten = 1,3% per jaar
const MEMANAGED_PCT = 0.013
const MEMANAGED_VOORBEELD = 10000

const bronnen: Bron[] = [
  { staaft: 'ETF-transacties €0 sinds augustus 2025 (blijvend)', label: 'Test Aankoop Invest (26/08/2025)', href: 'https://www.test-aankoop.be/invest/beleggen/etf/artikels/2025/08/medirect-etf-0-commissie' },
  { staaft: 'Minimum €2,50 per aandelenorder op de meeste Europese beurzen sinds 1 juli 2026 (voordien €7), ook in de VS, het VK en Zwitserland in hun eigen munt', label: 'Test Aankoop Invest (29/06/2026)', href: 'https://www.test-aankoop.be/invest/beleggen/aandelen/artikels/2026/06/medirect-verlaagt-transactiekosten-aandelen' },
  { staaft: 'Aandelen 0,15%, obligaties minstens €15, fondsen zonder instapkost maar met retrocessie, geen spaarplan op het brokerplatform, geen fracties, overdracht €50 per lijn, ingehouden taksen en opt-out meerwaardebelasting, itsme, gezamenlijke rekening wel, kinder- en bedrijfsrekening niet', label: 'Curvo, MeDirect review (03/11/2026)', href: 'https://curvo.eu/nl/artikel/medirect-review' },
  { staaft: 'MeManaged: 0,90% + 0,40% fondskosten, minimum €5.000, maandplan vanaf €100 boven €5.000, enkel BlackRock-fondsen', label: 'Curvo, MeManaged review (03/11/2026)', href: 'https://curvo.eu/nl/artikel/medirect-memanaged-review' },
  { staaft: 'Spaarplan enkel via MeManaged, geen fracties, app', label: 'Curvo, Bolero vs MeDirect (04/11/2026)', href: 'https://curvo.eu/nl/artikel/bolero-vs-medirect' },
  { staaft: 'TOB-tarieven (0,12% voor de meeste ETF’s, 1,32% voor een in België geregistreerde kapitaliserende ETF, 0,35% voor aandelen)', label: 'Curvo, beurstaks ETF (08/10/2026)', href: 'https://curvo.eu/nl/artikel/hoe-je-de-beurstaks-van-een-etf-berekent' },
]

const faq = [
  {
    q: 'Is MeDirect echt gratis?',
    a: 'Voor ETF’s betaal je bij MeDirect geen makelaarsloon, sinds augustus 2025. De beurstaks (TOB) betaal je wel, zoals bij elke broker. Aandelen kosten 0,15% van het orderbedrag, met een minimum van €2,50 per order. Er is geen bewaarloon.',
  },
  {
    q: 'Kan je bij MeDirect maandelijks automatisch beleggen?',
    a: 'Niet op het brokerplatform: daar plaats je elke aankoop zelf. Een maandplan kan enkel via MeManaged, het beheerde portefeuilleaanbod van MeDirect. Dat kost samen 1,3% per jaar, vraagt minstens €5.000 en een maandplan kan vanaf €100 zodra er meer dan €5.000 belegd is.',
  },
  {
    q: 'Houdt MeDirect de Belgische taksen in?',
    a: 'Ja. MeDirect houdt de beurstaks, de roerende voorheffing op dividenden, de Reynderstaks en de meerwaardebelasting in. Voor de meerwaardebelasting kan je de inhouding uitzetten en zelf aangeven. Een melding bij de Nationale Bank is niet nodig.',
  },
  {
    q: 'Is MeDirect veilig?',
    a: 'MeDirect Bank SA is een bank naar Belgisch recht. Effecten worden gescheiden bewaard en MeDirect leent ze niet uit. Bij een faillissement beschermt het Belgische stelsel effecten tot €20.000 en cash tot €100.000. Koersverliezen zijn nooit beschermd.',
  },
  {
    q: 'Wat kost het om je effecten bij MeDirect weg te halen?',
    a: 'Effecten overzetten naar een andere bank kost €50 per lijn, plus eventuele externe kosten.',
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
    itemReviewed: { '@type': 'FinancialService', name: 'MeDirect', url: 'https://www.medirect.be' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5', worstRating: '1' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://www.bestebroker.be/over-mij' },
    publisher: { '@type': 'Organization', name: 'BesteBroker.be' },
    datePublished: '2026-01-15',
    dateModified: broker.lastVerified,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  },
  breadcrumbJsonLd([{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'MeDirect' }]),
]

export default function MeDirectReviewPage() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'MeDirect' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">MeDirect review 2026: wat kost het echt?</h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            MeDirect is een bank naar Belgisch recht. Voor ETF&apos;s betaal je geen makelaarsloon en alle Belgische taksen
            worden ingehouden. Maar aandelen zijn betalend, en maandelijks automatisch beleggen kan alleen tegen een
            jaarlijkse beheerkost. Hieronder reken je per bedrag na wat je betaalt.
          </p>
          <LastUpdated date={broker.lastVerified} label="Laatst nagekeken" />
          {broker.affiliateUrl && (
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <a
                href={goLink(broker.id, 'medirect-review-top')}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="btn-primary w-full sm:w-auto justify-center text-center py-3"
              >
                Naar de website van MeDirect →
              </a>
              <AffiliateLabel broker={broker} />
            </div>
          )}
        </header>

        <section className="card mb-10 border-l-4 border-l-accent max-w-3xl" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-primary mb-1">Sterk</p>
              <ul className="space-y-1.5 list-disc pl-5">
                <li>ETF&apos;s: €0 makelaarsloon per order, ook voor kleine bedragen</li>
                <li>Alle Belgische taksen ingehouden, geen NBB-melding</li>
                <li>Geen bewaarloon, effecten worden niet uitgeleend</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">Minder sterk</p>
              <ul className="space-y-1.5 list-disc pl-5">
                <li>Geen spaarplan op het brokerplatform</li>
                <li>Aandelen: 0,15%, minimum €2,50 per order</li>
                <li>Geen fracties, geen kinder- of bedrijfsrekening</li>
              </ul>
            </div>
          </div>
        </section>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="medirect-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat kost beleggen bij MeDirect?</h2>
          <ul>
            <li><strong>ETF&apos;s:</strong> geen makelaarsloon, sinds augustus 2025. Dat geldt voor alle ETF&apos;s, niet voor een selectie.</li>
            <li>
              <strong>Aandelen:</strong> 0,15% van het orderbedrag. Sinds 1 juli 2026 is het minimum €2,50 per order op de
              meeste Europese beurzen (voordien €7). In de VS, het VK en Zwitserland geldt hetzelfde minimum in de lokale munt.
            </li>
            <li><strong>Obligaties:</strong> minstens €15 per order voor obligaties in euro.</li>
            <li>
              <strong>Fondsen:</strong> geen instapkost, maar MeDirect ontvangt een vergoeding van de fondsbeheerder. Die zit in
              de jaarlijkse kosten van het fonds.
            </li>
            <li><strong>Bewaarloon:</strong> geen.</li>
            <li><strong>Effecten overzetten</strong> naar een andere bank: €50 per lijn, plus eventuele externe kosten.</li>
          </ul>
          <p>
            Bovenop elke aan- en verkoop betaal je de beurstaks. Voor de meeste ETF&apos;s is dat 0,12%, voor een in België
            geregistreerde kapitaliserende ETF 1,32% en voor aandelen 0,35%. Die taks hangt niet af van je broker. Meer uitleg:{' '}
            <Link href="/belgie/tob-uitleg" className="text-accent underline">de beurstaks uitgelegd</Link>.
          </p>
        </div>

        <section className="max-w-3xl mb-10" aria-labelledby="per-order">
          <h2 id="per-order" className="font-display text-2xl font-bold text-primary mb-2">Rekenvoorbeeld: makelaarsloon per order</h2>
          <p className="text-sm text-gray-600 mb-4">Zonder beurstaks. Berekend uit de tarieven hierboven.</p>
          <table className="w-full text-sm">
            <caption className="sr-only">Makelaarsloon bij MeDirect per orderbedrag, voor een ETF en voor een aandeel</caption>
            <thead className="text-left border-b border-gray-200">
              <tr>
                <th scope="col" className="py-2 pr-2 font-semibold text-gray-700">Order</th>
                <th scope="col" className="py-2 px-2 font-semibold text-gray-700 text-right">ETF</th>
                <th scope="col" className="py-2 pl-2 font-semibold text-gray-700 text-right">Aandeel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orderBedragen.map(bedrag => {
                const k = aandelenKost(broker.fees, bedrag)
                return (
                  <tr key={bedrag}>
                    <th scope="row" className="py-2 pr-2 text-left font-medium text-primary tabular-nums">{eur(bedrag)}</th>
                    <td className="py-2 px-2 text-right tabular-nums">{eur(broker.fees.etfStandard ?? 0)}</td>
                    <td className="py-2 pl-2 text-right tabular-nums">
                      {eur(k)} <span className="text-xs text-gray-500">({((k / bedrag) * 100).toLocaleString('nl-BE', { maximumFractionDigits: 2 })}%)</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="text-sm text-gray-600 mt-3">
            Tot {eur(broker.fees.aandelenTarief!.min / broker.fees.aandelenTarief!.percent)} per aandelenorder betaal je het
            minimum van {eur(broker.fees.aandelenTarief!.min)}. Daarboven telt 0,15%.
          </p>
        </section>

        <section className="max-w-3xl mb-10" aria-labelledby="per-maand">
          <h2 id="per-maand" className="font-display text-2xl font-bold text-primary mb-2">
            {eur(MAAND)} per maand in een ETF: MeDirect tegenover de andere brokers
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Makelaarsloon per jaar bij één aankoop per maand, op de goedkoopste manier die elke broker aanbiedt. Zonder beurstaks
            (die is overal gelijk).
          </p>
          <table className="w-full text-sm">
            <caption className="sr-only">Makelaarsloon per jaar voor {eur(MAAND)} per maand in een ETF, per broker</caption>
            <thead className="text-left border-b border-gray-200">
              <tr>
                <th scope="col" className="py-2 pr-2 font-semibold text-gray-700">Broker</th>
                <th scope="col" className="py-2 pl-2 font-semibold text-gray-700 text-right">Per jaar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jaarKost.map(({ b, perJaar, hoe, perMaand }) => (
                <tr key={b.id} className={b.id === 'medirect' ? 'bg-green-50' : undefined}>
                  <th scope="row" className="py-2 pr-2 text-left font-medium text-primary">
                    <Link href={`/reviews/${b.slug}`} className="hover:text-accent hover:underline">{b.name}</Link>
                    <span className="block text-xs font-normal text-gray-500">
                      {hoe}: {eur(perMaand)}
                      {b.id === 'degiro' && ' (ETF uit de kernselectie; andere ETF €3)'}
                    </span>
                  </th>
                  <td className="py-2 pl-2 text-right tabular-nums font-semibold text-primary">{eur(perJaar)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-600 mt-3">
            Het verschil: bij MeDirect plaats je die aankoop elke maand zelf. Wie het automatisch wil, betaalt elders een
            kleine kost per maand. Zie{' '}
            <Link href="/vergelijking/saxo-vs-medirect" className="text-accent underline">Saxo vs MeDirect met rekenhulp</Link>.
          </p>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Maandelijks beleggen: enkel via MeManaged</h2>
          <p>
            Op het brokerplatform van MeDirect bestaat geen automatisch spaarplan. Een maandplan kan wel via{' '}
            <strong>MeManaged</strong>, het beheerde aanbod van MeDirect. Daar kies je een profiel en belegt MeDirect voor jou
            in fondsen van BlackRock.
          </p>
          <ul>
            <li><strong>Kosten:</strong> 0,90% per jaar voor MeDirect plus ongeveer 0,40% fondskosten, samen 1,3% per jaar.</li>
            <li><strong>Instap:</strong> minstens €5.000. Een maandplan kan vanaf €100 per maand, zodra er meer dan €5.000 belegd is.</li>
            <li>
              <strong>Voorbeeld:</strong> op {eur(MEMANAGED_VOORBEELD)} belegd is 1,3% per jaar{' '}
              {eur(MEMANAGED_VOORBEELD * MEMANAGED_PCT)}. Die kost groeit mee met je vermogen.
            </li>
          </ul>
          <p>
            Wie zelf maandelijks een ETF koopt op het brokerplatform, betaalt die jaarlijkse beheerkost niet. Het verschil is dat
            je de aankoop zelf moet doen. Hoe je een ETF kiest en koopt, lees je in{' '}
            <Link href="/belgie/etf-kopen-beginners" className="text-accent underline">een ETF kopen in België</Link>.
          </p>

          <h2>Wat ontbreekt bij MeDirect?</h2>
          <ul>
            <li><strong>Geen fracties:</strong> je koopt hele aandelen of ETF-deelbewijzen. Met €100 koop je dus geen ETF van €110.</li>
            <li><strong>Geen kinderrekening en geen bedrijfsrekening.</strong> Een gezamenlijke rekening kan wel.</li>
            <li><strong>Geen automatisch spaarplan</strong> op het brokerplatform (zie hierboven).</li>
          </ul>

          <h2>Taksen: wat houdt MeDirect in?</h2>
          <ul>
            <li><strong>Beurstaks (TOB):</strong> ingehouden en aangegeven.</li>
            <li><strong>Roerende voorheffing</strong> op dividenden (30%): ingehouden.</li>
            <li><strong>Reynderstaks:</strong> ingehouden bij verkoop.</li>
            <li>
              <strong>Meerwaardebelasting:</strong> 10% sinds januari 2026, met een vrijstelling op de eerste €10.000 meerwaarde
              per jaar. MeDirect houdt ze in bij elke verkoop, want de bank weet niet of je over het hele jaar onder de vrijstelling
              blijft. Teveel betaald krijg je terug via je aangifte, wat tot tweeënhalf jaar kan duren. Je kan de inhouding ook
              uitzetten en zelf aangeven. Meer uitleg:{' '}
              <Link href="/belgie/meerwaardebelasting-2026-uitleg" className="text-accent underline">meerwaardebelasting 2026</Link>.
            </li>
          </ul>
          <p>Een melding bij de Nationale Bank is niet nodig: het is een Belgische rekening.</p>

          <h2>Rekening openen</h2>
          <p>
            Je opent de rekening online en bevestigt je identiteit met itsme. Bij de installatie heb je je gsm nodig.
          </p>

          <h2>Bescherming en veiligheid</h2>
          <p>
            MeDirect leent je effecten niet uit. Je effecten worden gescheiden bewaard. Kan de bank ze bij een faillissement
            toch niet teruggeven, dan beschermt het Belgische stelsel effecten tot €20.000 en cash tot €100.000.
            Hoe we veiligheid scoren, lees je in de <Link href="/methodologie" className="text-accent underline">methodologie</Link>.
          </p>

          <h2>Voor wie past MeDirect?</h2>
          <ul>
            <li><strong>Past:</strong> wie vooral ETF&apos;s koopt, zelf de orders plaatst en de Belgische taksen wil laten inhouden.</li>
            <li>
              <strong>Past minder:</strong> wie automatisch maandelijks wil beleggen zonder beheerkost, wie vaak kleine
              aandelenorders plaatst, of een rekening voor een kind zoekt. Vergelijk dan eerst in het{' '}
              <Link href="/beste-broker-belgie" className="text-accent underline">overzicht van alle brokers</Link>.
            </li>
          </ul>
          <p>Dit is algemene informatie, geen persoonlijk advies.</p>
        </div>

        <section className="max-w-3xl mb-10" aria-labelledby="faq">
          <h2 id="faq" className="font-display text-2xl font-bold text-primary mb-4">Veelgestelde vragen over MeDirect</h2>
          <div className="space-y-3">
            {faq.map(({ q, a }) => (
              <details key={q} className="card group">
                <summary className="font-semibold text-primary cursor-pointer list-none flex justify-between gap-4">
                  {q}
                  <span aria-hidden="true" className="text-accent group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-gray-700 mt-3">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <Bronnen bronnen={bronnen} nagekeken={broker.lastVerified} datumPerBron />

        {broker.affiliateUrl && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">MeDirect account openen</p>
              <AffiliateLabel broker={broker} />
            </div>
            <a href={goLink(broker.id, 'medirect-review-onder')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0 justify-center text-center">
              Open account →
            </a>
          </div>
        )}

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Gerelateerde vergelijkingen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/vergelijking/saxo-vs-medirect', label: 'Saxo vs MeDirect: AutoInvest of gratis ETF’s' },
              { href: '/beste-etf-broker-belgie', label: 'Beste ETF-broker in België' },
              { href: '/goedkoopste-broker-belgie', label: 'Goedkoopste broker in België 2026' },
              { href: '/beste-broker-belgie', label: 'Alle brokers vergelijken' },
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
