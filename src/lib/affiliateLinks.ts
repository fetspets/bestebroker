/**
 * Affiliate link utilities
 * Set BOL_AFFILIATE_TAG in .env.local to activate bol.com affiliate tracking
 */

export function bolLink(rawBolUrl: string): string {
  if (rawBolUrl.startsWith('https://partner.bol.com/')) return rawBolUrl
  const tag = process.env.BOL_AFFILIATE_TAG
  if (!tag) return rawBolUrl
  try {
    const url = new URL(rawBolUrl)
    url.searchParams.set('partner_id', tag)
    return url.toString()
  } catch {
    return rawBolUrl
  }
}

export function brokerLink(affiliateUrl: string, source: string): string {
  if (!affiliateUrl) return '#'
  try {
    const url = new URL(affiliateUrl)
    if (url.hostname.endsWith('awin1.com')) {
      // Awin: geen UTM-parameters, wel clickref = plaats van de knop (zichtbaar in de Awin-rapporten)
      url.searchParams.set('clickref', source)
      return url.toString()
    }
    url.searchParams.set('utm_source', 'bestebroker')
    url.searchParams.set('utm_medium', 'affiliate')
    url.searchParams.set('utm_campaign', source)
    return url.toString()
  } catch {
    return affiliateUrl
  }
}

/**
 * Interne kliklink voor een broker-knop: /go/<broker-id>?bron=<plaats>.
 * De route src/app/go/[partner]/route.ts telt de klik (zonder cookies) en stuurt door naar brokerLink().
 */
export function goLink(brokerId: string, source: string): string {
  return `/go/${encodeURIComponent(brokerId)}?bron=${encodeURIComponent(source)}`
}
