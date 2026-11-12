import type { Metadata } from 'next'
import Link from 'next/link'
import { brokers } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'

const URL = 'https://www.bestebroker.be/belgie/tob-uitleg'
const NAGEKEKEN = '2026-11-12'
const TITLE = 'TOB (beurstaks) 2026: tarieven, berekening en aangifte'
const DESCRIPTION =
  '0,12%, 0,35% of 1,32%? Zo zie je welk TOB-tarief jouw ETF krijgt, welke brokers de beurstaks inhouden en wat een te late aangifte kost.'

const bronnen: Bron[] = [
  { staaft: 'Tarieven en maxima, obligaties, IPO, regel per compartiment, berekening zonder makelaarsloon, brokers die de TOB regelen', label: 'Curvo, beurstaks (TOB) (3/11/2026)', href: 'https://curvo.eu/nl/artikel/beurstaks-tob' },
  { staaft: 'Zelf aangeven via MyMinfin of per post, termijn, rekeningnummer, boetes', label: 'Curvo, TOB-aangifte (4/11/2026)', href: 'https://curvo.eu/nl/artikel/tob-aangifte' },
  { staaft: 'Wanneer zelf aangeven, maxima, rekeningnummer, termijn', label: 'KBC Private Banking, beurstaks bij buitenlandse brokers (8/10/2026)', href: 'https://www.kbc.be/private-banking/nl/nieuws/fiscaal-juridisch/Belgische-beurstaks-een-vaak-vergeten-verplichting-bij-buitenlandse-broker.html' },
  { staaft: 'Tarieven per effecttype, beursintroductie 0%, TOB bij buitenlandse brokers sinds 2017', label: 'Test-Aankoop, taks op beursverrichtingen', href: 'https://www.test-aankoop.be/invest/fiscaliteit-en-wetgeving/belastingheffing/dossiers/taks-op-beursverrichtingen-tob' },
  { staaft: 'Vrijstellingen (uitgifte, niet-inwoners, geen tussenpersoon), afgeleide producten, aansprakelijke vertegenwoordiger, boete per begonnen week', label: 'Forum for the Future, FAQ taks op de beursverrichtingen', href: 'https://blog.forumforthefuture.be/nl/article/faq-taks-op-de-beursverrichtingen/24406' },
  { staaft: 'TOB VWCE 1,32% en IWDA 0,12%', label: 'Curvo, VWCE vs IWDA (22/10/2026)', href: 'https://curvo.eu/nl/artikel/vwce-vs-iwda' },
  { staaft: 'Officiële informatie en formulieren', label: 'FOD Financiën, taks op beursverrichtingen', href: 'https://financien.belgium.be/nl/experten_partners/investeerders/taks-op-beursverrichtingen' },
]

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, locale: 'nl_BE', type: 'article' },
  alternates: { canonical: URL },
}

type Tarief = { type: string; noot?: string; tarief: string; max: string }

const aandelenEnFondsen: Tarief[] = [
  { type: 'Aandelen', noot: 'Ook op een buitenlandse beurs', tarief: '0,35%', max: '€1.600' },
  { type: 'Aandelen bij een beursgang (IPO)', tarief: '0%', max: '–' },
  { type: 'ETF geregistreerd in de EER, niet in België', noot: 'Kapitaliserend of uitkerend, bv. IWDA, EMIM', tarief: '0,12%', max: '€1.300' },
  { type: 'ETF geregistreerd in België, kapitaliserend', noot: 'Bv. VWCE. Bij aankoop én verkoop', tarief: '1,32%', max: '€4.000' },
  { type: 'ETF geregistreerd in België, uitkerend', tarief: '0,12%', max: '€1.300' },
  { type: 'ETF niet geregistreerd in de EER', tarief: '0,35%', max: '€1.600' },
  { type: 'ETC (grondstof of munt)', tarief: '0,35%', max: '€1.600' },
  { type: 'Niet-beursgenoteerde bevek, kapitaliserend', noot: 'Enkel bij verkoop (inkoop), aankoop 0%', tarief: '1,32%', max: '€4.000' },
]

