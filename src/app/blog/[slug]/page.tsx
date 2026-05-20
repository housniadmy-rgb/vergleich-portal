import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Clock, User, ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { BlogCard } from '@/components/BlogCard'
import { AdBanner } from '@/components/AdBanner'
import blogPostsData from '@/data/blog-posts.json'
import type { BlogPost } from '@/types'

const blogPosts = blogPostsData as unknown as BlogPost[]

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://techvergleich.de/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  }
}

const catColors: Record<string, string> = {
  smartphones: 'from-blue-600 to-blue-900',
  laptops: 'from-purple-600 to-indigo-900',
  tablets: 'from-green-600 to-teal-900',
  kopfhoerer: 'from-orange-500 to-red-800',
  smartwatches: 'from-red-500 to-rose-800',
  monitore: 'from-yellow-500 to-orange-800',
  gaming: 'from-pink-600 to-purple-900',
  zubehoer: 'from-teal-600 to-cyan-900',
}

function generateContent(post: BlogPost): string[] {
  return [
    `## Einleitung`,
    post.excerpt,
    `In diesem ausführlichen Artikel beleuchten wir alle wichtigen Aspekte und helfen dir, die beste Kaufentscheidung zu treffen.`,
    `## Was ist 2026 wichtig?`,
    `Der Markt für ${post.category === 'smartphones' ? 'Smartphones' : post.category === 'laptops' ? 'Laptops' : 'Elektronik'} hat sich 2026 stark weiterentwickelt. Neue Modelle überzeugen mit besserer Performance, längerer Akkulaufzeit und fortschrittlicheren Features. Gleichzeitig sind die Preise für viele Geräte gesunken.`,
    `Beim Kauf solltest du auf folgende Kriterien achten: **Performance**, **Akkulaufzeit**, **Verarbeitung** und natürlich das **Preis-Leistungs-Verhältnis**.`,
    `## Unsere Top-Empfehlungen`,
    `Basierend auf ausführlichen Tests empfehlen wir die Modelle, die in allen wichtigen Kategorien überzeugen. Besonders wichtig ist uns die **langfristige Softwareunterstützung** – ein Gerät, das 7 Jahre Updates erhält, ist deutlich wertvoller als eines, das nach 2 Jahren keinen Support mehr bekommt.`,
    `## Fazit`,
    `${post.excerpt} Unsere detaillierten Produkttests und Vergleiche helfen dir, das perfekte Gerät für deine Bedürfnisse zu finden. Klick auf die Produktlinks, um aktuelle Amazon-Preise zu prüfen.`,
  ]
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 2)
  const date = new Date(post.publishedAt).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })
  const paragraphs = generateContent(post)
  const gradient = catColors[post.category] ?? 'from-gray-700 to-gray-900'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    publisher: { '@type': 'Organization', name: 'TechVergleich', url: 'https://techvergleich.de' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          <article className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 badge bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                  <Tag className="w-3 h-3" />{tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-5 border-b border-gray-200 dark:border-gray-800">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime} Min. Lesezeit</span>
              <span>{date}</span>
            </div>

            <div className={`h-64 bg-gradient-to-br ${gradient} rounded-2xl my-8 flex items-center justify-center`}>
              <span className="text-white/10 text-8xl font-black select-none">{post.category.slice(0, 4).toUpperCase()}</span>
            </div>

            <AdBanner slot="in-content" />

            <div className="mt-6 space-y-5 text-gray-700 dark:text-gray-300">
              {paragraphs.map((para, i) => {
                if (para.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3">{para.replace('## ', '')}</h2>
                }
                return (
                  <p key={i} className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>') }}
                  />
                )
              })}
            </div>

            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Weitere Artikel</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {related.map(p => <BlogCard key={p.id} post={p} variant="default" />)}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm">
                <ArrowLeft className="w-4 h-4" /> Zurück zum Blog
              </Link>
            </div>
          </article>

          <aside className="lg:w-72 flex-shrink-0 space-y-5">
            <div className="sticky top-24 space-y-5">
              <div className="card p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Top Vergleiche</h3>
                <ul className="space-y-2">
                  {[
                    { label: 'iPhone vs. Samsung', href: '/compare/iphone-16-pro-vs-samsung-galaxy-s25-ultra' },
                    { label: 'Beste Laptops 2026', href: '/compare/beste-laptops-2026' },
                    { label: 'Beste Kopfhörer', href: '/compare/beste-noise-cancelling-kopfhoerer-2026' },
                    { label: 'iPad vs. Galaxy Tab', href: '/compare/ipad-pro-m4-vs-samsung-galaxy-tab-s9-ultra' },
                  ].map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
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
