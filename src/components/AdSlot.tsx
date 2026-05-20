"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type AdFormat = "header" | "in-content" | "sidebar";

const formatStyles: Record<AdFormat, { box: string; label: string }> = {
  header: { box: "min-h-[90px]", label: "Anzeige · Header" },
  "in-content": { box: "min-h-[120px]", label: "Anzeige" },
  sidebar: { box: "min-h-[260px]", label: "Anzeige · Sidebar" },
};

interface AdSlotProps {
  format?: AdFormat;
  slotId?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ format = "in-content", slotId, className }: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const styles = formatStyles[format];
  const enabled = Boolean(siteConfig.adsenseClient && slotId);

  useEffect(() => {
    if (!enabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense noch nicht geladen */
    }
  }, [enabled]);

  if (enabled) {
    return (
      <div className={cn("w-full", className)}>
        <Script
          id="adsbygoogle-init"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
          crossOrigin="anonymous"
        />
        <ins
          ref={insRef}
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={siteConfig.adsenseClient}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div
      role="complementary"
      aria-label="Werbeanzeige"
      className={cn(
        "flex w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100/70 text-center dark:border-slate-700 dark:bg-slate-900/60",
        styles.box,
        className,
      )}
    >
      <div className="px-4 py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          {styles.label}
        </p>
        <p className="mt-1 text-sm text-slate-400">
          Google AdSense Platzhalter
        </p>
      </div>
    </div>
  );
}
