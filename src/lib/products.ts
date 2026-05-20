import productsData from "@/data/products.json";
import comparisonsData from "@/data/comparisons.json";
import type { CategorySlug, Comparison, Product } from "@/types";

const products = productsData as unknown as Product[];
const comparisons = comparisonsData as unknown as Comparison[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProducts(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getTrendingProducts(limit = 6): Product[] {
  return [...products].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

export function getTopRatedProducts(limit = 4): Product[] {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getDealProducts(limit = 4): Product[] {
  return products
    .filter((p) => p.oldPrice && p.oldPrice > p.price)
    .sort((a, b) => (b.oldPrice! - b.price) - (a.oldPrice! - a.price))
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function getBrands(category?: CategorySlug): string[] {
  const pool = category ? getProductsByCategory(category) : products;
  return Array.from(new Set(pool.map((p) => p.brand))).sort();
}

export function getPriceRange(category?: CategorySlug): { min: number; max: number } {
  const pool = category ? getProductsByCategory(category) : products;
  if (pool.length === 0) return { min: 0, max: 0 };
  const prices = pool.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getAllComparisons(): Comparison[] {
  return comparisons;
}

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getComparisonsByCategory(category: CategorySlug): Comparison[] {
  return comparisons.filter((c) => c.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = `${p.name} ${p.brand} ${p.category} ${p.shortDescription}`.toLowerCase();
    return q.split(/\s+/).every((term) => haystack.includes(term));
  });
}
