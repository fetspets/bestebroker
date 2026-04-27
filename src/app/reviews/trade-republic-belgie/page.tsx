import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { brokerLink } from '@/lib/affiliateLinks'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'

const broker = getBrokerById('trade-republic')!

export const metadata: Metadata = {
  title: 'Trade Republic België Review 2026 — €1 per Trade, Maar Zelf Belastingen',
  description:
    'Trade Republic review voor Belgische beleggers. €1 per transactie en gratis spaarplannen — maar nul fiscale ondersteuning. Alles wat je moet weten.',
  openGraph: {
    title: 'Trade Republic België Review 2026 — €1 per Trade, Maar Zelf Belastingen',
    description: 'Trade Republic review voor Belgische beleggers. €1 per transactie en gratis spaarplannen — maar nul fiscale ondersteuning. Alles wat je moet weten.',
    url: 'https://www.bestebroker.be/reviews/trade-republic-belgie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/reviews/trade-republic-belgie' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'FinancialService', name: 'Trade Republic', url: 'https://traderepublic.com/be' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://www.bestebroker.be/over-mij' },
    publisher: { '@type': 'Organization', name: 'BesteBroker.be' },
    datePublished: '2026-01-15',
    dateModified: broker.lastVerified,
  },
  breadcrumbJsonLd([{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Trade Republic' }]),
]

export default function TradeRepublicReviewPage() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Trade Republic' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Trade Republic België — Review 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Trade Republic is een Duitse neobroker met een eenvoudig platform, €1 per transactie en
            gratis spaarplannen. Maar voor Belgische beleggers geldt: nul fiscale ondersteuning.
          </p>
          <LastUpdated date={broker.lastVerified} />
        </header>

        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-800 font-medium">
            🚨 Trade Republic handelt <strong>geen enkele Belgische belasting</strong> af — geen TOB,
            geen roerende voorheffing, geen meerwaardebelasting. Jij bent 100% zelf verantwoordelijk.
            Bovendien vereist een rekening bij Trade Republic een jaarlijkse NBB-aangifte buitenlandse rekening.
          </p>
        </div>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="tr-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>€1 per transactie — wat is de vangst?</h2>
          <p>
            Trade Republic rekent een vaste kost van <strong>€1 per transactie</strong>, inclusief ETFs.
            Spaarplannen zijn volledig gratis. Dit lijkt onklopbaar goedkoop — maar zodra je de fiscale
            administratielast meetelt, kantelt het beeld.
          </p>

          <h2>Fiscale verantwoordelijkheid</h2>
          <p>Als Belgische Trade Republic-belegger ben je zelf verantwoordelijk voor:</p>
          <ul>
            <li><strong>TOB:</strong> 0,12% per ETF-transactie — zelf aangifte via MyMinfin</li>
            <li><strong>Roerende voorheffing:</strong> dividenden worden bruto uitgekeerd</li>
            <li><strong>Meerwaardebelasting (2026):</strong> volledig zelf te berekenen en aan te geven</li>
            <li><strong>NBB-aangifte:</strong> jaarlijks melden dat je een buitenlandse rekening hebt</li>
          </ul>

          <h2>Securities lending</h2>
          <p>
            Bij Trade Republic is securities lending <strong>standaard ingeschakeld</strong>.
            Je kunt het uitschakelen in de app, maar het vereist bewuste actie van jou.
          </p>

          <h2>Gratis spaarplannen</h2>
          <p>
            Trade Republic biedt gratis automatische spaarplannen aan voor ETFs en aandelen.
            Je kunt maandelijks automatisch een bedrag beleggen, inclusief fractionele stuks.
            Dit is een pluspunt tegenover DEGIRO, dat geen spaarplan heeft.
          </p>

          <h2>Voor wie is Trade Republic geschikt?</h2>
          <p>
            Trade Republic is alleen interessant voor Belgische beleggers die <strong>bewust en bekwaam</strong>
            alle Belgische belastingen zelf willen bijhouden. Voor beginners en beleggers die rust willen,
            raden wij een Belgische broker aan.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">Trade Republic account openen</p>
            </div>
            <a href={brokerLink(broker.affiliateUrl, 'tr-review-cta')} target="_blank" rel="noopener noreferrer sponsored" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Gerelateerde vergelijkingen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/belgie/buitenlandse-broker-nbb-aangifte', label: 'NBB-aangifte buitenlandse rekening' },
              { href: '/broker-meerwaardebelasting-2026', label: 'Meerwaardebelasting 2026 — wie regelt het?' },
              { href: '/belgie/meerwaardebelasting-2026-uitleg', label: 'Meerwaardebelasting 2026 uitgelegd' },
              { href: '/beste-broker-belgie', label: 'Alle brokers vergelijken — beste keuze?' },
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
