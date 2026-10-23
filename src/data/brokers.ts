export interface Broker {
  id: string
  name: string
  slug: string
  type: 'belgisch' | 'belgisch bijkantoor' | 'buitenlands'
  tagline: string
  rating: number
  affiliateUrl?: string
  /** true = affiliateUrl is een echte, betaalde affiliate-link (toont het label 'betaalde samenwerking') */
  affiliateActive?: boolean
  color: string
  fees: {
    etfPlaylist?: number
    etfStandard?: number
    stocksEuronext?: number
    autoinvestMonthly?: number
    transactionFeeFixed: number
    transactionFeePercent: number
    transactionFeeMin: number
    transactionFeeMax: number | null
    custodyFeePercent: number
    custodyFeeFixed: number
    custodyFeeMax: number | null
    /** Staffel: kost per order tot en met `upTo` euro (oplopend). Heeft voorrang op fixed/percent. */
    feeTiers?: { upTo: number; fee: number }[]
    /** Boven de laatste trede: `fee` extra per begonnen schijf van `per` euro. */
    feeAbove?: { per: number; fee: number }
  }
  taxes: {
    tob: boolean
    dividendTax: boolean
    reynders: boolean
    capitalGainsTax: boolean
  }
  features: {
    savingsPlan: boolean
    fractionalShares: boolean
    autoInvest: boolean
    itsmeOnboarding: boolean
  }
  security: {
    securitiesLending: 'never' | 'opt-in' | 'default' | 'required'
    depositProtection: number
    depositScheme: string
    regulator: string[]
  }
  /** Onderbouwing van de veiligheidsscore (zie /methodologie). Elke factor met bron. */
  veiligheid: {
    toezicht: 'be-vergunning' | 'be-bijkantoor' | 'buitenland'
    entiteit: string
    entiteitBron: { label: string; href: string }
    sancties: { omschrijving: string; bron: { label: string; href: string } }[]
  }
  subScores: {
    kosten: number
    gebruiksgemak: number
    fiscaal: number
    veiligheid: number
  }
  methodologyScores: {
    fiscaleAfhandeling: number   // weging 30%
    transactiekosten: number     // weging 25%
    bewaarloon: number           // weging 15%
    veiligheid: number           // weging 15%
    functionaliteit: number      // weging 10%
    transparantie: number        // weging 5%
  }
  pros: string[]
  cons: string[]
  bestFor: string[]
  transferOutFee?: number
  nbbRegistrationRequired: boolean
  lastVerified: string
}

