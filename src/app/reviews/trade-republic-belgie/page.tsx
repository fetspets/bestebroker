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

const broker = getBrokerById('trade-republic')!

const bronnen: Bron[] = [
  { staaft: 'Belgisch bijkantoor sinds 15/09/2026, inhouding TOB/RV/Reynders, meerwaardebelasting opt-in, NBB-melding, kosten, overdracht, bescherming', label: 'Curvo, Trade Republic review (18/09/2026)', href: 'https://curvo.eu/nl/artikel/trade-republic-review' },
  { staaft: 'BE-IBAN, inhouding van de Belgische taksen, overgang van bestaande Duitse rekeningen', label: 'Test-Aankoop, Trade Republic België (15/09/2026)', href: 'https://www.test-aankoop.be/invest/beleggen/etf/artikels/2026/09/trade-republic-belgie-beoordeling-kosten-fiscaliteit-beleggingen' },
]

export const metadata: Metadata = {
  title: 'Trade Republic België review 2026: Belgische rekening en taksen',
  description:
    'Trade Republic heeft sinds 15/09/2026 een Belgisch bijkantoor met BE-IBAN. Welke taksen houdt het nu in, wat kost een order en wat met je oude Duitse rekening?',
  openGraph: {
    title: 'Trade Republic België review 2026: Belgische rekening en taksen',
    description: 'Trade Republic heeft sinds 15/09/2026 een Belgisch bijkantoor met BE-IBAN. Welke taksen houdt het nu in, wat kost een order en wat met je oude Duitse rekening?',
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
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5', worstRating: '1' },
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
            Trade Republic is een Duitse bank met een eenvoudige app, €1 per order en spaarplannen zonder transactiekost.
            Sinds 15 september 2026 heeft ze een Belgisch bijkantoor: nieuwe klanten krijgen een rekening met een IBAN die
            begint met BE, en de Belgische taksen worden ingehouden.
          </p>
          <LastUpdated date={broker.lastVerified} />
        </header>

        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-sm text-orange-800">
            <strong>Let op het verschil tussen oude en nieuwe rekeningen.</strong> Opende je je rekening vóór 15 september 2026,
            dan blijft ze Duits tot je ze overzet. Op een Duitse rekening geef je de beurstaks, roerende voorheffing,
            Reynderstaks en meerwaardebelasting zelf aan, en meld je de rekening bij de Nationale Bank (NBB).
          </p>
        </div>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="tr-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat kost een order bij Trade Republic?</h2>
          <p>
            Een aankoop of verkoop van een ETF, aandeel of obligatie kost <strong>€1 per order</strong>. Een spaarplan in ETF&apos;s
            kost geen transactiekost, ook niet als je fracties koopt. Ontvang je dividenden in een vreemde munt, dan betaal je
            wisselkosten. Effecten overzetten naar een andere bank kost €25 per lijn, plus eventuele externe kosten.
          </p>

          <h2>Welke taksen houdt Trade Republic in?</h2>
          <p>Op een Belgische rekening (nieuw sinds 15 september 2026):</p>
          <ul>
            <li><strong>Beurstaks (TOB):</strong> ingehouden</li>
            <li><strong>Roerende voorheffing</strong> op dividenden en rente (30%): ingehouden</li>
            <li><strong>Reynderstaks</strong> op ETF&apos;s met minstens 10% obligaties: ingehouden</li>
            <li>
              <strong>Meerwaardebelasting (10%, sinds 2026):</strong> je kiest. Bij <em>opt-in</em> houdt Trade Republic ze in bij
              verkoop; bij <em>opt-out</em> geef je ze zelf aan.
            </li>
            <li><strong>Melding bij de NBB:</strong> niet nodig voor de Belgische rekening</li>
          </ul>
          <p>
            Op een oude Duitse rekening blijft alles zoals vroeger: je geeft de taksen zelf aan en meldt de rekening bij de NBB.
            Zet je ze over naar de Belgische rekening, meld dan ook dat de Duitse rekening gesloten is.
          </p>

          <h2>Hoe veilig is je geld?</h2>
          <p>
            Trade Republic staat onder toezicht van de Duitse BaFin. Gaat de bank failliet, dan is cash beschermd tot €100.000
            en zijn effecten gedekt tot €20.000 door de Duitse stelsels. Dat zijn dezelfde bedragen als bij een Belgische bank.
            Je effecten worden apart van het vermogen van de bank bewaard. Beleggersbescherming dekt geen koersverliezen.
          </p>

          <h2>Spaarplannen</h2>
          <p>
            Je kan maandelijks automatisch een vast bedrag beleggen in ETF&apos;s, ook in fracties. DEGIRO heeft geen automatisch
            spaarplan; bij Saxo kost AutoInvest €2 per maand.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">Trade Republic account openen</p>
              <AffiliateLabel broker={broker} />
            </div>
            <a href={goLink(broker.id, 'tr-review-cta')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <Bronnen bronnen={bronnen} nagekeken={broker.lastVerified} />

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
