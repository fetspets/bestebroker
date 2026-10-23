import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { Bronnen, articleJsonLd, type Bron } from '@/components/ui/Bronnen'

const saxo = getBrokerById('saxo')!
const degiro = getBrokerById('degiro')!

const NAGEKEKEN = '2026-10-23'
const URL = 'https://www.bestebroker.be/vergelijking/saxo-vs-degiro'
const TITLE = 'Saxo vs DEGIRO (2026): kosten en taksen in België'
const DESCRIPTION =
  'Saxo of DEGIRO? Kosten per ETF-order, AutoInvest, welke taksen je zelf aangeeft, NBB-melding en overdrachtkosten naast elkaar. Nagekeken oktober 2026.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, locale: 'nl_BE', type: 'article' },
  alternates: { canonical: URL },
}

const BRON = {
  degiroReview: 'https://curvo.eu/nl/artikel/degiro-review',
  tobDegiro: 'https://www.test-aankoop.be/invest/fiscaliteit-en-wetgeving/belastingheffing/dossiers/taks-op-beursverrichtingen-tob',
  saxoRekening: 'https://www.home.saxo/nl-be/accounts/individual',
  saxoAutoInvest: 'https://www.home.saxo/nl-be/products/autoinvest',
  medirectVsSaxo: 'https://curvo.eu/nl/artikel/medirect-vs-saxo',
  spaarplannen: 'https://curvo.eu/article/best-etf-savings-plan-belgium',
}

const rows: { label: string; saxo: string; degiro: string }[] = [
  { label: 'Wie is het?', saxo: 'Belgisch bijkantoor van Saxo Bank A/S (Denemarken)', degiro: 'flatexDEGIRO (Duitsland), toezicht BaFin; buitenlandse rekening, openen via degiro.nl' },
  { label: 'ETF-transactiekost', saxo: '0,08% met minimum €2 per order', degiro: '€1 voor ETF’s uit de kernselectie (via Tradegate) · €3 voor andere ETF’s' },
  { label: 'Automatisch spaarplan', saxo: 'AutoInvest: €2 per maand voor de aankopen; je stort zelf het geld', degiro: 'Nee' },
  { label: 'Beurstaks (TOB)', saxo: 'Ingehouden door Saxo', degiro: 'Ingehouden door DEGIRO' },
  { label: 'Roerende voorheffing op buitenlandse dividenden, Reynderstaks', saxo: 'Ingehouden door Saxo', degiro: 'Zelf aangeven' },
  { label: 'Meerwaardebelasting (sinds 2026)', saxo: 'Ingehouden door Saxo', degiro: 'Zelf berekenen en aangeven' },
  { label: 'Melding bij de Nationale Bank (NBB)', saxo: 'Niet nodig', degiro: 'Verplicht (buitenlandse rekening) + vermelden in je aangifte' },
  { label: 'Bewaarloon', saxo: 'Geen', degiro: 'Geen' },
  { label: 'Securities lending (effecten uitlenen)', saxo: 'Enkel als je er zelf voor kiest (opt-in)', degiro: 'Toegelaten volgens de voorwaarden van het Basis-account' },
  { label: 'Bescherming effecten / cash', saxo: '€20.000 / €100.000 (Deens garantiefonds)', degiro: '€20.000 / €100.000 (Duitse stelsels)' },
  { label: 'Effecten overzetten naar een andere bank', saxo: '€75 per lijn', degiro: '€20 per lijn (plus eventuele externe kosten)' },
]

const kosten = [
  { bedrag: '€150', saxo: 2, degiroKern: 1, degiroAnder: 3 },
  { bedrag: '€300', saxo: 2, degiroKern: 1, degiroAnder: 3 },
  { bedrag: '€1.000', saxo: 2, degiroKern: 1, degiroAnder: 3 },
  { bedrag: '€5.000', saxo: 2, degiroKern: 1, degiroAnder: 3 },
]
const eur = (n: number) => `€${n.toFixed(2).replace('.', ',')}`

