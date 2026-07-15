import {
  FileText,
  FileSpreadsheet,
  FileDown,
  ShieldCheck,
  KeyRound,
  Laptop,
  Cloud,
  Check,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Shared frame so every visual reads as one system. */
function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-5 shadow-xl shadow-ink-950/5 dark:shadow-black/30',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function InvoicingVisual() {
  const lines = [
    { label: 'Sales Invoice · SI-1042', tag: 'Sales', amt: '₹1,93,200' },
    { label: 'Payment · PMT-0219', tag: 'Receipt', amt: '₹1,00,000' },
    { label: 'Journal · JV-0044', tag: 'Journal', amt: '₹12,500' },
    { label: 'Credit Note · CN-0033', tag: 'Note', amt: '₹18,900' },
  ];
  return (
    <Frame>
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <span className="text-sm font-semibold text-[var(--fg)]">Day book</span>
        <span className="rounded-md bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand-700 dark:bg-brand-400/10 dark:text-brand-300">
          FY 2026–27
        </span>
      </div>
      <ul className="space-y-2">
        {lines.map((l) => (
          <li
            key={l.label}
            className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2.5"
          >
            <span className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
              <FileText className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              {l.label}
            </span>
            <span className="text-sm font-semibold tabular-nums text-[var(--fg)]">{l.amt}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function GstVisual() {
  return (
    <Frame>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { name: 'GSTR-1', sub: 'Outward supplies', val: '₹48,20,650' },
          { name: 'GSTR-3B', sub: 'Summary return', val: '₹3,74,190' },
        ].map((g) => (
          <div key={g.name} className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-bold text-[var(--fg)]">{g.name}</span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-400/10 dark:text-teal-400">
                <Check className="h-3.5 w-3.5" />
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--fg-subtle)]">{g.sub}</p>
            <p className="mt-3 text-lg font-bold tabular-nums text-[var(--fg)]">{g.val}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-brand-600 px-4 py-3 text-white dark:bg-brand-500 dark:text-ink-950">
        <span className="text-sm font-semibold">Ready to file · July 2026</span>
        <span className="flex items-center gap-1.5 text-xs font-semibold">
          <FileSpreadsheet className="h-4 w-4" />
          Export Excel
        </span>
      </div>
    </Frame>
  );
}

export function InventoryVisual() {
  const items = [
    { sku: 'FAB-COT-42', name: 'Cotton Fabric 42"', qty: '1,240 m', low: false },
    { sku: 'YRN-PLY-30', name: 'Polyester Yarn 30s', qty: '86 cones', low: true },
    { sku: 'FAB-SLK-36', name: 'Silk Blend 36"', qty: '540 m', low: false },
    { sku: 'DYE-RB-05', name: 'Reactive Dye — Blue', qty: '312 kg', low: false },
  ];
  return (
    <Frame>
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <span className="text-sm font-semibold text-[var(--fg)]">Stock summary</span>
        <span className="text-xs text-[var(--fg-subtle)]">Main Warehouse · Surat</span>
      </div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li
            key={it.sku}
            className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2.5"
          >
            <span>
              <span className="block text-sm font-medium text-[var(--fg)]">{it.name}</span>
              <span className="block text-[11px] tabular-nums text-[var(--fg-subtle)]">{it.sku}</span>
            </span>
            <span
              className={cn(
                'text-sm font-semibold tabular-nums',
                it.low ? 'text-amber-600 dark:text-amber-400' : 'text-[var(--fg)]',
              )}
            >
              {it.qty}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function ReportsVisual() {
  const bars = [42, 58, 47, 71, 63, 88];
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  return (
    <Frame>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--fg)]">Sales trend</span>
        <span className="text-xs text-[var(--fg-subtle)]">Last 6 months</span>
      </div>
      <div className="flex h-40 items-end gap-2.5">
        {bars.map((h, i) => (
          <div key={months[i]} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-brand-600 to-brand-400 dark:from-brand-500 dark:to-brand-300"
              style={{ height: `${h}%` }}
            />
            <span className="text-[10px] text-[var(--fg-subtle)]">{months[i]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2 border-t border-[var(--border)] pt-4">
        <span className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] py-2 text-xs font-semibold text-[var(--fg-muted)]">
          <FileDown className="h-4 w-4" /> PDF
        </span>
        <span className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] py-2 text-xs font-semibold text-[var(--fg-muted)]">
          <FileSpreadsheet className="h-4 w-4" /> Excel
        </span>
      </div>
    </Frame>
  );
}

export function SecurityVisual() {
  return (
    <Frame>
      <div className="flex flex-col items-center py-4 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30 dark:bg-brand-500 dark:text-ink-950">
          <ShieldCheck className="h-8 w-8" />
        </span>
        <p className="mt-4 font-display text-base font-bold text-[var(--fg)]">
          Book encrypted · AES-256
        </p>
        <p className="mt-1 text-xs text-[var(--fg-subtle)]">SQLCipher · scrypt KEK · key vault</p>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {[
          { icon: KeyRound, label: 'User key slot' },
          { icon: KeyRound, label: 'Recovery code' },
        ].map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2.5 text-xs font-medium text-[var(--fg-muted)]"
          >
            <s.icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            {s.label}
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function SyncVisual() {
  return (
    <Frame>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
          <Laptop className="h-8 w-8 text-brand-600 dark:text-brand-400" />
          <span className="text-xs font-medium text-[var(--fg-muted)]">This device</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-[var(--fg-subtle)]">
          <span className="h-px w-8 bg-[var(--border-strong)]" />
          <Cloud className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          <span className="h-px w-8 bg-[var(--border-strong)]" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
          <Laptop className="h-8 w-8 text-brand-600 dark:text-brand-400" />
          <span className="text-xs font-medium text-[var(--fg-muted)]">New device</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
        <Check className="h-4 w-4" />
        Full book restored · isolated & encrypted
      </div>
    </Frame>
  );
}
