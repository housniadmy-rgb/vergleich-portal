import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getProduct, getRelatedProducts } from "@/lib/products";
import { getCategory } from "@/data/categories";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { ProsCons } from "@/components/ProsCons";
import { Faq } from "@/components/Faq";
import { CtaButton } from "@/components/CtaButton";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import {
  buildMetadata,
  breadcrumbSchema,
  productSchema,
  reviewSchema,
  faqSchema,
  productFaq,
} from "@/lib/seo";
import { formatPrice, discountPercent } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} Test & Preis (${product.releaseYear})`,
    description: `${product.name} im Test: ${product.shortDescription} Specs, Vorteile, Nachteile & aktueller Preis ab ${formatPrice(
      product.price,
    )}.`,
    path: `/produkt/${product.slug}`,
    type: "article",
  });
}

export default function ProductPage({ params }: PageProps) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const related = getRelatedProducts(product, 3);
  const discount = discountPercent(product.price, product.oldPrice);
  const faqItems = productFaq(product);

  const specOrder = [
    ...category.specOrder.filter((k) => product.specs[k]),
    ...Object.keys(product.specs).filter((k) => !category.specOrder.includes(k)),
  ];

  const crumbs = [
    { name: "Start", path: "/" },
    { name: category.name, path: `/kategorie/${category.slug}` },
    { name: product.name, path: `/produkt/${product.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          productSchema(product),
          reviewSchema(product),
          faqSchema(faqItems),
        ]}
      />

      <div className="container-page py-6">
        <Breadcrumbs items={crumbs} />
      </div>

      <div className="container-page grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          {/* Kopfbereich */}
          <div className="card overflow-hidden">
            <ProductImage
              product={product}
              className="aspect-[16/9] w-full"
              size="lg"
            />
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/kategorie/${category.slug}`}
                  className="chip transition hover:text-brand-600"
                >
                  {category.emoji} {category.name}
                </Link>
                <span className="chip">{product.brand}</span>
                <span className="chip">Modelljahr {product.releaseYear}</span>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {product.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <StarRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size="lg"
                />
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                {product.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300"
                  >
                    ✦ {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Spezifikationen */}
          <section className="mt-8" aria-labelledby="specs-heading">
            <h2 id="specs-heading" className="text-2xl font-bold tracking-tight">
              Technische Daten
            </h2>
            <div className="mt-4 card overflow-hidden">
              <dl>
                {specOrder.map((key, index) => (
                  <div
                    key={key}
                    className={`flex justify-between gap-4 px-5 py-3 text-sm ${
                      index % 2 === 1
                        ? "bg-slate-50 dark:bg-slate-900/60"
                        : ""
                    }`}
                  >
                    <dt className="font-medium text-slate-500">{key}</dt>
                    <dd className="text-right font-semibold">
                      {product.specs[key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <div className="my-8">
            <AdSlot format="in-content" slotId="product-content" />
          </div>

          {/* Pro & Contra */}
          <section className="mt-8" aria-labelledby="proscons-heading">
            <h2
              id="proscons-heading"
              className="mb-4 text-2xl font-bold tracking-tight"
            >
              Vorteile & Nachteile
            </h2>
            <ProsCons pros={product.pros} cons={product.cons} />
          </section>

          {/* FAQ */}
          <section className="mt-10">
            <Faq items={faqItems} />
          </section>
        </div>

        {/* Sticky Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="card p-6">
            <p className="text-sm text-slate-500">Bestpreis-Check</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-extrabold tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="pb-1 text-sm text-slate-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            {discount && (
              <span className="mt-2 inline-block rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                Du sparst {discount}%
              </span>
            )}
            <div className="mt-4 space-y-2">
              <CtaButton
                href={product.affiliateLink}
                label="Bei Amazon kaufen"
                fullWidth
              />
              <CtaButton
                href={product.affiliateLink}
                label="Besten Preis ansehen"
                variant="secondary"
                fullWidth
              />
            </div>
            <p className="mt-3 text-center text-xs text-slate-400">
              Affiliate-Link · Preis kann abweichen
            </p>
            <ul className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <CheckIcon /> Geprüfte Spezifikationen
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon /> Tagesaktuelle Preisangabe
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon /> Unabhängige Bewertung
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <AdSlot format="sidebar" slotId="product-sidebar" />
          </div>
        </aside>
      </div>

      {/* Ähnliche Produkte */}
      {related.length > 0 && (
        <section className="container-page py-12">
          <SectionHeading
            eyebrow="Empfehlungen"
            title="Ähnliche Produkte"
            description={`Weitere ${category.name} im Vergleich.`}
            as="h2"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-emerald-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
