import type { Metadata } from 'next'
import Link from 'next/link'
import { getBrokerById } from '@/data/brokers'
import { LastUpdated } from '@/components/ui/LastUpdated'
import { BreadcrumbNav, breadcrumbJsonLd } from '@/components/layout/BreadcrumbNav'
import { goLink } from '@/lib/affiliateLinks'
import { AffiliateLabel } from '@/components/ui/AffiliateLabel'
import { Bronnen, articleJsonLd, type Bron } from '@/components/ui/Bronnen'

const bolero = getBrokerById('bolero')!
const saxo = getBrokerById('saxo')!

const NAGEKEKEN = '2026-10-22'
const URL = 'https://www.bestebroker.be/vergelijking/bolero-vs-saxo'
const TITLE = 'Bolero vs Saxo (2026): kosten, spaarplan en taksen'
const DESCRIPTION =
  'Bolero of Saxo? Transactiekosten per orderbedrag, AutoInvest of periodiek beleggen, overdrachtkosten en bescherming. Met bronnen, oktober 2026.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, locale: 'nl_BE', type: 'article' },
  alternates: { canonical: URL },
}

const BRON = {
  boleroTarieven: 'https://www.bolero.be/uploads/media/667ecf0aabd9a/101-tarieven-nl.pdf',
  boleroReview: 'https://curvo.eu/nl/artikel/bolero-review',
  saxoRekening: 'https://www.home.saxo/nl-be/accounts/individual',
  saxoAutoInvest: 'https://www.home.saxo/nl-be/products/autoinvest',
  saxoReview: 'https://curvo.eu/nl/artikel/saxo-bank-review',
  spaarplannen: 'https://curvo.eu/article/best-etf-savings-plan-belgium',
}

const rows: { label: string; bolero: string; saxo: string }[] = [
  { label: 'Wie is het?', bolero: 'Online broker van KBC Bank (Belgische bank)', saxo: 'Belgisch bijkantoor van Saxo Bank A/S (Denemarken)' },
  { label: 'Transactiekost aandelen en ETF’s op Euronext', bolero: '€2,50 tot €250 · €5 tot €1.000 · €7,50 tot €2.500 · daarboven €15 per €10.000 (max. €50 tot €70.000)', saxo: '0,08% met minimum €2 (standaardniveau Brons)' },
  { label: 'Automatisch spaarplan', bolero: 'Periodiek beleggen, enkel hele stuks; je stort zelf het geld vooraf', saxo: 'AutoInvest: €2 per maand voor de aankopen' },
  { label: 'Bewaarloon', bolero: 'Geen', saxo: 'Geen' },
  { label: 'Belgische taksen (TOB, roerende voorheffing, Reynders, meerwaardebelasting)', bolero: 'Ingehouden door Bolero', saxo: 'Ingehouden door Saxo' },
  { label: 'Securities lending (effecten uitlenen)', bolero: 'Nee', saxo: 'Enkel als je er zelf voor kiest (opt-in)' },
  { label: 'Bescherming effecten / cash', bolero: '€20.000 / €100.000', saxo: '€20.000 / €100.000 (Deens garantiefonds)' },
  { label: 'Effecten overzetten naar een andere bank', bolero: '€50 per lijn (gratis naar KBC/CBC)', saxo: '€75 per lijn' },
]

// Kosten van één aankoop per maand, zonder beurstaks (die is bij beide gelijk en hangt af van de ETF).
const kosten = [
  { bedrag: '€150', bolero: 2.5, saxoAuto: 2, saxoLos: 2 },
  { bedrag: '€300', bolero: 5, saxoAuto: 2, saxoLos: 2 },
  { bedrag: '€1.000', bolero: 5, saxoAuto: 2, saxoLos: 2 },
  { bedrag: '€2.000', bolero: 7.5, saxoAuto: 2, saxoLos: 2 },
  { bedrag: '€5.000', bolero: 15, saxoAuto: 2, saxoLos: 4 },
]
const eur = (n: number) => `€${n.toFixed(2).replace('.', ',')}`

const faq = [
  {
    q: 'Is Bolero of Saxo goedkoper?',
    a: 'Voor één aankoop per maand is Saxo op elk orderbedrag goedkoper: AutoInvest kost €2 per maand en een losse order 0,08% met minimum €2. Bolero rekent €2,50 tot €250, €5 tot €1.000 en €7,50 tot €2.500. Het verschil loopt van €6 per jaar (bij €150 per maand) tot €66 per jaar (bij €2.000 per maand). De beurstaks is bij beide gelijk.',
  },
  {
    q: 'Wat is het verschil tussen Saxo AutoInvest en het spaarplan van Bolero?',
    a: 'Bij beide stort je zelf het geld op je beleggingsrekening, bijvoorbeeld met een doorlopende overschrijving; geen van beide werkt met een domiciliëring. Saxo AutoInvest kost €2 per maand voor de aankopen. Bij Bolero betaal je het gewone makelaarsloon per order en koop je enkel hele stuks van een ETF.',
  },
  {
    q: 'Houden Bolero en Saxo de Belgische belastingen in?',
    a: 'Ja. Beide houden de beurstaks (TOB), de roerende voorheffing op dividenden, de Reynderstaks en sinds 2026 de meerwaardebelasting in. Je hoeft je rekening niet bij de Nationale Bank te melden.',
  },
  {
    q: 'Leent Saxo mijn aandelen uit?',
    a: 'Enkel als je daar zelf voor kiest: securities lending is bij Saxo opt-in. Bolero leent geen effecten uit.',
  },
  {
    q: 'Wat kost het om van Bolero of Saxo weg te gaan?',
    a: 'Bolero rekent €50 per lijn om effecten naar een andere bank over te zetten (gratis naar KBC of CBC). Saxo rekent €75 per lijn. Met 5 verschillende ETF’s is dat €250 bij Bolero en €375 bij Saxo.',
  },
]

