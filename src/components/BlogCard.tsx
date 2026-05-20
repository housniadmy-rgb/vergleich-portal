import Link from 'next/link'
import { Clock, User, Tag } from 'lucide-react'
import { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString('de-DE', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="card overflow-hidden group block">
        <div className="h-48 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
          <span className="text-white/30 text-6xl font-bold">{post.category.toUpperCase()}</span>
        </div>
        <div className="p-6 space-y-3">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
            <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} Min.</span>
            <span>{date}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="card p-5 flex gap-4 group">
      <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <span className="text-white text-xs font-bold">{post.category.slice(0, 2).toUpperCase()}</span>
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mt-auto">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} Min.</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  )
}
