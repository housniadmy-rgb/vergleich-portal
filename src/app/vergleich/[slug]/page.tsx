import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllComparisons,
  getComparison,
  getProducts,
} from "@/lib/products";
import { getCategory } from "@/data/categories";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompareTable } from "@/components/CompareTable";
import { CtaButton } from "@/components/CtaButton";
import { AdSlot } from "@/components/AdSlot";
import { Faq } from "@/components/Faq";
import { StarRating } from "@/components/StarRating";
import { JsonLd } from "@/components/JsonLd";
import {
  buildMetadata,
  breadcrumbSchema,
  comparisonSchema,
  faqSchema,
} from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllComparisons().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const comparison = getComparison(params.slug);
  if (!comparison) return {};
  return buildMetadata({
    title: comparison.title,
    description: comparison.description,
    path: `/vergleich/${comparison.slug}`,
    type: "article",
  });
}

export default function ComparisonPage({ params }: PageProps) {
  const comparison = getComparison(params.slug);
  if (!comparison) notFound();

  const category = getCategory(comparison.category)!;
  const products = getProducts(comparison.productSlugs);
  if (products.length < 2) notFound();

  const cheapest = [...products].sort((a, b) => a.price - b.price)[0];
  const bestRated = [...products].sort((a, b) => b.rating - a.rating)[0];

  const crumbs = [
    { name: "Start", path: "/" },
    { name: "Vergleiche", path: "/vergleich" },
    { name: comparison.heading, path: `/vergleich/${comparison.slug}` },
  ];

  const faqItems = [
    {
      question: `Welches Produkt ist am günstigsten?`,
      answer: `Am günstigsten ist das ${cheapest.name} ab ${formatPrice(
        cheapest.price,
      )}.`,
    },
    {
      question: `Welches Produkt hat die beste Bewertung?`,
      answer: `Die beste Bewertung erreicht das ${bestRated.name} mit ${bestRated.rating} von 5 Sternen.`,
    },
    {
      question: `Wie viele Produkte werden hier verglichen?`,
      answer: `In diesem Vergleich stellen wir ${products.length} ${category.name} direkt gegenüber.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          comparisonSchema(comparison, products),
          faqSchema(faqItems),
        ]}
      />

      <div className="container-page py-6">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {comparison.heading}
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
          {comparison.intro}
        </p>
      </div>

      <div className="container-page">
        <AdSlot format="header" slotId="comparison-header" />
      </div>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <h2 className="mb-4 text-xl font-bold">Vergleichstabelle</h2>
          <CompareTable products={products} />

          <div className="my-8">
            <AdSlot format="in-content" slotId="comparison-content" />
          </div>

          <section aria-labelledby="verdict-heading">
            <h2 id="verdict-heading" className="text-2xl font-bold tracking-tight">
              Unser Fazit
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  🏆 Testsieger
                </p>
                <p className="mt-1 font-bold">{bestRated.name}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Beste Gesamtbewertung mit {bestRated.rating} Sternen.
                  {" "}
                  {bestRated.shortDescription}
                </p>
              </div>
              <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5 dark:border-brand-900/60 dark:bg-brand-950/30">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
                  💶 Preistipp
                </p>
                <p className="mt-1 font-bold">{cheapest.name}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Günstigster Einstieg ab {formatPrice(cheapest.price)}.
                  {" "}
                  {cheapest.shortDescription}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <Faq items={faqItems} />
          </section>
        </div>

        {/* Sticky CTA Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="card p-5">
            <h2 className="font-bold">Direkt zum Angebot</h2>
            <div className="mt-4 space-y-4">
              {products.map((product) => (
                <div
                  key={product.slug}
                  className="border-b border-slate-200 pb-4 last:border-0 last:pb-0 dark:border-slate-800"
                >
                  <Link
                    href={`/produkt/${product.slug}`}
                    className="text-sm font-bold transition hover:text-brand-600"
                  >
                    {product.name}
                  </Link>
                  <div className="mt-1">
                    <StarRating
                      rating={product.rating}
                      size="sm"
                      showValue
                    />
                  </div>
                  <p className="mt-1 text-lg font-extrabold">
                    {formatPrice(product.price)}
                  </p>
                  <CtaButton
                    href={product.affiliateLink}
                    label="Preis ansehen"
                    fullWidth
                    className="mt-2 !py-2.5 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <AdSlot format="sidebar" slotId="comparison-sidebar" />
          </div>
        </aside>
      </div>
    </>
  );
}
