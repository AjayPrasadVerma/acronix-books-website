import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DocMeta } from '@/lib/content';

/**
 * Previous / next navigation shown at the foot of a doc page. Either side may be
 * absent (first / last doc in the ordered list).
 */
export function DocsPager({ prev, next }: { prev: DocMeta | null; next: DocMeta | null }) {
  if (!prev && !next) return null;
  return (
    <nav className="mt-14 grid gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}/`}
          className="group flex flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 transition-colors hover:border-brand-400/60"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--fg-subtle)]">
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous
          </span>
          <span className="font-semibold text-[var(--fg)] group-hover:text-brand-600 dark:group-hover:text-brand-400">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}
      {next && (
        <Link
          href={`/docs/${next.slug}/`}
          className={cn(
            'group flex flex-col items-end gap-1 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-right transition-colors hover:border-brand-400/60',
            !prev && 'sm:col-start-2',
          )}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--fg-subtle)]">
            Next
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="font-semibold text-[var(--fg)] group-hover:text-brand-600 dark:group-hover:text-brand-400">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
