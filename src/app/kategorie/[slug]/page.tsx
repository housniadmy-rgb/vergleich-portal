import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategory } from "@/data/categories";
import {
  getProductsByCategory,
  getBrands,
  getPriceRange,
  getComparisonsByCategory,
} from "@/lib/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryBrowser } from "@/components/CategoryBrowser";
import { ComparisonCard } from "@/components/ComparisonCard";
import { SectionHeading } from "@/components/SectionHeading";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};
  return buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/kategorie/${category.slug}`,
  });
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);
  const brands = getBrands(category.slug);
  const priceRange = getPriceRange(category.slug);
  const comparisons = getComparisonsByCategory(category.slug);

  const crumbs = [
    { name: "Start", path: "/" },
    { name: "Kategorien", path: "/#kategorien" },
    { name: category.name, path: `/kategorie/${category.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section
        className={`border-b border-slate-200 bg-gradient-to-br ${category.gradient} dark:border-slate-800`}
      >
        <div className="container-page py-10 text-white">
          <Breadcrumbs
            items={crumbs.map((c) => ({ name: c.name, path: c.path }))}
          />
          <div className="mt-4 flex items-center gap-3">
            <span className="text-4xl" aria-hidden>
              {category.emoji}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {category.name} vergleichen
            </h1>
          </div>
          <p className="mt-3 max-w-2xl text-white/90">{category.description}</p>
          <p className="mt-2 text-sm text-white/75">
            {products.length} Produkte · ab{" "}
            {priceRange.min.toLocaleString("de-DE")} €
          </p>
        </div>
      </section>

      <div className="container-page py-6">
        <AdSlot format="header" slotId="category-header" />
      </div>

      <section className="container-page pb-10">
        <CategoryBrowser
          products={products}
          brands={brands}
          priceRange={priceRange}
        />
      </section>

      {comparisons.length > 0 && (
        <section className="container-page py-10">
          <SectionHeading
            eyebrow="Passende Vergleiche"
            title={`${category.shortName} im Direktvergleich`}
            as="h2"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comparison) => (
              <ComparisonCard key={comparison.slug} comparison={comparison} />
            ))}
          </div>
        </section>
      )}

      <section className="container-page pb-16">
        <div className="card p-8">
          <h2 className="text-xl font-bold">
            {category.name}: Worauf es beim Kauf ankommt
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {category.description} In unserem {category.shortName}-Vergleich
            stellen wir die wichtigsten Modelle objektiv gegenüber. Achte beim
            Kauf besonders auf{" "}
            {category.specOrder.slice(0, 4).join(", ")} – diese Eigenschaften
            entscheiden maßgeblich über die Alltagstauglichkeit. Nutze die Filter
            oben, um die Auswahl nach Preis, Marke und Bewertung einzugrenzen,
            und vergleiche deine Favoriten anschließend Spec für Spec.
          </p>
        </div>
      </section>
    </>
  );
}
