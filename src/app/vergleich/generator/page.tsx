import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { CompareGenerator } from "@/components/CompareGenerator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Vergleichs-Generator – Geräte selbst vergleichen",
    description:
      "Stelle bis zu 4 Elektronikgeräte zusammen und vergleiche alle Spezifikationen direkt in einer übersichtlichen Tabelle.",
    path: "/vergleich/generator",
  }),
  robots: { index: false, follow: true },
};

export default function GeneratorPage() {
  const products = getAllProducts();

  return (
    <>
      <div className="container-page py-6">
        <Breadcrumbs
          items={[
            { name: "Start", path: "/" },
            { name: "Vergleiche", path: "/vergleich" },
            { name: "Generator", path: "/vergleich/generator" },
          ]}
        />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Vergleichs-Generator
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
          Wähle bis zu 4 Geräte aus einer Kategorie und vergleiche Preis,
          Bewertung und alle technischen Daten Spec für Spec.
        </p>
      </div>

      <section className="container-page pb-16">
        <CompareGenerator products={products} />
      </section>
    </>
  );
}
