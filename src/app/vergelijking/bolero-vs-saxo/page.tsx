import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { brokerLink } from '@/lib/affiliateLinks'

const bolero = getBrokerById('bolero')!
const saxo = getBrokerById('saxo')!

export const metadata: Metadata = {
  title: 'Bolero vs Saxo Bank 2026 — KBC-Dochter vs Deense Bank',
  description:
    'Bolero of Saxo? Beide zijn Belgisch, regelen alle belastingen automatisch en bieden spaarplannen. Maar er zijn duidelijke verschillen in kosten en functies.',
  openGraph: {
    title: 'Bolero vs Saxo Bank 2026 — KBC-Dochter vs Deense Bank',
    description: 'Bolero of Saxo? Beide zijn Belgisch, regelen alle belastingen automatisch en bieden spaarplannen. Maar er zijn duidelijke verschillen in kosten en functies.',
    url: 'https://bestebroker.be/vergelijking/bolero-vs-saxo',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/vergelijking/bolero-vs-saxo' },
}

const rows = [
  { label: 'Belgisch bijkantoor / bank', bolero: '✅ KBC-dochter', saxo: '✅ Belgisch bijkantoor' },
  { label: 'Min. ETF-transactiekost', bolero: '€2,50 (Playlist)', saxo: '€2,00' },
  { label: 'Spaarplan', bolero: '✅ Invest & Repeat', saxo: '✅ AutoInvest (€2/maand)' },
  { label: 'Auto-debit spaarplan', bolero: '❌ Handmatig storten', saxo: '✅ Automatisch' },
  { label: 'Meerwaardebelasting auto', bolero: '✅ v.a. 1/6/2026', saxo: '✅' },
  { label: 'Securities lending', bolero: '✅ Nooit', saxo: '✅ Opt-in (standaard uit)' },
  { label: 'Depositobescherming', bolero: '€100.000', saxo: '€100.000' },
  { label: 'Overdrachtkost', bolero: '€50/lijn', saxo: '€75/lijn' },
  { label: 'itsme onboarding', bolero: '✅', saxo: '❌' },
]

export default function BoleroVsSaxoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Bolero vs Saxo' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Bolero of Saxo: wat is beter voor Belgische beleggers?', acceptedAnswer: { '@type': 'Answer', text: 'Beide zijn uitstekende keuzes. Saxo is beter voor volledig automatisch beleggen (AutoInvest met automatische debitering). Bolero is beter als je absolute zekerheid wil dat je effecten nooit worden uitgeleend en graag een 100% Belgische bank hebt.' } },
          { '@type': 'Question', name: 'Is Bolero of Saxo goedkoper?', acceptedAnswer: { '@type': 'Answer', text: 'Saxo is goedkoper via AutoInvest (€2/maand vast). Bolero Playlist-ETFs kosten €2,50 (bij <€250), €5 (€250–€1.000) of €7,50 (>€1.000). Bij maandelijkse bedragen boven €150 is Saxo dus goedkoper.' } },
          { '@type': 'Question', name: 'Doet Bolero aan securities lending?', acceptedAnswer: { '@type': 'Answer', text: 'Nee. Bolero leent effecten nooit uit aan derden. Dit staat expliciet in de algemene voorwaarden. Bij Saxo is securities lending opt-in (standaard uitgeschakeld, maar het bestaat).' } },
        ],
      }) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Bolero vs Saxo' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Bolero vs Saxo Bank 2026 — KBC-dochter vs Deense bank
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Beide zijn excellente keuzes voor Belgische beleggers. Beide regelen alle belastingen.
            Maar Saxo heeft een echte AutoInvest met automatische debitering, terwijl Bolero nooit
            aan securities lending doet.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 text-gray-600 font-semibold">Criterium</th>
                  <th className="text-center py-3 font-semibold text-red-600">Bolero</th>
                  <th className="text-center py-3 font-semibold text-blue-700">Saxo Bank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map(({ label, bolero: vb, saxo: vs }) => (
                  <tr key={label}>
                    <td className="py-2.5 font-medium text-gray-700">{label}</td>
                    <td className="py-2.5 text-center text-gray-600">{vb}</td>
                    <td className="py-2.5 text-center text-gray-600">{vs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Het sleutelverschil: AutoInvest vs Invest & Repeat</h2>
          <p>
            Saxo&#39;s <strong>AutoInvest</strong> debiteert automatisch elke maand van je rekening en koopt dan
            voor jou ETFs aan — volledig zonder handmatig ingrijpen. Kost €2/maand.
          </p>
          <p>
            Bolero&#39;s <strong>Invest & Repeat</strong> voert de herhalende order uit, maar debiteert je rekening
            <em>niet</em> automatisch. Je moet zelf voldoende geld op je Bolero-rekening zetten voor de transactie
            wordt uitgevoerd.
          </p>

          <h2>Securities lending</h2>
          <p>
            Bolero leent <strong>nooit</strong> effecten uit. Saxo&#39;s securities lending is <em>opt-in</em>
            en staat standaard uit — maar het bestaat. Voor beleggers die absolute zekerheid willen dat hun
            effecten niet worden uitgeleend, geeft Bolero meer rust.
          </p>

          <h2>Wie kiest wat?</h2>
          <ul>
            <li><strong>Kies Saxo</strong> als je volledige automatisering wil — eenmalig instellen, dan niks meer doen.</li>
            <li><strong>Kies Bolero</strong> als je graag bij een 100% Belgische bank zit met itsme-onboarding en absoluut geen securities lending.</li>
          </ul>
        </div>

        {/* Wie wint in jouw situatie? */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Wie wint in jouw situatie?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card border-t-4 border-t-red-400">
              <p className="text-xs font-semibold text-red-600 mb-2">Starter</p>
              <p className="font-semibold text-primary mb-2">Beginner via itsme, KBC-klant</p>
              <p className="text-sm text-gray-600">Bolero opent snel via itsme. Vertrouwde Belgische bank. Nooit securities lending. <strong>Winnaar: Bolero</strong></p>
            </div>
            <div className="card border-t-4 border-t-blue-400">
              <p className="text-xs font-semibold text-blue-700 mb-2">Automatische belegger</p>
              <p className="font-semibold text-primary mb-2">Wil alles op de automatische piloot</p>
              <p className="text-sm text-gray-600">Saxo AutoInvest debiteert automatisch. Bolero Invest & Repeat vereist handmatige storting. <strong>Winnaar: Saxo</strong></p>
            </div>
            <div className="card border-t-4 border-t-green-400">
              <p className="text-xs font-semibold text-green-700 mb-2">Veiligheids-first</p>
              <p className="font-semibold text-primary mb-2">Effecten absoluut niet uitgeleend willen</p>
              <p className="text-sm text-gray-600">Bolero garandeert contractueel dat effecten nooit worden uitgeleend. Saxo is opt-in maar het bestaat. <strong>Winnaar: Bolero</strong></p>
            </div>
          </div>
        </section>

        {/* Kostenvergelijking */}
        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Kostenvergelijking (1 trade/maand)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 text-gray-600 font-semibold">Maandelijks bedrag</th>
                  <th className="text-center py-3 font-semibold text-red-600">Bolero (Playlist)</th>
                  <th className="text-center py-3 font-semibold text-blue-700">Saxo (AutoInvest)</th>
                  <th className="text-center py-3 text-gray-600 font-semibold">Verschil/jaar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€150/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€2,50/trade</td>
                  <td className="py-2.5 text-center text-gray-600">€2/maand</td>
                  <td className="py-2.5 text-center text-blue-700 font-medium">Saxo €6 goedkoper/jaar</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€300/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€5/trade</td>
                  <td className="py-2.5 text-center text-gray-600">€2/maand</td>
                  <td className="py-2.5 text-center text-blue-700 font-medium">Saxo €36 goedkoper/jaar</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-gray-700">€1.000/maand</td>
                  <td className="py-2.5 text-center text-gray-600">€7,50/trade</td>
                  <td className="py-2.5 text-center text-gray-600">€2/maand</td>
                  <td className="py-2.5 text-center text-blue-700 font-medium">Saxo €66 goedkoper/jaar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Saxo AutoInvest: vaste €2/maand. Bolero Playlist: €2,50 (&lt;€250), €5 (€250–€1.000), €7,50 (&gt;€1.000). Bolero buiten Playlist: €7,50/trade.</p>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {[
              { q: 'Bolero of Saxo: wat is de beste keuze?', a: 'Beide zijn uitstekende brokers voor Belgische beleggers. Kies Saxo voor volledige automatisering (AutoInvest). Kies Bolero als je 100% Belgische bank prefereert, via itsme wil onboarden of absoluut geen securities lending wil.' },
              { q: 'Is Bolero of Saxo goedkoper?', a: 'Saxo is goedkoper via AutoInvest (€2/maand vast) voor bedragen boven €150/maand. Bij kleinere bedragen (<€250) zijn de kosten vergelijkbaar. Bolero Playlist-ETFs kosten €2,50 voor kleine orders.' },
              { q: 'Doet Saxo aan securities lending?', a: 'Saxo heeft een opt-in systeem voor securities lending dat standaard uitgeschakeld is. Bolero doet dit nooit. Controleer je instellingen bij Saxo om te bevestigen dat securities lending uitgeschakeld is.' },
            ].map(({ q, a }) => (
              <div key={q} className="card">
                <p className="font-semibold text-primary mb-2">{q}</p>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[bolero, saxo].map(broker => (
            broker.affiliateUrl && (
              <div key={broker.id} className="card flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{broker.name}</p>
                  <p className="text-sm text-gray-500">{broker.tagline}</p>
                </div>
                <a href={brokerLink(broker.affiliateUrl, 'bolero-vs-saxo')} target="_blank" rel="noopener noreferrer sponsored" className="btn-primary flex-shrink-0 text-sm py-2">Account →</a>
              </div>
            )
          ))}
        </div>
        <p className="text-xs text-gray-400 mb-8">Affiliate links — zie <Link href="/disclaimer" className="underline">disclaimer</Link>.</p>
      </div>
    </>
  )
}
