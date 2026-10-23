import Link from 'next/link'
import type { Broker } from '@/data/brokers'
import { transactiekost } from '@/data/brokers'

const eur = (n: number) =>
  new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 }).format(n)

/** Goedkoopste manier om één keer per maand `bedrag` euro in een ETF te beleggen, volgens brokers.ts. */
export function maandelijkseEtfKost(b: Broker, bedrag: number): { perMaand: number; hoe: string } {
  const order = transactiekost(b.fees, bedrag)
  const opties: { perMaand: number; hoe: string }[] = [{ perMaand: order, hoe: 'losse order' }]
  if (b.features.savingsPlan && b.fees.spaarplanPerUitvoering !== undefined) {
    opties.push({ perMaand: b.fees.spaarplanPerUitvoering, hoe: 'spaarplan' })
  }
  if (b.features.autoInvest && b.fees.autoinvestMonthly !== undefined) {
    opties.push({ perMaand: b.fees.autoinvestMonthly, hoe: 'AutoInvest' })
  }
  return opties.reduce((min, o) => (o.perMaand <= min.perMaand ? o : min))
}

interface Props {
  brokers: Broker[]
  /** Maandbedragen, bv. [100, 500] */
  maandbedragen: number[]
  /** Eenmalige aankoop, bv. 5000 */
  eenmalig?: number
  id?: string
}

/**
 * Wat kost beleggen in een ETF per jaar aan transactiekosten, per broker. Alles wordt berekend uit
 * src/data/brokers.ts (staffels, minimum, spaarplan), dus nooit met de hand ingevuld.
 */
export function EtfKostenTabel({ brokers, maandbedragen, eenmalig, id }: Props) {
  return (
    <div className="overflow-x-auto" id={id}>
      <table className="w-full text-sm min-w-[520px]">
        <caption className="sr-only">Transactiekosten per jaar voor een ETF-aankoop per maand, per broker</caption>
        <thead className="text-left border-b border-gray-200">
          <tr>
            <th scope="col" className="py-3 pr-3 font-semibold text-gray-700">Broker</th>
            {maandbedragen.map(m => (
              <th key={m} scope="col" className="py-3 px-2 font-semibold text-gray-700 text-right">
                {eur(m)} per maand
                <span className="block text-xs font-normal text-gray-500">kost per jaar</span>
              </th>
            ))}
            {eenmalig && (
              <th scope="col" className="py-3 pl-2 font-semibold text-gray-700 text-right">
                Eenmalig {eur(eenmalig)}
                <span className="block text-xs font-normal text-gray-500">kost per order</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {brokers.map(b => (
            <tr key={b.id}>
              <th scope="row" className="py-2.5 pr-3 text-left font-medium text-primary">
                <Link href={`/reviews/${b.slug}`} className="hover:text-accent hover:underline">{b.name}</Link>
                {b.id === 'degiro' && <span className="block text-xs font-normal text-gray-500">ETF uit de kernselectie (andere ETF: €3 per order)</span>}
              </th>
              {maandbedragen.map(m => {
                const k = maandelijkseEtfKost(b, m)
                return (
                  <td key={m} className="py-2.5 px-2 text-right tabular-nums">
                    <span className="font-semibold text-primary">{eur(k.perMaand * 12)}</span>
                    <span className="block text-xs text-gray-500">{k.hoe}: {eur(k.perMaand)}</span>
                  </td>
                )
              })}
              {eenmalig && (
                <td className="py-2.5 pl-2 text-right tabular-nums font-semibold text-primary">{eur(transactiekost(b.fees, eenmalig))}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
