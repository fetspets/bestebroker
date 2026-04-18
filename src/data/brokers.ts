export interface Broker {
  id: string
  name: string
  slug: string
  type: 'belgisch' | 'belgisch bijkantoor' | 'buitenlands'
  tagline: string
  rating: number
  affiliateUrl?: string
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
    tagline: 'Meest complete Belgische broker — regelt alles fiscaal voor jou',
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
      depositProtection: 100000,
      depositScheme: 'Deens garantiefonds (Garantiformuen)',
      regulator: ['DFSA', 'FSMA', 'NBB'],
    },
    subScores: { kosten: 3.5, gebruiksgemak: 3.5, fiscaal: 5.0, veiligheid: 4.5 },
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
      capitalGainsTax: true,
    },
    features: {
      savingsPlan: true,
      fractionalShares: false,
      autoInvest: false,
      itsmeOnboarding: true,
    },
    security: {
      securitiesLending: 'never',
      depositProtection: 100000,
      depositScheme: 'Belgisch beschermingsfonds (FSMA)',
      regulator: ['FSMA'],
    },
    subScores: { kosten: 2.5, gebruiksgemak: 4.5, fiscaal: 4.5, veiligheid: 5.0 },
    pros: [
      'Geen securities lending — jouw effecten blijven altijd van jou',
      'Invest & Repeat: automatisch herhalende orders',
      'Meerwaardebelasting afgehandeld v.a. 1 juni 2026',
      'Vertrouwde Belgische bank (KBC-groep)',
    ],
    cons: [
      'Hogere transactiekosten buiten de Playlist (€7,50/trade)',
      'Playlist-ETFs beperkt — enkel gehele stuks',
      'Geen automatische debitering bij Invest & Repeat',
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
    tagline: 'Gratis ETF-transacties — goedkoopste keuze voor buy-and-hold',
    rating: 4.0,
    affiliateUrl: 'https://www.medirect.be',
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
      depositProtection: 100000,
      depositScheme: 'Belgisch beschermingsfonds (FSMA)',
      regulator: ['FSMA', 'NBB'],
    },
    subScores: { kosten: 5.0, gebruiksgemak: 3.0, fiscaal: 4.0, veiligheid: 4.5 },
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
    tagline: 'Goedkope buitenlandse broker — zelf verantwoordelijk voor Belgische belastingen',
    rating: 3.6,
    affiliateUrl: 'https://www.degiro.be',
    color: '#ff6600',
    fees: {
      etfStandard: 3,
      stocksEuronext: 3,
      transactionFeeFixed: 1,
      transactionFeePercent: 0.00026,
      transactionFeeMin: 0,
      transactionFeeMax: null,
      custodyFeePercent: 0,
      custodyFeeFixed: 0,
      custodyFeeMax: null,
    },
    taxes: {
      tob: false,
      dividendTax: false,
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
      securitiesLending: 'required',
      depositProtection: 20000,
      depositScheme: 'Duits beleggersbeschermingsfonds (BaFin/EdW)',
      regulator: ['BaFin', 'AFM', 'DNB'],
    },
    subScores: { kosten: 4.5, gebruiksgemak: 3.5, fiscaal: 1.0, veiligheid: 2.5 },
    pros: [
      'Lage transactiekosten (€1 + €2 handling voor veel ETFs)',
      'Groot aanbod van markten en instrumenten',
      'Vlot platform voor ervaren beleggers',
    ],
    cons: [
      'Regelt GEEN Belgische belastingen — TOB, RV, Reynders, MWB zelf aangifte doen',
      'Basisaccount: securities lending is verplicht',
      'NBB-aangifte jaarlijks vereist (buitenlandse rekening)',
      'Slechts €20.000 beleggersprotectie (vs €100K bij Belgische brokers)',
      'Geen spaarplan of auto-invest',
    ],
    bestFor: ['Ervaren beleggers', 'Mensen die belastingen niet erg vinden zelf te regelen'],
    nbbRegistrationRequired: true,
    lastVerified: '2026-04-01',
  },
  {
    id: 'trade-republic',
    name: 'Trade Republic',
    slug: 'trade-republic-belgie',
    type: 'buitenlands',
    tagline: 'Goedkoopste transacties, maar nul fiscale ondersteuning voor Belgen',
    rating: 3.2,
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
      tob: false,
      dividendTax: false,
      reynders: false,
      capitalGainsTax: false,
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
      depositScheme: 'Duits beleggersbeschermingsfonds (BaFin/EdW)',
      regulator: ['BaFin'],
    },
    subScores: { kosten: 4.5, gebruiksgemak: 4.0, fiscaal: 1.0, veiligheid: 2.5 },
    pros: [
      'Laagste vaste transactiekost: €1 per trade',
      'Gratis spaarplannen voor ETFs en aandelen',
      'Fractionele aandelen mogelijk',
    ],
    cons: [
      'Regelt GEEN enkele Belgische belasting — volledig zelf te regelen',
      'Niet geregistreerd bij NBB — jaarlijkse aangifte buitenlandse rekening vereist',
      'Securities lending is standaard ingeschakeld',
      'Geen Nederlandstalige klantenservice',
      'Beperkt aanbod voor professionele beleggers',
    ],
    bestFor: ['Beleggers die zelf alle belastingen willen regelen', 'Spaarplan-beleggers in kleine bedragen'],
    nbbRegistrationRequired: true,
    lastVerified: '2026-04-01',
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
      depositProtection: 100000,
      depositScheme: 'Belgisch beschermingsfonds (FSMA)',
      regulator: ['FSMA', 'NBB'],
    },
    subScores: { kosten: 1.5, gebruiksgemak: 3.5, fiscaal: 4.5, veiligheid: 5.0 },
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
