import type { Metadata } from 'next'
import Link from 'next/link'
import { aandelenKost, getBrokerById } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { Bronnen, articleJsonLd, type Bron } from '@/components/ui/Bronnen'
import { SaxoRekenhulp } from '@/components/tools/SaxoRekenhulp'

const saxo = getBrokerById('saxo')!
const medirect = getBrokerById('medirect')!

const NAGEKEKEN = '2026-11-05'
const URL = 'https://www.bestebroker.be/vergelijking/saxo-vs-medirect'
const TITLE = 'Saxo vs MeDirect (2026): wie is goedkoper? Reken het na'
const DESCRIPTION =
  'MeDirect rekent €0 op ETF’s, maar bij aandelen ligt het anders. Reken je eigen kosten na en zie wat overstappen kost. Nagekeken november 2026.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, locale: 'nl_BE', type: 'article' },
  alternates: { canonical: URL },
}

const BRON = {
  medirectReview: 'https://curvo.eu/nl/artikel/medirect-review',
  medirectAandelen: 'https://www.test-aankoop.be/invest/beleggen/aandelen/artikels/2026/06/medirect-verlaagt-transactiekosten-aandelen',
  medirectVsSaxo: 'https://curvo.eu/nl/artikel/medirect-vs-saxo',
  saxoRekening: 'https://www.home.saxo/nl-be/accounts/individual',
  saxoAutoInvest: 'https://www.home.saxo/nl-be/products/autoinvest',
  saxoTarieven: 'https://www.home.saxo/nl-be/campaigns/invest-for-less',
  saxoReview: 'https://curvo.eu/nl/artikel/saxo-bank-review',
  saxoBoete: 'https://www.fintechfutures.com/regulatory-actions/saxo-bank-fined-by-danish-fsa',
  spaarplannen: 'https://curvo.eu/article/best-etf-savings-plan-belgium',
}

const rows: { label: string; saxo: string; medirect: string }[] = [
  { label: 'Wie is het?', saxo: 'Belgisch bijkantoor van Saxo Bank A/S (Denemarken)', medirect: 'MeDirect Bank SA, Belgische bank (toezicht FSMA en NBB)' },
  { label: 'ETF-transactiekost (Euronext)', saxo: '0,08% met minimum €2', medirect: '€0 (alle ETF’s sinds augustus 2025)' },
  { label: 'Aandelen (Euronext)', saxo: '0,08% met minimum €2', medirect: '0,15% met minimum €2,50 (minimum sinds 1 juli 2026)' },
  { label: 'Lager tarief bij groot vermogen', saxo: '0,05% vanaf €200.000 en 0,03% vanaf €1.000.000 (minimum blijft €2)', medirect: 'Geen niveaus gevonden' },
  { label: 'Fracties van een aandeel of ETF', saxo: 'Nee, enkel hele stuks', medirect: 'Nee, enkel hele stuks' },
  { label: 'Automatisch spaarplan', saxo: 'AutoInvest: €2 per maand voor de aankopen', medirect: 'Niet op het brokerplatform (enkel via het beheerde MeManaged, vanaf €5.000)' },
  { label: 'Bewaarloon', saxo: 'Geen', medirect: 'Geen' },
  { label: 'Belgische taksen (TOB, roerende voorheffing, Reynders, meerwaardebelasting)', saxo: 'Ingehouden door Saxo', medirect: 'Ingehouden door MeDirect' },
  { label: 'Inhouding meerwaardebelasting weigeren en zelf aangeven', saxo: 'Kan (opt-out)', medirect: 'Kan (opt-out)' },
  { label: 'Securities lending (effecten uitlenen)', saxo: 'Enkel als je er zelf voor kiest (opt-in)', medirect: 'Nee' },
  { label: 'Bescherming effecten / cash', saxo: '€20.000 / €100.000 (Deens garantiefonds)', medirect: '€20.000 / €100.000 (Belgisch stelsel)' },
  { label: 'Boete van een toezichthouder (laatste 5 jaar)', saxo: 'Ja: DKK 313 miljoen, Deense toezichthouder, januari 2026 (antiwitwascontroles)', medirect: 'Geen gevonden' },
  { label: 'Effecten overzetten naar een andere bank', saxo: '€75 per lijn', medirect: '€50 per lijn (plus eventuele externe kosten)' },
]

