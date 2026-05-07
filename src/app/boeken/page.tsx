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
    url: 'https://www.bestebroker.be/boeken',
    locale: 'nl_BE',
    type: 'website',
  },
  alternates: { canonical: 'https://www.bestebroker.be/boeken' },
}

const categories = [
  { id: 'beginners', label: '🌱 Voor beginners', ids: ['hangmatbelegger', 'psychology-of-money-nl', 'jong-beleggen', 'rich-dad-poor-dad', 'simple-path-to-wealth'] },
  { id: 'etf', label: '📊 ETF-beleggen', ids: ['hangmatbelegger', 'beleggen-doe-je-zo', 'random-walk-down-wall-street', 'simple-path-to-wealth'] },
  { id: 'mindset', label: '🧠 Mindset & gedrag', ids: ['psychology-of-money-nl', 'meer-geld-minder-stress', 'rich-dad-poor-dad'] },
  { id: 'gevorderd', label: '📈 Gevorderden', ids: ['intelligente-belegger', 'thomas-guenter', 'fire-charlotte-van-brabander', 'one-up-on-wall-street', 'random-walk-down-wall-street'] },
  { id: 'belgisch', label: '🇧🇪 Belgisch specifiek', ids: ['hangmatbelegger', 'jong-beleggen', 'thomas-guenter', 'fire-charlotte-van-brabander', 'meer-geld-minder-stress'] },
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
        </div>
      </header>

      {/* Quiz CTA */}
      <section className="mb-10 p-5 md:p-6 rounded-2xl border-2 border-accent/30 bg-gradient-to-r from-accent/10 to-accent/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">Gratis · 2 minuten</p>
            <h2 className="font-display text-lg font-bold text-primary mb-1">
              Weet je niet welk boek bij jou past?
            </h2>
            <p className="text-sm text-gray-600">
              Beantwoord 10 vragen en ontdek jouw persoonlijke aanbeveling uit 12 boeken.
            </p>
          </div>
          <a href="/boeken/quiz" className="btn-primary whitespace-nowrap flex-shrink-0">
            Doe de quiz →
          </a>
        </div>
      </section>

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
                      <div className="w-12 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {book.coverImageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={book.coverImageUrl} alt={`Omslag ${book.title}`} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">📚</span>
                        )}
                      </div>
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
