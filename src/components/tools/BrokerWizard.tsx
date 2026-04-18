'use client'

import { useState } from 'react'
import { brokers } from '@/data/brokers'
import { scoreBrokers, type WizardAnswers } from '@/lib/wizardScoring'
import { BrokerCard } from '@/components/broker/BrokerCard'

const EMPTY_ANSWERS: WizardAnswers = {
  tradeFrequency: null,
  assets: [],
  monthlyAmount: null,
  taxHandling: null,
}

export function BrokerWizard() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<WizardAnswers>(EMPTY_ANSWERS)
  const [results, setResults] = useState<ReturnType<typeof scoreBrokers> | null>(null)

  function handleComplete(finalAnswers: WizardAnswers) {
    const scored = scoreBrokers(finalAnswers, brokers)
    setResults(scored)
    setStep(5)
  }

  function restart() {
    setStep(1)
    setAnswers(EMPTY_ANSWERS)
    setResults(null)
  }

  const OptionButton = ({
    selected,
    onClick,
    children,
  }: {
    selected: boolean
    onClick: () => void
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all font-medium text-sm ${
        selected
          ? 'border-accent bg-teal-50 text-primary'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  )

  const StepIndicator = () => (
    <div className="flex items-center gap-2 mb-6">
      {[1, 2, 3, 4].map(s => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              s < step ? 'bg-success text-white' : s === step ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {s < step ? '✓' : s}
          </div>
          {s < 4 && <div className={`w-8 h-0.5 ${s < step ? 'bg-success' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  )

  return (
    <div className="max-w-lg mx-auto">
      {step < 5 && <StepIndicator />}

      {/* Step 1: Trade frequency */}
      {step === 1 && (
        <div>
          <h3 className="font-display font-bold text-xl text-primary mb-2">Hoe vaak wil je beleggen?</h3>
          <p className="text-gray-600 text-sm mb-4">Dit bepaalt hoeveel transactiekosten je betaalt per jaar.</p>
          <div className="space-y-2">
            {[
              { value: 'monthly', label: '🗓 Maandelijks — regelmatig een bedrag bijleggen' },
              { value: 'quarterly', label: '📅 Elk kwartaal — minder frequent, grotere bedragen' },
              { value: 'rarely', label: '🎯 Sporadisch — enkele keren per jaar' },
            ].map(({ value, label }) => (
              <OptionButton
                key={value}
                selected={answers.tradeFrequency === value}
                onClick={() => {
                  const newAnswers = { ...answers, tradeFrequency: value as WizardAnswers['tradeFrequency'] }
                  setAnswers(newAnswers)
                  setTimeout(() => setStep(2), 200)
                }}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Assets */}
      {step === 2 && (
        <div>
          <h3 className="font-display font-bold text-xl text-primary mb-2">Wat wil je beleggen?</h3>
          <p className="text-gray-600 text-sm mb-4">Selecteer wat van toepassing is.</p>
          <div className="space-y-2 mb-4">
            {[
              { value: 'etf', label: '📊 ETFs — breed gespreide indexfondsen' },
              { value: 'stocks', label: '📈 Individuele aandelen' },
              { value: 'both', label: '🔀 Een mix van beide' },
            ].map(({ value, label }) => (
              <OptionButton
                key={value}
                selected={answers.assets.includes(value as 'etf' | 'stocks' | 'both')}
                onClick={() => {
                  setAnswers(prev => {
                    const assets = prev.assets.includes(value as 'etf' | 'stocks' | 'both')
                      ? prev.assets.filter(a => a !== value)
                      : [...prev.assets, value as 'etf' | 'stocks' | 'both']
                    return { ...prev, assets }
                  })
                }}
              >
                {label}
              </OptionButton>
            ))}
          </div>
          <button
            className="btn-primary w-full justify-center"
            disabled={answers.assets.length === 0}
            onClick={() => setStep(3)}
          >
            Volgende →
          </button>
        </div>
      )}

      {/* Step 3: Monthly amount */}
      {step === 3 && (
        <div>
          <h3 className="font-display font-bold text-xl text-primary mb-2">Hoeveel wil je maandelijks beleggen?</h3>
          <p className="text-gray-600 text-sm mb-4">Dit bepaalt welke vaste kosten relatief zwaar wegen.</p>
          <div className="space-y-2">
            {[
              { value: 'small', label: '💶 Minder dan €100/maand' },
              { value: 'medium', label: '💰 €100 – €500/maand' },
              { value: 'large', label: '💎 Meer dan €500/maand' },
            ].map(({ value, label }) => (
              <OptionButton
                key={value}
                selected={answers.monthlyAmount === value}
                onClick={() => {
                  const newAnswers = { ...answers, monthlyAmount: value as WizardAnswers['monthlyAmount'] }
                  setAnswers(newAnswers)
                  setTimeout(() => setStep(4), 200)
                }}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Tax handling */}
      {step === 4 && (
        <div>
          <h3 className="font-display font-bold text-xl text-primary mb-2">Wil je dat belastingen automatisch worden afgehandeld?</h3>
          <p className="text-gray-600 text-sm mb-4">Belgische brokers regelen TOB, roerende voorheffing en meerwaardebelasting automatisch. Buitenlandse brokers doen dit niet.</p>
          <div className="space-y-2">
            {[
              { value: 'automatic', label: '✅ Ja — liever niet zelf administratie bijhouden' },
              { value: 'manual', label: '📋 Nee — ik regel het zelf, liever lagere kosten' },
              { value: 'dontmind', label: '🤷 Maakt me niet uit' },
            ].map(({ value, label }) => (
              <OptionButton
                key={value}
                selected={answers.taxHandling === value}
                onClick={() => {
                  const finalAnswers = { ...answers, taxHandling: value as WizardAnswers['taxHandling'] }
                  setAnswers(finalAnswers)
                  setTimeout(() => handleComplete(finalAnswers), 200)
                }}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {step === 5 && results && (
        <div>
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="font-display font-bold text-2xl text-primary">Jouw top 3 brokers</h3>
            <p className="text-gray-600 text-sm mt-1">Op basis van jouw antwoorden</p>
          </div>
          <div className="space-y-4">
            {results.map(({ broker, reasons }, index) => (
              <div key={broker.id}>
                <BrokerCard broker={broker} variant="compact" rank={index + 1} source="wizard" />
                {reasons.length > 0 && (
                  <div className="mt-1.5 ml-11 flex flex-wrap gap-1">
                    {reasons.map((r, i) => (
                      <span key={i} className="text-xs bg-teal-50 text-accent border border-teal-200 px-2 py-0.5 rounded-full">
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Dit is een indicatie, geen financieel advies. Lees onze{' '}
            <a href="/methodologie" className="underline">methodologie</a>{' '}
            voor meer info over hoe wij scoren.
          </p>
          <button onClick={restart} className="mt-4 w-full btn-outline justify-center">
            Opnieuw beginnen
          </button>
        </div>
      )}
    </div>
  )
}
