import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { books, getBookBySlug } from '@/data/books'
import { BookCard } from '@/components/book/BookCard'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { bolLink } from '@/lib/affiliateLinks'
import { LastUpdated } from '@/components/ui/LastUpdated'

export const dynamicParams = false

export function generateStaticParams() {
  return books.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const book = getBookBySlug(params.slug)
  if (!book) return {}
  return {
    title: `${book.title} — Review & Samenvatting | BesteBroker.be`,
    description: `Review van "${book.title}" door ${book.author}. ${book.shortDescription}`,
    openGraph: {
      title: `${book.title} — Review`,
      url: `https://www.bestebroker.be/boeken/${book.slug}`,
      locale: 'nl_BE',
      type: 'article',
    },
    alternates: { canonical: `https://www.bestebroker.be/boeken/${book.slug}` },
  }
}

export default function BookSlugPage({ params }: { params: { slug: string } }) {
  const book = getBookBySlug(params.slug)
  if (!book) notFound()

  const bookJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: { '@type': 'Person', name: book.author },
    isbn: book.isbn,
    inLanguage: book.language,
    publisher: { '@type': 'Organization', name: book.publisher },
    datePublished: book.year.toString(),
    offers: {
      '@type': 'Offer',
      price: book.priceEur.toFixed(2),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: bolLink(book.bolUrl),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Boeken', href: '/boeken' }, { label: book.title }])) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Boeken', href: '/boeken' }, { label: book.title }]} />

        {book.authorNote && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-xl text-sm text-amber-900">
            <strong>ℹ Transparantienota:</strong> {book.authorNote}
          </div>
        )}

        <div className="mb-8">
          <BookCard book={book} variant="full" />
        </div>

        <div className="prose-custom max-w-3xl">
          <LastUpdated date={book.lastVerified} />

          <h2>Waarom relevant voor Belgische beleggers?</h2>
          <p>{book.whyBelgium}</p>

          <h2>Over het boek</h2>
          <p>{book.shortDescription}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/boeken', label: 'Alle beleggingsboeken', sub: 'Bekijk het volledige overzicht' },
            { href: '/beste-broker-belgie', label: 'Broker vergelijken', sub: 'Kies de juiste broker voor jouw strategie' },
          ].map(({ href, label, sub }) => (
            <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
              <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label}</p>
              <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
