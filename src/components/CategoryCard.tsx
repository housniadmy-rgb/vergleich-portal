import Link from 'next/link'
import { Smartphone, Laptop, Tablet, Headphones, Watch, Monitor, Gamepad2, Keyboard } from 'lucide-react'
import { Category } from '@/types'

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone, Laptop, Tablet, Headphones, Watch, Monitor, Gamepad2, Keyboard,
}

const colorMap: Record<string, { from: string; to: string; icon: string; hover: string }> = {
  blue:   { from: 'from-blue-50',   to: 'to-blue-100',   icon: 'text-blue-600',   hover: 'group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-900/40' },
  purple: { from: 'from-purple-50', to: 'to-purple-100', icon: 'text-purple-600', hover: 'group-hover:from-purple-100 group-hover:to-purple-200 dark:group-hover:from-purple-900/40' },
  green:  { from: 'from-green-50',  to: 'to-green-100',  icon: 'text-green-600',  hover: 'group-hover:from-green-100 group-hover:to-green-200 dark:group-hover:from-green-900/40' },
  orange: { from: 'from-orange-50', to: 'to-orange-100', icon: 'text-orange-600', hover: 'group-hover:from-orange-100 group-hover:to-orange-200 dark:group-hover:from-orange-900/40' },
  red:    { from: 'from-red-50',    to: 'to-red-100',    icon: 'text-red-600',    hover: 'group-hover:from-red-100 group-hover:to-red-200 dark:group-hover:from-red-900/40' },
  yellow: { from: 'from-yellow-50', to: 'to-yellow-100', icon: 'text-yellow-600', hover: 'group-hover:from-yellow-100 group-hover:to-yellow-200 dark:group-hover:from-yellow-900/40' },
  pink:   { from: 'from-pink-50',   to: 'to-pink-100',   icon: 'text-pink-600',   hover: 'group-hover:from-pink-100 group-hover:to-pink-200 dark:group-hover:from-pink-900/40' },
  teal:   { from: 'from-teal-50',   to: 'to-teal-100',   icon: 'text-teal-600',   hover: 'group-hover:from-teal-100 group-hover:to-teal-200 dark:group-hover:from-teal-900/40' },
}

const darkBg: Record<string, string> = {
  blue: 'dark:from-blue-900/20 dark:to-blue-900/10', purple: 'dark:from-purple-900/20 dark:to-purple-900/10',
  green: 'dark:from-green-900/20 dark:to-green-900/10', orange: 'dark:from-orange-900/20 dark:to-orange-900/10',
  red: 'dark:from-red-900/20 dark:to-red-900/10', yellow: 'dark:from-yellow-900/20 dark:to-yellow-900/10',
  pink: 'dark:from-pink-900/20 dark:to-pink-900/10', teal: 'dark:from-teal-900/20 dark:to-teal-900/10',
}

const darkIcon: Record<string, string> = {
  blue: 'dark:text-blue-400', purple: 'dark:text-purple-400', green: 'dark:text-green-400',
  orange: 'dark:text-orange-400', red: 'dark:text-red-400', yellow: 'dark:text-yellow-400',
  pink: 'dark:text-pink-400', teal: 'dark:text-teal-400',
}

interface CategoryCardProps { category: Category }

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = icons[category.icon] ?? Smartphone
  const c = colorMap[category.color] ?? colorMap.blue

  return (
    <Link href={`/category/${category.slug}`}
      className={`card group p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200 bg-gradient-to-br ${c.from} ${c.to} ${darkBg[category.color] ?? ''} border-0`}>
      <div className="flex items-start justify-between">
        <Icon className={`w-7 h-7 ${c.icon} ${darkIcon[category.color] ?? ''}`} />
        <span className="text-xs text-gray-500 dark:text-gray-400">{category.count} Geräte</span>
      </div>
      <div>
        <h3 className={`font-bold text-gray-900 dark:text-white group-hover:${c.icon.replace('text-', 'text-')} transition-colors text-base`}>
          {category.name}
        </h3>
        {category.topBrands && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
            {category.topBrands.slice(0, 3).join(' · ')}
          </p>
        )}
      </div>
      <span className={`text-xs font-semibold ${c.icon} ${darkIcon[category.color] ?? ''}`}>
        Jetzt vergleichen →
      </span>
    </Link>
  )
}
