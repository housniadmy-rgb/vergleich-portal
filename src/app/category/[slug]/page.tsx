import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SlidersHorizontal } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ProductCard } from '@/components/ProductCard'
import { AdBanner } from '@/components/AdBanner'
import categoriesData from '@/data/categories.json'
import productsData from '@/data/products.json'
import type { Category, Product } from '@/types'

const categories = categoriesData as unknown as Category[]
const products = productsData as unknown as Product[]

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = categories.find(c => c.slug === params.slug)
  if (!cat) return {}
  return {
    title: `Beste ${cat.name} 2026 – Test & Vergleich`,
    description: cat.description,
    alternates: { canonical: `https://techvergleich.de/category/${cat.slug}` },
    openGraph: { title: `Beste ${cat.name} 2026`, description: cat.description },
  }
}

const brandsByCategory: Record<string, string[]> = {
  smartphones: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi'],
  laptops: ['Apple', 'Dell', 'Lenovo', 'HP', 'ASUS', 'Microsoft'],
  tablets: ['Apple', 'Samsung', 'Microsoft', 'Lenovo'],
  kopfhoerer: ['Sony', 'Apple', 'Bose', 'Sennheiser', 'JBL', 'Jabra'],
  smartwatches: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Polar'],
  monitore: ['LG', 'Samsung', 'Dell', 'ASUS', 'BenQ', 'AOC'],
  gaming: ['Sony', 'Microsoft', 'Nintendo', 'ASUS', 'Razer'],
  zubehoer: ['Logitech', 'Apple', 'Razer', 'Corsair', 'Microsoft'],
}

const jsonLdForCategory = (cat: Category, catProducts: Product[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Beste ${cat.name} 2026`,
  description: cat.description,
  numberOfItems: catProducts.length,
  itemListElement: catProducts.slice(0, 5).map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    url: `https://techvergleich.de/product/${p.slug}`,
  })),
})

export default function CategoryPage({ params }: Props) {
  const category = categories.find(c => c.slug === params.slug)
  if (!category) notFound()

  const catProducts = products.filter(p => p.category === params.slug)
  const brands = brandsByCategory[params.slug] ?? []

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdForCategory(category, catProducts)) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: category.name }]} />

        {/* Header */}
        <div className="mt-5 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            Beste {category.name} 2026 – Test & Vergleich
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">{category.description}</p>
          {brands.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400 self-center">Top Marken:</span>
              {brands.map(brand => (
                <span key={brand} className="badge bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{brand}</span>
              ))}
            </div>
          )}
        </div>

        <AdBanner slot="header" />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Sidebar Filter */}
          <aside className="lg:w-64 flex-shrink-0 space-y-5">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <h2 className="font-bold text-gray-900 dark:text-white">Filter</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Max. Preis</label>
                  <select className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Alle Preise</option>
                    <option>Bis 200 €</option>
                    <option>200 – 500 €</option>
                    <option>500 – 1.000 €</option>
                    <option>Über 1.000 €</option>
                  </select>
                </div>
                {brands.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Marke</label>
                    <div className="space-y-1.5">
                      {brands.slice(0, 5).map(brand => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mindestbewertung</label>
                  <select className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Alle</option>
                    <option>4+ Sterne</option>
                    <option>4,5+ Sterne</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Sortierung</label>
                  <select className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Empfohlen</option>
                    <option>Bewertung ↓</option>
                    <option>Preis ↑</option>
                    <option>Preis ↓</option>
                    <option>Beliebtheit</option>
                  </select>
                </div>
              </div>
            </div>
            <AdBanner slot="sidebar" />
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">{catProducts.length}</span> Geräte gefunden
              </p>
            </div>
            {catProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {catProducts.map(product => (
                  <ProductCard key={product.id} product={product} showSpecs />
                ))}
              </div>
            ) : (
              <div className="card p-16 text-center">
                <p className="text-gray-400 dark:text-gray-500">
                  Noch keine Geräte in dieser Kategorie – bald mehr!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
