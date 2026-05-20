"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { categories } from "@/data/categories";
import { CompareTable } from "./CompareTable";
import { cn } from "@/lib/utils";

const MAX_SELECTION = 4;

export function CompareGenerator({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState(categories[0].slug);

  const selectedProducts = useMemo(
    () =>
      selected
        .map((slug) => products.find((p) => p.slug === slug))
        .filter((p): p is Product => Boolean(p)),
    [selected, products],
  );

  const categoryProducts = products.filter((p) => p.category === activeCategory);

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, slug];
    });
  }

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold">1. Produkte auswählen</h2>
          <span className="chip">
            {selected.length} / {MAX_SELECTION} ausgewählt
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition",
                activeCategory === cat.slug
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
              )}
            >
              {cat.emoji} {cat.shortName}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => {
            const checked = selected.includes(product.slug);
            const disabled = !checked && selected.length >= MAX_SELECTION;
            return (
              <label
                key={product.slug}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition",
                  checked
                    ? "border-brand-500 bg-brand-50 dark:bg-brand-950/40"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-800",
                  disabled && "cursor-not-allowed opacity-50",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => toggle(product.slug)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span>
                  <span className="block font-semibold">{product.name}</span>
                  <span className="text-xs text-slate-500">{product.brand}</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-bold">2. Vergleich</h2>
        {selectedProducts.length >= 2 ? (
          <CompareTable products={selectedProducts} />
        ) : (
          <div className="card p-10 text-center">
            <p className="text-4xl" aria-hidden>
              ⚖️
            </p>
            <p className="mt-3 text-lg font-semibold">
              Wähle mindestens 2 Produkte aus
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Markiere oben bis zu {MAX_SELECTION} Geräte, um sie direkt
              gegenüberzustellen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
