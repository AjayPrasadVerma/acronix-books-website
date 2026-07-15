import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Primitives';
import { Mdx } from '@/components/mdx/Mdx';
import { BlogPostingJsonLd } from '@/components/seo/ArticleJsonLd';
import { site } from '@/lib/site';
import { getPost, getPostSlugs } from '@/lib/content';

type Params = Promise<{ slug: string }>;

export function generateStaticParams(): { slug: string }[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Not found' };
  const ogImage = `${site.url}/opengraph-image`;
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: 'article',
      title: post.meta.title,
      description: post.meta.description,
      url: `/blog/${slug}/`,
      publishedTime: new Date(post.meta.date).toISOString(),
      authors: [post.meta.author],
      tags: post.meta.tags,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="py-16 sm:py-20">
      <BlogPostingJsonLd
        title={post.meta.title}
        description={post.meta.description}
        date={post.meta.date}
        author={post.meta.author}
        slug={slug}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
          { label: post.meta.title },
        ]}
      />
      <Container size="narrow">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <header className="mt-8 border-b border-[var(--border)] pb-8">
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-[var(--fg)] sm:text-4xl">
            {post.meta.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--fg-subtle)]">
            <span className="font-medium text-[var(--fg-muted)]">{post.meta.author}</span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(post.meta.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.meta.readingMinutes} min read
            </span>
          </div>
          {post.meta.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.meta.tags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <article className="prose mt-10">
          <Mdx source={post.content} />
        </article>

        <div className="mt-14 border-t border-[var(--border)] pt-8">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>
        </div>
      </Container>
    </div>
  );
}
