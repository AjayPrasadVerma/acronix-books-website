import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge, Card, Eyebrow } from '@/components/ui/Primitives';
import { site } from '@/lib/site';
import { getAllPosts } from '@/lib/content';

const blogTitle = 'Blog';
const blogDescription =
  'Guides and perspective on GST billing, offline-first accounting and running the books for Indian businesses of every size — from the Acronix Books team.';
const ogImage = `${site.url}/opengraph-image`;

export const metadata: Metadata = {
  title: blogTitle,
  description: blogDescription,
  alternates: { canonical: '/blog/' },
  openGraph: {
    type: 'website',
    title: blogTitle,
    description: blogDescription,
    url: '/blog/',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: blogTitle,
    description: blogDescription,
    images: [ogImage],
  },
};

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

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <header className="mb-12 max-w-2xl">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[var(--fg)]">
            Notes on accounting, GST &amp; running your books
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--fg-muted)]">
            Practical writing for Indian business owners and accountants — GST compliance,
            offline-first software and getting more done in less time.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} className="group">
              <Card hover className="flex h-full flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--fg-subtle)]">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingMinutes} min read
                  </span>
                </div>

                <h2 className="font-display text-lg font-bold leading-snug tracking-tight text-[var(--fg)] group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {post.title}
                </h2>

                {post.description && (
                  <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
                    {post.description}
                  </p>
                )}

                {post.tags.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} tone="neutral">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                  Read post
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
