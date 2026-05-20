import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Elektronik-Blog & Ratgeber 2026 – Tests & Kaufberatung",
  description:
    "Ratgeber, Bestenlisten und Kaufberatung rund um Smartphones, Laptops, Kopfhörer und Gaming. Aktuelle Technik-Artikel 2026.",
  path: "/blog",
});

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 dark:border-slate-800">
        <div className="container-page py-10 text-white">
          <Breadcrumbs
            items={[
              { name: "Start", path: "/" },
              { name: "Blog", path: "/blog" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ratgeber & Technik-Blog
          </h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Kaufberatung, Bestenlisten und Hintergründe – damit du die richtige
            Technik-Entscheidung triffst.
          </p>
        </div>
      </section>

      <div className="container-page py-6">
        <AdSlot format="header" slotId="blog-header" />
      </div>

      <section className="container-page pb-16">
        {/* Featured */}
        <Link
          href={`/blog/${featured.slug}`}
          className="card group mb-8 grid overflow-hidden md:grid-cols-2"
        >
          <div className="flex items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700 p-10 text-7xl">
            📰
          </div>
          <div className="p-6 sm:p-8">
            <span className="chip">{featured.tag}</span>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight transition group-hover:text-brand-600">
              {featured.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {featured.excerpt}
            </p>
            <p className="mt-4 text-xs text-slate-400">
              {formatDate(featured.date)} · {featured.readingTime} Min. Lesezeit
            </p>
          </div>
        </Link>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group flex flex-col p-5 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="chip w-fit">{post.tag}</span>
              <h2 className="mt-3 text-lg font-bold leading-snug transition group-hover:text-brand-600">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600 dark:text-slate-400">
                {post.excerpt}
              </p>
              <p className="mt-3 text-xs text-slate-400">
                {formatDate(post.date)} · {post.readingTime} Min.
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
