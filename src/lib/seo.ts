import type { Metadata } from "next";
import { siteConfig } from "./site";
import type { BlogPost, Comparison, Product } from "@/types";
import { formatPrice } from "./utils";

interface MetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

export function buildMetadata({ title, description, path, type = "website" }: MetaInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/* ---------- JSON-LD Schema Markup ---------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/suche?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/produkt/${product.slug}`,
    },
  };
}

export function reviewSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: product.name,
      brand: { "@type": "Brand", name: product.brand },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.rating,
      bestRating: 5,
    },
    author: { "@type": "Organization", name: siteConfig.name },
    reviewBody: product.description,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function comparisonSchema(comparison: Comparison, products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: comparison.title,
    description: comparison.description,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "EUR",
        },
      },
    })),
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };
}

export function productFaq(product: Product): { question: string; answer: string }[] {
  return [
    {
      question: `Was kostet das ${product.name}?`,
      answer: `Das ${product.name} ist aktuell ab ${formatPrice(
        product.price,
      )} erhältlich. Preise können je nach Händler und Angebot variieren.`,
    },
    {
      question: `Wie gut ist das ${product.name}?`,
      answer: `Das ${product.name} erreicht in unserem Vergleich eine Bewertung von ${product.rating} von 5 Sternen, basierend auf ${product.reviewCount.toLocaleString(
        "de-DE",
      )} Nutzerbewertungen.`,
    },
    {
      question: `Für wen lohnt sich das ${product.name}?`,
      answer: `${product.description}`,
    },
  ];
}
