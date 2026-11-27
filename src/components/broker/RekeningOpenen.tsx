import { goLink, knopNaam } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import type { Broker } from '@/data/brokers'

/**
 * Rij knoppen "Rekening openen bij <broker> →" voor 1 of meer brokers, in vaste volgorde (zoals doorgegeven).
 * - Elke broker krijgt dezelfde knop, partner of niet; het label "betaalde samenwerking" verschijnt enkel bij
 *   een actieve affiliate-link (AffiliateLabel).
 * - `bron` = plaats van de knop; wordt via /go/ de clickref (Awin) of subId1 (Impact) in de partnerrapporten.
 * - `onder` = korte regel onder de knoppen (bv. een feit uit de tabel), optioneel.
 */
export function RekeningOpenen({
  brokers,
  bron,
  onder,
  className = '',
}: {
  brokers: Broker[]
  bron: string
  onder?: string
  className?: string
}) {
  const metLink = brokers.filter(b => b.affiliateUrl)
  if (metLink.length === 0) return null
  const cols = metLink.length > 1 ? 'sm:grid-cols-2' : 'sm:max-w-sm'
  return (
    <div className={`not-prose ${className}`}>
      <div className={`grid grid-cols-1 ${cols} gap-3`}>
        {metLink.map(broker => (
          <div key={broker.id}>
            <a
              href={goLink(broker.id, bron)}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="btn-primary w-full justify-center text-center py-3"
            >
              Rekening openen bij {knopNaam(broker)} →
            </a>
            <AffiliateLabel broker={broker} />
          </div>
        ))}
      </div>
      {onder && <p className="text-xs text-gray-500 mt-2">{onder}</p>}
    </div>
  )
}
