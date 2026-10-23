import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { Bronnen, articleJsonLd, type Bron } from '@/components/ui/Bronnen'

const URL = 'https://www.bestebroker.be/belgie/vwce-vs-iwda'
const TITLE = 'VWCE vs IWDA (2026): 1,32% of 0,12% beurstaks?'
const DESCRIPTION =
  'VWCE is goedkoper per jaar, maar de beurstaks verschilt fors voor Belgen. Kosten, spreiding en taksen van VWCE en IWDA naast elkaar, met bronnen.'
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

const BRON = {
  vanguard: 'https://nl.vanguard/professional/product/etf/equity/9679/ftse-all-world-ucits-etf-usd-accumulating',
  curvoVwceIwda: 'https://curvo.eu/nl/artikel/vwce-vs-iwda',
  curvoTob: 'https://curvo.eu/nl/artikel/hoe-je-de-beurstaks-van-een-etf-berekent',
}

const bronnen: Bron[] = [
  { staaft: 'VWCE: ISIN IE00BK5BQT80, lopende kosten 0,14%, 3.821 aandelen (30/09/2026), noteringen Amsterdam, Milaan, Xetra', label: 'Vanguard, FTSE All-World UCITS ETF (USD) Accumulating', href: BRON.vanguard },
  { staaft: 'TOB VWCE 1,32% en IWDA 0,12%; TER IWDA 0,20%; IWDA ±1.500 aandelen', label: 'Curvo, VWCE vs IWDA (22/10/2026)', href: BRON.curvoVwceIwda },
  { staaft: 'TOB-tarieven ETF’s, maxima, VWCE geregistreerd in België', label: 'Curvo, beurstaks ETF (08/10/2026)', href: BRON.curvoTob },
]

const faq = [
  {
    q: 'Wat is het verschil tussen VWCE en IWDA?',
    a: 'VWCE (Vanguard FTSE All-World) belegt wereldwijd, ook in opkomende landen. IWDA (iShares Core MSCI World) belegt enkel in ontwikkelde landen. VWCE heeft lagere lopende kosten (0,14% tegenover 0,20% per jaar), maar voor een Belgische belegger een veel hogere beurstaks.',
  },
  {
    q: 'Hoeveel beurstaks (TOB) betaal je op VWCE en IWDA?',
    a: 'VWCE is in België geregistreerd en kapitaliserend: 1,32% TOB bij aankoop en bij verkoop (max. €4.000 per transactie). Op IWDA betaal je 0,12% (max. €1.300). Op een aankoop van €1.000 is dat €13,20 tegenover €1,20.',
  },
  {
    q: 'Wat weegt zwaarder: de TER of de TOB?',
    a: 'Bij €10.000 scheelt de TER €6 per jaar in het voordeel van VWCE. De TOB scheelt €120 bij aankoop en nog eens €120 bij verkoop in het voordeel van IWDA. Over 20 jaar is het TER-verschil €120 (zonder rendement), dus kleiner dan het TOB-verschil van één aankoop en verkoop.',
  },
  {
    q: 'Wordt VWCE of IWDA anders behandeld voor de meerwaardebelasting?',
    a: 'Nee. Beide zijn kapitaliserende aandelen-ETF’s. Voor de meerwaardebelasting (10% boven €10.000 per jaar) gelden dezelfde regels.',
  },
]

const rows = [
  { label: 'Volledige naam', vwce: 'Vanguard FTSE All-World UCITS ETF (USD) Accumulating', iwda: 'iShares Core MSCI World UCITS ETF (Acc)' },
  { label: 'ISIN', vwce: 'IE00BK5BQT80', iwda: 'IE00B4L5Y983' },
  { label: 'Lopende kosten (TER)', vwce: '0,14% per jaar', iwda: '0,20% per jaar' },
  { label: 'Index', vwce: 'FTSE All-World (ontwikkelde + opkomende landen)', iwda: 'MSCI World (enkel ontwikkelde landen)' },
  { label: 'Aantal aandelen', vwce: '3.821 (30/09/2026)', iwda: '±1.500' },
  { label: 'Dividend', vwce: 'Kapitaliserend (herbelegd)', iwda: 'Kapitaliserend (herbelegd)' },
  { label: 'Beurstaks (TOB) voor Belgen', vwce: '1,32% (max. €4.000), in België geregistreerd', iwda: '0,12% (max. €1.300)' },
  { label: 'Beurzen in euro', vwce: 'Amsterdam, Milaan, Xetra', iwda: 'o.a. Amsterdam' },
]

