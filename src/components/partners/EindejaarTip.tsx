'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

/** Laatste dag waarop de tip zichtbaar is (Belgische tijd). Daarna verdwijnt hij vanzelf, ook zonder nieuwe deploy. */
const EINDE = new Date('2027-01-01T00:00:00+01:00').getTime()

/**
 * Seizoenstip (december 2026): wijst naar /belgie/belastingvrij-verkopen-voor-31-december.
 * Interne link, geen betaalde samenwerking in dit blok zelf.
 * Regel nagekeken 26/11/2026 (Bolero, Belfius; bronnen op de doelpagina).
 */
export function EindejaarTip() {
  const [zichtbaar, setZichtbaar] = useState(true)
  useEffect(() => {
    if (Date.now() >= EINDE) setZichtbaar(false)
  }, [])
  if (!zichtbaar) return null
  return (
    <aside
      className="not-prose my-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm"
      aria-label="Tip vóór 31 december"
    >
      <p className="font-semibold text-primary mb-1">Nog meerwaarde staan? Kijk vóór 31 december naar je vrijstelling</p>
      <p className="text-gray-700 leading-relaxed">
        In 2026 is de eerste <strong>€10.000</strong> meerwaarde per persoon vrijgesteld. Gebruik je die niet, dan
        vervalt ze grotendeels: enkel het ongebruikte deel van de eerste €1.000 schuift door naar volgend jaar.{' '}
        <Link href="/belgie/belastingvrij-verkopen-voor-31-december" className="text-accent underline font-medium">
          Zo verkoop je belastingvrij vóór 31 december
        </Link>{' '}
        (met rekenvoorbeelden voor alleenstaanden en koppels).
      </p>
      <p className="text-[11px] text-gray-500 mt-1">Bronnen: Bolero en Belfius, nagekeken 26/11/2026. Geen fiscaal advies.</p>
    </aside>
  )
}