const faq = [
  {
    q: 'Is Saxo duurder dan DEGIRO?',
    a: 'Per order meestal wel. Een ETF uit de kernselectie van DEGIRO kost €1 per order via Tradegate, een andere ETF €3. Bij Saxo kost AutoInvest €2 per maand, een losse order 0,08% met minimum €2. Bij één aankoop per maand betaal je bij DEGIRO €12 tot €36 per jaar, bij Saxo met AutoInvest €24. Bij DEGIRO geef je wel meer taksen zelf aan.',
  },
  {
    q: 'Houdt DEGIRO de beurstaks in?',
    a: 'Ja. DEGIRO houdt de beurstaks (TOB) in en stort ze door aan de Belgische fiscus. De meerwaardebelasting, de Reynderstaks en de roerende voorheffing op buitenlandse dividenden geef je zelf aan. Saxo houdt al die taksen in.',
  },
  {
    q: 'Moet ik een DEGIRO-rekening melden bij de Nationale Bank?',
    a: 'Ja. Een DEGIRO-rekening is een buitenlandse rekening: je meldt ze bij het Centraal Aanspreekpunt van de NBB en vermeldt ze in je belastingaangifte. Voor een rekening bij het Belgische bijkantoor van Saxo hoeft dat niet.',
  },
  {
    q: 'Zijn Saxo en DEGIRO veilig?',
    a: 'Beide bewaren je effecten apart van hun eigen vermogen. Gaat de bank failliet, dan is cash beschermd tot €100.000 en zijn effecten gedekt tot €20.000, bij beide. Die bescherming dekt geen koersverliezen. Saxo leent enkel effecten uit als je daarvoor kiest; bij DEGIRO staat het uitlenen in de voorwaarden van het Basis-account.',
  },
]

const bronnen: Bron[] = [
  { staaft: 'Kosten, taksen, NBB-melding, securities lending, bescherming en overdracht DEGIRO', label: 'Curvo, DEGIRO review (03/09/2026)', href: BRON.degiroReview },
  { staaft: 'DEGIRO houdt de beurstaks in', label: 'Test-Aankoop, taks op beursverrichtingen', href: BRON.tobDegiro },
  { staaft: 'Transactiekosten, bewaarloon en toezicht Saxo', label: 'Saxo België, individuele rekening', href: BRON.saxoRekening },
  { staaft: 'AutoInvest-kost Saxo', label: 'Saxo België, AutoInvest', href: BRON.saxoAutoInvest },
  { staaft: 'Overdrachtkosten, securities lending en bescherming Saxo', label: 'Curvo, MeDirect vs Saxo (03/09/2026)', href: BRON.medirectVsSaxo },
  { staaft: 'Storting bij AutoInvest', label: 'Curvo, ETF-spaarplannen in België (27/07/2026)', href: BRON.spaarplannen },
]

