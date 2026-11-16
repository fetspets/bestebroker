import Link from 'next/link'
import { partners } from '@/data/partners'
import { goLink } from '@/lib/affiliateLinks'

const krosos = partners.find(p => p.id === 'krosos')

/**
 * Betaalde samenwerking met Krosos (rekent de meerwaardebelasting uit voor wie zelf aangifte doet).
 * Akkoord 16/11/2026; prijzen en korting zoals gemeld door Krosos op die datum.
 * `bron` = plaats van de knop (komt als utm_campaign in de rapporten van Krosos).
 */
export function KrososBlok({ bron }: { bron: string }) {
  if (!krosos || !krosos.affiliateActive) return null
  return (
    <aside
      className="not-prose my-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-5 text-sm"
      aria-label="Betaalde samenwerking: Krosos"
    >
      <p className="mb-2">
        <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-600">
          Betaalde samenwerking
        </span>
      </p>
      <p className="font-semibold text-primary text-base mb-1">Zelf aangifte doen? Laat je meerwaarde uitrekenen</p>
      <p className="text-gray-700 leading-relaxed mb-2">
        Belegde je via een broker die de meerwaardebelasting niet inhoudt (zoals DEGIRO), of verkocht je tussen
        1 januari en 31 mei 2026? Dan reken je de meerwaarde zelf uit voor je aangifte. <strong>Krosos</strong> heeft
        een gratis calculator die je zonder account gebruikt, en een betalende app die de berekening per verkoop
        voor je bijhoudt.
      </p>
      {krosos.kortingscode && (
        <p className="text-gray-700 leading-relaxed mb-3">
          De app kost €60 per jaar of €6 per maand (btw inbegrepen), met 14 dagen gratis proef. Met de code{' '}
          <strong className="font-mono">{krosos.kortingscode}</strong> krijg je de eerste 12 maanden 20% korting, op het
          maand- en het jaarabonnement. Prijs en voorwaarden volgens Krosos op 16/11/2026; de actuele stand staat op hun site.
        </p>
      )}
      <a
        href={goLink(krosos.id, bron)}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="btn-primary text-sm py-2 min-h-[44px] inline-flex items-center justify-center w-full sm:w-auto"
      >
        Naar de gratis calculator van Krosos →
      </a>
      <p className="text-[11px] leading-tight text-gray-500 mt-2">
        Affiliate-link · betaalde samenwerking: neem je via deze link een betalend abonnement, dan krijgt
        BesteBroker.be een deel van wat je het eerste jaar betaalt. Jij betaalt daardoor niets extra.{' '}
        <Link href="/disclaimer#affiliate" className="underline hover:text-accent">
          Wat betekent dit?
        </Link>{' '}
        Geen fiscaal advies: kijk de berekening na of vraag raad aan een boekhouder.
      </p>
    </aside>
  )
}
