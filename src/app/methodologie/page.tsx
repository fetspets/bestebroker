import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { brokers, type Broker } from '@/data/brokers'

const VEILIGHEID_NAGEKEKEN = '2026-10-23'

const toezichtLabel: Record<Broker['veiligheid']['toezicht'], { label: string; punten: number }> = {
  'be-vergunning': { label: 'Belgische vergunning', punten: 5 },
  'be-bijkantoor': { label: 'Buitenlandse vergunning, Belgisch bijkantoor', punten: 4.5 },
  buitenland: { label: 'Buitenlandse vergunning, geen vestiging in België', punten: 4 },
}

export const metadata: Metadata = {
  title: 'Methodologie — Hoe Wij Brokers Beoordelen',
  description:
    'Transparante uitleg over hoe BesteBroker.be brokers beoordeelt en welke criteria wij hanteren.',
  openGraph: {
    title: 'Methodologie | BesteBroker.be',
    url: 'https://www.bestebroker.be/methodologie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/methodologie' },
}

const criteria = [
  {
    name: 'Fiscale afhandeling',
    weight: '30%',
    description: 'Handelt de broker TOB, roerende voorheffing, Reynders-taks en meerwaardebelasting (2026) automatisch af? Dit weegt zwaar mee — administratielast heeft een reële kost voor de belegger.',
  },
  {
    name: 'Transactiekosten',
    weight: '25%',
    description: 'Kosten per ETF-transactie, inclusief minimumkost. Beoordeeld voor een typisch scenario van €300/maand, 1 transactie/maand.',
  },
  {
    name: 'Bewaarloon & vaste kosten',
    weight: '15%',
    description: 'Jaarlijks bewaarloon als percentage van de portefeuillewaarde, plus eventuele rekening- of inactiviteitskosten.',
  },
  {
    name: 'Veiligheid & bescherming',
    weight: '15%',
    description: 'Wie houdt toezicht (Belgische vergunning, Belgisch bijkantoor of enkel buitenlands) en publieke sancties van een toezichthouder in de laatste 5 jaar. Zie de uitleg hieronder.',
  },
  {
    name: 'Functionaliteit',
    weight: '10%',
    description: 'Beschikbaarheid van spaarplannen, AutoInvest, fractionele aandelen, kwaliteit van het platform en app.',
  },
  {
    name: 'Transparantie & klantenservice',
    weight: '5%',
    description: 'Duidelijkheid van tarieven, Nederlandstalige klantenservice, kwaliteit van de documentatie.',
  },
]

