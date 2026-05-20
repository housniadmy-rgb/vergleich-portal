import Link from 'next/link'
import { Check, X, ExternalLink, Star, ShoppingCart, Trophy } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice, discountPercent } from '@/lib/utils'

interface ComparisonTableProps {
  products: Product[]
}

const SPEC_ORDER = [
  'Display', 'Prozessor', 'RAM', 'Speicher', 'GPU', 'Kamera',
  'Akku', 'Betriebssystem', '5G', 'Gewicht',
  'Typ', 'Treiber', 'Frequenzgang', 'Noise Cancelling', 'Konnektivität',
  'Größe', 'Auflösung', 'Panel', 'Bildwiederholrate',
  'CPU', 'Material', 'Schutz', 'Sensor',
]

export function ComparisonTable({ products }: ComparisonTableProps) {
  if (products.length === 0) return null

  const winner = products.reduce((a, b) => a.rating > b.rating ? a : b)

  // Alle Spec-Keys der verglichenen Produkte, sortiert nach SPEC_ORDER
  const allKeys = Array.from(new Set(products.flatMap(p => Object.keys(p.specs))))
  const sortedKeys = [
    ...SPEC_ORDER.filter(k => allKeys.includes(k)),
    ...allKeys.filter(k => !SPEC_ORDER.includes(k)),
  ].slice(0, 12)

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
      <table className="w-full min-w-[560px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
            <th className="p-4 text-left text-sm font-semibold text-gray-500 dark:text-gray-400 w-32 min-w-[8rem]">
              Vergleich
            </th>
            {products.map(product => (
              <th key={product.id} className="p-4 text-center min-w-[180px]">
                <div className="flex flex-col items-center gap-2">
                  {product.id === winner.id && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
                      <Trophy className="w-3 h-3" /> Testsieger
                    </span>
                  )}
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{product.brand}</span>
                  <Link href={`/product/${product.slug}`} className="font-bold text-gray-900 dark:text-white text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-center leading-snug">
                    {product.name}
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-950">
          {/* Price */}
          <tr>
            <td className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-900/20">Preis</td>
            {products.map(product => {
              const discount = product.oldPrice ? discountPercent(product.price, product.oldPrice) : 0
              return (
                <td key={product.id} className="p-4 text-center">
                  <div className="font-bold text-gray-900 dark:text-white text-lg">{formatPrice(product.price)}</div>
                  {product.oldPrice && (
                    <div className="flex items-center justify-center gap-1.5 mt-0.5">
                      <span className="text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                      <span className="text-xs font-bold text-red-500">-{discount}%</span>
                    </div>
                  )}
                </td>
              )
            })}
          </tr>

          {/* Rating */}
          <tr className="bg-gray-50/50 dark:bg-gray-900/20">
            <td className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-900/20">Bewertung</td>
            {products.map(product => (
              <td key={product.id} className="p-4 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="font-bold text-gray-900 dark:text-white">{product.rating}</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{product.reviewCount.toLocaleString('de-DE')} Bew.</div>
              </td>
            ))}
          </tr>

          {/* Specs */}
          {sortedKeys.map((key, idx) => (
            <tr key={key} className={idx % 2 === 0 ? '' : 'bg-gray-50/30 dark:bg-gray-900/10'}>
              <td className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-900/20">{key}</td>
              {products.map(product => (
                <td key={product.id} className="p-4 text-center">
                  {product.specs[key] ? (
                    <span className="text-sm text-gray-700 dark:text-gray-300">{product.specs[key]}</span>
                  ) : (
                    <X className="w-4 h-4 text-gray-300 dark:text-gray-600 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}

          {/* Pros */}
          <tr>
            <td className="p-4 text-sm font-semibold text-green-600 dark:text-green-400 bg-gray-50/50 dark:bg-gray-900/20 align-top pt-4">Vorteile</td>
            {products.map(product => (
              <td key={product.id} className="p-4 align-top">
                <ul className="space-y-1">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />{pro}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* Cons */}
          <tr className="bg-gray-50/30 dark:bg-gray-900/10">
            <td className="p-4 text-sm font-semibold text-red-600 dark:text-red-400 bg-gray-50/50 dark:bg-gray-900/20 align-top pt-4">Nachteile</td>
            {products.map(product => (
              <td key={product.id} className="p-4 align-top">
                <ul className="space-y-1">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                      <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />{con}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* CTA */}
          <tr className="bg-gray-50 dark:bg-gray-900/60">
            <td className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Kaufen</td>
            {products.map(product => (
              <td key={product.id} className="p-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-colors">
                    <ShoppingCart className="w-3.5 h-3.5" /> Bei Amazon
                  </a>
                  <Link href={`/product/${product.slug}`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Vollständiger Test →
                  </Link>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
