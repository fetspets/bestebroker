/**
 * Affiliate link utilities
 * Set BOL_AFFILIATE_TAG in .env.local to activate bol.com affiliate tracking
 */

export function bolLink(rawBolUrl: string): string {
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
    url.searchParams.set('utm_source', 'bestebroker')
    url.searchParams.set('utm_medium', 'affiliate')
    url.searchParams.set('utm_campaign', source)
    return url.toString()
  } catch {
    return affiliateUrl
  }
}
