import type { Metadata } from 'next'
import Link from 'next/link'
import { getBookById } from '@/data/books'
import { BookCard } from '@/components/book/BookCard'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { bolLink } from '@/lib/affiliateLinks'
import { LastUpdated } from '@/components/ui/LastUpdated'

const book = getBookById('hangmatbelegger')!

export const metadata: Metadata = {
  title: 'De Hangmatbelegger — Review & Samenvatting voor Belgische Beleggers',
  description:
    'Review van "De Hangmatbelegger" door Jonas Deprez. Hét Nederlandstalige standaardwerk over passief beleggen in België. Inclusief noot over de auteur.',
  openGraph: {
    title: 'De Hangmatbelegger — Review',
    url: 'https://bestebroker.be/boeken/de-hangmatbelegger',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/boeken/de-hangmatbelegger' },
}

const bookJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  author: { '@type': 'Person', name: book.author },
  isbn: book.isbn,
  inLanguage: 'nl',
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

const breadcrumbs = breadcrumbJsonLd([
  { label: 'Boeken', href: '/boeken' },
  { label: 'De hangmatbelegger' },
])

export default function HangmatbeleggerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Boeken', href: '/boeken' }, { label: 'De hangmatbelegger' }]} />

        {/* Author note — prominent */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-xl text-sm text-amber-900">
          <strong>ℹ Transparantienota:</strong> de auteur Jonas Deprez is co-oprichter van{' '}
          <strong>Curvo</strong>, een Belgisch beleggingsplatform dat concurreert met de brokers die wij
          vergelijken. Wij bevelen dit boek aan op basis van de <em>inhoudskwaliteit</em> — niet op basis
          van zijn broker-aanbevelingen. Lees de broker-aanbevelingen in het boek kritisch.
        </div>

        <div className="mb-8">
          <BookCard book={book} variant="full" />
        </div>

        <div className="prose-custom max-w-3xl">
          <LastUpdated date={book.lastVerified} />

          <h2>Waarom wij dit boek aanbevelen</h2>
          <p>
            &quot;De hangmatbelegger&quot; is het meest complete Nederlandstalige boek over passief beleggen
            dat specifiek gericht is op de Belgische context. De auteur behandelt niet enkel de <em>hoe</em>
            van ETF-beleggen, maar ook de Belgische fiscale realiteit: TOB, roerende voorheffing en het
            Reynders-mechanisme.
          </p>
          <p>
            Het boek is toegankelijk geschreven voor beginners maar bevat genoeg diepgang voor beleggers
            die al enige ervaring hebben. De stijl is Nederlandstalig en herkenbaar voor Belgische lezers.
          </p>

          <h2>Wat leer je uit dit boek?</h2>
          <ul>
            <li>Waarom passief beleggen voor de meeste mensen beter werkt dan actief beleggen</li>
            <li>Hoe ETFs werken en welke types er zijn (accumulerend vs distribuerend)</li>
            <li>De Belgische fiscale behandeling van ETFs (TOB, RV, Reynders)</li>
            <li>Hoe je een portefeuille opbouwt die past bij jouw risicobereidheid</li>
            <li>Praktische stappen om te beginnen met beleggen in België</li>
          </ul>

          <h2>Kanttekening: broker-aanbevelingen</h2>
          <p>
            Omdat de auteur co-oprichter is van Curvo, bevat het boek logischerwijs positieve verwijzingen
            naar dat platform. Curvo is een valabele keuze, maar niet de enige — en voor sommige beleggers
            niet de goedkoopste. Vergelijk altijd zelf via onze{' '}
            <Link href="/beste-broker-belgie" className="text-accent hover:underline">brokervergelijking</Link>{' '}
            voor je een keuze maakt.
          </p>

          <h2>Voor wie is dit boek?</h2>
          <p>
            Ideaal voor Belgische beleggers die <strong>net beginnen</strong> of die al een tijdje beleggen
            maar nog nooit een systematische uitleg hebben gekregen over de fiscale context in België.
            Ook nuttig als cadeau voor iemand die wil starten met beleggen.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/beste-broker-belgie', label: 'Brokers vergelijken', sub: 'Welke broker past bij jouw strategie?' },
            { href: '/tools/welke-broker-past-bij-mij', label: 'Broker-quiz', sub: 'Persoonlijke aanbeveling in 4 vragen' },
            { href: '/boeken', label: 'Andere beleggingsboeken', sub: 'Meer aanbevolen lectuur' },
            { href: '/belgie/tob-uitleg', label: 'TOB uitgelegd', sub: 'De taks op beursverrichtingen in detail' },
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
