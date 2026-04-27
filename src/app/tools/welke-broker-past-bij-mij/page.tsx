import type { Metadata } from 'next'
import { BrokerWizard } from '@/components/tools/BrokerWizard'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Welke Broker Past bij Mij? — Gratis Broker-Quiz voor Belgen',
  description:
    'Beantwoord 4 vragen en ontdek welke broker het beste bij jouw situatie past. Gratis, onafhankelijk en specifiek voor Belgische beleggers.',
  openGraph: {
    title: 'Welke broker past bij mij?',
    url: 'https://www.bestebroker.be/tools/welke-broker-past-bij-mij',
    locale: 'nl_BE',
    type: 'website',
  },
  alternates: { canonical: 'https://www.bestebroker.be/tools/welke-broker-past-bij-mij' },
}

export default function WelkeBrokerPage() {
  return (
    <div className="section-container py-10">
      <BreadcrumbNav items={[{ label: 'Tools' }, { label: 'Welke broker past bij mij?' }]} />

      <header className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
          Welke broker past bij jou?
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Beantwoord 4 vragen en we geven je een persoonlijke aanbeveling — geen account vereist,
          geen e-mailadres, gewoon eerlijk advies.
        </p>
      </header>

      <BrokerWizard />

    </div>
  )
}
