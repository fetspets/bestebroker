import { books } from '@/data/books'
import { BookCard } from './BookCard'
import Link from 'next/link'

interface Props {
  bookIds: string[]
}

export function BookRecommendationBlock({ bookIds }: Props) {
  const selectedBooks = bookIds
    .slice(0, 2)
    .map(id => books.find(b => b.id === id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b))

  if (selectedBooks.length === 0) return null

  return (
    <aside className="mt-8 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-primary text-lg">
          📚 Aanbevolen lectuur
        </h3>
        <Link href="/boeken" className="text-sm text-accent hover:underline">
          Alle boeken →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {selectedBooks.map(book => (
          <BookCard key={book.id} book={book} variant="compact" />
        ))}
      </div>
    </aside>
  )
}
