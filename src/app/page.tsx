import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductCard } from "@/components/ProductCard";
import { ComparisonCard } from "@/components/ComparisonCard";
import { SectionHeading } from "@/components/SectionHeading";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import {
  getTrendingProducts,
  getDealProducts,
  getAllComparisons,
} from "@/lib/products";
import { blogPosts } from "@/data/blog";
import { categories } from "@/data/categories";
import { formatDate } from "@/lib/utils";

const popularSearches = [
  { label: "iPhone 16 Pro", href: "/produkt/apple-iphone-16-pro" },
  { label: "MacBook Air M3", href: "/produkt/apple-macbook-air-m3" },
  { label: "Sony WH-1000XM6", href: "/produkt/sony-wh-1000xm6" },
  { label: "PS5 Pro vs Xbox", href: "/vergleich/playstation-5-pro-vs-xbox-series-x" },
];

export default function HomePage() {
  const trending = getTrendingProducts(6);
  const deals = getDealProducts(3);
  const comparisons = getAllComparisons().slice(0, 6);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Elektronik-Vergleich – Startseite",
          description:
            "Vergleiche Smartphones, Laptops, Kopfhörer und mehr auf dem unabhängigen Elektronik-Vergleichsportal.",
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50 to-slate-50 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(40rem 20rem at 70% -10%, rgba(53,99,245,0.22), transparent)",
          }}
        />
        <div className="container-page relative py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip mx-auto !bg-white !text-brand-700 shadow-sm dark:!bg-slate-800 dark:!text-brand-300">
              ⚡ Über 30 Geräte objektiv im Test – Stand 2026
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Elektronik vergleichen.
              <span className="block bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                Clever das Beste finden.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Smartphones, Laptops, Kopfhörer & mehr – mit ehrlichen Tests,
              transparenten Vergleichstabellen und tagesaktuellen Preisen.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <SearchBar />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-slate-500">Beliebt:</span>
              {popularSearches.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full bg-white px-3 py-1 font-medium text-slate-600 shadow-sm transition hover:text-brand-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container-page py-6">
        <AdSlot format="header" slotId="home-header" />
      </div>

      {/* Kategorien */}
      <section className="container-page py-10">
        <SectionHeading
          eyebrow="Kategorien"
          title="Wonach suchst du?"
          description="Wähle eine Kategorie und vergleiche die besten Geräte mit Filtern nach Preis, Marke und Bewertung."
        />
        <CategoryGrid />
      </section>

      {/* Top Vergleiche */}
      <section className="container-page py-10">
        <SectionHeading
          eyebrow="Direktvergleich"
          title="Top Vergleiche"
          description="Die meistgelesenen Gegenüberstellungen – Spec für Spec analysiert."
          link={{ href: "/vergleich", label: "Alle Vergleiche" }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((comparison) => (
            <ComparisonCard key={comparison.slug} comparison={comparison} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="border-y border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="Trending"
            title="Aktuell besonders gefragt"
            description="Diese Geräte werden gerade am häufigsten verglichen und gekauft."
            link={{ href: "/suche", label: "Alle Produkte" }}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <div className="container-page py-8">
        <AdSlot format="in-content" slotId="home-content" />
      </div>

      {/* Deals */}
      <section className="container-page py-10">
        <SectionHeading
          eyebrow="Preis-Tipps"
          title="Aktuelle Spar-Highlights"
          description="Geräte mit dem größten Preisvorteil gegenüber der UVP."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Vergleichs-Generator CTA */}
      <section className="container-page py-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(20rem 12rem at 85% 20%, rgba(255,255,255,0.4), transparent)",
            }}
          />
          <div className="relative max-w-2xl text-white">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Stelle deinen eigenen Vergleich zusammen
            </h2>
            <p className="mt-3 text-brand-100">
              Mit dem Vergleichs-Generator kombinierst du bis zu 4 Geräte und
              siehst alle Spezifikationen direkt nebeneinander.
            </p>
            <Link
              href="/vergleich/generator"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              Jetzt Vergleich erstellen
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="container-page py-10">
        <SectionHeading
          eyebrow="Ratgeber"
          title="Neu im Blog"
          description="Kaufberatung, Bestenlisten und Hintergründe rund um Elektronik."
          link={{ href: "/blog", label: "Alle Artikel" }}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group flex flex-col p-5 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="chip w-fit">{post.tag}</span>
              <h3 className="mt-3 font-bold leading-snug transition group-hover:text-brand-600">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600 dark:text-slate-400">
                {post.excerpt}
              </p>
              <p className="mt-3 text-xs text-slate-400">
                {formatDate(post.date)} · {post.readingTime} Min. Lesezeit
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust / SEO Text */}
      <section className="container-page pb-16 pt-6">
        <div className="card p-8">
          <h2 className="text-xl font-bold">
            Elektronik-Vergleich – dein unabhängiges Technik-Portal
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            <p>
              Bei <strong>Elektronik-Vergleich</strong> findest du objektive
              Gegenüberstellungen aktueller Technikprodukte. Wir vergleichen{" "}
              {categories.map((c) => c.shortName).join(", ")} anhand klarer
              Kriterien wie Leistung, Display, Akkulaufzeit, Verarbeitung und
              Preis-Leistungs-Verhältnis – damit du in wenigen Minuten die
              richtige Kaufentscheidung triffst.
            </p>
            <p>
              Unsere Vergleichstabellen sind transparent aufgebaut, unsere
              Produkttests folgen einem einheitlichen Schema. So kannst du
              Smartphones, Laptops und Kopfhörer fair miteinander vergleichen.
              Über Affiliate-Links zu Amazon finanzieren wir unsere Arbeit – für
              dich entstehen dabei keine Mehrkosten.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