export const brokers: Broker[] = [
  {
    id: 'saxo',
    name: 'Saxo Bank',
    slug: 'saxo-bank-belgie',
    type: 'belgisch bijkantoor',
    tagline: 'Belgisch bijkantoor: houdt alle Belgische taksen in, AutoInvest €2 per maand',
    rating: 4.3, // = berekenRating(methodologyScores), zie /methodologie
    affiliateUrl: 'https://www.home.saxo/be',
    color: '#003057',
    fees: {
      etfStandard: 0.08,
      autoinvestMonthly: 2,
      transactionFeeFixed: 0,
      transactionFeePercent: 0.0008,
      transactionFeeMin: 2,
      transactionFeeMax: null,
      custodyFeePercent: 0,
      custodyFeeFixed: 0,
      custodyFeeMax: null,
    },
    taxes: {
      tob: true,
      dividendTax: true,
      reynders: true,
      capitalGainsTax: true,
    },
    features: {
      savingsPlan: true,
      fractionalShares: false,
      autoInvest: true,
      itsmeOnboarding: true, // Curvo, Saxo review
    },
    security: {
      securitiesLending: 'opt-in',
      depositProtection: 20000,
      depositScheme: 'Deens garantiefonds: €20.000 voor effecten, €100.000 voor cash',
      regulator: ['DFSA', 'FSMA', 'NBB'],
    },
    veiligheid: {
      toezicht: 'be-bijkantoor',
      entiteit: 'Belgisch bijkantoor van Saxo Bank A/S (Denemarken, vergunning Deense toezichthouder)',
      entiteitBron: { label: 'Curvo, Saxo review', href: 'https://curvo.eu/nl/artikel/saxo-bank-review' },
      sancties: [
        {
          omschrijving: 'Administratieve boete van DKK 313 miljoen (Deense toezichthouder, januari 2026) voor tekortkomingen in de antiwitwascontroles (2021–2023); door Saxo aanvaard',
          bron: { label: 'FinTech Futures, Saxo Bank fined by Danish FSA', href: 'https://www.fintechfutures.com/regulatory-actions/saxo-bank-fined-by-danish-fsa' },
        },
      ],
    },
    subScores: { kosten: 3.5, gebruiksgemak: 3.5, fiscaal: 5.0, veiligheid: 4.0 },
    methodologyScores: {
      fiscaleAfhandeling: 5.0,
      transactiekosten: 3.5,
      bewaarloon: 5.0,
      veiligheid: 4.0, // bijkantoor 4,5 − 0,5 sanctie (zie /methodologie)
      functionaliteit: 4.0,
      transparantie: 4.0,
    },
    pros: [
      'Houdt TOB, roerende voorheffing, Reynderstaks en meerwaardebelasting in (opt-out mogelijk)',
      'AutoInvest: automatisch maandelijks beleggen voor €2/maand',
      'Breed aanbod: ETFs, aandelen, obligaties, opties',
      'Belgisch bijkantoor van een Deense bank, met Belgisch toezicht op de gedragsregels (FSMA)',
    ],
    cons: [
      'Platform is complex voor absolute beginners',
      'Securities lending is opt-in (zet dit uit als beginner)',
      '€75/lijn bij overdracht naar andere broker',
      'Boete van de Deense toezichthouder in 2026 voor tekortkomingen in de antiwitwascontroles',
    ],
    bestFor: ['Wie automatisch maandelijks wil beleggen', 'Wie alle Belgische taksen laat inhouden', 'Wie naast ETF\'s ook obligaties of opties zoekt'],
    transferOutFee: 75,
    nbbRegistrationRequired: false,
    lastVerified: '2026-10-23',
  },
  {
    id: 'bolero',
    name: 'Bolero',
    slug: 'bolero',
    type: 'belgisch',
    tagline: 'Online broker van KBC Bank: staffel vanaf €2,50 per order, Belgische taksen ingehouden',
    rating: 4.3, // = berekenRating(methodologyScores), zie /methodologie
    affiliateUrl: 'https://bolero.be',
    color: '#e30613',
    fees: {
      // Tarieflijst Bolero S101, geldig vanaf 11/06/2025: zelfde staffel voor aandelen en ETF's op Euronext
      transactionFeeFixed: 0,
      transactionFeePercent: 0,
      transactionFeeMin: 2.5,
      transactionFeeMax: null,
      custodyFeePercent: 0,
      custodyFeeFixed: 0,
      custodyFeeMax: null,
      feeTiers: [
        { upTo: 250, fee: 2.5 },
        { upTo: 1000, fee: 5 },
        { upTo: 2500, fee: 7.5 },
        { upTo: 10000, fee: 15 },
        { upTo: 20000, fee: 30 },
        { upTo: 30000, fee: 45 },
        { upTo: 70000, fee: 50 },
      ],
      feeAbove: { per: 10000, fee: 15 },
    },
    taxes: {
      tob: true,
      dividendTax: true,
      reynders: true,
      capitalGainsTax: true, // ingehouden bij verkoop, opt-out mogelijk (Curvo, Bolero review, 08/10/2026)
    },
    features: {
      savingsPlan: true,
      fractionalShares: false,
      autoInvest: false,
      itsmeOnboarding: true,
    },
    security: {
      securitiesLending: 'never',
      depositProtection: 20000,
      depositScheme: 'Belgische stelsels: €20.000 voor effecten, €100.000 voor cash',
      regulator: ['NBB', 'FSMA'],
    },
    veiligheid: {
      toezicht: 'be-vergunning',
      entiteit: 'Bolero is een merk van KBC Bank NV (Belgische bank)',
      entiteitBron: { label: 'Curvo, Bolero review (08/10/2026)', href: 'https://curvo.eu/nl/artikel/bolero-review' },
      sancties: [],
    },
    subScores: { kosten: 3.0, gebruiksgemak: 4.5, fiscaal: 5.0, veiligheid: 5.0 },
    methodologyScores: {
      fiscaleAfhandeling: 5.0, // TOB, RV, Reynders en meerwaardebelasting ingehouden
      transactiekosten: 3.0, // staffel: €2,50 tot €250, €5 tot €1.000
      bewaarloon: 5.0,
      veiligheid: 5.0, // Belgische vergunning, geen sanctie gevonden
      functionaliteit: 3.5,
      transparantie: 4.5,
    },
    pros: [
      'Geen securities lending — jouw effecten blijven altijd van jou',
      'Invest & Repeat: automatisch herhalende orders',
      'Houdt TOB, roerende voorheffing, Reynderstaks en meerwaardebelasting in (opt-out mogelijk)',
      'Rekening openen met itsme',
    ],
    cons: [
      'Invest & Repeat debiteert je rekening NIET automatisch — zelf geld storten vereist',
      'Orderkost loopt op met het bedrag: €5 tot €1.000, €7,50 tot €2.500, daarboven €15 per €10.000 (max. €50)',
      'Enkel hele stuks, geen fracties',
      '€50/lijn bij overdracht (gratis naar KBC/CBC)',
    ],
    bestFor: ['Wie effecten niet wil laten uitlenen', 'Wie al bij KBC of CBC bankiert', 'Wie kleine orders tot €250 plaatst'],
    transferOutFee: 50,
    nbbRegistrationRequired: false,
    lastVerified: '2026-10-23',
  },
  {
    id: 'medirect',
    name: 'MeDirect',
    slug: 'medirect',
    type: 'belgisch',
    tagline: 'Geen makelaarsloon op ETF’s, Belgische taksen ingehouden',
    rating: 4.6, // = berekenRating(methodologyScores), zie /methodologie
    affiliateUrl: 'https://www.awin1.com/cread.php?awinmid=8356&awinaffid=2809534',
    affiliateActive: true,
    color: '#00a651',
    fees: {
      etfStandard: 0,
      // aandelen: 0,15% (Curvo 03/09/2026), minimum €2,50 op de meeste Europese beurzen sinds 01/07/2026 (Test-Aankoop)
      stocksEuronext: 0.15,
      transactionFeeFixed: 0,
      transactionFeePercent: 0,
      transactionFeeMin: 0,
      transactionFeeMax: null,
      custodyFeePercent: 0,
      custodyFeeFixed: 0,
      custodyFeeMax: null,
    },
    taxes: {
      tob: true,
      dividendTax: true,
      reynders: true,
      capitalGainsTax: true, // ingehouden bij verkoop, opt-out mogelijk (Curvo, MeDirect review, 03/09/2026)
    },
    features: {
      savingsPlan: false,
      fractionalShares: false,
      autoInvest: false,
      itsmeOnboarding: false,
    },
    security: {
      securitiesLending: 'never',
      depositProtection: 20000,
      depositScheme: 'Belgische stelsels: €20.000 voor effecten, €100.000 voor cash',
      regulator: ['NBB', 'FSMA'],
    },
    veiligheid: {
      toezicht: 'be-vergunning',
      entiteit: 'MeDirect Bank SA, bank naar Belgisch recht',
      entiteitBron: { label: 'Curvo, MeDirect review (03/09/2026)', href: 'https://curvo.eu/nl/artikel/medirect-review' },
      sancties: [],
    },
    subScores: { kosten: 5.0, gebruiksgemak: 3.0, fiscaal: 5.0, veiligheid: 5.0 },
    methodologyScores: {
      fiscaleAfhandeling: 5.0, // TOB, RV, Reynders en meerwaardebelasting ingehouden
      transactiekosten: 5.0,
      bewaarloon: 5.0,
      veiligheid: 5.0, // Belgische vergunning, geen sanctie gevonden
      functionaliteit: 1.5,
      transparantie: 3.0,
    },
    pros: [
      'ETF-transacties zijn volledig gratis (sinds augustus 2025)',
      'Houdt TOB, roerende voorheffing, Reynderstaks en meerwaardebelasting in (opt-out mogelijk)',
      'Geen bewaarloon',
      'Geen securities lending',
    ],
    cons: [
      'Geen spaarplan of automatisch beleggen',
      'Platform is minder gebruiksvriendelijk dan Bolero of Saxo',
      'Aandelen betalend: minimum €2,50 per order op de meeste Europese beurzen (sinds 1/7/2026)',
      'Meerwaardebelasting wordt bij elke verkoop ingehouden; teveel betaald recupereer je pas via je aangifte',
    ],
    bestFor: ['Wie vooral ETF\'s koopt en zelf orders plaatst', 'Wie geen effecten wil laten uitlenen'],
    transferOutFee: 50,
    nbbRegistrationRequired: false,
    lastVerified: '2026-10-23',
  },
  {
    id: 'degiro',
    name: 'DEGIRO',
    slug: 'degiro-belgie',
    type: 'buitenlands',
    tagline: 'Buitenlandse broker: lage orderkosten, TOB afgehandeld, meerwaardebelasting zelf aangeven',
    rating: 3.3, // = berekenRating(methodologyScores), zie /methodologie
    affiliateUrl: 'https://www.degiro.nl',
    color: '#ff6600',
    fees: {
      // ETF uit de kernselectie via Tradegate: €1; andere ETF's: €3 (Curvo, DEGIRO review, 03/09/2026)
      etfStandard: 3,
      transactionFeeFixed: 1,
      transactionFeePercent: 0,
      transactionFeeMin: 1,
      transactionFeeMax: null,
      custodyFeePercent: 0,
      custodyFeeFixed: 0,
      custodyFeeMax: null,
    },
    taxes: {
      tob: true, // DEGIRO houdt de TOB in en stort ze door (Curvo 03/09/2026; Test-Aankoop)
      dividendTax: false, // enkel ingehouden op Belgische aandelen
      reynders: false,
      capitalGainsTax: false,
    },
    features: {
      savingsPlan: false,
      fractionalShares: false,
      autoInvest: false,
      itsmeOnboarding: false,
    },
    security: {
      // Basis-account: uitlenen toegelaten volgens de voorwaarden (DEGIRO zegt nu niet uit te lenen)
      securitiesLending: 'default',
      depositProtection: 20000,
      depositScheme: 'Duitse stelsels: €20.000 voor effecten, €100.000 voor cash',
      regulator: ['BaFin'],
    },
    veiligheid: {
      toezicht: 'buitenland',
      entiteit: 'flatexDEGIRO Bank AG (Duitsland, toezicht BaFin); in België zonder vestiging (vrij dienstverkeer)',
      entiteitBron: { label: 'Curvo, DEGIRO review (03/09/2026)', href: 'https://curvo.eu/nl/artikel/degiro-review' },
      sancties: [
        {
          omschrijving: 'Boete van €1,05 miljoen (BaFin, 7/2/2023) voor inbreuken op het bankentoezicht',
          bron: { label: 'BaFin, bekendmaking flatexDEGIRO Bank AG', href: 'https://bafin.de/SharedDocs/Veroeffentlichungen/EN/Massnahmen/60b_KWG_84_WpIG_und_57_GwG/meldung_2023_02_24_flatexDEGIRO_en.html' },
        },
        {
          omschrijving: 'Twee boetes van samen €560.000 (BaFin, bekendgemaakt december 2025) voor misleidende reclame over gratis beleggen (2022)',
          bron: { label: 'Finance Magnates (22/12/2025)', href: 'https://www.financemagnates.com/forex/bafin-fines-flatexdegiro-560k-over-misleading-free-investment-ads/' },
        },
      ],
    },
    subScores: { kosten: 4.5, gebruiksgemak: 3.5, fiscaal: 2.0, veiligheid: 3.5 },
    methodologyScores: {
      fiscaleAfhandeling: 2.0, // TOB wel, MWB/RV/Reynders niet
      transactiekosten: 4.0,
      bewaarloon: 4.5,
      veiligheid: 3.5, // buitenland zonder vestiging 4,0 − 0,5 sanctie
      functionaliteit: 3.5,
      transparantie: 3.0,
    },
    pros: [
      '€1 per order voor ETF\'s uit de kernselectie (via Tradegate), €3 voor andere ETF\'s',
      'Houdt de beurstaks (TOB) automatisch in',
      'Groot aanbod van markten en instrumenten',
    ],
    cons: [
      'Meerwaardebelasting, Reynderstaks en roerende voorheffing op buitenlandse dividenden geef je zelf aan',
      'Buitenlandse rekening: jaarlijkse melding bij de Nationale Bank (NBB)',
      'Basis-account laat het uitlenen van effecten toe volgens de voorwaarden',
      'Geen automatisch spaarplan en geen fracties',
      'Geen Belgische website: je opent een rekening via degiro.nl',
    ],
    bestFor: ['Beleggers die de meerwaardebelasting zelf willen aangeven', 'Wie vooral ETF\'s uit de kernselectie koopt'],
    transferOutFee: 20,
    nbbRegistrationRequired: true,
    lastVerified: '2026-10-23',
  },
  {
    id: 'trade-republic',
    name: 'Trade Republic',
    slug: 'trade-republic-belgie',
    type: 'belgisch bijkantoor',
    tagline: 'Sinds 15/09/2026 Belgisch bijkantoor met BE-IBAN; €1 per order, gratis ETF-spaarplannen',
    rating: 4.5, // = berekenRating(methodologyScores), zie /methodologie
    affiliateUrl: 'https://traderepublic.com/be',
    color: '#c83e4d',
    fees: {
      etfStandard: 1,
      stocksEuronext: 1,
      transactionFeeFixed: 1,
      transactionFeePercent: 0,
      transactionFeeMin: 1,
      transactionFeeMax: 1,
      custodyFeePercent: 0,
      custodyFeeFixed: 0,
      custodyFeeMax: null,
    },
    taxes: {
      // Belgische rekening (sinds 15/09/2026): TOB, RV en Reynders ingehouden; meerwaardebelasting bij opt-in
      // (Curvo, Trade Republic review, 18/09/2026; Test-Aankoop, 15/09/2026). Oude Duitse rekening: alles zelf.
      tob: true,
      dividendTax: true,
      reynders: true,
      capitalGainsTax: true,
    },
    features: {
      savingsPlan: true,
      fractionalShares: true,
      autoInvest: true,
      itsmeOnboarding: false,
    },
    security: {
      securitiesLending: 'default',
      depositProtection: 20000,
      depositScheme: 'Duitse stelsels: €20.000 voor effecten, €100.000 voor cash',
      regulator: ['BaFin', 'FSMA'],
    },
    veiligheid: {
      toezicht: 'be-bijkantoor',
      entiteit: 'Belgisch bijkantoor van Trade Republic Bank GmbH (Duitsland, toezicht BaFin), sinds 15/09/2026',
      entiteitBron: { label: 'Test-Aankoop, Trade Republic België (15/09/2026)', href: 'https://www.test-aankoop.be/invest/beleggen/etf/artikels/2026/09/trade-republic-belgie-beoordeling-kosten-fiscaliteit-beleggingen' },
      sancties: [],
    },
    subScores: { kosten: 4.5, gebruiksgemak: 4.0, fiscaal: 4.5, veiligheid: 4.5 },
    methodologyScores: {
      fiscaleAfhandeling: 4.5, // alles op BE-rekening, MWB enkel bij opt-in
      transactiekosten: 5.0,
      bewaarloon: 5.0,
      veiligheid: 4.5, // Belgisch bijkantoor, geen sanctie gevonden
      functionaliteit: 4.0,
      transparantie: 2.0,
    },
    pros: [
      '€1 per order voor ETF\'s, aandelen en obligaties',
      'ETF-spaarplannen zonder transactiekost, ook in fracties',
      'Belgische rekening houdt TOB, roerende voorheffing en Reynderstaks in; meerwaardebelasting bij opt-in',
    ],
    cons: [
      'Rekening geopend vóór 15/09/2026 blijft Duits tot je ze overzet: dan geef je alles zelf aan en meld je ze bij de NBB',
      'Effecten overzetten naar een andere bank: €25 per lijn plus externe kosten',
      'Wisselkosten op dividenden in vreemde munt',
    ],
    bestFor: ['Wie in kleine bedragen periodiek in ETF\'s belegt', 'Wie een eenvoudige app zoekt'],
    transferOutFee: 25,
    nbbRegistrationRequired: false,
    lastVerified: '2026-10-23',
  },
  {
    id: 'keytrade',
    name: 'Keytrade Bank',
    slug: 'keytrade-belgie',
    type: 'belgisch bijkantoor',
    tagline: 'Belgisch bijkantoor van Arkéa Direct Bank: staffel vanaf €2,45, Belgische taksen ingehouden',
    rating: 3.9, // = berekenRating(methodologyScores), zie /methodologie
    affiliateUrl: 'https://www.keytradebank.be',
    color: '#0058a3',
    fees: {
      // Nieuwe tarieven vanaf 22/01/2025 (keytradebank.be): aandelen en trackers op Euronext Brussel, Amsterdam, Parijs
      transactionFeeFixed: 0,
      transactionFeePercent: 0,
      transactionFeeMin: 2.45,
      transactionFeeMax: null,
      // Effectenrekening en bewaring gratis (Test-Aankoop, 01/2025)
      custodyFeePercent: 0,
      custodyFeeFixed: 0,
      custodyFeeMax: null,
      feeTiers: [
        { upTo: 250, fee: 2.45 },
        { upTo: 2500, fee: 5.95 },
        { upTo: 10000, fee: 14.95 },
      ],
      feeAbove: { per: 10000, fee: 7.5 },
    },
    taxes: {
      tob: true,
      dividendTax: true,
      reynders: true,
      capitalGainsTax: true,
    },
    features: {
      savingsPlan: false,
      fractionalShares: false,
      autoInvest: false,
      itsmeOnboarding: true,
    },
    security: {
      securitiesLending: 'never',
      depositProtection: 70000,
      depositScheme: 'Frans garantiefonds (FGDR): €70.000 voor effecten, €100.000 voor cash (Curvo, 03/09/2026)',
      regulator: ['ACPR', 'FSMA'],
    },
    veiligheid: {
      toezicht: 'be-bijkantoor',
      entiteit: 'Keytrade Bank, Belgisch bijkantoor van Arkéa Direct Bank SA (Frankrijk), dochter van Crédit Mutuel Arkéa',
      entiteitBron: { label: 'Keytrade Bank, trading', href: 'https://www.keytradebank.be/en/investing/trading' },
      sancties: [
        {
          omschrijving: 'Minnelijke schikking van €250.000 met de FSMA (22/04/2026): door een IT-probleem kon de bank eind 2023–begin 2024 niet nagaan of beleggingen passend waren voor klanten',
          bron: { label: 'FSMA-persbericht (22/04/2026)', href: 'https://www.vfb.be/Media/Default/pdf/20260422%20Persbericht%20Minnelijke%20schikking%20Keytrade.pdf' },
        },
      ],
    },
    subScores: { kosten: 2.5, gebruiksgemak: 3.5, fiscaal: 5.0, veiligheid: 4.0 },
    methodologyScores: {
      fiscaleAfhandeling: 5.0,
      transactiekosten: 2.5, // staffel: €2,45 tot €250, €5,95 tot €2.500 (duurder dan Bolero bij €300)
      bewaarloon: 5.0, // geen bewaarloon
      veiligheid: 4.0, // bijkantoor 4,5 − 0,5 sanctie
      functionaliteit: 2.0,
      transparantie: 4.0,
    },
    pros: [
      'Houdt TOB, roerende voorheffing, Reynderstaks en meerwaardebelasting in (opt-out mogelijk)',
      'Geen bewaarloon en geen uitlenen van effecten',
      'Rekening openen met itsme',
      'Actief in België sinds 1998',
    ],
    cons: [
      'Orderkost loopt op met het bedrag: €5,95 tot €2.500, €14,95 tot €10.000',
      'Geen automatisch spaarplan op het brokerplatform',
      '€50 per lijn (excl. btw) bij overdracht naar een andere bank',
      'Minnelijke schikking met de FSMA in 2026 (passendheidstoets)',
    ],
    bestFor: ['Wie alle Belgische taksen laat inhouden en zelf orders plaatst', 'Wie geen effecten wil laten uitlenen'],
    transferOutFee: 60.5,
    nbbRegistrationRequired: false,
    lastVerified: '2026-10-23',
  },
]

