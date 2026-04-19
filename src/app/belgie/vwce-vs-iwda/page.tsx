import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { LastUpdated } from '@/components/ui/LastUpdated'

export const metadata: Metadata = {
  title: 'VWCE vs IWDA — Welke ETF voor Belgische belegger?',
  description:
    'VWCE of IWDA kopen als Belgische belegger? Vergelijking van TER, spreiding, TOB-impact, accumulerend vs distribuerend en onze conclusie voor 2026.',
  openGraph: {
    title: 'VWCE vs IWDA — Welke ETF kiezen als Belgische belegger?',
    description: 'Vergelijking van VWCE en IWDA: TER, spreiding, TOB-impact en conclusie voor Belgische buy-and-hold beleggers in 2026.',
    url: 'https://bestebroker.be/belgie/vwce-vs-iwda',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/belgie/vwce-vs-iwda' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wat is het verschil tussen VWCE en IWDA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VWCE (Vanguard FTSE All-World) belegt wereldwijd inclusief opkomende markten (~10%). IWDA (iShares MSCI World) belegt enkel in ontwikkelde landen. VWCE heeft een iets hogere TER (0,22% vs 0,20%) maar bredere spreiding. Voor Belgische buy-and-hold beleggers is VWCE de meest complete keuze.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welke ETF betaalt minder TOB — VWCE of IWDA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beide betalen 0,12% TOB bij aankoop en verkoop in België. Er is geen verschil in TOB tussen VWCE en IWDA.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is VWCE of IWDA beter voor de meerwaardebelasting 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beide ETFs zijn accumulerend (geen uitkerende dividenden) en UCITS-conform. Ze worden gelijk behandeld voor de meerwaardebelasting: 10% op meerwaarden boven €10.000 vrijstelling. Er is geen fiscaal verschil tussen VWCE en IWDA voor de meerwaardebelasting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kan ik VWCE of IWDA kopen via Belgische brokers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Zowel VWCE als IWDA zijn beschikbaar bij Saxo Bank, Bolero, MeDirect en DEGIRO. Bij Saxo en Bolero kun je ze opnemen in een automatisch spaarplan.',
      },
    },
  ],
}

const breadcrumbs = breadcrumbJsonLd([
  { label: 'België', href: '/belgie/tob-uitleg' },
  { label: 'VWCE vs IWDA' },
])

const rows = [
  { label: 'Volledige naam', vwce: 'Vanguard FTSE All-World UCITS ETF', iwda: 'iShares Core MSCI World UCITS ETF' },
  { label: 'ISIN', vwce: 'IE00B3RBWM25', iwda: 'IE00B4L5Y983' },
  { label: 'TER (jaarlijkse kosten)', vwce: '0,22%', iwda: '0,20%' },
  { label: 'Spreiding (landen)', vwce: '~49 landen', iwda: '~23 landen' },
  { label: 'Opkomende markten', vwce: '✅ ~10%', iwda: '❌ Niet inbegrepen' },
  { label: 'Aantal bedrijven', vwce: '~3.700', iwda: '~1.400' },
  { label: 'Type', vwce: 'Accumulerend', iwda: 'Accumulerend' },
  { label: 'TOB (aankoop/verkoop)', vwce: '0,12%', iwda: '0,12%' },
  { label: 'Beheerder', vwce: 'Vanguard', iwda: 'BlackRock (iShares)' },
  { label: 'Beurs notering', vwce: 'Xetra / Euronext AMS', iwda: 'Xetra / Euronext AMS' },
  { label: 'Fondsgrootte', vwce: '>€20 mrd', iwda: '>€60 mrd' },
]

