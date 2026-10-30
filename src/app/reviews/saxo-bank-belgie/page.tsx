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

const broker = getBrokerById('saxo')!

const bronnen: Bron[] = [
  { staaft: 'Transactiekosten, bewaarloon en toezicht', label: 'Saxo België, individuele rekening', href: 'https://www.home.saxo/nl-be/accounts/individual' },
  { staaft: 'AutoInvest-kost', label: 'Saxo België, AutoInvest', href: 'https://www.home.saxo/nl-be/products/autoinvest' },
  { staaft: 'Inhouding TOB, roerende voorheffing, Reynderstaks en meerwaardebelasting, opt-out, AutoInvest enkel hele stuks, bescherming, uitlenen opt-in, itsme', label: 'Curvo, Saxo review', href: 'https://curvo.eu/nl/artikel/saxo-bank-review' },
  { staaft: 'Boete Deense toezichthouder (2026)', label: 'FinTech Futures', href: 'https://www.fintechfutures.com/regulatory-actions/saxo-bank-fined-by-danish-fsa' },
]

const TITLE = 'Saxo Bank review België 2026: kosten, AutoInvest en taksen'
const DESCRIPTION =
  'Saxo België nagekeken: 0,08% per ETF-order (min. €2), AutoInvest €2 per maand, alle Belgische taksen ingehouden. Wat kost overstappen? Met bronnen.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.bestebroker.be/reviews/saxo-bank-belgie',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://www.bestebroker.be/reviews/saxo-bank-belgie' },
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
      worstRating: '1',
    },
    author: { '@type': 'Person', name: 'Stef', url: 'https://www.bestebroker.be/over-mij' },
    publisher: { '@type': 'Organization', name: 'BesteBroker.be', url: 'https://www.bestebroker.be' },
    datePublished: '2026-01-15',
    dateModified: broker.lastVerified,
    reviewBody: 'Saxo België houdt TOB, roerende voorheffing, Reynderstaks en meerwaardebelasting in. ETF-orders kosten 0,08% met minimum €2; AutoInvest kost €2 per maand. Overdracht naar een andere broker kost €75 per lijn.',
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
            Saxo Bank is een Deense bank met een Belgisch bijkantoor (FSMA- en NBB-geregistreerd). Saxo houdt
            alle Belgische beleggingstaksen voor je in, ook de meerwaardebelasting.
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
            <p className="text-xl font-bold text-primary mb-1">AutoInvest €2/maand</p>
            <p className="text-sm text-gray-600">Houdt alle Belgische taksen in</p>
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
            — ongeacht het bedrag. Hoeveel dat per jaar kost tegenover andere brokers, zie je in de{' '}
            <Link href="/tools/brokerkosten-calculator" className="text-accent underline">kostencalculator</Link>.
          </p>
          <p>
            Er is <strong>geen bewaarloon</strong> en geen jaarlijkse rekeningkost. Hou wel rekening met de
            overdrachtkost: €75 per lijn als je je effecten naar een andere broker wil overbrengen.
          </p>

          <h2>Belastingafhandeling</h2>
          <p>
            Saxo handelt <strong>alle Belgische belastingen automatisch</strong> af:
          </p>
          <ul>
            <li><strong>TOB</strong>: automatisch ingehouden bij elke transactie</li>
            <li><strong>Roerende voorheffing</strong>: automatisch bij dividenduitkering</li>
            <li><strong>Reynders-taks</strong>: automatisch bij verkoop van obligatiefondsen met rentecomponent</li>
            <li><strong>Meerwaardebelasting</strong>: ingehouden bij elke verkoop; teveel betaald recupereer je via je aangifte. Je kan de inhouding ook uitzetten en zelf aangeven.</li>
          </ul>
          <p>
            Een melding bij de Nationale Bank is niet nodig: je rekening loopt via het Belgische bijkantoor.
          </p>

          <h2>AutoInvest — maandelijks automatisch beleggen</h2>
          <p>
            AutoInvest laat je een maandelijks bedrag instellen dat automatisch belegd wordt in een of meerdere
            ETFs, voor slechts <strong>€2/maand vaste kost</strong>. De transactie gebeurt automatisch op een
            vooraf gekozen dag, zonder dat je zelf een order hoeft te plaatsen.
          </p>
          <p>
            Let op: AutoInvest koopt enkel gehele stuks. Als jouw maandelijkse bijdrage niet volstaat voor
            een volledig aandeel, blijft het geld staan tot de volgende maand.
          </p>

          <h2>Securities lending</h2>
          <p>
            Saxo biedt securities lending als <strong>opt-in</strong> aan: jij wordt betaald als jouw effecten
            uitgeleend worden, maar je draagt tegenpartijrisico. Het is standaard <em>uitgeschakeld</em>.
            Zet je het niet zelf aan, dan worden je effecten niet uitgeleend.
          </p>

          <h2>Bescherming en veiligheid</h2>
          <p>
            Je effecten worden gescheiden bewaard. Kan de bank ze bij een faillissement toch niet teruggeven, dan beschermt
            het Deense garantiefonds effecten tot €20.000 en cash tot €100.000. Dat is hetzelfde niveau als bij de andere
            brokers op deze site.
          </p>
          <p>
            In januari 2026 legde de Deense toezichthouder Saxo een boete op van DKK 313 miljoen voor
            tekortkomingen in de antiwitwascontroles tussen 2021 en 2023. Saxo aanvaardde de boete. Hoe dit meetelt in de
            score, lees je in de <Link href="/methodologie" className="text-accent underline">methodologie</Link>.
          </p>
          <h2>Is Saxo Bank goed voor beginners?</h2>
          <p>
            Het platform van Saxo is uitgebreid en kan overweldigend zijn voor beginners. De basisinterface is
            redelijk intuïtief, maar de diepgaande functionaliteiten (opties, futures, margin) zijn complex.
            Voor een passieve belegger die enkel ETFs koopt via AutoInvest, volstaat de basisinterface prima.
          </p>

          <h2>Samengevat</h2>
          <p>
            Saxo past bij wie automatisch maandelijks in ETF&apos;s wil beleggen (AutoInvest, €2 per maand) en de Belgische
            taksen wil laten inhouden. Wie enkel losse orders plaatst, betaalt 0,08% met minimum €2. Vergelijk met{' '}
            <Link href="/vergelijking/bolero-vs-saxo" className="text-accent underline">Bolero vs Saxo</Link> of{' '}
            <Link href="/vergelijking/saxo-vs-medirect" className="text-accent underline">MeDirect vs Saxo</Link>.
            Dit is algemene informatie, geen persoonlijk advies.
          </p>
        </div>

        <Bronnen bronnen={bronnen} nagekeken={broker.lastVerified} />

        {broker.affiliateUrl && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-primary mb-1">Klaar om te beginnen met Saxo Bank?</p>
              <AffiliateLabel broker={broker} />
              <p className="text-sm text-gray-600">Open een gratis account — het onboarding-proces duurt ongeveer 15 minuten.</p>
            </div>
            <a
              href={goLink(broker.id, 'saxo-review-cta')}
              target="_blank"
              rel="sponsored nofollow noopener"
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
