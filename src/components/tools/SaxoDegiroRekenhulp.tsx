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

type SaxoFormule = 'autoinvest' | 'order'
type DegiroSoort = 'kern' | 'ander'

interface Props {
  saxo: Broker
  degiro: Broker
}

/**
 * Rekent de eigen situatie van de lezer door met de tarieven uit src/data/brokers.ts.
 * Enkel makelaarsloon op ETF-aankopen en overdrachtkosten; geen beurstaks (gelijk bij beide). Geen advies, geen tracking.
 */
export function SaxoDegiroRekenhulp({ saxo, degiro }: Props) {
  const [maandbedrag, setMaandbedrag] = useState('300')
  const [etfs, setEtfs] = useState('1')
  const [formule, setFormule] = useState<SaxoFormule>('autoinvest')
  const [soort, setSoort] = useState<DegiroSoort>('kern')
  const [eenmalig, setEenmalig] = useState('0')
  const [lijnen, setLijnen] = useState('2')

  const bedrag = getal(maandbedrag)
  const aantalEtfs = Math.max(1, Math.floor(getal(etfs)))
  const extra = getal(eenmalig)
  const aantalLijnen = Math.floor(getal(lijnen))
  const perOrder = bedrag / aantalEtfs

  // Saxo: AutoInvest = vaste prijs per maand voor alle aankopen samen; losse orders 0,08% met minimum €2 per order.
  const saxoPerMaand =
    bedrag === 0 ? 0 : formule === 'autoinvest' ? saxo.fees.autoinvestMonthly ?? 0 : aantalEtfs * transactiekost(saxo.fees, perOrder)
  // DEGIRO: €1 per order voor de kernselectie via Tradegate, anders etfStandard (€3).
  const degiroPerOrder = soort === 'kern' ? degiro.fees.transactionFeeFixed : degiro.fees.etfStandard ?? 3

  const rijen = [
    { broker: saxo, jaar: 12 * saxoPerMaand, extra: extra === 0 ? 0 : transactiekost(saxo.fees, extra), vertrek: aantalLijnen * (saxo.transferOutFee ?? 0) },
    { broker: degiro, jaar: bedrag === 0 ? 0 : 12 * aantalEtfs * degiroPerOrder, extra: extra === 0 ? 0 : degiroPerOrder, vertrek: aantalLijnen * (degiro.transferOutFee ?? 0) },
  ]
  const [s, d] = rijen
  const verschil = Math.abs(s.jaar - d.jaar)
  const goedkoopste = s.jaar < d.jaar ? saxo.name : degiro.name

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
          Zo koop je bij Saxo
          <select className={`${veld} mt-1 bg-white`} value={formule} onChange={e => setFormule(e.target.value as SaxoFormule)}>
            <option value="autoinvest">AutoInvest (€2 per maand)</option>
            <option value="order">Losse order (0,08%, min. €2)</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Jouw ETF bij DEGIRO
          <select className={`${veld} mt-1 bg-white`} value={soort} onChange={e => setSoort(e.target.value as DegiroSoort)}>
            <option value="kern">Kernselectie via Tradegate (€1)</option>
            <option value="ander">Buiten de kernselectie (€3)</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Eenmalige extra aankoop (€, optioneel)
          <input className={`${veld} mt-1`} type="number" inputMode="decimal" min="0" value={eenmalig} onChange={e => setEenmalig(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Aantal effecten (lijnen) als je later overstapt
          <input className={`${veld} mt-1`} type="number" inputMode="numeric" min="0" value={lijnen} onChange={e => setLijnen(e.target.value)} />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <caption className="sr-only">Berekende kosten bij Saxo en DEGIRO voor de ingevulde bedragen</caption>
          <thead className="border-b border-gray-100">
            <tr>
              <th scope="col" className="text-left py-2 pr-3 text-gray-600 font-semibold">Jouw kosten</th>
              <th scope="col" className="text-right py-2 px-2 font-semibold text-blue-700">Saxo</th>
              <th scope="col" className="text-right py-2 pl-2 font-semibold text-orange-600">DEGIRO</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr><th scope="row" className="py-2 pr-3 text-left font-semibold text-primary">Maandelijkse aankopen, per jaar</th><td className="py-2 px-2 text-right font-semibold text-primary">{eur(s.jaar)}</td><td className="py-2 pl-2 text-right font-semibold text-primary">{eur(d.jaar)}</td></tr>
            <tr><th scope="row" className="py-2 pr-3 text-left font-medium text-gray-700">Eenmalige extra aankoop</th><td className="py-2 px-2 text-right text-gray-600">{eur(s.extra)}</td><td className="py-2 pl-2 text-right text-gray-600">{eur(d.extra)}</td></tr>
            <tr><th scope="row" className="py-2 pr-3 text-left font-medium text-gray-700">Eenmalig: alles overzetten naar een andere bank</th><td className="py-2 px-2 text-right text-gray-600">{eur(s.vertrek)}</td><td className="py-2 pl-2 text-right text-gray-600">{eur(d.vertrek)}</td></tr>
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
