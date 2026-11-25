import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'
import { partners } from '@/data/partners'
import { goLink } from '@/lib/affiliateLinks'

const NAGEKEKEN = '2026-11-25'
const URL = 'https://www.bestebroker.be/belgie/belastingvrij-verkopen-voor-31-december'
const TITLE = 'Belastingvrij verkopen vóór 31 december: wat gaat verloren?'
const DESCRIPTION =
  'Je vrijstelling van €10.000 meerwaarde schuift amper door naar 2027. Zo werkt ze voor alleenstaanden en koppels, en dit doet je broker níet voor je.'

const BRON = {
  bolero: 'https://www.bolero.be/nl/lp/meerwaardebelasting/vrijstelling-en-minderwaarde',
  belfius: 'https://www.belfius.be/retail/nl/producten/sparen-beleggen/info-publicaties/meerwaardebelasting/index.aspx',
  argenta: 'https://www.argenta.be/nl/beleggen/nieuws-over-beleggen/2026/meerwaardebelasting.html',
  kpmg: 'https://kpmg.com/be/nl/insights/my-tax-compass-de-trends-die-op-uw-fiscale-radar-moeten-staan/people-services-updates/meerwaardebelasting-goedgekeurd-door-het-parlement.html',
  curvoSaxo: 'https://curvo.eu/nl/artikel/saxo-bank-review',
  fod: 'https://fin.belgium.be/nl/particulieren/belastingaangifte/inkomsten/meerwaardebelasting',
}

const bronnen: Bron[] = [
  { staaft: 'Vrijstelling €10.000 per persoon, enkel via je eigen aangifte; gehuwden onder het wettelijk stelsel €20.000; overdracht tot €1.000 per jaar, maximaal vijf jaar, tot €15.000; ongebruikte vrijstelling van 2026 schuift door naar 2027; minderwaarden niet overdraagbaar, enkel vanaf 2026; startwaarde 31/12/2025, hogere aankoopprijs tot 31/12/2030; de bank houdt geen rekening met minderwaarden', label: 'Bolero, vrijstelling en minderwaarde (gelezen 25/11/2026)', href: BRON.bolero },
  { staaft: '€10.000 in 2026, jaarlijks geïndexeerd; eerst de overgedragen vrijstelling, dan die van het jaar; elke echtgenoot een eigen vrijstelling, voor de helft van de meerwaarden; bank rekent op het totaal van een gezamenlijke rekening; bank houdt in zonder vrijstelling, minderwaarden of hogere historische waarde; opt-out per jaar', label: 'Belfius, meerwaardebelasting (laatste update 15/06/2026)', href: BRON.belfius },
  { staaft: 'Vrijstelling per persoon via de aangifte, ook bij opt-in; gehuwd onder een gemeenschapsstelsel: elk een vrijstelling, ook als de rekening op één naam staat; minderwaarden enkel in hetzelfde jaar; terugkrijgen van te veel ingehouden taks kan tot 2 jaar duren', label: 'Argenta, meerwaardebelasting (laatste update 23/04/2026)', href: BRON.argenta },
  { staaft: 'Jaarlijkse vrijstelling €10.000 met overdraagbaarheid van maximaal €5.000 over vijf jaar; wet gestemd op 3 april 2026', label: 'KPMG, meerwaardebelasting goedgekeurd door het parlement', href: BRON.kpmg },
  { staaft: 'Terugbetaling van de ingehouden meerwaardebelasting kan tot 2,5 jaar duren (Saxo)', label: 'Curvo, Saxo review (24/11/2026)', href: BRON.curvoSaxo },
]

const eur = (n: number) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

const TARIEF = 0.1
const VRIJ = 10000 // bedrag 2026 (Belfius); vanaf 2027 geïndexeerd, exact bedrag nog niet gekend
const OVERDRACHT_MAX = 1000

