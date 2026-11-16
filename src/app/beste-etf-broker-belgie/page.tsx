import type { Metadata } from 'next'
import Link from 'next/link'
import { brokers } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { EtfKostenTabel, maandelijkseEtfKost } from '@/components/broker/EtfKostenTabel'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { Bronnen, articleJsonLd, type Bron } from '@/components/ui/Bronnen'
import { EtfJaarkostRekenhulp } from '@/components/tools/EtfJaarkostRekenhulp'

const URL = 'https://www.bestebroker.be/beste-etf-broker-belgie'
const TITLE = 'Beste ETF-broker België 2026: de taks die je over het hoofd ziet'
const DESCRIPTION =
  '€300 per maand in een ETF kost €0 tot €71 per jaar aan de broker. Eén andere keuze weegt vaak zwaarder. Reken het na voor 6 brokers, met bron.'
const NAGEKEKEN = '2026-11-16'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: URL },
}

// Volgorde = totaalscore uit /methodologie (berekend in brokers.ts), geen aanbeveling.
const opScore = [...brokers].sort((a, b) => b.rating - a.rating)

const BRON = {
  saxoAutoInvest: 'https://www.home.saxo/nl-be/products/autoinvest',
  saxoReview: 'https://curvo.eu/nl/artikel/saxo-bank-review',
  boleroTarieven: 'https://www.bolero.be/uploads/media/667ecf0aabd9a/101-tarieven-nl.pdf',
  boleroReview: 'https://curvo.eu/nl/artikel/bolero-review',
  medirectReview: 'https://curvo.eu/nl/artikel/medirect-review',
  degiroReview: 'https://curvo.eu/nl/artikel/degiro-review',
  trReview: 'https://curvo.eu/nl/artikel/trade-republic-review',
  spaarplannen: 'https://curvo.eu/article/best-etf-savings-plan-belgium',
  keytradeTarieven: 'https://keytradebank.be/en/new-trading-tariffs-2025',
  tob: 'https://curvo.eu/nl/artikel/hoe-je-de-beurstaks-van-een-etf-berekent',
  degiroKostenEtf: 'https://curvo.eu/nl/artikel/degiro-kosten-etf',
  goedkoopsteEtf: 'https://curvo.eu/nl/artikel/goedkoopste-broker-belgie-etf',
  besteEtf: 'https://curvo.eu/nl/artikel/beste-broker-belgie-etf',
}

const bronnen: Bron[] = [
  { staaft: 'Kost per ETF-order van €1.000: Saxo €2, Trade Republic €1, DEGIRO €1, MeDirect €0, Bolero €5, Keytrade €5,95; DEGIRO €2,50 per beurs per jaar', label: 'Curvo, beste broker België voor ETF’s (03/11/2026)', href: BRON.besteEtf },
  { staaft: 'Jaarkost transactie + beurstaks bij €300 per maand (zelfde tarieven)', label: 'Curvo, goedkoopste broker België voor ETF’s (05/11/2026)', href: BRON.goedkoopsteEtf },
  { staaft: 'DEGIRO: €1 enkel via Tradegate; €2 + €1 behandelingskosten buiten de kernselectie of op een andere beurs', label: 'Curvo, DEGIRO-kosten voor ETF’s (22/10/2026)', href: BRON.degiroKostenEtf },
  { staaft: 'Saxo: 0,08% met minimum €2 per order', label: 'Curvo, Saxo review', href: BRON.saxoReview },
  { staaft: 'Saxo AutoInvest: €2 per maand', label: 'Saxo, AutoInvest', href: BRON.saxoAutoInvest },
  { staaft: 'Spaarplannen Saxo (geen minimum), Trade Republic (kosteloos, vanaf €1) en Bolero (enkel hele stuks)', label: 'Curvo, beste ETF-spaarplan België (22/10/2026)', href: BRON.spaarplannen },
  { staaft: 'Staffel Bolero', label: 'Bolero, tarievenlijst S101', href: BRON.boleroTarieven },
  { staaft: 'Taksen Bolero', label: 'Curvo, Bolero review (08/10/2026)', href: BRON.boleroReview },
  { staaft: 'MeDirect: geen makelaarsloon op ETF’s', label: 'Curvo, MeDirect review (03/09/2026)', href: BRON.medirectReview },
  { staaft: 'DEGIRO: €1 kernselectie (Tradegate), €3 andere ETF’s, TOB ingehouden', label: 'Curvo, DEGIRO review (03/09/2026)', href: BRON.degiroReview },
  { staaft: 'Trade Republic: €1 per order, Belgische rekening sinds 15/09/2026', label: 'Curvo, Trade Republic review (18/09/2026)', href: BRON.trReview },
  { staaft: 'Staffel Keytrade (€2,45 / €5,95 / €14,95)', label: 'Keytrade Bank, tarieven 2025', href: BRON.keytradeTarieven },
  { staaft: 'TOB-tarieven ETF’s en maxima (0,12% max. €1.300 · 0,35% max. €1.600 · 1,32% max. €4.000); VWCE in België geregistreerd', label: 'Curvo, beurstaks ETF (08/10/2026)', href: BRON.tob },
]

