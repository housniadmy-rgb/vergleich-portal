import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, ShoppingCart, Star, Trophy, HelpCircle } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ComparisonTable } from '@/components/ComparisonTable'
import { AdBanner } from '@/components/AdBanner'
import { ProductCard } from '@/components/ProductCard'
import comparisonsData from '@/data/comparisons.json'
import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'
import type { Comparison, Product, Category } from '@/types'
import { formatPrice } from '@/lib/utils'

const comparisons = comparisonsData as unknown as Comparison[]
const products = productsData as unknown as Product[]
const categories = categoriesData as unknown as Category[]

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return comparisons.map(c => ({ slug: c.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const c = comparisons.find(c => c.slug === params.slug)
  if (!c) return {}
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: `https://techvergleich.de/compare/${c.slug}` },
    openGraph: { title: c.seoTitle, description: c.seoDescription, type: 'article' },
  }
}

export default function ComparePage({ params }: Props) {
  const comparison = comparisons.find(c => c.slug === params.slug)
  if (!comparison) notFound()

  const comparedProducts = comparison.products
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as unknown as Product[]

  const category = categories.find(c => c.id === comparison.category)
  const winner = comparedProducts.reduce((a, b) => a.rating > b.rating ? a : b)
  const otherComparisons = comparisons.filter(c => c.id !== comparison.id).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comparison.seoTitle,
    description: comparison.seoDescription,
    publisher: { '@type': 'Organization', name: 'TechVergleich', url: 'https://techvergleich.de' },
    dateModified: new Date().toISOString().split('T')[0],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { label: category?.name ?? comparison.category, href: `/category/${comparison.category}` },
          { label: comparison.title },
        ]} />

        <div className="mt-5 mb-8 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            {comparison.seoTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{comparison.seoDescription}</p>
        </div>

        <AdBanner slot="header" />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Winner Banner */}
            <div className="card p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10 border-amber-200 dark:border-amber-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">Unser Testsieger</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{winner.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{winner.brand}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.round(winner.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{winner.rating}</span>
                    <span className="text-sm text-gray-500">· {winner.reviewCount.toLocaleString('de-DE')} Bewertungen</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{winner.shortDesc}</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(winner.price)}</div>
                  <a href={winner.affiliateUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-amazon text-sm py-2.5">
                    <ShoppingCart className="w-4 h-4" /> Bei Amazon kaufen
                  </a>
                  <Link href={`/product/${winner.slug}`} className="text-xs text-center text-blue-600 dark:text-blue-400 hover:underline">
                    Vollständiger Test →
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {comparedProducts.map((product, i) => (
                <div key={product.id} className={`card p-4 text-center ${product.id === winner.id ? 'ring-2 ring-blue-500' : ''}`}>
                  {product.id === winner.id && (
                    <span className="badge bg-blue-600 text-white mb-2">Testsieger</span>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">{product.brand}</p>
                  <p className="font-bold text-sm text-gray-900 dark:text-white mt-1 leading-snug">{product.name}</p>
                  <div className="flex items-center justify-center gap-1 my-2">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    <span className="font-bold text-sm">{product.rating}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</p>
                  <span className="text-xs text-gray-500">Rang #{i + 1}</span>
                </div>
              ))}
            </div>

            {/* Table */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Detaillierter Vergleich</h2>
              <ComparisonTable products={comparedProducts} />
            </div>

            <AdBanner slot="in-content" />

            {/* Individual Cards */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Alle Produkte einzeln</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {comparedProducts.map(p => <ProductCard key={p.id} product={p} showSpecs />)}
              </div>
            </div>

            {/* FAQ */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Häufige Fragen</h2>
              </div>
              <div className="space-y-4">
                {[
                  { q: `Welches ist das beste Gerät in diesem Vergleich?`, a: `Unser Testsieger ist ${winner.name} mit einer Bewertung von ${winner.rating}/5 Sternen. Es überzeugt durch ${winner.pros[0]?.toLowerCase()} und ${winner.pros[1]?.toLowerCase()}.` },
                  { q: 'Wie oft werden die Preise aktualisiert?', a: 'Wir aktualisieren die Preise täglich. Da es sich um Amazon-Links handelt, können sich Preise jederzeit ändern.' },
                  { q: 'Sind das bezahlte Empfehlungen?', a: 'Nein. Unsere Tests sind vollständig unabhängig. Wir erhalten lediglich eine Amazon-Provision bei Kauf über unsere Links, ohne Mehrkosten für dich.' },
                ].map(({ q, a }, i) => (
                  <div key={i} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{q}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-5">
              <div className="card p-5">
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">🏆 Testsieger</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{winner.brand}</p>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-snug">{winner.name}</h3>
                <div className="flex items-center gap-1.5 mb-3">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="font-bold text-sm">{winner.rating}/5</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">{winner.shortDesc}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mb-3">{formatPrice(winner.price)}</p>
                <a href={winner.affiliateUrl} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 btn-amazon text-sm py-2.5">
                  <ShoppingCart className="w-4 h-4" /> Bei Amazon kaufen
                </a>
              </div>

              <AdBanner slot="sidebar" />

              {otherComparisons.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Weitere Vergleiche</h3>
                  <ul className="space-y-2">
                    {otherComparisons.map(c => (
                      <li key={c.id}>
                        <Link href={`/compare/${c.slug}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-start gap-1.5">
                          <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
