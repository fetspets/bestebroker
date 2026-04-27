import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'

export const metadata: Metadata = {
  title: 'Meerwaardebelasting in België — Uitleg voor Beleggers 2026',
  description:
    'Alles over de Belgische meerwaardebelasting (10%) voor beleggers in 2026: vrijstelling €10K, wie moet aangifte doen, welke broker regelt het automatisch.',
  openGraph: {
    title: 'Meerwaardebelasting België voor Beleggers 2026',
    url: 'https://www.bestebroker.be/belgie/meerwaardebelasting-broker',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/belgie/meerwaardebelasting-broker' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hoeveel bedraagt de meerwaardebelasting in België?',
      acceptedAnswer: { '@type': 'Answer', text: '10% op netto vermogenswinst boven een vrijstelling van €10.000 per jaar per persoon.' },
    },
    {
      '@type': 'Question',
      name: 'Geldt de meerwaardebelasting ook voor ETFs?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja. Accumulerende ETFs (die geen dividend uitkeren) vallen ook onder de meerwaardebelasting bij realisatie van winst.' },
    },
    {
      '@type': 'Question',
      name: 'Kan ik verliezen verrekenen met de meerwaardebelasting?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja. Gerealiseerde verliezen kunnen worden verrekend met gerealiseerde winsten binnen hetzelfde belastingjaar.' },
    },
    {
      '@type': 'Question',
      name: 'Moet ik de meerwaardebelasting zelf aangeven?',
      acceptedAnswer: { '@type': 'Answer', text: 'Belgische brokers (Saxo, Bolero) houden de 10% automatisch in bij verkoop (vanaf 1 juni 2026). De €10.000 vrijstelling en eventuele carry-forward moet je echter altijd zelf claimen via de jaarlijkse belastingaangifte. Bij buitenlandse brokers (DEGIRO, Trade Republic) ben je ook voor de berekening en betaling zelf verantwoordelijk.' },
    },
  ],
}

export default function MeerwaardebelastingBrokerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'België fiscaal', href: '/beste-broker-belgie' }, { label: 'Meerwaardebelasting' }])) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'België fiscaal', href: '/beste-broker-belgie' }, { label: 'Meerwaardebelasting' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Meerwaardebelasting in België — alles wat beleggers moeten weten
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Vanaf 2026 betalen Belgische beleggers 10% belasting op gerealiseerde vermogenswinsten boven
            €10.000 per jaar. Wij leggen uit hoe het werkt, wat je zelf moet doen en welke broker dit automatisch regelt.
          </p>
          <LastUpdated date="2026-04-01" />
          <p className="text-xs text-orange-600 mt-1">⚠ De wetgeving is nog in finalisatiefase. Controleer altijd de meest recente officiële bronnen.</p>
        </header>

        {/* Key facts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Tarief', value: '10%', sub: 'op netto vermogenswinst' },
            { label: 'Vrijstelling', value: '€10.000', sub: 'per persoon per jaar' },
            { label: 'Inwerkingtreding', value: '2026', sub: 'exacte datum nog te bevestigen' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="card text-center">
              <p className="text-3xl font-bold text-accent font-display">{value}</p>
              <p className="font-semibold text-primary mt-1">{label}</p>
              <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat is de meerwaardebelasting?</h2>
          <p>
            De meerwaardebelasting is een belasting van <strong>10%</strong> op de netto
            <em> gerealiseerde</em> vermogenswinst die je maakt bij de verkoop van financiële activa:
            aandelen, ETFs, obligaties en andere effecten.
          </p>
          <p>
            <strong>Gerealiseerd</strong> betekent: enkel als je verkoopt. Zolang je je ETF aanhoudt,
            betaal je geen meerwaardebelasting — ook al is de waarde gestegen.
          </p>

          <h2>De vrijstelling van €10.000</h2>
          <p>
            De eerste €10.000 aan netto vermogenswinst per jaar per persoon is vrijgesteld.
            Twee partners met elk een eigen rekening kunnen elk €10.000 vrijstelling benutten.
          </p>

          <h3>Rekenvoorbeeld</h3>
          <div className="not-prose bg-gray-50 rounded-xl p-4 my-4 text-sm">
            <p className="font-semibold text-primary mb-2">Situatie: je verkoopt ETFs met €25.000 winst in 2026</p>
            <div className="space-y-1 text-gray-700">
              <div className="flex justify-between"><span>Gerealiseerde winst:</span><span className="font-medium">€25.000</span></div>
              <div className="flex justify-between"><span>Vrijstelling:</span><span className="font-medium text-success">- €10.000</span></div>
              <div className="flex justify-between border-t border-gray-200 pt-1 mt-1"><span>Belastbare winst:</span><span className="font-medium">€15.000</span></div>
              <div className="flex justify-between font-bold"><span>Te betalen (10%):</span><span className="text-danger">€1.500</span></div>
            </div>
          </div>

          <h3>Carry-forward: ongebruikte vrijstelling doorschuiven</h3>
          <p>
            Als je de €10.000 vrijstelling in een bepaald jaar <em>niet volledig benut</em>, mag je
            jaarlijks <strong>€1.000 doorschuiven</strong> naar volgende jaren, met een cumulatief maximum
            van <strong>€5.000</strong>. Na 5 jaar kan jouw totale jaarlijkse vrijstelling dus oplopen
            tot <strong>€15.000</strong>.
          </p>
          <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-4 my-4 text-sm">
            <p className="font-semibold text-amber-800 mb-1">⚠ Vrijstelling is niet automatisch — actie vereist</p>
            <p className="text-amber-900 leading-relaxed">
              De €10.000 vrijstelling (en eventuele carry-forward) wordt <strong>niet automatisch
              verrekend door de broker</strong>. Ook als jouw broker bronheffing inhoudt (zoals Saxo of Bolero),
              moet je de vrijstelling <strong>zelf claimen via jouw jaarlijkse belastingaangifte</strong>.
              De broker houdt 10% in op het volledige winstbedrag — de vrijstelling wordt achteraf
              teruggestort via de aangifte.
            </p>
          </div>

          <h2>Verliesverrekening</h2>
          <p>
            Gerealiseerde verliezen kunnen worden verrekend met gerealiseerde winsten <strong>binnen
            hetzelfde belastingjaar</strong>. Verliezen overdragen naar een volgend jaar is (in het huidige
            voorstel) niet mogelijk.
          </p>

          <h2>Welke assets vallen eronder?</h2>
          <ul>
            <li>✅ Aandelen</li>
            <li>✅ Accumulerende ETFs</li>
            <li>✅ Distribuerende ETFs</li>
            <li>✅ Obligaties (de meerwaarde, niet de rente)</li>
            <li>❓ Cryptomunten — nog te bevestigen in definitieve wetgeving</li>
            <li>❌ Vastgoed — valt onder ander stelsel</li>
          </ul>

          <h2>Welke broker regelt dit voor mij?</h2>
          <p>
            Belgische brokers zoals <strong>Saxo Bank</strong> en <strong>Bolero</strong> (v.a. juni 2026)
            houden de meerwaardebelasting automatisch in bij elke verkoop — net zoals ze TOB inhouden.
            Jij hoeft niets te doen.
          </p>
          <p>
            Buitenlandse brokers zoals <strong>DEGIRO</strong> en <strong>Trade Republic</strong> doen dit
            niet. Jij bent dan zelf verantwoordelijk voor de berekening en aangifte in de personenbelasting.
          </p>
          <p>
            <Link href="/broker-meerwaardebelasting-2026" className="text-accent hover:underline">
              → Bekijk het overzicht van welke broker wat regelt
            </Link>
          </p>

          <h2>Overgangsperiode: 1 januari – 31 mei 2026</h2>
          <div className="not-prose bg-orange-50 border border-orange-200 rounded-xl p-4 my-4 text-sm">
            <p className="font-semibold text-orange-800 mb-1">📅 Geen automatische inhouding vóór 1 juni 2026</p>
            <p className="text-orange-900 leading-relaxed">
              Zelfs Belgische brokers zoals Saxo en Bolero starten de automatische bronheffing pas op{' '}
              <strong>1 juni 2026</strong>. Meerwaarden gerealiseerd tussen 1 januari en 31 mei 2026 moet{' '}
              <strong>elke belegger zelf aangeven</strong> in de personenbelasting — ongeacht welke broker
              je gebruikt.
            </p>
          </div>

          <h2>Veelgestelde vragen</h2>

          <h3>Moet ik meerwaardebelasting betalen als ik nooit verkoop?</h3>
          <p>
            Nee. De belasting is enkel verschuldigd op <em>gerealiseerde</em> winsten. Als je buy-and-hold
            belegt en nooit verkoopt, betaal je geen meerwaardebelasting. Bij overlijden gaat de portefeuille
            over via de erfenis — maar dat valt buiten dit artikel.
          </p>

          <h3>Wat als ik minder dan €10.000 winst per jaar maak?</h3>
          <p>
            Dan betaal je geen meerwaardebelasting. De vrijstelling van €10.000 geldt per jaar.
          </p>

          <h3>Is de Reynders-taks hetzelfde als de meerwaardebelasting?</h3>
          <p>
            Nee. De <strong>Reynders-taks</strong> is een bestaande belasting (30%) op de
            rentegerelateerde component bij verkoop van beleggingsfondsen met obligatiedeel.
            De <strong>meerwaardebelasting</strong> is de nieuwe 10%-belasting op alle vermogenswinsten.
            Ze bestaan naast elkaar.
          </p>

          <h2>Geldt de meerwaardebelasting ook voor crypto?</h2>
          <p>
            Ja. In de definitieve wetgeving (goedgekeurd op <strong>3 april 2026</strong>) vallen
            crypto-activa expliciet onder de meerwaardebelasting van 10%. De vrijstelling van
            €10.000 geldt ook hier.
          </p>
          <p>
            Praktisch verschil met effecten: <strong>geen enkele cryptobeurs of -broker voorziet
            momenteel automatische bronheffing</strong> voor Belgische klanten. Je bent dus altijd
            zelf verantwoordelijk voor het berekenen en aangeven van cryptomeerwaarden — ook na 1 juni 2026.
          </p>
          <p className="text-sm text-gray-500">
            Let op: cryptoverliezen zijn verrekenbaar met cryptowinsten binnen hetzelfde belastingjaar,
            maar <em>niet</em> met verliezen op gewone effecten (en omgekeerd).
          </p>
        </div>

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/broker-meerwaardebelasting-2026', label: 'Welke broker regelt de MWB?', sub: 'Overzicht per broker' },
            { href: '/belgie/tob-uitleg', label: 'TOB uitgelegd', sub: 'De taks op beursverrichtingen' },
            { href: '/beste-broker-belgie', label: 'Beste broker vergelijking', sub: 'Alle brokers naast elkaar' },
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
