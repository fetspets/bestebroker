import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

export function BreadcrumbNav({ items }: Props) {
  const allItems = [{ label: 'Home', href: '/' }, ...items]

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
      <ol className="flex items-center flex-wrap gap-1">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && <span className="text-gray-400">/</span>}
            {item.href && index < allItems.length - 1 ? (
              <Link href={item.href} className="hover:text-accent transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-text font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function breadcrumbJsonLd(items: BreadcrumbItem[], baseUrl = 'https://bestebroker.be') {
  const allItems = [{ label: 'Home', href: '/' }, ...items]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  }
}
