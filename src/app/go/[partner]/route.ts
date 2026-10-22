import { NextRequest, NextResponse } from 'next/server'
import { brokers } from '@/data/brokers'
import { brokerLink } from '@/lib/affiliateLinks'

/**
 * Uitgaande klik naar een broker: /go/<broker-id>?bron=<plaats-van-de-knop>
 *
 * - Stuurt door (302) naar de affiliateUrl uit src/data/brokers.ts (één bron van waarheid).
 * - Telt de klik zonder cookies: één regel in de Vercel-logs en, als GA_MP_API_SECRET
 *   is ingesteld, één anoniem event "affiliate_click" via het GA4 Measurement Protocol
 *   (willekeurige client_id per klik, geen IP-adres of user-agent doorgestuurd).
 * - Nooit gecachet (elke klik moet de functie bereiken) en nooit geïndexeerd.
 */

export const dynamic = 'force-dynamic'

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || 'G-DW19T9YTX1'

/** Enkel korte, veilige plaatsnamen (bv. "saxo-vs-medirect", "comparison-table"). */
function cleanSource(raw: string | null): string {
  if (!raw) return 'onbekend'
  const s = raw.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 60)
  return s || 'onbekend'
}

async function sendGaEvent(partner: string, bron: string, affiliateActive: boolean) {
  const secret = process.env.GA_MP_API_SECRET
  if (!secret) return
  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(GA_MEASUREMENT_ID)}&api_secret=${encodeURIComponent(secret)}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          client_id: crypto.randomUUID(),
          non_personalized_ads: true,
          events: [
            {
              name: 'affiliate_click',
              params: { partner, bron, affiliate_active: affiliateActive ? 'ja' : 'nee' },
            },
          ],
        }),
        signal: AbortSignal.timeout(1500),
      },
    )
  } catch {
    // Meten mag de doorverwijzing nooit blokkeren.
  }
}

export async function GET(request: NextRequest, { params }: { params: { partner: string } }) {
  const id = params.partner.toLowerCase()
  const broker = brokers.find(b => b.id === id || b.slug === id)

  if (!broker || !broker.affiliateUrl) {
    return new NextResponse('Onbekende partner', {
      status: 404,
      headers: { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' },
    })
  }

  const bron = cleanSource(request.nextUrl.searchParams.get('bron'))
  const target = brokerLink(broker.affiliateUrl, bron)
  const affiliateActive = broker.affiliateActive === true

  console.log(
    JSON.stringify({ event: 'affiliate_click', partner: broker.id, bron, affiliate_active: affiliateActive }),
  )
  await sendGaEvent(broker.id, bron, affiliateActive)

  return NextResponse.redirect(target, {
    status: 302,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-Robots-Tag': 'noindex, nofollow',
      'Referrer-Policy': 'no-referrer-when-downgrade',
    },
  })
}
