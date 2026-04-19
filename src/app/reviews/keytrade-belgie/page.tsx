import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { brokerLink } from '@/lib/affiliateLinks'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'

const broker = getBrokerById('keytrade')!

export const metadata: Metadata = {
  title: 'Keytrade Bank Review 2026 — Belgische Broker voor Langetermijnbeleggers',
  description:
    'Keytrade Bank review voor Belgische beleggers in 2026. Volledig Belgische broker met automatische belastingafhandeling, geen securities lending, maar hogere kosten (€12,50/trade, 0,24%/jaar bewaarloon).',
  openGraph: {
    title: 'Keytrade Bank Review 2026 — Belgische Broker voor Langetermijnbeleggers',
    description: 'Keytrade Bank review voor Belgische beleggers in 2026. Volledig Belgische broker met automatische belastingafhandeling, geen securities lending, maar hogere kosten.',
    url: 'https://bestebroker.be/reviews/keytrade-belgie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/reviews/keytrade-belgie' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'FinancialService', name: 'Keytrade Bank', url: 'https://www.keytradebank.be' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://bestebroker.be/over-mij' },
    publisher: { '@type': 'Organization', name: 'BesteBroker.be' },
    datePublished: '2026-01-15',
    dateModified: broker.lastVerified,
  },
  breadcrumbJsonLd([{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Keytrade Bank' }]),
]

export default function KeytradeReviewPage() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Keytrade Bank' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">Keytrade Bank — Review 2026</h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Keytrade Bank is een van de oudste online brokers in België, nu onderdeel van de Crelan-groep.
            Als volledig Belgische broker regelt Keytrade alle belastingen automatisch en leent jouw effecten
            nooit uit — maar de hogere kosten maken het voor de meeste beleggers een dure keuze.
          </p>
          <LastUpdated date={broker.lastVerified} />
        </header>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="keytrade-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Kosten in detail</h2>
          <p>
            Keytrade rekent een vaste kost van <strong>€12,50 per transactie</strong>, ongeacht de
            ordergrootte of het instrument. Dat geldt voor ETFs, aandelen en andere effecten op Euronext
            en andere beurzen. Er is geen procentuele component — je betaalt altijd €12,50, of je nu
            voor €500 of €50.000 koopt.
          </p>
          <p>
            Daarbovenop geldt een <strong>bewaarloon van 0,24% per jaar</strong> op de totale
            portefeuillewaarde. Dat is ongebruikelijk: de meeste Belgische concurrenten (Saxo, Bolero,
            MeDirect) rekenen geen bewaarloon. Bij een portefeuille van €50.000 betaal je zo al
            €120/jaar puur voor het bewaren van je effecten.
          </p>
          <p>
            De combinatie van hoge transactiekosten én bewaarloon maakt Keytrade duur voor vrijwel
            elke beleggingsstijl. Alleen bij een zeer grote portefeuille met nauwelijks transacties
            weegt het bewaarloon mee maar is de absolute impact beperkt.
          </p>

          <h2>Belastingen: volledig automatisch</h2>
          <p>
            Keytrade Bank is een volledig Belgische broker (FSMA- en NBB-geregistreerd) en handelt
            alle verplichte belastingen automatisch af:
          </p>
          <ul>
            <li><strong>TOB</strong> (beurstaks) — ingehouden bij elke transactie</li>
            <li><strong>Roerende voorheffing</strong> op dividenden — automatisch ingehouden aan de bron</li>
            <li><strong>Reynders-taks</strong> op obligatiefondsen — afgehandeld bij verkoop</li>
            <li><strong>Meerwaardebelasting (2026)</strong> — Keytrade handelt dit automatisch af</li>
          </ul>
          <p>
            Je hoeft als Keytrade-klant geen aparte belastingaangifte te doen voor je beleggingen.
            De NBB-aangifte voor buitenlandse rekeningen is evenmin vereist, omdat Keytrade een
            Belgische instelling is.
          </p>

          <h2>Geen securities lending</h2>
          <p>
            Keytrade leent jouw effecten <strong>nooit</strong> uit aan derden. Dit elimineert het
            tegenpartijrisico dat verbonden is aan securities lending, waarbij jouw aandelen tijdelijk
            worden uitgeleend aan short-sellers of andere partijen. Voor beleggers die hier belang
            aan hechten, is dit een duidelijk pluspunt — al bieden ook Bolero en MeDirect deze
            garantie.
          </p>

          <h2>Wanneer is Keytrade een goede keuze?</h2>
          <p>
            Keytrade is enkel interessant in een heel specifiek scenario: een <strong>grote, nauwelijks
            aangeraakte portefeuille</strong> van beleggers die absolute Belgische zekerheid willen en
            al lang klant zijn. De combinatie van een bekende naam, Belgisch statuut en geen securities
            lending spreekt een bepaalde groep conservatieve beleggers aan.
          </p>
          <p>
            Voor de meeste nieuwe beleggers zijn er betere alternatieven:
          </p>
          <ul>
            <li><strong>MeDirect</strong> — gratis ETF-transacties, geen bewaarloon, volledig Belgisch</li>
            <li><strong>Saxo Bank</strong> — lage transactiekosten (0,08% min. €2), geen bewaarloon, AutoInvest</li>
            <li><strong>Bolero</strong> — vaste €7,50/trade, geen bewaarloon, Invest & Repeat</li>
          </ul>
          <p>
            Bij elke vergelijking verliest Keytrade op prijs. Tenzij je al een bestaande portefeuille
            hebt bij Keytrade en de overdrachtskosten niet wil maken, raden wij aan om bij een van
            bovenstaande alternatieven te beginnen.
          </p>

          <h2>Onze conclusie</h2>
          <p>
            Keytrade Bank biedt fiscale volledigheid en geen securities lending, maar de hoge kosten
            (€12,50/trade + 0,24%/jaar bewaarloon) wegen zwaar. Voor nieuwe beleggers is Keytrade
            zelden de beste keuze. Bestaande klanten kunnen overwegen om over te stappen zodra
            hun portefeuille groot genoeg is om de overdrachtskosten te rechtvaardigen.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">Keytrade Bank account openen</p>
              <p className="text-sm text-gray-600">Volledig Belgische broker — alle belastingen automatisch geregeld.</p>
              <p className="text-xs text-gray-400 mt-1">Affiliate link — zie <Link href="/disclaimer" className="underline">disclaimer</Link>.</p>
            </div>
            <a href={brokerLink(broker.affiliateUrl, 'keytrade-review-cta')} target="_blank" rel="noopener noreferrer sponsored" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Gerelateerde vergelijkingen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/reviews/bolero', label: 'Bolero review — ook volledig Belgisch' },
              { href: '/reviews/medirect', label: 'MeDirect review — gratis ETF-transacties' },
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
