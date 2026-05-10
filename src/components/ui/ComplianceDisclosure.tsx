'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
    <div className="bg-amber-50 border-b border-amber-200 py-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Affiliate openbaarmaking:</strong> Sommige links op deze site zijn affiliate-links.
          Als je via zo&apos;n link een account opent, ontvangen wij mogelijk een vergoeding — zonder meerprijs voor jou.
          Dit heeft geen invloed op onze beoordeling.{' '}
          <Link href="/disclaimer" className="underline hover:text-amber-900">Meer info</Link>
        </p>
        <button
          onClick={dismiss}
          aria-label="Sluit affiliate-melding"
          className="text-amber-700 hover:text-amber-900 text-xl flex-shrink-0 font-bold leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}