export default function VwceVsIwdaPage() {
  const jsonLd = [
    articleJsonLd({ headline: TITLE, description: DESCRIPTION, url: URL, dateModified: NAGEKEKEN }),
    breadcrumbJsonLd([{ label: 'België', href: '/belgie/tob-uitleg' }, { label: 'VWCE vs IWDA', href: '/belgie/vwce-vs-iwda' }]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'België', href: '/belgie/tob-uitleg' }, { label: 'VWCE vs IWDA' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            VWCE vs IWDA voor Belgische beleggers: kosten, spreiding en beurstaks
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            VWCE en IWDA zijn twee veelgekochte wereld-ETF’s. VWCE spreidt breder en heeft lagere jaarlijkse kosten. Maar
            voor een Belgische belegger is de beurstaks op VWCE elf keer hoger. Hieronder staan de feiten naast elkaar.
          </p>
          <LastUpdated date={NAGEKEKEN} />
        </header>

        <section className="card mb-10" aria-labelledby="tabel">
          <h2 id="tabel" className="font-display text-xl font-bold text-primary mb-4">VWCE en IWDA naast elkaar</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 text-gray-600 font-semibold">Kenmerk</th>
                  <th scope="col" className="text-left py-3 px-2 font-semibold text-primary">VWCE</th>
                  <th scope="col" className="text-left py-3 px-2 font-semibold text-primary">IWDA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map(({ label, vwce, iwda }) => (
                  <tr key={label}>
                    <th scope="row" className="py-2.5 pr-2 text-left font-medium text-gray-700">{label}</th>
                    <td className="py-2.5 px-2 text-gray-600">{vwce}</td>
                    <td className="py-2.5 px-2 text-gray-600">{iwda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Beurstaks: het grootste verschil voor Belgen</h2>
          <p>
            VWCE is in België geregistreerd en kapitaliserend. Daarom geldt <strong>1,32% TOB</strong> bij aankoop én bij
            verkoop, met een maximum van €4.000 per transactie. IWDA is niet in België geregistreerd: daar betaal je{' '}
            <strong>0,12%</strong> (maximum €1.300). Curvo meldt dat de toepassing van het tarief per broker kan verschillen;
            kijk op je borderel welk tarief je broker inhoudt.
          </p>
          <p>Rekenvoorbeeld voor een aankoop van €10.000 die je later voor hetzelfde bedrag verkoopt:</p>
          <ul>
            <li>VWCE: €132 TOB bij aankoop + €132 bij verkoop = <strong>€264</strong></li>
            <li>IWDA: €12 bij aankoop + €12 bij verkoop = <strong>€24</strong></li>
          </ul>
          <p>
            Meer over de tarieven: <Link href="/belgie/tob-uitleg">TOB uitgelegd</Link>.
          </p>

          <h2>Jaarlijkse kosten (TER)</h2>
          <p>
            VWCE kost 0,14% per jaar, IWDA 0,20%. Op €10.000 is dat €14 tegenover €20, een verschil van €6 per jaar in het
            voordeel van VWCE. Over 20 jaar is dat €120 zonder rendement: minder dan het TOB-verschil van één aankoop en
            verkoop van hetzelfde bedrag.
          </p>

          <h2>Spreiding: wereld of ontwikkelde landen</h2>
          <p>
            VWCE volgt de FTSE All-World-index: ontwikkelde én opkomende landen, 3.821 aandelen eind september 2026. IWDA volgt
            de MSCI World-index: enkel ontwikkelde landen, zo’n 1.500 aandelen. Wie met IWDA ook opkomende landen wil,
            combineert vaak met een aparte opkomende-landen-ETF zoals EMIM (TOB 0,12%).
          </p>

          <h2>Kapitaliserend of uitkerend</h2>
          <p>
            Beide zijn kapitaliserend: dividenden worden in het fonds herbelegd. Op een uitkerende versie (bij Vanguard
            VWRL) betaal je 30% roerende voorheffing op elk uitgekeerd dividend. Let bij aankoop dus op de ISIN.
          </p>

          <h2>Meerwaardebelasting</h2>
          <p>
            Voor de meerwaardebelasting (10% boven €10.000 per jaar, sinds 2026) worden beide gelijk behandeld. Zie{' '}
            <Link href="/belgie/meerwaardebelasting-2026-uitleg">meerwaardebelasting 2026 uitgelegd</Link>.
          </p>

          <h2>Waar koop je VWCE of IWDA?</h2>
          <p>
            Beide ETF’s zijn bij de Belgische brokers op deze site te koop. Wat een aankoop per maand kost en welke broker
            een spaarplan heeft, zie je op <Link href="/beste-etf-broker-belgie">ETF-brokers in België vergeleken</Link>.
          </p>

          <h2>Veelgestelde vragen</h2>
          {faq.map(f => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>

        <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/belgie/etf-kopen-beginners', label: 'Hoe koop je een ETF in België?' },
            { href: '/beste-etf-broker-belgie', label: 'ETF-brokers in België vergeleken' },
            { href: '/belgie/tob-uitleg', label: 'TOB uitgelegd' },
            { href: '/belgie/meerwaardebelasting-2026-uitleg', label: 'Meerwaardebelasting 2026' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
              <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label} →</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
