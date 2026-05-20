'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import productsData from '@/data/products.json'
import { Product } from '@/types'

const products = productsData as Product[]

interface SearchBarProps {
  placeholder?: string
  size?: 'default' | 'hero'
}

export function SearchBar({ placeholder = 'Produkt suchen...', size = 'default' }: SearchBarProps) {
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
      p.category.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q)
    ).slice(0, 6)
    setResults(found)
    setOpen(true)
  }

  const inputClasses = size === 'hero'
    ? 'w-full pl-14 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 shadow-lg'
    : 'w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm'

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 ${size === 'hero' ? 'w-5 h-5' : 'w-4 h-4'}`} />
        <input
          type="text"
          value={query}
          onChange={e => handleInput(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
          onFocus={() => query.length >= 2 && setOpen(true)}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); setOpen(false) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
          {results.map(product => (
            <button
              key={product.id}
              onClick={() => { router.push(`/product/${product.slug}`); setOpen(false); setQuery('') }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-left transition-colors"
            >
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">{product.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{product.category}</div>
              </div>
              <span className="ml-auto text-sm font-semibold text-gray-900 dark:text-white">
                {product.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </span>
            </button>
          ))}
          <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400">{results.length} Ergebnisse für &bdquo;{query}&rdquo;</span>
          </div>
        </div>
      )}

      {open && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Keine Ergebnisse für &bdquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}
