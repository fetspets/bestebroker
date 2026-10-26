import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { Bronnen, articleJsonLd, type Bron } from '@/components/ui/Bronnen'

const saxo = getBrokerById('saxo')!
const medirect = getBrokerById('medirect')!

const NAGEKEKEN = '2026-10-22'
const URL = 'https://www.bestebroker.be/vergelijking/saxo-vs-medirect'
const TITLE = 'MeDirect vs Saxo (2026): gratis ETF’s of AutoInvest?'
const DESCRIPTION =
  'MeDirect of Saxo? ETF- en aandelenkosten, spaarplan, belastingen, uitlenen van effecten en overdrachtkosten naast elkaar. Nagekeken oktober 2026.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, locale: 'nl_BE', type: 'article' },
  alternates: { canonical: URL },
}

const BRON = {
  medirectReview: 'https://curvo.eu/nl/artikel/medirect-review',
  medirectAandelen: 'https://www.test-aankoop.be/invest/beleggen/aandelen/artikels/2026/06/medirect-verlaagt-transactiekosten-aandelen',
  medirectVsSaxo: 'https://curvo.eu/nl/artikel/medirect-vs-saxo',
  saxoRekening: 'https://www.home.saxo/nl-be/accounts/individual',
  saxoAutoInvest: 'https://www.home.saxo/nl-be/products/autoinvest',
  spaarplannen: 'https://curvo.eu/article/best-etf-savings-plan-belgium',
}

const rows: { label: string; saxo: string; medirect: string }[] = [
  { label: 'Wie is het?', saxo: 'Belgisch bijkantoor van Saxo Bank A/S (Denemarken)', medirect: 'MeDirect Bank SA, Belgische bank (toezicht FSMA en NBB)' },
  { label: 'ETF-transactiekost (Euronext)', saxo: '0,08% met minimum €2', medirect: '€0 (alle ETF’s sinds augustus 2025)' },
  { label: 'Aandelen', saxo: '0,08% met minimum €2 (Euronext)', medirect: 'Betalend; minimum €2,50 op de meeste Europese beurzen sinds 1 juli 2026' },
  { label: 'Automatisch spaarplan', saxo: 'AutoInvest: €2 per maand voor de aankopen', medirect: 'Niet op het brokerplatform (enkel via het beheerde MeManaged, vanaf €5.000)' },
  { label: 'Bewaarloon', saxo: 'Geen', medirect: 'Geen' },
  { label: 'Belgische taksen (TOB, roerende voorheffing, Reynders, meerwaardebelasting)', saxo: 'Ingehouden door Saxo', medirect: 'Ingehouden door MeDirect (inhouding meerwaardebelasting kan je weigeren)' },
  { label: 'Securities lending (effecten uitlenen)', saxo: 'Enkel als je er zelf voor kiest (opt-in)', medirect: 'Nee' },
  { label: 'Bescherming effecten / cash', saxo: '€20.000 / €100.000 (Deens garantiefonds)', medirect: '€20.000 / €100.000 (Belgisch stelsel)' },
  { label: 'Effecten overzetten naar een andere bank', saxo: '€75 per lijn', medirect: '€50 per lijn (plus eventuele externe kosten)' },
]

const kosten = [
  { bedrag: '€150', saxo: 2, medirect: 0 },
  { bedrag: '€300', saxo: 2, medirect: 0 },
  { bedrag: '€1.000', saxo: 2, medirect: 0 },
  { bedrag: '€5.000', saxo: 2, medirect: 0 },
]
const eur = (n: number) => `€${n.toFixed(2).replace('.', ',')}`

