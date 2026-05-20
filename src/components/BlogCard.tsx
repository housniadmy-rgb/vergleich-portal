import Link from 'next/link'
import { Clock, User, ArrowRight } from 'lucide-react'
import { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'compact' | 'hero'
}

const categoryColors: Record<string, string> = {
  smartphones: 'from-blue-600 to-blue-800',
  laptops: 'from-purple-600 to-indigo-800',
  tablets: 'from-green-600 to-teal-800',
  kopfhoerer: 'from-orange-500 to-red-700',
  smartwatches: 'from-red-500 to-rose-700',
  monitore: 'from-yellow-500 to-orange-700',
  gaming: 'from-pink-600 to-purple-800',
  zubehoer: 'from-teal-600 to-cyan-800',
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })
  const gradient = categoryColors[post.category] ?? 'from-gray-600 to-gray-800'

  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`} className="flex items-start gap-3 group py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
        <div className={`w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <span className="text-white text-xs font-bold">{post.category.slice(0, 2).toUpperCase()}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 leading-snug transition-colors">
            {post.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
            <Clock className="w-3 h-3" />{post.readTime} Min.
            <span>·</span>{date}
          </p>
        </div>
      </Link>
    )
  }

  if (variant === 'hero') {
    return (
      <Link href={`/blog/${post.slug}`} className="card-hover overflow-hidden group block">
        <div className={`h-56 bg-gradient-to-br ${gradient} p-8 flex flex-col justify-end`}>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full">{tag}</span>
            ))}
          </div>
          <h2 className="text-xl font-bold text-white leading-snug group-hover:underline line-clamp-2">{post.title}</h2>
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} Min. Lesezeit</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="card-hover overflow-hidden group block">
      <div className={`h-36 bg-gradient-to-br ${gradient} flex items-end p-5`}>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-white/20 text-white rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2">
          {post.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} Min.</span>
          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">Lesen <ArrowRight className="w-3 h-3" /></span>
        </div>
      </div>
    </Link>
  )
}
