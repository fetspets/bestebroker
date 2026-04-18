import type { Broker } from '@/data/brokers'

export interface WizardAnswers {
  tradeFrequency: 'monthly' | 'quarterly' | 'rarely' | null
  assets: ('etf' | 'stocks' | 'both')[]
  monthlyAmount: 'small' | 'medium' | 'large' | null  // <100, 100-500, >500
  taxHandling: 'automatic' | 'manual' | 'dontmind' | null
}

interface ScoredBroker {
  broker: Broker
  score: number
  reasons: string[]
}

export function scoreBrokers(answers: WizardAnswers, brokers: Broker[]): ScoredBroker[] {
  return brokers
    .map(broker => {
      let score = 50
      const reasons: string[] = []

      // Tax handling preference
      if (answers.taxHandling === 'automatic') {
        if (broker.taxes.tob && broker.taxes.capitalGainsTax) {
          score += 30
          reasons.push('Regelt alle Belgische belastingen automatisch')
        } else {
          score -= 30
        }
      } else if (answers.taxHandling === 'manual') {
        if (!broker.taxes.tob) {
          score += 10
          reasons.push('Lagere kosten als je belastingen zelf regelt')
        }
      }

      // Trade frequency
      if (answers.tradeFrequency === 'monthly') {
        if (broker.fees.transactionFeeMin <= 2) {
          score += 20
          reasons.push('Lage kosten bij maandelijkse aankopen')
        } else if (broker.fees.transactionFeeMin >= 10) {
          score -= 20
        }
        if (broker.features.autoInvest) {
          score += 10
          reasons.push('Ondersteunt automatisch maandelijks beleggen')
        }
      }

      // Asset preference
      if (answers.assets.includes('etf')) {
        if (broker.fees.etfStandard === 0) {
          score += 15
          reasons.push('Gratis ETF-transacties')
        }
      }

      // Monthly amount
      if (answers.monthlyAmount === 'small') {
        // Small amounts: fixed fees hurt most
        if (broker.fees.transactionFeeMin <= 1) {
          score += 15
          reasons.push('Lage vaste kosten — ideaal voor kleine bedragen')
        } else if (broker.fees.transactionFeeMin >= 7) {
          score -= 15
        }
      } else if (answers.monthlyAmount === 'large') {
        // Large amounts: percentage fees matter more
        if (broker.fees.transactionFeePercent === 0 && broker.fees.transactionFeeFixed >= 7) {
          score += 5 // flat fee is good for large amounts
        }
      }

      // Belgian broker preference (implicit safety bonus)
      if (broker.type === 'belgisch') {
        score += 5
        if (broker.security.depositProtection >= 100000) {
          reasons.push('€100.000 Belgische bescherming')
        }
      }

      // Securities lending penalty for cautious investors
      if (broker.security.securitiesLending === 'required') {
        score -= 10
      }

      return { broker, score: Math.max(0, Math.min(100, score)), reasons }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}
