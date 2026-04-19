import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { LastUpdated } from '@/components/ui/LastUpdated'

export const metadata: Metadata = {
  title: 'ETF kopen in België — Stap voor stap (2026)',
  description:
    'ETF kopen als Belgische belegger? Stap-voor-stap gids: wat is een ETF, VWCE of IWDA, hoe koop je via Saxo of Bolero, TOB en je eerste aankoop.',
  openGraph: {
    title: 'ETF kopen in België — Stap voor stap voor beginners (2026)',
    description: 'Stap-voor-stap gids om je eerste ETF te kopen als Belgische belegger: welke ETF, welke broker, en hoe zit het met de TOB.',
    url: 'https://bestebroker.be/belgie/etf-kopen-beginners',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/belgie/etf-kopen-beginners' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Welke ETF is het beste voor Belgische beginners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Voor de meeste Belgische beginners is VWCE (Vanguard FTSE All-World UCITS ETF) of IWDA (iShares Core MSCI World UCITS ETF) een uitstekend startpunt. Beide zijn breed gespreid, accumulerend (geen dividend, dus minder belastingadministratie) en fiscaal efficiënt voor Belgen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoeveel TOB betaal ik op een ETF-aankoop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Op de meeste UCITS ETFs betaal je 0,12% TOB (taks op beursverrichtingen) bij aankoop én bij verkoop. Een Belgische broker zoals Saxo of Bolero regelt dit automatisch. Bij DEGIRO of Trade Republic moet je dit zelf aangifte van doen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat is het verschil tussen VWCE en IWDA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VWCE belegt wereldwijd inclusief opkomende markten (∼90% ontwikkeld, ∼10% emerging markets). IWDA belegt enkel in ontwikkelde landen. VWCE heeft een iets hogere TER (0,22% vs 0,20%) maar biedt bredere spreiding.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welke broker is het beste voor ETFs in België?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Voor beginners raden we Saxo Bank of Bolero aan: beide Belgische brokers regelen TOB, roerende voorheffing en meerwaardebelasting automatisch. MeDirect is gratis voor ETF-transacties maar heeft geen automatisch spaarplan.',
      },
    },
  ],
}

const breadcrumbs = breadcrumbJsonLd([
  { label: 'België', href: '/belgie/tob-uitleg' },
  { label: 'ETF kopen beginners' },
])

