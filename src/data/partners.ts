/**
 * Partners die geen broker zijn (bv. software). Uitgaande klikken lopen net als bij brokers via /go/<id>?bron=<plaats>.
 * Enkel partners met een schriftelijk akkoord; elke knop toont "Affiliate-link · betaalde samenwerking".
 */
export interface Partner {
  id: string
  name: string
  /** Doel-URL; /go/ voegt utm_source=bestebroker, utm_medium=affiliate en utm_campaign=<bron> toe. */
  affiliateUrl: string
  affiliateActive: boolean
  /** Kortingscode voor bezoekers van BesteBroker.be, indien afgesproken. */
  kortingscode?: string
}

export const partners: Partner[] = [
  {
    // Akkoord per mail 16/11/2026: 20% van wat een klant via onze link het eerste jaar betaalt; code actief sinds 16/11/2026.
    id: 'krosos',
    name: 'Krosos',
    affiliateUrl: 'https://krosos.com/nl/meerwaardebelasting-berekenen?utm_source=bestebroker',
    affiliateActive: true,
    kortingscode: 'BESTEBROKER',
  },
  {
    // Tweede rekenhulp van Krosos (belastingvrij verkopen vóór 31/12), voorgesteld door Krosos op 24/11/2026;
    // zelfde code en voorwaarden als 'krosos' (bewijslogboek 25/11/2026). Eigen id zodat de klikken apart meetbaar zijn.
    id: 'krosos-eindejaar',
    name: 'Krosos',
    affiliateUrl: 'https://krosos.com/nl/belastingvrij-verkopen-berekenen?utm_source=bestebroker',
    affiliateActive: true,
    kortingscode: 'BESTEBROKER',
  },
]
