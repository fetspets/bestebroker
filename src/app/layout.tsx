import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bestebroker.be'),
  title: {
    default: 'Beste Broker België 2026 — Eerlijke Vergelijking | BesteBroker.be',
    template: '%s | BesteBroker.be',
  },
  description:
    'Vergelijk de beste brokers in België voor 2026. Onafhankelijk, Nederlandstalig, met diepgaande Belgische fiscale analyse. TOB, meerwaardebelasting, bewaarloon — alles uitgelegd.',
  openGraph: {
    siteName: 'BesteBroker.be',
    locale: 'nl_BE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
