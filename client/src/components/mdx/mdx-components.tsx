import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Info, Lightbulb, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ *
 * Callout — usable directly inside MDX: <Callout type="tip">…</Callout>
 * ------------------------------------------------------------------ */
type CalloutType = 'info' | 'warn' | 'tip';

const CALLOUT_STYLES: Record<
  CalloutType,
  { icon: typeof Info; label: string; wrap: string; iconColor: string }
> = {
  info: {
    icon: Info,
    label: 'Note',
    wrap: 'border-brand-200 bg-brand-50 dark:border-brand-400/25 dark:bg-brand-400/10',
    iconColor: 'text-brand-600 dark:text-brand-400',
  },
  tip: {
    icon: Lightbulb,
    label: 'Tip',
    wrap: 'border-teal-200 bg-teal-50 dark:border-teal-400/25 dark:bg-teal-400/10',
    iconColor: 'text-teal-600 dark:text-teal-300',
  },
  warn: {
    icon: TriangleAlert,
    label: 'Important',
    wrap: 'border-amber-200 bg-amber-50 dark:border-amber-400/25 dark:bg-amber-400/10',
    iconColor: 'text-amber-600 dark:text-amber-300',
  },
};

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const style = CALLOUT_STYLES[type];
  const Icon = style.icon;
  return (
    <div className={cn('not-prose my-6 flex gap-3 rounded-xl border p-4', style.wrap)}>
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', style.iconColor)} aria-hidden />
      <div className="min-w-0 text-sm leading-relaxed text-[var(--fg)]">
        <p className="mb-1 font-semibold">{title ?? style.label}</p>
        <div className="[&_a]:text-brand-600 [&_a]:underline dark:[&_a]:text-brand-400 [&_code]:rounded [&_code]:bg-[var(--bg-subtle)] [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em] [&>*+*]:mt-2">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Anchor — internal links go through next/link for client navigation.
 * `.prose a` handles the visual styling; rehype-autolink adds `.anchor`
 * spans which we must leave untouched.
 * ------------------------------------------------------------------ */
function MdxLink({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const target = href ?? '#';
  const isInternal = target.startsWith('/') || target.startsWith('#');
  if (isInternal && !target.startsWith('#')) {
    return (
      <Link href={target} {...rest}>
        {children}
      </Link>
    );
  }
  const isExternal = target.startsWith('http');
  return (
    <a
      href={target}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * Component map handed to MDXRemote. Most element styling is delegated to the
 * global `.prose` class; we only augment where a React component adds value
 * (internal links) and register components authors can call inside MDX.
 */
export const mdxComponents = {
  a: MdxLink,
  Callout,
} as const;