// Voorbeeld 1: alleenstaande met €14.000 meerwaarde sinds 31/12/2025
const MW1 = 14000
const taksAlles2026 = Math.max(0, MW1 - VRIJ) * TARIEF
const helft = MW1 / 2
const taksGespreid = Math.max(0, helft - VRIJ) * TARIEF * 2
const ongebruikt2026 = VRIJ - helft
const overgedragen = Math.min(OVERDRACHT_MAX, ongebruikt2026)

// Voorbeeld 2: gehuwd koppel, gezamenlijke rekening, €18.000 meerwaarde in 2026
const MW2 = 18000
const perPartner = MW2 / 2
const ingehouden2 = MW2 * TARIEF
const EXTRA = 3000 // An verkocht daarnaast nog iets met winst op haar eigen rekening

const faq = [
  {
    q: 'Hoeveel meerwaarde mag ik in 2026 belastingvrij realiseren?',
    a: `€10.000 per persoon, voor al je rekeningen samen. In 2026 kan er nog niets bij komen uit vorige jaren, want de taks bestaat pas sinds 1 januari 2026. Voor gehuwden onder het wettelijk stelsel is dat samen €20.000.`,
  },
  {
    q: 'Wat gebeurt er met de vrijstelling die ik dit jaar niet gebruik?',
    a: `Hoogstens €1.000 schuift door naar volgend jaar. De rest vervalt. Wie vijf jaar na elkaar niets gebruikt, komt zo op maximaal €15.000. Gebruik je in 2026 bijvoorbeeld maar €2.000 van je vrijstelling, dan gaat er €1.000 mee naar 2027 en vervalt €7.000.`,
  },
  {
    q: 'Houdt mijn bank of broker rekening met de vrijstelling?',
    a: 'Nee. Belgische banken en brokers houden standaard 10% in op elke meerwaarde, zonder rekening te houden met je vrijstelling of met verliezen. De vrijstelling vraag je zelf aan in je belastingaangifte; wat te veel is ingehouden, krijg je zo terug. Volgens Argenta kan dat tot 2 jaar duren, volgens Curvo bij Saxo tot 2,5 jaar.',
  },
  {
    q: 'Heeft een koppel twee vrijstellingen?',
    a: 'Gehuwden hebben elk een eigen vrijstelling van €10.000. Volgens Argenta geldt dat bij een gemeenschapsstelsel ook als de rekening op naam van één partner staat. Bij een gezamenlijke rekening telt de meerwaarde volgens Belfius voor elk voor de helft.',
  },
  {
    q: 'Mag ik verliezen meenemen naar volgend jaar?',
    a: 'Nee. Minderwaarden mag je enkel aftrekken van meerwaarden uit hetzelfde jaar, en enkel als je ze vanaf 1 januari 2026 realiseerde. Verliezen overdragen naar een volgend jaar kan niet.',
  },
]

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  inLanguage: 'nl-BE',
  datePublished: NAGEKEKEN,
  dateModified: NAGEKEKEN,
  mainEntityOfPage: URL,
  author: { '@type': 'Person', name: 'Stef', url: 'https://www.bestebroker.be/over-mij' },
  publisher: { '@type': 'Organization', name: 'BesteBroker.be', url: 'https://www.bestebroker.be' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, locale: 'nl_BE', type: 'article' },
  alternates: { canonical: URL },
}

const krosos = partners.find(p => p.id === 'krosos-eindejaar')

