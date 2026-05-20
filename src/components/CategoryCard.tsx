import Link from 'next/link'
import {
  Brain, Code, Server, Shield, Smartphone, Laptop, Headphones
} from 'lucide-react'
import { Category } from '@/types'

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Code, Server, Shield, Smartphone, Laptop, Headphones,
}

const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', icon: 'text-purple-600 dark:text-purple-400', border: 'hover:border-purple-300 dark:hover:border-purple-700' },
  blue:   { bg: 'bg-blue-50 dark:bg-blue-900/20',   icon: 'text-blue-600 dark:text-blue-400',   border: 'hover:border-blue-300 dark:hover:border-blue-700' },
  green:  { bg: 'bg-green-50 dark:bg-green-900/20', icon: 'text-green-600 dark:text-green-400', border: 'hover:border-green-300 dark:hover:border-green-700' },
  red:    { bg: 'bg-red-50 dark:bg-red-900/20',     icon: 'text-red-600 dark:text-red-400',     border: 'hover:border-red-300 dark:hover:border-red-700' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', icon: 'text-orange-600 dark:text-orange-400', border: 'hover:border-orange-300 dark:hover:border-orange-700' },
  yellow: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', icon: 'text-yellow-600 dark:text-yellow-400', border: 'hover:border-yellow-300 dark:hover:border-yellow-700' },
  pink:   { bg: 'bg-pink-50 dark:bg-pink-900/20',   icon: 'text-pink-600 dark:text-pink-400',   border: 'hover:border-pink-300 dark:hover:border-pink-700' },
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = icons[category.icon] ?? Brain
  const colors = colorClasses[category.color] ?? colorClasses.blue

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`card p-6 flex flex-col gap-3 border-2 border-transparent ${colors.border} transition-all duration-200 group`}
    >
      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${colors.icon}`} />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {category.description}
        </p>
      </div>
      <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
        {category.count} Produkte →
      </span>
    </Link>
  )
}
