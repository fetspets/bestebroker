import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'

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
      acceptedAnswer: { '@type': 'Answer', text: 'De TOB is een Belgische belasting op elke beurstransactie. Het tarief hangt af van het type effect: voor aandelen is het 0,35%, voor obligaties 0,12%, voor accumulerende ETFs 0,12%.' },
    },
    {
      '@type': 'Question',
      name: 'Hoeveel bedraagt de TOB voor ETFs?',
      acceptedAnswer: { '@type': 'Answer', text: 'Voor accumulerende (kapitaliserend) ETFs bedraagt de TOB 0,12% per transactie, met een maximum van €1.300 per transactie. Voor distribuerende ETFs gelden andere tarieven afhankelijk van het type fonds.' },
    },
    {
      '@type': 'Question',
      name: 'Wie betaalt de TOB als ik via DEGIRO beleg?',
      acceptedAnswer: { '@type': 'Answer', text: 'Bij DEGIRO moet je de TOB zelf aangeven en betalen via myminfin.be. DEGIRO is een buitenlandse broker en houdt de TOB niet automatisch in.' },
    },
  ],
}

const tobRates = [
  { type: 'Aandelen (Belgische beurs)', rate: '0,35%', max: '€1.600', notes: 'Per transactie (aankoop + verkoop = 2×)' },
  { type: 'Aandelen (buitenlandse beurs)', rate: '0,35%', max: '€1.600', notes: '' },
  { type: 'Obligaties', rate: '0,12%', max: '€1.300', notes: '' },
  { type: 'ETFs — accumulerend (acc)', rate: '0,12%', max: '€1.300', notes: 'Meest gebruikte ETF-type voor passief beleggen' },
  { type: 'ETFs — distribuerend (dist)', rate: '0,12%', max: '€1.300', notes: 'Kan variëren naargelang samenstelling fonds' },
  { type: 'Geldmarktfondsen', rate: '0,12%', max: '€1.300', notes: '' },
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
            Voor de meeste ETF-beleggers bedraagt dit 0,12% per transactie.
            Wij leggen uit hoeveel je betaalt, hoe het wordt geïnd en wat je zelf moet doen.
          </p>
          <LastUpdated date="2026-04-01" />
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
                  <tr key={type} className={type.includes('acc') ? 'bg-teal-50' : ''}>
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

          <h3>Rekenvoorbeeld bij €500 ETF-aankoop (acc)</h3>
          <p>
            €500 × 0,12% = <strong>€0,60 TOB</strong> bij aankoop.
            En nogmaals €0,60 bij verkoop. Totaal voor de round-trip: €1,20.
          </p>

          <h2>Wie int de TOB?</h2>
          <p>
            Belgische brokers (Saxo Bank, Bolero, MeDirect, Keytrade) houden de TOB automatisch in
            bij elke transactie en storten die door aan de overheid. Jij ziet het als een automatische
            aftrek op je rekeningafschrift.
          </p>
          <p>
            Buitenlandse brokers (DEGIRO, Trade Republic) doen dit <strong>niet</strong>.
            Als Belgische belegger ben je dan zelf verantwoordelijk voor:
          </p>
          <ul>
            <li>De TOB te berekenen op elke transactie</li>
            <li>Maandelijks aangifte te doen via <strong>myminfin.be</strong></li>
            <li>De TOB te betalen vóór de 20ste van de maand volgend op de transactie</li>
          </ul>

          <h2>TOB-aangifte bij buitenlandse broker — hoe?</h2>
          <p>
            Als je via DEGIRO of Trade Republic belegt, moet je maandelijks de TOB zelf aangeven en betalen:
          </p>
          <ol>
            <li>Log in op <strong>myminfin.be</strong></li>
            <li>Ga naar &quot;Mijn belastingen&quot; → &quot;Taks op beursverrichtingen&quot;</li>
            <li>Voer per transactie het bedrag, de datum en het type effect in</li>
            <li>Betaal voor de 20ste van de volgende maand</li>
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