function KrososEindejaar() {
  if (!krosos || !krosos.affiliateActive) return null
  return (
    <aside className="not-prose my-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-5 text-sm" aria-label="Betaalde samenwerking: Krosos">
      <p className="mb-2">
        <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-600">
          Betaalde samenwerking
        </span>
      </p>
      <p className="font-semibold text-primary text-base mb-1">Reken uit hoeveel je nog belastingvrij kan verkopen</p>
      <p className="text-gray-700 leading-relaxed mb-2">
        <strong>Krosos</strong> heeft een gratis rekenhulp die uitrekent hoeveel meerwaarde je dit jaar nog kan realiseren
        binnen je vrijstelling. Wie de berekening per verkoop wil laten bijhouden voor de aangifte, kan de betalende app van
        Krosos gebruiken.
      </p>
      {krosos.kortingscode && (
        <p className="text-gray-700 leading-relaxed mb-3">
          De app kost €60 per jaar of €6 per maand (btw inbegrepen), met 14 dagen gratis proef. Met de code{' '}
          <strong className="font-mono">{krosos.kortingscode}</strong> krijg je de eerste 12 maanden 20% korting. Prijs en
          voorwaarden volgens Krosos op 16/11/2026; de actuele stand staat op hun site.
        </p>
      )}
      <a
        href={goLink(krosos.id, 'eindejaar')}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="btn-primary text-sm py-2 min-h-[44px] inline-flex items-center justify-center w-full sm:w-auto"
      >
        Naar de gratis rekenhulp van Krosos →
      </a>
      <p className="text-[11px] leading-tight text-gray-500 mt-2">
        Affiliate-link · betaalde samenwerking: neem je via deze link een betalend abonnement, dan krijgt BesteBroker.be een
        deel van wat je het eerste jaar betaalt. Jij betaalt daardoor niets extra.{' '}
        <Link href="/disclaimer#affiliate" className="underline hover:text-accent">Wat betekent dit?</Link>{' '}
        Geen fiscaal advies: kijk de berekening na of vraag raad aan een boekhouder.
      </p>
    </aside>
  )
}