// Aandelenorders: berekend uit brokers.ts. Enkel het voorbeeld van €1.000 bij MeDirect staat letterlijk in een bron (Test-Aankoop).
const aandelenBedragen = [500, 1000, 2500, 5000, 10000]
const lijnenVoorbeeld = [1, 3, 5]
const eur = (n: number) => `€${n.toFixed(2).replace('.', ',')}`

const faq = [
  {
    q: 'Is MeDirect of Saxo goedkoper voor ETF’s?',
    a: 'MeDirect rekent geen makelaarsloon op ETF’s. Bij Saxo betaal je €2 per maand met AutoInvest, of 0,08% met minimum €2 per losse order. Bij één aankoop per maand is MeDirect dus €24 per jaar goedkoper. De beurstaks is bij beide gelijk: voor €1.000 IWDA kom je met beurstaks op €1,20 bij MeDirect en €3,20 bij Saxo.',
  },
  {
    q: 'Is MeDirect of Saxo goedkoper voor aandelen?',
    a: 'Saxo. Op Euronext rekent Saxo 0,08% met minimum €2 en MeDirect 0,15% met minimum €2,50. Een order van €1.000 kost €2 bij Saxo en €2,50 bij MeDirect, een order van €5.000 €4 tegenover €7,50.',
  },
  {
    q: 'Heeft MeDirect een spaarplan voor ETF’s?',
    a: 'Niet op het gewone brokerplatform: daar plaats je elke aankoop zelf. MeDirect heeft wel een beheerde formule (MeManaged) met een automatisch plan, vanaf €5.000 en minstens €100 per maand. Saxo heeft AutoInvest voor €2 per maand.',
  },
  {
    q: 'Houden MeDirect en Saxo de meerwaardebelasting in?',
    a: 'Ja. Beide houden sinds 2026 de meerwaardebelasting in bij elke verkoop, naast de beurstaks, de roerende voorheffing en de Reynderstaks. Blijft je meerwaarde onder de vrijstelling van €10.000 per jaar, dan recupereer je de ingehouden taks via je belastingaangifte. Bij beide kan je de inhouding ook weigeren en de taks zelf aangeven.',
  },
  {
    q: 'Zijn MeDirect en Saxo veilig?',
    a: 'Beide staan onder toezicht (MeDirect: FSMA en NBB; Saxo: de Deense toezichthouder, met registratie bij de NBB). Cash is beschermd tot €100.000 en effecten tot €20.000 als de bank failliet gaat. Die bescherming dekt geen koersverliezen. MeDirect leent geen effecten uit; Saxo enkel als je zelf opt-in kiest. Saxo kreeg in januari 2026 een boete van DKK 313 miljoen van de Deense toezichthouder voor tekortkomingen in de antiwitwascontroles. Bij MeDirect vonden we geen boete.',
  },
]

const faqExtra = [
  {
    q: 'Wat kost overstappen van Saxo naar MeDirect?',
    a: 'Saxo rekent €75 per lijn om effecten over te zetten. Met 3 verschillende ETF’s is dat €225. Omgekeerd rekent MeDirect €50 per lijn, plus eventuele externe kosten. Je kan bestaande effecten ook laten staan en enkel nieuwe aankopen bij de andere broker doen, maar dan beheer je twee rekeningen.',
  },
]

