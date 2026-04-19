import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { BrokerCard } from '@/components/broker/BrokerCard'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { BookRecommendationBlock } from '@/components/book/BookRecommendationBlock'
import { brokerLink } from '@/lib/affiliateLinks'
import { ScoreBreakdown } from '@/components/broker/ScoreBreakdown'

const broker = getBrokerById('saxo')!

export const metadata: Metadata = {
  title: 'Saxo Bank België Review 2026 — Kosten, Belastingen & Conclusie',
  description:
    'Eerlijke review van Saxo Bank voor Belgische beleggers in 2026. Kosten, meerwaardebelasting-aanpak, AutoInvest, securities lending en onze conclusie.',
  openGraph: {
    title: 'Saxo Bank België Review 2026',
    url: 'https://bestebroker.be/reviews/saxo-bank-belgie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/reviews/saxo-bank-belgie' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'FinancialService',
      name: 'Saxo Bank',
      url: 'https://www.home.saxo/be',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: broker.rating.toFixed(1),
      bestRating: '5',
    },
    author: { '@type': 'Person', name: 'Stef', url: 'https://bestebroker.be/over-mij' },
    publisher: { '@type': 'Organization', name: 'BesteBroker.be', url: 'https://bestebroker.be' },
    datePublished: '2026-01-15',
    dateModified: broker.lastVerified,
    reviewBody: 'Saxo Bank is de meest complete Belgische broker voor ETF-beleggers. Alle belastingen worden automatisch afgehandeld, AutoInvest maakt maandelijks beleggen eenvoudig, en de kosten zijn concurrerend.',
  },
  breadcrumbJsonLd([
    { label: 'Reviews', href: '/beste-broker-belgie' },
    { label: 'Saxo Bank' },
  ]),
]

