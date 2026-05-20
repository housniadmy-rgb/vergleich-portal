import { MetadataRoute } from 'next'
import categoriesData from '@/data/categories.json'
import productsData from '@/data/products.json'
import comparisonsData from '@/data/comparisons.json'
import blogPostsData from '@/data/blog-posts.json'

const BASE_URL = 'https://vergleich-portal.de'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categoriesData.map(cat => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const productRoutes: MetadataRoute.Sitemap = productsData.map(product => ({
    url: `${BASE_URL}/product/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const compareRoutes: MetadataRoute.Sitemap = comparisonsData.map(comp => ({
    url: `${BASE_URL}/compare/${comp.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPostsData.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...compareRoutes, ...productRoutes, ...blogRoutes]
}
