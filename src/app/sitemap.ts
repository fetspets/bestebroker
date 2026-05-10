import type { MetadataRoute } from 'next'
import { brokers } from '@/data/brokers'
import { books } from '@/data/books'

const BASE_URL = 'https://www.bestebroker.be'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date('2026-04-01'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/beste-broker-belgie`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/beste-etf-broker-belgie`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/broker-meerwaardebelasting-2026`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/goedkoopste-broker-belgie`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/vergelijking/degiro-vs-bolero`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/vergelijking/saxo-vs-degiro`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/vergelijking/bolero-vs-saxo`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/vergelijking/saxo-vs-medirect`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tools/brokerkosten-calculator`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/welke-broker-past-bij-mij`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/boeken`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/boeken/quiz`, lastModified: new Date('2026-04-01'), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/belgie/meerwaardebelasting-broker`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/belgie/buitenlandse-broker-nbb-aangifte`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/belgie/tob-uitleg`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/belgie/etf-kopen-beginners`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/belgie/vwce-vs-iwda`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/belgie/pensioensparen-vs-etf`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/belgie/meerwaardebelasting-2026-uitleg`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/over-mij`, lastModified: new Date('2026-04-01'), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/disclaimer`, lastModified: new Date('2026-04-01'), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/methodologie`, lastModified: new Date('2026-04-01'), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date('2026-05-10'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookiebeleid`, lastModified: new Date('2026-05-10'), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const brokerRoutes: MetadataRoute.Sitemap = brokers.map(b => ({
    url: `${BASE_URL}/reviews/${b.slug}`,
    lastModified: new Date(b.lastVerified),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const bookRoutes: MetadataRoute.Sitemap = books.map(b => ({
    url: `${BASE_URL}/boeken/${b.slug}`,
    lastModified: new Date(b.lastVerified),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...brokerRoutes, ...bookRoutes]
}
