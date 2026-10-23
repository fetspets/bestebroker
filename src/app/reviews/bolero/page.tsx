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

const broker = getBrokerById('bolero')!

const BRON = {
  tarieven: 'https://www.bolero.be/uploads/media/667ecf0aabd9a/101-tarieven-nl.pdf',
  review: 'https://curvo.eu/nl/artikel/bolero-review',
}

const bronnen: Bron[] = [
  { staaft: 'Transactiekosten (staffel), bewaarloon en overdrachtkosten', label: 'Bolero, tarieflijst S101 (geldig vanaf 11/06/2025)', href: BRON.tarieven },
  { staaft: 'Inhouding TOB, roerende voorheffing, Reynderstaks en meerwaardebelasting, opt-out, itsme, uitlenen van effecten', label: 'Curvo, Bolero review (08/10/2026)', href: BRON.review },
]

const staffel = [
  { bedrag: 'tot €250', kost: '€2,50' },
  { bedrag: '€250,01 tot €1.000', kost: '€5' },
  { bedrag: '€1.000,01 tot €2.500', kost: '€7,50' },
  { bedrag: '€2.500,01 tot €70.000', kost: '€15 per begonnen €10.000, maximum €50' },
  { bedrag: 'boven €70.000', kost: '€50 + €15 per extra €10.000' },
]

export const metadata: Metadata = {
  title: 'Bolero review 2026: kosten per order, taksen en itsme',
  description:
    'Bolero (KBC) nagekeken: wat kost een order van €250, €1.000 of €5.000? Welke taksen houdt Bolero in en wat met de meerwaardebelasting? Met bronnen.',
  openGraph: {
    title: 'Bolero review 2026: kosten per order, taksen en itsme',
    description: 'Bolero (KBC) nagekeken: kosten per orderbedrag, ingehouden taksen, meerwaardebelasting en overdrachtkosten. Met bronnen.',
    url: 'https://www.bestebroker.be/reviews/bolero',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/reviews/bolero' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'FinancialService', name: 'Bolero', url: 'https://bolero.be' },
    reviewRating: { '@type': 'Rating', ratingValue: broker.rating.toFixed(1), bestRating: '5', worstRating: '1' },
    author: { '@type': 'Person', name: 'Stef', url: 'https://www.bestebroker.be/over-mij' },
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
            Bolero is de online broker van KBC Bank. Bolero houdt de Belgische taksen in, ook de
            meerwaardebelasting, en leent je effecten niet uit. De orderkost hangt af van het bedrag:
            van €2,50 tot €250 tot €7,50 tot €2.500.
          </p>
          <LastUpdated date={broker.lastVerified} />
        </header>

        <ScoreBreakdown broker={broker} />

        <div className="mb-8">
          <BrokerCard broker={broker} variant="full" source="bolero-review" />
        </div>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Wat kost een order bij Bolero?</h2>
          <p>
            Voor aandelen en ETF&apos;s op Euronext (Brussel, Amsterdam, Parijs) geldt één staffel.
            Een aparte, goedkopere Playlist-prijs bestaat niet meer: de tarieflijst van 11 juni 2025
            rekent voor alle genoteerde effecten hetzelfde.
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
            Daarbovenop betaal je de beurstaks (TOB), die Bolero inhoudt. Er is geen bewaarloon.
            Effecten overzetten naar een andere bank kost €50 per lijn; naar KBC, KBC Brussels of CBC is het gratis.
          </p>
          <p>
            Wie elke maand €300 belegt, betaalt dus €5 per aankoop. Wil je weten wat dat over 10 of 20 jaar
            betekent naast andere brokers? Gebruik de <Link href="/tools/brokerkosten-calculator" className="text-accent underline">kostencalculator</Link>.
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
            Bolero leent je effecten niet uit aan derden. Bij brokers die dat wel doen, loop je een
            klein bijkomend risico als de lener in gebreke blijft.
          </p>

          <h2>Taksen: wat houdt Bolero in?</h2>
          <ul>
            <li><strong>Beurstaks (TOB):</strong> ingehouden bij elke transactie.</li>
            <li><strong>Roerende voorheffing</strong> op dividenden: ingehouden.</li>
            <li><strong>Reynderstaks</strong> op fondsen met obligaties: ingehouden bij verkoop.</li>
            <li>
              <strong>Meerwaardebelasting:</strong> Bolero houdt ze in bij elke verkoop. De bank weet niet of je
              over het hele jaar onder de vrijstelling blijft. Teveel betaald recupereer je via je belastingaangifte,
              wat tot tweeënhalf jaar kan duren. Je kan ook kiezen om de inhouding uit te zetten en zelf aan te geven.
              Meer uitleg: <Link href="/belgie/meerwaardebelasting-2026-uitleg" className="text-accent underline">meerwaardebelasting 2026</Link>.
            </li>
          </ul>
          <p>Omdat Bolero een Belgische rekening is, hoef je ze niet te melden bij de Nationale Bank.</p>

          <h2>Bescherming en veiligheid</h2>
          <p>
            Bolero is een merk van KBC Bank, een bank met Belgische vergunning. Je effecten blijven je eigendom en
            worden gescheiden bewaard. Kan de bank ze bij een faillissement toch niet teruggeven, dan beschermt het
            Belgische stelsel effecten tot €20.000 en cash tot €100.000. Hoe we veiligheid scoren, lees je in de{' '}
            <Link href="/methodologie" className="text-accent underline">methodologie</Link>.
          </p>

          <h2>Samengevat</h2>
          <p>
            Bolero past bij wie de Belgische taksen wil laten inhouden en geen effecten wil laten uitlenen.
            Voor kleine orders tot €250 is de kost €2,50; vanaf €1.000 tot €2.500 betaal je €7,50 per order.
            Wie maandelijks automatisch wil beleggen, vindt bij Bolero geen automatische afschrijving.
            Vergelijk zelf met <Link href="/vergelijking/bolero-vs-saxo" className="text-accent underline">Bolero vs Saxo</Link>{' '}
            of <Link href="/vergelijking/degiro-vs-bolero" className="text-accent underline">DEGIRO vs Bolero</Link>.
            Dit is algemene informatie, geen persoonlijk advies.
          </p>
        </div>

        <Bronnen bronnen={bronnen} nagekeken={broker.lastVerified} />

        {broker.affiliateUrl && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">Bolero account openen</p>
              <AffiliateLabel broker={broker} />
              <p className="text-sm text-gray-600">Onboarding mogelijk via itsme — in enkele minuten klaar.</p>
            </div>
            <a href={goLink(broker.id, 'bolero-review-cta')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0">
              Open account →
            </a>
          </div>
        )}

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Gerelateerde vergelijkingen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/vergelijking/degiro-vs-bolero', label: 'DEGIRO vs Bolero: kosten en taksen' },
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
