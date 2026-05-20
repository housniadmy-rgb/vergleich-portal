import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ChevronDown } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ComparisonTable } from "@/components/ComparisonTable";
import { AdBanner } from "@/components/AdBanner";
import comparisonsData from "@/data/comparisons.json";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import type { Comparison, Product, Category } from "@/types";

const comparisons = comparisonsData as Comparison[];
const products = productsData as Product[];
const categories = categoriesData as Category[];

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const comparison = comparisons.find((c) => c.slug === params.slug);
  if (!comparison) return {};
  return {
    title: comparison.seoTitle,
    description: comparison.seoDescription,
  };
}

const faqs = [
  {
    q: "Wie wurden die Produkte getestet?",
    a: "Alle Produkte wurden über mehrere Wochen intensiv von unserem Redaktionsteam getestet. Wir bewerten Leistung, Benutzerfreundlichkeit, Preis-Leistungs-Verhältnis und Kundensupport.",
  },
  {
    q: "Werden die Bewertungen regelmäßig aktualisiert?",
    a: "Ja, wir überprüfen und aktualisieren alle Vergleiche quartalsweise oder bei bedeutenden Produktupdates und Preisänderungen.",
  },
  {
    q: "Wie verdient VergleichPortal Geld?",
    a: "Wir erhalten Provisionen für Empfehlungen über Affiliate-Links. Dies beeinflusst jedoch nicht unsere Bewertungen – wir empfehlen nur Produkte, von denen wir überzeugt sind.",
  },
  {
    q: "Kann ich Produktvorschläge einreichen?",
    a: "Ja! Kontaktiere uns per E-Mail mit Produktvorschlägen. Wir nehmen gerne neue Produkte in unsere Tests auf.",
  },
];

export default function ComparePage({ params }: Props) {
  const comparison = comparisons.find((c) => c.slug === params.slug);
  if (!comparison) notFound();

  const comparedProducts = comparison.products
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const category = categories.find((c) => c.id === comparison.category);
  const topProduct = comparedProducts[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Vergleiche" },
          { label: comparison.title },
        ]}
      />

      <div className="mt-6 mb-10">
        <div className="flex items-center gap-2 mb-3">
          {category && (
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full capitalize">
              {category.name}
            </span>
          )}
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          {comparison.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          {comparison.description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-10">
          {/* Comparison Table */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Direktvergleich
            </h2>
            <ComparisonTable products={comparedProducts} />
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Häufig gestellte Fragen
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="card p-5 group"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <AdBanner slot="in-content" />
        </div>

        {/* Sticky Sidebar */}
        <aside className="lg:w-72 xl:w-80 flex-shrink-0 space-y-6">
          {topProduct && (
            <div className="card p-6 lg:sticky lg:top-24">
              <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-3">
                Unser Top-Pick
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
                {topProduct.name}
              </h3>
              {topProduct.badge && (
                <span className="inline-block text-xs font-semibold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-0.5 rounded-full mb-3">
                  {topProduct.badge}
                </span>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {topProduct.shortDesc}
              </p>
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
                {topProduct.price.toLocaleString("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                €
                <span className="text-sm font-normal text-gray-400">
                  /{topProduct.priceUnit}
                </span>
              </div>
              <a
                href={topProduct.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center mb-3"
              >
                Jetzt testen <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href={`/product/${topProduct.slug}`}
                className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Vollständige Details
              </Link>
            </div>
          )}

          <AdBanner slot="sidebar" />
        </aside>
      </div>
    </div>
  );
}
