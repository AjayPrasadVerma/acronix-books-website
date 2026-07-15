import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Mdx } from '@/components/mdx/Mdx';
import { DocsPager } from '@/components/docs/DocsPager';
import { TechArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { site } from '@/lib/site';
import { getAllDocs, getDoc, getDocSlugs } from '@/lib/content';

type Params = Promise<{ slug: string }>;

export function generateStaticParams(): { slug: string }[] {
  return getDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return { title: 'Not found' };
  const ogImage = `${site.url}/opengraph-image`;
  return {
    title: doc.meta.title,
    description: doc.meta.description,
    alternates: { canonical: `/docs/${slug}/` },
    openGraph: {
      type: 'article',
      title: doc.meta.title,
      description: doc.meta.description,
      url: `/docs/${slug}/`,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.meta.title,
      description: doc.meta.description,
      images: [ogImage],
    },
  };
}

export default async function DocPage({ params }: { params: Params }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const ordered = getAllDocs();
  const index = ordered.findIndex((d) => d.slug === slug);
  const prev = index > 0 ? ordered[index - 1] ?? null : null;
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] ?? null : null;

  return (
    <div>
      <TechArticleJsonLd
        title={doc.meta.title}
        description={doc.meta.description}
        slug={slug}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs/' },
          { label: doc.meta.title },
        ]}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-[var(--fg-subtle)]"
      >
        <Link href="/docs/" className="hover:text-[var(--fg)]">
          Docs
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-[var(--fg-muted)]">{doc.meta.category}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-[var(--fg)]">{doc.meta.title}</span>
      </nav>

      <article className="prose">
        <h1>{doc.meta.title}</h1>
        {doc.meta.description && (
          <p className="text-lg text-[var(--fg-muted)]">{doc.meta.description}</p>
        )}
        <Mdx source={doc.content} />
      </article>

      <DocsPager prev={prev} next={next} />
    </div>
  );
}
