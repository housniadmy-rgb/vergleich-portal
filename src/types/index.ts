export type CategorySlug =
  | "smartphones"
  | "laptops"
  | "tablets"
  | "kopfhoerer"
  | "smartwatches"
  | "monitore"
  | "gaming"
  | "zubehoer";

export interface Product {
  name: string;
  slug: string;
  category: CategorySlug;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  releaseYear: number;
  popularity: number;
  shortDescription: string;
  description: string;
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  highlights: string[];
  affiliateLink: string;
}

export interface Comparison {
  slug: string;
  title: string;
  heading: string;
  description: string;
  intro: string;
  category: CategorySlug;
  productSlugs: string[];
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  updated?: string;
  readingTime: number;
  author: string;
  sections: BlogSection[];
  relatedProducts: string[];
  relatedComparisons: string[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  emoji: string;
  tagline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  specOrder: string[];
  gradient: string;
}
