import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { Bronnen, articleJsonLd, type Bron } from '@/components/ui/Bronnen'
import { KrososBlok } from '@/components/partners/KrososBlok'

const URL = 'https://www.bestebroker.be/belgie/buitenlandse-broker-nbb-aangifte'
const NAGEKEKEN = '2026-11-24'
const TITLE = 'NBB-aangifte buitenlandse broker: eenmalig of elk jaar?'
const DESCRIPTION =
  'DEGIRO of een Duitse Trade Republic-rekening? Je meldt ze niet waar de meeste mensen denken. Stap voor stap, met het vak in je aangifte en wat vergeten kost.'

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

const BRON = {
  nbb: 'https://nbb.be/en/node/373860',
  curvoAangeven: 'https://curvo.eu/nl/artikel/buitenlandse-rekening-aangeven-belgie',
  curvoDegiro: 'https://curvo.eu/nl/artikel/degiro-aangeven-belgie',
  curvoTr: 'https://curvo.eu/nl/artikel/trade-republic-aangeven-belgie',
  wikifin: 'https://www.wikifin.be/nl/belasting-werk-en-inkomen/belastingaangifte/je-roerend-inkomen/je-rekeningen-het-buitenland',
  testAankoop: 'https://www.test-aankoop.be/invest/beleggen/fiscaliteit-and-rechten/artikels/2026/02/buitenlandse-rekening-aangeven-bnb-belastingaangifte',
}

const bronnen: Bron[] = [
  { staaft: 'Melden via de CAP-toepassing van de NBB met itsme of eID, of op papier per post (Berlaimontlaan 14, 1000 Brussel, met kopie identiteitskaart); wijzigingen via dezelfde toepassing', label: 'Nationale Bank van België, How to report an account (gelezen 24/11/2026)', href: BRON.nbb },
  { staaft: 'Eén keer melden bij de NBB, elk jaar vermelden in de aangifte; enkel bestaan, naam en land (geen saldo); ook rekeningen van je partner en effectenrekeningen van minderjarige kinderen die je beheert', label: 'Wikifin, Je rekeningen in het buitenland (aangepast 05/11/2026)', href: BRON.wikifin },
  { staaft: 'Termijn: uiterlijk wanneer je de aangifte indient over het jaar van opening; sluiting apart melden; vak XIII, rubriek A; voorstel van vereenvoudigde aangifte zelf aanvullen; ook effectenrekeningen', label: 'Test-Aankoop, buitenlandse rekening aangeven (16/02/2026)', href: BRON.testAankoop },
  { staaft: 'Code 1075 in vak XIII; sluiting melden; boete volgens art. 445 WIB 92: €50 zonder kwade trouw, vork €50 tot €1.250, mogelijke belastingverhoging; Belgische brokers (Saxo, Keytrade, Bolero, MeDirect) geen melding', label: 'Curvo, Buitenlandse rekening aangeven in België (16/11/2026)', href: BRON.curvoAangeven },
  { staaft: 'DEGIRO: twee rekeningen melden (flatexDEGIRO Bank Dutch Branch, Nederland, en de flatex-geldrekening bij flatexDEGIRO Bank AG, Duitsland)', label: 'Curvo, DEGIRO aangeven in België (16/11/2026)', href: BRON.curvoDegiro },
  { staaft: 'Trade Republic: Belgisch bijkantoor met BE-IBAN sinds 15/09/2026 (geen melding); oude Duitse rekening wel melden en bij overstap de sluitingsdatum invullen', label: 'Curvo, Trade Republic aangeven in België (16/11/2026)', href: BRON.curvoTr },
]

