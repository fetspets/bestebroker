import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'

const bronnen: Bron[] = [
  { staaft: 'TOB-tarieven ETF’s en aandelen, maxima per transactie, VWCE in België geregistreerd', label: 'Curvo, beurstaks ETF (08/10/2026)', href: 'https://curvo.eu/nl/artikel/hoe-je-de-beurstaks-van-een-etf-berekent' },
  { staaft: 'TOB VWCE 1,32% en IWDA 0,12%', label: 'Curvo, VWCE vs IWDA (22/10/2026)', href: 'https://curvo.eu/nl/artikel/vwce-vs-iwda' },
  { staaft: 'Tarief obligaties 0,12%', label: 'Test-Aankoop, taks op beursverrichtingen', href: 'https://www.test-aankoop.be/invest/fiscaliteit-en-wetgeving/belastingheffing/dossiers/taks-op-beursverrichtingen-tob' },
]

export const metadata: Metadata = {
  title: 'TOB Uitgelegd — Taks op Beursverrichtingen voor Belgische Beleggers',
  description:
    'Wat is de TOB (Taks op Beursverrichtingen)? Hoeveel betaal je per ETF-transactie, wie regelt het automatisch en hoe doe je aangifte als dat nodig is?',
  openGraph: {
    title: 'TOB — Taks op Beursverrichtingen uitgelegd',
    url: 'https://www.bestebroker.be/belgie/tob-uitleg',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/belgie/tob-uitleg' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wat is de TOB (Taks op Beursverrichtingen)?',
      acceptedAnswer: { '@type': 'Answer', text: 'De TOB is een Belgische belasting op elke aankoop en verkoop van effecten. Het tarief hangt af van het type effect: 0,35% voor aandelen, 0,12% voor obligaties en voor de meeste ETF’s, en 1,32% voor een in België geregistreerde kapitaliserende ETF.' },
    },
    {
      '@type': 'Question',
      name: 'Hoeveel bedraagt de TOB voor ETFs?',
      acceptedAnswer: { '@type': 'Answer', text: 'Dat hangt af van waar de ETF geregistreerd is. In de EER maar niet in België (zoals IWDA): 0,12%, max. €1.300 per transactie. In België geregistreerd en kapitaliserend (zoals VWCE): 1,32%, max. €4.000. In België geregistreerd en uitkerend: 0,12%. Van buiten de EER: 0,35%, max. €1.600.' },
    },
    {
      '@type': 'Question',
      name: 'Wie betaalt de TOB als ik via DEGIRO beleg?',
      acceptedAnswer: { '@type': 'Answer', text: 'DEGIRO houdt de TOB zelf in en stort ze door aan de Belgische fiscus. Je moet de TOB enkel zelf aangeven bij een broker die ze niet inhoudt, bijvoorbeeld een oude Duitse rekening bij Trade Republic.' },
    },
  ],
}

const tobRates = [
  { type: 'Aandelen (Belgische beurs)', rate: '0,35%', max: '€1.600', notes: 'Per transactie (aankoop + verkoop = 2×)' },
  { type: 'Aandelen (buitenlandse beurs)', rate: '0,35%', max: '€1.600', notes: '' },
  { type: 'Obligaties', rate: '0,12%', max: '€1.300', notes: '' },
  { type: 'ETF geregistreerd in de EER, niet in België (acc of dist)', rate: '0,12%', max: '€1.300', notes: 'Bv. IWDA, EMIM' },
  { type: 'ETF geregistreerd in België, kapitaliserend (acc)', rate: '1,32%', max: '€4.000', notes: 'Bv. VWCE. Bij aankoop én verkoop' },
  { type: 'ETF geregistreerd in België, uitkerend (dist)', rate: '0,12%', max: '€1.300', notes: '' },
  { type: 'ETF van buiten de EER', rate: '0,35%', max: '€1.600', notes: '' },
]