const obligaties: Tarief[] = [
  { type: 'Lineaire obligatie (OLO)', tarief: '0%', max: '–' },
  { type: 'Staatsbon', tarief: '0,12%', max: '€1.300' },
  { type: 'Andere obligaties', noot: 'Aankoop 0%, verkoop 0,12%', tarief: '0 / 0,12%', max: '€1.300' },
]

/** TOB per transactie: tarief × bedrag, met het wettelijke maximum per transactie. */
function tob(bedrag: number, tarief: number, max: number) {
  return Math.min(bedrag * tarief, max)
}
const tariefKolommen = [
  { label: '0,12%', tarief: 0.0012, max: 1300 },
  { label: '0,35%', tarief: 0.0035, max: 1600 },
  { label: '1,32%', tarief: 0.0132, max: 4000 },
]
const voorbeeldBedragen = [500, 5000, 50000, 500000]
const euro = (n: number) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: n >= 1000 ? 0 : 2, maximumFractionDigits: n >= 1000 ? 0 : 2 }).format(n)

const euroRond = (n: number) => new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

/** Brokers zonder review op deze site: stand volgens Curvo (3/11/2026). */
const andereBrokers = [
  { naam: 'Interactive Brokers', regelt: false },
  { naam: 'eToro', regelt: false },
  { naam: 'Revolut', regelt: false },
  { naam: 'Trading 212', regelt: false },
]

