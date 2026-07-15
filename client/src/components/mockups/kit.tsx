import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ *
 * Shared kit for the product mockups. These are faithful ports of the
 * real desktop-app primitives (apps/desktop/.../components/ui/kbd.tsx,
 * lib/money.ts) plus a window/shell frame, all rendered inside `.acx-app`
 * so they use the real app theme and flip with the site's light/dark.
 * ------------------------------------------------------------------ */

/** Ported from apps/desktop/src/renderer/src/lib/money.ts */
export function formatMoney(value: string | number): string {
  const v = typeof value === 'number' ? value : parseFloat(value || '0');
  if (!Number.isFinite(v)) return '0.00';
  return v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function prettyKey(t: string): string {
  const lower = t.toLowerCase();
  if (lower === 'escape') return 'Esc';
  if (lower === 'enter') return '↵';
  if (lower === 'tab') return 'Tab';
  if (lower === 'shift') return '⇧';
  if (lower === 'ctrl' || lower === 'control') return 'Ctrl';
  if (lower === 'alt' || lower === 'option') return 'Alt';
  if (lower === 'cmd' || lower === 'meta') return '⌘';
  if (/^f\d+$/.test(lower)) return lower.toUpperCase();
  if (t.length === 1) return t.toUpperCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/** Ported from apps/desktop/src/renderer/src/components/ui/kbd.tsx */
export function Kbd({
  keys,
  className,
  size = 'sm',
}: {
  keys: string | string[];
  className?: string;
  size?: 'xs' | 'sm';
}) {
  const tokens = Array.isArray(keys) ? keys : keys.split('+').map((t) => t.trim());
  const dims = size === 'xs' ? 'h-4 px-1 min-w-4 text-[10px]' : 'h-5 px-1.5 min-w-5 text-[11px]';
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      {tokens.map((t, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-muted-foreground/60 text-[10px]">+</span>}
          <kbd
            className={cn(
              'inline-flex items-center justify-center rounded-sm border border-border',
              'bg-bar text-bar-foreground font-mono font-medium leading-none',
              'shadow-[0_1px_0_0_var(--color-border)]',
              dims,
            )}
          >
            {prettyKey(t)}
          </kbd>
        </React.Fragment>
      ))}
    </span>
  );
}

/** Underlined-mnemonic label, mirroring the NavBar accelerator rendering. */
function Mnemonic({ label, u }: { label: string; u: number }) {
  return (
    <span>
      {label.slice(0, u)}
      <u>{label.charAt(u)}</u>
      {label.slice(u + 1)}
    </span>
  );
}

/** The real top-menu set (apps/desktop/.../components/shell/sections.ts). */
export const NAV_MENUS = [
  { label: 'Gateway', u: 0, fkey: 'F1' },
  { label: 'Vouchers', u: 0, fkey: 'F2' },
  { label: 'Accounts', u: 0, fkey: 'F3' },
  { label: 'Inventory', u: 0, fkey: 'F4' },
  { label: 'Reports', u: 0, fkey: 'F5' },
  { label: 'Banking', u: 0, fkey: 'F6' },
  { label: 'GST', u: 0, fkey: 'F7' },
  { label: 'Audit', u: 1, fkey: 'F8' },
  { label: 'Settings', u: 0, fkey: 'F9' },
] as const;

const GLYPH =
  'M508 280 456 373 420 438 336 586 245 751 344 751 418 684 486 633 518 662 458 707 400 749 780 749 745 687 667 549 602 433 512 274ZM511 448 467 529 423 616 612 616 579 555 540 482Z';

/**
 * Window + shell chrome shared by every mockup screen: title bar, the
 * Tally-style top menu (active item highlighted), the screen body, and the
 * status bar. Everything inside is themed by `.acx-app`, so it renders in the
 * app's real light/dark palette and flips with the site theme.
 */
export function AppWindow({
  active,
  company = 'Ramdev Textiles',
  fy = 'FY 2026-27',
  statusLeft,
  statusRight = '14:32 · AV · Owner',
  children,
}: {
  active: string;
  company?: string;
  fy?: string;
  statusLeft: React.ReactNode;
  statusRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="acx-app overflow-hidden rounded-xl border border-border bg-background text-foreground ring-1 ring-black/5">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-bar px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <svg viewBox="234.9 236 553 553" className="h-3 w-3 text-primary" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d={GLYPH} />
          </svg>
          Acronix Books — {company} · {fy}
        </span>
      </div>

      {/* Top menu bar */}
      <div className="flex items-center justify-between border-b border-border bg-surface px-2 py-1.5">
        <nav className="flex items-center gap-0.5 text-[12px]">
          {NAV_MENUS.map((m) => {
            const on = m.label === active;
            return (
              <span
                key={m.label}
                className={cn(
                  'inline-flex items-center gap-1 rounded-sm px-2 py-1 font-medium',
                  on ? 'bg-primary text-primary-foreground' : 'text-foreground/80',
                )}
              >
                <Mnemonic label={m.label} u={m.u} />
                <span className={cn('text-[9px]', on ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                  {m.fkey}
                </span>
              </span>
            );
          })}
        </nav>
        <span className="hidden items-center gap-1.5 rounded-sm border border-border bg-bar px-2 py-1 text-[11px] text-muted-foreground sm:flex">
          <Search className="h-3 w-3" />
          Search
          <Kbd keys="Ctrl+K" size="xs" className="ml-0.5 opacity-80" />
        </span>
      </div>

      {/* Screen body */}
      <div className="bg-background p-2.5">{children}</div>

      {/* Status bar */}
      <div className="flex items-center justify-between gap-3 border-t border-border bg-bar px-3 py-1.5 text-[11px] text-bar-foreground">
        <span className="flex items-center gap-3">{statusLeft}</span>
        <span className="text-muted-foreground">{statusRight}</span>
      </div>
    </div>
  );
}
