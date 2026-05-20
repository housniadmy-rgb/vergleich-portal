import Link from "next/link";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/lib/products";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((cat) => {
        const count = getProductsByCategory(cat.slug).length;
        return (
          <Link
            key={cat.slug}
            href={`/kategorie/${cat.slug}`}
            className="card group flex flex-col gap-3 p-5 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-2xl`}
              aria-hidden
            >
              {cat.emoji}
            </span>
            <div>
              <h3 className="font-bold leading-tight transition group-hover:text-brand-600">
                {cat.shortName}
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">{count} Produkte</p>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{cat.tagline}</p>
          </Link>
        );
      })}
    </div>
  );
}
