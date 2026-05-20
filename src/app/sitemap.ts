import { MetadataRoute } from 'next'
import categoriesData from '@/data/categories.json'
import productsData from '@/data/products.json'
import comparisonsData from '@/data/comparisons.json'
import blogPostsData from '@/data/blog-posts.json'

const BASE = 'https://techvergleich.de'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    ...categoriesData.map(c => ({ url: `${BASE}/category/${c.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 })),
    ...comparisonsData.map(c => ({ url: `${BASE}/compare/${c.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...productsData.map(p => ({ url: `${BASE}/product/${p.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.75 })),
    ...blogPostsData.map(p => ({ url: `${BASE}/blog/${p.slug}`, lastModified: new Date(p.publishedAt), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
