import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const sizeMap = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };

export function StarRating({ rating, reviewCount, size = "md", showValue = true }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-hidden>
        {stars.map((star) => {
          const fill = Math.max(0, Math.min(1, rating - (star - 1)));
          return (
            <span key={star} className={cn("relative", sizeMap[size])}>
              <Star className={cn(sizeMap[size], "text-slate-300 dark:text-slate-600")} />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star className={cn(sizeMap[size], "text-amber-400")} filled />
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {rating.toFixed(1)}
        </span>
      )}
      {typeof reviewCount === "number" && (
        <span className="text-xs text-slate-500" aria-label={`${reviewCount} Bewertungen`}>
          ({reviewCount.toLocaleString("de-DE")})
        </span>
      )}
    </div>
  );
}

function Star({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.55l-5.9 3.1 1.12-6.56L2.45 9.44l6.6-.96L12 2.5z" />
    </svg>
  );
}
