import Link from 'next/link';
import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import { site } from '@/lib/site';

export interface BreadcrumbItem {
  label: string;
  /** Site-relative path (e.g. `/docs/`). Omit for the current page. */
  href?: string;
}

interface BreadcrumbListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

/**
 * Accessible breadcrumb trail with a matching `BreadcrumbList` JSON-LD block.
 * Presentational only — callers pass the resolved trail.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index): BreadcrumbListItem => {
      const entry: BreadcrumbListItem = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
      };
      if (item.href) entry.item = `${site.url}${item.href}`;
      return entry;
    }),
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--fg-muted)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li className="inline-flex items-center">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'font-medium text-[var(--fg)]' : undefined}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="inline-flex items-center">
                  <ChevronRight className="h-4 w-4 text-[var(--fg-muted)]/60" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
