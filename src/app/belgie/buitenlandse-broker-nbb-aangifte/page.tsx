import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'

export const metadata: Metadata = {
  title: 'NBB-Aangifte Buitenlandse Broker — Hoe en Wanneer? (2026)',
  description:
    'Als je belegt via DEGIRO of Trade Republic moet je jaarlijks een buitenlandse rekening aangeven bij de NBB. Wij leggen stap voor stap uit hoe dat werkt.',
  openGraph: {
    title: 'NBB-aangifte buitenlandse broker 2026',
    url: 'https://bestebroker.be/belgie/buitenlandse-broker-nbb-aangifte',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/belgie/buitenlandse-broker-nbb-aangifte' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Moet ik een buitenlandse brokerrekening aangeven in België?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja. Elke Belgische rijksinwoner die een buitenlandse financiële rekening heeft, moet die jaarlijks melden bij de Nationale Bank van België (NBB) via de belastingaangifte.' },
    },
    {
      '@type': 'Question',
      name: 'Hoe doe ik de NBB-aangifte voor DEGIRO?',
      acceptedAnswer: { '@type': 'Answer', text: 'Via uw jaarlijkse belastingaangifte (Tax-on-web): vul de rubriek "buitenlandse rekeningen" in met het rekeningnummer, de naam van de financiële instelling en het land (Nederland voor DEGIRO, Duitsland voor Trade Republic).' },
    },
    {
      '@type': 'Question',
      name: 'Wat zijn de gevolgen als ik de NBB-aangifte vergeet?',
      acceptedAnswer: { '@type': 'Answer', text: 'Een niet-aangifte kan leiden tot boetes en belastingverhogingen. De fiscus kan ook terugvordering doen over meerdere jaren.' },
    },
  ],
}

export default function NbbAangiftePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'België fiscaal', href: '/beste-broker-belgie' }, { label: 'NBB-aangifte buitenlandse broker' }])) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'België fiscaal', href: '/beste-broker-belgie' }, { label: 'NBB-aangifte' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            NBB-aangifte buitenlandse broker — hoe en wanneer?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Als je een rekening hebt bij een buitenlandse broker zoals DEGIRO of Trade Republic,
            ben je wettelijk verplicht die jaarlijks aan te geven bij de Nationale Bank van België.
            Wij leggen uit hoe dat werkt.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-sm text-orange-800">
            <strong>⚠ Disclaimer:</strong> dit is algemene informatie, geen juridisch of fiscaal advies.
            Raadpleeg een belastingadviseur of accountant voor jouw persoonlijke situatie.
          </p>
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Waarom moet ik een buitenlandse rekening aangeven?</h2>
          <p>
            Elke Belgische rijksinwoner met een buitenlandse financiële rekening (inclusief een
            brokerrekening bij DEGIRO of Trade Republic) is verplicht deze te <strong>melden bij de
            Nationale Bank van België (NBB)</strong> en dit aan te geven in de jaarlijkse belastingaangifte.
          </p>
          <p>
            Het doel is transparantie: de Belgische overheid wil weten welke rekeningen haar inwoners
            in het buitenland aanhouden.
          </p>

          <h2>Welke brokers vereisen een NBB-aangifte?</h2>
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            {[
              { broker: 'DEGIRO', land: 'Nederland (Amsterdam)', vereist: true },
              { broker: 'Trade Republic', land: 'Duitsland (Berlijn)', vereist: true },
              { broker: 'Saxo Bank', land: 'Belgisch bijkantoor', vereist: false },
              { broker: 'Bolero', land: 'België (KBC)', vereist: false },
              { broker: 'MeDirect', land: 'België/Malta (Belgische vergunning)', vereist: false },
              { broker: 'Keytrade', land: 'België (Crelan)', vereist: false },
            ].map(({ broker, land, vereist }) => (
              <div key={broker} className={`p-3 rounded-lg border text-sm ${vereist ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <p className="font-semibold">{broker}</p>
                <p className="text-gray-600 text-xs">{land}</p>
                <p className={`font-medium mt-1 ${vereist ? 'text-danger' : 'text-success'}`}>
                  {vereist ? '⚠ NBB-aangifte vereist' : '✓ Geen aangifte nodig'}
                </p>
              </div>
            ))}
          </div>

          <h2>Hoe doe je de NBB-aangifte?</h2>
          <h3>Stap 1: Melden bij de NBB</h3>
          <p>
            Ga naar <strong>myminfin.be</strong> en meld je buitenlandse rekening.
            Je hebt nodig: het IBAN of rekeningnummer, de naam van de financiële instelling en het land.
          </p>

          <h3>Stap 2: Aangifte in de belastingaangifte</h3>
          <p>
            In de jaarlijkse belastingaangifte (Tax-on-web) moet je in <strong>vak XIII</strong>
            aanduiden dat je een buitenlandse rekening hebt en het land van de rekening opgeven.
          </p>

          <h3>Stap 3: Jaarlijks herhalen</h3>
          <p>
            Zolang je de buitenlandse rekening aanhoudt, moet je dit elk jaar opnieuw aangeven.
          </p>

          <h2>Gevolgen van niet-aangifte</h2>
          <p>
            De gevolgen kunnen zwaar zijn:
          </p>
          <ul>
            <li>Boetes van <strong>€6.250</strong> per niet-aangegeven buitenlandse rekening</li>
            <li>Belastingverhoging van 10%</li>
            <li>Mogelijke terugvordering over meerdere jaren</li>
          </ul>

          <h2>Is het de moeite waard om een Belgische broker te kiezen?</h2>
          <p>
            Als je de administratielast van de NBB-aangifte wil vermijden — en tegelijk de TOB-aangifte,
            de roerende voorheffing-aangifte en straks de meerwaardebelasting-aangifte —
            dan is een Belgische broker zoals Saxo of Bolero de eenvoudigste keuze.
            <Link href="/beste-broker-belgie" className="text-accent hover:underline ml-1">Vergelijk alle brokers →</Link>
          </p>
        </div>

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/belgie/tob-uitleg', label: 'TOB uitgelegd', sub: 'Taks op beursverrichtingen' },
            { href: '/belgie/meerwaardebelasting-broker', label: 'Meerwaardebelasting', sub: 'Nieuwe 10%-belasting in 2026' },
            { href: '/reviews/degiro-belgie', label: 'DEGIRO review', sub: 'Alle fiscale valkuilen op een rij' },
            { href: '/beste-broker-belgie', label: 'Beste broker vergelijken', sub: 'Kies een broker die alles voor jou regelt' },
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
