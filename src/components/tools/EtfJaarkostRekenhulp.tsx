'use client'

import { useState } from 'react'
import type { Broker } from '@/data/brokers'
import { maandelijkseEtfKost } from '@/components/broker/EtfKostenTabel'

const eur = (n: number) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

/** Leeg of ongeldig veld telt als 0, nooit als negatief. */
const getal = (s: string) => {
  const n = Number(s.replace(',', '.'))
  return Number.isFinite(n) && n > 0 ? n : 0
}

/**
 * Beurstaks (TOB) op ETF's, per transactie (Curvo, beurstaks ETF, 08/10/2026; KBC 08/10/2026):
 * EER, niet in BE geregistreerd 0,12% (max. €1.300) · buiten de EER 0,35% (max. €1.600) ·
 * in BE geregistreerd en kapitaliserend 1,32% (max. €4.000).
 */
export const TOB_ETF = {
  eer: { tarief: 0.0012, max: 1300, label: '0,12%: niet in België geregistreerd (EER)', voorbeeld: 'bv. IWDA of EMIM' },
  buitenEer: { tarief: 0.0035, max: 1600, label: '0,35%: van buiten de EER', voorbeeld: 'bv. een Amerikaanse ETF' },
  beKap: { tarief: 0.0132, max: 4000, label: '1,32%: in België geregistreerd, kapitaliserend', voorbeeld: 'bv. VWCE' },
} as const

export type TobSoort = keyof typeof TOB_ETF

export function tobPerAankoop(bedrag: number, soort: TobSoort): number {
  const t = TOB_ETF[soort]
  return Math.min(bedrag * t.tarief, t.max)
}

type DegiroSoort = 'kern' | 'ander'

/**
 * Rekent per broker de jaarkost van één ETF-aankoop per maand: makelaarsloon (goedkoopste manier volgens
 * src/data/brokers.ts: losse order, spaarplan of AutoInvest) plus beurstaks. Geen advies, geen tracking.
 */
export function EtfJaarkostRekenhulp({ brokers }: { brokers: Broker[] }) {
  const [maandbedrag, setMaandbedrag] = useState('300')
  const [tob, setTob] = useState<TobSoort>('eer')
  const [degiroSoort, setDegiroSoort] = useState<DegiroSoort>('kern')

  const bedrag = getal(maandbedrag)

  const rijen = brokers.map(b => {
    let perMaand = 0
    let hoe = '—'
    if (bedrag > 0) {
      if (b.id === 'degiro' && degiroSoort === 'ander') {
        perMaand = b.fees.etfStandard ?? 3
        hoe = 'losse order buiten de kernselectie'
      } else {
        const k = maandelijkseEtfKost(b, bedrag)
        perMaand = k.perMaand
        hoe = b.id === 'degiro' ? 'losse order, kernselectie via Tradegate' : k.hoe
      }
    }
    const makelaar = perMaand * 12
    const taks = bedrag > 0 ? tobPerAankoop(bedrag, tob) * 12 : 0
    return { broker: b, makelaar, perMaand, hoe, taks, totaal: makelaar + taks }
  })

  const taksJaar = rijen[0]?.taks ?? 0
  const duurste = Math.max(...rijen.map(r => r.makelaar))
  const goedkoopste = Math.min(...rijen.map(r => r.makelaar))
  const meerDanTaks = rijen.filter(r => r.makelaar < taksJaar).length

  const veld = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-800 focus:border-accent focus:outline-none bg-white'

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <label className="block text-sm font-medium text-gray-700">
          ETF-aankoop per maand (€)
          <input className={`${veld} mt-1`} type="number" inputMode="decimal" min="0" value={maandbedrag} onChange={e => setMaandbedrag(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Soort ETF (beurstaks)
          <select className={`${veld} mt-1`} value={tob} onChange={e => setTob(e.target.value as TobSoort)}>
            {(Object.keys(TOB_ETF) as TobSoort[]).map(k => (
              <option key={k} value={k}>{TOB_ETF[k].label}</option>
            ))}
          </select>
          <span className="block text-xs font-normal text-gray-500 mt-1">{TOB_ETF[tob].voorbeeld}</span>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Bij DEGIRO
          <select className={`${veld} mt-1`} value={degiroSoort} onChange={e => setDegiroSoort(e.target.value as DegiroSoort)}>
            <option value="kern">€1: kernselectie via Tradegate</option>
            <option value="ander">€3: andere ETF of andere beurs</option>
          </select>
        </label>
      </div>

      <ul className="space-y-2" aria-live="polite">
        {rijen.map(r => (
          <li key={r.broker.id} className="rounded-lg border border-gray-200 px-4 py-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div className="min-w-0">
              <p className="font-semibold text-primary">{r.broker.name}</p>
              <p className="text-xs text-gray-500">
                Broker {eur(r.makelaar)} ({r.hoe}: {eur(r.perMaand)} per maand) + beurstaks {eur(r.taks)}
              </p>
            </div>
            <p className="text-right tabular-nums">
              <span className="text-lg font-bold text-primary">{eur(r.totaal)}</span>
              <span className="block text-xs text-gray-500">per jaar</span>
            </p>
          </li>
        ))}
      </ul>

      {bedrag > 0 && (
        <p className="mt-4 text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3">
          Bij {eur(bedrag)} per maand betaal je aan de broker {eur(goedkoopste)} tot {eur(duurste)} per jaar. De beurstaks is bij
          elke broker gelijk: <strong>{eur(taksJaar)} per jaar</strong> voor deze soort ETF.
          {meerDanTaks > 0 && ` Dat is meer dan de makelaarskosten bij ${meerDanTaks} van de ${rijen.length} brokers.`}
        </p>
      )}
      <p className="mt-3 text-xs text-gray-500">
        Beurstaks bij aankoop; bij verkoop betaal je hem opnieuw. Niet meegeteld: DEGIRO rekent buiten je thuisbeurs €2,50
        aansluitingskosten per beurs per jaar. Geen van deze brokers rekent bewaarloon. Algemene informatie, geen advies.
      </p>
    </div>
  )
}