const spaarplan: Record<string, string> = {
  saxo: 'AutoInvest: €2 per maand, geen minimumbedrag, aankoop rond de 5de van de maand',
  'trade-republic': 'Spaarplan zonder transactiekost, vanaf €1, ook in fracties',
  bolero: 'Periodiek beleggen enkel in hele stuks, tegen de gewone staffel',
  medirect: 'Geen spaarplan: je koopt zelf (€0 per ETF-order)',
  degiro: 'Geen spaarplan: je koopt zelf',
  keytrade: 'Geen ETF-spaarplan: je koopt zelf',
}

const eur2 = (n: number) => `€${n.toFixed(2).replace('.', ',')}`

const faq = [
  {
    q: 'Welke ETF-broker is de beste in België?',
    a: 'Dat hangt af van hoe je belegt. Koop je zelf, dan telt vooral de kost per order: €0 bij MeDirect, €1 bij Trade Republic en bij DEGIRO (ETF uit de kernselectie, via Tradegate). Wil je dat de aankoop elke maand automatisch gebeurt, dan hebben Saxo (AutoInvest) en Trade Republic (spaarplan) dat. Wil je geen belastingaangifte voor je beleggingen, kijk dan of de broker alle Belgische taksen inhoudt: DEGIRO doet dat enkel voor de TOB. Dit is algemene informatie, geen persoonlijk advies.',
  },
  {
    q: 'Wat kost €100 per maand in een ETF?',
    a: `Aan transactiekosten per jaar: ${opScore.map(b => `${b.name} ${eur2(maandelijkseEtfKost(b, 100).perMaand * 12)}`).join(', ')}. Bij DEGIRO geldt dat voor een ETF uit de kernselectie die je via Tradegate koopt; een andere ETF of een andere beurs kost €3 per order. De beurstaks (TOB) komt er bij elke broker bij: 0,12% voor een ETF die niet in België geregistreerd is, 1,32% voor een in België geregistreerde kapitaliserende ETF zoals VWCE.`,
  },
  {
    q: 'Hoeveel beurstaks betaal je op een ETF?',
    a: 'Voor een ETF die in de Europese Economische Ruimte maar niet in België geregistreerd is, 0,12% bij aankoop en verkoop (max. €1.300 per transactie). Is een kapitaliserende ETF in België geregistreerd (bv. VWCE), dan betaal je 1,32% bij aankoop én verkoop (max. €4.000). Voor een ETF van buiten de EER is het 0,35%. In de factsheet zie je waar de ETF geregistreerd is.',
  },
  {
    q: 'Wat weegt zwaarder: de broker of de beurstaks?',
    a: 'Bij een in België geregistreerde kapitaliserende ETF (zoals VWCE) vaak de beurstaks. Wie €300 per maand belegt, betaalt dan 1,32% of €47,52 per jaar aan beurstaks, bij elke broker. Bij een ETF die niet in België geregistreerd is (zoals IWDA) is dat 0,12% of €4,32 per jaar. Aan de broker betaal je bij dat bedrag €0 tot €71,40 per jaar: bij vier van de zes brokers is de beurstaks op zo’n ETF dus groter dan de makelaarskosten. Welke ETF bij je past, hangt van meer af dan de taks: dit is geen advies.',
  },
  {
    q: 'Kan ik in België automatisch elke maand in een ETF beleggen?',
    a: 'Ja. Saxo heeft AutoInvest (€2 per maand) en Trade Republic een gratis spaarplan, vanaf €1 en ook in fracties. Bolero laat periodiek beleggen toe, maar enkel in hele stuks en tegen de gewone orderkost. MeDirect, Keytrade en DEGIRO hebben geen ETF-spaarplan.',
  },
  {
    q: 'Moet ik bij een ETF-broker zelf belastingen aangeven?',
    a: 'Bij Saxo, Bolero, MeDirect, Keytrade en de Belgische rekening van Trade Republic niet: zij houden de TOB, de Reynderstaks en de roerende voorheffing in, en ook de meerwaardebelasting (bij Trade Republic als je ervoor kiest). Bij DEGIRO geef je alles behalve de TOB zelf aan en meld je de rekening bij de Nationale Bank.',
  },
]

