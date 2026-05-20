import Link from "next/link";
import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white">
              E
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Elektronik<span className="text-brand-600">Vergleich</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-slate-600 dark:text-slate-400">
            Das unabhängige Vergleichsportal für Smartphones, Laptops, Kopfhörer und mehr.
            Objektiv, aktuell und transparent.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
            Kategorien
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/kategorie/${cat.slug}`}
                  className="text-slate-600 transition hover:text-brand-600 dark:text-slate-400"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
            Entdecken
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/vergleich" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-400">
                Top-Vergleiche
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-400">
                Ratgeber & Blog
              </Link>
            </li>
            <li>
              <Link href="/suche" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-400">
                Produktsuche
              </Link>
            </li>
            <li>
              <Link href="/vergleich/generator" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-400">
                Vergleichs-Generator
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
            Rechtliches
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/impressum" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-400">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-400">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Alle Rechte vorbehalten.
          </p>
          <p>
            Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Preise inkl. MwSt.,
            zzgl. Versand.
          </p>
        </div>
      </div>
    </footer>
  );
}
