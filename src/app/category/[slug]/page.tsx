import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductCard } from "@/components/ProductCard";
import { AdBanner } from "@/components/AdBanner";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import type { Category, Product } from "@/types";

const categories = categoriesData as Category[];
const products = productsData as Product[];

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};
  return {
    title: `${category.name} Vergleich 2026 – Die besten ${category.name}`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: Props) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const categoryProducts = products.filter((p) => p.category === params.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: category.name }]} />

      <div className="mt-6 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          {category.name} – Vergleich 2026
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          {category.description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 xl:w-72 flex-shrink-0 space-y-6">
          <div className="card p-5">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Filter</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max. Preis
                </label>
                <select className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Alle Preise</option>
                  <option>Bis 10 €/Monat</option>
                  <option>10 – 30 €/Monat</option>
                  <option>30 – 100 €/Monat</option>
                  <option>Über 100 €</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mindestbewertung
                </label>
                <select className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Alle</option>
                  <option>4+ Sterne</option>
                  <option>4.5+ Sterne</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sortierung
                </label>
                <select className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Empfohlen</option>
                  <option>Bewertung (hoch–niedrig)</option>
                  <option>Preis (niedrig–hoch)</option>
                  <option>Preis (hoch–niedrig)</option>
                  <option>Beliebteste</option>
                </select>
              </div>
            </div>
          </div>

          <AdBanner slot="sidebar" />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {categoryProducts.length > 0
                ? `${categoryProducts.length} Produkte gefunden`
                : "Keine Produkte in dieser Kategorie"}
            </p>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                In dieser Kategorie sind noch keine Produkte verfügbar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
