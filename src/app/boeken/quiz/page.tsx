import type { Metadata } from 'next'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { BookQuiz } from '@/components/book/BookQuiz'

export const metadata: Metadata = {
  title: 'Welk beleggingsboek past bij jou? — Quiz | BesteBroker.be',
  description:
    'Beantwoord 10 vragen en ontdek welk beleggingsboek het beste past bij jouw ervaring, doelen en leerstijl. Gratis persoonlijk advies.',
  openGraph: {
    title: 'Welk beleggingsboek past bij jou? — Quiz',
    url: 'https://www.bestebroker.be/boeken/quiz',
    locale: 'nl_BE',
    type: 'website',
  },
  alternates: { canonical: 'https://www.bestebroker.be/boeken/quiz' },
}

export default function BookQuizPage() {
  return (
    <div className="section-container py-10">
      <BreadcrumbNav items={[{ label: 'Boeken', href: '/boeken' }, { label: 'Quiz' }]} />
      <BookQuiz />
    </div>
  )
}
