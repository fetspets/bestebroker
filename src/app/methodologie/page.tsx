import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { LastUpdated } from '@/components/ui/LastUpdated'

export const metadata: Metadata = {
  title: 'Methodologie — Hoe Wij Brokers Beoordelen | BesteBroker.be',
  description:
    'Transparante uitleg over hoe BesteBroker.be brokers beoordeelt, welke criteria wij hanteren en hoe wij omgaan met affiliate relaties.',
  openGraph: {
    title: 'Methodologie | BesteBroker.be',
    url: 'https://bestebroker.be/methodologie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/methodologie' },
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
    description: 'Hoogte van de depositobescherming, securities lending beleid, regulerende instanties (FSMA, NBB, BaFin).',
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
          Hier leggen wij uit hoe wij brokers evalueren, welke criteria wij gebruiken en hoe
          wij omgaan met affiliate relaties.
        </p>
        <div className="mt-3">
          <LastUpdated date="2026-04-01" />
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
          <h2>Affiliate links en onze onafhankelijkheid</h2>
          <p>
            Wij werken met affiliate relaties. Een broker die een affiliateprogramma aanbiedt,
            scoort <strong>niet beter</strong> in onze vergelijking. Een broker zonder
            affiliateprogramma scoort <strong>niet slechter</strong>.
          </p>
          <p>
            Als bewijs: Trade Republic, dat een affiliateprogramma heeft, scoort bij ons 3.2/5 —
            lager dan Saxo (4.4/5) en Bolero (4.1/5) — omdat het geen Belgische belastingen afhandelt
            en securities lending standaard actief heeft. Dit is een bewuste keuze die onze
            redactionele integriteit onderstreept.
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
          <p className="text-sm text-gray-500 mt-0.5">Affiliate links en risicowaarschuwingen</p>
        </Link>
        <Link href="/over-mij" className="card hover:shadow-md transition-shadow group">
          <p className="font-semibold text-primary group-hover:text-accent transition-colors">Over de auteur</p>
          <p className="text-sm text-gray-500 mt-0.5">Wie schrijft er op BesteBroker.be?</p>
        </Link>
      </div>
    </div>
  )
}
