"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { AdSlot } from "./AdSlot";
import { formatPrice, cn } from "@/lib/utils";

type SortKey = "popular" | "price-asc" | "price-desc" | "rating" | "newest";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Beliebtheit" },
  { value: "price-asc", label: "Preis aufsteigend" },
  { value: "price-desc", label: "Preis absteigend" },
  { value: "rating", label: "Beste Bewertung" },
  { value: "newest", label: "Neueste zuerst" },
];

interface CategoryBrowserProps {
  products: Product[];
  brands: string[];
  priceRange: { min: number; max: number };
}

export function CategoryBrowser({ products, brands, priceRange }: CategoryBrowserProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortKey>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      return true;
    });

    result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.releaseYear - a.releaseYear;
        default:
          return b.popularity - a.popularity;
      }
    });
    return result;
  }, [products, selectedBrands, maxPrice, minRating, sort]);

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  }

  function resetFilters() {
    setSelectedBrands([]);
    setMaxPrice(priceRange.max);
    setMinRating(0);
  }

  const hasActiveFilters =
    selectedBrands.length > 0 || maxPrice < priceRange.max || minRating > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className="btn-secondary mb-4 w-full lg:hidden"
          aria-expanded={filtersOpen}
        >
          Filter {hasActiveFilters && `(${selectedBrands.length + (minRating > 0 ? 1 : 0)})`}
        </button>

        <div className={cn("card p-5", filtersOpen ? "block" : "hidden lg:block")}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Filter</h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                Zurücksetzen
              </button>
            )}
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold">Marke</h3>
            <div className="mt-2 space-y-1.5">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold">
              Max. Preis:{" "}
              <span className="text-brand-600">{formatPrice(maxPrice)}</span>
            </h3>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-brand-600"
              aria-label="Maximaler Preis"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{formatPrice(priceRange.min)}</span>
              <span>{formatPrice(priceRange.max)}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold">Mindestbewertung</h3>
            <div className="mt-2 space-y-1.5">
              {[0, 4, 4.5].map((rating) => (
                <label
                  key={rating}
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rating}
                    onChange={() => setMinRating(rating)}
                    className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  {rating === 0 ? "Alle Bewertungen" : `ab ${rating} Sterne`}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 hidden lg:block">
          <AdSlot format="sidebar" />
        </div>
      </aside>

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {filtered.length}
            </span>{" "}
            von {products.length} Produkten
          </p>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Sortieren:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center">
            <p className="text-lg font-semibold">Keine Produkte gefunden</p>
            <p className="mt-1 text-sm text-slate-500">
              Passe deine Filter an, um mehr Ergebnisse zu sehen.
            </p>
            <button type="button" onClick={resetFilters} className="btn-primary mt-4">
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
