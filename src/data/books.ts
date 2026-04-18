export interface Book {
  id: string
  slug: string
  title: string
  author: string
  authorBio?: string
  isbn: string
  publisher: string
  year: number
  language: 'nl' | 'en' | 'fr'
  priceEur: number
  pricePaperback?: number
  priceEbook?: number
  bolUrl: string
  coverImageUrl?: string
  targetAudience: ('beginners' | 'etf-beleggers' | 'gevorderd' | 'mindset' | 'belgisch-specifiek' | 'jongeren')[]
  shortDescription: string
  whyBelgium: string
  contextualPages: string[]
  authorNote?: string
  lastVerified: string
}

export const books: Book[] = [
  {
    id: 'hangmatbelegger',
    slug: 'de-hangmatbelegger',
    title: 'De hangmatbelegger',
    author: 'Jonas Deprez',
    authorBio: 'Jonas Deprez is co-oprichter van Curvo, een Belgisch beleggingsplatform.',
    isbn: '9789401491402',
    publisher: 'Lannoo',
    year: 2022,
    language: 'nl',
    priceEur: 24.99,
    pricePaperback: 24.99,
    priceEbook: 13.99,
    bolUrl: 'https://www.bol.com/nl/nl/p/de-hangmatbelegger/9300000067953494/',
    targetAudience: ['beginners', 'etf-beleggers', 'belgisch-specifiek'],
    shortDescription:
      'Hét Nederlandstalige standaardwerk voor Belgische passieve beleggers. Stap voor stap uitleg over ETFs, brokers en de Belgische fiscaliteit.',
    whyBelgium:
      'Specifiek geschreven voor de Belgische context: TOB, roerende voorheffing en Belgische brokers komen uitgebreid aan bod.',
    contextualPages: ['/beste-broker-belgie', '/tools/brokerkosten-calculator'],
    authorNote:
      'Noot: de auteur is co-oprichter van Curvo, een concurrent van de brokers die wij vergelijken. Wij bevelen dit boek aan op basis van de inhoudskwaliteit — niet de broker-aanbevelingen in het boek.',
    lastVerified: '2026-04-01',
  },
  {
    id: 'psychologie-geld-nl',
    slug: 'de-psychologie-van-geld',
    title: 'De psychologie van geld',
    author: 'Morgan Housel',
    isbn: '9789021590745',
    publisher: 'Maven Publishing',
    year: 2021,
    language: 'nl',
    priceEur: 15.0,
    pricePaperback: 15.0,
    bolUrl: 'https://www.bol.com/nl/nl/p/de-psychologie-van-geld/9300000021963485/',
    targetAudience: ['beginners', 'mindset'],
    shortDescription:
      'Waarom nemen slimme mensen slechte financiële beslissingen? Morgan Housel legt uit hoe emoties en cognitieve fouten je beleggingsresultaten bepalen.',
    whyBelgium:
      'De inzichten zijn universeel maar extra relevant voor Belgische beleggers die neigen tot te veel cash aanhouden of uitstellen.',
    contextualPages: ['/boeken', '/beste-broker-belgie'],
    lastVerified: '2026-04-01',
  },
  {
    id: 'psychology-of-money-en',
    slug: 'the-psychology-of-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    isbn: '9780857197689',
    publisher: 'Harriman House',
    year: 2020,
    language: 'en',
    priceEur: 22.95,
    pricePaperback: 22.95,
    bolUrl: 'https://www.bol.com/nl/nl/p/the-psychology-of-money/9300000016558941/',
    targetAudience: ['mindset', 'gevorderd'],
    shortDescription:
      'The original English edition of the classic on behavioral finance. Timeless lessons on wealth, greed, and happiness.',
    whyBelgium:
      'Voor Belgische beleggers die Engels prefereren of de volledige nuances van het origineel willen meepakken.',
    contextualPages: ['/boeken'],
    lastVerified: '2026-04-01',
  },
  {
    id: 'intelligente-belegger',
    slug: 'de-intelligente-belegger',
    title: 'De intelligente belegger',
    author: 'Benjamin Graham',
    isbn: '9789047015963',
    publisher: 'Spectrum',
    year: 2019,
    language: 'nl',
    priceEur: 23.99,
    pricePaperback: 23.99,
    bolUrl: 'https://www.bol.com/nl/nl/p/de-intelligente-belegger/9200000083744148/',
    targetAudience: ['gevorderd'],
    shortDescription:
      'Het fundament van value investing, door de leermeester van Warren Buffett. Tijdloze principes die elke serieuze belegger zou moeten kennen.',
    whyBelgium:
      'Hoewel niet specifiek Belgisch, biedt dit boek de fundamenten om elke beleggingsbeslissing — inclusief broker- en ETF-keuzes — beter te onderbouwen.',
    contextualPages: ['/boeken'],
    lastVerified: '2026-04-01',
  },
  {
    id: 'jong-beleggen',
    slug: 'je-bent-jong-en-je-wilt-beleggen',
    title: 'Je bent jong en je wilt... beleggen',
    author: 'Cédric Proost',
    isbn: '9789401489249',
    publisher: 'Lannoo',
    year: 2023,
    language: 'nl',
    priceEur: 19.99,
    pricePaperback: 19.99,
    bolUrl: 'https://www.bol.com/nl/nl/p/je-bent-jong-en-je-wilt-beleggen/9300000130234567/',
    targetAudience: ['beginners', 'belgisch-specifiek', 'jongeren'],
    shortDescription:
      'Geschreven voor Belgische jongeren die hun eerste stappen willen zetten in de wereld van beleggen. Praktisch, concreet en zonder jargon.',
    whyBelgium:
      'Specifiek gericht op de Belgische fiscale realiteit en jonge beleggers die klein willen beginnen — ideaal naast een introductie over broker-keuze.',
    contextualPages: ['/beste-broker-belgie', '/boeken'],
    lastVerified: '2026-04-01',
  },
  {
    id: 'thomas-guenter',
    slug: 'personal-finance-thomas-guenter',
    title: 'Personal finance met Thomas Guenter',
    author: 'Thomas Guenter',
    isbn: '9789401497220',
    publisher: 'Lannoo',
    year: 2023,
    language: 'nl',
    priceEur: 24.99,
    pricePaperback: 24.99,
    bolUrl: 'https://www.bol.com/nl/nl/p/personal-finance/9300000118456789/',
    targetAudience: ['belgisch-specifiek', 'gevorderd'],
    shortDescription:
      'Thomas Guenter (bekend van Spaargids) behandelt de volledige Belgische personal finance: sparen, beleggen, pensioensparen, vastgoed en belastingen.',
    whyBelgium:
      'Een van de volledigste Nederlandstalige bronnen over Belgische personal finance — inclusief de nuances van TOB, RV en pensioensparen.',
    contextualPages: ['/belgie/meerwaardebelasting-broker', '/boeken'],
    lastVerified: '2026-04-01',
  },
  {
    id: 'beleggen-doe-je-zo',
    slug: 'beleggen-doe-je-zo',
    title: 'Beleggen doe je zo!',
    author: 'Hendrik Vanhees',
    isbn: '9789401478571',
    publisher: 'Lannoo',
    year: 2022,
    language: 'nl',
    priceEur: 34.95,
    pricePaperback: 34.95,
    bolUrl: 'https://www.bol.com/nl/nl/p/beleggen-doe-je-zo/9300000052345678/',
    targetAudience: ['etf-beleggers'],
    shortDescription:
      'Uitgebreid handboek over passief beleggen via indexfondsen en ETFs. Derde editie met bijgewerkte informatie over nieuwe producten en regels.',
    whyBelgium:
      'Behandelt ETF-selectie, assetklassen en portefeuilleconstructie met aandacht voor de Belgische belegger.',
    contextualPages: ['/beste-etf-broker-belgie', '/boeken'],
    lastVerified: '2026-04-01',
  },
  {
    id: 'beleggen-zonder-stress',
    slug: 'beleggen-zonder-stress',
    title: 'Beleggen zonder stress',
    author: 'Paul Huybrechts',
    isbn: '9789401485432',
    publisher: 'Lannoo',
    year: 2021,
    language: 'nl',
    priceEur: 22.99,
    pricePaperback: 22.99,
    bolUrl: 'https://www.bol.com/nl/nl/p/beleggen-zonder-stress/9300000038901234/',
    targetAudience: ['beginners', 'etf-beleggers'],
    shortDescription:
      'Praktische gids voor de belegger die niet dagelijks met zijn portefeuille bezig wil zijn. Focus op langetermijn denken en emotie vermijden.',
    whyBelgium:
      'Belgische auteur met Belgische voorbeelden — spreekt de twijfels aan die veel Belgische beleggers kennen: te weinig risico nemen, uitstellen, te vaak checken.',
    contextualPages: ['/beste-broker-belgie', '/boeken'],
    lastVerified: '2026-04-01',
  },
]

export function getBookById(id: string): Book | undefined {
  return books.find(b => b.id === id)
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find(b => b.slug === slug)
}
