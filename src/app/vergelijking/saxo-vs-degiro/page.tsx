import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { goLink, knopNaam } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { RekeningOpenen } from '@/components/broker/RekeningOpenen'
import { Bronnen, articleJsonLd, type Bron } from '@/components/ui/Bronnen'
import { SaxoDegiroRekenhulp } from '@/components/tools/SaxoDegiroRekenhulp'
import { KrososBlok } from '@/components/partners/KrososBlok'
import { EindejaarTip } from '@/components/partners/EindejaarTip'

const saxo = getBrokerById('saxo')!
const degiro = getBrokerById('degiro')!

const NAGEKEKEN = '2026-11-23'
const URL = 'https://www.bestebroker.be/vergelijking/saxo-vs-degiro'
const TITLE = 'Saxo vs DEGIRO (2026): het verschil zit niet in de orderkost'
const DESCRIPTION =
  '€1 of €2 per order lijkt een duidelijke winnaar. Tot je ziet wat je bij DEGIRO zelf aangeeft. Reken je eigen bedrag na met onze rekenhulp. Nagekeken november 2026.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, locale: 'nl_BE', type: 'article' },
  alternates: { canonical: URL },
}

const BRON = {
  degiroReview: 'https://curvo.eu/nl/artikel/degiro-review',
  tobDegiro: 'https://www.test-aankoop.be/invest/fiscaliteit-en-wetgeving/belastingheffing/dossiers/taks-op-beursverrichtingen-tob',
  saxoRekening: 'https://www.home.saxo/nl-be/accounts/individual',
  saxoAutoInvest: 'https://www.home.saxo/nl-be/products/autoinvest',
  medirectVsSaxo: 'https://curvo.eu/nl/artikel/medirect-vs-saxo',
  spaarplannen: 'https://curvo.eu/article/best-etf-savings-plan-belgium',
  degiroVsSaxo: 'https://curvo.eu/nl/artikel/degiro-vs-saxo',
  saxoTarieven: 'https://www.home.saxo/nl-be/campaigns/invest-for-less',
  saxoReview: 'https://curvo.eu/nl/artikel/saxo-bank-review',
  degiroKostenEtf: 'https://curvo.eu/nl/artikel/degiro-kosten-etf',
}

const rows: { label: string; saxo: string; degiro: string }[] = [
  { label: 'Wie is het?', saxo: 'Belgisch bijkantoor van Saxo Bank A/S (Denemarken)', degiro: 'flatexDEGIRO (Duitsland), toezicht BaFin; buitenlandse rekening, openen via degiro.nl' },
  { label: 'ETF-transactiekost', saxo: '0,08% met minimum €2 per order', degiro: '€1 voor ETF’s uit de kernselectie (via Tradegate) · €3 voor andere ETF’s' },
  { label: 'Automatisch spaarplan', saxo: 'AutoInvest: €2 per maand voor de aankopen; verkopen min. €2 per ETF; je stort zelf het geld', degiro: 'Nee, je plaatst elke order zelf' },
  { label: 'Beurstaks (TOB)', saxo: 'Ingehouden door Saxo', degiro: 'Ingehouden door DEGIRO' },
  { label: 'Roerende voorheffing op buitenlandse dividenden, Reynderstaks', saxo: 'Ingehouden door Saxo', degiro: 'Zelf aangeven' },
  { label: 'Meerwaardebelasting (sinds 2026)', saxo: 'Ingehouden door Saxo', degiro: 'Zelf berekenen en aangeven' },
  { label: 'Inhouding meerwaardebelasting weigeren en zelf aangeven', saxo: 'Kan (opt-out)', degiro: 'Niet van toepassing: je geeft altijd zelf aan' },
  { label: 'Melding bij de Nationale Bank (NBB)', saxo: 'Niet nodig', degiro: 'Verplicht (buitenlandse rekening) + vermelden in je aangifte' },
  { label: 'Bewaarloon', saxo: 'Geen', degiro: 'Geen' },
  { label: 'Rekening openen met itsme', saxo: 'Ja', degiro: 'Nee' },
  { label: 'Soorten rekeningen', saxo: 'Individueel, gezamenlijk en voor bedrijven; geen kinderrekening', degiro: 'Enkel een individueel Basis-account (geen gezamenlijke, kinder- of bedrijfsrekening)' },
  { label: 'Securities lending (effecten uitlenen)', saxo: 'Enkel als je er zelf voor kiest (opt-in)', degiro: 'Toegelaten volgens de voorwaarden van het Basis-account' },
  { label: 'Bescherming effecten / cash', saxo: '€20.000 / €100.000 (Deens garantiefonds)', degiro: '€20.000 / €100.000 (Duitse stelsels)' },
  { label: 'Effecten overzetten naar een andere bank', saxo: '€75 per lijn', degiro: '€20 per lijn (plus eventuele externe kosten)' },
]


