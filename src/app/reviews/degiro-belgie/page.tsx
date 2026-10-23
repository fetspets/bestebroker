import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { BookRecommendationBlock } from '@/components/book/BookRecommendationBlock'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'

const broker = getBrokerById('degiro')!

const bronnen: Bron[] = [
  { staaft: 'Kosten, kernselectie, taksen, NBB-melding, uitlenen van effecten, enkel Basis-account, bescherming, overdracht, registratie via degiro.nl', label: 'Curvo, DEGIRO review (03/09/2026)', href: 'https://curvo.eu/nl/artikel/degiro-review' },
  { staaft: 'DEGIRO houdt de beurstaks in en stort ze door aan de Belgische fiscus', label: 'Test-Aankoop, taks op beursverrichtingen', href: 'https://www.test-aankoop.be/invest/fiscaliteit-en-wetgeving/belastingheffing/dossiers/taks-op-beursverrichtingen-tob' },
]

export const metadata: Metadata = {
  title: 'DEGIRO België review 2026: kosten, taksen en NBB-melding',
  description:
    'DEGIRO in België: €1 per ETF-order uit de kernselectie, TOB ingehouden, maar meerwaardebelasting en NBB-melding doe je zelf. Nagekeken oktober 2026.',
  openGraph: {
    title: 'DEGIRO België Review 2026',
    url: 'https://www.bestebroker.be/reviews/degiro-belgie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/reviews/degiro-belgie' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'FinancialService', name: 'DEGIRO', url: 'https://www.degiro.nl' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5', worstRating: '1' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://www.bestebroker.be/over-mij' },
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
            DEGIRO is een buitenlandse broker (flatexDEGIRO, Duitsland) met lage orderkosten. De beurstaks houdt DEGIRO zelf in.
            De meerwaardebelasting, de Reynderstaks en de roerende voorheffing op buitenlandse dividenden geef je zelf aan, en
            je meldt de rekening bij de Nationale Bank.
          </p>
          <LastUpdated date={broker.lastVerified} />
        </header>

        <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-sm text-orange-800">
            <strong>Voor Belgische beleggers:</strong> DEGIRO houdt de beurstaks (TOB) in, maar niet de meerwaardebelasting,
            de Reynderstaks en de roerende voorheffing op buitenlandse dividenden. Een DEGIRO-rekening is een buitenlandse
            rekening: je meldt ze bij de NBB en vermeldt ze in je belastingaangifte.
          </p>
        </div>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="degiro-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat kost een order bij DEGIRO?</h2>
          <ul>
            <li><strong>ETF uit de kernselectie:</strong> €1 per order, enkel via de beurs Tradegate</li>
            <li><strong>Andere ETF&apos;s:</strong> €3 per order</li>
            <li><strong>Bewaarloon:</strong> geen</li>
            <li><strong>Effecten overzetten naar een andere bank:</strong> €20 per lijn, plus eventuele externe kosten</li>
          </ul>
          <p>
            Er is geen Belgische website: Belgen openen een rekening via degiro.nl. Een automatisch spaarplan of fracties zijn er niet.
          </p>

          <h2>Welke taksen regel je zelf?</h2>
          <ul>
            <li><strong>Beurstaks (TOB):</strong> ingehouden door DEGIRO (0,12% voor de meeste ETF&apos;s, tot 1,32% voor sommige fondsen)</li>
            <li><strong>Roerende voorheffing (30%):</strong> enkel ingehouden op Belgische aandelen; buitenlandse dividenden geef je zelf aan</li>
            <li><strong>Reynderstaks:</strong> bij verkoop van ETF&apos;s met minstens 10% obligaties zelf berekenen en aangeven</li>
            <li><strong>Meerwaardebelasting (10% boven €10.000 vrijstelling per jaar, sinds 2026):</strong> zelf berekenen en aangeven</li>
            <li><strong>NBB-melding:</strong> eenmalig melden bij de Nationale Bank, en jaarlijks vermelden in je belastingaangifte</li>
          </ul>

          <h2>Uitlenen van effecten</h2>
          <p>
            DEGIRO biedt nog één rekeningtype aan: het Basis-account. De aparte Custody-rekening bestaat sinds 2021 niet meer.
            Volgens de voorwaarden van het Basis-account mag DEGIRO je effecten uitlenen; DEGIRO meldt dat het dat momenteel
            niet doet.
          </p>

          <h2>Hoe veilig is je geld?</h2>
          <p>
            DEGIRO staat onder toezicht van de Duitse BaFin. Je effecten worden apart van het vermogen van DEGIRO bewaard.
            Gaat DEGIRO failliet, dan is cash beschermd tot €100.000 en zijn effecten gedekt tot €20.000. Dat zijn dezelfde
            bedragen als bij een Belgische bank. Beleggersbescherming dekt geen koersverliezen.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">DEGIRO account openen</p>
              <AffiliateLabel broker={broker} />
              <p className="text-xs text-orange-700 mt-1">
                Meerwaardebelasting, Reynderstaks en NBB-melding regel je zelf.
              </p>
            </div>
            <a href={goLink(broker.id, 'degiro-review-cta')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <Bronnen bronnen={bronnen} nagekeken={broker.lastVerified} />

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
