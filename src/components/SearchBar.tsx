'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Smartphone, Laptop, Headphones } from 'lucide-react'
import productsData from '@/data/products.json'
import { Product } from '@/types'

const products = productsData as unknown as Product[]

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  smartphones: Smartphone,
  laptops: Laptop,
  kopfhoerer: Headphones,
}

interface SearchBarProps {
  placeholder?: string
  size?: 'default' | 'hero'
}

export function SearchBar({ placeholder = 'Gerät suchen...', size = 'default' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleInput = (value: string) => {
    setQuery(value)
    if (value.length < 2) { setResults([]); setOpen(false); return }
    const q = value.toLowerCase()
    const found = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q)
    ).slice(0, 7)
    setResults(found)
    setOpen(true)
  }

  const inputClasses = size === 'hero'
    ? 'w-full pl-14 pr-12 py-4 text-lg rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/50 shadow-lg'
    : 'w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${size === 'hero' ? 'text-white/70 w-5 h-5' : 'text-gray-400 w-4 h-4'}`} />
        <input
          type="text"
          value={query}
          onChange={e => handleInput(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
          onFocus={() => query.length >= 2 && setOpen(true)}
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); setOpen(false) }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${size === 'hero' ? 'text-white/70 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}>
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Suchergebnisse</span>
          </div>
          {results.map(product => {
            const Icon = categoryIcons[product.category] ?? Smartphone
            return (
              <button key={product.id}
                onClick={() => { router.push(`/product/${product.slug}`); setOpen(false); setQuery('') }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-left transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white text-sm truncate">{product.name}</div>
                  <div className="text-xs text-gray-400">{product.brand} · {product.category}</div>
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white flex-shrink-0">
                  {product.price.toLocaleString('de-DE')} €
                </div>
              </button>
            )
          })}
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
            {results.length} Ergebnis{results.length !== 1 ? 'se' : ''} &mdash; Enter zum Suchen
          </div>
        </div>
      )}

      {open && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl px-4 py-6 text-center">
          <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Kein Gerät gefunden</p>
        </div>
      )}
    </div>
  )
}
