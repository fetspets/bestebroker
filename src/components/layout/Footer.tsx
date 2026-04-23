import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary text-gray-300 mt-16">
      {/* Risk warning — required on every page */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            <strong className="text-gray-300">Risicowaarschuwing:</strong> Beleggen brengt risico&#39;s met zich mee.
            Je kunt (een deel van) je inleg verliezen. In het verleden behaalde resultaten bieden geen garantie voor de toekomst.
            De informatie op BesteBroker.be is uitsluitend informatief van aard en vormt geen persoonlijk beleggingsadvies.
            BesteBroker.be is geen vergunde beleggingsadviseur. Raadpleeg een onafhankelijk financieel adviseur voor persoonlijk advies.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-display font-bold text-xl text-white hover:text-accent transition-colors">
              <span className="text-accent">●</span> BesteBroker.be
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Eerlijke, Nederlandstalige vergelijking van brokers voor Belgische beleggers. Fact-checked, onafhankelijk, transparant.
            </p>
            <a href="mailto:info@bestebroker.be" className="mt-3 inline-block text-sm text-gray-400 hover:text-white transition-colors">
              info@bestebroker.be
            </a>
          </div>

          {/* Brokers */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Broker Reviews</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['/reviews/saxo-bank-belgie', 'Saxo Bank'],
                ['/reviews/degiro-belgie', 'DEGIRO'],
                ['/reviews/bolero', 'Bolero'],
                ['/reviews/medirect', 'MeDirect'],
                ['/reviews/trade-republic-belgie', 'Trade Republic'],
                ['/reviews/keytrade-belgie', 'Keytrade Bank'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vergelijkingen */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Vergelijkingen</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['/beste-broker-belgie', 'Beste broker België'],
                ['/beste-etf-broker-belgie', 'Beste ETF-broker'],
                ['/goedkoopste-broker-belgie', 'Goedkoopste broker'],
                ['/vergelijking/degiro-vs-bolero', 'DEGIRO vs Bolero'],
                ['/vergelijking/saxo-vs-degiro', 'Saxo vs DEGIRO'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Info</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['/tools/brokerkosten-calculator', 'Kostencalculator'],
                ['/tools/welke-broker-past-bij-mij', 'Welke broker past bij mij?'],
                ['/belgie/meerwaardebelasting-broker', 'Meerwaardebelasting'],
                ['/belgie/tob-uitleg', 'TOB uitgelegd'],
                ['/belgie/etf-kopen-beginners', 'ETF kopen beginners'],
                ['/boeken', 'Boeken'],
                ['/over-mij', 'Over mij'],
                ['/disclaimer', 'Disclaimer'],
                ['/methodologie', 'Methodologie'],
                ['/sitemap.xml', 'Sitemap'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} BesteBroker.be — Alle rechten voorbehouden
            <span className="mx-2">·</span>
            Laatst bijgewerkt: april 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
