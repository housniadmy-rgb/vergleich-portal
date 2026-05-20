import { buildAffiliateLink } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  href: string;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
  fullWidth?: boolean;
}

/**
 * Affiliate-CTA-Button. Haengt automatisch das Amazon-PartnerNet-Tag an
 * und setzt rel="sponsored nofollow" gemaess Google-Richtlinien.
 */
export function CtaButton({
  href,
  label = "Bei Amazon kaufen",
  variant = "primary",
  className,
  fullWidth,
}: CtaButtonProps) {
  return (
    <a
      href={buildAffiliateLink(href)}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={cn(
        variant === "primary" ? "btn-primary" : "btn-secondary",
        fullWidth && "w-full",
        className,
      )}
    >
      {label}
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  );
}