export default function TobUitlegPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'België fiscaal', href: '/beste-broker-belgie' }, { label: 'TOB uitgelegd' }])) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'België fiscaal', href: '/beste-broker-belgie' }, { label: 'TOB uitgelegd' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            TOB — Taks op Beursverrichtingen uitgelegd
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            De TOB is een belasting die je betaalt bij elke beurstransactie in België.
            Voor de meeste ETF’s is dat 0,12% per transactie, maar voor een in België geregistreerde
            kapitaliserende ETF zoals VWCE 1,32%.
            Wij leggen uit hoeveel je betaalt, hoe het wordt geïnd en wat je zelf moet doen.
          </p>
          <LastUpdated date="2026-10-23" />
        </header>

        {/* Rates table */}
        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">TOB-tarieven per effecttype</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 text-gray-600">
                <tr>
                  <th className="text-left py-3 font-semibold">Type effect</th>
                  <th className="text-right py-3 font-semibold">Tarief</th>
                  <th className="text-right py-3 font-semibold">Maximum</th>
                  <th className="text-left py-3 font-semibold pl-4">Opmerking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tobRates.map(({ type, rate, max, notes }) => (
                  <tr key={type} >
                    <td className="py-2.5 font-medium">{type}</td>
                    <td className="py-2.5 text-right font-bold text-accent">{rate}</td>
                    <td className="py-2.5 text-right">{max}</td>
                    <td className="py-2.5 pl-4 text-gray-500 text-xs">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">TOB geldt per transactie richting (aankoop en verkoop zijn elk apart belastbaar).</p>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat is de TOB precies?</h2>
          <p>
            De Taks op Beursverrichtingen (TOB) is een Belgische belasting die verschuldigd is
            bij de <em>aankoop én verkoop</em> van beursgenoteerde effecten. Je betaalt hem dus
            twee keer per round-trip: één keer bij aankoop, één keer bij verkoop.
          </p>

          <h3>Rekenvoorbeeld bij €500 ETF-aankoop</h3>
          <p>
            IWDA (0,12%): €500 × 0,12% = <strong>€0,60 TOB</strong> bij aankoop, en nog eens €0,60 bij verkoop.
            VWCE (1,32%): €500 × 1,32% = <strong>€6,60 TOB</strong> bij aankoop, en nog eens €6,60 bij verkoop.
            Waar een ETF geregistreerd is, staat in de factsheet. Meer in{' '}
            <Link href="/belgie/vwce-vs-iwda" className="text-accent hover:underline">VWCE vs IWDA</Link>.
          </p>

          <h2>Wie int de TOB?</h2>
          <p>
            Belgische brokers (Saxo Bank, Bolero, MeDirect, Keytrade) houden de TOB automatisch in
            bij elke transactie en storten die door aan de overheid. Jij ziet het als een automatische
            aftrek op je rekeningafschrift.
          </p>
          <p>
            Ook DEGIRO houdt de TOB in, en Trade Republic doet dat op een Belgische rekening (geopend vanaf
            15 september 2026). Houdt je broker de TOB <strong>niet</strong> in, bijvoorbeeld op een oude Duitse
            rekening bij Trade Republic, dan ben je zelf verantwoordelijk voor:
          </p>
          <ul>
            <li>De TOB te berekenen op elke transactie</li>
            <li>De aangifte via <strong>MyMinfin</strong> (Mijn aangifte → Diverse taksen)</li>
            <li>De aangifte en betaling uiterlijk op de laatste werkdag van de tweede maand na de maand van de transactie</li>
          </ul>

          <h2>TOB-aangifte bij buitenlandse broker — hoe?</h2>
          <p>
            Houdt je broker de TOB niet in, dan geef je ze zelf aan en betaal je ze per maand waarin je transacties deed:
          </p>
          <ol>
            <li>Log in op <strong>myminfin.be</strong></li>
            <li>Ga naar &quot;Mijn aangifte&quot; → &quot;Diverse taksen&quot; → taks op beursverrichtingen</li>
            <li>Voer per transactie het bedrag, de datum en het type effect in</li>
            <li>Dien in en betaal uiterlijk op de laatste werkdag van de tweede maand na de transactie (bv. een aankoop in maart: uiterlijk eind mei)</li>
          </ol>
          <p className="text-sm text-orange-700 bg-orange-50 p-3 rounded-lg">
            ⚠ Niet-aangifte kan leiden tot boetes en naheffingen met interest. Houd je transacties
            bij in een spreadsheet als je via een buitenlandse broker belegt.
          </p>

          <h2>Vermijd de administratie: kies een Belgische broker</h2>
          <p>
            Als je de TOB-aangifte wil vermijden, kies dan een Belgische broker. Het kostenverschil
            tussen Belgische en buitenlandse brokers is voor de meeste beleggers kleiner dan de
            waarde van de tijd die je spaart.
            <Link href="/beste-broker-belgie" className="text-accent hover:underline ml-1">Vergelijk alle brokers →</Link>
          </p>
        </div>

        <Bronnen bronnen={bronnen} nagekeken="2026-10-23" />

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/belgie/meerwaardebelasting-broker', label: 'Meerwaardebelasting 2026', sub: 'De nieuwe 10%-belasting uitgelegd' },
            { href: '/belgie/buitenlandse-broker-nbb-aangifte', label: 'NBB-aangifte', sub: 'Buitenlandse rekening aangeven' },
            { href: '/beste-broker-belgie', label: 'Beste broker vergelijken', sub: 'Welke broker regelt TOB automatisch?' },
            { href: '/broker-meerwaardebelasting-2026', label: 'Broker & meerwaardebelasting', sub: 'Wie regelt wat in 2026?' },
          ].map(({ href, label, sub }) => (
            <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
              <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label}</p>
              <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
