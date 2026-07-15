import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Badge, Card, Eyebrow } from '@/components/ui/Primitives';
import { getDocCategories } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Everything you need to install, set up and run Acronix Books — from creating your first company to GST filing, cloud sync and security.',
  alternates: { canonical: '/docs/' },
};

export default function DocsIndexPage() {
  const groups = getDocCategories();

  return (
    <div>
      <header className="mb-10 max-w-2xl">
        <Eyebrow>Documentation</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[var(--fg)]">
          Acronix Books docs
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--fg-muted)]">
          Practical, task-focused guides for running your books offline-first — installation,
          day-to-day invoicing and inventory, GST returns, backups, cloud sync and security.
          New to Acronix Books? Start with{' '}
          <Link
            href="/docs/getting-started/"
            className="font-semibold text-brand-600 underline underline-offset-4 dark:text-brand-400"
          >
            Getting started
          </Link>
          .
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {groups.map((group) => (
          <section key={group.category}>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="font-display text-xl font-bold tracking-tight text-[var(--fg)]">
                {group.category}
              </h2>
              <Badge tone="neutral">{group.docs.length}</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.docs.map((doc) => (
                <Link key={doc.slug} href={`/docs/${doc.slug}/`} className="group">
                  <Card hover className="flex h-full flex-col gap-2">
                    <div className="flex items-center gap-2 text-[var(--fg)]">
                      <BookOpen className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                      <h3 className="font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {doc.title}
                      </h3>
                    </div>
                    {doc.description && (
                      <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
                        {doc.description}
                      </p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-brand-600 dark:text-brand-400">
                      Read guide
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
