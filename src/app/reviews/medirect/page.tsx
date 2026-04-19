import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { brokerLink } from '@/lib/affiliateLinks'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'

const broker = getBrokerById('medirect')!

export const metadata: Metadata = {
  title: 'MeDirect Review 2026 — Gratis ETF-Transacties voor Belgische Beleggers',
  description:
    'MeDirect review 2026: gratis ETF-aankopen, Belgische belastingafhandeling en geen securities lending. Ideaal voor buy-and-hold ETF-beleggers.',
  openGraph: {
    title: 'MeDirect Review 2026',
    url: 'https://bestebroker.be/reviews/medirect',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/reviews/medirect' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'FinancialService', name: 'MeDirect', url: 'https://www.medirect.be' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://bestebroker.be/over-mij' },
    publisher: { '@type': 'Organization', name: 'BesteBroker.be' },
    datePublished: '2026-01-15',
    dateModified: broker.lastVerified,
  },
  breadcrumbJsonLd([{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'MeDirect' }]),
]

export default function MeDirectReviewPage() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'MeDirect' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">MeDirect — Review 2026</h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            MeDirect is een Maltese bank met een Belgische vergunning. Sinds augustus 2025 zijn alle
            ETF-transacties volledig gratis — een unieke propositie op de Belgische markt.
          </p>
          <LastUpdated date={broker.lastVerified} />
        </header>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="medirect-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Gratis ETF-transacties</h2>
          <p>
            Sinds <strong>augustus 2025</strong> rekent MeDirect geen transactiekosten aan voor ETF-aankopen en -verkopen.
            Dit maakt MeDirect de goedkoopste optie voor frequente ETF-handelaars, en zeker voor kleinere bedragen
            waar vaste fees verhoudingsgewijs zwaar wegen.
          </p>

          <h2>Wat kost het dan wel?</h2>
          <p>
            Individuele aandelen: <strong>0,15% met een minimum van €6</strong> per transactie.
            Geen bewaarloon. Geen jaarlijkse rekening fee.
          </p>

          <h2>Geen spaarplan</h2>
          <p>
            MeDirect heeft <strong>geen automatisch spaarplan of auto-invest functie</strong>.
            Elke aankoop moet je handmatig doen. Voor beleggers die maandelijks willen bijleggen, is dit
            een nadeel tegenover Saxo (AutoInvest) of Bolero (Invest & Repeat).
          </p>

          <h2>Meerwaardebelasting</h2>
          <p>
            MeDirect is een Belgische broker en handelt de belastingen automatisch af. Verifieer de status
            van de meerwaardebelasting voor 2026 rechtstreeks bij MeDirect voor de exacte implementatiedatum.
          </p>

          <h2>Onze conclusie</h2>
          <p>
            MeDirect is de beste keuze voor <strong>buy-and-hold ETF-beleggers die handmatig aankopen</strong>
            en de laagst mogelijke transactiekosten willen. Als je automatisering wenst, is Saxo of Bolero beter.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">MeDirect account openen</p>
              <p className="text-xs text-gray-400 mt-1">Affiliate link — zie <Link href="/disclaimer" className="underline">disclaimer</Link>.</p>
            </div>
            <a href={brokerLink(broker.affiliateUrl, 'medirect-review-cta')} target="_blank" rel="noopener noreferrer sponsored" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Gerelateerde vergelijkingen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/vergelijking/saxo-vs-medirect', label: 'Saxo vs MeDirect — AutoInvest vs gratis ETFs' },
              { href: '/goedkoopste-broker-belgie', label: 'Goedkoopste broker in België 2026' },
              { href: '/beste-broker-belgie', label: 'Alle brokers vergelijken' },
              { href: '/belgie/etf-kopen-beginners', label: 'Hoe koop je een ETF in België?' },
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
