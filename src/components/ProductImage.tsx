import { getCategory } from "@/data/categories";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Platzhalter-Produktbild: erzeugt eine konsistente, performante Darstellung
 * ohne externe Bild-Abhaengigkeiten. Echte Produktbilder koennen hier
 * spaeter ueber next/image eingebunden werden.
 */
export function ProductImage({ product, className, size = "md" }: ProductImageProps) {
  const category = getCategory(product.category);
  const gradient = category?.gradient ?? "from-slate-500 to-slate-700";
  const emojiSize = size === "lg" ? "text-6xl" : size === "sm" ? "text-3xl" : "text-5xl";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        gradient,
        className,
      )}
      role="img"
      aria-label={`${product.name} – ${category?.name ?? "Elektronik"}`}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6) 0, transparent 45%)",
        }}
      />
      <span className={cn("drop-shadow-sm", emojiSize)} aria-hidden>
        {category?.emoji}
      </span>
      <span className="absolute bottom-2 left-3 text-xs font-bold uppercase tracking-widest text-white/80">
        {product.brand}
      </span>
    </div>
  );
}
