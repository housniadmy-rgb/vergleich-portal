import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Check, X, ExternalLink, Star, ArrowRight, ShoppingCart, Zap } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { AdBanner } from '@/components/AdBanner'
import { ProductCard } from '@/components/ProductCard'
import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'
import type { Product, Category } from '@/types'

const products = productsData as Product[]
const categories = categoriesData as Category[]

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const product = products.find(p => p.slug === params.slug)
  if (!product) return {}
  return {
    title: `${product.name} Test & Bewertung 2026 – Lohnt es sich?`,
    description: `${product.name} im Test: ${product.shortDesc}. Alle Features, Preise, Pros & Cons im Überblick.`,
    alternates: { canonical: `https://vergleich-portal.de/product/${product.slug}` },
    openGraph: {
      title: `${product.name} Test 2026`,
      description: product.shortDesc,
      type: 'article',
    },
  }
}

const categoryNames: Record<string, string> = {
  'ki-tools': 'KI Tools', software: 'Software', hosting: 'Hosting',
  vpn: 'VPN', smartphones: 'Smartphones', laptops: 'Laptops', elektronik: 'Elektronik',
}

export default function ProductPage({ params }: Props) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) notFound()

  const category = categories.find(c => c.id === product.category)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
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
    },
  }

  const ctaLabel =
    product.affiliateType === 'amazon' ? 'Bei Amazon kaufen'
    : product.affiliateType === 'saas' ? 'Kostenlos testen'
    : 'Jetzt ansehen'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { label: category?.name ?? categoryNames[product.category] ?? product.category, href: `/category/${product.category}` },
          { label: product.name },
        ]} />

        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          {/* Main */}
          <div className="flex-1 min-w-0 space-y-10">
            {/* Hero */}
            <div className="card p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start gap-3 mb-2">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-0.5 rounded-full">
                      {categoryNames[product.category] ?? product.category}
                    </span>
                    {product.badge && (
                      <span className="text-sm font-semibold text-orange-700 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 px-2.5 py-0.5 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-5 h-5 ${i <= Math.round(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                    </div>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">{product.rating}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      ({product.reviewCount.toLocaleString('de-DE')} Bewertungen)
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div>
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    {product.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-base ml-1">/{product.priceUnit}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md"
                  >
                    {ctaLabel} <ExternalLink className="w-4 h-4" />
                  </a>
                  {product.affiliateType !== 'amazon' && (
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
                    >
                      <Zap className="w-4 h-4" /> Gratis testen
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Features & Funktionen</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="card p-6">
                <h2 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" /> Vorteile
                </h2>
                <ul className="space-y-2.5">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-6">
                <h2 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                  <X className="w-5 h-5" /> Nachteile
                </h2>
                <ul className="space-y-2.5">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <AdBanner slot="in-content" />

            {/* FAQ */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Häufig gestellte Fragen</h2>
              <div className="space-y-5">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Für wen ist {product.name} geeignet?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.name} eignet sich besonders für Nutzer, die {product.shortDesc.toLowerCase()}.
                    Mit einer Bewertung von {product.rating}/5 Sternen ist es eine der besten Optionen in seiner Kategorie.
                  </p>
                </div>
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Was kostet {product.name}?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.name} kostet {product.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € pro {product.priceUnit}.
                    {product.affiliateType === 'saas' ? ' Es gibt auch eine kostenlose Testphase.' : ''}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Gibt es Alternativen zu {product.name}?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ja, im Bereich {categoryNames[product.category] ?? product.category} gibt es weitere gute Alternativen.{' '}
                    <Link href={`/category/${product.category}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      Alle {categoryNames[product.category] ?? product.category} vergleichen →
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {related.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Ähnliche Produkte</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {related.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 xl:w-80 flex-shrink-0 space-y-5">
            <div className="sticky top-24 space-y-5">
              <div className="card p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Schnellübersicht</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Preis</dt>
                    <dd className="font-semibold text-gray-900 dark:text-white">
                      {product.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €/{product.priceUnit}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Bewertung</dt>
                    <dd className="font-semibold text-gray-900 dark:text-white">{product.rating}/5 ★</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Kategorie</dt>
                    <dd className="font-semibold text-gray-900 dark:text-white">
                      {categoryNames[product.category] ?? product.category}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Bewertungen</dt>
                    <dd className="font-semibold text-gray-900 dark:text-white">
                      {product.reviewCount.toLocaleString('de-DE')}
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 space-y-2">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm"
                  >
                    {ctaLabel} <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link
                    href={`/category/${product.category}`}
                    className="w-full flex items-center justify-center gap-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors text-sm"
                  >
                    Alternativen ansehen <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <AdBanner slot="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
