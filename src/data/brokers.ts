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
    rating: 4.4,
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
      itsmeOnboarding: false,
    },
    security: {
      securitiesLending: 'opt-in',
      depositProtection: 20000,
      depositScheme: 'Deens garantiefonds: €20.000 voor effecten, €100.000 voor cash',
      regulator: ['DFSA', 'FSMA', 'NBB'],
    },
    subScores: { kosten: 3.5, gebruiksgemak: 3.5, fiscaal: 5.0, veiligheid: 4.5 },
    methodologyScores: {
      fiscaleAfhandeling: 5.0,
      transactiekosten: 3.5,
      bewaarloon: 5.0,
      veiligheid: 4.5,
      functionaliteit: 4.0,
      transparantie: 4.0,
    },
    pros: [
      'Regelt TOB, roerende voorheffing, Reynders én meerwaardebelasting automatisch',
      'AutoInvest: automatisch maandelijks beleggen voor €2/maand',
      'Breed aanbod: ETFs, aandelen, obligaties, opties',
      'Belgisch bijkantoor — volledig FSMA- en NBB-geregistreerd',
    ],
    cons: [
      'Platform is complex voor absolute beginners',
      'Securities lending is opt-in (zet dit uit als beginner)',
      '€75/lijn bij overdracht naar andere broker',
    ],
    bestFor: ['Gevorderde beleggers', 'Fiscale gemoedsrust', 'Automatisch beleggen'],
    transferOutFee: 75,
    nbbRegistrationRequired: false,
    lastVerified: '2026-04-01',
  },
  {
    id: 'bolero',
    name: 'Bolero',
    slug: 'bolero',
    type: 'belgisch',
    tagline: 'KBC-dochter — vertrouwd Belgisch, volledig fiscaal compliant',
    rating: 4.1,
    affiliateUrl: 'https://bolero.be',
    color: '#e30613',
    fees: {
      etfPlaylist: 2.5,
      etfStandard: 7.5,
      stocksEuronext: 7.5,
      transactionFeeFixed: 7.5,
      transactionFeePercent: 0,
      transactionFeeMin: 7.5,
      transactionFeeMax: null,
      custodyFeePercent: 0,
      custodyFeeFixed: 0,
      custodyFeeMax: null,
    },
    taxes: {
      tob: true,
      dividendTax: true,
      reynders: true,
      capitalGainsTax: false, // wordt automatisch afgehandeld v.a. 1 juni 2026
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
      regulator: ['FSMA'],
    },
    subScores: { kosten: 2.5, gebruiksgemak: 4.5, fiscaal: 4.5, veiligheid: 5.0 },
    methodologyScores: {
      fiscaleAfhandeling: 4.5,
      transactiekosten: 2.5,
      bewaarloon: 5.0,
      veiligheid: 5.0,
      functionaliteit: 3.5,
      transparantie: 4.5,
    },
    pros: [
      'Geen securities lending — jouw effecten blijven altijd van jou',
      'Invest & Repeat: automatisch herhalende orders',
      'Meerwaardebelasting automatisch afgehandeld v.a. 1 juni 2026',
      'Vertrouwde Belgische bank (KBC-groep)',
    ],
    cons: [
      'Invest & Repeat debiteert je rekening NIET automatisch — zelf geld storten vereist',
      'Hogere transactiekosten buiten de Playlist (€7,50/trade)',
      'Playlist-ETFs beperkt — enkel gehele stuks',
      '€50/lijn bij overdracht',
    ],
    bestFor: ['Veiligheidsgerichte beleggers', 'Mensen die securities lending willen vermijden', 'KBC-klanten'],
    transferOutFee: 50,
    nbbRegistrationRequired: false,
    lastVerified: '2026-04-01',
  },
  {
    id: 'medirect',
    name: 'MeDirect',
    slug: 'medirect',
    type: 'belgisch',
    tagline: 'Geen makelaarsloon op ETF’s, Belgische taksen ingehouden',
    rating: 4.0,
    affiliateUrl: 'https://www.awin1.com/cread.php?awinmid=8356&awinaffid=2809534',
    affiliateActive: true,
    color: '#00a651',
    fees: {
      etfStandard: 0,
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
      capitalGainsTax: false, // verifieer actuele status voor 2026 — onzeker op moment van schrijven
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
      regulator: ['FSMA', 'NBB'],
    },
    subScores: { kosten: 5.0, gebruiksgemak: 3.0, fiscaal: 4.0, veiligheid: 4.5 },
    methodologyScores: {
      fiscaleAfhandeling: 4.5,
      transactiekosten: 5.0,
      bewaarloon: 5.0,
      veiligheid: 4.5,
      functionaliteit: 1.5,
      transparantie: 3.0,
    },
    pros: [
      'ETF-transacties zijn volledig gratis (sinds augustus 2025)',
      'Alle Belgische belastingen automatisch afgehandeld',
      'Geen bewaarloon',
      'Geen securities lending',
    ],
    cons: [
      'Geen spaarplan of automatisch beleggen',
      'Platform is minder gebruiksvriendelijk dan Bolero of Saxo',
      'Aandelen: 0,15% min. €6 per trade',
      'Meerwaardebelasting 2026: verifieer actuele status',
    ],
    bestFor: ['Buy-and-hold ETF-beleggers', 'Kostenminimaliseerders', 'Eenvoudige beleggers'],
    nbbRegistrationRequired: false,
    lastVerified: '2026-04-01',
  },
  {
    id: 'degiro',
    name: 'DEGIRO',
    slug: 'degiro-belgie',
    type: 'buitenlands',
    tagline: 'Buitenlandse broker: lage orderkosten, TOB afgehandeld, meerwaardebelasting zelf aangeven',
    rating: 3.2, // = gewogen som van methodologyScores (zie /methodologie)
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
    subScores: { kosten: 4.5, gebruiksgemak: 3.5, fiscaal: 2.0, veiligheid: 2.5 },
    methodologyScores: {
      fiscaleAfhandeling: 2.0, // TOB wel, MWB/RV/Reynders niet
      transactiekosten: 4.0,
      bewaarloon: 4.5,
      veiligheid: 2.5,
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
    rating: 4.2, // = gewogen som van methodologyScores (zie /methodologie)
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
      regulator: ['BaFin'],
    },
    subScores: { kosten: 4.5, gebruiksgemak: 4.0, fiscaal: 4.5, veiligheid: 2.5 },
    methodologyScores: {
      fiscaleAfhandeling: 4.5, // alles op BE-rekening, MWB enkel bij opt-in
      transactiekosten: 5.0,
      bewaarloon: 5.0,
      veiligheid: 2.5,
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
    type: 'belgisch',
    tagline: 'Belgische volledigheid, maar hogere kosten dan alternatieven',
    rating: 3.4,
    affiliateUrl: 'https://www.keytradebank.be',
    color: '#0058a3',
    fees: {
      etfStandard: 12.5,
      stocksEuronext: 12.5,
      transactionFeeFixed: 12.5,
      transactionFeePercent: 0,
      transactionFeeMin: 12.5,
      transactionFeeMax: null,
      custodyFeePercent: 0.0024,
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
      savingsPlan: false,
      fractionalShares: false,
      autoInvest: false,
      itsmeOnboarding: false,
    },
    security: {
      securitiesLending: 'never',
      depositProtection: 20000,
      depositScheme: 'Belgische stelsels: €20.000 voor effecten, €100.000 voor cash',
      regulator: ['FSMA', 'NBB'],
    },
    subScores: { kosten: 1.5, gebruiksgemak: 3.5, fiscaal: 4.5, veiligheid: 5.0 },
    methodologyScores: {
      fiscaleAfhandeling: 5.0,
      transactiekosten: 1.0,
      bewaarloon: 2.0,
      veiligheid: 5.0,
      functionaliteit: 2.0,
      transparantie: 4.0,
    },
    pros: [
      'Volledig Belgisch (onderdeel van Crelan groep)',
      'Alle belastingen automatisch afgehandeld',
      'Geen securities lending',
      'Lange trackrecord in België',
    ],
    cons: [
      'Hoge transactiekosten: €12,50/trade',
      'Bewaarloon: 0,24% per jaar',
      'Geen spaarplan of automatisch beleggen',
      'Duurder dan Saxo, Bolero en MeDirect voor de meeste beleggers',
    ],
    bestFor: ['Beleggers die absolute Belgische zekerheid willen', 'Lage handelsfrequentie + grote portefeuille'],
    nbbRegistrationRequired: false,
    lastVerified: '2026-04-01',
  },
]

export function getBrokerById(id: string): Broker | undefined {
  return brokers.find(b => b.id === id)
}

export function getBrokerBySlug(slug: string): Broker | undefined {
  return brokers.find(b => b.slug === slug)
}
