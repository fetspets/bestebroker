import Link from 'next/link'
import type { Broker } from '@/data/brokers'
import { brokerLink } from '@/lib/affiliateLinks'

interface Props {
  broker: Broker
  variant?: 'full' | 'compact' | 'comparison'
  rank?: number
  showAffiliate?: boolean
  source?: string
}

function typeBadgeClass(type: string) {
  if (type === 'belgisch') return 'bg-green-100 text-success'
  if (type === 'belgisch bijkantoor') return 'bg-teal-100 text-accent'
  return 'bg-orange-100 text-orange-700'
}

const TAX_LABELS = {
  tob: 'TOB',
  dividendTax: 'Roerende voorheffing',
  reynders: 'Reynders-taks',
  capitalGainsTax: 'Meerwaardebelasting',
}

function TaxBadge({ handled, label }: { handled: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
        handled ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'
      }`}
    >
      {handled ? '✓' : '✗'} {label}
    </span>
  )
}

function SubScores({ s }: { s: Broker['subScores'] }) {
  const items = [
    { label: 'Kosten', score: s.kosten },
    { label: 'Gebruiksgemak', score: s.gebruiksgemak },
    { label: 'Fiscaal', score: s.fiscaal },
    { label: 'Veiligheid', score: s.veiligheid },
  ]
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4 pt-1">
      {items.map(({ label, score }) => (
        <div key={label}>
          <div className="flex justify-between text-xs text-gray-500 mb-0.5">
            <span>{label}</span>
            <span className="font-medium text-primary">{score.toFixed(1)}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-1.5 bg-accent rounded-full" style={{ width: `${(score / 5) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} op 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {half && (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <clipPath id="half">
              <rect x="0" y="0" width="10" height="20" />
            </clipPath>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipPath="url(#half)" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-1 font-medium">{rating.toFixed(1)}</span>
    </div>
  )
}

export function BrokerCard({ broker, variant = 'full', rank, showAffiliate = true, source = 'broker-card' }: Props) {
  const monthlyCost500 = Math.max(
    broker.fees.transactionFeeMin,
    500 * broker.fees.transactionFeePercent + broker.fees.transactionFeeFixed
  )
  const tob500 = 500 * 0.0012

  if (variant === 'compact') {
    return (
      <div className="card flex items-start gap-4">
        {rank && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
            {rank}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-semibold text-primary">{broker.name}</h3>
              <p className="text-sm text-gray-600 mt-0.5">{broker.tagline}</p>
            </div>
            <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded ${typeBadgeClass(broker.type)}`}>
              {broker.type}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <StarRating rating={broker.rating} />
            {showAffiliate && broker.affiliateUrl && (
              <a
                href={brokerLink(broker.affiliateUrl, source)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-primary text-sm py-1.5"
              >
                Account openen →
              </a>
            )}
            <Link href={`/reviews/${broker.slug}`} className="text-sm text-accent hover:underline">
              Volledige review
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className="card hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          {rank && (
            <div className="flex-shrink-0 w-9 h-9 rounded-full text-white text-base font-bold flex items-center justify-center" style={{ backgroundColor: broker.color }}>
              {rank}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-bold text-xl text-primary">{broker.name}</h2>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${typeBadgeClass(broker.type)}`}>
                {broker.type}
              </span>
            </div>
            <p className="text-gray-600 text-sm mt-1">{broker.tagline}</p>
            <p className="text-xs text-gray-500 mt-1.5">
              <span className="font-semibold text-gray-600">Ideaal voor:</span>{' '}
              {broker.bestFor.join(' · ')}
            </p>
          </div>
        </div>
        <StarRating rating={broker.rating} />
      </div>

      <SubScores s={broker.subScores} />

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs font-semibold text-success uppercase tracking-wider mb-2">Voordelen</p>
          <ul className="space-y-1.5">
            {broker.pros.slice(0, 3).map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-success font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-danger uppercase tracking-wider mb-2">Nadelen</p>
          <ul className="space-y-1.5">
            {broker.cons.slice(0, 2).map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-danger font-bold flex-shrink-0 mt-0.5">✗</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Belastingen */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Belastingafhandeling</p>
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(broker.taxes) as [keyof typeof TAX_LABELS, boolean][]).map(([key, val]) => (
            <TaxBadge key={key} handled={val} label={TAX_LABELS[key]} />
          ))}
        </div>
        {broker.nbbRegistrationRequired && (
          <p className="text-xs text-orange-600 mt-1.5 flex items-center gap-1">
            <span>⚠</span> Jaarlijkse NBB-aangifte buitenlandse rekening vereist
          </p>
        )}
      </div>

      {/* Kosten scenario */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
        <p className="font-semibold text-gray-700 mb-2">Kostenscenario bij €500/maand</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-600">
          <span>Transactiekosten:</span>
          <span className="font-medium">€{monthlyCost500.toFixed(2)}/trade</span>
          <span>TOB (0,12% ETF acc.):</span>
          <span className="font-medium">{broker.taxes.tob ? `€${tob500.toFixed(2)} (automatisch)` : `€${tob500.toFixed(2)} (zelf)`}</span>
          {broker.fees.custodyFeePercent > 0 && (
            <>
              <span>Bewaarloon:</span>
              <span className="font-medium">{(broker.fees.custodyFeePercent * 100).toFixed(2)}%/jaar</span>
            </>
          )}
        </div>
      </div>

      {/* CTA */}
      {showAffiliate && (
        <div className="flex items-center gap-3 flex-wrap">
          {broker.affiliateUrl && (
            <a
              href={brokerLink(broker.affiliateUrl, source)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary flex-1 sm:flex-none justify-center"
            >
              Account openen →
            </a>
          )}
          <Link href={`/reviews/${broker.slug}`} className="btn-outline flex-1 sm:flex-none justify-center">
            Volledige review
          </Link>
        </div>
      )}
      {showAffiliate && (
        <p className="text-xs text-gray-400 mt-2">
          Affiliate: wij ontvangen een vergoeding als je via bovenstaande link een account opent. Zie{' '}
          <Link href="/disclaimer" className="underline">disclaimer</Link>.
        </p>
      )}
    </article>
  )
}
