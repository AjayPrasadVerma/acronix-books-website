import type { ReactNode } from 'react';
import { ArrowUp } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Primitives';

/** Format an ISO date (YYYY-MM-DD) as e.g. "1 July 2026" deterministically. */
function formatPolicyDate(iso: string): string {
  const parsed = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}

export function LegalLayout({
  eyebrow,
  title,
  intro,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div id="top">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container size="narrow" className="py-16 sm:py-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--fg)] sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 text-lg leading-relaxed text-[var(--fg-muted)]">{intro}</p>
          )}
          <p className="mt-6 text-sm font-medium text-[var(--fg-subtle)]">
            Last updated {formatPolicyDate(lastUpdated)}
          </p>
        </Container>
      </section>

      {/* Body */}
      <Container size="narrow" className="py-14 sm:py-16">
        <div className="prose max-w-none">{children}</div>

        <div className="mt-14 border-t border-[var(--border)] pt-6">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
            Back to top
          </a>
        </div>
      </Container>
    </div>
  );
}
