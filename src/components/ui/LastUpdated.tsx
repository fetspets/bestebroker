interface Props {
  date: string
  label?: string
}

export function LastUpdated({ date, label = 'Laatste update' }: Props) {
  const formatted = new Intl.DateTimeFormat('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

  const nextReview = new Date(date)
  nextReview.setMonth(nextReview.getMonth() + 3)
  const nextFormatted = new Intl.DateTimeFormat('nl-BE', {
    month: 'long',
    year: 'numeric',
  }).format(nextReview)

  return (
    <p className="text-sm text-gray-500 flex items-center gap-1.5">
      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {label}: <time dateTime={date} className="font-medium">{formatted}</time>
      <span className="text-gray-400">·</span>
      <span>Volgende review: {nextFormatted}</span>
    </p>
  )
}
