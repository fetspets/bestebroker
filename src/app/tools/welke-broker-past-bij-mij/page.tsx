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
    url: 'https://bestebroker.be/tools/welke-broker-past-bij-mij',
    locale: 'nl_BE',
    type: 'website',
  },
  alternates: { canonical: 'https://bestebroker.be/tools/welke-broker-past-bij-mij' },
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

      <div className="mt-12 pt-8 border-t border-gray-200 prose-custom max-w-2xl mx-auto">
        <h2 className="text-center">Waarom wij dit gratis aanbieden</h2>
        <p>
          Wij ontvangen een affiliate vergoeding als je via onze links een account opent.
          Dat motiveert ons om je naar de <em>beste</em> broker te sturen — niet de duurste.
          Een broker die slecht bij jou past en waarvoor je snel stopt, levert ons ook niets op.
        </p>
        <p>
          Wil je de volledige onderbouwing zien? Lees onze{' '}
          <Link href="/methodologie" className="text-accent hover:underline">methodologie</Link>{' '}
          en <Link href="/beste-broker-belgie" className="text-accent hover:underline">volledige vergelijking</Link>.
        </p>
      </div>
    </div>
  )
}