const faq = [
  {
    q: 'Wat is de TOB (beurstaks)?',
    a: 'De taks op beursverrichtingen (TOB) is een Belgische belasting op elke aankoop en elke verkoop van effecten via een tussenpersoon. Het tarief is 0,12%, 0,35% of 1,32%, afhankelijk van het effect, met een maximum per transactie van €1.300, €1.600 of €4.000.',
  },
  {
    q: 'Hoeveel TOB betaal je op een ETF?',
    a: 'Dat hangt af van waar de ETF geregistreerd is. In de EER maar niet in België (zoals IWDA): 0,12%. In België geregistreerd en kapitaliserend (zoals VWCE): 1,32%. In België geregistreerd en uitkerend: 0,12%. Niet geregistreerd in de EER: 0,35%.',
  },
  {
    q: 'Wordt de TOB berekend op het bedrag met of zonder makelaarsloon?',
    a: 'Zonder. Bij een aankoop is de basis het bedrag dat je voor de effecten betaalt, bij een verkoop het bedrag dat je ontvangt, telkens zonder het makelaarsloon van de broker.',
  },
  {
    q: 'Moet ik de TOB zelf aangeven?',
    a: 'Enkel als je broker de TOB niet inhoudt. Belgische brokers en onder meer DEGIRO, Saxo en Trade Republic (Belgische rekening) houden ze in. Bij Interactive Brokers, eToro, Revolut en Trading 212 geef je ze zelf aan via MyMinfin, uiterlijk de laatste werkdag van de tweede maand na de transactie.',
  },
  {
    q: 'Wat als ik de TOB te laat aangeef?',
    a: 'Voor een te late aangifte geldt een boete van €50 per begonnen week vertraging, tot maximaal 52 weken. Een onjuiste of onvolledige aangifte kan een boete van vijf keer de ontdoken taks opleveren, met een minimum van €250. Daarbovenop komt nalatigheidsinterest.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  inLanguage: 'nl-BE',
  dateModified: NAGEKEKEN,
  mainEntityOfPage: URL,
  publisher: { '@type': 'Organization', name: 'BesteBroker.be', url: 'https://www.bestebroker.be' },
}

function TariefTabel({ rijen, caption }: { rijen: Tarief[]; caption: string }) {
  return (
    <table className="w-full text-sm mb-6">
      <caption className="text-left font-semibold text-primary mb-2">{caption}</caption>
      <thead className="border-b border-gray-100 text-gray-600">
        <tr>
          <th scope="col" className="text-left py-2 font-semibold">Type effect</th>
          <th scope="col" className="text-right py-2 font-semibold pl-2">Tarief</th>
          <th scope="col" className="text-right py-2 font-semibold pl-2">Max.</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {rijen.map(({ type, noot, tarief, max }) => (
          <tr key={type}>
            <td className="py-2.5">
              <span className="font-medium">{type}</span>
              {noot && <span className="block text-xs text-gray-500">{noot}</span>}
            </td>
            <td className="py-2.5 pl-2 text-right font-bold text-accent whitespace-nowrap">{tarief}</td>
            <td className="py-2.5 pl-2 text-right whitespace-nowrap">{max}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function TobUitlegPage() {
  const crumbs = [{ label: 'België fiscaal', href: '/beste-broker-belgie' }, { label: 'TOB uitgelegd' }]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={crumbs} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            TOB (beurstaks) in 2026: tarieven, berekening en aangifte
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            De taks op beursverrichtingen betaal je bij elke aankoop én elke verkoop. Voor de meeste ETF’s is dat 0,12%, voor
            VWCE 1,32%. Hieronder: alle tarieven, hoe je het tarief van jouw ETF vindt, welke brokers de taks voor je inhouden
            en hoe je ze zelf aangeeft als dat niet zo is.
          </p>
          <LastUpdated date={NAGEKEKEN} />
        </header>

        <section className="card mb-10" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>Drie tarieven: <strong>0,12%</strong>, <strong>0,35%</strong> en <strong>1,32%</strong>, met een maximum van €1.300, €1.600 en €4.000 per transactie.</li>
            <li>Je betaalt bij aankoop én verkoop, op het bedrag zonder makelaarsloon.</li>
            <li>Belgische brokers, DEGIRO, Saxo en Trade Republic (Belgische rekening) houden de TOB in. Bij onder meer Interactive Brokers, eToro, Revolut en Trading 212 geef je ze zelf aan.</li>
            <li>Zelf aangeven: via MyMinfin, uiterlijk de laatste werkdag van de tweede maand na de transactie. Te laat kost €50 per begonnen week.</li>
          </ul>
        </section>

        <section className="card mb-10" aria-labelledby="tarieven">
          <h2 id="tarieven" className="font-display text-xl font-bold text-primary mb-4">TOB-tarieven per effecttype</h2>
          <TariefTabel rijen={aandelenEnFondsen} caption="Aandelen, ETF’s en fondsen" />
          <TariefTabel rijen={obligaties} caption="Obligaties" />
          <p className="text-xs text-gray-500">
            Het maximum geldt per transactie: hetzelfde effect, dezelfde persoon, dezelfde markt. Bij intekening op nieuwe
            effecten (uitgifte) betaal je geen TOB. Opties, futures en CFD’s vallen er niet onder. De tarieven en maxima zijn
            sinds 2018 niet gewijzigd; geen van de bronnen meldt een wijziging in 2025 of 2026.
          </p>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Welk TOB-tarief krijgt jouw ETF?</h2>
          <p>
            Bij een ETF hangt het tarief niet af van wat erin zit, maar van waar het fonds <strong>geregistreerd</strong> is en of
            het <strong>kapitaliserend</strong> (acc) of <strong>uitkerend</strong> (dist) is. Zo vind je het:
          </p>
          <ol>
            <li>Zoek de ISIN van je ETF op (begint vaak met IE of LU).</li>
            <li>Kijk in de factsheet of op de site van de uitgever in welke landen het fonds geregistreerd is voor verkoop.</li>
            <li>Staat België erbij en is het kapitaliserend? Dan is het 1,32%. Anders is het 0,12% (EER) of 0,35% (buiten de EER).</li>
          </ol>
          <p>
            Let op één valkuil: is <strong>één aandelenklasse</strong> van een fonds in België geregistreerd, dan beschouwt de
            fiscus alle klassen van dat compartiment als Belgisch geregistreerd. Een kapitaliserende klasse kan dan 1,32% kosten,
            ook al staat België niet in haar eigen factsheet. Daarom kost VWCE 1,32% en IWDA 0,12%, hoewel beide in Ierland
            gevestigd zijn. Meer in <Link href="/belgie/vwce-vs-iwda">VWCE vs IWDA</Link>. Twijfel je? Curvo heeft een{' '}
            <a href="https://curvo.eu/nl/beurstaks-etf-checker" target="_blank" rel="noopener noreferrer">beurstaks-checker per ISIN</a>.
          </p>

          <h2>Zo bereken je de TOB</h2>
          <p>
            TOB = bedrag van de transactie × tarief, met het maximum per transactie. Bij een aankoop is het bedrag wat je voor de
            effecten betaalt, bij een verkoop wat je ontvangt, telkens <strong>zonder</strong> het makelaarsloon van de broker.
            Koop je in dollar, dan reken je om naar euro tegen de koers van de transactiedag.
          </p>
        </div>

        <section className="card mb-10" aria-labelledby="voorbeelden">
          <h2 id="voorbeelden" className="font-display text-xl font-bold text-primary mb-4">Rekenvoorbeelden: TOB per aankoop</h2>
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 text-gray-600">
              <tr>
                <th scope="col" className="text-left py-2 font-semibold">Bedrag</th>
                {tariefKolommen.map(k => (
                  <th key={k.label} scope="col" className="text-right py-2 font-semibold pl-2">{k.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {voorbeeldBedragen.map(b => (
                <tr key={b}>
                  <td className="py-2.5 font-medium whitespace-nowrap">{euroRond(b)}</td>
                  {tariefKolommen.map(k => {
                    const v = tob(b, k.tarief, k.max)
                    return (
                      <td key={k.label} className="py-2.5 pl-2 text-right whitespace-nowrap">
                        {euro(v)}{v === k.max && <sup aria-label="maximum bereikt">*</sup>}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-3">
            * Maximum per transactie bereikt. Bij verkoop betaal je opnieuw TOB op het verkoopbedrag. Voorbeeld: €500 in IWDA
            kost €0,60 TOB bij aankoop; €500 in VWCE kost €6,60.
          </p>
        </section>

        <section className="card mb-10" aria-labelledby="brokers">
          <h2 id="brokers" className="font-display text-xl font-bold text-primary mb-2">Welke brokers houden de TOB in?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Houdt je broker de TOB in, dan zie je ze als aparte lijn op je afrekening en hoef je niets te doen. Doet hij dat niet,
            dan geef je ze zelf aan.
          </p>
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 text-gray-600">
              <tr>
                <th scope="col" className="text-left py-2 font-semibold">Broker</th>
                <th scope="col" className="text-left py-2 font-semibold pl-2">Houdt TOB in?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {brokers.map(b => (
                <tr key={b.slug}>
                  <td className="py-2.5">
                    <Link href={`/reviews/${b.slug}`} className="font-medium text-accent hover:underline">{b.name}</Link>
                  </td>
                  <td className="py-2.5 pl-2">
                    {b.taxes.tob ? 'Ja' : 'Nee, zelf aangeven'}
                    {b.slug === 'trade-republic-belgie' && (
                      <span className="block text-xs text-gray-500">Belgische rekening (sinds 15/09/2026). Oude Duitse rekening: zelf aangeven.</span>
                    )}
                  </td>
                </tr>
              ))}
              {andereBrokers.map(b => (
                <tr key={b.naam}>
                  <td className="py-2.5 font-medium">{b.naam}</td>
                  <td className="py-2.5 pl-2">{b.regelt ? 'Ja' : 'Nee, zelf aangeven'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-3">
            Brokers met een review: onze eigen controle (zie de review). Interactive Brokers, eToro, Revolut en Trading 212:
            volgens Curvo (3/11/2026), niet door ons nagekeken. Wil je zien wat elke broker nog meer inhoudt (roerende
            voorheffing, meerwaardebelasting)? Zie <Link href="/beste-broker-belgie" className="text-accent hover:underline">brokers
            in België vergeleken</Link> en <Link href="/broker-meerwaardebelasting-2026" className="text-accent hover:underline">wie
            regelt de meerwaardebelasting</Link>.
          </p>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>TOB zelf aangeven: stap voor stap</h2>
          <p>
            Sinds 2017 ben je als Belgische inwoner zelf verantwoordelijk voor de TOB op orders via een buitenlandse broker die
            ze niet inhoudt. Je geeft aan en betaalt per maand waarin je transacties deed.
          </p>
          <ol>
            <li>Log in op <strong>MyMinfin</strong> en zoek de aangifte voor de taks op beursverrichtingen (onder de diverse taksen). Per post kan ook, met het formulier van de FOD Financiën.</li>
            <li>Vul per transactie de datum, het type effect, het bedrag in euro en het tarief in.</li>
            <li>Betaal het totaal op de rekening die MyMinfin opgeeft (volgens Curvo en KBC: BE39 6792 0022 9319), met de gestructureerde mededeling uit de aangifte.</li>
            <li>Doe aangifte en betaling uiterlijk op de <strong>laatste werkdag van de tweede maand</strong> na de maand van de transactie. Een aankoop in maart geef je dus uiterlijk eind mei aan.</li>
          </ol>

          <h3>Wat kost een te late of foute aangifte?</h3>
          <ul>
            <li>Te laat: <strong>€50 per begonnen week</strong>, tot maximaal 52 weken.</li>
            <li>Onjuist of onvolledig: tot <strong>vijf keer de ontdoken taks</strong>, met een minimum van €250.</li>
            <li>Te laat betaald: daarbovenop nalatigheidsinterest.</li>
          </ul>
          <p>
            Vergeten? Geef de gemiste maanden zo snel mogelijk alsnog aan: de boete voor laattijdigheid loopt per week op.
          </p>

          <h2>Wanneer betaal je geen TOB?</h2>
          <ul>
            <li>Bij intekening op nieuwe effecten (uitgifte, beursgang).</li>
            <li>Bij een lineaire obligatie (OLO) en bij de aankoop van andere obligaties (bij verkoop wel 0,12%).</li>
            <li>Op opties, futures en CFD’s.</li>
            <li>Bij een rechtstreekse verkoop tussen twee particulieren, zonder tussenpersoon.</li>
            <li>Als je geen Belgische inwoner bent en voor eigen rekening handelt.</li>
          </ul>
          <p>
            De TOB staat los van de <Link href="/belgie/meerwaardebelasting-broker">meerwaardebelasting van 10% sinds 2026</Link>
            {' '}en van de <Link href="/belgie/buitenlandse-broker-nbb-aangifte">NBB-melding van een buitenlandse rekening</Link>.
          </p>
        </div>

        <section className="card mb-10" aria-labelledby="faq">
          <h2 id="faq" className="font-display text-xl font-bold text-primary mb-4">Veelgestelde vragen over de TOB</h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-semibold text-primary">{q}</h3>
                <p className="text-gray-700 text-sm mt-1">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN} datumPerBron />

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Verwante pagina's">
          {[
            { href: '/beste-broker-belgie', label: 'Brokers in België vergeleken', sub: 'Kosten en wat elke broker inhoudt' },
            { href: '/belgie/vwce-vs-iwda', label: 'VWCE vs IWDA', sub: 'Waarom de TOB 1,32% of 0,12% is' },
            { href: '/belgie/meerwaardebelasting-broker', label: 'Meerwaardebelasting 2026', sub: 'De 10%-belasting uitgelegd' },
            { href: '/belgie/buitenlandse-broker-nbb-aangifte', label: 'NBB-aangifte', sub: 'Buitenlandse rekening melden' },
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
