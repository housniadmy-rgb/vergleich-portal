import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Star } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { BlogCard } from "@/components/BlogCard";
import { AdBanner } from "@/components/AdBanner";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import comparisonsData from "@/data/comparisons.json";
import blogPostsData from "@/data/blog-posts.json";
import type { Category, Product, Comparison, BlogPost } from "@/types";

const categories = categoriesData as Category[];
const products = productsData as Product[];
const comparisons = comparisonsData as Comparison[];
const blogPosts = blogPostsData as BlogPost[];

const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
const featuredComparisons = comparisons.filter((c) => c.featured);
const featuredPosts = blogPosts.filter((p) => p.featured).slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-indigo-900 dark:to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Aktualisiert für 2026</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Die besten Produkte{" "}
              <span className="text-yellow-300">vergleichen</span> &amp; finden
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed">
              KI-Tools, VPN, Hosting, Smartphones und mehr – mit echten Bewertungen,
              aktuellen Preisen und unabhängigen Empfehlungen.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto mb-10">
              <SearchBar placeholder="KI Tools, VPN, Hosting suchen..." size="hero" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-14">
              <Link href="/category/ki-tools" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                KI Tools entdecken <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/compare/beste-vpn-2026" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl transition-colors border border-white/20">
                Vergleiche ansehen
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { value: "1.000+", label: "Produkte" },
                { value: "50+", label: "Kategorien" },
                { value: "10.000+", label: "Bewertungen" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner slot="header" />
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-heading">Alle Kategorien</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Vergleiche in über 50 Kategorien</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Top Comparisons */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-heading">Top Vergleiche 2026</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Die beliebtesten Produkt-Vergleiche</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredComparisons.map((comparison) => (
              <Link
                key={comparison.id}
                href={`/compare/${comparison.slug}`}
                className="card p-6 group hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 capitalize">
                    {comparison.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 leading-tight">
                  {comparison.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {comparison.description}
                </p>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  Vergleich ansehen <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-heading">Empfohlene Produkte</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Unsere Top-Empfehlungen mit besten Bewertungen</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-heading">Aktuelle Tests &amp; Ratgeber</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Expertenwissen für bessere Kaufentscheidungen</p>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm">
              Alle Artikel <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdBanner slot="in-content" />
      </div>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="w-10 h-10 text-yellow-300 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Finde das perfekte Produkt
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Spare Zeit und Geld mit unseren unabhängigen Tests und Vergleichen.
            Täglich aktualisiert von echten Experten.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/category/ki-tools" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              KI Tools vergleichen <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/category/vpn" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl transition-colors border border-white/20">
              VPN-Vergleich
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
