import {
  ArrowRight,
  Wallet,
  BarChart3,
  Landmark,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppWindow, Kbd, formatMoney, NAV_MENUS } from './kit';

/* Faithful static port of the desktop app's Gateway (dashboard) —
 * apps/desktop/src/renderer/src/screens/gateway/*. Interactivity (roving
 * focus, live queries) is dropped; the JSX + classes mirror the real
 * KeyFigure / QuickCreateBar / RecentPanel / AttentionPanel / ModuleStrip. */

// ---- KeyFigure (ported) ----
function KeyFigure({
  label,
  icon: Icon,
  value,
  valueTone,
  drcr,
  sub,
  tag,
}: {
  label: string;
  icon: LucideIcon;
  value: string;
  valueTone?: 'debit' | 'credit';
  drcr?: 'DR' | 'CR' | null;
  sub?: string;
  tag?: { text: string; tone: 'debit' | 'credit' | 'warning' } | null;
}) {
  return (
    <div className="group flex min-w-0 flex-col gap-1 rounded-sm border border-border bg-surface px-3 py-2.5 text-left">
      <div className="flex items-center justify-between gap-1.5">
        <span className="flex min-w-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Icon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{label}</span>
        </span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            'truncate font-mono text-xl font-semibold tabular-nums',
            valueTone === 'debit' ? 'text-debit' : valueTone === 'credit' ? 'text-credit' : 'text-foreground',
          )}
        >
          {value}
        </span>
        {drcr && (
          <span className={cn('shrink-0 text-[10px] font-semibold', drcr === 'DR' ? 'text-debit' : 'text-credit')}>
            {drcr}
          </span>
        )}
      </div>
      <div className="flex h-4 min-w-0 items-center gap-2 text-[11px] leading-none">
        <span className="truncate text-muted-foreground">{sub ?? ''}</span>
        {tag && (
          <span
            className={cn(
              'shrink-0 rounded-sm px-1.5 py-0.5 text-[10px] font-semibold',
              tag.tone === 'debit' ? 'bg-debit/10 text-debit' : tag.tone === 'credit' ? 'bg-credit/10 text-credit' : 'bg-warning/10 text-warning',
            )}
          >
            {tag.text}
          </span>
        )}
      </div>
    </div>
  );
}

const KPIS = [
  { label: 'Cash & Bank', icon: Wallet, value: `₹ ${formatMoney(845200)}`, drcr: 'DR' as const, sub: '3 accounts' },
  { label: 'Receivables', icon: BarChart3, value: `₹ ${formatMoney(1260400)}`, valueTone: 'debit' as const, sub: '18 open', tag: { text: '3 overdue', tone: 'debit' as const } },
  { label: 'Payables', icon: Landmark, value: `₹ ${formatMoney(715900)}`, valueTone: 'credit' as const, sub: '11 open' },
  { label: 'Vouchers Today', icon: ClipboardList, value: '42', sub: 'posted today' },
];

const QUICKS = [
  { label: 'Sale', dot: 'bg-credit' },
  { label: 'Purchase', dot: 'bg-primary' },
  { label: 'Receipt', dot: 'bg-credit' },
  { label: 'Payment', dot: 'bg-debit' },
  { label: 'Journal', dot: 'bg-warning' },
  { label: 'Credit Note', dot: 'bg-muted-foreground' },
];

const RECENT = [
  { no: 'SI-1042', party: 'Ramdev Textiles', type: 'SALE', amount: 327600 },
  { no: 'RV-210', party: 'Meghdoot Traders', type: 'RECEIPT', amount: 150000 },
  { no: 'PI-338', party: 'Surat Yarn Mills', type: 'PURCHASE', amount: 284100 },
  { no: 'PY-176', party: 'Gujarat Transport Co.', type: 'PAYMENT', amount: 46800 },
  { no: 'CN-033', party: 'Ramdev Textiles', type: 'CR NOTE', amount: 18900 },
  { no: 'JV-090', party: 'Depreciation — Plant', type: 'JOURNAL', amount: 22500 },
];

interface Attn {
  tone: 'crit' | 'warn' | 'info';
  title: string;
  sub: string;
  amount?: { value: string; drcr: 'DR' | 'CR' };
  cta?: string;
}
const ATTENTION: Attn[] = [
  { tone: 'crit', title: '3 receivables overdue', sub: 'Oldest 41 days', amount: { value: formatMoney(210000), drcr: 'DR' } },
  { tone: 'warn', title: 'GSTR-1 due in 5 days', sub: 'Jun 2026 · 128 B2B invoices', cta: 'File' },
  { tone: 'warn', title: 'Supplier bills due this week', sub: '4 bills', amount: { value: formatMoney(180000), drcr: 'CR' } },
  { tone: 'info', title: 'Books locked up to 31 Mar 2026', sub: 'FY 2025-26 frozen', cta: 'Review' },
];
const STRIPE = { crit: 'bg-destructive', warn: 'bg-warning', info: 'bg-primary' } as const;

