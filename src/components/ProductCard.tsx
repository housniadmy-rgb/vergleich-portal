import Link from "next/link";
import type { Product } from "@/types";
import { ProductImage } from "./ProductImage";
import { StarRating } from "./StarRating";
import { CtaButton } from "./CtaButton";
import { formatPrice, discountPercent } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = discountPercent(product.price, product.oldPrice);

  return (
    <article className="card group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/produkt/${product.slug}`}
        className="relative block"
        aria-label={product.name}
      >
        <ProductImage product={product} className="aspect-[4/3] w-full" />
        {discount && (
          <span className="absolute right-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {product.brand}
        </p>
        <h3 className="mt-1 text-base font-bold leading-snug">
          <Link
            href={`/produkt/${product.slug}`}
            className="transition hover:text-brand-600"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            {product.oldPrice && (
              <p className="text-xs text-slate-400 line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
            <p className="text-xl font-extrabold tracking-tight">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <CtaButton href={product.affiliateLink} label="Preis ansehen" fullWidth />
          <Link
            href={`/produkt/${product.slug}`}
            className="btn-secondary w-full !py-2.5 text-xs"
          >
            Details & Test
          </Link>
        </div>
      </div>
    </article>
  );
}
