import type { Metadata } from 'next'
import Link from 'next/link'
import { author } from '@/data/author'

export const metadata: Metadata = {
  title: 'Over Stef — Belgische Belegger en Oprichter | BesteBroker.be',
  description:
    'Stef begon op zijn 25ste met beleggen om zijn koopkracht te beschermen. Ontdek waarom hij deze vergelijkingssite bouwde voor Belgische beleggers.',
  openGraph: {
    title: 'Over Stef — Oprichter BesteBroker.be',
    url: 'https://www.bestebroker.be/over-mij',
    locale: 'nl_BE',
    type: 'profile',
  },
  alternates: { canonical: 'https://www.bestebroker.be/over-mij' },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: author.name,
  description: author.description,
  knowsAbout: author.knowsAbout,
  url: author.siteUrl,
  sameAs: [],
}

const timelineItems = [
  {
    year: '2021',
    title: '25 jaar oud — eerste account bij DEGIRO',
    text: 'Na maanden lezen en luisteren naar podcasts opende ik mijn eerste beleggingsrekening bij DEGIRO. Laagste kosten, simpel platform — logische keuze voor een starter.',
  },
  {
    year: 'Later',
    title: 'Overstap naar andere beurs binnen DEGIRO',
    text: "DEGIRO paste hun kernselectie aan. Om de maandelijkse kosten te drukken stapte ik over naar een andere beurs binnen hetzelfde platform. Klein verschil op papier, maar het telt op over de jaren.",
  },
  {
    year: '2024',
    title: 'Vrienden en familie beginnen te vragen',
    text: "Steeds meer mensen in mijn omgeving vroegen wat ik deed met mijn geld. 'Welke broker moet ik nemen?' 'Hoe koop ik een ETF aan, wat moet ik bij al die data invullen?' Ik beantwoordde het telkens opnieuw.",
  },
  {
    year: '2025',
    title: 'Deze site',
    text: 'In plaats van dezelfde uitleg steeds te herhalen, bouwde ik een plek waar ik alles neerschrijf wat ik zelf had willen weten toen ik op mijn 25ste begon. Eerlijk, in het Nederlands, specifiek voor Belgische beleggers.',
  },
]

const realityData = [
  { label: 'Gemiddelde spaarrente grote banken', value: '~0,50%', status: 'bad' },
  { label: 'Gemiddelde inflatie België (langetermijn)', value: '~2–3% per jaar', status: 'bad' },
  { label: 'Reëel verlies per jaar op spaarrekening', value: '~1,5–2,5%', status: 'bad' },
  { label: 'Historisch gemiddeld rendement breed gespreide ETF', value: '~7% per jaar (voor belastingen)', status: 'good' },
  { label: 'Huizenprijzen België: trend laatste 10 jaar', value: 'Sterk gestegen — eigen woning steeds moeilijker bereikbaar', status: 'bad' },
]

const faqs = [
  {
    q: 'Welke broker moet ik nemen?',
    a: 'De vraag die ik het vaakst krijg — en waarvoor er geen universeel antwoord is. Het hangt af van wat je wil beleggen, hoe vaak, en hoeveel fiscale administratie je wil doen. Precies daarom vergelijk ik ze op deze site zo eerlijk mogelijk.',
  },
  {
    q: 'Hoe koop ik een ETF aan? Wat moet ik bij al die data invullen?',
    a: 'Die eerste aankoop voelt overweldigend — ISIN-nummers, beurzen, ordertypen. Maar na de eerste keer is het een kwestie van minuten. Op de site leg ik stap voor stap uit hoe het werkt bij de meest gebruikte brokers in België.',
  },
  {
    q: 'Is beleggen niet te riskant?',
    a: "Je spaargeld laten staan op een rekening met 0,5% rente terwijl de inflatie 2–3% is, is ook een risico. Het is gewoon een risico dat je minder voelt omdat het stil en onzichtbaar is. En als je ook nog eens spaart voor een huis dat elk jaar duurder wordt, kan je het je eigenlijk niet veroorloven om je geld stil te laten staan.",
  },
  {
    q: 'Maar ik spaar voor een huis — heeft beleggen dan wel zin?',
    a: 'Beleggen en sparen voor een woning sluiten elkaar niet uit. Voor geld dat je de komende 2–3 jaar nodig hebt, is een spaarrekening veiliger. Maar voor geld dat je pas over 5, 10 of 15 jaar nodig hebt — of als aanvulling naast je woonspaarplan — is beleggen voor de meeste mensen de betere keuze. De huizenprijzen wachten niet op je spaarrekening.',
  },
]