const bronnen: Bron[] = [
  { staaft: 'Transactiekosten, bewaarloon en overdracht Bolero', label: 'Bolero, tarievenlijst S101 (geldig vanaf 11/06/2025)', href: BRON.boleroTarieven },
  { staaft: 'Spaarplan, taksen, bescherming en securities lending Bolero', label: 'Curvo, Bolero review (08/10/2026)', href: BRON.boleroReview },
  { staaft: 'Transactiekosten, bewaarloon en toezicht Saxo', label: 'Saxo België, individuele rekening', href: BRON.saxoRekening },
  { staaft: 'AutoInvest-kost Saxo', label: 'Saxo België, AutoInvest', href: BRON.saxoAutoInvest },
  { staaft: 'Overdrachtkost, securities lending en bescherming Saxo', label: 'Curvo, Saxo Bank review (03/09/2026)', href: BRON.saxoReview },
  { staaft: 'Storting bij AutoInvest en Bolero-spaarplan', label: 'Curvo, ETF-spaarplannen in België (27/07/2026)', href: BRON.spaarplannen },
]

export default function BoleroVsSaxoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Bolero vs Saxo' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ headline: 'Bolero vs Saxo: kosten, spaarplan en belastingen vergeleken', description: DESCRIPTION, url: URL, datePublished: '2026-04-18', dateModified: NAGEKEKEN })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }) }} />

      <div className="section-container py-10">
        <BreadcrumbNav items={[{ label: 'Vergelijkingen', href: '/beste-broker-belgie' }, { label: 'Bolero vs Saxo' }]} />

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Bolero vs Saxo: kosten, spaarplan en belastingen vergeleken
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Bolero en Saxo houden allebei alle Belgische taksen voor je in en rekenen geen bewaarloon. De verschillen
            zitten in de transactiekosten, het spaarplan, het uitlenen van effecten en wat het kost om later te vertrekken.
          </p>
          <LastUpdated date={NAGEKEKEN} label="Laatst nagekeken" />
        </header>

        <section className="card mb-10 border-l-4 border-l-accent" aria-labelledby="kort">
          <h2 id="kort" className="font-display text-xl font-bold text-primary mb-3">In het kort</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li><strong>Kosten:</strong> Saxo rekent 0,08% (minimum €2) per order of €2 per maand met AutoInvest. Bolero rekent €2,50 tot €7,50 per order tot €2.500. Bij één aankoop per maand is Saxo €6 tot €66 per jaar goedkoper.</li>
            <li><strong>Spaarplan:</strong> bij beide stort je zelf het geld. AutoInvest kost een vaste €2 per maand; bij Bolero betaal je per order en koop je hele stuks.</li>
            <li><strong>Uitlenen van effecten:</strong> Bolero doet het niet; bij Saxo enkel als je zelf opt-in kiest.</li>
            <li><strong>Vertrekken:</strong> overzetten kost €50 per lijn bij Bolero en €75 per lijn bij Saxo.</li>
          </ul>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Vergelijkingstabel Bolero en Saxo</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 pr-3 text-gray-600 font-semibold">Criterium</th>
                  <th scope="col" className="text-left py-3 px-2 font-semibold text-red-600">Bolero</th>
                  <th scope="col" className="text-left py-3 pl-2 font-semibold text-blue-700">Saxo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map(({ label, bolero: vb, saxo: vs }) => (
                  <tr key={label}>
                    <th scope="row" className="py-2.5 pr-3 text-left font-medium text-gray-700 align-top">{label}</th>
                    <td className="py-2.5 px-2 text-gray-600 align-top">{vb}</td>
                    <td className="py-2.5 pl-2 text-gray-600 align-top">{vs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Tarieven exclusief beurstaks. Bronnen onderaan deze pagina, nagekeken op 22 oktober 2026.</p>
        </section>

        <section className="card mb-10">
          <h2 className="font-display text-xl font-bold text-primary mb-2">Wat kost één aankoop per maand?</h2>
          <p className="text-sm text-gray-600 mb-4">Makelaarsloon voor één ETF-aankoop per maand op Euronext, zonder beurstaks (die is bij beide brokers gelijk).</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th scope="col" className="text-left py-3 text-gray-600 font-semibold">Bedrag per maand</th>
                  <th scope="col" className="text-center py-3 font-semibold text-red-600">Bolero</th>
                  <th scope="col" className="text-center py-3 font-semibold text-blue-700">Saxo AutoInvest</th>
                  <th scope="col" className="text-center py-3 font-semibold text-blue-700">Saxo losse order</th>
                  <th scope="col" className="text-center py-3 text-gray-600 font-semibold">Verschil per jaar*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {kosten.map(k => (
                  <tr key={k.bedrag}>
                    <th scope="row" className="py-2.5 text-left font-medium text-gray-700">{k.bedrag}</th>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.bolero)}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.saxoAuto)}</td>
                    <td className="py-2.5 text-center text-gray-600">{eur(k.saxoLos)}</td>
                    <td className="py-2.5 text-center text-gray-700 font-medium">{eur((k.bolero - Math.min(k.saxoAuto, k.saxoLos)) * 12)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">* Bolero min de goedkoopste Saxo-optie, × 12 maanden. Saxo losse order = 0,08% met minimum €2. Verkopen kost bij AutoInvest het gewone tarief (minimum €2 per ETF).</p>
        </section>

        <div className="prose-custom max-w-3xl mb-10">
          <h2>Spaarplan: Saxo AutoInvest of periodiek beleggen bij Bolero</h2>
          <p>
            Bij <strong>Saxo AutoInvest</strong> kies je een of meer ETF’s en een maandbedrag. Saxo koopt elke maand op een vaste dag,
            als er genoeg geld op je rekening staat. Je betaalt €2 per maand voor die aankopen, ongeacht het bedrag.
          </p>
          <p>
            Bij <strong>Bolero</strong> plan je een herhalende order (maandelijks tot jaarlijks). Je koopt enkel hele stuks van een ETF
            en betaalt het gewone makelaarsloon per order. Ook hier zet je het geld zelf op je rekening.
          </p>
          <p>
            Geen van beide trekt het geld automatisch van je gewone bankrekening via een domiciliëring. Een doorlopende overschrijving
            bij je eigen bank lost dat op.
          </p>

          <h2>Belastingen: wat regelen ze voor jou?</h2>
          <p>
            Beide brokers houden de <Link href="/belgie/tob-uitleg">beurstaks (TOB)</Link>, de roerende voorheffing, de Reynderstaks en de
            meerwaardebelasting in. Je rekening is Belgisch, dus je hoeft ze niet bij de Nationale Bank te melden. Meer over de nieuwe taks:
            {' '}<Link href="/broker-meerwaardebelasting-2026">meerwaardebelasting 2026 bij brokers</Link>.
          </p>

          <h2>Securities lending en bescherming</h2>
          <p>
            Bolero leent geen effecten uit. Bij Saxo gebeurt dat enkel als je er zelf voor kiest. Bij beide is je cash beschermd tot
            €100.000 en zijn je effecten via een beleggersbeschermingsfonds gedekt tot €20.000 als de broker failliet gaat. Die
            bescherming dekt geen koersverliezen.
          </p>

          <h2>Voor wie is welk verschil belangrijk?</h2>
          <ul>
            <li><strong>Je belegt een vast bedrag per maand:</strong> het kostenverschil hierboven is het belangrijkste. Saxo is op elk bedrag goedkoper.</li>
            <li><strong>Je wil geen uitlening van je effecten:</strong> bij Bolero is dat uitgesloten; bij Saxo laat je de opt-in gewoon uit.</li>
            <li><strong>Je bent al klant bij KBC of CBC:</strong> effecten overzetten naar KBC/CBC is bij Bolero gratis.</li>
            <li><strong>Je wil later misschien overstappen:</strong> reken met €50 (Bolero) of €75 (Saxo) per lijn.</li>
          </ul>
          <p>
            Meer details: <Link href="/reviews/bolero">review van Bolero</Link>, <Link href="/reviews/saxo-bank-belgie">review van Saxo</Link>{' '}
            en <Link href="/vergelijking/saxo-vs-medirect">Saxo vs MeDirect</Link>.
          </p>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-primary mb-5">Veelgestelde vragen over Bolero en Saxo</h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="card">
                <h3 className="font-semibold text-primary mb-2">{q}</h3>
                <p className="text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <Bronnen bronnen={bronnen} nagekeken={NAGEKEKEN} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[bolero, saxo].map(broker => (
            broker.affiliateUrl && (
              <div key={broker.id} className="card flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{broker.name}</p>
                  <p className="text-sm text-gray-500">{broker.tagline}</p>
                  <AffiliateLabel broker={broker} />
                </div>
                <a href={goLink(broker.id, 'bolero-vs-saxo')} target="_blank" rel="sponsored nofollow noopener" className="btn-primary flex-shrink-0 text-sm py-2">Naar {broker.name} →</a>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}
