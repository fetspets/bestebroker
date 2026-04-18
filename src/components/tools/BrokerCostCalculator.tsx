'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { Broker } from '@/data/brokers'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface Props {
  brokers: Broker[]
}

interface CalculatorState {
  initialInvestment: number
  monthlyContribution: number
  years: number
  tradeSize: number
  tradesPerMonth: number
  returnRate: number
  selectedBrokerIds: string[]
}

function calculatePortfolio(broker: Broker, state: CalculatorState): number[] {
  const {
    initialInvestment,
    monthlyContribution,
    years,
    tradeSize,
    tradesPerMonth,
    returnRate,
  } = state

  const annualReturn = returnRate / 100
  const feePerTrade = Math.max(
    broker.fees.transactionFeeMin,
    tradeSize * broker.fees.transactionFeePercent + broker.fees.transactionFeeFixed
  )
  const maxFee = broker.fees.transactionFeeMax
  const cappedFeePerTrade = maxFee !== null ? Math.min(feePerTrade, maxFee) : feePerTrade
  const annualTransactionCost = tradesPerMonth * 12 * cappedFeePerTrade
  const annualContrib = monthlyContribution * 12

  const values: number[] = [initialInvestment]
  let portfolio = initialInvestment

  for (let t = 1; t <= years; t++) {
    portfolio = portfolio * (1 + annualReturn) + annualContrib - annualTransactionCost

    // Custody fee based on post-growth value
    const custodyFee = Math.min(
      portfolio * broker.fees.custodyFeePercent + broker.fees.custodyFeeFixed,
      broker.fees.custodyFeeMax ?? Infinity
    )
    portfolio -= custodyFee
    portfolio = Math.max(0, portfolio)
    values.push(portfolio)
  }

  return values
}

function calculateBaseline(state: CalculatorState): number[] {
  const { initialInvestment, monthlyContribution, years, returnRate } = state
  const annualReturn = returnRate / 100
  const annualContrib = monthlyContribution * 12
  const values: number[] = [initialInvestment]
  let portfolio = initialInvestment

  for (let t = 1; t <= years; t++) {
    portfolio = portfolio * (1 + annualReturn) + annualContrib
    values.push(portfolio)
  }
  return values
}

function formatEur(value: number): string {
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `€${(value / 1_000).toFixed(1)}K`
  return `€${value.toFixed(0)}`
}

const BROKER_COLORS: Record<string, string> = {
  saxo: '#003057',
  bolero: '#e30613',
  medirect: '#00a651',
  degiro: '#ff6600',
  'trade-republic': '#c83e4d',
  keytrade: '#0058a3',
}

