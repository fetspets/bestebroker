import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { brokerLink } from '@/lib/affiliateLinks'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'

const broker = getBrokerById('bolero')!

export const metadata: Metadata = {
  title: 'Bolero Review 2026 — KBC-Broker voor Belgische Beleggers',
  description:
    'Bolero review voor Belgische beleggers in 2026. KBC-dochter met automatische belastingafhandeling, geen securities lending en Invest & Repeat spaarplannen.',
  openGraph: {
    title: 'Bolero Review 2026 — KBC-Broker voor Belgische Beleggers',
    description: 'Bolero review voor Belgische beleggers in 2026. KBC-dochter met automatische belastingafhandeling, geen securities lending en Invest & Repeat spaarplannen.',
    url: 'https://bestebroker.be/reviews/bolero',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/reviews/bolero' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'FinancialService', name: 'Bolero', url: 'https://bolero.be' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://bestebroker.be/over-mij' },
    publisher: { '@type': 'Organization', name: 'BesteBroker.be' },
    datePublished: '2026-01-15',
    dateModified: broker.lastVerified,
  },
  breadcrumbJsonLd([{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Bolero' }]),
]

export default function BoleroReviewPage() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Bolero' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">Bolero — Review 2026</h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Bolero is de online broker van KBC. Als Belgische broker regelt Bolero alle belastingen automatisch
            en leent jouw effecten nooit uit aan derden — twee grote pluspunten.
          </p>
          <LastUpdated date={broker.lastVerified} />
        </header>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="bolero-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Kosten in detail</h2>
          <p>
            Bolero werkt met een <strong>Playlist</strong>: een selectie van populaire ETFs waarvoor lagere
            transactiekosten gelden. Voor Playlist-ETFs betaal je:
          </p>
          <ul>
            <li>€2,50 voor orders onder €250</li>
            <li>€5,00 voor orders van €250–€1.000</li>
            <li>€7,50 voor orders boven €1.000</li>
          </ul>
          <p>
            Voor ETFs buiten de Playlist en voor aandelen geldt een vaste kost van <strong>€7,50 per trade</strong>.
            Er is geen bewaarloon. Overdracht naar een andere broker kost €50 per lijn.
          </p>

          <h2>Invest & Repeat</h2>
          <p>
            Met <strong>Invest & Repeat</strong> kun je een herhalende aankooporder instellen.
            Let op de beperkingen: Invest & Repeat debiteert <em>niet</em> automatisch van je bankrekening.
            Je moet zelf voldoende geld op je Bolero-rekening zetten. En enkel gehele stuks worden aangekocht —
            fractionele stuks zijn niet mogelijk.
          </p>

          <h2>Geen securities lending</h2>
          <p>
            Bolero leent jouw effecten <strong>nooit</strong> uit aan derden. Dit is een duidelijk voordeel
            voor beleggers die geen tegenpartijrisico willen lopen. Het staat in de algemene voorwaarden
            expliciet vermeld.
          </p>

          <h2>Meerwaardebelasting (2026)</h2>
          <p>
            Bolero zal de meerwaardebelasting automatisch afhandelen <strong>vanaf 1 juni 2026</strong>.
            Tot die datum ben je als Bolero-klant zelf verantwoordelijk voor de aangifte van eerder gerealiseerde
            meerwaarden in het belastingjaar 2026. Controleer de actuele communicatie van Bolero voor de exacte datum.
          </p>

          <h2>Onze conclusie</h2>
          <p>
            Bolero is een uitstekende keuze voor beleggers die fiscale gemoedsrust willen bij een vertrouwde
            Belgische bank. De hogere kosten ten opzichte van MeDirect of Trade Republic worden gecompenseerd
            door het gemak en de zekerheid die Bolero biedt.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">Bolero account openen</p>
              <p className="text-sm text-gray-600">Onboarding mogelijk via itsme — in enkele minuten klaar.</p>
            </div>
            <a href={brokerLink(broker.affiliateUrl, 'bolero-review-cta')} target="_blank" rel="noopener noreferrer sponsored" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Gerelateerde vergelijkingen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/vergelijking/degiro-vs-bolero', label: 'DEGIRO vs Bolero — wie wint?' },
              { href: '/vergelijking/bolero-vs-saxo', label: 'Bolero vs Saxo — welke is beter?' },
              { href: '/beste-broker-belgie', label: 'Alle brokers vergelijken' },
              { href: '/belgie/meerwaardebelasting-2026-uitleg', label: 'Meerwaardebelasting 2026 uitgelegd' },
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
