import type { Broker } from '@/data/brokers'

const criteria = [
  { key: 'fiscaleAfhandeling', label: 'Fiscale afhandeling', weight: 30 },
  { key: 'transactiekosten',   label: 'Transactiekosten',   weight: 25 },
  { key: 'bewaarloon',         label: 'Bewaarloon & vaste kosten', weight: 15 },
  { key: 'veiligheid',         label: 'Veiligheid & bescherming',  weight: 15 },
  { key: 'functionaliteit',    label: 'Functionaliteit',    weight: 10 },
  { key: 'transparantie',      label: 'Transparantie & service',   weight:  5 },
] as const

function scoreColor(score: number): string {
  if (score >= 4.5) return 'bg-green-500'
  if (score >= 3.5) return 'bg-accent'
  if (score >= 2.5) return 'bg-yellow-400'
  return 'bg-red-400'
}

function scoreLabel(score: number): string {
  if (score >= 4.5) return 'Uitstekend'
  if (score >= 3.5) return 'Goed'
  if (score >= 2.5) return 'Matig'
  return 'Zwak'
}

interface Props {
  broker: Broker
}

export function ScoreBreakdown({ broker }: Props) {
  const scores = broker.methodologyScores

  return (
    <div className="card mb-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl font-bold text-primary">Scoreuitsplitsing</h2>
        <div className="text-right">
          <span className="font-display text-3xl font-bold text-primary">{broker.rating.toFixed(1)}</span>
          <span className="text-gray-400 text-sm">/5</span>
          <p className="text-xs text-gray-400 mt-0.5">Totaalscore</p>
        </div>
      </div>

      <div className="space-y-3">
        {criteria.map(({ key, label, weight }) => {
          const score = scores[key]
          const pct = (score / 5) * 100
          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">{weight}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{scoreLabel(score)}</span>
                  <span className="text-sm font-semibold text-primary w-8 text-right">{score.toFixed(1)}</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${scoreColor(score)}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Gewogen score op basis van de{' '}
        <a href="/methodologie" className="underline hover:text-gray-600">BesteBroker.be methodologie</a>.
        Alle criteria jaarlijks geverifieerd.
      </p>
    </div>
  )
}