export default function SaxoReviewPage() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Reviews', href: '/beste-broker-belgie' }, { label: 'Saxo Bank' }]} />

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: broker.color }}>S</div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">Saxo Bank België — Review 2026</h1>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Saxo Bank is een Deense bank met een Belgisch bijkantoor (FSMA- en NBB-geregistreerd). Ze bieden
            een van de meest volledige fiscale diensten aan voor Belgische beleggers.
          </p>
          <LastUpdated date={broker.lastVerified} />
        </header>

        {/* Quick verdict */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-3xl font-bold text-accent mb-1">{broker.rating.toFixed(1)}/5</p>
            <p className="text-sm text-gray-600">Onze score</p>
          </div>
          <div className="card text-center">
            <p className="text-xl font-bold text-primary mb-1">Beste overall</p>
            <p className="text-sm text-gray-600">Volledigste fiscale afhandeling</p>
          </div>
          <div className="card text-center">
            <p className="text-xl font-bold text-primary mb-1">Belgisch bijkantoor</p>
            <p className="text-sm text-gray-600">FSMA + NBB geregistreerd</p>
          </div>
        </div>

        <ScoreBreakdown broker={broker} />

        {/* BrokerCard */}
        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="saxo-review" />
        </div>

        {/* Detailed sections */}
        <div className="prose-custom max-w-3xl mb-10">
          <h2>Kosten in detail</h2>
          <p>
            Saxo rekent <strong>0,08% per ETF-transactie met een minimum van €2</strong>.
            Voor AutoInvest (automatische maandelijkse aankopen) betaal je <strong>€2/maand vaste kost</strong>
            — ongeacht het bedrag. Dit maakt Saxo bijzonder voordelig voor regelmatige beleggers.
          </p>
          <p>
            Er is <strong>geen bewaarloon</strong> en geen jaarlijkse rekening fee. De enige verborgen kost is
            bij overdracht: €75 per lijn als je naar een andere broker wil overstappen.
          </p>

          <h2>Belastingafhandeling</h2>
          <p>
            Saxo handelt <strong>alle Belgische belastingen automatisch</strong> af:
          </p>
          <ul>
            <li><strong>TOB</strong>: automatisch ingehouden bij elke transactie</li>
            <li><strong>Roerende voorheffing</strong>: automatisch bij dividenduitkering</li>
            <li><strong>Reynders-taks</strong>: automatisch bij verkoop van obligatiefondsen met rentecomponent</li>
            <li><strong>Meerwaardebelasting (2026)</strong>: Saxo handelt dit automatisch af</li>
          </ul>
          <p>
            Dit is het grootste voordeel van Saxo ten opzichte van buitenlandse brokers: je hoeft nooit
            zelf aangifte te doen of belastingen te berekenen.
          </p>

          <h2>AutoInvest — maandelijks automatisch beleggen</h2>
          <p>
            AutoInvest laat je een maandelijks bedrag instellen dat automatisch belegd wordt in een of meerdere
            ETFs, voor slechts <strong>€2/maand vaste kost</strong>. De transactie gebeurt automatisch op een
            vooraf gekozen dag — ideaal voor de &quot;set it and forget it&quot;-belegger.
          </p>
          <p>
            Let op: AutoInvest koopt enkel gehele stuks. Als jouw maandelijkse bijdrage niet volstaat voor
            een volledig aandeel, blijft het geld staan tot de volgende maand.
          </p>

          <h2>Securities lending</h2>
          <p>
            Saxo biedt securities lending als <strong>opt-in</strong> aan: jij wordt betaald als jouw effecten
            uitgeleend worden, maar je draagt tegenpartijrisico. Het is standaard <em>uitgeschakeld</em>.
            Wij raden aan dit uitgeschakeld te laten, tenzij je bewust voor het extra rendement kiest.
          </p>

          <h2>Bescherming</h2>
          <p>
            Saxo Bank valt als Deense bank onder het <strong>Deens garantiefonds (Garantiformuen)</strong>
            voor €100.000 aan effecten. Beleggers met een rekening bij het Belgisch bijkantoor worden
            beschermd via dit fonds. Saxo is ook FSMA- en NBB-geregistreerd.
          </p>

          <h2>Is Saxo Bank goed voor beginners?</h2>
          <p>
            Het platform van Saxo is uitgebreid en kan overweldigend zijn voor beginners. De basisinterface is
            redelijk intuïtief, maar de diepgaande functionaliteiten (opties, futures, margin) zijn complex.
            Voor een passieve belegger die enkel ETFs koopt via AutoInvest, volstaat de basisinterface prima.
          </p>

          <h2>Onze conclusie</h2>
          <p>
            Saxo Bank is voor de meeste Belgische beleggers de <strong>beste keuze in 2026</strong>. De combinatie
            van automatische belastingafhandeling, lage ETF-kosten en AutoInvest is uniek op de markt.
            Het is de enige broker waarbij je écht alles kunt automatiseren — van aankoop tot belastingaangifte.
          </p>
        </div>

        {broker.affiliateUrl && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">Klaar om te beginnen met Saxo Bank?</p>
              <p className="text-sm text-gray-600">Open een gratis account — het onboarding-proces duurt ongeveer 15 minuten.</p>
              <p className="text-xs text-gray-400 mt-1">Affiliate: wij ontvangen een vergoeding. Zie <Link href="/disclaimer" className="underline">disclaimer</Link>.</p>
            </div>
            <a
              href={brokerLink(broker.affiliateUrl, 'saxo-review-cta')}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary flex-shrink-0"
            >
              Open account →
            </a>
          </div>
        )}

        {/* Vergelijkingen */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Saxo vergelijken?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/vergelijking/saxo-vs-degiro', label: 'Saxo vs DEGIRO', sub: 'Automatisch vs goedkoop' },
              { href: '/vergelijking/bolero-vs-saxo', label: 'Bolero vs Saxo', sub: 'KBC-dochter vs Deense bank' },
              { href: '/vergelijking/saxo-vs-medirect', label: 'Saxo vs MeDirect', sub: 'AutoInvest vs gratis ETFs' },
            ].map(({ href, label, sub }) => (
              <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
                <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label}</p>
                <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
              </Link>
            ))}
          </div>
        </section>

        <BookRecommendationBlock bookIds={['hangmatbelegger', 'psychologie-geld-nl']} />
      </div>
    </>
  )
}
