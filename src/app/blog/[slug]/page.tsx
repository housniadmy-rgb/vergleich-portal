import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, getBlogPost } from "@/data/blog";
import { getProducts, getComparison } from "@/lib/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { ComparisonCard } from "@/components/ComparisonCard";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata, breadcrumbSchema, articleSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const relatedProducts = getProducts(post.relatedProducts);
  const relatedComparisons = post.relatedComparisons
    .map((slug) => getComparison(slug))
    .filter(Boolean);

  const crumbs = [
    { name: "Start", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), articleSchema(post)]} />

      <article className="container-page py-6">
        <Breadcrumbs items={crumbs} />

        <header className="mt-6 max-w-3xl">
          <span className="chip">{post.tag}</span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
            {post.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
            <span>{post.author}</span>
            <span aria-hidden>·</span>
            <span>
              Veröffentlicht {formatDate(post.date)}
              {post.updated && ` · Aktualisiert ${formatDate(post.updated)}`}
            </span>
            <span aria-hidden>·</span>
            <span>{post.readingTime} Min. Lesezeit</span>
          </div>
        </header>

        <div className="my-8">
          <AdSlot format="header" slotId="blog-post-header" />
        </div>

        <div className="prose-content max-w-3xl">
          {post.sections.map((section, index) => (
            <section key={index} className="mb-8">
              {section.heading && (
                <h2 className="text-2xl font-bold tracking-tight">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300"
                >
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-2">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-slate-700 dark:text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {index === 0 && (
                <div className="mt-8">
                  <AdSlot format="in-content" slotId="blog-post-content" />
                </div>
              )}
            </section>
          ))}
        </div>
      </article>

      {relatedComparisons.length > 0 && (
        <section className="container-page py-8">
          <SectionHeading
            eyebrow="Passend dazu"
            title="Diese Vergleiche helfen weiter"
            as="h2"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedComparisons.map(
              (comparison) =>
                comparison && (
                  <ComparisonCard
                    key={comparison.slug}
                    comparison={comparison}
                  />
                ),
            )}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="container-page py-8 pb-16">
          <SectionHeading
            eyebrow="Im Artikel erwähnt"
            title="Empfohlene Produkte"
            as="h2"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      <div className="container-page pb-16 text-center">
        <Link href="/blog" className="btn-secondary">
          ← Zurück zum Blog
        </Link>
      </div>
    </>
  );
}
