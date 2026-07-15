import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-sm shadow-brand-600/25 hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/30 active:translate-y-px dark:bg-brand-500 dark:hover:bg-brand-400 dark:text-ink-950',
  secondary:
    'bg-ink-900 text-white hover:bg-ink-800 active:translate-y-px dark:bg-white dark:text-ink-950 dark:hover:bg-ink-100',
  outline:
    'border border-[var(--border-strong)] text-[var(--fg)] bg-[var(--bg-elevated)] hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400',
  ghost: 'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-13 px-7 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<
    ComponentPropsWithoutRef<'a'>,
    'href'
  >) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external || href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
