export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  shortDesc: string;
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  amazonAsin?: string;
  badge?: string | null;
  featured: boolean;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
  color: string;
  topBrands?: string[];
}

export interface Comparison {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  products: string[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  image: string;
  featured: boolean;
  tags: string[];
}