const bronnen: Bron[] = [
  { staaft: 'ETF-kosten, 0,15% op aandelen, spaarplan, taksen, opt-out, overdracht en bescherming MeDirect', label: 'Curvo, MeDirect review (03/09/2026; vermeldt nog het oude minimum van €7)', href: BRON.medirectReview },
  { staaft: 'Minimum €2,50 op aandelen vanaf 1 juli 2026, voorbeeld €1.000', label: 'Test Aankoop Invest (29/06/2026)', href: BRON.medirectAandelen },
  { staaft: 'Voorbeeld €1.000 IWDA met beurstaks, fracties, overdrachtkosten, securities lending en bescherming van beide', label: 'Curvo, MeDirect vs Saxo (04/11/2026)', href: BRON.medirectVsSaxo },
  { staaft: 'Tarief en niveaus Saxo (Bronze, Silver, Gold), voorbeeld €5.000', label: 'Saxo België, tarieven (gelezen 05/11/2026, pagina zonder geldigheidsdatum)', href: BRON.saxoTarieven },
  { staaft: 'Bewaarloon en toezicht Saxo', label: 'Saxo België, individuele rekening (gelezen 22/10/2026)', href: BRON.saxoRekening },
  { staaft: 'Opt-out meerwaardebelasting en enkel hele stuks bij AutoInvest', label: 'Curvo, Saxo Bank review (03/09/2026)', href: BRON.saxoReview },
  { staaft: 'Boete Saxo', label: 'FinTech Futures, Saxo Bank fined by Danish FSA', href: BRON.saxoBoete },
  { staaft: 'AutoInvest-kost Saxo', label: 'Saxo België, AutoInvest (gelezen 22/10/2026)', href: BRON.saxoAutoInvest },
  { staaft: 'Storting bij AutoInvest', label: 'Curvo, ETF-spaarplannen in België (27/07/2026)', href: BRON.spaarplannen },
]

