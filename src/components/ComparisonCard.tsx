import Link from "next/link";
import type { Comparison } from "@/types";
import { getCategory } from "@/data/categories";
import { getProducts } from "@/lib/products";

export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  const category = getCategory(comparison.category);
  const products = getProducts(comparison.productSlugs);

  return (
    <Link
      href={`/vergleich/${comparison.slug}`}
      className="card group flex flex-col p-5 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
    >
      <div className="flex items-center gap-2">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${category?.gradient} text-lg`}
          aria-hidden
        >
          {category?.emoji}
        </span>
        <span className="chip">{products.length} Produkte</span>
      </div>
      <h3 className="mt-3 font-bold leading-snug transition group-hover:text-brand-600">
        {comparison.heading}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
        {comparison.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
        Vergleich ansehen
        <svg className="h-4 w-4 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