const MODULES = NAV_MENUS.filter((m) => m.label !== 'Gateway');

export function DashboardMock() {
  return (
    <AppWindow
      active="Gateway"
      statusLeft={
        <>
          <span>↑↓←→ Navigate</span>
          <span className="hidden items-center gap-1 sm:flex">
            <Kbd keys="Enter" size="xs" /> Open
          </span>
          <span className="hidden items-center gap-1 sm:flex">
            <Kbd keys="Ctrl+K" size="xs" /> Command
          </span>
        </>
      }
    >
      <div className="flex flex-col gap-2.5">
        {/* KPI band */}
        <section className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {KPIS.map((k) => (
            <KeyFigure key={k.label} {...k} />
          ))}
        </section>

        {/* Quick create */}
        <section className="flex items-center gap-2.5 rounded-sm border border-border bg-surface px-3 py-2">
          <span className="whitespace-nowrap border-r border-border pr-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Create
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {QUICKS.map((b) => (
              <span
                key={b.label}
                className="inline-flex h-7 items-center gap-1.5 rounded-sm border border-border bg-bar px-2.5 text-[12px] font-medium"
              >
                <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', b.dot)} />
                {b.label}
              </span>
            ))}
          </div>
        </section>

        {/* Work area */}
        <section className="grid grid-cols-1 gap-2.5 lg:grid-cols-[1.55fr_1fr]">
          {/* Today & Recent */}
          <div className="flex min-h-0 flex-col overflow-hidden rounded-sm border border-border bg-surface">
            <header className="flex h-8 shrink-0 items-center justify-between gap-2 border-b border-border bg-bar px-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Today &amp; Recent
              </span>
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground">42 today</span>
            </header>
            <table className="w-full text-[12px] tabular-nums">
              <tbody>
                {RECENT.map((r) => (
                  <tr key={r.no} className="border-t border-border/50 first:border-t-0">
                    <td className="w-[92px] px-3 py-1.5 font-mono font-medium text-primary">{r.no}</td>
                    <td className="truncate px-3 py-1.5">{r.party}</td>
                    <td className="w-[92px] px-2 py-1.5">
                      <span className="inline-block rounded-sm border border-border bg-bar px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {r.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-1.5 text-right font-mono">{formatMoney(r.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Needs Attention */}
          <div className="flex min-h-0 flex-col overflow-hidden rounded-sm border border-border bg-surface">
            <header className="flex h-8 shrink-0 items-center justify-between gap-2 border-b border-border bg-bar px-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Needs Attention
              </span>
              <span className="rounded-full bg-destructive/15 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-destructive">
                1
              </span>
            </header>
            <div>
              {ATTENTION.map((it) => (
                <div
                  key={it.title}
                  className="flex items-stretch gap-2.5 border-t border-border/50 px-3 py-2 first:border-t-0"
                >
                  <span className={cn('w-[3px] shrink-0 rounded-sm', STRIPE[it.tone])} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12px] font-medium text-foreground">{it.title}</div>
                    <div className="truncate text-[10.5px] text-muted-foreground">{it.sub}</div>
                  </div>
                  {it.amount ? (
                    <div className="self-center whitespace-nowrap text-right">
                      <div
                        className={cn(
                          'font-mono text-[12.5px] font-semibold tabular-nums',
                          it.amount.drcr === 'DR' ? 'text-debit' : 'text-credit',
                        )}
                      >
                        {it.amount.value}
                      </div>
                      <div className="text-[9px] text-muted-foreground">{it.amount.drcr}</div>
                    </div>
                  ) : it.cta ? (
                    <span className="self-center whitespace-nowrap text-[11px] font-medium text-primary">
                      {it.cta} →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Module strip */}
        <section className="flex items-center gap-2.5 rounded-sm border border-border bg-surface px-3 py-1.5">
          <span className="whitespace-nowrap border-r border-border pr-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Modules
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {MODULES.map((c) => (
              <span
                key={c.label}
                className="inline-flex h-6 items-center gap-1.5 rounded-sm border border-border bg-bar px-2 text-[12px] font-medium text-muted-foreground"
              >
                <span>
                  {c.label.slice(0, c.u)}
                  <u>{c.label.charAt(c.u)}</u>
                  {c.label.slice(c.u + 1)}
                </span>
                <Kbd keys={c.fkey} size="xs" className="opacity-70" />
              </span>
            ))}
          </div>
        </section>
      </div>
    </AppWindow>
  );
}
