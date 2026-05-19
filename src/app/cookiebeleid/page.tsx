import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookiebeleid — BesteBroker.be',
  description: 'Overzicht van de cookies die BesteBroker.be gebruikt, hun doel en hoe je ze kunt beheren.',
  alternates: { canonical: 'https://www.bestebroker.be/cookiebeleid' },
  robots: { index: true, follow: true },
}

export default function CookiebeleidPage() {
  return (
    <div className="section-container py-10 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
        Cookiebeleid
      </h1>
      <p className="text-gray-500 text-sm mb-8">Laatst bijgewerkt: mei 2026</p>

      <div className="prose-custom">
        <h2>Wat zijn cookies?</h2>
        <p>
          Cookies zijn kleine tekstbestanden die op jouw apparaat worden opgeslagen wanneer je een website
          bezoekt. Ze worden gebruikt om informatie bij te houden over jouw bezoek en voorkeuren.
        </p>

        <h2>Welke cookies gebruiken wij?</h2>

        <h3>Analytische cookies (na toestemming)</h3>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Aanbieder</th>
              <th>Doel</th>
              <th>Bewaartijd</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>_ga</code>, <code>_ga_*</code></td>
              <td>Google Analytics</td>
              <td>Anoniem websiteverkeer meten</td>
              <td>2 jaar</td>
            </tr>
          </tbody>
        </table>

        <h2>Cookies beheren</h2>
        <p>
          Je kunt cookies beheren via de instellingen van je browser. Houd er rekening mee dat
          het uitschakelen van bepaalde cookies de functionaliteit van de website kan beïnvloeden.
        </p>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Google Chrome
            </a>
          </li>
          <li>
            <a href="https://support.mozilla.org/nl/kb/cookies-informatie-die-websites-op-uw-computer-ops" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/nl-be/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Safari
            </a>
          </li>
        </ul>
        <p>
          Voor Google Analytics specifiek kun je de{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Google Analytics opt-out browser add-on
          </a>{' '}
          installeren.
        </p>

        <h2>Meer informatie</h2>
        <p>
          Vragen over ons cookiebeleid? Stuur een e-mail naar{' '}
          <a href="mailto:info@bestebroker.be" className="text-accent hover:underline">info@bestebroker.be</a>.
          Lees ook onze{' '}
          <Link href="/privacy" className="text-accent hover:underline">privacyverklaring</Link>.
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/privacy" className="text-accent hover:underline text-sm">Privacyverklaring →</Link>
        <Link href="/disclaimer" className="text-accent hover:underline text-sm">Disclaimer →</Link>
      </div>
    </div>
  )
}
