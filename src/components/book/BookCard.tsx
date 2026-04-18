import Link from 'next/link'
import type { Book } from '@/data/books'
import { bolLink } from '@/lib/affiliateLinks'

interface Props {
  book: Book
  variant?: 'full' | 'compact'
}

const audienceLabels: Record<string, string> = {
  beginners: 'Beginners',
  'etf-beleggers': 'ETF-beleggers',
  gevorderd: 'Gevorderd',
  mindset: 'Mindset',
  'belgisch-specifiek': 'Belgisch',
  jongeren: 'Jongeren',
}

export function BookCard({ book, variant = 'full' }: Props) {
  const affiliateUrl = bolLink(book.bolUrl)

  if (variant === 'compact') {
    return (
      <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-accent transition-colors">
        <div className="w-12 h-16 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
          {book.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={book.coverImageUrl} alt={`Omslag ${book.title}`} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl">📚</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <Link href={`/boeken/${book.slug}`} className="font-semibold text-primary hover:text-accent line-clamp-1">
            {book.title}
          </Link>
          <p className="text-sm text-gray-500">{book.author}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-accent font-semibold text-sm">€{book.priceEur.toFixed(2)}</span>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-xs bg-accent text-white px-2.5 py-1 rounded-lg hover:bg-opacity-90 font-medium"
            >
              Bekijk op bol.com →
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className="card hover:shadow-md transition-shadow">
      <div className="flex gap-5">
        {/* Cover */}
        <div className="w-24 h-32 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
          {book.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={book.coverImageUrl} alt={`Omslag ${book.title}`} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl">📚</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-1 mb-2">
            {book.targetAudience.map(a => (
              <span key={a} className="badge badge-accent text-xs">
                {audienceLabels[a] ?? a}
              </span>
            ))}
            <span className="badge bg-gray-100 text-gray-600 text-xs">
              {book.language.toUpperCase()}
            </span>
          </div>

          <Link href={`/boeken/${book.slug}`}>
            <h3 className="font-display font-bold text-lg text-primary hover:text-accent transition-colors">
              {book.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500">{book.author} · {book.year}</p>

          <p className="text-sm text-gray-700 mt-2 line-clamp-2">{book.shortDescription}</p>

          {book.authorNote && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 mt-2">
              ℹ {book.authorNote}
            </p>
          )}

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <div>
              <span className="text-accent font-bold text-lg">€{book.priceEur.toFixed(2)}</span>
              {book.priceEbook && (
                <span className="text-xs text-gray-500 ml-2">ebook €{book.priceEbook.toFixed(2)}</span>
              )}
            </div>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary text-sm py-2"
            >
              Bekijk op bol.com →
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Wij ontvangen een kleine commissie via bol.com. Meer info in onze{' '}
            <Link href="/disclaimer" className="underline">disclaimer</Link>.
          </p>
        </div>
      </div>
    </article>
  )
}
