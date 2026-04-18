# BesteBoker.be — Belgische Brokervergelijkingssite

Productie-klare Next.js 14 affiliate vergelijkingssite voor "beste brokers in België". 100% Nederlandstalig, Belgische fiscale diepgang, interactieve tools.

## Snelstart

```bash
npm install
cp .env.local.example .env.local   # vul je affiliate tags in
npm run dev                         # http://localhost:3000
```

## Affiliate tags instellen

Kopieer `.env.local.example` naar `.env.local` en vul je tags in:

```env
BOL_AFFILIATE_TAG=jouw-partner-id          # bol.com partner programma
AMAZON_AFFILIATE_TAG=jouw-amazon-tag-21    # optioneel backup
NEXT_PUBLIC_SITE_URL=https://bestebroker.be
```

- **bol.com**: registreer via [partner.bol.com](https://partner.bol.com)
- Zonder `BOL_AFFILIATE_TAG` werken alle boekenlinks gewoon — enkel zonder tracking

## Brokerinformatie bijwerken

Alle brokerdata staat in één bestand: **`src/data/brokers.ts`**

Pas hier de velden aan als:
- Een broker zijn tarieven wijzigt (veld: `fees`)
- De belastingafhandeling verandert (veld: `taxes`)
- Securities lending policy wijzigt (veld: `security.securitiesLending`)
- Je de review-datum wil bijwerken (veld: `lastVerified` — ISO-datumstring)

Na elke tariefwijziging: update ook de `LastUpdated`-datum op de betreffende pagina.

### Voorbeeld: MeDirect ETF-tarief aanpassen

```typescript
// src/data/brokers.ts
{
  id: 'medirect',
  fees: {
    etfStandard: 0,   // gratis ETFs
    transactionFeeFixed: 0,
    transactionFeePercent: 0,
    transactionFeeMin: 0,
    // ...
  },
  lastVerified: '2026-06-01',  // datum bijwerken!
}
```

## Boekenprijzen bijwerken

Boekenprijzen staan in **`src/data/books.ts`** (veld: `priceEur`, `priceEbook`). Geen automatische updates — controleer handmatig op bol.com.

Pas ook `lastVerified` aan na elke controle.

## Een nieuwe broker toevoegen

1. Voeg het broker-object toe in `src/data/brokers.ts`
2. Maak een reviewpagina aan in `src/app/reviews/[nieuwe-slug]/page.tsx`  
   (kopieer een bestaande reviewpagina als template)
3. Voeg de broker toe aan de navigatie in `src/components/layout/Header.tsx`
4. De sitemap wordt automatisch bijgewerkt via `src/app/sitemap.ts`

## Een nieuw boek toevoegen

1. Voeg het boek toe in `src/data/books.ts`
2. Eventueel een aparte pagina in `src/app/boeken/[slug]/page.tsx`  
   (de dynamische route `src/app/boeken/[slug]/page.tsx` werkt automatisch voor alle boeken)
3. Gebruik `<BookRecommendationBlock bookIds={['nieuwe-id']} />` op relevante pagina's

## Sitemap & SEO

- **Sitemap**: automatisch gegenereerd via `src/app/sitemap.ts` op `/sitemap.xml`
- **Robots.txt**: automatisch via `src/app/robots.ts` op `/robots.txt`
- **Metadata**: elke pagina heeft een `export const metadata` met title, description en OpenGraph
- **JSON-LD**: Review, FAQPage, Book, Person en BreadcrumbList schema's zijn inline in de pagina's

## Deployment (Vercel)

```bash
npm run build   # test de productie build lokaal
# Deploy via Vercel: verbind je GitHub repo op vercel.com
```

Voeg de environment variables toe in het Vercel dashboard (Settings → Environment Variables):
- `BOL_AFFILIATE_TAG`
- `NEXT_PUBLIC_SITE_URL`

## Projectstructuur

```
src/
├── app/                  # Next.js App Router pagina's en routes
│   ├── layout.tsx        # root layout (fonts, header, footer)
│   ├── page.tsx          # homepage
│   ├── sitemap.ts        # automatische sitemap
│   ├── robots.ts         # robots.txt
│   ├── beste-broker-belgie/
│   ├── reviews/          # 5 broker reviews
│   ├── vergelijking/     # 4 vergelijkingen
│   ├── tools/            # calculator + wizard
│   ├── boeken/           # boekenoverzicht + detailpagina's
│   ├── belgie/           # fiscale infopagina's
│   └── over-mij/ disclaimer/ methodologie/
├── components/
│   ├── layout/           # Header, Footer, BreadcrumbNav
│   ├── ui/               # ComplianceDisclosure, LastUpdated
│   ├── broker/           # BrokerCard, BrokerComparisonTable
│   ├── book/             # BookCard, BookRecommendationBlock
│   └── tools/            # BrokerCostCalculator, BrokerWizard
├── data/
│   ├── brokers.ts        # ⭐ alle brokerdata hier aanpassen
│   ├── books.ts          # alle boekendata
│   └── author.ts         # auteursprofiel
└── lib/
    ├── affiliateLinks.ts  # bolLink(), brokerLink()
    └── wizardScoring.ts   # broker-quiz scoring logica
```

## Compliance checklist

Voor elke pagina met affiliate links:
- [ ] `<ComplianceDisclosure />` component aanwezig (verschijnt automatisch boven de fold)
- [ ] Affiliate links hebben `rel="noopener noreferrer sponsored"`
- [ ] `<LastUpdated date="..." />` op pagina's met tarieven of belastinginfo
- [ ] Footer bevat risicowaarschuwing (automatisch via `Footer.tsx`)

## Technische stack

| Tool | Versie | Rol |
|------|--------|-----|
| Next.js | 14.2.x | Framework + App Router |
| React | 18.3.x | UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.x | Styling |
| chart.js | 4.5.x | Kostencalculator grafiek |
| react-chartjs-2 | 5.3.x | React wrapper voor chart.js |
| Fraunces + DM Sans | Google Fonts | Typografie |