const faq = [
  {
    q: 'Is Saxo duurder dan DEGIRO?',
    a: 'Per order meestal wel. Een ETF uit de kernselectie van DEGIRO kost €1 per order via Tradegate, een andere ETF €3. Bij Saxo kost AutoInvest €2 per maand, een losse order 0,08% met minimum €2. Bij één aankoop per maand betaal je bij DEGIRO €12 tot €36 per jaar, bij Saxo met AutoInvest €24. Koop je ETF’s buiten de kernselectie, of drie of meer ETF’s per maand, dan is Saxo met AutoInvest goedkoper. Bij DEGIRO geef je wel meer taksen zelf aan.',
  },
  {
    q: 'Krijg ik de meerwaardebelasting terug die Saxo inhoudt?',
    a: 'Saxo houdt bij elke verkoop met meerwaarde 10% in. Blijft je totale meerwaarde dat jaar onder de vrijstelling van €10.000, dan recupereer je wat te veel ingehouden is via je belastingaangifte. Je kan bij Saxo ook kiezen voor opt-out: dan houdt Saxo niets in en geef je de meerwaarde zelf aan, zoals bij DEGIRO.',
  },
  {
    q: 'Houdt DEGIRO de beurstaks in?',
    a: 'Ja. DEGIRO houdt de beurstaks (TOB) in en stort ze door aan de Belgische fiscus. De meerwaardebelasting, de Reynderstaks en de roerende voorheffing op buitenlandse dividenden geef je zelf aan. Saxo houdt al die taksen in.',
  },
  {
    q: 'Moet ik een DEGIRO-rekening melden bij de Nationale Bank?',
    a: 'Ja. Een DEGIRO-rekening is een buitenlandse rekening: je meldt ze bij het Centraal Aanspreekpunt van de NBB en vermeldt ze in je belastingaangifte. Voor een rekening bij het Belgische bijkantoor van Saxo hoeft dat niet.',
  },
  {
    q: 'Kan ik bij DEGIRO een gezamenlijke of bedrijfsrekening openen?',
    a: 'Nee. DEGIRO biedt in België enkel een individueel Basis-account. Saxo heeft een gezamenlijke rekening en een bedrijfsrekening, maar geen kinderrekening. Een rekening openen met itsme kan bij Saxo, niet bij DEGIRO.',
  },
  {
    q: 'Zijn Saxo en DEGIRO veilig?',
    a: 'Beide bewaren je effecten apart van hun eigen vermogen. Gaat de bank failliet, dan is cash beschermd tot €100.000 en zijn effecten gedekt tot €20.000, bij beide. Die bescherming dekt geen koersverliezen. Saxo leent enkel effecten uit als je daarvoor kiest; bij DEGIRO staat het uitlenen in de voorwaarden van het Basis-account.',
  },
]

