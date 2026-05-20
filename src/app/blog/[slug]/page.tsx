import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Clock, User, ArrowRight, Tag, ArrowLeft } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { BlogCard } from '@/components/BlogCard'
import { AdBanner } from '@/components/AdBanner'
import blogPostsData from '@/data/blog-posts.json'
import type { BlogPost } from '@/types'

const blogPosts = blogPostsData as BlogPost[]

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://vergleich-portal.de/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  }
}

const sampleContent = (post: BlogPost): string => `
## Einleitung

${post.excerpt}

In diesem ausführlichen Test haben wir die wichtigsten Aspekte untersucht und alle Vor- und Nachteile für dich zusammengefasst.

## Was ist das Wichtigste?

Bei der Wahl des richtigen Produkts in der Kategorie **${post.category}** kommt es auf mehrere Faktoren an: Preis, Funktionsumfang, Zuverlässigkeit und Kundensupport. Wir haben alle relevanten Kriterien unter die Lupe genommen.

## Unsere Bewertung

Nach ausführlichen Tests können wir sagen: Die Produkte in dieser Kategorie haben sich 2026 enorm weiterentwickelt. Es gibt heute für jeden Anwendungsfall eine passende Lösung – ob für Privatnutzer, Freelancer oder Unternehmen.

## Fazit

${post.excerpt} Wer auf der Suche nach dem besten Produkt in dieser Kategorie ist, sollte sich unsere ausführlichen Vergleiche nicht entgehen lassen.
`

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const related = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2)
  const date = new Date(post.publishedAt).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })

  const content = sampleContent(post)
  const paragraphs = content.split('\n').filter(l => l.trim())

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.publishedAt,
    publisher: { '@type': 'Organization', name: 'VergleichPortal' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]} />

        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          {/* Article */}
          <article className="flex-1 min-w-0">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                    <Tag className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-5 border-b border-gray-200 dark:border-gray-800">
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime} Min. Lesezeit</span>
                <span>{date}</span>
              </div>
            </div>

            <div className="h-64 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-8 flex items-center justify-center">
              <span className="text-white/20 text-7xl font-black">{post.category.toUpperCase()}</span>
            </div>

            <AdBanner slot="in-content" />

            {/* Article body */}
            <div className="prose prose-gray dark:prose-invert max-w-none mt-6 space-y-4">
              {paragraphs.map((para, i) => {
                if (para.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                      {para.replace('## ', '')}
                    </h2>
                  )
                }
                return (
                  <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                )
              })}
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Ähnliche Artikel</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {related.map(p => <BlogCard key={p.id} post={p} />)}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
                <ArrowLeft className="w-4 h-4" /> Zurück zum Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0 space-y-5">
            <div className="sticky top-24 space-y-5">
              <div className="card p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Top Vergleiche</h3>
                <ul className="space-y-2">
                  {[
                    { label: 'Beste VPN 2026', href: '/compare/beste-vpn-2026' },
                    { label: 'KI Tools Vergleich', href: '/compare/ki-tools-vergleich-2026' },
                    { label: 'Beste Smartphones', href: '/compare/beste-smartphones-2026' },
                  ].map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline py-0.5">
                        <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />{l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <AdBanner slot="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