export default function BelastingvrijVerkopenPage() {
  const crumbs = [{ label: 'België fiscaal', href: '/belgie/meerwaardebelasting-2026-uitleg' }, { label: 'Belastingvrij verkopen vóór 31 december' }]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={crumbs} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Belastingvrij verkopen vóór 31 december: hoe werkt de vrijstelling?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Sinds 2026 betaal je 10% meerwaardebelasting, maar de eerste €10.000 meerwaarde per persoon per jaar is vrijgesteld.
            Wat je dit jaar niet gebruikt, gaat grotendeels verloren. Hieronder lees je hoe de regel werkt, met twee
            rekenvoorbeelden, en wat je broker wel en niet voor je doet.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-8 border-l-4 border-l-accent max-w-3xl" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>€10.000 per persoon per jaar</strong>, voor al je rekeningen samen. Gehuwden: elk €10.000.</li>
            <li><strong>Niet gebruikt = grotendeels weg:</strong> hoogstens €1.000 schuift door naar volgend jaar.</li>
            <li><strong>Je broker kent je vrijstelling niet.</strong> Hij houdt 10% in; je vraagt het terug via je aangifte.</li>
            <li>Dit is uitleg over de regel, <strong>geen advies om te verkopen</strong>. Verkopen kost ook beurstaks en makelaarsloon.</li>
          </ul>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2 id="regel">De regel: €10.000 per persoon, per kalenderjaar</h2>
          <p>
            Op meerwaarden op financiële activa (aandelen, ETF&apos;s, fondsen, obligaties, crypto) betaal je sinds 1 januari 2026
            10% belasting. De eerste <strong>€10.000 meerwaarde per jaar</strong> is vrijgesteld. Dat bedrag geldt in 2026 en wordt
            elk jaar geïndexeerd. Het geldt <strong>per persoon</strong>, niet per rekening: heb je een rekening bij twee brokers,
            dan heb je samen één keer €10.000.
          </p>
          <p>
            De meerwaarde reken je vanaf de slotkoers van 31 december 2025 voor wat je vóór 2026 kocht. Was je echte aankoopprijs
            hoger, dan mag je die gebruiken voor verkopen tot 31 december 2030, als je ze kan bewijzen.
          </p>

          <h2 id="overdracht">Wat je niet gebruikt, schuift maar voor €1.000 door</h2>
          <p>
            Gebruik je je vrijstelling in een jaar niet volledig, dan mag je <strong>hoogstens €1.000</strong> meenemen naar het
            volgende jaar. Dat kan vijf jaar na elkaar, tot een vrijstelling van maximaal €15.000. Het volgende jaar gebruik je
            eerst het overgedragen bedrag, en pas daarna de vrijstelling van dat jaar.
          </p>
          <ul>
            <li><strong>2026 is het eerste jaar.</strong> Er kan nog niets bijkomen uit vorige jaren: je maximum is dit jaar €10.000.</li>
            <li><strong>Wat boven de €1.000 ongebruikt blijft, vervalt</strong> op 31 december. Gebruik je in 2026 niets, dan heb je in 2027 de vrijstelling van 2027 plus €1.000, niet plus €10.000.</li>
          </ul>

          <h2 id="voorbeeld-alleen">Voorbeeld 1: alleenstaande</h2>
          <p>
            Lies heeft ETF&apos;s met een meerwaarde van {eur(MW1)} sinds 31 december 2025. Ze wil ze binnenkort verkopen. Twee manieren:
          </p>
          <ul>
            <li>
              <strong>Alles in december 2026:</strong> {eur(MW1)} meerwaarde − {eur(VRIJ)} vrijstelling = {eur(MW1 - VRIJ)} belastbaar.
              Ze betaalt <strong>{eur(taksAlles2026)}</strong>.
            </li>
            <li>
              <strong>De helft in december 2026, de helft in januari 2027:</strong> twee keer {eur(helft)}, telkens onder de
              vrijstelling. Ze betaalt <strong>{eur(taksGespreid)}</strong> meerwaardebelasting. Van de {eur(ongebruikt2026)} die
              ze in 2026 niet gebruikt, schuift {eur(overgedragen)} door naar 2027.
            </li>
          </ul>
          <p>
            Voorwaarden: de koers blijft gelijk (stijgt hij in januari, dan is de meerwaarde groter) en in 2027 verkoopt ze niets
            anders met winst. Bij een Belgische broker wordt in beide gevallen wel eerst 10% ingehouden; dat vraagt ze terug via
            haar aangifte. Wanneer en of je verkoopt, hangt af van je eigen plannen en risico. Dit is geen advies.
          </p>

          <h2 id="voorbeeld-koppel">Voorbeeld 2: gehuwd koppel</h2>
          <p>
            Jan en An zijn gehuwd onder het wettelijk stelsel en hebben een gezamenlijke rekening. In 2026 verkopen ze ETF&apos;s met
            een meerwaarde van {eur(MW2)}.
          </p>
          <ul>
            <li>De meerwaarde telt voor elk voor de helft: {eur(perPartner)} voor Jan en {eur(perPartner)} voor An.</li>
            <li>Elk heeft een eigen vrijstelling van {eur(VRIJ)}. Ze blijven er allebei onder: <strong>€0 meerwaardebelasting</strong>.</li>
            <li>
              De bank rekent wel op het totaal en houdt <strong>{eur(ingehouden2)}</strong> in. Dat vragen ze terug via hun
              gezamenlijke aangifte.
            </li>
            <li>
              Verkocht An dit jaar ook nog iets met {eur(EXTRA)} winst op een eigen rekening, dan komt zij op {eur(perPartner + EXTRA)}{' '}
              en betaalt ze 10% op {eur(perPartner + EXTRA - VRIJ)}: {eur((perPartner + EXTRA - VRIJ) * TARIEF)}.
            </li>
          </ul>
          <p>
            Volgens Argenta heeft elke echtgenoot onder een gemeenschapsstelsel een eigen vrijstelling, ook als de rekening op naam
            van één van beiden staat.
          </p>
        </div>

        <div className="max-w-3xl">
          <KrososEindejaar />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2 id="broker">Wat doet je broker, en wat doe je zelf?</h2>
          <p>
            <strong>Een Belgische bank of broker</strong> (zoals Bolero, Saxo of Belfius) houdt standaard 10% in op elke meerwaarde.
            Hij houdt daarbij <strong>geen rekening</strong> met je vrijstelling, met verliezen of met een hogere historische
            aankoopprijs. Je kan de inhouding ook uitzetten (opt-out); dan geef je alles zelf aan. Hoe dat per broker werkt, lees je
            in <Link href="/broker-meerwaardebelasting-2026" className="text-accent underline">welke broker de meerwaardebelasting inhoudt</Link>.
          </p>
          <p>
            <strong>Een buitenlandse broker</strong> zoals DEGIRO houdt niets in. Dan reken je je meerwaarde zelf uit en geef je ze aan.
          </p>
          <p>In beide gevallen doe je zelf:</p>
          <ol>
            <li><strong>Optellen over al je rekeningen.</strong> Je vrijstelling geldt één keer voor alles samen.</li>
            <li><strong>De vrijstelling aanvragen in je aangifte.</strong> Ze wordt nooit automatisch toegepast. Voor verkopen in 2026 is dat de aangifte van 2027.</li>
            <li><strong>Verliezen van hetzelfde jaar meenemen.</strong> Minderwaarden van vanaf 1 januari 2026 mag je aftrekken, maar enkel in hetzelfde jaar.</li>
            <li><strong>Een hogere aankoopprijs bewijzen</strong> als je die wil gebruiken in plaats van de koers van 31/12/2025 (kan tot eind 2030).</li>
          </ol>
          <p>
            Wat te veel is ingehouden, krijg je terug na je aangifte. Volgens Argenta kan dat tot 2 jaar duren, volgens Curvo bij
            Saxo tot 2,5 jaar.
          </p>

          <h2 id="valkuilen">Valkuilen</h2>
          <ul>
            <li><strong>Twee brokers, één vrijstelling.</strong> €10.000 bij Bolero én €10.000 bij Saxo bestaat niet.</li>
            <li><strong>Ingehouden is niet verschuldigd.</strong> Blijf je onder je vrijstelling, dan houdt je Belgische broker toch 10% in. Je krijgt het pas na je aangifte terug.</li>
            <li><strong>Verliezen verlopen op 31 december.</strong> Ze schuiven niet door naar volgend jaar, en verliezen van vóór 2026 tellen niet.</li>
            <li><strong>Verkopen kost geld.</strong> Bij elke verkoop betaal je beurstaks (bv. 0,12% of 1,32% bij ETF&apos;s) en makelaarsloon. Zie <Link href="/belgie/tob-uitleg" className="text-accent underline">beurstaks uitgelegd</Link>.</li>
            <li>
              <strong>Welke datum telt?</strong> In de uitleg van Bolero, Belfius, Argenta en KPMG vonden we niet of de orderdatum of de
              afwikkelingsdatum bepaalt in welk jaar een verkoop valt. Vraag het je broker als je in de laatste dagen van december verkoopt.
            </li>
          </ul>
        </div>

        <section className="mb-10 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="card">
                <h3 className="font-semibold text-primary mb-2">{q}</h3>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="text-sm text-gray-500 max-w-3xl mb-6">
          Algemene informatie, geen fiscaal of beleggingsadvies. De officiële uitleg van de FOD Financiën lees je op{' '}
          <a href={BRON.fod} target="_blank" rel="noopener noreferrer" className="text-accent underline">fin.belgium.be</a>.
        </p>

        <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN} datumPerBron />

        <section className="mt-8 mb-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Gerelateerde pagina&apos;s</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/belgie/meerwaardebelasting-2026-uitleg', label: 'Meerwaardebelasting 2026 uitgelegd' },
              { href: '/broker-meerwaardebelasting-2026', label: 'Welke broker houdt de meerwaardebelasting in?' },
              { href: '/belgie/meerwaardebelasting-broker', label: 'Meerwaardebelasting en je broker' },
              { href: '/vergelijking/bolero-vs-saxo', label: 'Bolero vs Saxo: wie houdt wat in?' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
                <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label} →</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
