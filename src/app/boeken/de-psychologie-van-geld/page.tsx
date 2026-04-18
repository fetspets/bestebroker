import type { Metadata } from 'next'
import Link from 'next/link'
import { getBookById } from '@/data/books'
import { BookCard } from '@/components/book/BookCard'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { bolLink } from '@/lib/affiliateLinks'
import { LastUpdated } from '@/components/ui/LastUpdated'

const book = getBookById('psychologie-geld-nl')!

export const metadata: Metadata = {
  title: 'De Psychologie van Geld — Review & Samenvatting | BesteBroker.be',
  description:
    'Review van "De psychologie van geld" door Morgan Housel. Waarom gedrag belangrijker is dan kennis bij beleggen — en wat dat betekent voor Belgische beleggers.',
  openGraph: {
    title: 'De Psychologie van Geld — Review',
    url: 'https://bestebroker.be/boeken/de-psychologie-van-geld',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/boeken/de-psychologie-van-geld' },
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
    url: bolLink(book.bolUrl),
  },
}

export default function PsychologieVanGeldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Boeken', href: '/boeken' }, { label: 'De psychologie van geld' }])) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Boeken', href: '/boeken' }, { label: 'De psychologie van geld' }]} />

        <div className="mb-8">
          <BookCard book={book} variant="full" />
        </div>

        <div className="prose-custom max-w-3xl">
          <LastUpdated date={book.lastVerified} />

          <h2>Waarom dit boek?</h2>
          <p>
            Morgan Housel laat zien dat financieel succes minder afhankelijk is van kennis en intelligentie
            dan van gedrag. En gedrag is moeilijk te controleren — zeker als de beurs daalt en je ziet hoe
            jouw portefeuille 30% krimpt in een paar weken.
          </p>
          <p>
            Dit boek is geen handleiding over HOE je belegt. Het gaat over WAAROM mensen slechte
            financiële beslissingen nemen — en hoe je dat bij jezelf kunt herkennen en vermijden.
          </p>

          <h2>Kernlessen</h2>
          <ul>
            <li><strong>Rijkdom is wat je niet ziet.</strong> Het is het geld dat je niet uitgeeft, niet de auto die je rijdt.</li>
            <li><strong>Redelijk &gt; rationeel.</strong> Een strategie die je kunt volhouden is beter dan de theoretisch optimale strategie die je op slechte momenten verlaat.</li>
            <li><strong>Tijdshorizon is alles.</strong> Samengesteld rendement heeft tijd nodig — maar de meeste mensen zijn te ongeduldig.</li>
            <li><strong>Vrijheid is het ultieme doel.</strong> Geld is een middel om controle te krijgen over je eigen tijd.</li>
          </ul>

          <h2>Relevant voor Belgische beleggers</h2>
          <p>
            Veel Belgische beleggers hebben te veel geld op spaarrekeningen staan — niet uit gebrek aan
            kennis, maar uit angst of uitstelgedrag. Dit boek helpt je die psychologische drempels
            te begrijpen en te overwinnen.
          </p>
          <p>
            Combineer het met een praktisch boek zoals{' '}
            <Link href="/boeken/de-hangmatbelegger" className="text-accent hover:underline">De hangmatbelegger</Link>{' '}
            voor een compleet beeld.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/boeken/de-hangmatbelegger', label: 'De hangmatbelegger', sub: 'Praktische gids voor Belgische ETF-beleggers' },
            { href: '/boeken', label: 'Alle beleggingsboeken', sub: 'Bekijk het volledige overzicht' },
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
