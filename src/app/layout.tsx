import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import { ConsentManager } from '@/components/consent/ConsentManager'
import { Analytics } from '@vercel/analytics/next'
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
  metadataBase: new URL('https://www.bestebroker.be'),
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
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'NusW-oiW500SvFL70RLpPz-dziM3SnauNfJV2IgdVE0',
  },
  icons: {
    icon: [
      { url: '/img/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/img/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${fraunces.variable} ${dmSans.variable}`}>
      <head>
        {/* Impact requires non-standard `value` attribute; spread as any to bypass TS */}
        <meta name="impact-site-verification" {...({ value: '3d125505-4102-4e5b-8926-0655fd4c139e' } as any)} />
        {/* Daisycon site-verificatie (media 443234) */}
        <meta name="c4c50f11317f516" content="ed774a31a90d2a1e1e9dd48a94c9f01b" />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-accent text-white px-4 py-2 rounded z-[100] font-semibold"
        >
          Naar hoofdinhoud
        </a>
        <Header />
<main id="main-content" className="flex-1">{children}</main>
        <Footer />
        {/* Vercel Web Analytics: telt alle bezoekers zonder cookies (geen toestemming nodig) */}
        <Analytics />
        <ConsentManager
          gaId="G-DW19T9YTX1"
          impactSrc="https://utt.impactcdn.com/P-A3156055-c1b3-48e7-b323-0b6e5e0452691.js"
        />
      </body>
    </html>
  )
}
