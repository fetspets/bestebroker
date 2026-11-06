import type { Metadata } from 'next'
import Link from 'next/link'
import { aandelenKost, getBrokerById, transactiekost } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { Bronnen, articleJsonLd, type Bron } from '@/components/ui/Bronnen'
import { SaxoRekenhulp } from '@/components/tools/SaxoRekenhulp'

const bolero = getBrokerById('bolero')!
const saxo = getBrokerById('saxo')!
const medirect = getBrokerById('medirect')!

const NAGEKEKEN = '2026-11-06'
const URL = 'https://www.bestebroker.be/vergelijking/bolero-vs-saxo'
const TITLE = 'Bolero vs Saxo (2026): wie is voor jou goedkoper?'
const DESCRIPTION =
  'Saxo of Bolero? Reken uit wat jij per jaar betaalt. Plus: bij welke orders Bolero toch goedkoper is en wat vertrekken kost. Nagekeken november 2026.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, locale: 'nl_BE', type: 'article' },
  alternates: { canonical: URL },
}

const BRON = {
  boleroTarieven: 'https://www.bolero.be/uploads/media/667ecf0aabd9a/101-tarieven-nl.pdf',
  boleroReview: 'https://curvo.eu/nl/artikel/bolero-review',
  boleroPers: 'https://www.kbc.com/content/dam/kbccom/doc/newsroom/pressreleases/2025/20250516%20Bolero%20Tarieven%20persbericht%20NL.pdf',
  saxoRekening: 'https://www.home.saxo/nl-be/accounts/individual',
  vergelijkingCurvo: 'https://curvo.eu/nl/artikel/bolero-vs-saxo',
  autoInvestTA: 'https://www.test-aankoop.be/invest/beleggen/aandelen/analysis/2025/06/bolero-verlaagt-tarieven-kleine-orders',
  saxoAutoInvest: 'https://www.home.saxo/nl-be/products/autoinvest',
  saxoReview: 'https://curvo.eu/nl/artikel/saxo-bank-review',
  spaarplannen: 'https://curvo.eu/article/best-etf-savings-plan-belgium',
}

const rows: { label: string; bolero: string; saxo: string }[] = [
  { label: 'Wie is het?', bolero: 'Online broker van KBC Bank (Belgische bank)', saxo: 'Belgisch bijkantoor van Saxo Bank A/S (Denemarken)' },
  { label: 'Transactiekost aandelen en ETF’s op Euronext', bolero: '€2,50 tot €250 · €5 tot €1.000 · €7,50 tot €2.500 · daarboven €15 per €10.000 (max. €50 tot €70.000)', saxo: '0,08% met minimum €2 (standaardniveau Bronze). Vanaf €200.000 vermogen 0,05%, vanaf €1 miljoen 0,03% (minimum blijft €2)' },
  { label: 'Transactiekost Amerikaanse aandelen', bolero: '$2,50 tot $250 · $5 tot $1.000 · daarboven zie tarievenlijst', saxo: '0,08% met minimum $1 (Bronze)' },
  { label: 'Automatisch spaarplan', bolero: 'Periodiek beleggen, enkel hele stuks; je stort zelf het geld vooraf', saxo: 'AutoInvest: €2 per maand voor alle aankopen samen, uit een selectie ETF’s, enkel hele stuks; je stort zelf het geld vooraf' },
  { label: 'Bewaarloon', bolero: 'Geen', saxo: 'Geen' },
  { label: 'Belgische taksen (TOB, roerende voorheffing, Reynders, meerwaardebelasting)', bolero: 'Ingehouden door Bolero', saxo: 'Ingehouden door Saxo' },
  { label: 'Securities lending (effecten uitlenen)', bolero: 'Nee', saxo: 'Enkel als je er zelf voor kiest (opt-in)' },
  { label: 'Bescherming effecten / cash', bolero: '€20.000 / €100.000', saxo: '€20.000 / €100.000 (Deens garantiefonds)' },
  { label: 'Effecten overzetten naar een andere bank', bolero: '€50 per lijn (gratis naar KBC/CBC)', saxo: '€75 per lijn' },
  { label: 'Toezicht', bolero: 'Belgische vergunning (KBC Bank): FSMA en NBB', saxo: 'Deense toezichthouder; in België geregistreerd bij de NBB, gedragsregels onder de FSMA' },
  { label: 'Publieke sanctie (laatste 5 jaar)', bolero: 'Geen gevonden', saxo: 'DKK 313 miljoen boete (Deense toezichthouder, januari 2026) voor tekortkomingen in de antiwitwascontroles' },
  { label: 'Rekening openen', bolero: 'Met itsme; volgens Curvo met een Belgisch gsm-nummer en soms enkele dagen wachten', saxo: 'Met itsme; volgens Saxo meestal binnen enkele minuten tot 2 werkdagen' },
]

