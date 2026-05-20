'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Cpu, ChevronDown, Menu, X, Search, ShoppingCart } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import categoriesData from '@/data/categories.json'

const categories = categoriesData

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900 dark:text-white">Tech<span className="text-blue-600">Vergleich</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <div className="relative" onMouseLeave={() => setCatOpen(false)}>
              <button
                onMouseEnter={() => setCatOpen(true)}
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors text-sm"
              >
                Kategorien <ChevronDown className={`w-4 h-4 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50">
                  <div className="grid grid-cols-2 gap-0.5 p-2">
                    {categories.map(cat => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        onClick={() => setCatOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="ml-auto text-xs text-gray-400">{cat.count}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/compare/iphone-16-pro-vs-samsung-galaxy-s25-ultra" className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors text-sm">
              Vergleiche
            </Link>
            <Link href="/blog" className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors text-sm">
              Blog
            </Link>
            <Link href="/category/smartphones" className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors text-sm">
              Deals
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link href="/category/smartphones" className="hidden md:flex p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Suche">
              <Search className="w-5 h-5" />
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors"
              aria-label="Menü"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-3 space-y-1">
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2 pb-1">Kategorien</p>
            <div className="grid grid-cols-2 gap-1">
              {categories.map(cat => (
                <Link key={cat.id} href={`/category/${cat.slug}`} onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 space-y-1">
              {[
                { href: '/compare/iphone-16-pro-vs-samsung-galaxy-s25-ultra', label: 'Vergleiche' },
                { href: '/blog', label: 'Blog & Tests' },
                { href: '/category/smartphones', label: '🔥 Deals' },
              ].map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
