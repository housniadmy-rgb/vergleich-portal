"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBarProps {
  defaultValue?: string;
  size?: "md" | "lg";
  placeholder?: string;
}

export function SearchBar({
  defaultValue = "",
  size = "lg",
  placeholder = "Elektronik vergleichen – z. B. iPhone 16 Pro",
}: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/suche?q=${encodeURIComponent(q)}` : "/suche");
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >
      <span className="pl-2 text-slate-400" aria-hidden>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>
      <label htmlFor="site-search" className="sr-only">
        Produkt suchen
      </label>
      <input
        id="site-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400 ${
          size === "lg" ? "py-2 text-base" : "py-1.5 text-sm"
        }`}
      />
      <button type="submit" className="btn-primary shrink-0 !px-5 !py-2.5">
        Suchen
      </button>
    </form>
  );
}
