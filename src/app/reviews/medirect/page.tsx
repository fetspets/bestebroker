import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'
import { Bronnen, type Bron } from '@/components/ui/Bronnen'

const broker = getBrokerById('medirect')!

const bronnen: Bron[] = [
  { staaft: 'ETF-transacties gratis sinds augustus 2025, aandelen 0,15%, inhouding TOB, roerende voorheffing, Reynderstaks en meerwaardebelasting, opt-out, geen uitlenen van effecten', label: 'Curvo, MeDirect review (03/09/2026)', href: 'https://curvo.eu/nl/artikel/medirect-review' },
  { staaft: 'Minimum €2,50 per aandelenorder op de meeste Europese beurzen sinds 1 juli 2026', label: 'Test Aankoop Invest (29/06/2026)', href: 'https://www.test-aankoop.be/invest/beleggen/aandelen/artikels/2026/06/medirect-verlaagt-transactiekosten-aandelen' },
  { staaft: 'Geen spaarplan op het brokerplatform, overdrachtkosten', label: 'Curvo, MeDirect vs Saxo (03/09/2026)', href: 'https://curvo.eu/nl/artikel/medirect-vs-saxo' },
]

export const metadata: Metadata = {
  title: 'MeDirect review 2026: gratis ETF’s, aandelen en taksen',
  description:
    'MeDirect nagekeken: ETF’s zonder makelaarsloon, wat aandelen kosten sinds juli 2026, welke taksen MeDirect inhoudt en wat ontbreekt. Met bronnen.',
  openGraph: {
    title: 'MeDirect review 2026: gratis ETF’s, aandelen en taksen',
    description: 'ETF’s zonder makelaarsloon, aandelenkosten sinds juli 2026, ingehouden taksen en wat ontbreekt. Met bronnen.',
    url: 'https://www.bestebroker.be/reviews/medirect',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/reviews/medirect' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'FinancialService', name: 'MeDirect', url: 'https://www.medirect.be' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5', worstRating: '1' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://www.bestebroker.be/over-mij' },
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
            MeDirect Bank is een bank naar Belgisch recht. Sinds augustus 2025 betaal je geen makelaarsloon
            op ETF-transacties. Aandelen zijn wel betalend, en een automatisch spaarplan is er niet.
          </p>
          <LastUpdated date={broker.lastVerified} />
        </header>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="medirect-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat kost beleggen bij MeDirect?</h2>
          <ul>
            <li><strong>ETF&apos;s:</strong> geen makelaarsloon, sinds augustus 2025. De beurstaks (TOB) betaal je wel.</li>
            <li>
              <strong>Aandelen:</strong> 0,15% van het orderbedrag. Sinds 1 juli 2026 is het minimum €2,50 per order op
              de meeste Europese beurzen (voordien €7).
            </li>
            <li><strong>Bewaarloon:</strong> geen.</li>
            <li><strong>Effecten overzetten</strong> naar een andere bank: €50 per lijn.</li>
          </ul>

          <h2>Geen automatisch spaarplan</h2>
          <p>
            Op het brokerplatform van MeDirect plaats je elke aankoop zelf. Wie maandelijks automatisch wil beleggen,
            vindt dat bij Saxo (AutoInvest) of bij Trade Republic (spaarplannen). Zie{' '}
            <Link href="/vergelijking/saxo-vs-medirect" className="text-accent underline">MeDirect vs Saxo</Link>.
          </p>

          <h2>Taksen: wat houdt MeDirect in?</h2>
          <ul>
            <li><strong>Beurstaks (TOB):</strong> ingehouden en aangegeven.</li>
            <li><strong>Roerende voorheffing</strong> op dividenden: ingehouden.</li>
            <li><strong>Reynderstaks:</strong> ingehouden bij verkoop.</li>
            <li>
              <strong>Meerwaardebelasting:</strong> ingehouden bij elke verkoop. MeDirect weet niet of je over het hele jaar
              onder de vrijstelling blijft. Teveel betaald krijg je terug via je aangifte, wat tot tweeënhalf jaar kan duren.
              Je kan de inhouding ook uitzetten en zelf aangeven. Meer uitleg:{' '}
              <Link href="/belgie/meerwaardebelasting-2026-uitleg" className="text-accent underline">meerwaardebelasting 2026</Link>.
            </li>
          </ul>
          <p>Een melding bij de Nationale Bank is niet nodig: het is een Belgische rekening.</p>

          <h2>Bescherming en veiligheid</h2>
          <p>
            MeDirect leent je effecten niet uit. Je effecten worden gescheiden bewaard. Kan de bank ze bij een faillissement
            toch niet teruggeven, dan beschermt het Belgische stelsel effecten tot €20.000 en cash tot €100.000.
            Hoe we veiligheid scoren, lees je in de <Link href="/methodologie" className="text-accent underline">methodologie</Link>.
          </p>

          <h2>Samengevat</h2>
          <p>
            MeDirect past bij wie vooral ETF&apos;s koopt, zelf de orders plaatst en de Belgische taksen wil laten inhouden.
            Wie automatisch maandelijks wil beleggen of vaak aandelen koopt, vergelijkt best eerst met andere brokers in het{' '}
            <Link href="/beste-broker-belgie" className="text-accent underline">overzicht</Link>.
            Dit is algemene informatie, geen persoonlijk advies.
          </p>
        </div>

        <Bronnen bronnen={bronnen} nagekeken={broker.lastVerified} />

        {broker.affiliateUrl && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">MeDirect account openen</p>
              <AffiliateLabel broker={broker} />
            </div>
            <a href={goLink(broker.id, 'medirect-review-cta')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Gerelateerde vergelijkingen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/vergelijking/saxo-vs-medirect', label: 'Saxo vs MeDirect: AutoInvest of gratis ETF’s' },
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
