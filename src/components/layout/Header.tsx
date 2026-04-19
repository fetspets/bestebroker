'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/beste-broker-belgie', label: 'Beste Broker' },
  {
    label: 'Reviews',
    children: [
      { href: '/reviews/saxo-bank-belgie', label: 'Saxo Bank' },
      { href: '/reviews/degiro-belgie', label: 'DEGIRO' },
      { href: '/reviews/bolero', label: 'Bolero' },
      { href: '/reviews/medirect', label: 'MeDirect' },
      { href: '/reviews/trade-republic-belgie', label: 'Trade Republic' },
      { href: '/reviews/keytrade-belgie', label: 'Keytrade Bank' },
    ],
  },
  {
    label: 'Vergelijkingen',
    children: [
      { href: '/vergelijking/degiro-vs-bolero', label: 'DEGIRO vs Bolero' },
      { href: '/vergelijking/saxo-vs-degiro', label: 'Saxo vs DEGIRO' },
      { href: '/vergelijking/bolero-vs-saxo', label: 'Bolero vs Saxo' },
      { href: '/vergelijking/saxo-vs-medirect', label: 'Saxo vs MeDirect' },
    ],
  },
  {
    label: 'Tools',
    children: [
      { href: '/tools/brokerkosten-calculator', label: 'Kostencalculator' },
      { href: '/tools/welke-broker-past-bij-mij', label: 'Welke broker past bij mij?' },
    ],
  },
  {
    label: 'België',
    children: [
      { href: '/belgie/etf-kopen-beginners', label: 'ETF kopen — beginners' },
      { href: '/belgie/vwce-vs-iwda', label: 'VWCE vs IWDA' },
      { href: '/belgie/pensioensparen-vs-etf', label: 'Pensioensparen vs ETF' },
      { href: '/belgie/meerwaardebelasting-2026-uitleg', label: 'Meerwaardebelasting 2026' },
      { href: '/belgie/tob-uitleg', label: 'TOB uitgelegd' },
    ],
  },
  { href: '/boeken', label: 'Boeken' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-white hover:text-accent transition-colors">
            <span className="text-accent">●</span>
            BesteBroker.be
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              'children' in link ? (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md transition-colors"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.label}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === link.label && 'children' in link && (
                    <div
                      className="absolute top-full left-0 mt-0 w-52 bg-white text-text rounded-lg shadow-xl border border-gray-100 py-1 z-50"
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.children!.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link
              href="/tools/welke-broker-past-bij-mij"
              className="ml-3 bg-accent text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Broker vinden →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-gray-700">
            {navLinks.map(link => (
              'children' in link ? (
                <div key={link.label} className="mb-2">
                  <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">{link.label}</p>
                  {link.children!.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-6 py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