export function BrokerCostCalculator({ brokers }: Props) {
  const [state, setState] = useState<CalculatorState>({
    initialInvestment: 5000,
    monthlyContribution: 300,
    years: 20,
    tradeSize: 300,
    tradesPerMonth: 1,
    returnRate: 7,
    selectedBrokerIds: ['saxo', 'bolero', 'degiro'],
  })

  const update = useCallback((key: keyof CalculatorState, value: number | string[]) => {
    setState(prev => ({ ...prev, [key]: value }))
  }, [])

  function toggleBroker(id: string) {
    setState(prev => {
      const sel = prev.selectedBrokerIds
      if (sel.includes(id)) {
        return { ...prev, selectedBrokerIds: sel.filter(x => x !== id) }
      }
      if (sel.length >= 4) return prev
      return { ...prev, selectedBrokerIds: [...sel, id] }
    })
  }

  const chartData = useMemo(() => {
    const labels = Array.from({ length: state.years + 1 }, (_, i) => `Jaar ${i}`)
    const baseline = calculateBaseline(state)

    const datasets = [
      {
        label: 'Geen kosten (referentie)',
        data: baseline,
        borderColor: '#9ca3af',
        backgroundColor: 'transparent',
        borderDash: [6, 3],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      ...state.selectedBrokerIds.map(id => {
        const broker = brokers.find(b => b.id === id)
        if (!broker) return null
        const values = calculatePortfolio(broker, state)
        const color = BROKER_COLORS[id] ?? broker.color ?? '#6b7280'
        return {
          label: broker.name,
          data: values,
          borderColor: color,
          backgroundColor: color + '18',
          fill: false,
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 5,
        }
      }).filter((d): d is NonNullable<typeof d> => d !== null),
    ]

    return { labels, datasets }
  }, [state, brokers])

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { usePointStyle: true, pointStyleWidth: 12, font: { size: 12 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; raw: unknown }) =>
            ` ${ctx.dataset.label}: ${formatEur(ctx.raw as number)}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        ticks: {
          callback: (val: number | string) => formatEur(val as number),
        },
        grid: { color: '#f3f4f6' },
      },
    },
  }), [])

  // Final values for summary table
  const finalValues = useMemo(() => {
    return state.selectedBrokerIds.map(id => {
      const broker = brokers.find(b => b.id === id)
      if (!broker) return null
      const values = calculatePortfolio(broker, state)
      const finalValue = values[values.length - 1]
      const baseline = calculateBaseline(state)
      const baselineFinal = baseline[baseline.length - 1]
      const totalCostImpact = baselineFinal - finalValue
      const totalInvested = state.initialInvestment + state.monthlyContribution * 12 * state.years
      const totalGain = finalValue - totalInvested
      const taxableGain = Math.max(0, totalGain - 10000)
      const mwbTax = broker.taxes.capitalGainsTax ? taxableGain * 0.10 : taxableGain * 0.10
      return {
        broker,
        finalValue,
        finalAfterTax: finalValue - mwbTax,
        totalCostImpact,
        mwbTax,
      }
    }).filter((r): r is NonNullable<typeof r> => r !== null)
  }, [state, brokers])

  const SliderField = ({
    label,
    stateKey,
    min,
    max,
    step,
    format,
  }: {
    label: string
    stateKey: keyof CalculatorState
    min: number
    max: number
    step: number
    format: (v: number) => string
  }) => {
    const value = state[stateKey] as number
    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <span className="text-sm font-bold text-accent">{format(value)}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => update(stateKey, Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-0.5">
          <span>{format(min)}</span>
          <span>{format(max)}</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-5">
          <div className="card">
            <h3 className="font-display font-semibold text-primary mb-4">Instellingen</h3>
            <div className="space-y-5">
              <SliderField
                label="Startbedrag"
                stateKey="initialInvestment"
                min={0}
                max={50000}
                step={500}
                format={v => `€${v.toLocaleString('nl-BE')}`}
              />
              <SliderField
                label="Maandelijkse storting"
                stateKey="monthlyContribution"
                min={50}
                max={2000}
                step={50}
                format={v => `€${v}`}
              />
              <SliderField
                label="Beleggingshorizon"
                stateKey="years"
                min={5}
                max={40}
                step={1}
                format={v => `${v} jaar`}
              />
              <SliderField
                label="Bedrag per transactie"
                stateKey="tradeSize"
                min={50}
                max={2000}
                step={50}
                format={v => `€${v}`}
              />
              <SliderField
                label="Rendement per jaar"
                stateKey="returnRate"
                min={3}
                max={12}
                step={0.5}
                format={v => `${v}%`}
              />
            </div>
          </div>

          <div className="card">
            <h3 className="font-display font-semibold text-primary mb-3">Brokers vergelijken (max 4)</h3>
            <div className="space-y-2">
              {brokers.map(broker => (
                <label key={broker.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.selectedBrokerIds.includes(broker.id)}
                    onChange={() => toggleBroker(broker.id)}
                    disabled={!state.selectedBrokerIds.includes(broker.id) && state.selectedBrokerIds.length >= 4}
                    className="w-4 h-4 text-accent rounded border-gray-300 focus:ring-accent"
                  />
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: BROKER_COLORS[broker.id] ?? broker.color }}
                  />
                  <span className="text-sm font-medium">{broker.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="font-display font-semibold text-primary mb-1">Portefeuillewaarde na {state.years} jaar</h3>
            <p className="text-sm text-gray-500 mb-4">Inclusief transactiekosten en bewaarloon, vóór meerwaardebelasting</p>
            <div style={{ height: 340 }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Summary table */}
          {finalValues.length > 0 && (
            <div className="card mt-4">
              <h3 className="font-display font-semibold text-primary mb-3">Samenvatting na {state.years} jaar</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wide">
                      <th className="text-left py-2">Broker</th>
                      <th className="text-right py-2">Eindwaarde</th>
                      <th className="text-right py-2">Na MWB (10%)*</th>
                      <th className="text-right py-2">Impact kosten</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {finalValues.map(({ broker, finalValue, finalAfterTax, totalCostImpact }) => (
                      <tr key={broker.id}>
                        <td className="py-2 font-medium">{broker.name}</td>
                        <td className="py-2 text-right font-semibold text-accent">{formatEur(finalValue)}</td>
                        <td className="py-2 text-right text-gray-700">{formatEur(finalAfterTax)}</td>
                        <td className="py-2 text-right text-danger">-{formatEur(totalCostImpact)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                * Meerwaardebelasting (10% op winst boven €10.000 vrijstelling) is een vereenvoudigde projectie.
                De wetgeving is in finalisatiefase — raadpleeg een fiscalist voor persoonlijk advies.
                Rendement: {state.returnRate}% per jaar (historisch gemiddelde — geen garantie).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
