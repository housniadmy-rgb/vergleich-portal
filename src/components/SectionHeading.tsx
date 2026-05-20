import Link from "next/link";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
            {eyebrow}
          </p>
        )}
        <Heading className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {title}
        </Heading>
        {description && (
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"
        >
          {link.label}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}