const bronnen: Bron[] = [
  { staaft: 'Kosten, taksen, NBB-melding, securities lending, bescherming en overdracht DEGIRO', label: 'Curvo, DEGIRO review (03/09/2026)', href: BRON.degiroReview },
  { staaft: 'DEGIRO houdt de beurstaks in', label: 'Test-Aankoop, taks op beursverrichtingen (gelezen 23/10/2026)', href: BRON.tobDegiro },
  { staaft: 'Transactiekosten, bewaarloon en toezicht Saxo', label: 'Saxo België, individuele rekening (gelezen 06/11/2026)', href: BRON.saxoRekening },
  { staaft: 'AutoInvest: €2 per maand voor aankopen, verkopen min. €2 per ETF', label: 'Saxo België, AutoInvest (gelezen 23/11/2026)', href: BRON.saxoAutoInvest },
  { staaft: 'Overdrachtkosten, securities lending en bescherming Saxo', label: 'Curvo, MeDirect vs Saxo (03/09/2026)', href: BRON.medirectVsSaxo },
  { staaft: 'Storting bij AutoInvest', label: 'Curvo, ETF-spaarplannen in België (27/07/2026)', href: BRON.spaarplannen },
  { staaft: 'Saxo Bronze: aandelen en ETF’s Euronext 0,08% met minimum €2, exclusief beurstaks', label: 'Saxo België, tarieven "Tot 70% goedkoper" (gelezen 23/11/2026)', href: BRON.saxoTarieven },
  { staaft: 'Taksen per broker, inhouding en recuperatie meerwaardebelasting bij Saxo, itsme, soorten rekeningen, overdracht', label: 'Curvo, DEGIRO vs Saxo (03/09/2026)', href: BRON.degiroVsSaxo },
  { staaft: 'Opt-out meerwaardebelasting bij Saxo', label: 'Curvo, Saxo Bank review (03/09/2026)', href: BRON.saxoReview },
  { staaft: 'DEGIRO €1 enkel via Tradegate; anders €2 + €1 behandelingskosten', label: 'Curvo, DEGIRO-kosten voor ETF’s (22/10/2026)', href: BRON.degiroKostenEtf },
]

