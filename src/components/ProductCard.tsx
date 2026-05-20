import Link from 'next/link'
import { Star, ExternalLink, ShoppingCart, TrendingDown } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice, discountPercent } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  showSpecs?: boolean
}

const badgeColors: Record<string, string> = {
  Bestseller:       'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Testsieger:       'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Empfehlung:       'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Top Pick':       'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Premium:          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Preis-Tipp':     'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  'Business-Tipp':  'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  'Gaming-Empfehlung': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  'Handheld-Tipp':  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'Apple-Empfehlung': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  'Komfort-Tipp':   'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  'Android-Tipp':   'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400',
}

const KEY_SPECS: Record<string, string[]> = {
  smartphones:  ['Display', 'Prozessor', 'RAM', 'Kamera'],
  laptops:      ['Display', 'Prozessor', 'RAM', 'GPU'],
  tablets:      ['Display', 'Prozessor', 'RAM', 'Akku'],
  kopfhoerer:   ['Typ', 'Akku', 'Noise Cancelling', 'Konnektivität'],
  smartwatches: ['Display', 'Akku', 'Schutz', 'Gesundheit'],
  monitore:     ['Größe', 'Auflösung', 'Panel', 'Bildwiederholrate'],
  gaming:       ['CPU', 'GPU', 'RAM', 'Speicher'],
  zubehoer:     ['Typ', 'Sensor', 'Akku', 'Konnektivität'],
}

export function ProductCard({ product, showSpecs = false }: ProductCardProps) {
  const discount = product.oldPrice ? discountPercent(product.price, product.oldPrice) : 0
  const keySpecs = KEY_SPECS[product.category] ?? []
  const specsToShow = showSpecs
    ? keySpecs.map(k => ({ key: k, value: product.specs[k] })).filter(s => s.value).slice(0, 3)
    : []

  return (
    <div className="card-hover flex flex-col overflow-hidden group">
      {/* Product image area */}
      <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center overflow-hidden">
        <ShoppingCart className="w-14 h-14 text-gray-300 dark:text-gray-600" />
        {product.badge && (
          <span className={`absolute top-3 left-3 badge ${badgeColors[product.badge] ?? 'bg-gray-100 text-gray-700'}`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 badge bg-red-500 text-white badge-sale">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">{product.brand}</p>
          <h3 className="font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString('de-DE')})</span>
        </div>

        {/* Key specs */}
        {specsToShow.length > 0 && (
          <div className="space-y-1">
            {specsToShow.map(spec => (
              <div key={spec.key} className="flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">{spec.key}</span>
                <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] line-clamp-1">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">{product.shortDesc}</p>

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <div className="flex gap-2">
            <Link href={`/product/${product.slug}`}
              className="flex-1 text-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Details
            </Link>
            <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors">
              <ShoppingCart className="w-3.5 h-3.5" /> Amazon
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
