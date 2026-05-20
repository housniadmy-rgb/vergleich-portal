interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
}

export function StarRating({ rating, reviewCount, size = 'md', showCount = true }: StarRatingProps) {
  const sizeClasses = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' }
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)

  return (
    <div className={`flex items-center gap-1.5 ${sizeClasses[size]}`}>
      <div className="flex items-center text-amber-400">
        {'★'.repeat(full)}
        {half && '½'}
        <span className="text-gray-300 dark:text-gray-600">{'★'.repeat(empty)}</span>
      </div>
      <span className="font-semibold text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
      {showCount && reviewCount !== undefined && (
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          ({reviewCount.toLocaleString('de-DE')} Bewertungen)
        </span>
      )}
    </div>
  )
}
