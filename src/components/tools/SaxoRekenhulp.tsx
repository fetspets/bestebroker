'use client'

import { useState } from 'react'
import { aandelenKost, transactiekost, type Broker } from '@/data/brokers'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'

const eur = (n: number) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

/** Leeg of ongeldig veld telt als 0, nooit als negatief. */
const getal = (s: string) => {
  const n = Number(s.replace(',', '.'))
  return Number.isFinite(n) && n > 0 ? n : 0
}

type SaxoFormule = 'autoinvest' | 'order'

interface Props {
  saxo: Broker
  /** De broker waarmee Saxo vergeleken wordt. */
  ander: Broker
  /** Tailwind-kleurklasse voor de kolomkop van die broker. */
  anderKleur: string
  bron: string
}

/** Rekent de eigen situatie van de lezer door met de tarieven uit src/data/brokers.ts. Geen advies, geen tracking. */
export function SaxoRekenhulp({ saxo, ander, anderKleur, bron }: Props) {
  const [maandbedrag, setMaandbedrag] = useState('300')
  const [etfs, setEtfs] = useState('1')
  const [formule, setFormule] = useState<SaxoFormule>('autoinvest')
  const [aandelenOrders, setAandelenOrders] = useState('0')
  const [orderbedrag, setOrderbedrag] = useState('1000')
  const [lijnen, setLijnen] = useState('3')

  const etfBedrag = getal(maandbedrag)
  const aantalEtfs = Math.max(1, Math.floor(getal(etfs)))
  const orders = getal(aandelenOrders)
  const perOrder = getal(orderbedrag)
  const aantalLijnen = Math.floor(getal(lijnen))

  // Elke ETF is een aparte order, behalve bij AutoInvest (vaste prijs per maand voor alle aankopen samen).
  const ordersPerMaand = (broker: Broker) => aantalEtfs * transactiekost(broker.fees, etfBedrag / aantalEtfs)
  const saxoPerMaand =
    etfBedrag === 0 ? 0 : formule === 'autoinvest' ? saxo.fees.autoinvestMonthly ?? 0 : ordersPerMaand(saxo)
  const anderPerMaand = etfBedrag === 0 ? 0 : ordersPerMaand(ander)

  const rijen = [saxo, ander].map((broker, i) => {
    const etf = (i === 0 ? saxoPerMaand : anderPerMaand) * 12
    const aandelen = perOrder === 0 ? 0 : orders * aandelenKost(broker.fees, perOrder)
    return { broker, etf, aandelen, totaal: etf + aandelen, vertrek: aantalLijnen * (broker.transferOutFee ?? 0) }
  })
  const [s, a] = rijen
  const verschil = Math.abs(s.totaal - a.totaal)
  const goedkoopste = s.totaal < a.totaal ? saxo.name : ander.name

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
          Aandelenorders per jaar
          <input className={`${veld} mt-1`} type="number" inputMode="numeric" min="0" value={aandelenOrders} onChange={e => setAandelenOrders(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Bedrag per aandelenorder (€)
          <input className={`${veld} mt-1`} type="number" inputMode="decimal" min="0" value={orderbedrag} onChange={e => setOrderbedrag(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Aantal verschillende effecten (lijnen)
          <input className={`${veld} mt-1`} type="number" inputMode="numeric" min="0" value={lijnen} onChange={e => setLijnen(e.target.value)} />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <caption className="sr-only">Berekende kosten bij Saxo en {ander.name} voor de ingevulde bedragen</caption>
          <thead className="border-b border-gray-100">
            <tr>
              <th scope="col" className="text-left py-2 pr-3 text-gray-600 font-semibold">Jouw kosten</th>
              <th scope="col" className="text-right py-2 px-2 font-semibold text-blue-700">Saxo</th>
              <th scope="col" className={`text-right py-2 pl-2 font-semibold ${anderKleur}`}>{ander.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr><th scope="row" className="py-2 pr-3 text-left font-medium text-gray-700">ETF’s per jaar</th><td className="py-2 px-2 text-right text-gray-600">{eur(s.etf)}</td><td className="py-2 pl-2 text-right text-gray-600">{eur(a.etf)}</td></tr>
            <tr><th scope="row" className="py-2 pr-3 text-left font-medium text-gray-700">Aandelen per jaar</th><td className="py-2 px-2 text-right text-gray-600">{eur(s.aandelen)}</td><td className="py-2 pl-2 text-right text-gray-600">{eur(a.aandelen)}</td></tr>
            <tr><th scope="row" className="py-2 pr-3 text-left font-semibold text-primary">Totaal per jaar</th><td className="py-2 px-2 text-right font-semibold text-primary">{eur(s.totaal)}</td><td className="py-2 pl-2 text-right font-semibold text-primary">{eur(a.totaal)}</td></tr>
            <tr><th scope="row" className="py-2 pr-3 text-left font-medium text-gray-700">Eenmalig: alles overzetten naar een andere bank</th><td className="py-2 px-2 text-right text-gray-600">{eur(s.vertrek)}</td><td className="py-2 pl-2 text-right text-gray-600">{eur(a.vertrek)}</td></tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-700" aria-live="polite">
        {verschil === 0
          ? 'Met deze cijfers is het makelaarsloon per jaar bij beide even hoog.'
          : `Met deze cijfers is ${goedkoopste} ${eur(verschil)} per jaar goedkoper aan makelaarsloon.`}{' '}
        Zonder beurstaks: die is bij beide gelijk.
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[saxo, ander].map(broker => (
          broker.affiliateUrl && (
            <div key={broker.id}>
              <a href={goLink(broker.id, bron)} target="_blank" rel="sponsored nofollow noopener" className="btn-outline w-full justify-center text-center py-3">
                Naar {broker.name} →
              </a>
              <AffiliateLabel broker={broker} />
            </div>
          )
        ))}
      </div>
    </div>
  )
}
