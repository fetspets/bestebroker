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

const broker = getBrokerById('keytrade')!

const bronnen: Bron[] = [
  { staaft: 'Transactiekosten Euronext (staffel vanaf 22/01/2025) en overdrachtkosten', label: 'Keytrade Bank, nieuwe tarieven 2025', href: 'https://keytradebank.be/en/new-trading-tariffs-2025' },
  { staaft: 'Geen bewaarloon (effectenrekening blijft gratis)', label: 'Test-Aankoop (01/2025)', href: 'https://www.test-aankoop.be/invest/beleggen/aandelen/analysis/2025/01/keytrade-brokertarieven-wijziging' },
  { staaft: 'Inhouding van de taksen, opt-out meerwaardebelasting, geen uitlenen, bescherming, itsme, geen spaarplan op het brokerplatform', label: 'Curvo, Keytrade review (03/09/2026)', href: 'https://curvo.eu/nl/artikel/keytrade-review' },
  { staaft: 'Juridische vorm: Belgisch bijkantoor van Arkéa Direct Bank SA', label: 'Keytrade Bank, trading', href: 'https://www.keytradebank.be/en/investing/trading' },
  { staaft: 'Minnelijke schikking met de FSMA', label: 'FSMA-persbericht (22/04/2026)', href: 'https://www.vfb.be/Media/Default/pdf/20260422%20Persbericht%20Minnelijke%20schikking%20Keytrade.pdf' },
]

const staffel = [
  { bedrag: 'tot €250', kost: '€2,45' },
  { bedrag: '€250,01 tot €2.500', kost: '€5,95' },
  { bedrag: '€2.500,01 tot €10.000', kost: '€14,95' },
  { bedrag: 'per extra schijf van €10.000', kost: '+ €7,50' },
]

export const metadata: Metadata = {
  title: 'Keytrade Bank review 2026: kosten per order en taksen',
  description:
    'Keytrade Bank nagekeken: wat kost een order van €250, €1.000 of €5.000? Welke taksen houdt Keytrade in, hoe ben je beschermd? Met bronnen.',
  openGraph: {
    title: 'Keytrade Bank review 2026: kosten per order en taksen',
    description: 'Keytrade Bank nagekeken: kosten per orderbedrag, ingehouden taksen, bescherming en overdrachtkosten. Met bronnen.',
    url: 'https://www.bestebroker.be/reviews/keytrade-belgie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/reviews/keytrade-belgie' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'FinancialService', name: 'Keytrade Bank', url: 'https://www.keytradebank.be' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5', worstRating: '1' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://www.bestebroker.be/over-mij' },
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
            Keytrade Bank is sinds 1998 actief in België. Het is een Belgisch bijkantoor van de Franse
            Arkéa Direct Bank (groep Crédit Mutuel Arkéa). Keytrade houdt de Belgische taksen in en leent je
            effecten niet uit. Een order kost €2,45 tot €250 en €5,95 tot €2.500.
          </p>
          <LastUpdated date={broker.lastVerified} />
        </header>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="keytrade-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat kost een order bij Keytrade?</h2>
          <p>
            Sinds 22 januari 2025 geldt voor aandelen en ETF&apos;s (trackers) op Euronext Brussel, Amsterdam en Parijs
            deze staffel:
          </p>
          <div className="not-prose overflow-x-auto my-4">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr><th scope="col" className="text-left p-2">Orderbedrag</th><th scope="col" className="text-left p-2">Makelaarsloon</th></tr>
              </thead>
              <tbody>
                {staffel.map(r => (
                  <tr key={r.bedrag} className="border-t border-gray-100"><td className="p-2">{r.bedrag}</td><td className="p-2 font-medium">{r.kost}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Daarbovenop betaal je de beurstaks (TOB), die Keytrade inhoudt. Bewaarloon is er niet.
            Effecten overzetten naar een andere bank kost €50 per lijn exclusief btw (€60,50 inclusief).
          </p>
          <p>
            Wie elke maand €300 belegt, betaalt €5,95 per aankoop. Bij Bolero is dat €5, bij Saxo €2.
            Reken je eigen situatie na met de <Link href="/tools/brokerkosten-calculator" className="text-accent underline">kostencalculator</Link>.
          </p>

          <h2>Taksen: wat houdt Keytrade in?</h2>
          <ul>
            <li><strong>Beurstaks (TOB):</strong> ingehouden en aangegeven.</li>
            <li><strong>Roerende voorheffing</strong> op dividenden: ingehouden.</li>
            <li><strong>Reynderstaks:</strong> ingehouden bij verkoop.</li>
            <li>
              <strong>Meerwaardebelasting:</strong> ingehouden bij elke verkoop. Teveel betaald recupereer je via je aangifte,
              wat tot tweeënhalf jaar kan duren. Je kan de inhouding ook uitzetten en zelf aangeven. Meer uitleg:{' '}
              <Link href="/belgie/meerwaardebelasting-2026-uitleg" className="text-accent underline">meerwaardebelasting 2026</Link>.
            </li>
          </ul>
          <p>Een melding bij de Nationale Bank is niet nodig.</p>

          <h2>Bescherming en veiligheid</h2>
          <p>
            Keytrade leent je effecten niet uit. Omdat de bank een bijkantoor is van een Franse bank, valt je rekening onder
            het Franse garantiefonds (FGDR): effecten tot €70.000 en cash tot €100.000.
          </p>
          <p>
            In april 2026 sloot Keytrade een minnelijke schikking van €250.000 met de FSMA. Door een IT-probleem kon de bank
            van eind december 2023 tot half maart 2024 niet goed nagaan of beleggingen passend waren voor klanten. Hoe dit
            meetelt in de score, lees je in de <Link href="/methodologie" className="text-accent underline">methodologie</Link>.
          </p>

          <h2>Spaarplan en rekening openen</h2>
          <p>
            Op het brokerplatform is er geen automatisch spaarplan: je plaatst elke aankoop zelf. Keytrade biedt wel Keyplan aan,
            een plan in beleggingsfondsen met hogere lopende kosten. Een rekening openen kan met itsme.
          </p>

          <h2>Samengevat</h2>
          <p>
            Keytrade past bij wie de Belgische taksen wil laten inhouden, zelf orders plaatst en geen effecten wil laten uitlenen.
            Voor maandelijkse aankopen tot €2.500 is de orderkost €5,95, iets hoger dan bij Bolero.
            Vergelijk met de <Link href="/reviews/bolero" className="text-accent underline">Bolero review</Link> of het{' '}
            <Link href="/beste-broker-belgie" className="text-accent underline">overzicht van alle brokers</Link>.
            Dit is algemene informatie, geen persoonlijk advies.
          </p>
        </div>

        <Bronnen bronnen={bronnen} nagekeken={broker.lastVerified} />

        {broker.affiliateUrl && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">Keytrade Bank account openen</p>
              <AffiliateLabel broker={broker} />
              <p className="text-sm text-gray-600">Belgische taksen ingehouden, rekening openen met itsme.</p>
            </div>
            <a href={goLink(broker.id, 'keytrade-review-cta')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Gerelateerde vergelijkingen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/reviews/bolero', label: 'Bolero review: kosten per order en taksen' },
              { href: '/reviews/medirect', label: 'MeDirect review: ETF’s zonder makelaarsloon' },
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