export default function BestEtfBrokerPage() {
  const jsonLd = [
    articleJsonLd({ headline: TITLE, description: DESCRIPTION, url: URL, dateModified: NAGEKEKEN }),
    breadcrumbJsonLd([
      { label: 'Beste broker België', href: '/beste-broker-belgie' },
      { label: 'ETF-broker', href: '/beste-etf-broker-belgie' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Beste broker België', href: '/beste-broker-belgie' }, { label: 'ETF-broker' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Beste ETF-broker in België 2026: kosten per maand, spaarplan en taksen
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Beleg je elke maand een vast bedrag in een breed gespreide ETF? Dan tellen drie dingen: de kost per aankoop, of
            de broker automatisch kan kopen, en wie de Belgische taksen afhandelt. Hieronder staat het per broker, met bron.
          </p>
          <LastUpdated date={NAGEKEKEN} />
        </header>

        <section className="card mb-10 max-w-3xl" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li><strong>Kost per aankoop:</strong> €0 (MeDirect) tot €5,95 (Keytrade) voor een ETF-order van €1.000. Saxo en Trade Republic kopen ook automatisch elke maand.</li>
            <li><strong>Beurstaks:</strong> bij elke broker gelijk, maar 0,12% of 1,32% naargelang de ETF. Bij €300 per maand is dat €4,32 of €47,52 per jaar.</li>
            <li><strong>Aangifte:</strong> alle zes houden de beurstaks in; enkel bij DEGIRO geef je de rest zelf aan en meld je de rekening bij de Nationale Bank.</li>
            <li><a href="#rekenhulp" className="text-accent hover:underline">Reken je eigen maandbedrag door</a> (broker + beurstaks).</li>
          </ul>
        </section>

        {/* Kosten */}
        <section className="mb-10" aria-labelledby="kosten">
          <h2 id="kosten" className="font-display text-2xl font-bold text-primary mb-2">Wat kost een ETF per maand bij elke broker?</h2>
          <p className="text-gray-600 max-w-3xl mb-4">
            Transactiekosten per jaar voor één aankoop per maand, berekend met de tarieven nagekeken in november 2026. Per broker nemen
            we de goedkoopste manier (losse order, spaarplan of AutoInvest). Geen van deze brokers rekent bewaarloon.
          </p>
          <EtfKostenTabel brokers={opScore} maandbedragen={[100, 500]} eenmalig={1000} />
          <p className="text-sm text-gray-500 mt-3 max-w-3xl">
            De tabel volgt de totaalscore van onze <Link href="/methodologie" className="text-accent hover:underline">methodologie</Link>,
            niet de laagste kost. Reken je eigen bedrag na met de{' '}
            <Link href="/tools/brokerkosten-calculator" className="text-accent hover:underline">kostencalculator</Link>.
          </p>
        </section>

        {/* Rekenhulp */}
        <section className="card mb-10" aria-labelledby="rekenhulp">
          <h2 id="rekenhulp" className="font-display text-xl font-bold text-primary mb-2">Rekenhulp: wat kost jouw maandbedrag per jaar, beurstaks inbegrepen?</h2>
          <p className="text-sm text-gray-600 mb-4 max-w-3xl">
            Vul je maandbedrag in en kies de soort ETF. Je ziet per broker de makelaarskosten (goedkoopste manier: losse order,
            spaarplan of AutoInvest) en de beurstaks, met de tarieven uit de bronnen onderaan.
          </p>
          <EtfJaarkostRekenhulp brokers={opScore} />
        </section>

        {/* Spaarplan */}
        <section className="mb-10" aria-labelledby="spaarplan">
          <h2 id="spaarplan" className="font-display text-2xl font-bold text-primary mb-4">Welke broker heeft een ETF-spaarplan?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">ETF-spaarplannen per broker</caption>
              <thead className="text-left border-b border-gray-200">
                <tr>
                  <th scope="col" className="py-3 pr-3 font-semibold text-gray-700">Broker</th>
                  <th scope="col" className="py-3 pl-2 font-semibold text-gray-700">Automatisch beleggen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {opScore.map(b => (
                  <tr key={b.id}>
                    <th scope="row" className="py-2.5 pr-3 text-left font-medium text-primary">{b.name}</th>
                    <td className="py-2.5 pl-2 text-gray-700">{spaarplan[b.id] ?? 'Niet nagekeken'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Taksen */}
        <section className="mb-10 prose-custom max-w-3xl" aria-labelledby="taksen">
          <h2 id="taksen">Welke taksen betaal je op een ETF?</h2>
          <p>
            De keuze van de ETF bepaalt de beurstaks, niet de broker. Twee wereldwijde ETF’s die beleggers vaak vergelijken: IWDA
            (niet in België geregistreerd, 0,12%) en VWCE (in België geregistreerd en kapitaliserend, 1,32%). Bij €300 per
            maand is dat €4,32 tegenover €47,52 per jaar aan aankopen, en bij verkoop betaal je opnieuw. In de factsheet of
            het prospectus van de ETF zie je waar hij geregistreerd is. Dit is een rekenvoorbeeld, geen aanbeveling voor een ETF.
          </p>
          <p>
            <strong>Beurstaks (TOB).</strong> Bij elke aankoop en verkoop. Voor een ETF die in de Europese Economische Ruimte
            maar niet in België geregistreerd is: 0,12% (max. €1.300 per transactie). Een in België geregistreerde
            kapitaliserende ETF, zoals VWCE: 1,32% bij aankoop én verkoop (max. €4.000). Een ETF van buiten de EER: 0,35%. Alle zes de brokers houden
            de TOB in. Meer in <Link href="/belgie/tob-uitleg">TOB uitgelegd</Link>.
          </p>
          <p>
            <strong>Reynderstaks en roerende voorheffing.</strong> De Reynderstaks geldt bij verkoop van een ETF die voor meer dan 10% in obligaties belegt; roerende voorheffing betaal je op uitgekeerde dividenden. Saxo, Bolero, MeDirect,
            Keytrade en de Belgische rekening van Trade Republic houden ze in; bij DEGIRO geef je ze zelf aan.
          </p>
          <p>
            <strong>Meerwaardebelasting.</strong> Sinds 2026 10% op meerwaarden boven €10.000 per jaar. Brokers met een
            Belgische rekening houden ze in bij verkoop (opt-out mogelijk). Zie{' '}
            <Link href="/broker-meerwaardebelasting-2026">meerwaardebelasting per broker</Link>.
          </p>
        </section>

        {/* Broker cards */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-2">De brokers voor ETF-beleggers van dichtbij</h2>
          <p className="text-sm text-gray-500 mb-6">Gerangschikt op totaalscore volgens de methodologie, geen aanbeveling.</p>
          <div className="space-y-6">
            {opScore.map(broker => (
              <BrokerCard key={broker.id} broker={broker} source="etf-broker-page" />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10 prose-custom max-w-3xl" aria-labelledby="faq">
          <h2 id="faq">Veelgestelde vragen over ETF-brokers</h2>
          {faq.map(f => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>

        <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN} datumPerBron />

        <nav aria-label="Verder lezen" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            { href: '/beste-broker-belgie', label: 'Alle brokers vergeleken', sub: 'Kosten, taksen en veiligheid' },
            { href: '/belgie/etf-kopen-beginners', label: 'ETF kopen als beginner', sub: 'Stap voor stap' },
            { href: '/vergelijking/saxo-vs-medirect', label: 'Saxo vs MeDirect', sub: 'AutoInvest of €0 per order' },
            { href: '/goedkoopste-broker-belgie', label: 'Goedkoopste broker', sub: 'Kosten per order naast elkaar' },
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
