import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Badge({
  children,
  className,
  tone = 'brand',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'brand' | 'neutral' | 'accent';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
        tone === 'brand' &&
          'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-400/25 dark:bg-brand-400/10 dark:text-brand-300',
        tone === 'neutral' &&
          'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg-muted)]',
        tone === 'accent' &&
          'border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-400/25 dark:bg-teal-400/10 dark:text-teal-300',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-[var(--bg-elevated)] p-6 transition-all duration-300',
        hover && 'hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-lg hover:shadow-brand-600/5',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'text-sm font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'mx-auto max-w-2xl text-center items-center',
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg leading-relaxed text-[var(--fg-muted)]">{description}</p>
      )}
    </div>
  );
}