const faq = [
  {
    q: 'Moet ik mijn DEGIRO-rekening elk jaar bij de NBB melden?',
    a: 'Nee. Bij het Centraal Aanspreekpunt (CAP) van de Nationale Bank meld je een buitenlandse rekening één keer. Wat wél elk jaar terugkomt: in je belastingaangifte (vak XIII) vermeld je dat je een buitenlandse rekening hebt, in welk land, en dat je ze bij de NBB gemeld hebt.',
  },
  {
    q: 'Meld ik DEGIRO via MyMinfin?',
    a: 'Nee. De melding bij de NBB doe je in de CAP-toepassing van de Nationale Bank zelf, met itsme of je eID. Per post kan ook, met het formulier van de FOD Financiën. MyMinfin (Tax-on-web) gebruik je daarna voor je belastingaangifte.',
  },
  {
    q: 'Welk land vul ik in voor DEGIRO?',
    a: 'Volgens Curvo (16/11/2026) meld je bij DEGIRO twee rekeningen: de beleggingsrekening bij flatexDEGIRO Bank Dutch Branch (Nederland) en de geldrekening bij flatexDEGIRO Bank AG (Duitsland). In je aangifte komen dan twee landen: Nederland en Duitsland.',
  },
  {
    q: 'Moet ik Trade Republic melden?',
    a: 'Enkel een oude Duitse rekening (met een DE-IBAN). Sinds 15 september 2026 opent Trade Republic rekeningen bij een Belgisch bijkantoor met een BE-IBAN; die hoef je niet te melden. Stapte je over, meld dan in de CAP-toepassing de sluitingsdatum van de Duitse rekening.',
  },
  {
    q: 'Wat kost het als ik de melding vergeten ben?',
    a: 'Volgens Curvo voorziet artikel 445 WIB 92 een administratieve boete: €50 als je niet te kwader trouw handelde, met een vork tot €1.250, plus mogelijke belastingverhogingen. Meld een vergeten rekening dus zo snel mogelijk alsnog.',
  },
  {
    q: 'Moet ik een rekening bij Saxo of Keytrade melden?',
    a: 'Nee. Saxo en Keytrade werken in België via een Belgisch bijkantoor, net als Bolero en MeDirect: dat zijn binnenlandse rekeningen.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

const brokers = [
  { broker: 'DEGIRO', land: 'Nederland (Dutch Branch) + Duitsland (geldrekening flatex)', vereist: true },
  { broker: 'Trade Republic, Duitse rekening', land: 'Duitsland (DE-IBAN, geopend vóór 15/09/2026)', vereist: true },
  { broker: 'Trade Republic, Belgische rekening', land: 'Belgisch bijkantoor, BE-IBAN', vereist: false },
  { broker: 'Saxo', land: 'Belgisch bijkantoor (Saxo Bank, Denemarken)', vereist: false },
  { broker: 'Keytrade', land: 'Belgisch bijkantoor (Arkéa, Frankrijk)', vereist: false },
  { broker: 'Bolero', land: 'België (KBC)', vereist: false },
  { broker: 'MeDirect', land: 'Belgische bank', vereist: false },
]

export default function NbbAangiftePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ headline: 'NBB-aangifte buitenlandse broker: eenmalig melden, elk jaar vermelden', description: DESCRIPTION, url: URL, dateModified: NAGEKEKEN })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'België fiscaal', href: '/beste-broker-belgie' }, { label: 'NBB-aangifte buitenlandse broker' }])) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'België fiscaal', href: '/beste-broker-belgie' }, { label: 'NBB-aangifte' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            NBB-aangifte bij een buitenlandse broker: hoe en wanneer?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Beleg je via DEGIRO, of heb je nog een Duitse rekening bij Trade Republic? Dan heb je twee taken: de
            rekening één keer melden bij de Nationale Bank, en ze elk jaar vermelden in je belastingaangifte.
          </p>
          <LastUpdated date={NAGEKEKEN} />
        </header>

        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-sm text-orange-800">
            <strong>Disclaimer:</strong> dit is algemene informatie, geen juridisch of fiscaal advies.
            Twijfel je over je eigen situatie, vraag het dan aan een boekhouder of belastingadviseur.
          </p>
        </div>

        <section className="card mb-8 max-w-3xl" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>Eén keer melden</strong> bij het Centraal Aanspreekpunt (CAP) van de NBB, online met itsme of eID. Niet via MyMinfin.</li>
            <li><strong>Elk jaar vermelden</strong> in je belastingaangifte, in vak XIII (code 1075): land van de rekening en het vakje dat je ze bij de NBB meldde.</li>
            <li><strong>Sluit je de rekening</strong>, dan meld je ook de sluitingsdatum.</li>
            <li><strong>Vergeten?</strong> Meld alsnog. Volgens Curvo is de boete €50 als je niet te kwader trouw handelde.</li>
          </ul>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Waarom moet je een buitenlandse rekening melden?</h2>
          <p>
            Als Belgisch inwoner meld je elke rekening die je in het buitenland hebt, ook een effectenrekening bij
            een broker. Je geeft geen saldo op: enkel dat de rekening bestaat, bij welke instelling en in welk land.
          </p>
          <p>
            Dezelfde plicht geldt voor de rekeningen van je partner als jullie een gezamenlijke aangifte doen, en
            voor effectenrekeningen van minderjarige kinderen die jij beheert (Wikifin, 5/11/2026).
          </p>

          <h2>Welke brokers moet je melden?</h2>
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            {brokers.map(({ broker, land, vereist }) => (
              <div key={broker} className={`p-3 rounded-lg border text-sm ${vereist ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <p className="font-semibold">{broker}</p>
                <p className="text-gray-600 text-xs">{land}</p>
                <p className={`font-medium mt-1 ${vereist ? 'text-danger' : 'text-success'}`}>
                  {vereist ? '⚠ Melden bij de NBB + elk jaar in je aangifte' : '✓ Geen melding nodig'}
                </p>
              </div>
            ))}
          </div>
          <p>
            De vuistregel: heeft je rekening een buitenlands rekeningnummer en geen Belgisch bijkantoor, dan meld je
            ze. Dat geldt ook voor buitenlandse brokers die nog niet in onze vergelijking staan.
          </p>

          <h2>Stap 1: de rekening melden bij de NBB (één keer)</h2>
          <ol>
            <li>Ga naar de toepassing van het Centraal Aanspreekpunt op de site van de Nationale Bank (nbb.be, zoek op &ldquo;CAP buitenlandse rekening melden&rdquo;).</li>
            <li>Log in met <strong>itsme</strong> of je <strong>eID</strong> met kaartlezer.</li>
            <li>Kies &ldquo;buitenlandse rekening melden&rdquo; en vul in: het rekeningnummer, de naam van de instelling en het land.</li>
          </ol>
          <p>
            Geen itsme of kaartlezer? Dan stuur je het formulier van de FOD Financiën ondertekend per post naar de
            NBB (Centraal Aanspreekpunt, Berlaimontlaan 14, 1000 Brussel), met een kopie van beide kanten van je
            identiteitskaart.
          </p>
          <p>
            <strong>Bij DEGIRO</strong> meld je volgens Curvo (16/11/2026) twee rekeningen: de beleggingsrekening bij
            flatexDEGIRO Bank Dutch Branch in <strong>Nederland</strong> (met je gebruikersnaam als rekeningnummer) en
            de geldrekening bij flatexDEGIRO Bank AG in <strong>Duitsland</strong> (met het IBAN van die rekening).
          </p>
          <p>
            <strong>Bij een Duitse Trade Republic-rekening</strong> meld je het land Duitsland en het IBAN van je
            geldrekening. Stapte je over naar de Belgische rekening, vul dan in dezelfde toepassing de sluitingsdatum
            van de Duitse rekening in.
          </p>

          <h2>Wanneer moet je melden?</h2>
          <p>
            Uiterlijk op het moment dat je de belastingaangifte indient over het jaar waarin je de rekening opende.
            Open je in 2026 een DEGIRO-rekening, dan meld je ze dus ten laatste wanneer je in 2027 je aangifte
            indient (Test-Aankoop, 16/02/2026). Het eenvoudigst: meld ze meteen na het openen.
          </p>

          <h2>Stap 2: elk jaar vermelden in je belastingaangifte</h2>
          <p>
            In je aangifte personenbelasting (Tax-on-web via MyMinfin, of op papier) vul je in <strong>vak XIII,
            rubriek A</strong> in dat je een buitenlandse rekening hebt (code 1075), met het land per rekening, en vink
            je aan dat je de rekening bij het Centraal Aanspreekpunt meldde. Dat doe je <strong>elk jaar</strong> zolang
            je de rekening hebt.
          </p>
          <p>
            Let op bij een <strong>voorstel van vereenvoudigde aangifte</strong>: de fiscus vult je buitenlandse rekening
            niet vanzelf in. Dan moet je het voorstel zelf aanvullen.
          </p>

          <h2>Stap 3: een sluiting of wijziging melden</h2>
          <p>
            Sluit je de rekening, of verandert er iets (bijvoorbeeld een nieuw rekeningnummer), dan meld je dat in
            dezelfde CAP-toepassing.
          </p>

          <h2>Wat als je de melding vergeten bent?</h2>
          <p>
            Volgens Curvo (16/11/2026) voorziet artikel 445 van het Wetboek van de inkomstenbelastingen een
            administratieve boete. Handelde je niet te kwader trouw en probeerde je geen belasting te ontduiken, dan
            bedraagt die <strong>€50</strong>. Curvo noemt een vork van €50 tot €1.250, plus mogelijke
            belastingverhogingen. Meld een vergeten rekening dus alsnog, en vul ze aan in je volgende aangifte.
          </p>

          <h2>Ook andere aangiftes bij een buitenlandse broker</h2>
          <p>
            De NBB-melding is maar één taak. Bij een buitenlandse broker regel je vaak ook zelf de{' '}
            <Link href="/belgie/tob-uitleg">beurstaks (TOB)</Link> als de broker ze niet inhoudt, de roerende voorheffing
            op dividenden, en vanaf 2026 de{' '}
            <Link href="/belgie/meerwaardebelasting-broker">meerwaardebelasting</Link>. DEGIRO houdt de beurstaks wel in,
            maar de meerwaardebelasting niet (zie onze <Link href="/reviews/degiro-belgie">DEGIRO-review</Link>).
          </p>
        </div>

        <div className="max-w-3xl">
          <KrososBlok bron="nbb-aangifte" />
        </div>

        <section className="max-w-3xl mb-10" aria-labelledby="faq">
          <h2 id="faq" className="font-display text-2xl font-bold text-primary mb-4">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <details key={q} className="card group">
                <summary className="font-semibold text-primary cursor-pointer">{q}</summary>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Liever geen meldingen? Kies een Belgische broker</h2>
          <p>
            Bij een broker met een Belgische rekening (zoals Saxo, Bolero, MeDirect, Keytrade of de Belgische rekening
            van Trade Republic) hoef je niets bij de NBB te melden. Welke daarvan ook de taksen voor je inhoudt,
            zie je in{' '}
            <Link href="/beste-broker-belgie">onze vergelijking van brokers in België</Link>, of per duo in{' '}
            <Link href="/vergelijking/saxo-vs-degiro">Saxo vs DEGIRO</Link>.
          </p>
        </div>

        <div className="max-w-3xl">
          <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN} datumPerBron />
        </div>

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/belgie/tob-uitleg', label: 'TOB uitgelegd', sub: 'Taks op beursverrichtingen' },
            { href: '/belgie/meerwaardebelasting-broker', label: 'Meerwaardebelasting', sub: 'Welke broker houdt ze in?' },
            { href: '/reviews/degiro-belgie', label: 'DEGIRO review', sub: 'Wat je zelf regelt' },
            { href: '/reviews/trade-republic-belgie', label: 'Trade Republic review', sub: 'Overstap naar de Belgische rekening' },
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
