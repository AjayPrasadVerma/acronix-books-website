import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card, SectionHeading } from '@/components/ui/Primitives';

export interface ShowcaseItem {
  slug: string;
  name: string;
  tagline: string;
}

interface ShowcaseSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  items: ShowcaseItem[];
  /** Base path for each card; slug + trailing slash is appended. */
  basePath: string;
  seeAllHref: string;
  seeAllLabel: string;
  subtle?: boolean;
}

export function ShowcaseSection({
  eyebrow,
  title,
  description,
  items,
  basePath,
  seeAllHref,
  seeAllLabel,
  subtle = false,
}: ShowcaseSectionProps) {
  return (
    <section
      className={
        subtle
          ? 'border-b border-[var(--border)] bg-[var(--bg-subtle)]'
          : 'border-b border-[var(--border)]'
      }
    >
      <Container size="wide" className="py-20 sm:py-24">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ slug, name, tagline }) => (
            <Link
              key={slug}
              href={`${basePath}${slug}/`}
              className="group focus-visible:outline-none"
            >
              <Card hover className="flex h-full flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-[var(--fg)]">{name}</h3>
                  <ArrowUpRight
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--fg-subtle)] transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400"
                    aria-hidden
                  />
                </div>
                <p className="text-sm leading-relaxed text-[var(--fg-muted)]">{tagline}</p>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href={seeAllHref}
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-2.5 text-sm font-semibold text-brand-600 transition-colors hover:border-brand-400/60 dark:text-brand-400"
          >
            {seeAllLabel}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
