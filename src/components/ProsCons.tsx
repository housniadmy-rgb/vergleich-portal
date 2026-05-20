interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
        <h3 className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          Vorteile
        </h3>
        <ul className="mt-3 space-y-2 text-sm">
          {pros.map((pro) => (
            <li key={pro} className="flex gap-2 text-slate-700 dark:text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              {pro}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5 dark:border-rose-900/60 dark:bg-rose-950/30">
        <h3 className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-400">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </span>
          Nachteile
        </h3>
        <ul className="mt-3 space-y-2 text-sm">
          {cons.map((con) => (
            <li key={con} className="flex gap-2 text-slate-700 dark:text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
