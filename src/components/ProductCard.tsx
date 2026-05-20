import Link from 'next/link'
import { ExternalLink, Star, TrendingUp } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

const categoryLabels: Record<string, string> = {
  'ki-tools': 'KI Tools',
  'software': 'Software',
  'hosting': 'Hosting',
  'vpn': 'VPN',
  'smartphones': 'Smartphones',
  'laptops': 'Laptops',
  'elektronik': 'Elektronik',
}

const badgeColors: Record<string, string> = {
  Bestseller: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Empfehlung: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Top Rated': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Preis-Tipp': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Premium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Top Pick': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  'Budget Pick': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
}

export function ProductCard({ product }: ProductCardProps) {
  const ctaLabel =
    product.affiliateType === 'amazon'
      ? 'Bei Amazon kaufen'
      : product.affiliateType === 'saas'
      ? 'Kostenlos testen'
      : 'Jetzt ansehen'

  return (
    <div className="card p-5 flex flex-col gap-4 group">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {categoryLabels[product.category] ?? product.category}
            </span>
            <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{product.name}</h3>
          </div>
        </div>
        {product.badge && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${badgeColors[product.badge] ?? 'bg-gray-100 text-gray-700'}`}>
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-amber-400 text-sm">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-semibold text-gray-900 dark:text-white">{product.rating}</span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          ({product.reviewCount.toLocaleString('de-DE')} Bewertungen)
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
        {product.shortDesc}
      </p>

      <div className="mt-auto pt-2 flex items-center justify-between gap-3 border-t border-gray-100 dark:border-gray-800">
        <div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {product.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">/{product.priceUnit}</span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Details
          </Link>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {ctaLabel} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
