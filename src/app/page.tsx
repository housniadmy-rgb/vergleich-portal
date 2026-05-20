import Link from 'next/link'
import { ArrowRight, Star, ShoppingCart, Zap, TrendingUp, Shield, Award } from 'lucide-react'
import type { Metadata } from 'next'
import { AdBanner } from '@/components/AdBanner'
import { CategoryCard } from '@/components/CategoryCard'
import { ProductCard } from '@/components/ProductCard'
import { BlogCard } from '@/components/BlogCard'
import { SearchBar } from '@/components/SearchBar'
import categoriesData from '@/data/categories.json'
import productsData from '@/data/products.json'
import comparisonsData from '@/data/comparisons.json'
import blogPostsData from '@/data/blog-posts.json'
import type { Category, Product, Comparison, BlogPost } from '@/types'
import { formatPrice, discountPercent } from '@/lib/utils'

const categories = categoriesData as unknown as Category[]
const products = productsData as unknown as Product[]
const comparisons = comparisonsData as unknown as Comparison[]
const blogPosts = blogPostsData as unknown as BlogPost[]

export const metadata: Metadata = {
  title: 'TechVergleich – Beste Elektronik 2026: Smartphones, Laptops & mehr',
  description: 'Vergleiche Smartphones, Laptops, Kopfhörer, Tablets & Smartwatches. Echte Tests, aktuelle Preise und die besten Amazon-Deals 2026.',
  alternates: { canonical: 'https://techvergleich.de' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TechVergleich',
  url: 'https://techvergleich.de',
  description: 'Deutschlands führendes Elektronik-Vergleichsportal',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://techvergleich.de/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured)
  const dealsProducts = products.filter(p => p.oldPrice).slice(0, 4)
  const featuredComparisons = comparisons.filter(c => c.featured)
  const featuredPosts = blogPosts.filter(p => p.featured)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm font-medium text-blue-200 mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              Täglich aktualisiert – Beste Deals 2026
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Elektronik{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                klug kaufen
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Smartphones, Laptops, Kopfhörer & mehr – unabhängig getestet, aktuell bewertet und mit den besten Amazon-Preisen.
            </p>

            <div className="max-w-xl mx-auto mb-8">
              <SearchBar placeholder="Smartphone, Laptop, Kopfhörer suchen..." size="hero" />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: 'iPhone 16 Pro', href: '/product/apple-iphone-16-pro' },
                { label: 'MacBook Pro M4', href: '/product/apple-macbook-pro-14-m4-pro' },
                { label: 'Sony XM5', href: '/product/sony-wh-1000xm5' },
                { label: 'PS5 Slim', href: '/product/sony-playstation-5-slim' },
              ].map(item => (
                <Link key={item.href} href={item.href}
                  className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: Award, value: '200+ Geräte', label: 'ausführlich getestet' },
                { icon: Star, value: '4,8 / 5', label: 'Ø Leser-Bewertung' },
                { icon: Shield, value: '100% unabhängig', label: 'keine gekauften Tests' },
                { icon: TrendingUp, value: 'Täglich', label: 'Preise aktualisiert' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <Icon className="w-5 h-5 text-blue-300 mb-0.5" />
                  <span className="font-bold text-white text-sm">{value}</span>
                  <span className="text-xs text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdBanner slot="header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-heading">Kategorien</h2>
            <p className="section-subheading">Alle Elektronik-Kategorien im Überblick</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map(cat => <CategoryCard key={cat.id} category={cat} />)}
        </div>
      </section>

      {/* Hot Deals */}
      {dealsProducts.length > 0 && (
        <section className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <h2 className="section-heading text-2xl">Aktuelle Deals</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reduzierte Preise bei Amazon</p>
                </div>
              </div>
              <Link href="/category/smartphones" className="btn-secondary text-sm py-2 px-4 hidden sm:flex">
                Alle Deals <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dealsProducts.map(product => {
                const discount = product.oldPrice ? discountPercent(product.price, product.oldPrice) : 0
                return (
                  <div key={product.id} className="card p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500">{product.brand}</p>
                        <Link href={`/product/${product.slug}`} className="font-bold text-sm text-gray-900 dark:text-white hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {product.name}
                        </Link>
                      </div>
                      <span className="badge bg-red-500 text-white flex-shrink-0 badge-sale">-{discount}%</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
                      <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice!)}</span>
                    </div>
                    <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer"
                      className="btn-amazon text-sm py-2 justify-center">
                      <ShoppingCart className="w-4 h-4" /> Bei Amazon kaufen
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Top Comparisons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-heading">Top Vergleiche 2026</h2>
            <p className="section-subheading">Die beliebtesten Produkt-Duelle unserer Leser</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredComparisons.map(comparison => (
            <Link key={comparison.id} href={`/compare/${comparison.slug}`}
              className="card-hover p-6 flex flex-col gap-3 group">
              <div className="text-3xl">
                {comparison.category === 'smartphones' ? '📱' :
                 comparison.category === 'laptops' ? '💻' :
                 comparison.category === 'kopfhoerer' ? '🎧' : '📱'}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                {comparison.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">
                {comparison.description}
              </p>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-auto">
                Zum Vergleich <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 dark:bg-gray-900/50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-heading">Empfohlene Geräte</h2>
              <p className="section-subheading">Von unseren Experten ausführlich getestet</p>
            </div>
            <Link href="/category/smartphones" className="hidden sm:flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">
              Alle Geräte <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredProducts.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} showSpecs />
            ))}
          </div>
        </div>
      </section>

      <AdBanner slot="in-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" />

      {/* Blog / Tests */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-heading">Aktuelle Tests & Kaufberatung</h2>
            <p className="section-subheading">Fundierte Analysen für die beste Kaufentscheidung</p>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">
            Alle Artikel <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured post (large) */}
          {featuredPosts[0] && (
            <div className="lg:col-span-1">
              <BlogCard post={featuredPosts[0]} variant="hero" />
            </div>
          )}
          {/* Rest */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featuredPosts.slice(1, 5).map(post => (
              <BlogCard key={post.id} post={post} variant="default" />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Kein Deal mehr verpassen</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Die besten Elektronik-Deals, neue Vergleiche und Preis-Crashs direkt in dein Postfach.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="deine@email.de"
              className="flex-1 px-5 py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white" />
            <button className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap">
              Kostenlos anmelden
            </button>
          </div>
          <p className="text-xs text-blue-200 mt-3">Kein Spam · Jederzeit abbestellbar · Datenschutz beachtet</p>
        </div>
      </section>
    </>
  )
}