export default function MethodologiePage() {
  return (
    <div className="section-container py-10 max-w-3xl">
      <BreadcrumbNav items={[{ label: 'Methodologie' }]} />

      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold text-primary mb-3">
          Methodologie — Hoe wij brokers beoordelen
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Transparantie over onze beoordelingsmethode is een kernwaarde van BesteBroker.be.
          Hier leggen wij uit hoe wij brokers evalueren en welke criteria wij gebruiken.
        </p>
        <div className="mt-3">
          <LastUpdated date={VEILIGHEID_NAGEKEKEN} />
        </div>
      </header>

      <div className="prose-custom space-y-8">

        <section>
          <h2>Onze beoordelingscriteria</h2>
          <p>
            Elke broker wordt beoordeeld op zes criteria. De weging is afgestemd op de typische
            Belgische langetermijnbelegger die maandelijks ETFs aankoopt.
          </p>

          <div className="not-prose space-y-3 my-4">
            {criteria.map(({ name, weight, description }) => (
              <div key={name} className="card">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-primary">{name}</p>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                  </div>
                  <span className="flex-shrink-0 text-xl font-bold text-accent font-display">{weight}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Hoe wij veiligheid scoren</h2>
          <p>
            Bij alle brokers op deze site blijven je effecten je eigendom en worden ze gescheiden bewaard van het vermogen
            van de broker. Kan een broker ze bij een faillissement toch niet teruggeven, dan geldt een wettelijke bescherming
            van minstens €20.000 voor effecten en €100.000 voor cash. Die basis is bij iedereen gelijk en geeft dus geen
            verschil in score. De bescherming dekt geen koersverliezen.
          </p>
          <p>Kleine verschillen geven we enkel op factoren die we met een bron kunnen aantonen:</p>
          <ul>
            <li>
              <strong>Toezicht:</strong> Belgische vergunning 5,0 · buitenlandse vergunning met Belgisch bijkantoor 4,5 ·
              buitenlandse vergunning zonder vestiging in België 4,0. Met een Belgische vestiging loop je via een Belgische
              rekening en geldt het Belgische toezicht op de gedragsregels (FSMA).
            </li>
            <li>
              <strong>Sancties:</strong> −0,5 als een toezichthouder de afgelopen 5 jaar publiek een boete of minnelijke
              schikking oplegde aan de entiteit waar je rekening loopt. Eén keer aftrekken, ook bij meerdere sancties.
            </li>
          </ul>
          <p>
            Uitlenen van effecten (securities lending) en de hoogte van de bescherming vermelden we in elke review,
            maar ze tellen niet mee in deze score. Jaren actief en omvang tellen evenmin mee: alle brokers op deze site
            zijn al jaren actief, en we vonden geen controleerbare maatstaf die een eerlijk verschil maakt.
          </p>
          <div className="not-prose overflow-x-auto my-4">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="text-left p-2">Broker en score</th>
                  <th scope="col" className="text-left p-2">Toezicht</th>
                  <th scope="col" className="text-left p-2">Publieke sancties (5 jaar)</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map(b => (
                  <tr key={b.id} className="border-t border-gray-100 align-top">
                    <td className="p-2 font-medium">
                      {b.name}
                      <span className="block text-lg font-bold text-primary">{b.methodologyScores.veiligheid.toFixed(1).replace('.', ',')}</span>
                    </td>
                    <td className="p-2">
                      {toezichtLabel[b.veiligheid.toezicht].label}
                      <span className="block text-xs text-gray-500">
                        {b.veiligheid.entiteit} (
                        <a href={b.veiligheid.entiteitBron.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                          {b.veiligheid.entiteitBron.label}
                        </a>)
                      </span>
                    </td>
                    <td className="p-2">
                      {b.veiligheid.sancties.length === 0
                        ? 'Geen gevonden'
                        : b.veiligheid.sancties.map(sa => (
                            <span key={sa.bron.href} className="block mb-1">
                              {sa.omschrijving} (
                              <a href={sa.bron.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                {sa.bron.label}
                              </a>)
                            </span>
                          ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500">
            Nagekeken op 23 oktober 2026 in de sanctielijsten van de{' '}
            <a href="https://www.fsma.be/nl/minnelijke-schikkingen" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">FSMA</a>{' '}
            en de{' '}
            <a href="https://www.nbb.be/nl/financieel-toezicht/prudentieel-toezicht/sancties-en-schikkingen/administratieve-geldboeten-opgelegd" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">NBB</a>,
            en via berichtgeving over buitenlandse toezichthouders. &quot;Geen gevonden&quot; betekent dat wij niets vonden, niet
            dat er zeker niets is. Weet je een sanctie die ontbreekt? Mail ons.
          </p>
        </section>

        <section>
          <h2>Hoe wij de totaalscore berekenen</h2>
          <p>
            Elke broker krijgt per criterium een score van 1 tot 5. De totaalscore is de gewogen som volgens de percentages
            hierboven, afgerond op één decimaal. We vullen de totaalscore niet met de hand in. Of een broker een
            partnerprogramma heeft met deze site, speelt geen rol in de score.
          </p>
        </section>

        <section>
          <h2>Hoe wij tarieven verzamelen</h2>
          <p>
            Alle tarieven worden rechtstreeks gecontroleerd op de officiële tariefpagina&#39;s van de brokers.
            Elke pagina bevat een &quot;Laatste update&quot;-datum die aangeeft wanneer de informatie voor het
            laatst werd geverifieerd.
          </p>
          <p>
            Als een tarief wijzigt en wij dit signaleren, passen wij de betreffende pagina&#39;s bij en
            werken wij de datum bij. Wij streven naar een reviewcyclus van maximaal 3 maanden.
          </p>
        </section>


        <section>
          <h2>Hoe wij met veranderende wetgeving omgaan</h2>
          <p>
            De Belgische fiscale wetgeving rond beleggen verandert. De meerwaardebelasting (2026)
            is hiervan het meest recente voorbeeld. Wij volgen parlementaire documenten, officiële
            communicatie van FOD Financiën en berichtgeving via Spaargids, De Tijd en andere
            Belgische financiële media.
          </p>
          <p>
            Wanneer wetgeving nog in finalisatiefase is, geven wij dit expliciet aan op de
            betreffende pagina&#39;s.
          </p>
        </section>

        <section>
          <h2>Feedback en correcties</h2>
          <p>
            Heb je een fout gevonden? Stuur ons een e-mail op{' '}
            <a href="mailto:info@bestebroker.be" className="text-accent hover:underline">info@bestebroker.be</a>.
            Wij corrigeren fouten zo snel mogelijk en vermelden significante correcties onderaan
            de betreffende pagina.
          </p>
        </section>

      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/disclaimer" className="card hover:shadow-md transition-shadow group">
          <p className="font-semibold text-primary group-hover:text-accent transition-colors">Disclaimer & transparantiebeleid</p>
          <p className="text-sm text-gray-500 mt-0.5">Risicowaarschuwingen en transparantiebeleid</p>
        </Link>
        <Link href="/over-mij" className="card hover:shadow-md transition-shadow group">
          <p className="font-semibold text-primary group-hover:text-accent transition-colors">Over de auteur</p>
          <p className="text-sm text-gray-500 mt-0.5">Wie schrijft er op BesteBroker.be?</p>
        </Link>
      </div>
    </div>
  )
}