export default function VwceVsIwdaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'België', href: '/belgie/tob-uitleg' }, { label: 'VWCE vs IWDA' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            VWCE vs IWDA — Welke ETF kiezen als Belgische belegger?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            VWCE en IWDA zijn de twee meest populaire ETFs voor Belgische beleggers. Ze lijken sterk op elkaar,
            maar er zijn belangrijke verschillen in spreiding, kosten en strategie. Wij zetten alles eerlijk
            naast elkaar zodat jij de juiste keuze maakt.
          </p>
          <LastUpdated date="2026-04-01" />
        </header>

        {/* Verdict */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="card border-l-4 border-l-blue-500">
            <p className="text-xs font-semibold text-blue-600 mb-1">VWCE — Onze aanbeveling voor de meeste beleggers</p>
            <p className="font-display font-bold text-primary text-lg">Maximale spreiding</p>
            <p className="text-sm text-gray-600 mt-1">Inclusief opkomende markten. Één ETF voor de hele wereld. Iets hogere TER (0,22%).</p>
          </div>
          <div className="card border-l-4 border-l-green-500">
            <p className="text-xs font-semibold text-green-600 mb-1">IWDA — Goed alternatief</p>
            <p className="font-display font-bold text-primary text-lg">Ontwikkelde landen</p>
            <p className="text-sm text-gray-600 mt-1">Lager TER (0,20%), alleen westerse markten. Combineer met EMIM voor volledige spreiding.</p>
          </div>
        </div>

        {/* Vergelijkingstabel */}
        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel VWCE vs IWDA</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 text-gray-600 font-semibold">Kenmerk</th>
                  <th className="text-center py-3 font-semibold text-blue-600">VWCE</th>
                  <th className="text-center py-3 font-semibold text-green-600">IWDA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map(({ label, vwce, iwda }) => (
                  <tr key={label}>
                    <td className="py-2.5 font-medium text-gray-700">{label}</td>
                    <td className="py-2.5 text-center text-gray-600">{vwce}</td>
                    <td className="py-2.5 text-center text-gray-600">{iwda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Spreiding: wereld vs ontwikkelde landen</h2>
          <p>
            Het grootste verschil tussen VWCE en IWDA zit in de geografische spreiding.
            VWCE volgt de FTSE All-World index en belegt in <strong>∼49 landen</strong>, inclusief opkomende
            markten zoals China, India, Brazilië en Taiwan — samen goed voor ±10% van de index.
          </p>
          <p>
            IWDA volgt de MSCI World index en belegt enkel in <strong>∼23 ontwikkelde landen</strong>:
            VS, Europa, Japan, Australië, Canada, etc. Opkomende markten ontbreken volledig.
          </p>
          <p>
            <strong>Praktisch gevolg:</strong> VWCE is meer gediversifieerd. IWDA heeft een hogere blootstelling
            aan de VS (∼70% van de index) en westerse technologiebedrijven.
          </p>

          <h2>TER — Het kostenverschil</h2>
          <p>
            VWCE kost <strong>0,22% per jaar</strong>, IWDA <strong>0,20% per jaar</strong>.
            Op een portefeuille van €10.000 is dat €22 vs €20 per jaar — een verschil van €2.
            Op lange termijn (20 jaar) loopt dit op tot ∼€70 verschil bij gelijk rendement.
          </p>
          <p>
            Dat verschil is <strong>verwaarloosbaar</strong> voor buy-and-hold beleggers. De bredere spreiding
            van VWCE weegt zwaarder dan €2 per €10.000 per jaar.
          </p>

          <h2>Accumulerend vs distribuerend — het belang voor Belgische beleggers</h2>
          <p>
            Zowel VWCE als IWDA bestaan in een <strong>accumulerende versie</strong> (Acc).
            Bij accumulerende ETFs worden dividenden automatisch herbelegd in het fonds — je ontvangt
            geen dividenduitkering.
          </p>
          <p>
            Dit is fiscaal voordelig voor Belgische beleggers: geen roerende voorheffing van 30% op dividenden,
            geen administratie. Let op: koop altijd de versie met <strong>&quot;Acc&quot;</strong> in de naam.
          </p>
          <p>
            VWCE heeft ook een distribuerend variant (VWRL). <strong>Koop niet VWRL als Belgische belegger</strong>
            — je betaalt dan 30% RV op elk dividend. IWDA heeft uitsluitend een accumulerende versie.
          </p>

          <h2>TOB-impact voor Belgische beleggers</h2>
          <p>
            Beide ETFs betalen <strong>0,12% TOB</strong> bij aankoop én verkoop op Belgische of Europese beurzen.
            Er is geen verschil in TOB tussen VWCE en IWDA.
          </p>
          <p>
            Meer over de TOB:{' '}
            <Link href="/belgie/tob-uitleg" className="text-accent underline">TOB uitgelegd voor Belgische beleggers</Link>.
          </p>

          <h2>Meerwaardebelasting 2026</h2>
          <p>
            Vanaf 2026 geldt een meerwaardebelasting van 10% op meerwaarden boven €10.000 per jaar.
            Beide ETFs worden hiervoor op exact dezelfde manier behandeld. Er is geen fiscaal voordeel
            van VWCE boven IWDA of omgekeerd voor de meerwaardebelasting.
          </p>
          <p>
            Meer info:{' '}
            <Link href="/belgie/meerwaardebelasting-2026-uitleg" className="text-accent underline">Meerwaardebelasting 2026 uitgelegd</Link>.
          </p>

          <h2>Via welke broker koop je VWCE of IWDA?</h2>
          <p>
            Beide ETFs zijn beschikbaar bij alle grote Belgische brokers. Onze aanbevelingen:
          </p>
          <ul>
            <li>
              <strong>Saxo Bank</strong> — beschikbaar in AutoInvest spaarplan voor €2/maand.
              {' '}<Link href="/reviews/saxo-bank-belgie" className="text-accent underline">Saxo review</Link>
            </li>
            <li>
              <strong>Bolero</strong> — VWCE staat in de Playlist (lagere kosten).
              {' '}<Link href="/reviews/bolero" className="text-accent underline">Bolero review</Link>
            </li>
            <li>
              <strong>MeDirect</strong> — gratis ETF-transacties, geen spaarplan.
              {' '}<Link href="/reviews/medirect" className="text-accent underline">MeDirect review</Link>
            </li>
          </ul>

          <h2>Onze conclusie</h2>
          <p>
            Voor de <strong>meeste Belgische beleggers is VWCE de beste keuze</strong>: maximale spreiding,
            inclusief opkomende markten, accumulerend en fiscaal efficiënt. Het TER-verschil van 0,02%
            ten opzichte van IWDA is verwaarloosbaar.
          </p>
          <p>
            Kies IWDA als je bewust opkomende markten wil uitsluiten (bijv. om geopolitieke redenen) of
            als je zelf een twee-ETF-portefeuille wil bouwen (IWDA + EMIM). Voor beginners raden we aan:
            hou het eenvoudig — VWCE alleen volstaat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/belgie/etf-kopen-beginners', label: 'Hoe koop je een ETF in België?' },
            { href: '/beste-etf-broker-belgie', label: 'Beste ETF-broker voor Belgen' },
            { href: '/belgie/tob-uitleg', label: 'TOB uitgelegd' },
            { href: '/belgie/meerwaardebelasting-2026-uitleg', label: 'Meerwaardebelasting 2026' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="card hover:shadow-md transition-shadow group">
              <p className="font-semibold text-primary group-hover:text-accent transition-colors">{label} →</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
