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

  return null
}
