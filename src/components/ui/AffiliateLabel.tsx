import Link from 'next/link'
import type { Broker } from '@/data/brokers'

/** Zichtbare vermelding naast een knop met een actieve affiliate-link (FSMA: betaalde samenwerking altijd zichtbaar). */
export function AffiliateLabel({ broker }: { broker: Pick<Broker, 'affiliateActive'> }) {
  if (!broker.affiliateActive) return null
  return (
    <p className="text-[11px] leading-tight text-gray-500 mt-1">
      Affiliate-link · betaalde samenwerking.{' '}
      <Link href="/disclaimer#affiliate" className="underline hover:text-accent">
        Wat betekent dit?
      </Link>
    </p>
  )
}
