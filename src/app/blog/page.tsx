import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Tag } from 'lucide-react'
import { BlogCard } from '@/components/BlogCard'
import { AdBanner } from '@/components/AdBanner'
import blogPostsData from '@/data/blog-posts.json'
import categoriesData from '@/data/categories.json'
import type { BlogPost, Category } from '@/types'

const blogPosts = blogPostsData as unknown as BlogPost[]
const categories = categoriesData as unknown as Category[]

export const metadata: Metadata = {
  title: 'Blog & Kaufberatung – Elektronik Tests 2026',
  description: 'Aktuelle Elektronik-Tests, Kaufberatung und Top-10-Listen. Von Smartphones über Laptops bis zu Kopfhörern – fundierte Analysen für bessere Kaufentscheidungen.',
}

export default function BlogPage() {
  const hero = blogPosts.find(p => p.featured)
  const rest = blogPosts.filter(p => p.id !== hero?.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">Blog & Kaufberatung</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Fundierte Tests, Vergleiche und Kauftipps für smarte Elektronik-Entscheidungen.
        </p>
      </div>

      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-10 mt-8">
        <div className="flex-1 min-w-0 space-y-8">
          {hero && <BlogCard post={hero} variant="hero" />}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {rest.map(post => <BlogCard key={post.id} post={post} variant="default" />)}
          </div>
        </div>
        <aside className="lg:w-72 flex-shrink-0 space-y-5">
          <div className="card p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Kategorien</h3>
            <div className="space-y-0.5">
              {categories.map(cat => (
                <Link key={cat.id} href={`/category/${cat.slug}`}
                  className="flex items-center justify-between py-2 px-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="flex items-center gap-2"><Tag className="w-3.5 h-3.5" />{cat.name}</span>
                  <span className="text-xs text-gray-400">{cat.count}</span>
                </Link>
              ))}
            </div>
          </div>
          <AdBanner slot="sidebar" />
          <div className="card p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Top Vergleiche</h3>
            <ul className="space-y-2">
              {[
                { label: 'iPhone vs. Samsung S25 Ultra', href: '/compare/iphone-16-pro-vs-samsung-galaxy-s25-ultra' },
                { label: 'Beste Laptops 2026', href: '/compare/beste-laptops-2026' },
                { label: 'Beste Kopfhörer 2026', href: '/compare/beste-noise-cancelling-kopfhoerer-2026' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />{l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
