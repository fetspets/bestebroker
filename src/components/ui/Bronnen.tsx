export interface Bron {
  label: string
  href: string
  /** Wat de bron staaft, bv. "transactiekosten Bolero" */
  staaft: string
}

/** Bronnenlijst onderaan een vergelijking: elke kost, taks of regel met bron en nagekeken-datum. */
export function Bronnen({ bronnen, nagekeken }: { bronnen: Bron[]; nagekeken: string }) {
  const datum = new Intl.DateTimeFormat('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(nagekeken))
  return (
    <section className="card mb-10" aria-labelledby="bronnen">
      <h2 id="bronnen" className="font-display text-xl font-bold text-primary mb-2">Bronnen</h2>
      <p className="text-sm text-gray-500 mb-3">
        Alle bedragen en regels nagekeken op <time dateTime={nagekeken}>{datum}</time>. Tarieven kunnen wijzigen:
        controleer altijd de actuele tarievenlijst van de broker voor je een rekening opent.
      </p>
      <ul className="text-sm text-gray-600 space-y-1.5 list-disc pl-5">
        {bronnen.map(b => (
          <li key={b.href + b.staaft}>
            <span className="text-gray-700">{b.staaft}:</span>{' '}
            <a href={b.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              {b.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-400 mt-4">
        Deze vergelijking is algemene informatie, geen persoonlijk beleggingsadvies. Beleggen houdt risico&apos;s in: je kan
        (een deel van) je inleg verliezen. Beleggersbescherming dekt geen koersverliezen.
      </p>
    </section>
  )
}

export function articleJsonLd(opts: { headline: string; description: string; url: string; dateModified: string; datePublished?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    inLanguage: 'nl-BE',
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    dateModified: opts.dateModified,
    author: { '@type': 'Person', name: 'Stef', url: 'https://www.bestebroker.be/over-mij' },
    publisher: { '@type': 'Organization', name: 'BesteBroker.be', url: 'https://www.bestebroker.be' },
  }
}