// Kosten van één aankoop per maand, zonder beurstaks (die is bij beide gelijk en hangt af van de ETF).
const bedrag = (n: number) => `€${n.toLocaleString('nl-BE')}`
const kosten = [150, 300, 1000, 2000, 5000].map(b => ({
  bedrag: bedrag(b),
  bolero: transactiekost(bolero.fees, b),
  saxoAuto: saxo.fees.autoinvestMonthly ?? 0,
  saxoLos: transactiekost(saxo.fees, b),
}))
// Eén grote order: hier kantelt het verschil, omdat Bolero tot €70.000 op €50 afgetopt is en Saxo een percentage rekent.
const groteOrders = [2500, 10000, 25000, 50000, 62500, 70000]
const eur = (n: number) => `€${n.toFixed(2).replace('.', ',')}`

const faq = [
  {
    q: 'Is Bolero of Saxo goedkoper?',
    a: 'Voor één aankoop per maand is Saxo goedkoper: AutoInvest kost €2 per maand en een losse order 0,08% met minimum €2. Bolero rekent €2,50 tot €250, €5 tot €1.000 en €7,50 tot €2.500. Het verschil loopt van €6 per jaar (bij €150 per maand) tot €66 per jaar (bij €2.000 per maand). Enkel bij één order tussen €62.500 en €70.000 is Bolero goedkoper. De beurstaks is bij beide gelijk.',
  },
  {
    q: 'Wat is het verschil tussen Saxo AutoInvest en het spaarplan van Bolero?',
    a: 'Bij beide stort je zelf het geld op je beleggingsrekening, bijvoorbeeld met een doorlopende overschrijving; geen van beide werkt met een domiciliëring. Saxo AutoInvest kost €2 per maand voor de aankopen. Bij Bolero betaal je het gewone makelaarsloon per order. Bij beide koop je enkel hele stuks van een ETF.',
  },
  {
    q: 'Houden Bolero en Saxo de Belgische belastingen in?',
    a: 'Ja. Beide houden de beurstaks (TOB), de roerende voorheffing op dividenden, de Reynderstaks en sinds 2026 de meerwaardebelasting in. Je hoeft je rekening niet bij de Nationale Bank te melden.',
  },
  {
    q: 'Leent Saxo mijn aandelen uit?',
    a: 'Enkel als je daar zelf voor kiest: securities lending is bij Saxo opt-in. Bolero leent geen effecten uit.',
  },
  {
    q: 'Heeft Saxo een boete gekregen?',
    a: 'Ja. De Deense toezichthouder legde Saxo Bank in januari 2026 een administratieve boete van DKK 313 miljoen op voor tekortkomingen in de antiwitwascontroles (2021–2023); Saxo aanvaardde die. Bij Bolero vonden we geen publieke sanctie in de laatste 5 jaar. De boete weegt mee in onze veiligheidsscore; hoe, staat op de methodologiepagina.',
  },
  {
    q: 'Wat kost het om van Bolero of Saxo weg te gaan?',
    a: 'Bolero rekent €50 per lijn om effecten naar een andere bank over te zetten (gratis naar KBC of CBC). Saxo rekent €75 per lijn. Met 5 verschillende ETF’s is dat €250 bij Bolero en €375 bij Saxo.',
  },
]

