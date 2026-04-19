import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { LastUpdated } from '@/components/ui/LastUpdated'

export const metadata: Metadata = {
  title: 'Meerwaardebelasting 2026 — Alles voor Belgische beleggers',
  description:
    'Meerwaardebelasting 2026 uitgelegd voor Belgische beleggers: 10% op meerwaarden, €10.000 vrijstelling, welke broker regelt het automatisch en wat is de praktische impact.',
  openGraph: {
    title: 'Meerwaardebelasting 2026 — Alles wat Belgische beleggers moeten weten',
    description: 'Wat is de meerwaardebelasting 2026, hoe werkt de €10.000 vrijstelling, en welke broker regelt het automatisch? Alles uitgelegd voor Belgische beleggers.',
    url: 'https://bestebroker.be/belgie/meerwaardebelasting-2026-uitleg',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/belgie/meerwaardebelasting-2026-uitleg' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wat is de meerwaardebelasting 2026 in België?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vanaf 1 januari 2026 geldt een meerwaardebelasting van 10% op gerealiseerde meerwaarden op financiële activa (aandelen, ETFs, obligaties, crypto) boven een jaarlijkse vrijstelling van €10.000. De eerste €10.000 meerwaarde per jaar is belastingvrij.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welke broker regelt de meerwaardebelasting automatisch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Belgische brokers zoals Saxo Bank, Bolero en MeDirect regelen de meerwaardebelasting automatisch: ze houden de 10% in bij verkoop (boven de vrijstelling) en storten dit door aan de Belgische belastingdienst. Buitenlandse brokers zoals DEGIRO en Trade Republic doen dit niet — jij moet zelf aangifte doen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Geldt de meerwaardebelasting ook op ETFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, de meerwaardebelasting geldt ook op ETFs bij verkoop. De €10.000 vrijstelling geldt per belastingplichtige per jaar, voor alle financiële activa samen. Dividenden vallen niet onder de meerwaardebelasting (die vallen al onder de roerende voorheffing van 30%).',
      },
    },
    {
      '@type': 'Question',
      name: 'Kan ik verliezen aftrekken van de meerwaardebelasting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, verliezen die je realiseert in hetzelfde belastingjaar kunnen worden verrekend met meerwaarden. Stel je realiseert €15.000 meerwaarde en €3.000 verlies, dan is je netto meerwaarde €12.000 — boven de vrijstelling van €10.000 betaal je 10% op €2.000 = €200.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat als ik meerdere brokers gebruik?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De €10.000 vrijstelling geldt voor al je transacties samen, niet per broker. Als je meerdere brokers gebruikt, moet je zelf (of via een boekhouder) de totale meerwaarde berekenen en aangeven als je ook bij buitenlandse brokers belegt.',
      },
    },
  ],
}

const breadcrumbs = breadcrumbJsonLd([
  { label: 'België', href: '/belgie/tob-uitleg' },
  { label: 'Meerwaardebelasting 2026' },
])

export default function MeerwaardebelastingUitlegPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'België', href: '/belgie/tob-uitleg' }, { label: 'Meerwaardebelasting 2026' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Meerwaardebelasting 2026 — Alles wat Belgische beleggers moeten weten
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Vanaf 1 januari 2026 geldt in België een meerwaardebelasting op financiële activa.
            We leggen uit wat het precies betekent, hoeveel je betaalt, welke vrijstellingen gelden
            en hoe je broker dit (al dan niet) regelt.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        {/* Kernpunten */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-3xl font-bold text-accent mb-1">10%</p>
            <p className="text-sm text-gray-600">Belastingtarief op meerwaarden</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-accent mb-1">€10.000</p>
            <p className="text-sm text-gray-600">Jaarlijkse vrijstelling per persoon</p>
          </div>
          <div className="card text-center">
            <p className="text-xl font-bold text-primary mb-1">Automatisch</p>
            <p className="text-sm text-gray-600">Bij Belgische brokers (Saxo, Bolero, MeDirect)</p>
          </div>
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat is de meerwaardebelasting?</h2>
          <p>
            De meerwaardebelasting (officieel: de &quot;taks op meerwaarden op financiële activa&quot;) is een
            Belgische belasting van <strong>10%</strong> op de gerealiseerde meerwaarde die je behaalt
            bij de verkoop van financiële activa: aandelen, ETFs, obligaties, fondsen, crypto, etc.
          </p>
          <p>
            De belasting geldt enkel op <strong>gerealiseerde meerwaarden</strong> — dus enkel wanneer je
            effectief verkoopt. Zolang je je ETFs bijhoudt, betaal je niets.
          </p>

          <h2>De €10.000 vrijstelling</h2>
          <p>
            De eerste <strong>€10.000 meerwaarde per jaar</strong> is belastingvrij. Dit geldt per
            belastingplichtige en voor alle financiële activa samen.
          </p>
          <p>
            Praktisch voorbeeld:
          </p>
          <ul>
            <li>Je verkoopt ETFs met een meerwaarde van €8.000 → <strong>geen belasting</strong> (onder vrijstelling)</li>
            <li>Je verkoopt ETFs met een meerwaarde van €14.000 → <strong>10% op €4.000 = €400 belasting</strong></li>
            <li>Je verkoopt ETFs met een meerwaarde van €50.000 → <strong>10% op €40.000 = €4.000 belasting</strong></li>
          </ul>

          <h2>Verrekening van verliezen</h2>
          <p>
            Verliezen die je realiseert in hetzelfde belastingjaar worden verrekend met je meerwaarden.
          </p>
          <ul>
            <li>Meerwaarde: +€15.000</li>
            <li>Verlies: -€3.000</li>
            <li>Netto meerwaarde: €12.000</li>
            <li>Belastbaar bedrag: €12.000 - €10.000 vrijstelling = €2.000</li>
            <li>Te betalen belasting: 10% × €2.000 = <strong>€200</strong></li>
          </ul>
          <p>
            Verliezen uit voorgaande jaren kunnen <em>niet</em> worden overgedragen naar het volgende jaar.
          </p>

          <h2>Welke activa vallen onder de meerwaardebelasting?</h2>
          <ul>
            <li>✅ Aandelen (Belgisch en buitenlands)</li>
            <li>✅ ETFs en indexfondsen</li>
            <li>✅ Obligaties</li>
            <li>✅ Cryptomunten</li>
            <li>✅ Opties en derivaten</li>
            <li>❌ Vastgoed (daar geldt een aparte regeling)</li>
            <li>❌ Dividenden (belast via roerende voorheffing 30%)</li>
            <li>❌ Rente-inkomsten (belast via roerende voorheffing)</li>
          </ul>

          <h2>Welke broker regelt het automatisch?</h2>
          <p>
            Dit is de meest praktisch relevante vraag voor Belgische beleggers. Er zijn twee categorieën:
          </p>

          <h3>✅ Belgische brokers — automatische inhouding</h3>
          <p>
            Belgische brokers houden de meerwaardebelasting automatisch in bij verkoop en storten dit door
            aan de belastingdienst. Jij moet niets extra doen:
          </p>
          <ul>
            <li><strong>Saxo Bank</strong> — volledig automatisch, inclusief meerwaardebelasting</li>
            <li><strong>Bolero</strong> — automatisch vanaf 1 juni 2026 (controleer actuele datum)</li>
            <li><strong>MeDirect</strong> — automatisch (verifieer status voor 2026)</li>
            <li><strong>Keytrade Bank</strong> — automatisch</li>
          </ul>
          <p>
            Let op: de vrijstelling van €10.000 houdt je broker bij <em>per transactie via jouw account</em>.
            Als je bij meerdere Belgische brokers belegt, heb je kans dat de vrijstelling dubbel wordt
            toegepast. De eindafrekening via de belastingaangifte corrigeert dit.
          </p>

          <h3>❌ Buitenlandse brokers — zelf aangifte doen</h3>
          <p>
            Bij buitenlandse brokers ben je <strong>zelf verantwoordelijk</strong> voor de berekening
            en aangifte van de meerwaardebelasting:
          </p>
          <ul>
            <li><strong>DEGIRO</strong> — geen automatische inhouding, zelf aangifte</li>
            <li><strong>Trade Republic</strong> — geen automatische inhouding, zelf aangifte</li>
          </ul>
          <p>
            Dit betekent: bij elke verkoop bijhouden wat je betaald hebt, de meerwaarde berekenen,
            optellen over het jaar, en via de belastingaangifte aangifte doen. Dit is tijdrovend en
            foutgevoelig — zeker als je frequent handelt of met meerdere instrumenten werkt.
          </p>
          <p>
            Meer info over buitenlandse brokers en fiscale verplichtingen:{' '}
            <Link href="/belgie/buitenlandse-broker-nbb-aangifte" className="text-accent underline">
              Buitenlandse broker: NBB-aangifte en fiscale verplichtingen
            </Link>.
          </p>

          <h2>Impact op buy-and-hold beleggers</h2>
          <p>
            Voor typische buy-and-hold ETF-beleggers valt de impact mee:
          </p>
          <ul>
            <li>Je verkoopt zelden (soms jaren niet) → weinig gerealiseerde meerwaarden</li>
            <li>De vrijstelling van €10.000/jaar dekt de meeste kleine beleggers volledig</li>
            <li>Bij rebalancering of opname in pensioen: plan je verkopen om de vrijstelling optimaal te benutten</li>
          </ul>
          <p>
            Praktische tip: overweeg je meerwaarden te spreiden over meerdere jaren om de vrijstelling
            elk jaar optimaal te benutten.
          </p>

          <h2>Meerwaardebelasting en TOB — niet verwarren</h2>
          <p>
            De meerwaardebelasting is <em>niet</em> hetzelfde als de TOB (taks op beursverrichtingen).
            De TOB (0,12% bij ETFs) betaal je bij elke aankoop én verkoop — ongeacht of je winst maakt.
            De meerwaardebelasting (10%) betaal je enkel bij verkoop met winst boven €10.000.
          </p>
          <p>
            Meer over TOB:{' '}
            <Link href="/belgie/tob-uitleg" className="text-accent underline">TOB uitgelegd voor Belgische beleggers</Link>.
          </p>

          <h2>Welke broker kies je?</h2>
          <p>
            Gezien de nieuwe meerwaardebelasting raden we sterk aan om voor een Belgische broker te kiezen
            die alles automatisch afhandelt. Zo hoef je nooit zelf berekeningen te maken.
          </p>
          <p>
            Vergelijk alle brokers op hun fiscale afhandeling:{' '}
            <Link href="/broker-meerwaardebelasting-2026" className="text-accent underline">
              Brokers en meerwaardebelasting 2026 — vergelijking
            </Link>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/broker-meerwaardebelasting-2026', label: 'Brokers & meerwaardebelasting vergelijken' },
            { href: '/beste-broker-belgie', label: 'Alle brokers vergelijken' },
            { href: '/belgie/tob-uitleg', label: 'TOB uitgelegd' },
            { href: '/belgie/etf-kopen-beginners', label: 'ETF kopen in België — beginnersgids' },
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
