import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { LastUpdated } from '@/components/ui/LastUpdated'

export const metadata: Metadata = {
  title: 'Pensioensparen of ETF beleggen? Wat is beter?',
  description:
    'Pensioensparen of ETF beleggen als Belg in 2026? Vergelijking fiscaal voordeel, rendement, risico en wie voor wat kiest. Inclusief combinatiestrategie.',
  openGraph: {
    title: 'Pensioensparen of ETF beleggen? Wat is beter voor Belgen?',
    description: 'Vergelijking van pensioensparen en ETF beleggen voor Belgische beleggers: fiscaal voordeel, rendement en de optimale combinatiestrategie.',
    url: 'https://www.bestebroker.be/belgie/pensioensparen-vs-etf',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/belgie/pensioensparen-vs-etf' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is pensioensparen of ETF beleggen beter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dat hangt af van je situatie. Pensioensparen geeft een belastingvoordeel van 25–30% op je inleg (max. €1.020/jaar), maar je geld is geblokkeerd tot 60 jaar. ETF beleggen geeft meer flexibiliteit en potentieel hoger rendement, maar biedt geen fiscaal voordeel. De optimale strategie voor de meeste Belgen: combineer beide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoeveel belastingvoordeel geeft pensioensparen in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Je kiest tussen twee grenzen: max. €1.020 inleggen met 30% belastingvoordeel (= €306 terug), of max. €1.310 inleggen met 25% voordeel (= €327,50 terug). De hogere grens is vrijwel altijd voordeliger als je €1.164 of meer spaart.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kan ik pensioensparen combineren met ETF beleggen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absoluut. De meest optimale strategie voor Belgische beleggers is: maximaliseer eerst je pensioensparen (€1.310 voor maximale belastingbesparing), en beleg daarna het resterende spaarbedrag in een breed gespreide ETF via een broker als Saxo of MeDirect.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat gebeurt er met mijn pensioensparen bij 60 jaar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Op je 60e verjaardag wordt een eindbelasting geheven van 8% (anticipatieve heffing). Daarna kun je verder sparen belastingvrij tot 64 jaar en opnemen wanneer je wil. De netto-opbrengst na deze belasting is doorgaans nog steeds beter dan zonder pensioensparen.',
      },
    },
  ],
}

const breadcrumbs = breadcrumbJsonLd([
  { label: 'België', href: '/belgie/tob-uitleg' },
  { label: 'Pensioensparen vs ETF' },
])

export default function PensioenspaarenVsEtfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'België', href: '/belgie/tob-uitleg' }, { label: 'Pensioensparen vs ETF' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Pensioensparen of ETF beleggen? Wat is beter voor Belgen? (2026)
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Pensioensparen geeft een fiscaal voordeel, maar beperkte flexibiliteit. ETF beleggen biedt hogere
            rendementen en vrijheid, maar geen fiscaal aftrekpost. Moet je kiezen, of kun je beide combineren?
            Wij leggen het eerlijk uit.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        {/* Vergelijking overzicht */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="card border-l-4 border-l-blue-500">
            <p className="text-xs font-semibold text-blue-600 mb-1">Pensioensparen</p>
            <p className="font-display font-bold text-primary text-lg">Fiscaal voordeel + beperkte flexibiliteit</p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>✅ 25–30% belastingvoordeel op inleg</li>
              <li>✅ Lage risicoproducten beschikbaar</li>
              <li>❌ Geblokkeerd tot 60 jaar</li>
              <li>❌ Beperkt rendement (1–4% historisch)</li>
            </ul>
          </div>
          <div className="card border-l-4 border-l-green-500">
            <p className="text-xs font-semibold text-green-600 mb-1">ETF beleggen</p>
            <p className="font-display font-bold text-primary text-lg">Hoog rendement + volledige flexibiliteit</p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>✅ Historisch rendement: 7–9% per jaar</li>
              <li>✅ Opnemen wanneer je wil</li>
              <li>❌ Geen belastingvoordeel op inleg</li>
              <li>❌ Meerwaardebelasting (10%) vanaf 2026</li>
            </ul>
          </div>
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Het fiscaal voordeel van pensioensparen</h2>
          <p>
            Pensioensparen is een van de weinige fiscale aftrekposten die de Belgische overheid aanbiedt
            aan particulieren. In 2026 kies je tussen twee grenzen:
          </p>
          <ul>
            <li>
              <strong>Grens 1:</strong> max. <strong>€1.020</strong> storten → 30% belastingvoordeel
              = <strong>€306 terug</strong>
            </li>
            <li>
              <strong>Grens 2:</strong> max. <strong>€1.310</strong> storten → 25% belastingvoordeel
              = <strong>€327,50 terug</strong>
            </li>
          </ul>
          <p>
            Als je meer dan €1.164 per jaar spaart, is de hogere grens (€1.310) altijd voordeliger.
            Let op: stort je €1.021–€1.163, kies dan de lagere grens (anders daalt je voordeel).
          </p>

          <h2>Het nadeel: geblokkeerd geld</h2>
          <p>
            Pensioensparen is gebonden. Je kunt het geld niet opnemen vóór je 60e jaar zonder een
            <strong> fiscale sanctie van 33%</strong> op het opgenomen bedrag. Dit maakt pensioensparen
            ongeschikt als flexibel spaarmiddel.
          </p>
          <p>
            Op je 60e verjaardag wordt automatisch een <strong>eindbelasting van 8%</strong> geheven
            (de &quot;anticipatieve heffing&quot;). Daarna kun je het contract laten lopen en belastingvrij opnemen.
          </p>

          <h2>ETF beleggen: hoger rendement, meer vrijheid</h2>
          <p>
            Een breed gespreide ETF zoals VWCE of IWDA heeft historisch gezien een gemiddeld
            jaarlijks rendement behaald van <strong>7–9% per jaar</strong> (voor kosten en inflatie).
            Ter vergelijking: pensioenspaarfondsen behalen gemiddeld 1–4% per jaar.
          </p>
          <p>
            ETF beleggen is volledig flexibel: je kunt op elk moment geld opnemen, bijleggen of stoppen.
            Er is geen contractuele verbintenis.
          </p>
          <p>
            Nadeel vanaf 2026: de <strong>meerwaardebelasting van 10%</strong> op gerealiseerde meerwaarden
            boven €10.000 per jaar. Meer info:{' '}
            <Link href="/belgie/meerwaardebelasting-2026-uitleg" className="text-accent underline">
              Meerwaardebelasting 2026 uitgelegd
            </Link>.
          </p>

          <h2>Rendementsvergelijking: pensioensparen vs ETF</h2>
          <p>
            Stel: je spaart 30 jaar lang €1.310/jaar. Je belastingvoordeel is elk jaar €327,50.
            Als we dat voordeel herberekenen als rendement bovenop de fondsprestatie:
          </p>
          <ul>
            <li>
              <strong>Pensioenspaarfonds</strong> (4% historisch): eindkapitaal ±€78.000 + belastingvoordeel
              over 30 jaar ±€9.825
            </li>
            <li>
              <strong>ETF (7% historisch)</strong>: eindkapitaal ±€132.000 (na 10% MWB op meerwaarden)
            </li>
          </ul>
          <p>
            Op lange termijn wint ETF beleggen puur op rendement. Maar het belastingvoordeel van
            pensioensparen (tot €9.825 over 30 jaar) is niet niks — zeker als je het zelf belegt.
          </p>

          <h2>De optimale combinatiestrategie</h2>
          <p>
            De meeste financieel adviseurs raden een combinatie aan. Onze aanbeveling:
          </p>
          <ol>
            <li>
              <strong>Maximaliseer pensioensparen (€1.310/jaar)</strong> — zeker als je in de hoogste
              belastingschijf zit. Het belastingvoordeel is gegarandeerd rendement.
            </li>
            <li>
              <strong>Beleg de rest in ETFs</strong> — via een Belgische broker die de belastingen
              automatisch afhandelt. Zo combineer je het fiscale voordeel van pensioensparen met het
              hogere rendementspotentieel van ETFs.
            </li>
            <li>
              <strong>Bouw een noodfonds</strong> — houd minstens 3–6 maanden uitgaven liquide voor
              noodgevallen. Beleg enkel geld dat je minstens 10 jaar kunt missen.
            </li>
          </ol>

          <h2>Voor wie is pensioensparen alleen beter?</h2>
          <p>
            Pensioensparen alleen (zonder ETFs) is zinvol als:
          </p>
          <ul>
            <li>Je niet comfortabel bent met beursvolatiliteit</li>
            <li>Je een heel korte beleggingshorizon hebt (minder dan 10 jaar)</li>
            <li>Je al in hoge belastingschijven zit en het voordeel maximaal is</li>
          </ul>

          <h2>Voor wie is ETF beleggen alleen beter?</h2>
          <p>
            ETF beleggen zonder pensioensparen is beter als:
          </p>
          <ul>
            <li>Je flexibiliteit prioritair stelt (bijv. je plant een vroegpensioen vóór 60)</li>
            <li>Je al maximale andere fiscale aftrekposten benut</li>
            <li>Je een lange beleggingshorizon hebt (20+ jaar) en hogere risicotolerantie</li>
          </ul>

          <h2>Via welke broker beleg je in ETFs?</h2>
          <p>
            Voor ETF beleggen naast pensioensparen raden we aan:
          </p>
          <ul>
            <li>
              <strong>Saxo Bank</strong> — automatisch beleggen via AutoInvest voor €2/maand.{' '}
              <Link href="/reviews/saxo-bank-belgie" className="text-accent underline">Saxo review</Link>
            </li>
            <li>
              <strong>MeDirect</strong> — gratis ETF-transacties, ideaal als je handmatig bijlegt.{' '}
              <Link href="/reviews/medirect" className="text-accent underline">MeDirect review</Link>
            </li>
          </ul>
          <p>
            Alle brokers vergelijken:{' '}
            <Link href="/beste-broker-belgie" className="text-accent underline">Beste broker België 2026</Link>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/belgie/etf-kopen-beginners', label: 'Hoe koop je een ETF in België?' },
            { href: '/beste-broker-belgie', label: 'Alle brokers vergelijken' },
            { href: '/belgie/meerwaardebelasting-2026-uitleg', label: 'Meerwaardebelasting 2026' },
            { href: '/belgie/vwce-vs-iwda', label: 'VWCE vs IWDA — welke ETF?' },
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
