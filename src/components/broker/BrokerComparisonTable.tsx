'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Broker } from '@/data/brokers'
import { brokerLink } from '@/lib/affiliateLinks'

interface Props {
  brokers: Broker[]
  highlightId?: string
}

type SortKey = 'name' | 'rating' | 'transactionFee' | 'custodyFee'
type FilterTax = 'all' | 'handles-all' | 'handles-none'
type FilterType = 'all' | 'belgisch' | 'buitenlands'

function typeBadgeClass(type: string) {
  if (type === 'belgisch') return 'bg-green-100 text-success'
  if (type === 'belgisch bijkantoor') return 'bg-teal-100 text-accent'
  return 'bg-orange-100 text-orange-700'
}

function formatVerified(iso: string): string {
  return new Date(iso).toLocaleDateString('nl-BE', { month: 'long', year: 'numeric' })
}

function CheckIcon({ value }: { value: boolean }) {
  return value ? (
    <span className="text-success font-bold text-base">✓</span>
  ) : (
    <span className="text-danger font-bold text-base">✗</span>
  )
}

export function BrokerComparisonTable({ brokers: allBrokers, highlightId }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('rating')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [filterTax, setFilterTax] = useState<FilterTax>('all')
  const [filterType, setFilterType] = useState<FilterType>('all')

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'name' ? 'asc' : 'desc')
    }
  }

  const filtered = useMemo(() => {
    let list = [...allBrokers]

    if (filterType !== 'all') {
      list = list.filter(b => b.type === filterType)
    }
    if (filterTax === 'handles-all') {
      list = list.filter(b => b.taxes.tob && b.taxes.capitalGainsTax)
    } else if (filterTax === 'handles-none') {
      list = list.filter(b => !b.taxes.tob && !b.taxes.capitalGainsTax)
    }

    list.sort((a, b) => {
      let diff = 0
      if (sortKey === 'name') diff = a.name.localeCompare(b.name)
      else if (sortKey === 'rating') diff = a.rating - b.rating
      else if (sortKey === 'transactionFee') diff = a.fees.transactionFeeMin - b.fees.transactionFeeMin
      else if (sortKey === 'custodyFee') diff = a.fees.custodyFeePercent - b.fees.custodyFeePercent
      return sortDir === 'asc' ? diff : -diff
    })

    return list
  }, [allBrokers, sortKey, sortDir, filterTax, filterType])

  function SortBtn({ col, label }: { col: SortKey; label: string }) {
    const active = sortKey === col
    return (
      <button
        className={`flex items-center gap-1 font-semibold text-sm whitespace-nowrap ${active ? 'text-accent' : 'text-gray-600 hover:text-primary'}`}
        onClick={() => handleSort(col)}
      >
        {label}
        <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={active && sortDir === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
        </svg>
      </button>
    )
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-2 text-sm">
          <label className="font-medium text-gray-700">Type:</label>
          {(['all', 'belgisch', 'buitenlands'] as FilterType[]).map(v => (
            <button
              key={v}
              onClick={() => setFilterType(v)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                filterType === v ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
              }`}
            >
              {v === 'all' ? 'Alle' : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label className="font-medium text-gray-700">Belastingen:</label>
          {(['all', 'handles-all', 'handles-none'] as FilterTax[]).map(v => (
            <button
              key={v}
              onClick={() => setFilterTax(v)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                filterTax === v ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
              }`}
            >
              {v === 'all' ? 'Alle' : v === 'handles-all' ? 'Automatisch' : 'Zelf regelen'}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 self-center">{filtered.length} broker{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3"><SortBtn col="name" label="Broker" /></th>
              <th className="text-center px-4 py-3"><SortBtn col="rating" label="Score" /></th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-center px-4 py-3"><SortBtn col="transactionFee" label="Transactiekost" /></th>
              <th className="text-center px-4 py-3">TOB</th>
              <th className="text-center px-4 py-3">
                <div className="relative group inline-flex items-center gap-1 cursor-default select-none">
                  <span>MWB</span>
                  <span className="text-gray-400 text-xs leading-none">ⓘ</span>
                  <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-800 text-white text-xs rounded-lg p-3 hidden group-hover:block z-20 text-left font-normal leading-relaxed shadow-xl">
                    Broker houdt 10% in bij verkoop, maar de €10.000 vrijstelling moet je zelf claimen via belastingaangifte.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                  </div>
                </div>
              </th>
              <th className="text-center px-4 py-3">Spaarplan</th>
              <th className="text-center px-4 py-3">NBB-aangifte</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
                Gecontroleerd op
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(broker => (
              <tr
                key={broker.id}
                className={`hover:bg-gray-50 transition-colors ${highlightId === broker.id ? 'bg-teal-50 border-l-4 border-l-accent' : ''}`}
              >
                <td className="px-4 py-3">
                  <div>
                    <Link href={`/reviews/${broker.slug}`} className="font-semibold text-primary hover:text-accent">
                      {broker.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5 max-w-[180px] truncate">{broker.tagline}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="font-bold text-accent">{broker.rating.toFixed(1)}</span>
                  <span className="text-gray-400 text-xs">/5</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${typeBadgeClass(broker.type)}`}>
                    {broker.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-center font-medium">
                  {broker.fees.transactionFeeMin === 0 ? (
                    <span className="text-success font-semibold">Gratis</span>
                  ) : (
                    `€${broker.fees.transactionFeeMin.toFixed(2)}`
                  )}
                </td>
                <td className="px-4 py-3 text-center"><CheckIcon value={broker.taxes.tob} /></td>
                <td className="px-4 py-3 text-center"><CheckIcon value={broker.taxes.capitalGainsTax} /></td>
                <td className="px-4 py-3 text-center"><CheckIcon value={broker.features.savingsPlan} /></td>
                <td className="px-4 py-3 text-center">
                  {broker.nbbRegistrationRequired ? (
                    <span className="text-orange-500 font-bold text-base">⚠</span>
                  ) : (
                    <span className="text-success font-bold text-base">✓</span>
                  )}
                </td>
                <td className="px-3 py-3 text-center text-xs text-gray-400 whitespace-nowrap">
                  {formatVerified(broker.lastVerified)}
                </td>
                <td className="px-4 py-3 text-right">
                  {broker.affiliateUrl && (
                    <a
                      href={brokerLink(broker.affiliateUrl, 'comparison-table')}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-xs bg-accent text-white px-3 py-1.5 rounded-lg hover:bg-opacity-90 font-medium whitespace-nowrap"
                    >
                      Open account →
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(broker => (
          <div
            key={broker.id}
            className={`card ${highlightId === broker.id ? 'border-accent border-2' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <Link href={`/reviews/${broker.slug}`} className="font-display font-semibold text-primary hover:text-accent">
                  {broker.name}
                </Link>
                <p className="text-xs text-gray-500 mt-0.5">{broker.tagline}</p>
              </div>
              <span className="text-accent font-bold">{broker.rating.toFixed(1)}/5</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
              <div>
                <span className="text-gray-500 text-xs">Type</span>
                <p className="font-medium">{broker.type}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Transactiekost</span>
                <p className="font-medium">{broker.fees.transactionFeeMin === 0 ? 'Gratis' : `€${broker.fees.transactionFeeMin.toFixed(2)}`}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">TOB afgehandeld</span>
                <p><CheckIcon value={broker.taxes.tob} /></p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Meerwaardebelasting</span>
                <p><CheckIcon value={broker.taxes.capitalGainsTax} /></p>
              </div>
            </div>
            {broker.affiliateUrl && (
              <a
                href={brokerLink(broker.affiliateUrl, 'comparison-table-mobile')}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block text-center bg-accent text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90"
              >
                Account openen →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
