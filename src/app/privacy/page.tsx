import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacyverklaring — BesteBroker.be',
  description: 'Lees hoe BesteBroker.be omgaat met jouw persoonsgegevens, welke cookies worden gebruikt en wat jouw rechten zijn onder de AVG/GDPR.',
  alternates: { canonical: 'https://www.bestebroker.be/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="section-container py-10 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
        Privacyverklaring
      </h1>
      <p className="text-gray-500 text-sm mb-8">Laatst bijgewerkt: mei 2026</p>

      <div className="prose-custom">
        <h2>Wie zijn wij?</h2>
        <p>
          BesteBroker.be is een onafhankelijke vergelijkingswebsite voor online brokers in België.
          De site wordt beheerd door Stef, bereikbaar via{' '}
          <a href="mailto:info@bestebroker.be" className="text-accent hover:underline">info@bestebroker.be</a>.
        </p>

        <h2>Welke gegevens verzamelen wij?</h2>
        <p>
          BesteBroker.be verzamelt zelf geen persoonsgegevens actief. Wij vragen geen registratie,
          aanmelding of persoonlijke informatie van bezoekers.
        </p>
        <p>
          Via derden kunnen echter de volgende gegevens worden verzameld:
        </p>
        <ul>
          <li>
            <strong>Google Analytics (GA4):</strong> Wij gebruiken Google Analytics om anoniem
            websiteverkeer te meten (bezochte pagina&apos;s, duur van bezoek, herkomst). Google verwerkt
            hiervoor gegevens zoals IP-adressen (geanonimiseerd) en apparaatinformatie.
            Google&apos;s privacybeleid:{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              policies.google.com/privacy
            </a>
          </li>
          <li>
            <strong>Impact.com (affiliate tracking):</strong> Wij maken gebruik van Impact.com voor
            het bijhouden van affiliate-verwijzingen. Wanneer je op een affiliate-link klikt, kan
            Impact.com cookies plaatsen om conversies bij te houden.
            Impact&apos;s privacybeleid:{' '}
            <a href="https://impact.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              impact.com/privacy-policy
            </a>
          </li>
        </ul>

        <h2>Grondslagen voor verwerking</h2>
        <p>
          Analytische tracking via Google Analytics vindt enkel plaats na jouw expliciete toestemming
          (artikel 6(1)(a) AVG). Affiliate tracking via Impact.com is gebaseerd op ons gerechtvaardigd
          belang om onze dienstverlening te financieren (artikel 6(1)(f) AVG).
        </p>

        <h2>Cookies</h2>
        <p>
          BesteBroker.be maakt gebruik van cookies. Lees ons{' '}
          <Link href="/cookiebeleid" className="text-accent hover:underline">cookiebeleid</Link>{' '}
          voor een volledig overzicht.
        </p>

        <h2>Jouw rechten</h2>
        <p>
          Onder de AVG/GDPR heb je het recht om:
        </p>
        <ul>
          <li>Inzage te vragen in de gegevens die over jou worden verwerkt</li>
          <li>Onjuiste gegevens te laten corrigeren</li>
          <li>Gegevens te laten verwijderen (&apos;recht op vergetelheid&apos;)</li>
          <li>Bezwaar te maken tegen verwerking</li>
          <li>Jouw toestemming in te trekken</li>

        </ul>
        <p>
          Voor vragen of verzoeken, stuur een e-mail naar{' '}
          <a href="mailto:info@bestebroker.be" className="text-accent hover:underline">info@bestebroker.be</a>.
          Je hebt ook het recht een klacht in te dienen bij de{' '}
          <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Gegevensbeschermingsautoriteit (GBA)
          </a>.
        </p>

        <h2>Bewaring van gegevens</h2>
        <p>
          Analytische gegevens via Google Analytics worden maximaal 14 maanden bewaard, conform
          onze instellingen in Google Analytics.
        </p>

        <h2>Wijzigingen</h2>
        <p>
          Wij behouden het recht om deze privacyverklaring te wijzigen. De datum &quot;Laatst bijgewerkt&quot;
          bovenaan deze pagina geeft de meest recente versie aan.
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/cookiebeleid" className="text-accent hover:underline text-sm">Cookiebeleid →</Link>
        <Link href="/disclaimer" className="text-accent hover:underline text-sm">Disclaimer →</Link>
      </div>
    </div>
  )
}
