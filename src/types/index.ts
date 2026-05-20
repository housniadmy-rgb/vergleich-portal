export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  priceUnit: string;
  rating: number;
  reviewCount: number;
  description: string;
  shortDesc: string;
  features: string[];
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  affiliateType: 'amazon' | 'saas' | 'affiliate';
  badge?: string;
  featured: boolean;
  image: string;
  type: 'digital' | 'hardware';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
  color: string;
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
