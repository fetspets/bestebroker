import type { Metadata } from 'next'
import { books } from '@/data/books'
import { BookCard } from '@/components/book/BookCard'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { LastUpdated } from '@/components/ui/LastUpdated'

export const metadata: Metadata = {
  title: 'Beste Beleggingsboeken voor Belgische Beleggers 2026',
  description:
    'De beste Nederlandstalige en Engelstalige beleggingsboeken voor Belgische beleggers. Van beginners tot gevorderden, van mindset tot ETF-strategie.',
  openGraph: {
    title: 'Beste Beleggingsboeken voor Belgische Beleggers',
    url: 'https://bestebroker.be/boeken',
    locale: 'nl_BE',
    type: 'website',
  },
  alternates: { canonical: 'https://bestebroker.be/boeken' },
}

const categories = [
  { id: 'beginners', label: '🌱 Voor beginners', ids: ['hangmatbelegger', 'psychologie-geld-nl', 'jong-beleggen', 'beleggen-zonder-stress'] },
  { id: 'etf', label: '📊 ETF-beleggen', ids: ['hangmatbelegger', 'beleggen-doe-je-zo', 'beleggen-zonder-stress'] },
  { id: 'mindset', label: '🧠 Mindset & gedrag', ids: ['psychologie-geld-nl', 'psychology-of-money-en'] },
  { id: 'gevorderd', label: '📈 Gevorderden', ids: ['intelligente-belegger', 'thomas-guenter'] },
  { id: 'belgisch', label: '🇧🇪 Belgisch specifiek', ids: ['hangmatbelegger', 'jong-beleggen', 'thomas-guenter'] },
]

export default function BoekenPage() {
  return (
    <div className="section-container py-10">
      <BreadcrumbNav items={[{ label: 'Boeken' }]} />

      <header className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
          Beste beleggingsboeken voor Belgische beleggers
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-4">
          Geen willekeurige lijst — wij selecteren enkel boeken die relevant zijn voor de Belgische context.
          Elk boek krijgt een toelichting waarom het nuttig is voor jou als Belgische belegger.
        </p>
        <div className="flex items-center gap-3">
          <LastUpdated date="2026-04-01" />
          <span className="text-gray-300">·</span>
          <p className="text-sm text-gray-500">
            Wij ontvangen een kleine commissie via bol.com. Meer info in onze{' '}
            <a href="/disclaimer" className="text-accent hover:underline">disclaimer</a>.
          </p>
        </div>
      </header>

      {/* All books grid */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-primary mb-6">Alle aanbevolen boeken</h2>
        <div className="grid grid-cols-1 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book} variant="full" />
          ))}
        </div>
      </section>

      {/* By category */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-6">Per categorie</h2>
        <div className="space-y-8">
          {categories.map(({ id, label, ids }) => {
            const catBooks = ids.map(bid => books.find(b => b.id === bid)).filter(Boolean) as typeof books
            return (
              <div key={id}>
                <h3 className="font-display font-semibold text-xl text-primary mb-4">{label}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catBooks.map(book => (
                    <div key={book.id} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-accent transition-colors">
                      <div className="w-12 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center text-2xl">📚</div>
                      <div>
                        <a href={`/boeken/${book.slug}`} className="font-semibold text-primary hover:text-accent block">{book.title}</a>
                        <p className="text-sm text-gray-500">{book.author}</p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{book.shortDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