/** Weging van /methodologie. De totaalscore wordt hieruit berekend, niet met de hand ingevuld. */
export const WEGING = {
  fiscaleAfhandeling: 0.3,
  transactiekosten: 0.25,
  bewaarloon: 0.15,
  veiligheid: 0.15,
  functionaliteit: 0.1,
  transparantie: 0.05,
} as const

export function berekenRating(s: Broker['methodologyScores']): number {
  const som = (Object.keys(WEGING) as (keyof typeof WEGING)[]).reduce((t, k) => t + s[k] * WEGING[k], 0)
  return Math.round(som * 10) / 10
}

for (const b of brokers) b.rating = berekenRating(b.methodologyScores)

/** Kost van één order van `bedrag` euro volgens de tarieven in `fees` (staffel of vast + percentage). */
export function transactiekost(fees: Broker['fees'], bedrag: number): number {
  if (fees.feeTiers && fees.feeTiers.length > 0) {
    for (const t of fees.feeTiers) if (bedrag <= t.upTo) return t.fee
    const laatste = fees.feeTiers[fees.feeTiers.length - 1]
    if (!fees.feeAbove) return laatste.fee
    return laatste.fee + Math.ceil((bedrag - laatste.upTo) / fees.feeAbove.per) * fees.feeAbove.fee
  }
  const kost = Math.max(fees.transactionFeeMin, bedrag * fees.transactionFeePercent + fees.transactionFeeFixed)
  return fees.transactionFeeMax !== null ? Math.min(kost, fees.transactionFeeMax) : kost
}

export function getBrokerById(id: string): Broker | undefined {
  return brokers.find(b => b.id === id)
}

export function getBrokerBySlug(slug: string): Broker | undefined {
  return brokers.find(b => b.slug === slug)
}