const bronnen: Bron[] = [
  { staaft: 'Transactiekosten, bewaarloon en overdracht Bolero', label: 'Bolero, tarievenlijst S101, geldig vanaf 11/06/2025 (gelezen 22/10/2026)', href: BRON.boleroTarieven },
  { staaft: 'Tarief tot $1.000 op Amerikaanse beurzen, Bolero', label: 'KBC, persbericht Bolero-tarieven, 11/06/2025 (gelezen 06/11/2026)', href: BRON.boleroPers },
  { staaft: 'Spaarplan, taksen, bescherming en securities lending Bolero', label: 'Curvo, Bolero review, 08/10/2026 (gelezen 22/10/2026)', href: BRON.boleroReview },
  { staaft: 'Transactiekosten, niveaus, bewaarloon, openen en toezicht Saxo', label: 'Saxo België, individuele rekening (gelezen 06/11/2026)', href: BRON.saxoRekening },
  { staaft: 'AutoInvest-kost Saxo', label: 'Saxo België, AutoInvest (gelezen 22/10/2026)', href: BRON.saxoAutoInvest },
  { staaft: 'Selectie ETF’s bij AutoInvest', label: 'Test-Aankoop, verwijzing naar artikel van 15/05/2025 op deze pagina (gelezen 06/11/2026; het aanbod kan intussen gewijzigd zijn)', href: BRON.autoInvestTA },
  { staaft: 'Overdrachtkost, securities lending, bescherming en hele stuks bij AutoInvest, Saxo', label: 'Curvo, Saxo Bank review, 03/09/2026 (gelezen 22/10/2026)', href: BRON.saxoReview },
  { staaft: 'Rekening openen, itsme, overdrachtkosten beide', label: 'Curvo, Bolero vs Saxo Bank, 03/09/2026 (gelezen 06/11/2026)', href: BRON.vergelijkingCurvo },
  { staaft: 'Storting bij AutoInvest en Bolero-spaarplan', label: 'Curvo, ETF-spaarplannen in België, 27/07/2026 (gelezen 22/10/2026)', href: BRON.spaarplannen },
  ...saxo.veiligheid!.sancties.map(s => ({ staaft: 'Boete Saxo', label: `${s.bron.label} (gelezen 23/10/2026)`, href: s.bron.href })),
]

