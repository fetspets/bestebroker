'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'

/**
 * Cookietoestemming (AVG / ePrivacy).
 * - Google Analytics en het Impact-script laden PAS na "Accepteren".
 * - Keuze wordt 6 maanden bewaard in localStorage (geen cookie).
 * - Via de knop "Cookie-instellingen" in de voet kan de bezoeker zijn keuze altijd wijzigen.
 */

const STORAGE_KEY = 'bb-cookie-consent'
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182
export const OPEN_EVENT = 'bb-open-cookie-settings'

type Choice = 'accepted' | 'rejected'

function readChoice(): Choice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const { choice, at } = JSON.parse(raw) as { choice: Choice; at: number }
    if (Date.now() - at > MAX_AGE_MS) return null
    return choice === 'accepted' || choice === 'rejected' ? choice : null
  } catch {
    return null
  }
}

function saveChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, at: Date.now() }))
  } catch {
    // Opslaan mislukt (bv. privévenster): keuze geldt dan enkel voor dit bezoek.
  }
}

export function ConsentManager({ gaId, impactSrc }: { gaId: string; impactSrc: string }) {
  const [choice, setChoice] = useState<Choice | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const stored = readChoice()
    setChoice(stored)
    setOpen(stored === null)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [])

  function decide(next: Choice) {
    saveChoice(next)
    setOpen(false)
    if (choice === 'accepted' && next === 'rejected') {
      // Reeds geladen scripts kunnen niet "ontladen" worden: herladen zodat ze weg zijn.
      window.location.reload()
      return
    }
    setChoice(next)
  }

  return (
    <>
      {choice === 'accepted' && (
        <>
          <GoogleAnalytics gaId={gaId} />
          <Script id="impact-utt" strategy="afterInteractive">{`(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('${impactSrc}','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`}</Script>
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-titel"
          className="fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-4"
        >
          <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-2xl text-gray-800">
            <h2 id="cookie-titel" className="font-semibold text-base">Cookies op BesteBroker.be</h2>
            <p className="mt-1 text-sm leading-relaxed">
              Mogen we analytische cookies (Google Analytics) en de meetcookies van ons affiliatenetwerk (Impact)
              gebruiken? Zo zien we welke pagina&apos;s nuttig zijn. Weigeren heeft geen gevolgen: de site werkt
              volledig. Meer uitleg in ons{' '}
              <Link href="/cookiebeleid" className="text-accent underline">cookiebeleid</Link>.
            </p>
            <div className="mt-3 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => decide('rejected')}
                className="min-h-[44px] rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50"
              >
                Weigeren
              </button>
              <button
                type="button"
                onClick={() => decide('accepted')}
                className="min-h-[44px] rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50"
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
    >
      Cookie-instellingen
    </button>
  )
}
