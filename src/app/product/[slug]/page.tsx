import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Check, X, ShoppingCart, Star, ArrowRight, ExternalLink, Tag, HelpCircle } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { AdBanner } from '@/components/AdBanner'
import { ProductCard } from '@/components/ProductCard'
import { SpecsTable } from '@/components/SpecsTable'
import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'
import comparisonsData from '@/data/comparisons.json'
import type { Product, Category, Comparison } from '@/types'
import { formatPrice, discountPercent } from '@/lib/utils'

const products = productsData as unknown as Product[]
const categories = categoriesData as unknown as Category[]
const comparisons = comparisonsData as unknown as Comparison[]

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const p = products.find(p => p.slug === params.slug)
  if (!p) return {}
  return {
    title: `${p.name} Test 2026 – Lohnt sich der Kauf?`,
    description: `${p.name} im Test: ${p.shortDesc}. Alle Specs, Pros & Cons und aktuelle Amazon-Preise.`,
    alternates: { canonical: `https://techvergleich.de/product/${p.slug}` },
    openGraph: { title: `${p.name} Test 2026`, description: p.shortDesc, type: 'article' },
  }
}

const catNames: Record<string, string> = {
  smartphones: 'Smartphones', laptops: 'Laptops', tablets: 'Tablets',
  kopfhoerer: 'Kopfhörer', smartwatches: 'Smartwatches', monitore: 'Monitore',
  gaming: 'Gaming', zubehoer: 'Zubehör',
}

export default function ProductPage({ params }: Props) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) notFound()

  const category = categories.find(c => c.id === product.category)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const relatedComparisons = comparisons.filter(c => c.products.includes(product.id)).slice(0, 2)
  const discount = product.oldPrice ? discountPercent(product.price, product.oldPrice) : 0

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: { '@type': 'Brand', name: product.brand },
    description: product.description,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: product.affiliateUrl,
      seller: { '@type': 'Organization', name: 'Amazon' },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { label: category?.name ?? catNames[product.category] ?? product.category, href: `/category/${product.category}` },
          { label: product.name },
        ]} />
        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          <div className="flex-1 min-w-0 space-y-8">
            <div className="card p-6 sm:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-52 h-48 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Link href={`/category/${product.category}`} className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {catNames[product.category]}
                    </Link>
                    {product.badge && (
                      <span className="badge bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">{product.badge}</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{product.brand}</p>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1 mb-3 leading-tight">{product.name}</h1>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-5 h-5 ${i <= Math.round(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                    </div>
                    <span className="font-bold text-xl text-gray-900 dark:text-white">{product.rating}</span>
                    <span className="text-gray-500 text-sm">({product.reviewCount.toLocaleString('de-DE')} Bewertungen)</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
                      {product.oldPrice && <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>}
                      {discount > 0 && <span className="badge bg-red-500 text-white badge-sale">-{discount}%</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Preis bei Amazon &ndash; täglich aktualisiert</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
                    <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="btn-amazon">
                      <ShoppingCart className="w-5 h-5" /> Bei Amazon kaufen
                    </a>
                    <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                      <ExternalLink className="w-4 h-4" /> Besten Preis finden
                    </a>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">* Amazon-Partnerlink: Wir erhalten eine Provision ohne Mehrkosten für dich.</p>
              </div>
            </div>

            <SpecsTable specs={product.specs} title="Technische Spezifikationen" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="card p-5">
                <h2 className="text-base font-bold text-green-700 dark:text-green-400 flex items-center gap-2 mb-4">
                  <Check className="w-5 h-5" /> Vorteile
                </h2>
                <ul className="space-y-2.5">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-5">
                <h2 className="text-base font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-4">
                  <X className="w-5 h-5" /> Nachteile
                </h2>
                <ul className="space-y-2.5">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />{con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <AdBanner slot="in-content" />

            {relatedComparisons.length > 0 && (
              <div className="card p-5">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4">Dieses Gerät in unseren Vergleichen</h2>
                <div className="space-y-2">
                  {relatedComparisons.map(c => (
                    <Link key={c.id} href={`/compare/${c.slug}`} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline py-1">
                      <ArrowRight className="w-4 h-4 flex-shrink-0" />{c.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">FAQ</h2>
              </div>
              <div className="space-y-4">
                {[
                  { q: `Für wen eignet sich ${product.name}?`, a: `${product.name} eignet sich für Nutzer, die ${product.shortDesc.toLowerCase()}. Mit ${product.rating}/5 Sternen gehört es zu den besten seiner Klasse.` },
                  { q: `Was kostet ${product.name} bei Amazon?`, a: `Aktuell kostet ${product.name} ${formatPrice(product.price)}${product.oldPrice ? ` (reduziert von ${formatPrice(product.oldPrice)})` : ''}. Amazon-Preise ändern sich täglich.` },
                  { q: `Gibt es Alternativen zu ${product.name}?`, a: `Ja! In unserer ${catNames[product.category]}-Kategorie findest du alle vergleichbaren Geräte mit Preisen und Bewertungen.` },
                ].map(({ q, a }, i) => (
                  <div key={i} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{q}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{a}</p>
                  </div>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ähnliche Geräte</h2>
                  <Link href={`/category/${product.category}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                    Alle {catNames[product.category]} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {related.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-5">
              <div className="card p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-4 h-4 ${i <= Math.round(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                  ))}
                  <span className="font-bold text-sm ml-1">{product.rating}/5</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{product.shortDesc}</p>
                <div className="space-y-1.5 mb-4">
                  {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
                    <div key={k} className="spec-row text-xs">
                      <span className="text-gray-500 dark:text-gray-400">{k}</span>
                      <span className="text-gray-900 dark:text-white font-medium text-right line-clamp-1 max-w-[55%]">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
                  {product.oldPrice && <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>}
                </div>
                <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 btn-amazon">
                  <ShoppingCart className="w-4 h-4" /> Bei Amazon kaufen
                </a>
                <Link href={`/category/${product.category}`} className="w-full mt-2 flex items-center justify-center gap-1 btn-secondary text-sm py-2">
                  Alternativen <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">Amazon PartnerNet</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Kauf über unsere Links unterstützt uns ohne Mehrkosten.</p>
              </div>
              <AdBanner slot="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