export default function SaxoVsMeDirectPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs MeDirect' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ headline: 'Saxo vs MeDirect: wie is goedkoper voor jouw manier van beleggen?', description: DESCRIPTION, url: URL, datePublished: '2026-04-18', dateModified: NAGEKEKEN })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [...faq, ...faqExtra].map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Saxo vs MeDirect' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Saxo vs MeDirect: wie is goedkoper voor jouw manier van beleggen?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Saxo en MeDirect houden allebei alle Belgische taksen in en rekenen geen bewaarloon. Het verschil zit in wat
            je koopt, hoe vaak, en wat vertrekken kost. Vul je eigen bedragen in en reken het na.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-10 border-l-4 border-l-accent" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>ETF-kosten:</strong> MeDirect €0 per order; Saxo €2 per maand (AutoInvest) of 0,08% met minimum €2 per order.</li>
            <li><strong>Aandelen:</strong> Saxo 0,08% met minimum €2; MeDirect 0,15% met minimum €2,50.</li>
            <li><strong>Spaarplan:</strong> Saxo heeft AutoInvest; op het brokerplatform van MeDirect plaats je elke aankoop zelf.</li>
            <li><strong>Uitlenen van effecten:</strong> MeDirect doet het niet; bij Saxo enkel als je zelf opt-in kiest.</li>
            <li><strong>Vertrekken:</strong> overzetten kost €50 per lijn bij MeDirect en €75 per lijn bij Saxo.</li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">
            {medirect.affiliateActive && !saxo.affiliateActive
              ? 'Via de MeDirect-link ontvangen wij een vergoeding; via de Saxo-link nu niet. Dat verandert niets aan de tarieven en berekeningen op deze pagina.'
              : 'Via knoppen met de vermelding "betaalde samenwerking" ontvangen wij een vergoeding. Dat verandert niets aan de tarieven en berekeningen op deze pagina.'}
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[saxo, medirect].map(broker => (
              broker.affiliateUrl && (
                <div key={broker.id}>
                  <a
                    href={goLink(broker.id, 'saxo-vs-medirect-top')}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="btn-outline w-full justify-center text-center py-3"
                  >
                    Naar {broker.name} →
                  </a>
                  <AffiliateLabel broker={broker} />
                </div>
              )
            ))}
          </div>
        </section>

        <section className="card mb-10" aria-labelledby="rekenhulp">
          <h2 id="rekenhulp" className="font-display text-xl font-bold text-primary mb-2">Reken je eigen kosten na</h2>
          <p className="text-sm text-gray-600 mb-4">De uitkomst is een berekening met de tarieven op deze pagina, geen advies. Je ingevulde cijfers blijven in je browser.</p>
          <SaxoRekenhulp saxo={saxo} ander={medirect} anderKleur="text-green-700" bron="saxo-vs-medirect-reken" />
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel Saxo en MeDirect</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="w-1/2 text-left py-3 pr-2 font-semibold text-blue-700">Saxo</th>
                  <th scope="col" className="w-1/2 text-left py-3 pl-2 font-semibold text-green-700">MeDirect</th>
                </tr>
              </thead>
              {rows.map(({ label, saxo: vs, medirect: vm }) => (
                <tbody key={label} className="border-b border-gray-50">
                  <tr>
                    <th scope="rowgroup" colSpan={2} className="pt-3 pb-1 text-left font-medium text-gray-700">{label}</th>
                  </tr>
                  <tr>
                    <td className="pb-3 pr-2 text-gray-600 align-top">{vs}</td>
                    <td className="pb-3 pl-2 text-gray-600 align-top">{vm}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Tarieven exclusief beurstaks. Bronnen onderaan deze pagina, nagekeken op 5 november 2026.</p>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-2">Wat kost een aandelenorder bij Saxo en MeDirect?</h2>
          <p className="text-sm text-gray-600 mb-4">Makelaarsloon voor één order op Euronext, zonder beurstaks. Hier draait het voordeel om: de gratis ETF’s van MeDirect gelden niet voor aandelen.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 text-gray-600 font-semibold">Orderbedrag</th>
                  <th scope="col" className="text-center py-3 font-semibold text-blue-700">Saxo</th>
                  <th scope="col" className="text-center py-3 font-semibold text-green-700">MeDirect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {aandelenBedragen.map(b => (
                  <tr key={b}>
                    <th scope="row" className="py-2.5 text-left font-medium text-gray-700">€{b.toLocaleString('nl-BE')}</th>
                    <td className="py-2.5 text-center text-gray-600">{eur(aandelenKost(saxo.fees, b))}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(aandelenKost(medirect.fees, b))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Berekend uit het tarief. De bronnen spreken elkaar deels tegen: Curvo vermeldt op 3/9/2026 nog een minimum van €7 bij MeDirect, Test-Aankoop meldt €2,50 sinds 1/7/2026 en rekent €2,50 voor een order van €1.000.
            De 0,15% komt enkel van Curvo. Saxo-tarief: standaardniveau Bronze.
          </p>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-2">Wat kost overstappen?</h2>
          <p className="text-sm text-gray-600 mb-4">Effecten overzetten naar een andere bank kost per lijn. Eén lijn is één soort ETF of aandeel, ongeacht hoeveel stuks je hebt.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 text-gray-600 font-semibold">Aantal lijnen</th>
                  <th scope="col" className="text-center py-3 font-semibold text-blue-700">Weg bij Saxo</th>
                  <th scope="col" className="text-center py-3 font-semibold text-green-700">Weg bij MeDirect*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lijnenVoorbeeld.map(n => (
                  <tr key={n}>
                    <th scope="row" className="py-2.5 text-left font-medium text-gray-700">{n}</th>
                    <td className="py-2.5 text-center text-gray-600">{eur(n * (saxo.transferOutFee ?? 0))}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(n * (medirect.transferOutFee ?? 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Een rekenvoorbeeld: wie 3 ETF’s van Saxo naar MeDirect overzet, betaalt €225. Bespaart die persoon daarna €24 per jaar op AutoInvest, dan duurt het ruim 9 jaar voor die kost is terugverdiend.
            Je kan ook alles laten staan en enkel nieuwe aankopen bij de andere broker doen. Verkopen en opnieuw kopen is iets anders: dan betaal je beurstaks en mogelijk meerwaardebelasting.
          </p>
          <p className="text-xs text-gray-400 mt-3">* Plus eventuele externe kosten. Tarieven: bronnen onderaan.</p>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>ETF-kosten: €0 tegenover €2</h2>
          <p>
            MeDirect maakte in augustus 2025 alle ETF’s provisievrij. Je betaalt enkel de <Link href="/belgie/tob-uitleg">beurstaks (TOB)</Link>,
            die bij elke Belgische broker even hoog is. Bij Saxo betaal je 0,08% met minimum €2 per order, of €2 per maand als je via AutoInvest koopt.
            Voor aandelen zijn beide betalend, en daar is Saxo goedkoper.
          </p>

          <h2>Spaarplan: AutoInvest tegenover zelf kopen</h2>
          <p>
            Met Saxo AutoInvest kies je ETF’s en een maandbedrag, en Saxo koopt op een vaste dag als er genoeg geld op je rekening staat.
            Je zet dat geld er zelf op, bijvoorbeeld met een doorlopende overschrijving. Bij MeDirect plaats je elke aankoop zelf;
            het automatische plan bestaat enkel in de beheerde formule MeManaged (vanaf €5.000). Bij geen van beide koop je fracties:
            is je maandbedrag lager dan de koers van één stuk, dan spaar je eerst op.
          </p>

          <h2>Belastingen</h2>
          <p>
            Beide houden de beurstaks, de roerende voorheffing, de Reynderstaks en de meerwaardebelasting in. Je hoeft je rekening niet bij de
            Nationale Bank te melden. Meer uitleg: <Link href="/broker-meerwaardebelasting-2026">meerwaardebelasting 2026 bij brokers</Link>.
          </p>

          <h2>Voor wie is welk verschil belangrijk?</h2>
          <ul>
            <li><strong>Je koopt zelf af en toe ETF’s:</strong> bij MeDirect betaal je geen makelaarsloon.</li>
            <li><strong>Je wil dat aankopen elke maand vanzelf gebeuren:</strong> dat kan bij Saxo met AutoInvest (€2 per maand).</li>
            <li><strong>Je belegt ook in aandelen, obligaties of opties:</strong> vergelijk de tarieven per product; Saxo heeft het bredere aanbod.</li>
            <li><strong>Je wil later misschien overstappen:</strong> reken met €50 (MeDirect) of €75 (Saxo) per lijn.</li>
          </ul>
          <p>
            Nog twijfels over de broker zelf? Op onze <Link href="/methodologie">methodologiepagina</Link> staat hoe we toezicht en boetes wegen.
            Meer details: <Link href="/reviews/medirect">review van MeDirect</Link>, <Link href="/reviews/saxo-bank-belgie">review van Saxo</Link>{' '}
            en <Link href="/vergelijking/bolero-vs-saxo">Bolero vs Saxo</Link>.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen over Saxo en MeDirect</h2>
          <div className="space-y-4">
            {[...faq, ...faqExtra].map(({ q, a }) => (
              <div key={q} className="card">
                <h3 className="font-semibold text-primary mb-2">{q}</h3>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN} datumPerBron />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[saxo, medirect].map(broker => (
            broker.affiliateUrl && (
              <div key={broker.id} className="card flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{broker.name}</p>
                  <p className="text-sm text-gray-500">{broker.tagline}</p>
                  <AffiliateLabel broker={broker} />
                </div>
                <a href={goLink(broker.id, 'saxo-vs-medirect-onder')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0 text-sm py-2">Naar {broker.name} →</a>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}
