import Link from 'next/link'
import type { Metadata } from 'next'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import { BlogCard } from '@/components/BlogCard'
import { AdBanner } from '@/components/AdBanner'
import blogPostsData from '@/data/blog-posts.json'
import categoriesData from '@/data/categories.json'
import type { BlogPost, Category } from '@/types'

const blogPosts = blogPostsData as BlogPost[]
const categories = categoriesData as Category[]

export const metadata: Metadata = {
  title: 'Blog – Tests, Ratgeber & Vergleiche 2026',
  description: 'Aktuelle Tests, Ratgeber und Vergleiche für KI-Tools, VPN, Hosting, Smartphones und mehr. Von Experten verfasst, regelmäßig aktualisiert.',
}

export default function BlogPage() {
  const featured = blogPosts.find(p => p.featured)
  const rest = blogPosts.filter(p => p.id !== featured?.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">Blog & Ratgeber</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Expertenwissen für bessere Kaufentscheidungen – unabhängig und aktuell.
        </p>
      </div>

      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-10 mt-8">
        <div className="flex-1 min-w-0">
          {/* Featured Post */}
          {featured && (
            <div className="mb-10">
              <Link href={`/blog/${featured.slug}`} className="card overflow-hidden group block">
                <div className="h-64 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-end p-8">
                  <div>
                    <div className="flex gap-2 mb-3">
                      {featured.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-white/20 text-white rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight group-hover:underline">
                      {featured.title}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{featured.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featured.readTime} Min.</span>
                    <span>{new Date(featured.publishedAt).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Rest of posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-72 flex-shrink-0 space-y-6">
          <div className="card p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Kategorien</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                  >
                    <span className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5" />
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-400">{cat.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <AdBanner slot="sidebar" />

          <div className="card p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Top Vergleiche</h3>
            <ul className="space-y-2">
              {[
                { label: 'Beste VPN 2026', href: '/compare/beste-vpn-2026' },
                { label: 'KI Tools Vergleich', href: '/compare/ki-tools-vergleich-2026' },
                { label: 'Beste Smartphones', href: '/compare/beste-smartphones-2026' },
                { label: 'Beste Laptops', href: '/compare/beste-laptops-2026' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline py-0.5">
                    <ArrowRight className="w-3.5 h-3.5" /> {link.label}
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