export default function BoleroVsSaxoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Bolero vs Saxo' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ headline: 'Bolero vs Saxo: kosten, spaarplan en belastingen vergeleken', description: DESCRIPTION, url: URL, datePublished: '2026-04-18', dateModified: NAGEKEKEN })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Bolero vs Saxo' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Bolero vs Saxo: kosten, spaarplan en belastingen vergeleken
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Bolero en Saxo houden allebei alle Belgische taksen voor je in en rekenen geen bewaarloon. De verschillen
            zitten in de transactiekosten, het spaarplan, het uitlenen van effecten, het toezicht en wat het kost om later te vertrekken.
            Vul hieronder je eigen bedragen in.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-10 border-l-4 border-l-accent" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>Kosten:</strong> Saxo rekent 0,08% (minimum €2) per order of €2 per maand met AutoInvest. Bolero rekent €2,50 tot €7,50 per order tot €2.500. Bij één aankoop per maand is Saxo €6 tot €66 per jaar goedkoper. Enkel bij één order tussen €62.500 en €70.000 is Bolero goedkoper.</li>
            <li><strong>Spaarplan:</strong> bij beide stort je zelf het geld. AutoInvest kost een vaste €2 per maand; bij Bolero betaal je per order. Bij beide koop je enkel hele stuks.</li>
            <li><strong>Uitlenen van effecten:</strong> Bolero doet het niet; bij Saxo enkel als je zelf opt-in kiest.</li>
            <li><strong>Vertrekken:</strong> overzetten kost €50 per lijn bij Bolero en €75 per lijn bij Saxo.</li>
            <li><strong>Toezicht:</strong> Bolero is een merk van KBC Bank, met Belgische vergunning. Saxo is een Deense bank met een Belgisch bijkantoor en kreeg in januari 2026 een boete van de Deense toezichthouder.</li>
          </ul>
        </section>

        <section className="card mb-10" aria-labelledby="rekenhulp">
          <h2 id="rekenhulp" className="font-display text-xl font-bold text-primary mb-2">Reken het zelf na: wat betaal jij bij Bolero en bij Saxo?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Met de Euronext-tarieven uit de tabel hieronder. Je gegevens blijven in je browser. Dit is een rekenvoorbeeld, geen advies.
          </p>
          <SaxoRekenhulp saxo={saxo} ander={bolero} anderKleur="text-red-600" bron="bolero-vs-saxo-reken" />
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel Bolero en Saxo</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="w-1/2 text-left py-3 pr-2 font-semibold text-red-600">Bolero</th>
                  <th scope="col" className="w-1/2 text-left py-3 pl-2 font-semibold text-blue-700">Saxo</th>
                </tr>
              </thead>
              {rows.map(({ label, bolero: vb, saxo: vs }) => (
                <tbody key={label} className="border-b border-gray-50">
                  <tr>
                    <th scope="rowgroup" colSpan={2} className="pt-3 pb-1 text-left font-medium text-gray-700">{label}</th>
                  </tr>
                  <tr>
                    <td className="pb-3 pr-2 text-gray-600 align-top">{vb}</td>
                    <td className="pb-3 pl-2 text-gray-600 align-top">{vs}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Tarieven exclusief beurstaks. Bronnen onderaan deze pagina, met de datum waarop we ze lazen. Wisselkoerskosten vergelijken we hier niet.</p>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-2">Wat kost één aankoop per maand?</h2>
          <p className="text-sm text-gray-600 mb-4">Makelaarsloon voor één ETF-aankoop per maand op Euronext, zonder beurstaks (die is bij beide brokers gelijk).</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 text-gray-600 font-semibold">Per maand</th>
                  <th scope="col" className="text-center py-3 font-semibold text-red-600">Bolero</th>
                  <th scope="col" className="text-center py-3 font-semibold text-blue-700">Saxo Auto&shy;Invest</th>
                  <th scope="col" className="text-center py-3 font-semibold text-blue-700">Saxo order</th>
                  <th scope="col" className="text-center py-3 text-gray-600 font-semibold">Per jaar*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {kosten.map(k => (
                  <tr key={k.bedrag}>
                    <th scope="row" className="py-2.5 text-left font-medium text-gray-700">{k.bedrag}</th>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.bolero)}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.saxoAuto)}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.saxoLos)}</td>
                    <td className="py-2.5 text-center text-gray-700 font-medium">{eur((k.bolero - Math.min(k.saxoAuto, k.saxoLos)) * 12)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">* Verschil per jaar: Bolero min de goedkoopste Saxo-optie, × 12 maanden. Saxo order = losse order, 0,08% met minimum €2. Verkopen kost bij AutoInvest het gewone tarief (minimum €2 per ETF).</p>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-2">Bij grote orders: wanneer is Bolero goedkoper?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Bolero rekent per schijf en stopt tot €70.000 op €50. Saxo rekent een percentage. Daardoor kantelt het verschil net boven €62.500.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 text-gray-600 font-semibold">Eén order van</th>
                  <th scope="col" className="text-center py-3 font-semibold text-red-600">Bolero</th>
                  <th scope="col" className="text-center py-3 font-semibold text-blue-700">Saxo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {groteOrders.map(b => (
                  <tr key={b}>
                    <th scope="row" className="py-2.5 text-left font-medium text-gray-700">{bedrag(b)}</th>
                    <td className="py-2.5 text-center text-gray-600">{eur(aandelenKost(bolero.fees, b))}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(aandelenKost(saxo.fees, b))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Aandelen en ETF’s op Euronext, zonder beurstaks, Saxo op niveau Bronze. Op Silver (vanaf €200.000 vermogen) rekent Saxo 0,05%, en is Saxo ook bij deze orders goedkoper.</p>
        </section>

        <section className="card mb-10 border-l-4 border-l-accent" aria-labelledby="alternatief">
          <h2 id="alternatief" className="font-display text-xl font-bold text-primary mb-2">Koop je enkel ETF’s en plaats je zelf je orders?</h2>
          <p className="text-sm text-gray-700 mb-3">
            Dan is er een derde optie: MeDirect rekent {eur(medirect.fees.etfStandard ?? 0)} makelaarsloon per ETF-aankoop. Daar staat tegenover
            dat MeDirect geen spaarplan heeft en dat aandelen minimaal €2,50 per order kosten. Vergelijk het in{' '}
            <Link href="/vergelijking/saxo-vs-medirect" className="text-accent hover:underline">Saxo vs MeDirect</Link> of lees de{' '}
            <Link href="/reviews/medirect" className="text-accent hover:underline">review van MeDirect</Link>.
          </p>
          <a href={goLink(medirect.id, 'bolero-vs-saxo-alternatief')} target="_blank" rel="sponsored nofollow noopener" className="btn-outline justify-center text-center py-3">Naar MeDirect →</a>
          <AffiliateLabel broker={medirect} />
          <p className="text-xs text-gray-400 mt-2">MeDirect is een betaalde samenwerking; Bolero en Saxo zijn dat op dit moment niet. Geen gekochte posities: de volgorde op deze site volgt onze vaste score, ook bij brokers waarmee we samenwerken.</p>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Spaarplan: Saxo AutoInvest of periodiek beleggen bij Bolero</h2>
          <p>
            Bij <strong>Saxo AutoInvest</strong> kies je een of meer ETF’s en een maandbedrag. Saxo koopt elke maand op een vaste dag,
            als er genoeg geld op je rekening staat. Je betaalt €2 per maand voor die aankopen, ongeacht het bedrag en het aantal ETF’s.
            Je kiest uit een selectie: Test-Aankoop noemde er in mei 2025 een 80-tal, dus kijk vooraf na of jouw ETF erbij zit.
          </p>
          <p>
            Bij <strong>Bolero</strong> plan je een herhalende order (maandelijks tot jaarlijks). Je koopt enkel hele stuks van een ETF
            en betaalt het gewone makelaarsloon per order. Ook hier zet je het geld zelf op je rekening.
          </p>
          <p>
            Vooral bij meerdere ETF’s telt dat: €300 per maand verdeeld over 3 ETF’s kost bij Bolero 3 × €2,50 = €90 per jaar,
            bij Saxo AutoInvest €24 per jaar. En omdat je bij beide enkel hele stuks koopt, moet je maandbedrag per ETF minstens de prijs van één stuk halen.
          </p>
          <p>
            Geen van beide trekt het geld automatisch van je gewone bankrekening via een domiciliëring. Een doorlopende overschrijving
            bij je eigen bank lost dat op.
          </p>

          <h2>Belastingen: wat regelen ze voor jou?</h2>
          <p>
            Beide brokers houden de <Link href="/belgie/tob-uitleg">beurstaks (TOB)</Link>, de roerende voorheffing, de Reynderstaks en de
            meerwaardebelasting in. Je rekening is Belgisch, dus je hoeft ze niet bij de Nationale Bank te melden. Meer over de nieuwe taks:
            {' '}<Link href="/broker-meerwaardebelasting-2026">meerwaardebelasting 2026 bij brokers</Link>.
          </p>

          <h2>Securities lending en bescherming</h2>
          <p>
            Bolero leent geen effecten uit. Bij Saxo gebeurt dat enkel als je er zelf voor kiest. Bij beide is je cash beschermd tot
            €100.000 en zijn je effecten via een beleggersbeschermingsfonds gedekt tot €20.000 als de broker failliet gaat. Die
            bescherming dekt geen koersverliezen.
          </p>

          <h2>Voor wie is welk verschil belangrijk?</h2>
          <ul>
            <li><strong>Je belegt een vast bedrag per maand:</strong> het kostenverschil hierboven is het belangrijkste. Saxo is bij elk maandbedrag in de tabel goedkoper.</li>
            <li><strong>Je plaatst af en toe één grote order:</strong> tussen €62.500 en €70.000 is Bolero goedkoper; bij kleinere orders is dat Saxo.</li>
            <li><strong>Je hecht aan een Belgische vergunning:</strong> Bolero is een merk van KBC Bank. Saxo is een Deense bank met een Belgisch bijkantoor, en kreeg in 2026 een boete van de Deense toezichthouder.</li>
            <li><strong>Je wil geen uitlening van je effecten:</strong> bij Bolero is dat uitgesloten; bij Saxo laat je de opt-in gewoon uit.</li>
            <li><strong>Je bent al klant bij KBC of CBC:</strong> effecten overzetten naar KBC/CBC is bij Bolero gratis.</li>
            <li><strong>Je wil later misschien overstappen:</strong> reken met €50 (Bolero) of €75 (Saxo) per lijn.</li>
          </ul>
          <p>
            Meer details: <Link href="/reviews/bolero">review van Bolero</Link>, <Link href="/reviews/saxo-bank-belgie">review van Saxo</Link>{' '}
            en <Link href="/vergelijking/saxo-vs-medirect">Saxo vs MeDirect</Link>.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen over Bolero en Saxo</h2>
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
          {[bolero, saxo].map(broker => (
            broker.affiliateUrl && (
              <div key={broker.id} className="card flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{broker.name}</p>
                  <p className="text-sm text-gray-500">{broker.tagline}</p>
                  <AffiliateLabel broker={broker} />
                </div>
                <a href={goLink(broker.id, 'bolero-vs-saxo')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0 text-sm py-2">Naar {broker.name} →</a>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}
