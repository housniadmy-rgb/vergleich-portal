import type { Metadata } from "next";
import Link from "next/link";
import { getAllComparisons } from "@/lib/products";
import { ComparisonCard } from "@/components/ComparisonCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Alle Elektronik-Vergleiche 2026 – Tabellen & Tests",
  description:
    "Alle Produktvergleiche auf einen Blick: Smartphones, Laptops, Kopfhörer & Konsolen direkt gegenübergestellt. Plus Vergleichs-Generator.",
  path: "/vergleich",
});

export default function ComparisonIndexPage() {
  const comparisons = getAllComparisons();

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-brand-600 to-brand-800 dark:border-slate-800">
        <div className="container-page py-10 text-white">
          <Breadcrumbs
            items={[
              { name: "Start", path: "/" },
              { name: "Vergleiche", path: "/vergleich" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Elektronik-Vergleiche
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Kuratierte Gegenüberstellungen der gefragtesten Geräte – oder stelle
            mit dem Generator deinen eigenen Vergleich zusammen.
          </p>
          <Link
            href="/vergleich/generator"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            ⚖️ Eigenen Vergleich erstellen
          </Link>
        </div>
      </section>

      <div className="container-page py-6">
        <AdSlot format="header" slotId="compare-header" />
      </div>

      <section className="container-page pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((comparison) => (
            <ComparisonCard key={comparison.slug} comparison={comparison} />
          ))}
        </div>
      </section>
    </>
  );
}
