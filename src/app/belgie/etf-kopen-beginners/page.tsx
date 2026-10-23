import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'

const bronnen: Bron[] = [
  { staaft: 'VWCE: ISIN, lopende kosten 0,14%, aantal aandelen, noteringen', label: 'Vanguard, FTSE All-World UCITS ETF (USD) Accumulating', href: 'https://nl.vanguard/professional/product/etf/equity/9679/ftse-all-world-ucits-etf-usd-accumulating' },
  { staaft: 'TOB VWCE 1,32% en IWDA 0,12%; TER IWDA 0,20%', label: 'Curvo, VWCE vs IWDA (22/10/2026)', href: 'https://curvo.eu/nl/artikel/vwce-vs-iwda' },
  { staaft: 'TOB-tarieven en maxima voor ETF’s', label: 'Curvo, beurstaks ETF (08/10/2026)', href: 'https://curvo.eu/nl/artikel/hoe-je-de-beurstaks-van-een-etf-berekent' },
  { staaft: 'Spaarplannen Saxo, Trade Republic en Bolero', label: 'Curvo, beste ETF-spaarplan België (22/10/2026)', href: 'https://curvo.eu/article/best-etf-savings-plan-belgium' },
  { staaft: 'Staffel Bolero', label: 'Bolero, tarievenlijst S101', href: 'https://www.bolero.be/uploads/media/667ecf0aabd9a/101-tarieven-nl.pdf' },
]