export default function OverMijPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <div className="section-container py-10 max-w-3xl">

        {/* Hero */}
        <section className="mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-accent flex items-center justify-center text-white font-display font-bold text-3xl">
            S
          </div>
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
              Over mij
            </h1>
            <p className="text-gray-600 text-lg">
              Belgische dertiger · begonnen met beleggen op zijn 25ste · oprichter van deze site
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Passief beleggen', 'ETF-belegger sinds 2021', 'Geen financieel adviseur'].map(tag => (
                <span key={tag} className="badge badge-accent text-xs">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Sectie 1: Waarom ik begon */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">Waarom ik begon met beleggen</h2>
          <div className="prose-custom">
            <p>
              Ik was 25 jaar oud in 2021 toen ik me iets realiseerde wat me meteen ongemakkelijk maakte:
              mijn spaargeld stond netjes op de bank, maar verloor elk jaar stiekem aan waarde. Niet door
              een slechte investering of een slechte beslissing — gewoon door inflatie. Het geld stond stil,
              terwijl de prijzen van alles rondom me bleven stijgen.
            </p>
            <p>
              Maar er was nog iets anders. Iets wat veel mensen van mijn generatie kennen: de vaststelling
              dat een eigen woning steeds verder buiten bereik lijkt te schuiven. De huizenprijzen in België
              stijgen jaar na jaar sneller dan de lonen. Mensen die braaf sparen voor een eerste woning,
              zien die drempel elk jaar hoger worden — terwijl hun spaargeld op de bank nauwelijks rente
              opbrengt.
            </p>
            <p>
              Dat is een dubbele klap. Je koopkracht daalt door inflatie, en het doel waar je naartoe
              spaart — een huis, financiële zekerheid — wordt tegelijk duurder. De enige manier om dat gat
              te dichten? Je geld voor je laten werken in plaats van het te laten wegkwijnen.
            </p>
          </div>

          <blockquote className="mt-6 pl-5 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-lg text-amber-900 italic">
            &ldquo;Huizenprijzen stijgen sneller dan lonen. Spaargeld op de bank brengt nauwelijks iets op.
            Je geld laten stilstaan is geen neutrale keuze meer — het is een keuze om achteruit te gaan.&rdquo;
          </blockquote>
        </section>

        {/* Sectie 2: Realiteit */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">
            De realiteit voor een generatie die later en later start
          </h2>

          <div className="card mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {realityData.map(({ label, value, status }) => (
                    <tr key={label}>
                      <td className="py-3 text-gray-700">{label}</td>
                      <td className={`py-3 text-right font-semibold ${status === 'bad' ? 'text-danger' : 'text-success'}`}>
                        {value}
                        <span className="ml-2">{status === 'bad' ? '↘' : '↗'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="prose-custom">
            <p>
              Beleggen is geen luxe voor mensen met veel geld. Het is één van de weinige manieren waarop je
              vandaag je koopkracht kunt beschermen en vermogen kunt opbouwen — ook als een eigen woning
              voorlopig geen optie is, of als aanvulling náást je woonspaarplan.
            </p>
          </div>

          <blockquote className="mt-6 pl-5 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-lg text-blue-900 italic">
            &ldquo;Op mijn 25ste besefte ik dat wachten ook een keuze is — en geen goede.
            Elk jaar dat je spaargeld stilstaat, verlies je dubbel: door inflatie én door gemiste groei.&rdquo;
          </blockquote>
        </section>

        {/* Sectie 3: Wat ik deed */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">Wat ik deed</h2>
          <div className="prose-custom">
            <p>
              Ik begon te lezen. Boeken, podcasts, forums — alles wat ik kon vinden over hoe je geld voor
              je kunt laten werken in plaats van het passief te zien slinken. Na een tijdje kwam ik steeds
              op hetzelfde antwoord uit: breed gespreide ETF&#39;s. Goedkoop, eenvoudig, bewezen effectief
              over de lange termijn. Niet sexy, maar het werkt.
            </p>
            <p>
              Nu, een paar jaar later, zie ik het verschil. Niet alleen in mijn portefeuille — maar ook in
              hoe ik nadenk over geld. Rustiger, langetermijngerichter, minder bezig met dagelijkse
              koersbewegingen.
            </p>
          </div>
        </section>

        {/* Sectie 4: Tijdlijn */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-6">Mijn traject</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-8">
              {timelineItems.map(({ year, title, text }) => (
                <div key={year} className="relative pl-14">
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold font-display text-center leading-tight">
                    {year}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-primary text-base mb-1">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectie 5: Wat ik zie */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">
            Wat ik zie bij mensen die beginnen met beleggen
          </h2>
          <div className="prose-custom">
            <p>
              Vrienden en familie die maandelijks in ETF&#39;s beleggen slapen goed. Ze stellen hun plan in,
              ze volgen het, en ze maken zich geen zorgen over dagelijkse koersschommelingen.
              Dat is precies hoe het hoort.
            </p>
            <p>
              Maar mensen die losse aandelen kopen? Die sturen me elke week berichten.
              &#39;Is dit aandeel nu duur of goedkoop?&#39; &#39;Moet ik bijkopen of wachten?&#39;
              Ze zijn meer bezig met de prijs van vandaag dan met wat ze over tien jaar willen hebben.
              Dat is een valkuil die veel beginners insluipt — en die ik zelf ook heb moeten leren vermijden.
            </p>
            <p>
              Daarom focust deze site op wat werkt voor de meeste Belgische beleggers: een goede broker
              kiezen, breed spreiden via ETF&#39;s, en consequent bijleggen. Geen tips over individuele
              aandelen, geen snelle winsten beloven.
            </p>
          </div>
        </section>

        {/* Sectie 6: FAQ */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-6">
            Vragen die ik het meest krijg
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="card group">
                <summary className="font-semibold text-primary cursor-pointer list-none flex items-center justify-between">
                  {q}
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Sectie 7: Geen financieel adviseur */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">
            Waarom ik geen financieel adviseur ben — en waarom dat oké is
          </h2>
          <div className="prose-custom">
            <p>
              Ik ben iemand die op zijn 25ste begon met beleggen, boeken las en zijn eigen conclusies trok.
              Ik ben geen erkend financieel adviseur, geen professional, en geen expert in de academische
              zin van het woord.
            </p>
            <p>
              Wat ik wel ben: iemand die de vragen kent die beginners hebben, die de Belgische fiscale
              realiteit van nabij volgt, en die alles wat ik schrijf nakijk op feiten en bronnen.
              Elke claim op deze site heeft een datum en een bron. Als iets verandert, pas ik het aan.
            </p>
            <p>
              Voor persoonlijk financieel advies op maat raad ik altijd een onafhankelijk financieel
              adviseur aan. Wat je hier vindt is informatie om zelf een weloverwogen keuze te maken
              — niet de keuze zelf.
            </p>
          </div>
        </section>

        {/* Disclaimer block */}

        {/* Internal links */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/beste-broker-belgie" className="card hover:shadow-md transition-shadow group">
            <p className="font-semibold text-primary group-hover:text-accent transition-colors">Beste broker in België 2026</p>
            <p className="text-sm text-gray-500 mt-0.5">Onze volledige onafhankelijke vergelijking</p>
          </Link>
          <Link href="/tools/welke-broker-past-bij-mij" className="card hover:shadow-md transition-shadow group">
            <p className="font-semibold text-primary group-hover:text-accent transition-colors">Welke broker past bij mij?</p>
            <p className="text-sm text-gray-500 mt-0.5">Persoonlijke aanbeveling in 4 vragen</p>
          </Link>
        </nav>
      </div>
    </>
  )
}
