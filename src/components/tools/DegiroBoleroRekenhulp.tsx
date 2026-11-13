'use client'

import { useState } from 'react'
import { transactiekost, type Broker } from '@/data/brokers'

const eur = (n: number) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

/** Leeg of ongeldig veld telt als 0, nooit als negatief. */
const getal = (s: string) => {
  const n = Number(s.replace(',', '.'))
  return Number.isFinite(n) && n > 0 ? n : 0
}

type DegiroSoort = 'kern' | 'ander'

interface Props {
  degiro: Broker
  bolero: Broker
}

/**
 * Rekent de eigen situatie van de lezer door met de tarieven uit src/data/brokers.ts.
 * Enkel makelaarsloon op ETF-aankopen en overdrachtkosten; geen beurstaks (gelijk bij beide). Geen advies, geen tracking.
 */
export function DegiroBoleroRekenhulp({ degiro, bolero }: Props) {
  const [maandbedrag, setMaandbedrag] = useState('300')
  const [etfs, setEtfs] = useState('1')
  const [soort, setSoort] = useState<DegiroSoort>('kern')
  const [eenmalig, setEenmalig] = useState('0')
  const [lijnen, setLijnen] = useState('2')

  const bedrag = getal(maandbedrag)
  const aantalEtfs = Math.max(1, Math.floor(getal(etfs)))
  const extra = getal(eenmalig)
  const aantalLijnen = Math.floor(getal(lijnen))

  // DEGIRO: €1 per order voor de kernselectie via Tradegate, anders etfStandard (€3). Bolero: staffel per order.
  const degiroPerOrder = soort === 'kern' ? degiro.fees.transactionFeeFixed : degiro.fees.etfStandard ?? 3
  const perOrder = bedrag / aantalEtfs
  const degiroJaar = bedrag === 0 ? 0 : 12 * aantalEtfs * degiroPerOrder
  const boleroJaar = bedrag === 0 ? 0 : 12 * aantalEtfs * transactiekost(bolero.fees, perOrder)
  const degiroExtra = extra === 0 ? 0 : degiroPerOrder
  const boleroExtra = extra === 0 ? 0 : transactiekost(bolero.fees, extra)

  const rijen = [
    { broker: degiro, jaar: degiroJaar, extra: degiroExtra, vertrek: aantalLijnen * (degiro.transferOutFee ?? 0) },
    { broker: bolero, jaar: boleroJaar, extra: boleroExtra, vertrek: aantalLijnen * (bolero.transferOutFee ?? 0) },
  ]
  const [d, b] = rijen
  const verschil = Math.abs(d.jaar - b.jaar)
  const goedkoopste = d.jaar < b.jaar ? degiro.name : bolero.name

  const veld = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-800 focus:border-accent focus:outline-none'

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <label className="block text-sm font-medium text-gray-700">
          ETF-aankoop per maand (€)
          <input className={`${veld} mt-1`} type="number" inputMode="decimal" min="0" value={maandbedrag} onChange={e => setMaandbedrag(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Verdeeld over hoeveel ETF’s?
          <input className={`${veld} mt-1`} type="number" inputMode="numeric" min="1" value={etfs} onChange={e => setEtfs(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Jouw ETF bij DEGIRO
          <select className={`${veld} mt-1 bg-white`} value={soort} onChange={e => setSoort(e.target.value as DegiroSoort)}>
            <option value="kern">In de kernselectie, via Tradegate (€1)</option>
            <option value="ander">Niet in de kernselectie (€3)</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Eenmalige extra aankoop (€, optioneel)
          <input className={`${veld} mt-1`} type="number" inputMode="decimal" min="0" value={eenmalig} onChange={e => setEenmalig(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
          Aantal verschillende effecten (lijnen) als je later overstapt
          <input className={`${veld} mt-1`} type="number" inputMode="numeric" min="0" value={lijnen} onChange={e => setLijnen(e.target.value)} />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <caption className="sr-only">Berekende kosten bij DEGIRO en Bolero voor de ingevulde bedragen</caption>
          <thead className="border-b border-gray-100">
            <tr>
              <th scope="col" className="text-left py-2 pr-3 text-gray-600 font-semibold">Jouw kosten</th>
              <th scope="col" className="text-right py-2 px-2 font-semibold text-orange-600">DEGIRO</th>
              <th scope="col" className="text-right py-2 pl-2 font-semibold text-red-600">Bolero</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr><th scope="row" className="py-2 pr-3 text-left font-semibold text-primary">Maandelijkse aankopen, per jaar</th><td className="py-2 px-2 text-right font-semibold text-primary">{eur(d.jaar)}</td><td className="py-2 pl-2 text-right font-semibold text-primary">{eur(b.jaar)}</td></tr>
            <tr><th scope="row" className="py-2 pr-3 text-left font-medium text-gray-700">Eenmalige extra aankoop</th><td className="py-2 px-2 text-right text-gray-600">{eur(d.extra)}</td><td className="py-2 pl-2 text-right text-gray-600">{eur(b.extra)}</td></tr>
            <tr><th scope="row" className="py-2 pr-3 text-left font-medium text-gray-700">Eenmalig: alles overzetten naar een andere bank</th><td className="py-2 px-2 text-right text-gray-600">{eur(d.vertrek)}</td><td className="py-2 pl-2 text-right text-gray-600">{eur(b.vertrek)}</td></tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-700" aria-live="polite">
        {verschil === 0
          ? 'Met deze cijfers is het makelaarsloon per jaar bij beide even hoog.'
          : `Met deze cijfers is ${goedkoopste} ${eur(verschil)} per jaar goedkoper aan makelaarsloon.`}{' '}
        Zonder beurstaks: die is bij beide gelijk. Bij DEGIRO komt daar je eigen aangifte bij (zie hieronder).
      </p>
    </div>
  )
}
