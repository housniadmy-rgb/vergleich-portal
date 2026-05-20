import Link from 'next/link'
import { ExternalLink, Check, X } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface ComparisonTableProps {
  products: Product[]
}

export function ComparisonTable({ products }: ComparisonTableProps) {
  if (products.length === 0) return null

  const maxFeatures = Math.max(...products.map((p) => p.features.length))
  const maxPros = Math.max(...products.map((p) => p.pros.length))
  const maxCons = Math.max(...products.map((p) => p.cons.length))

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-900">
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-500 dark:text-gray-400 w-36 min-w-[9rem]">
              Kriterium
            </th>
            {products.map((product) => (
              <th key={product.id} className="px-4 py-4 text-center min-w-[160px]">
                <div className="flex flex-col items-center gap-1">
                  {product.badge && (
                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{product.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-950">
          {/* Price */}
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Preis</td>
            {products.map((product) => (
              <td key={product.id} className="px-4 py-3 text-center">
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price, product.priceUnit)}
                </span>
              </td>
            ))}
          </tr>

          {/* Rating */}
          <tr className="bg-gray-50/50 dark:bg-gray-900/30">
            <td className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Bewertung</td>
            {products.map((product) => (
              <td key={product.id} className="px-4 py-3 text-center">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-bold text-gray-900 dark:text-white">{product.rating.toFixed(1)}/5</span>
                  <span className="text-amber-400 text-sm">{'★'.repeat(Math.round(product.rating))}</span>
                  <span className="text-xs text-gray-400">
                    {product.reviewCount.toLocaleString('de-DE')} Bewertungen
                  </span>
                </div>
              </td>
            ))}
          </tr>

          {/* Features */}
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 align-top pt-4">Features</td>
            {products.map((product) => (
              <td key={product.id} className="px-4 py-3 align-top">
                <ul className="space-y-1">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* Pros */}
          <tr className="bg-gray-50/50 dark:bg-gray-900/30">
            <td className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 align-top pt-4">Vorteile</td>
            {products.map((product) => (
              <td key={product.id} className="px-4 py-3 align-top">
                <ul className="space-y-1">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-sm text-green-700 dark:text-green-400">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* Cons */}
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 align-top pt-4">Nachteile</td>
            {products.map((product) => (
              <td key={product.id} className="px-4 py-3 align-top">
                <ul className="space-y-1">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-sm text-red-700 dark:text-red-400">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* CTA */}
          <tr className="bg-gray-50 dark:bg-gray-900">
            <td className="px-4 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Aktion</td>
            {products.map((product) => (
              <td key={product.id} className="px-4 py-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Jetzt testen <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href={`/product/${product.slug}`}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Details ansehen
                  </Link>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Suppress unused variable warnings */}
      <span className="hidden">{maxFeatures}{maxPros}{maxCons}</span>
    </div>
  )
}
