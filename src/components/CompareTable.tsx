import Link from "next/link";
import type { Product } from "@/types";
import { getCategory } from "@/data/categories";
import { ProductImage } from "./ProductImage";
import { StarRating } from "./StarRating";
import { CtaButton } from "./CtaButton";
import { formatPrice } from "@/lib/utils";

interface CompareTableProps {
  products: Product[];
}

export function CompareTable({ products }: CompareTableProps) {
  if (products.length === 0) return null;

  const category = getCategory(products[0].category);
  const orderedKeys = category?.specOrder ?? [];
  const extraKeys = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs))),
  ).filter((k) => !orderedKeys.includes(k));
  const specKeys = [...orderedKeys, ...extraKeys].filter((key) =>
    products.some((p) => p.specs[key]),
  );

  const bestPrice = Math.min(...products.map((p) => p.price));
  const bestRating = Math.max(...products.map((p) => p.rating));
  const colWidth = products.length <= 2 ? "min-w-[240px]" : "min-w-[200px]";

  return (
    <div className="table-scroll overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 w-40 bg-slate-50 p-4 text-left align-bottom dark:bg-slate-900">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Vergleich
              </span>
            </th>
            {products.map((product) => (
              <th
                key={product.slug}
                className={`${colWidth} border-l border-slate-200 bg-white p-4 align-top dark:border-slate-800 dark:bg-slate-950`}
              >
                <Link href={`/produkt/${product.slug}`} className="block">
                  <ProductImage
                    product={product}
                    className="mb-3 aspect-[4/3] w-full rounded-xl"
                  />
                  <span className="text-xs font-semibold uppercase text-brand-600">
                    {product.brand}
                  </span>
                  <span className="mt-0.5 block font-bold leading-snug text-slate-900 transition hover:text-brand-600 dark:text-white">
                    {product.name}
                  </span>
                </Link>
                <div className="mt-2">
                  <CtaButton href={product.affiliateLink} label="Preis ansehen" fullWidth />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Row label="Preis" sticky>
            {products.map((p) => (
              <Cell key={p.slug} highlight={p.price === bestPrice}>
                <span className="text-base font-extrabold">{formatPrice(p.price)}</span>
                {p.price === bestPrice && products.length > 1 && (
                  <span className="ml-1 text-xs font-semibold text-emerald-600">
                    günstigster
                  </span>
                )}
              </Cell>
            ))}
          </Row>

          <Row label="Bewertung" sticky>
            {products.map((p) => (
              <Cell key={p.slug} highlight={p.rating === bestRating}>
                <StarRating rating={p.rating} reviewCount={p.reviewCount} size="sm" />
              </Cell>
            ))}
          </Row>

          {specKeys.map((key) => (
            <Row key={key} label={key} sticky>
              {products.map((p) => (
                <Cell key={p.slug}>{p.specs[key] || "–"}</Cell>
              ))}
            </Row>
          ))}

          <Row label="Vorteile" sticky>
            {products.map((p) => (
              <Cell key={p.slug}>
                <ul className="space-y-1 text-left">
                  {p.pros.slice(0, 3).map((pro) => (
                    <li key={pro} className="flex gap-1.5 text-xs">
                      <span className="text-emerald-600">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </Cell>
            ))}
          </Row>

          <Row label="Nachteile" sticky>
            {products.map((p) => (
              <Cell key={p.slug}>
                <ul className="space-y-1 text-left">
                  {p.cons.slice(0, 3).map((con) => (
                    <li key={con} className="flex gap-1.5 text-xs">
                      <span className="text-rose-600">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </Cell>
            ))}
          </Row>

          <Row label="" sticky>
            {products.map((p) => (
              <Cell key={p.slug}>
                <Link
                  href={`/produkt/${p.slug}`}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  Vollständiger Test →
                </Link>
              </Cell>
            ))}
          </Row>
        </tbody>
      </table>
    </div>
  );
}

function Row({
  label,
  children,
  sticky,
}: {
  label: string;
  children: React.ReactNode;
  sticky?: boolean;
}) {
  return (
    <tr className="border-t border-slate-200 dark:border-slate-800">
      <th
        scope="row"
        className={`${
          sticky ? "sticky left-0 z-10" : ""
        } bg-slate-50 p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900`}
      >
        {label}
      </th>
      {children}
    </tr>
  );
}

function Cell({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <td
      className={`border-l border-slate-200 p-4 align-top text-slate-700 dark:border-slate-800 dark:text-slate-300 ${
        highlight ? "bg-emerald-50/70 dark:bg-emerald-950/30" : ""
      }`}
    >
      {children}
    </td>
  );
}