const faq = [
  {
    q: 'Is MeDirect of Saxo goedkoper voor ETF’s?',
    a: 'MeDirect rekent geen makelaarsloon op ETF’s. Bij Saxo betaal je €2 per maand met AutoInvest, of 0,08% met minimum €2 per losse order. Bij één aankoop per maand is MeDirect dus €24 per jaar goedkoper. De beurstaks is bij beide gelijk.',
  },
  {
    q: 'Heeft MeDirect een spaarplan voor ETF’s?',
    a: 'Niet op het gewone brokerplatform: daar plaats je elke aankoop zelf. MeDirect heeft wel een beheerde formule (MeManaged) met een automatisch plan, vanaf €5.000 en minstens €100 per maand. Saxo heeft AutoInvest voor €2 per maand.',
  },
  {
    q: 'Houden MeDirect en Saxo de meerwaardebelasting in?',
    a: 'Ja. Beide houden sinds 2026 de meerwaardebelasting in bij elke verkoop, naast de beurstaks, de roerende voorheffing en de Reynderstaks. Blijft je meerwaarde onder de vrijstelling van €10.000 per jaar, dan recupereer je de ingehouden taks via je belastingaangifte. Bij MeDirect kan je de inhouding ook weigeren en de taks zelf aangeven.',
  },
  {
    q: 'Zijn MeDirect en Saxo veilig?',
    a: 'Beide staan onder toezicht (MeDirect: FSMA en NBB; Saxo: de Deense toezichthouder, met registratie bij de NBB). Cash is beschermd tot €100.000 en effecten tot €20.000 als de bank failliet gaat. Die bescherming dekt geen koersverliezen. MeDirect leent geen effecten uit; Saxo enkel als je zelf opt-in kiest.',
  },
]

const bronnen: Bron[] = [
  { staaft: 'ETF-kosten, spaarplan, taksen, overdracht en bescherming MeDirect', label: 'Curvo, MeDirect review (03/09/2026)', href: BRON.medirectReview },
  { staaft: 'Aandelentarief MeDirect vanaf 1 juli 2026', label: 'Test Aankoop Invest (29/06/2026)', href: BRON.medirectAandelen },
  { staaft: 'Overdrachtkosten, securities lending en bescherming van beide', label: 'Curvo, MeDirect vs Saxo (03/09/2026)', href: BRON.medirectVsSaxo },
  { staaft: 'Transactiekosten, bewaarloon en toezicht Saxo', label: 'Saxo België, individuele rekening', href: BRON.saxoRekening },
  { staaft: 'AutoInvest-kost Saxo', label: 'Saxo België, AutoInvest', href: BRON.saxoAutoInvest },
  { staaft: 'Storting bij AutoInvest', label: 'Curvo, ETF-spaarplannen in België (27/07/2026)', href: BRON.spaarplannen },
]

