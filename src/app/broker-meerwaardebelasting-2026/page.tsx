import type { Metadata } from 'next'
import Link from 'next/link'
import { brokers } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'

export const metadata: Metadata = {
  title: 'Meerwaardebelasting en Brokers 2026 — Wie regelt het automatisch?',
  description:
    'Overzicht van welke Belgische broker de meerwaardebelasting (10%) automatisch inhoudt in 2026 en wat dit betekent voor jouw beleggingsstrategie.',
  openGraph: {
    title: 'Meerwaardebelasting 2026 — Welke broker regelt het?',
    url: 'https://www.bestebroker.be/broker-meerwaardebelasting-2026',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/broker-meerwaardebelasting-2026' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wanneer gaat de meerwaardebelasting in voege in België?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De Belgische meerwaardebelasting van 10% op financiële vermogenswinsten treedt in werking in 2026. De exacte inwerkingtreding hangt af van de definitieve wetgeving die nog in parlementaire behandeling is.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoeveel bedraagt de vrijstelling voor de meerwaardebelasting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De jaarlijkse vrijstelling bedraagt €10.000 per persoon. Op de winst boven dit bedrag betaal je 10% belasting. Verliezen kunnen worden verrekend.',
      },
    },
    {
      '@type': 'Question',
      name: 'Regelt mijn broker de meerwaardebelasting voor mij?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Belgische brokers zoals Saxo Bank en Bolero (v.a. juni 2026) houden de belasting automatisch in bij verkoop. Buitenlandse brokers zoals DEGIRO en Trade Republic doen dit niet — jij moet dan zelf aangifte doen.',
      },
    },
  ],
}

export default function MeerwaardebelastingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Beste broker België', href: '/beste-broker-belgie' }, { label: 'Meerwaardebelasting 2026' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Meerwaardebelasting 2026 en brokers — wie regelt het voor jou?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            In 2026 voert België een vermogenswinstaanslag in van 10% op financiële meerwaarden boven €10.000/jaar.
            Dit verandert de vergelijking tussen Belgische en buitenlandse brokers fundamenteel.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        {/* Broker table */}
        <section className="mb-10 card">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Welke broker regelt de meerwaardebelasting?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left border-b border-gray-100">
                <tr>
                  <th className="pb-3 font-semibold">Broker</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold text-center">MWB automatisch</th>
                  <th className="pb-3 font-semibold">Opmerking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {brokers.map(broker => (
                  <tr key={broker.id}>
                    <td className="py-3">
                      <Link href={`/reviews/${broker.slug}`} className="font-semibold text-primary hover:text-accent">
                        {broker.name}
                      </Link>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${broker.type === 'belgisch' ? 'bg-green-100 text-success' : 'bg-orange-100 text-orange-700'}`}>
                        {broker.type}
                      </span>
                    </td>
                    <td className="py-3 text-center text-xl">
                      {broker.taxes.capitalGainsTax ? '✅' : '❌'}
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {broker.id === 'bolero' && 'Automatisch v.a. 1 juni 2026'}
                      {broker.id === 'saxo' && 'Automatisch vanaf inwerkingtreding'}
                      {broker.id === 'medirect' && 'Verifieer actuele status bij MeDirect'}
                      {broker.id === 'degiro' && 'Zelf aangifte doen vereist'}
                      {broker.id === 'trade-republic' && 'Zelf aangifte doen vereist'}
                      {broker.id === 'keytrade' && 'Automatisch afgehandeld'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          <p className="text-xs text-amber-700 mt-4 flex items-start gap-1.5 border-t border-gray-100 pt-3">
            <span className="flex-shrink-0">⚠</span>
            <span>
              <strong>Let op:</strong> de €10.000 vrijstelling wordt <em>niet automatisch</em> verrekend
              bij bronheffing. Claim dit zelf via de belastingaangifte. Meerwaarden van
              1 jan t.e.m. 31 mei 2026 moet iedereen zelf aangeven — ook bij Belgische brokers.
            </span>
          </p>
          </div>
        </section>

        {/* Explanation */}
        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat is de meerwaardebelasting?</h2>
          <p>
            De meerwaardebelasting is een belasting van <strong>10%</strong> op de netto vermogenswinst die je realiseert
            bij de verkoop van financiële activa (aandelen, ETFs, obligaties).
            De eerste <strong>€10.000 aan jaarlijkse winst</strong> is vrijgesteld.
          </p>

          <h3>Voorbeeld</h3>
          <p>
            Stel: je verkoopt je ETF-positie met een gerealiseerde winst van €35.000 in 2026.
          </p>
          <ul>
            <li>Vrijstelling: €10.000</li>
            <li>Belastbaar: €35.000 − €10.000 = €25.000</li>
            <li>Te betalen: 10% × €25.000 = <strong>€2.500</strong></li>
          </ul>

          <h3>Waarom kies je best een broker die dit automatisch regelt?</h3>
          <p>
            Als je belegt via een buitenlandse broker (DEGIRO, Trade Republic), ben jij verantwoordelijk voor:
          </p>
          <ul>
            <li>Bijhouden van alle aan- en verkooptransacties</li>
            <li>Berekenen van de netto vermogenswinst</li>
            <li>Aangifte doen in de personenbelasting</li>
            <li>Betaling van de belasting</li>
          </ul>
          <p>
            Belgische brokers doen dit automatisch voor jou. Geen Excel, geen aangifte — gewoon beleggen.
          </p>

          <h2>Veelgestelde vragen</h2>

          <h3>Wanneer gaat de meerwaardebelasting in voege?</h3>
          <p>
            De verwachte inwerkingtreding is <strong>2026</strong>. De exacte datum hangt af van de definitieve
            parlementaire goedkeuring. De informatie op deze pagina wordt bijgehouden zodra er een definitieve
            datum is. <LastUpdated date="2026-04-01" label="Laatste controle" />
          </p>

          <h3>Geldt de vrijstelling per persoon of per huishouden?</h3>
          <p>
            Per persoon. Twee partners kunnen elk €10.000 vrijstelling claimen als ze elk een eigen rekening hebben.
          </p>

          <h3>Telt een niet-gerealiseerde meerwaarde mee?</h3>
          <p>
            Nee. Enkel <em>gerealiseerde</em> meerwaarden (bij verkoop) zijn belastbaar. Zolang je je ETFs niet verkoopt,
            betaal je geen meerwaardebelasting.
          </p>

          <h3>Kan ik de vrijstelling doorschuiven als ik die niet volledig gebruik?</h3>
          <p>
            Ja. Ongebruikte vrijstelling mag je jaarlijks voor €1.000 doorschuiven,
            met een cumulatief maximum van €5.000 extra. Na 5 jaar niet volledig benutten
            kan jouw totale jaarlijkse vrijstelling €15.000 bedragen.
          </p>
        </div>

        {/* Related links */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/beste-broker-belgie', label: 'Beste broker vergelijking', sub: 'Alle brokers vergeleken' },
            { href: '/belgie/meerwaardebelasting-broker', label: 'Meerwaardebelasting uitgelegd', sub: 'Uitgebreide fiscale uitleg' },
            { href: '/belgie/tob-uitleg', label: 'TOB uitgelegd', sub: 'Taks op beursverrichtingen' },
            { href: '/tools/brokerkosten-calculator', label: 'Kostencalculator', sub: 'Bereken de impact op jouw portefeuille' },
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
