'use client'

import { useState, useEffect } from 'react'

export function ComplianceDisclosure() {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('disclosure-dismissed')
    if (!isDismissed) {
      setDismissed(false)
    }
  }, [])

  function dismiss() {
    sessionStorage.setItem('disclosure-dismissed', '1')
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-start justify-between gap-4">
        <p className="text-sm text-amber-800">
          <strong>Affiliate disclosure:</strong> BesteBroker.be ontvangt een vergoeding als je via onze links een
          brokeraccount opent of een boek koopt bij bol.com. Dit kost jou niets extra en beïnvloedt onze{' '}
          <a href="/methodologie" className="underline hover:no-underline">redactionele onafhankelijkheid</a> niet.
          Brokers die slechter scoren worden niet beter beschreven vanwege een affiliate programma.
        </p>
        <button
          onClick={dismiss}
          className="flex-shrink-0 text-amber-600 hover:text-amber-800 transition-colors"
          aria-label="Sluiten"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
