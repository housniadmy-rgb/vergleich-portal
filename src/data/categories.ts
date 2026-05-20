import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "smartphones",
    name: "Smartphones",
    shortName: "Smartphones",
    emoji: "📱",
    tagline: "Die besten Handys im Test",
    description:
      "Vergleiche aktuelle Smartphones von Apple, Samsung, Google und Co. – Display, Kamera, Akku und Preis auf einen Blick.",
    seoTitle: "Smartphones vergleichen 2026 – Test, Preise & Bestenliste",
    seoDescription:
      "Smartphone-Vergleich 2026: iPhone, Samsung Galaxy, Google Pixel & mehr. Kamera, Akku, Display und Preise objektiv gegenübergestellt.",
    specOrder: [
      "Display",
      "Prozessor",
      "RAM",
      "Speicher",
      "Hauptkamera",
      "Akku",
      "Betriebssystem",
      "5G",
      "Gewicht",
    ],
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    slug: "laptops",
    name: "Laptops & Notebooks",
    shortName: "Laptops",
    emoji: "💻",
    tagline: "Notebooks für Arbeit & Gaming",
    description:
      "Vom ultraleichten Ultrabook bis zum Gaming-Notebook: Vergleiche Leistung, Akkulaufzeit und Preis-Leistung.",
    seoTitle: "Laptops vergleichen 2026 – Notebook Test & Bestenliste",
    seoDescription:
      "Laptop-Vergleich 2026: MacBook, ThinkPad, XPS & Gaming-Notebooks. CPU, Akku, Display und Preise im direkten Vergleich.",
    specOrder: [
      "Display",
      "Prozessor",
      "RAM",
      "Speicher",
      "Grafik",
      "Akku",
      "Betriebssystem",
      "Gewicht",
    ],
    gradient: "from-violet-500 to-purple-600",
  },
  {
    slug: "tablets",
    name: "Tablets",
    shortName: "Tablets",
    emoji: "📲",
    tagline: "Tablets für Kreative & Office",
    description:
      "iPad, Galaxy Tab und Android-Tablets im Vergleich – ideal für Streaming, Notizen und produktives Arbeiten.",
    seoTitle: "Tablets vergleichen 2026 – iPad & Android Tablet Test",
    seoDescription:
      "Tablet-Vergleich 2026: iPad Pro, Galaxy Tab & Android-Tablets. Display, Leistung, Stift-Support und Preise im Überblick.",
    specOrder: [
      "Display",
      "Prozessor",
      "RAM",
      "Speicher",
      "Kamera",
      "Akku",
      "Betriebssystem",
      "Gewicht",
    ],
    gradient: "from-sky-500 to-cyan-600",
  },
  {
    slug: "kopfhoerer",
    name: "Kopfhörer",
    shortName: "Kopfhörer",
    emoji: "🎧",
    tagline: "Sound & Noise Cancelling",
    description:
      "Over-Ear, In-Ear und True Wireless: Vergleiche Klang, Noise Cancelling und Akkulaufzeit der besten Kopfhörer.",
    seoTitle: "Kopfhörer vergleichen 2026 – Test & Bestenliste",
    seoDescription:
      "Kopfhörer-Vergleich 2026: Sony, Bose, Apple & Sennheiser. Noise Cancelling, Klang, Akku und Preise objektiv im Test.",
    specOrder: [
      "Typ",
      "Treiber",
      "Noise Cancelling",
      "Akku",
      "Bluetooth",
      "Wasserschutz",
      "Gewicht",
    ],
    gradient: "from-rose-500 to-pink-600",
  },
  {
    slug: "smartwatches",
    name: "Smartwatches",
    shortName: "Smartwatches",
    emoji: "⌚",
    tagline: "Fitness & Health am Handgelenk",
    description:
      "Apple Watch, Galaxy Watch und Garmin im Vergleich – Gesundheitsfunktionen, Akkulaufzeit und Sportmodi.",
    seoTitle: "Smartwatches vergleichen 2026 – Test & Kaufberatung",
    seoDescription:
      "Smartwatch-Vergleich 2026: Apple Watch, Galaxy Watch & Garmin. Health-Sensoren, Akku, Display und Preise im Test.",
    specOrder: [
      "Display",
      "Prozessor",
      "Akku",
      "Sensoren",
      "Konnektivität",
      "Wasserschutz",
      "Betriebssystem",
    ],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    slug: "monitore",
    name: "Monitore",
    shortName: "Monitore",
    emoji: "🖥️",
    tagline: "Displays für Gaming & Office",
    description:
      "Gaming-Monitore, 4K-Displays und Profi-Monitore im Vergleich – Bildwiederholrate, Panel-Typ und Farbtreue.",
    seoTitle: "Monitore vergleichen 2026 – Gaming & 4K Monitor Test",
    seoDescription:
      "Monitor-Vergleich 2026: Gaming-, 4K- und Office-Monitore. Hz, Panel-Typ, Reaktionszeit und Preise im direkten Vergleich.",
    specOrder: [
      "Bildschirmgröße",
      "Auflösung",
      "Panel",
      "Bildwiederholrate",
      "Reaktionszeit",
      "HDR",
      "Anschlüsse",
    ],
    gradient: "from-amber-500 to-orange-600",
  },
  {
    slug: "gaming",
    name: "Gaming Konsolen",
    shortName: "Gaming",
    emoji: "🎮",
    tagline: "Konsolen der nächsten Generation",
    description:
      "PlayStation, Xbox und Handheld-Konsolen im Vergleich – Leistung, Spielebibliothek und Preis-Leistung.",
    seoTitle: "Gaming Konsolen vergleichen 2026 – PS5 vs Xbox Test",
    seoDescription:
      "Konsolen-Vergleich 2026: PlayStation 5 Pro, Xbox Series X & mehr. Leistung, Spiele, Speicher und Preise im Test.",
    specOrder: [
      "Prozessor",
      "Grafik",
      "Speicher",
      "Auflösung",
      "Bildrate",
      "Laufwerk",
    ],
    gradient: "from-fuchsia-500 to-purple-600",
  },
  {
    slug: "zubehoer",
    name: "Zubehör",
    shortName: "Zubehör",
    emoji: "🖱️",
    tagline: "Keyboards, Mäuse & mehr",
    description:
      "Mechanische Tastaturen, Produktivitäts-Mäuse und Zubehör im Vergleich – für Office und Gaming.",
    seoTitle: "PC-Zubehör vergleichen 2026 – Tastatur & Maus Test",
    seoDescription:
      "Zubehör-Vergleich 2026: Tastaturen, Mäuse & Gaming-Gear. Funktionen, Konnektivität und Preise objektiv im Test.",
    specOrder: [
      "Typ",
      "Konnektivität",
      "Akku",
      "Beleuchtung",
      "Schalter",
      "Gewicht",
    ],
    gradient: "from-slate-500 to-slate-700",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
