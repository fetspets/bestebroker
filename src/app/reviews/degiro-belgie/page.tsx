import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { BookRecommendationBlock } from '@/components/book/BookRecommendationBlock'
import { brokerLink } from '@/lib/affiliateLinks'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'

const broker = getBrokerById('degiro')!

export const metadata: Metadata = {
  title: 'DEGIRO België Review 2026 — Goedkoop maar Fiscale Valkuilen',
  description:
    'Eerlijke DEGIRO-review voor Belgische beleggers. Lage kosten maar geen fiscale afhandeling: TOB, meerwaardebelasting en NBB-aangifte doe je zelf.',
  openGraph: {
    title: 'DEGIRO België Review 2026',
    url: 'https://bestebroker.be/reviews/degiro-belgie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/reviews/degiro-belgie' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'FinancialService', name: 'DEGIRO', url: 'https://www.degiro.be' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://bestebroker.be/over-mij' },
    publisher: { '@type': 'Organization', name: 'BesteBroker.be' },
    datePublished: '2026-01-15',
    dateModified: broker.lastVerified,
  },
  breadcrumbJsonLd([{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'DEGIRO' }]),
]

export default function DegiroReviewPage() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'DEGIRO' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">DEGIRO België — Review 2026</h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            DEGIRO is een Nederlandse broker die in België populair is dankzij lage transactiekosten.
            Maar voor Belgische beleggers zijn er belangrijke fiscale valkuilen om te kennen.
          </p>
          <LastUpdated date={broker.lastVerified} />
        </header>

        <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-sm text-orange-800">
            <strong>⚠ Belgische beleggers letten op:</strong> DEGIRO handelt geen enkele Belgische belasting af.
            Je bent zelf verantwoordelijk voor TOB, roerende voorheffing en meerwaardebelasting.
            Bovendien is een jaarlijkse NBB-aangifte buitenlandse rekening vereist.
          </p>
        </div>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="degiro-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Fiscale verantwoordelijkheid</h2>
          <p>Als Belgische DEGIRO-belegger ben je zelf verantwoordelijk voor:</p>
          <ul>
            <li><strong>TOB:</strong> 0,12% per ETF-transactie — zelf aangifte doen en betalen</li>
            <li><strong>Roerende voorheffing:</strong> dividenden worden bruto uitbetaald, jij betaalt 30% aan de belastingdienst</li>
            <li><strong>Reynders-taks:</strong> bij obligatiefondsen met rentecomponent</li>
            <li><strong>Meerwaardebelasting (2026):</strong> DEGIRO houdt niets in — jij maakt de berekening en doet aangifte</li>
            <li><strong>NBB-aangifte:</strong> jaarlijkse aangifte van buitenlandse rekening vereist</li>
          </ul>

          <h2>Securities lending in het basisaccount</h2>
          <p>
            In het gratis <strong>basisaccount</strong> van DEGIRO is securities lending verplicht.
            Jouw effecten kunnen worden uitgeleend aan derden. Je loopt tegenpartijrisico.
            Je kunt upgraden naar een <em>Custody-account</em> waar dit niet het geval is, maar dit is duurder.
          </p>

          <h2>Is DEGIRO nog de moeite voor Belgen?</h2>
          <p>
            DEGIRO was jarenlang de standaardkeuze voor kostenconsciente Belgische beleggers.
            Met de invoering van de meerwaardebelasting in 2026 verschuift het beeld: de administratielast
            wordt zwaarder, en de kostenbesparing ten opzichte van Saxo of MeDirect is kleiner dan het lijkt.
          </p>
          <p>
            Voor ervaren beleggers die niet schrikken van fiscale administratie en het custody-account gebruiken:
            DEGIRO blijft een valabele optie. Voor beginners raden wij een Belgische broker aan.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">DEGIRO account openen</p>
            </div>
            <a href={brokerLink(broker.affiliateUrl, 'degiro-review-cta')} target="_blank" rel="noopener noreferrer sponsored" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { href: '/vergelijking/degiro-vs-bolero', label: 'DEGIRO vs Bolero' },
            { href: '/vergelijking/saxo-vs-degiro', label: 'Saxo vs DEGIRO' },
            { href: '/belgie/buitenlandse-broker-nbb-aangifte', label: 'NBB-aangifte uitgelegd' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
              <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label} →</p>
            </Link>
          ))}
        </div>

        <BookRecommendationBlock bookIds={['hangmatbelegger']} />
      </div>
    </>
  )
}