export default function EtfKopenBeginnersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'België', href: '/belgie/tob-uitleg' }, { label: 'ETF kopen beginners' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            ETF kopen in België — Stap voor stap voor beginners (2026)
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Je wilt beginnen met beleggen via een ETF, maar weet niet waar te starten. In deze gids leggen we
            uit wat een ETF is, welke je kiest als Belgische belegger, hoe je ze koopt en wat je fiscaal moet weten.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        <div className="prose-custom max-w-3xl">
          <h2>Wat is een ETF?</h2>
          <p>
            Een ETF (<em>Exchange Traded Fund</em>) is een fonds dat je koopt en verkoopt op de beurs, net zoals
            een aandeel. Een ETF bundelt honderden of duizenden individuele aandelen in één instrument. Koop je
            één ETF zoals VWCE, dan beleg je meteen in meer dan 3.700 bedrijven wereldwijd.
          </p>
          <p>
            De grote voordelen van ETFs voor beginners:
          </p>
          <ul>
            <li><strong>Brede spreiding</strong> — één aankoop, duizenden bedrijven</li>
            <li><strong>Lage kosten</strong> — jaarlijkse beheerkosten (TER) van 0,07% tot 0,25%</li>
            <li><strong>Transparantie</strong> — je weet precies wat erin zit</li>
            <li><strong>Belastingvriendelijk</strong> — accumulerende ETFs keren geen dividend uit, wat de fiscale administratie vereenvoudigt</li>
          </ul>

          <h2>Welke ETF kiezen als Belgische belegger?</h2>
          <p>
            Voor de meeste Belgische beginners zijn er twee klassiekers:
          </p>

          <h3>VWCE — Vanguard FTSE All-World UCITS ETF</h3>
          <ul>
            <li><strong>ISIN:</strong> IE00B3RBWM25</li>
            <li><strong>TER:</strong> 0,22% per jaar</li>
            <li><strong>Spreiding:</strong> ∼3.700 bedrijven, inclusief opkomende markten (~10%)</li>
            <li><strong>Accumulerend:</strong> dividenden worden automatisch herbelegd</li>
            <li><strong>TOB bij aankoop/verkoop:</strong> 0,12%</li>
          </ul>
          <p>
            VWCE is de meest complete wereldwijde ETF voor buy-and-hold beleggers. Je belegt in zowel
            ontwikkelde landen (VS, Europa, Japan) als opkomende markten (China, India, Brazilië).
          </p>

          <h3>IWDA — iShares Core MSCI World UCITS ETF</h3>
          <ul>
            <li><strong>ISIN:</strong> IE00B4L5Y983</li>
            <li><strong>TER:</strong> 0,20% per jaar</li>
            <li><strong>Spreiding:</strong> ∼1.400 bedrijven, enkel ontwikkelde landen</li>
            <li><strong>Accumulerend:</strong> ja</li>
            <li><strong>TOB bij aankoop/verkoop:</strong> 0,12%</li>
          </ul>
          <p>
            IWDA biedt iets lagere kosten maar mist de opkomende markten. Wil je die erbij, combineer
            dan IWDA met EMIM (iShares Core MSCI EM IMI UCITS ETF) in een 90/10 verhouding.
          </p>
          <p>
            Lees onze volledige vergelijking:{' '}
            <Link href="/belgie/vwce-vs-iwda" className="text-accent underline">VWCE vs IWDA voor Belgische beleggers</Link>.
          </p>

          <h2>Stap 1 — Kies je broker</h2>
          <p>
            Voor beginners zijn er drie topkeuzes, elk met hun eigen voordelen:
          </p>

          <h3>Saxo Bank — Beste voor automatisch beleggen</h3>
          <p>
            Via <strong>AutoInvest</strong> kun je maandelijks automatisch ETFs aankopen voor slechts €2/maand.
            Saxo regelt alle belastingen automatisch: TOB, roerende voorheffing, Reynders en de meerwaardebelasting.
            Ideaal als je wil dat alles op de automatische piloot werkt.
          </p>
          <p>→ <Link href="/reviews/saxo-bank-belgie" className="text-accent underline">Saxo Bank review</Link></p>

          <h3>Bolero — Beste Belgische bank met nul securities lending</h3>
          <p>
            Bolero (KBC-dochter) leent jouw effecten nooit uit, heeft Invest & Repeat voor herhalende orders
            en regelt alle belastingen automatisch. Transactiekosten voor Playlist-ETFs: €2,50–€7,50.
          </p>
          <p>→ <Link href="/reviews/bolero" className="text-accent underline">Bolero review</Link></p>

          <h3>MeDirect — Beste voor gratis ETF-transacties</h3>
          <p>
            MeDirect rekent <strong>geen transactiekosten</strong> aan voor ETF-aankopen en -verkopen.
            Ideaal als je maandelijks kleine bedragen wil beleggen zonder vaste kosten. Nadeel: geen automatisch spaarplan.
          </p>
          <p>→ <Link href="/reviews/medirect" className="text-accent underline">MeDirect review</Link></p>

          <h2>Stap 2 — Account openen</h2>
          <p>
            Bij Belgische brokers verloopt het openen van een account volledig online:
          </p>
          <ol>
            <li>Ga naar de website van de broker</li>
            <li>Klik op &quot;Account openen&quot; of &quot;Registreren&quot;</li>
            <li>Identificeer je via itsme (Bolero), eID-kaartlezer of paspoort</li>
            <li>Vul je financieel profiel in (MiFID-vragenlijst)</li>
            <li>Stort geld op je broker-rekening</li>
          </ol>
          <p>
            Doorlooptijd: 1–3 werkdagen bij Belgische brokers. Bolero ondersteunt itsme voor snelle identificatie.
          </p>

          <h2>Stap 3 — Je eerste ETF aankopen</h2>
          <p>
            Eenmaal je account gevuld is, zoek je de ETF op via de zoekbalk. Typ de naam (VWCE) of de ISIN-code
            (IE00B3RBWM25). Let op:
          </p>
          <ul>
            <li>Kies altijd de <strong>EUR-variant</strong> op een Europese beurs (Amsterdam/Xetra)</li>
            <li>Kies de <strong>accumulerende versie</strong> (Acc of Inc — kies Acc voor automatische herbelasting)</li>
            <li>Kies bij voorkeur een <strong>limietorder</strong> boven een marktorder om de prijs te controleren</li>
          </ul>

          <h2>TOB — De taks op beursverrichtingen</h2>
          <p>
            Bij elke aankoop én verkoop van een ETF betaal je <strong>0,12% TOB</strong>.
            Dit wordt automatisch afgehouden door Belgische brokers. Bij een buitenlandse broker
            (DEGIRO, Trade Republic) moet je dit zelf per kwartaal aangeven via MyMinfin.be.
          </p>
          <p>
            Meer over TOB:{' '}
            <Link href="/belgie/tob-uitleg" className="text-accent underline">TOB uitgelegd voor Belgische beleggers</Link>.
          </p>

          <h2>De meerwaardebelasting (2026)</h2>
          <p>
            Vanaf 2026 geldt een meerwaardebelasting van <strong>10% op gerealiseerde meerwaarden</strong> boven
            €10.000 vrijstelling per jaar. Belgische brokers houden dit automatisch in bij verkoop.
          </p>
          <p>
            Meer info:{' '}
            <Link href="/belgie/meerwaardebelasting-2026-uitleg" className="text-accent underline">Meerwaardebelasting 2026 uitgelegd</Link>.
          </p>

          <h2>Praktisch voorbeeld: eerste aankoop</h2>
          <p>
            Je hebt €500 gestort op je Saxo-rekening en wil VWCE kopen:
          </p>
          <ol>
            <li>Zoek &quot;VWCE&quot; in het handelsplatform</li>
            <li>Kies de notering op <strong>Euronext Amsterdam</strong> in EUR</li>
            <li>Stel een limietorder in op de huidige marktprijs (bijv. €132)</li>
            <li>Aantal: 3 stuks × €132 = €396 (je kunt geen fractionele stuks kopen bij de meeste brokers)</li>
            <li>Bevestig — Saxo houdt automatisch 0,12% TOB in (±€0,48)</li>
          </ol>

          <h2>Veelgestelde vragen</h2>

          <h3>Kan ik maandelijks een klein bedrag beleggen?</h3>
          <p>
            Ja. Via Saxo AutoInvest kun je vanaf €1/maand automatisch ETFs aankopen. Bij Bolero (Invest & Repeat)
            stel je herhalende orders in — je storting moet je zelf doen. MeDirect heeft geen spaarplan maar
            transacties zijn gratis, dus €50/maand beleggen is kosteloos.
          </p>

          <h3>Moet ik zelf belastingen aangeven?</h3>
          <p>
            Bij Belgische brokers (Saxo, Bolero, MeDirect, Keytrade): nee. Bij buitenlandse brokers (DEGIRO,
            Trade Republic): ja — TOB, roerende voorheffing én meerwaardebelasting doe je zelf.
          </p>

          <h3>Is beleggen in ETFs riskant?</h3>
          <p>
            Elke belegging draagt risico. ETFs kunnen in waarde dalen. Op lange termijn (10+ jaar) heeft een
            wereldwijd gespreide ETF historisch gezien positief gerendeerd. Beleg enkel geld dat je lang kunt
            missen en spreid je aankopen in de tijd (dollar-cost averaging).
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/belgie/vwce-vs-iwda', label: 'VWCE vs IWDA — welke ETF kies je?' },
            { href: '/beste-etf-broker-belgie', label: 'Beste ETF-broker voor Belgen' },
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