export default function SaxoVsMeDirectPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs MeDirect' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ headline: 'Saxo vs MeDirect: gratis ETF’s of AutoInvest?', description: DESCRIPTION, url: URL, datePublished: '2026-04-18', dateModified: NAGEKEKEN })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs MeDirect' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Saxo vs MeDirect: gratis ETF’s of AutoInvest?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Saxo en MeDirect houden allebei alle Belgische taksen in en rekenen geen bewaarloon. MeDirect rekent geen
            makelaarsloon op ETF’s; Saxo heeft een automatisch spaarplan voor €2 per maand.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-10 border-l-4 border-l-accent" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>ETF-kosten:</strong> MeDirect €0 per order; Saxo €2 per maand (AutoInvest) of 0,08% met minimum €2 per order.</li>
            <li><strong>Spaarplan:</strong> Saxo heeft AutoInvest; op het brokerplatform van MeDirect plaats je elke aankoop zelf.</li>
            <li><strong>Uitlenen van effecten:</strong> MeDirect doet het niet; bij Saxo enkel als je zelf opt-in kiest.</li>
            <li><strong>Vertrekken:</strong> overzetten kost €50 per lijn bij MeDirect en €75 per lijn bij Saxo.</li>
          </ul>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[saxo, medirect].map(broker => (
              broker.affiliateUrl && (
                <div key={broker.id}>
                  <a
                    href={goLink(broker.id, 'saxo-vs-medirect-top')}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="btn-outline w-full justify-center text-center py-3"
                  >
                    Naar {broker.name} →
                  </a>
                  <AffiliateLabel broker={broker} />
                </div>
              )
            ))}
          </div>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel Saxo en MeDirect</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 pr-3 text-gray-600 font-semibold">Criterium</th>
                  <th scope="col" className="text-left py-3 px-2 font-semibold text-blue-700">Saxo</th>
                  <th scope="col" className="text-left py-3 pl-2 font-semibold text-green-700">MeDirect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map(({ label, saxo: vs, medirect: vm }) => (
                  <tr key={label}>
                    <th scope="row" className="py-2.5 pr-3 text-left font-medium text-gray-700 align-top">{label}</th>
                    <td className="py-2.5 px-2 text-gray-600 align-top">{vs}</td>
                    <td className="py-2.5 pl-2 text-gray-600 align-top">{vm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Tarieven exclusief beurstaks. Bronnen onderaan deze pagina, nagekeken op 22 oktober 2026.</p>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-2">Wat kost één ETF-aankoop per maand?</h2>
          <p className="text-sm text-gray-600 mb-4">Makelaarsloon voor één ETF-aankoop per maand, zonder beurstaks (die is bij beide gelijk).</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 text-gray-600 font-semibold">Bedrag per maand</th>
                  <th scope="col" className="text-center py-3 font-semibold text-blue-700">Saxo (AutoInvest)</th>
                  <th scope="col" className="text-center py-3 font-semibold text-green-700">MeDirect</th>
                  <th scope="col" className="text-center py-3 text-gray-600 font-semibold">Verschil per jaar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {kosten.map(k => (
                  <tr key={k.bedrag}>
                    <th scope="row" className="py-2.5 text-left font-medium text-gray-700">{k.bedrag}</th>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.saxo)}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.medirect)}</td>
                    <td className="py-2.5 text-center text-gray-700 font-medium">{eur((k.saxo - k.medirect) * 12)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Een losse order bij Saxo kost 0,08% met minimum €2: tot €2.500 is dat ook €2. Reken je eigen situatie na met de{' '}
            <Link href="/tools/brokerkosten-calculator" className="text-accent hover:underline">brokerkosten-calculator</Link>.
          </p>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>ETF-kosten: €0 tegenover €2</h2>
          <p>
            MeDirect maakte in augustus 2025 alle ETF’s provisievrij. Je betaalt enkel de <Link href="/belgie/tob-uitleg">beurstaks (TOB)</Link>,
            die bij elke Belgische broker even hoog is. Bij Saxo betaal je 0,08% met minimum €2 per order, of €2 per maand als je via AutoInvest koopt.
            Voor aandelen zijn beide betalend.
          </p>

          <h2>Spaarplan: AutoInvest tegenover zelf kopen</h2>
          <p>
            Met Saxo AutoInvest kies je ETF’s en een maandbedrag, en Saxo koopt op een vaste dag als er genoeg geld op je rekening staat.
            Je zet dat geld er zelf op, bijvoorbeeld met een doorlopende overschrijving. Bij MeDirect plaats je elke aankoop zelf;
            het automatische plan bestaat enkel in de beheerde formule MeManaged (vanaf €5.000).
          </p>

          <h2>Belastingen</h2>
          <p>
            Beide houden de beurstaks, de roerende voorheffing, de Reynderstaks en de meerwaardebelasting in. Je hoeft je rekening niet bij de
            Nationale Bank te melden. Meer uitleg: <Link href="/broker-meerwaardebelasting-2026">meerwaardebelasting 2026 bij brokers</Link>.
          </p>

          <h2>Voor wie is welk verschil belangrijk?</h2>
          <ul>
            <li><strong>Je koopt zelf af en toe ETF’s:</strong> bij MeDirect betaal je geen makelaarsloon.</li>
            <li><strong>Je wil dat aankopen elke maand vanzelf gebeuren:</strong> dat kan bij Saxo met AutoInvest (€2 per maand).</li>
            <li><strong>Je belegt ook in aandelen, obligaties of opties:</strong> vergelijk de tarieven per product; Saxo heeft het bredere aanbod.</li>
            <li><strong>Je wil later misschien overstappen:</strong> reken met €50 (MeDirect) of €75 (Saxo) per lijn.</li>
          </ul>
          <p>
            Meer details: <Link href="/reviews/medirect">review van MeDirect</Link>, <Link href="/reviews/saxo-bank-belgie">review van Saxo</Link>{' '}
            en <Link href="/vergelijking/bolero-vs-saxo">Bolero vs Saxo</Link>.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen over Saxo en MeDirect</h2>
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
          {[saxo, medirect].map(broker => (
            broker.affiliateUrl && (
              <div key={broker.id} className="card flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{broker.name}</p>
                  <p className="text-sm text-gray-500">{broker.tagline}</p>
                  <AffiliateLabel broker={broker} />
                </div>
                <a href={goLink(broker.id, 'saxo-vs-medirect-onder')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0 text-sm py-2">Naar {broker.name} →</a>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}