export const metadata: Metadata = {
  title: 'ETF kopen in België — Stap voor stap (2026)',
  description:
    'ETF kopen als Belgische belegger? Stap-voor-stap gids: wat is een ETF, VWCE of IWDA, hoe koop je via Saxo of Bolero, TOB en je eerste aankoop.',
  openGraph: {
    title: 'ETF kopen in België — Stap voor stap voor beginners (2026)',
    description: 'Stap-voor-stap gids om je eerste ETF te kopen als Belgische belegger: welke ETF, welke broker, en hoe zit het met de TOB.',
    url: 'https://www.bestebroker.be/belgie/etf-kopen-beginners',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/belgie/etf-kopen-beginners' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Welke ETF’s kopen Belgische beginners vaak?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Twee veelgekochte wereld-ETF’s zijn VWCE (Vanguard FTSE All-World) en IWDA (iShares Core MSCI World). Beide zijn breed gespreid en kapitaliserend. Let op de beurstaks: op VWCE betaal je als Belg 1,32% per aankoop en verkoop, op IWDA 0,12%. Dit is geen persoonlijk advies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoeveel TOB betaal ik op een ETF-aankoop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Op een ETF die in de EER maar niet in België geregistreerd is (zoals IWDA) betaal je 0,12% TOB bij aankoop én verkoop (max. €1.300). Een in België geregistreerde kapitaliserende ETF (zoals VWCE) kost 1,32% (max. €4.000). Belgische brokers en ook DEGIRO houden de TOB in. Houdt je broker ze niet in, dan geef je ze zelf aan.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat is het verschil tussen VWCE en IWDA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VWCE belegt wereldwijd inclusief opkomende markten (∼90% ontwikkeld, ∼10% emerging markets). IWDA belegt enkel in ontwikkelde landen. VWCE heeft lagere lopende kosten (0,14% tegenover 0,20%), maar een hogere beurstaks voor Belgen (1,32% tegenover 0,12%).',
      },
    },
    {
      '@type': 'Question',
      name: 'Welke brokers houden alle Belgische taksen in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Saxo, Bolero, MeDirect, Keytrade en de Belgische rekening van Trade Republic houden de TOB, de roerende voorheffing en de meerwaardebelasting in. DEGIRO houdt enkel de TOB in. Kosten en spaarplannen per broker staan op /beste-etf-broker-belgie.',
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
          <LastUpdated date="2026-10-23" />
        </header>

        <div className="prose-custom max-w-3xl">
          <h2>Wat is een ETF?</h2>
          <p>
            Een ETF (<em>Exchange Traded Fund</em>) is een fonds dat je koopt en verkoopt op de beurs, net zoals
            een aandeel. Een ETF bundelt honderden of duizenden individuele aandelen in één instrument. Koop je
            één ETF zoals VWCE, dan beleg je meteen in ruim 3.800 bedrijven wereldwijd.
          </p>
          <p>
            De grote voordelen van ETFs voor beginners:
          </p>
          <ul>
            <li><strong>Brede spreiding</strong> — één aankoop, duizenden bedrijven</li>
            <li><strong>Lage kosten</strong> — bij brede wereld-ETF’s zoals VWCE en IWDA 0,14% tot 0,20% per jaar</li>
            <li><strong>Transparantie</strong> — je weet precies wat erin zit</li>
            <li><strong>Belastingvriendelijk</strong> — accumulerende ETFs keren geen dividend uit, wat de fiscale administratie vereenvoudigt</li>
          </ul>

          <h2>Welke ETF kiezen als Belgische belegger?</h2>
          <p>
            Twee veelgekochte wereld-ETF’s zijn VWCE en IWDA. Dit zijn voorbeelden, geen advies:
          </p>

          <h3>VWCE — Vanguard FTSE All-World UCITS ETF</h3>
          <ul>
            <li><strong>ISIN:</strong> IE00BK5BQT80</li>
            <li><strong>TER:</strong> 0,14% per jaar</li>
            <li><strong>Spreiding:</strong> 3.821 bedrijven (30/09/2026), ook in opkomende landen</li>
            <li><strong>Accumulerend:</strong> dividenden worden automatisch herbelegd</li>
            <li><strong>TOB bij aankoop/verkoop:</strong> 1,32% (in België geregistreerd, max. €4.000)</li>
          </ul>
          <p>
            Met VWCE beleg je in ontwikkelde landen (VS, Europa, Japan) én in opkomende landen (China, India,
            Brazilië). De lopende kosten zijn laag, maar de beurstaks is voor Belgen elf keer hoger dan bij IWDA.
          </p>

          <h3>IWDA — iShares Core MSCI World UCITS ETF</h3>
          <ul>
            <li><strong>ISIN:</strong> IE00B4L5Y983</li>
            <li><strong>TER:</strong> 0,20% per jaar</li>
            <li><strong>Spreiding:</strong> ±1.500 bedrijven, enkel ontwikkelde landen</li>
            <li><strong>Accumulerend:</strong> ja</li>
            <li><strong>TOB bij aankoop/verkoop:</strong> 0,12%</li>
          </ul>
          <p>
            IWDA heeft een lage beurstaks maar bevat geen opkomende landen. Wie die erbij wil, combineert IWDA vaak met
            een opkomende-landen-ETF zoals EMIM (iShares Core MSCI EM IMI, TOB 0,12%).
          </p>
          <p>
            Lees onze volledige vergelijking:{' '}
            <Link href="/belgie/vwce-vs-iwda" className="text-accent underline">VWCE vs IWDA voor Belgische beleggers</Link>.
          </p>

          <h2>Stap 1 — Kies je broker</h2>
          <p>
            Drie Belgische brokers die alle taksen inhouden, met hun belangrijkste verschil. Alle zes brokers naast
            elkaar: <Link href="/beste-etf-broker-belgie" className="text-accent underline">ETF-brokers vergeleken</Link>.
          </p>

          <h3>Saxo Bank — automatisch beleggen met AutoInvest</h3>
          <p>
            Via <strong>AutoInvest</strong> kun je maandelijks automatisch ETFs aankopen voor slechts €2/maand.
            Saxo regelt alle belastingen automatisch: TOB, roerende voorheffing, Reynders en de meerwaardebelasting.
            Handig als je de aankoop elke maand automatisch wil laten gebeuren.
          </p>
          <p>→ <Link href="/reviews/saxo-bank-belgie" className="text-accent underline">Saxo Bank review</Link></p>

          <h3>Bolero — online broker van KBC, leent effecten niet uit</h3>
          <p>
            Bolero (KBC) leent jouw effecten niet uit, laat periodiek beleggen in hele stuks toe
            en houdt alle Belgische taksen in. Transactiekosten: €2,50 tot €250, €5 tot €1.000, €7,50 tot €2.500 (tarieflijst 11/06/2025).
          </p>
          <p>→ <Link href="/reviews/bolero" className="text-accent underline">Bolero review</Link></p>

          <h3>MeDirect — geen makelaarsloon op ETF’s</h3>
          <p>
            MeDirect rekent <strong>geen transactiekosten</strong> aan voor ETF-aankopen en -verkopen.
            Daardoor kost ook een klein bedrag per maand geen orderkost. Er is geen automatisch spaarplan: je koopt zelf.
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
            (IE00BK5BQT80). Let op:
          </p>
          <ul>
            <li>Kies altijd de <strong>EUR-variant</strong> op een Europese beurs (Amsterdam/Xetra)</li>
            <li>Kies de <strong>kapitaliserende versie</strong> (Acc). Op een uitkerende versie (Dist/Inc, bij Vanguard VWRL) betaal je 30% roerende voorheffing op elk dividend</li>
            <li>Kies bij voorkeur een <strong>limietorder</strong> boven een marktorder om de prijs te controleren</li>
          </ul>

          <h2>TOB — De taks op beursverrichtingen</h2>
          <p>
            Bij elke aankoop én verkoop van een ETF betaal je TOB: <strong>0,12%</strong> voor een ETF die in de EER maar
            niet in België geregistreerd is (zoals IWDA), <strong>1,32%</strong> voor een in België geregistreerde
            kapitaliserende ETF (zoals VWCE).
            Belgische brokers en ook DEGIRO houden dit automatisch in. Houdt je broker de TOB niet in, dan geef je
            ze zelf aan via MyMinfin.be.
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
            <li>Stel een limietorder in op de huidige marktprijs (voorbeeldprijs: €132)</li>
            <li>Aantal: 3 stuks × €132 = €396 (je kunt geen fractionele stuks kopen bij de meeste brokers)</li>
            <li>Bevestig — Saxo houdt automatisch de TOB in: voor VWCE 1,32%, dus ±€5,23 op €396 (bij IWDA zou het 0,12% zijn)</li>
          </ol>

          <h2>Veelgestelde vragen</h2>

          <h3>Kan ik maandelijks een klein bedrag beleggen?</h3>
          <p>
            Ja. Saxo AutoInvest (€2 per maand) heeft geen minimumbedrag en Trade Republic heeft een gratis spaarplan vanaf €1.
            Bij Bolero kan periodiek beleggen enkel in hele stuks. MeDirect heeft geen spaarplan maar
            transacties zijn gratis, dus €50/maand beleggen is kosteloos.
          </p>

          <h3>Moet ik zelf belastingen aangeven?</h3>
          <p>
            Bij Belgische brokers (Saxo, Bolero, MeDirect, Keytrade) en op een Belgische rekening bij Trade Republic
            (sinds 15/09/2026): nee. Bij DEGIRO: de beurstaks wordt ingehouden, maar meerwaardebelasting, Reynderstaks
            en roerende voorheffing op buitenlandse dividenden geef je zelf aan.
          </p>

          <h3>Is beleggen in ETFs riskant?</h3>
          <p>
            Elke belegging draagt risico. ETFs kunnen in waarde dalen. Op lange termijn (10+ jaar) heeft een
            wereldwijd gespreide ETF historisch gezien positief gerendeerd, maar rendementen uit het verleden bieden geen garantie voor de toekomst. Beleg enkel geld dat je lang kunt
            missen en spreid je aankopen in de tijd (dollar-cost averaging).
          </p>
        </div>

        <div className="mt-10">
          <Bronnen bronnen={bronnen} nagekeken="2026-10-23" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/belgie/vwce-vs-iwda', label: 'VWCE vs IWDA — welke ETF kies je?' },
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
