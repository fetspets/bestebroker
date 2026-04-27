import type { MetadataRoute } from 'next'
import { brokers } from '@/data/brokers'
import { books } from '@/data/books'

const BASE_URL = 'https://www.bestebroker.be'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/beste-broker-belgie`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/beste-etf-broker-belgie`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/broker-meerwaardebelasting-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/goedkoopste-broker-belgie`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/vergelijking/degiro-vs-bolero`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/vergelijking/saxo-vs-degiro`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/vergelijking/bolero-vs-saxo`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/vergelijking/saxo-vs-medirect`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tools/brokerkosten-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/welke-broker-past-bij-mij`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/boeken`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/belgie/meerwaardebelasting-broker`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/belgie/buitenlandse-broker-nbb-aangifte`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/belgie/tob-uitleg`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/belgie/etf-kopen-beginners`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/belgie/vwce-vs-iwda`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/belgie/pensioensparen-vs-etf`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/belgie/meerwaardebelasting-2026-uitleg`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/over-mij`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/methodologie`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
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