export default function SaxoVsDegiroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs DEGIRO' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ headline: 'Saxo vs DEGIRO: kosten en taksen voor Belgische beleggers', description: DESCRIPTION, url: URL, datePublished: '2026-04-01', dateModified: NAGEKEKEN })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs DEGIRO' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Saxo vs DEGIRO: kosten en taksen voor Belgische beleggers
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            DEGIRO rekent lagere orderkosten en houdt de beurstaks in, maar de meerwaardebelasting en de NBB-melding regel je
            zelf. Saxo is duurder per order, houdt alle Belgische taksen in en heeft een automatisch spaarplan.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-10 border-l-4 border-l-accent" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>Kosten:</strong> DEGIRO €1 (kernselectie) of €3 per ETF-order; Saxo €2 per maand met AutoInvest, of 0,08% met minimum €2 per order.</li>
            <li><strong>Belastingen:</strong> beide houden de beurstaks in. Meerwaardebelasting, Reynderstaks en buitenlandse dividenden: Saxo houdt ze in, bij DEGIRO geef je ze zelf aan.</li>
            <li><strong>Administratie:</strong> een DEGIRO-rekening meld je bij de Nationale Bank; bij Saxo hoeft dat niet.</li>
            <li><strong>Overstappen:</strong> effecten overzetten kost €20 per lijn bij DEGIRO en €75 bij Saxo.</li>
          </ul>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel Saxo en DEGIRO</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 pr-3 text-gray-600 font-semibold">Criterium</th>
                  <th scope="col" className="text-left py-3 px-2 font-semibold text-blue-700">Saxo</th>
                  <th scope="col" className="text-left py-3 pl-2 font-semibold text-orange-600">DEGIRO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map(({ label, saxo: vs, degiro: vd }) => (
                  <tr key={label}>
                    <th scope="row" className="py-2.5 pr-3 text-left font-medium text-gray-700 align-top">{label}</th>
                    <td className="py-2.5 px-2 text-gray-600 align-top">{vs}</td>
                    <td className="py-2.5 pl-2 text-gray-600 align-top">{vd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Tarieven exclusief beurstaks. Bronnen onderaan deze pagina, nagekeken op 23 oktober 2026.</p>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-2">Wat kost één ETF-aankoop per maand?</h2>
          <p className="text-sm text-gray-600 mb-4">Makelaarsloon voor één ETF-aankoop per maand, zonder beurstaks.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 text-gray-600 font-semibold">Bedrag per maand</th>
                  <th scope="col" className="text-center py-3 font-semibold text-blue-700">Saxo AutoInvest</th>
                  <th scope="col" className="text-center py-3 font-semibold text-orange-600">DEGIRO kernselectie</th>
                  <th scope="col" className="text-center py-3 font-semibold text-orange-600">DEGIRO andere ETF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {kosten.map(k => (
                  <tr key={k.bedrag}>
                    <th scope="row" className="py-2.5 text-left font-medium text-gray-700">{k.bedrag}</th>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.saxo)}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.degiroKern)}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.degiroAnder)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Per jaar: Saxo €24 · DEGIRO €12 (kernselectie) of €36 (andere ETF). Reken je eigen situatie na met de{' '}
            <Link href="/tools/brokerkosten-calculator" className="text-accent hover:underline">brokerkosten-calculator</Link>.
          </p>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Belastingen: wat doe je zelf bij DEGIRO?</h2>
          <p>
            DEGIRO houdt de <Link href="/belgie/tob-uitleg">beurstaks (TOB)</Link> in. De meerwaardebelasting (10% boven een vrijstelling van
            €10.000 per jaar, op meerwaarden vanaf 2026), de Reynderstaks op obligatie-ETF’s en de roerende voorheffing op buitenlandse
            dividenden geef je zelf aan. Je meldt de rekening ook bij de Nationale Bank. Zie{' '}
            <Link href="/belgie/buitenlandse-broker-nbb-aangifte">NBB-aangifte bij een buitenlandse broker</Link> en{' '}
            <Link href="/broker-meerwaardebelasting-2026">meerwaardebelasting 2026 bij brokers</Link>.
          </p>

          <h2>Voor wie is welk verschil belangrijk?</h2>
          <ul>
            <li><strong>Je wil zo weinig mogelijk administratie:</strong> Saxo houdt alle taksen in en een NBB-melding is niet nodig.</li>
            <li><strong>Je wil elke maand automatisch kopen:</strong> Saxo heeft AutoInvest; bij DEGIRO plaats je elke order zelf.</li>
            <li><strong>Je koopt vooral ETF’s uit de kernselectie:</strong> dan is DEGIRO met €1 per order het goedkoopst per order.</li>
            <li><strong>Je wil later misschien overstappen:</strong> overzetten kost €20 per lijn bij DEGIRO en €75 bij Saxo.</li>
          </ul>
          <p>
            Meer details: <Link href="/reviews/saxo-bank-belgie">review van Saxo</Link>, <Link href="/reviews/degiro-belgie">review van DEGIRO</Link>{' '}
            en <Link href="/vergelijking/degiro-vs-bolero">DEGIRO vs Bolero</Link>.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen over Saxo en DEGIRO</h2>
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
          {[saxo, degiro].map(broker => (
            broker.affiliateUrl && (
              <div key={broker.id} className="card flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{broker.name}</p>
                  <p className="text-sm text-gray-500">{broker.tagline}</p>
                  <AffiliateLabel broker={broker} />
                </div>
                <a href={goLink(broker.id, 'saxo-vs-degiro')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0 text-sm py-2">Naar {broker.name} →</a>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}