export default function SaxoVsDegiroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs DEGIRO' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ headline: 'Saxo vs DEGIRO: kosten en taksen voor Belgische beleggers', description: DESCRIPTION, url: URL, datePublished: '2026-04-01', dateModified: NAGEKEKEN })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs DEGIRO' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Saxo vs DEGIRO: kosten en taksen voor Belgische beleggers
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Per order is DEGIRO goedkoper, maar het verschil is klein: €1 tegen €2. Het echte verschil zit in wat je zelf doet. Bij
            DEGIRO geef je de meerwaardebelasting, de Reynderstaks en buitenlandse dividenden zelf aan en meld je de rekening bij de
            Nationale Bank. Saxo houdt alles in en heeft een automatisch spaarplan.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-10 border-l-4 border-l-accent" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>Kosten:</strong> DEGIRO €1 (kernselectie) of €3 per ETF-order; Saxo €2 per maand met AutoInvest, of 0,08% met minimum €2 per order.</li>
            <li><strong>Belastingen:</strong> beide houden de beurstaks in. Meerwaardebelasting, Reynderstaks en buitenlandse dividenden: Saxo houdt ze in, bij DEGIRO geef je ze zelf aan.</li>
            <li><strong>Administratie:</strong> een DEGIRO-rekening meld je bij de Nationale Bank; bij Saxo hoeft dat niet.</li>
            <li><strong>Overstappen:</strong> effecten overzetten kost €20 per lijn bij DEGIRO en €75 bij Saxo.</li>
            <li><strong>Rekening:</strong> Saxo opent met itsme en heeft ook een gezamenlijke en bedrijfsrekening; DEGIRO enkel een individueel account.</li>
          </ul>
          <RekeningOpenen brokers={[saxo, degiro]} bron="saxo-vs-degiro-kort" className="mt-5" />
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel Saxo en DEGIRO</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-fixed break-words hyphens-auto">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="w-[34%] text-left py-3 pr-3 text-gray-600 font-semibold">Criterium</th>
                  <th scope="col" className="text-left py-3 px-2 font-semibold text-blue-700">Saxo</th>
                  <th scope="col" className="text-left py-3 pl-2 font-semibold text-orange-600">DEGIRO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map(({ label, saxo: vs, degiro: vd }) => (
                  <tr key={label}>
                    <th scope="row" className="py-2.5 pr-3 text-left font-medium text-gray-700 align-top">{label}</th>
                    <td className="py-2.5 px-2 text-gray-600 align-top">{vs}</td>
                    <td className="py-2.5 pl-2 text-gray-600 align-top">{vd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Tarieven exclusief beurstaks. Bronnen onderaan deze pagina, nagekeken op 23 november 2026.</p>
          <RekeningOpenen brokers={[saxo, degiro]} bron="saxo-vs-degiro-tabel" className="mt-5" />
        </section>

        <section className="card mb-10" aria-labelledby="rekenhulp">
          <h2 id="rekenhulp" className="font-display text-xl font-bold text-primary mb-2">Rekenhulp: wat kost jouw maandelijkse ETF-aankoop?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Vul je eigen bedrag in. Bij één ETF uit de kernselectie wint DEGIRO (€12 per jaar tegen €24). Koop je een ETF buiten de
            kernselectie, of spreid je over drie of meer ETF’s, dan kantelt het naar Saxo met AutoInvest. Makelaarsloon zonder beurstaks.
          </p>
          <SaxoDegiroRekenhulp saxo={saxo} degiro={degiro} />
          <p className="text-xs text-gray-400 mt-4">
            Tarieven uit onze brokerdata, nagekeken op 23 november 2026 (bronnen onderaan). Ook aandelen of meer brokers? Gebruik de{' '}
            <Link href="/tools/brokerkosten-calculator" className="text-accent hover:underline">brokerkosten-calculator</Link>.
          </p>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Belastingen: wat doe je zelf bij DEGIRO?</h2>
          <p>
            DEGIRO houdt de <Link href="/belgie/tob-uitleg">beurstaks (TOB)</Link> in. De meerwaardebelasting (10% boven een vrijstelling van
            €10.000 per jaar, op meerwaarden vanaf 2026), de Reynderstaks op obligatie-ETF’s en de roerende voorheffing op buitenlandse
            dividenden geef je zelf aan. Je meldt de rekening ook bij de Nationale Bank. Zie{' '}
            <Link href="/belgie/buitenlandse-broker-nbb-aangifte">NBB-aangifte bij een buitenlandse broker</Link> en{' '}
            <Link href="/broker-meerwaardebelasting-2026">meerwaardebelasting 2026 bij brokers</Link>.
          </p>

          <h2>Meerwaardebelasting: inhouden of zelf aangeven?</h2>
          <p>
            Saxo houdt bij elke verkoop met meerwaarde 10% in. Blijft je meerwaarde over het hele jaar onder de vrijstelling van
            €10.000, dan heb je te veel betaald en recupereer je dat via je belastingaangifte. Wil je dat geld niet voorschieten, dan kan je
            bij Saxo kiezen voor opt-out en geef je de meerwaarde zelf aan.
          </p>
          <p>
            Bij DEGIRO houdt niemand iets in. Je houdt zelf je aankoopprijzen en verkopen bij en rekent de belastbare meerwaarde uit voor je
            aangifte. Wie weinig verkoopt, heeft daar weinig werk aan; wie vaak verkoopt of meerdere ETF’s heeft, best wel.
          </p>
          <KrososBlok bron="saxo-vs-degiro" />
          <EindejaarTip />

          <h2>Voor wie is welk verschil belangrijk?</h2>
          <ul>
            <li><strong>Je wil zo weinig mogelijk administratie:</strong> Saxo houdt alle taksen in en een NBB-melding is niet nodig.</li>
            <li><strong>Je wil elke maand automatisch kopen:</strong> Saxo heeft AutoInvest; bij DEGIRO plaats je elke order zelf.</li>
            <li><strong>Je koopt vooral ETF’s uit de kernselectie:</strong> dan is DEGIRO met €1 per order het goedkoopst per order.</li>
            <li><strong>Je wil later misschien overstappen:</strong> overzetten kost €20 per lijn bij DEGIRO en €75 bij Saxo.</li>
          </ul>
          <RekeningOpenen brokers={[saxo, degiro]} bron="saxo-vs-degiro-conclusie" className="my-6" />
          <p>
            Meer details: <Link href="/reviews/saxo-bank-belgie">review van Saxo</Link>, <Link href="/reviews/degiro-belgie">review van DEGIRO</Link>{' '}
            en <Link href="/vergelijking/degiro-vs-bolero">DEGIRO vs Bolero</Link>.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen over Saxo en DEGIRO</h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="card">
                <h3 className="font-semibold text-primary mb-2">{q}</h3>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN} datumPerBron />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[saxo, degiro].map(broker => (
            broker.affiliateUrl && (
              <div key={broker.id} className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{broker.name}</p>
                  <p className="text-sm text-gray-500">{broker.tagline}</p>
                  <AffiliateLabel broker={broker} />
                </div>
                <a href={goLink(broker.id, 'saxo-vs-degiro')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0 text-sm py-2">Rekening openen bij {knopNaam(broker)} →</a>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}
