import Link from "next/link";
import { categories } from "@/data/categories";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <p className="text-7xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
        Seite nicht gefunden
      </h1>
      <p className="mt-2 max-w-md text-slate-600 dark:text-slate-400">
        Diese Seite existiert nicht oder wurde verschoben. Stöbere stattdessen in
        unseren Kategorien.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kategorie/${cat.slug}`}
            className="chip text-sm transition hover:text-brand-600"
          >
            {cat.emoji} {cat.shortName}
          </Link>
        ))}
      </div>
      <Link href="/" className="btn-primary mt-8">
        Zur Startseite
      </Link>
    </div>
  );
}
