interface FaqItem {
  question: string;
  answer: string;
}

export function Faq({ items, title = "Häufige Fragen" }: { items: FaqItem[]; title?: string }) {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <details
            key={index}
            className="group card p-0"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
              {item.question}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45 dark:bg-slate-800">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
