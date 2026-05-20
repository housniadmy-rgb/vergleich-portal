import type { Metadata } from "next";
import Link from "next/link";
import { searchProducts } from "@/lib/products";
import { categories } from "@/data/categories";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  searchParams: { q?: string };
}

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Produktsuche – Elektronik finden & vergleichen",
    description:
      "Durchsuche alle Smartphones, Laptops, Kopfhörer und mehr und finde das passende Gerät für deinen Vergleich.",
    path: "/suche",
  }),
  robots: { index: false, follow: true },
};

export default function SearchPage({ searchParams }: PageProps) {
  const query = (searchParams.q || "").trim();
  const results = query ? searchProducts(query) : [];

  return (
    <div className="container-page py-8">
      <Breadcrumbs
        items={[
          { name: "Start", path: "/" },
          { name: "Suche", path: "/suche" },
        ]}
      />

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Produktsuche
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Finde Geräte nach Name, Marke oder Kategorie.
      </p>

      <div className="mt-6 max-w-xl">
        <SearchBar defaultValue={query} />
      </div>

      {query ? (
        <div className="mt-8">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {results.length}
            </span>{" "}
            {results.length === 1 ? "Ergebnis" : "Ergebnisse"} für „{query}"
          </p>

          {results.length > 0 ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="card mt-5 p-10 text-center">
              <p className="text-4xl" aria-hidden>
                🔍
              </p>
              <p className="mt-3 text-lg font-semibold">
                Keine Treffer für „{query}"
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Versuche es mit einem anderen Begriff oder stöbere in den
                Kategorien.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            In Kategorien stöbern
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategorie/${cat.slug}`}
                className="chip text-sm transition hover:text-brand-600"
              >
                {cat.emoji} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
