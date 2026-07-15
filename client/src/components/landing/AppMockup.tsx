import {
  Wallet,
  BarChart3,
  Landmark,
  ClipboardList,
  Search,
  Command,
  AlertTriangle,
  Clock,
} from 'lucide-react';

/**
 * High-fidelity recreation of the real Acronix Books "Gateway" (dashboard):
 * Tally-style top menu bar, KPI band (Cash & Bank / Receivables / Payables /
 * Vouchers Today with Dr·Cr colouring), quick-create row, Recent + Needs-
 * attention panels, and the module strip — mirroring
 * apps/desktop/.../screens/gateway/GatewayScreen.tsx. Rendered in the app's
 * own light theme (like a genuine screenshot) regardless of the site theme,
 * with self-contained colours so it reads as a real product capture.
 */

const MENUS = [
  { label: 'Gateway', fkey: 'F1', active: true },
  { label: 'Vouchers', fkey: 'F2' },
  { label: 'Accounts', fkey: 'F3' },
  { label: 'Inventory', fkey: 'F4' },
  { label: 'Reports' },
  { label: 'GST' },
  { label: 'Banking' },
  { label: 'Settings' },
];

interface Kpi {
  icon: typeof Wallet;
  label: string;
  value: string;
  drcr?: string;
  sub: string;
  tag?: string;
  tone: 'ink' | 'debit' | 'credit';
}
const KPIS: Kpi[] = [
  { icon: Wallet, label: 'Cash & Bank', value: '₹ 8,45,200', drcr: 'Dr', sub: '3 accounts', tone: 'ink' },
  { icon: BarChart3, label: 'Receivables', value: '₹ 12,60,400', sub: '18 open', tag: '3 overdue', tone: 'debit' },
  { icon: Landmark, label: 'Payables', value: '₹ 7,15,900', sub: '11 open', tone: 'credit' },
  { icon: ClipboardList, label: 'Vouchers Today', value: '42', sub: 'posted today', tone: 'ink' },
];

const QUICKS = [
  { label: 'Sale', dot: '#059669' },
  { label: 'Purchase', dot: '#2E63E6' },
  { label: 'Receipt', dot: '#059669' },
  { label: 'Payment', dot: '#dc2626' },
  { label: 'Journal', dot: '#d97706' },
  { label: 'Credit Note', dot: '#64748b' },
];

interface Row {
  type: string;
  no: string;
  party: string;
  amount: string;
  drcr: 'Dr' | 'Cr';
  time: string;
  badge: string;
}
const RECENT: Row[] = [
  { type: 'Sale', no: 'SI-1042', party: 'Ramdev Textiles', amount: '3,27,600', drcr: 'Dr', time: '14:22', badge: '#059669' },
  { type: 'Receipt', no: 'RV-210', party: 'Meghdoot Traders', amount: '1,50,000', drcr: 'Cr', time: '13:58', badge: '#059669' },
  { type: 'Purchase', no: 'PI-338', party: 'Surat Yarn Mills', amount: '2,84,100', drcr: 'Cr', time: '12:40', badge: '#2E63E6' },
  { type: 'Payment', no: 'PY-176', party: 'Gujarat Transport Co.', amount: '46,800', drcr: 'Dr', time: '11:31', badge: '#dc2626' },
  { type: 'Credit Note', no: 'CN-033', party: 'Ramdev Textiles', amount: '18,900', drcr: 'Cr', time: '10:52', badge: '#64748b' },
  { type: 'Journal', no: 'JV-090', party: 'Depreciation — Plant', amount: '22,500', drcr: 'Dr', time: '09:47', badge: '#d97706' },
];

interface Attn {
  tone: 'debit' | 'warning' | 'muted';
  title: string;
  sub: string;
  amount: string | null;
}
const ATTENTION: Attn[] = [
  { tone: 'debit', title: '3 receivables overdue', sub: 'Oldest 41 days', amount: '₹ 2,10,000' },
  { tone: 'warning', title: 'GSTR-1 due in 5 days', sub: 'Jun 2026 · 128 B2B invoices', amount: null },
  { tone: 'warning', title: 'Payables due this week', sub: '4 bills', amount: '₹ 1,80,000' },
  { tone: 'muted', title: 'Books locked up to 31 Mar 2026', sub: 'FY 2025-26 frozen', amount: null },
];

function toneColor(t: string): string {
  if (t === 'debit') return '#dc2626';
  if (t === 'credit') return '#059669';
  if (t === 'warning') return '#d97706';
  return '#64748b';
}

export function AppMockup() {
  return (
    <div className="overflow-hidden rounded-xl bg-white text-[#141a26] ring-1 ring-black/5">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-[#e6ebf3] bg-[#eef2f8] px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 text-[11px] font-medium text-[#4d5d78]">
          <svg viewBox="234.9 236 553 553" className="h-3 w-3 text-[#2E63E6]" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M508 280 456 373 420 438 336 586 245 751 344 751 418 684 486 633 518 662 458 707 400 749 780 749 745 687 667 549 602 433 512 274ZM511 448 467 529 423 616 612 616 579 555 540 482Z"
            />
          </svg>
          Acronix Books — Ramdev Textiles · FY 2026-27
        </span>
      </div>

      {/* Top menu bar (Tally-style) */}
      <div className="flex items-center justify-between border-b border-[#e6ebf3] px-3 py-1.5">
        <nav className="flex items-center gap-0.5 text-[12px]">
          {MENUS.map((m) => (
            <span
              key={m.label}
              className={
                'rounded-[4px] px-2 py-1 font-medium ' +
                (m.active ? 'bg-[#2E63E6] text-white' : 'text-[#38455c]')
              }
            >
              <span className="underline decoration-2 underline-offset-2">{m.label[0]}</span>
              {m.label.slice(1)}
              {m.fkey && (
                <span className={'ml-1 text-[9px] ' + (m.active ? 'text-white/70' : 'text-[#93a3bd]')}>
                  {m.fkey}
                </span>
              )}
            </span>
          ))}
        </nav>
        <span className="hidden items-center gap-1.5 rounded-[4px] border border-[#dde4ef] px-2 py-1 text-[11px] text-[#6b7c99] sm:flex">
          <Search className="h-3 w-3" />
          Search
          <span className="ml-1 inline-flex items-center gap-0.5 rounded border border-[#dde4ef] bg-[#f7f9fc] px-1 text-[9px]">
            <Command className="h-2.5 w-2.5" />K
          </span>
        </span>
      </div>

      <div className="space-y-2.5 bg-[#f7f9fc] p-2.5">
        {/* KPI band */}
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {KPIS.map((k) => {
            const Icon = k.icon;
            const valColor = k.tone === 'debit' ? '#dc2626' : k.tone === 'credit' ? '#059669' : '#141a26';
            return (
              <div key={k.label} className="rounded-[5px] border border-[#e6ebf3] bg-white p-2.5">
                <div className="flex items-center justify-between text-[10.5px] font-medium uppercase tracking-wide text-[#6b7c99]">
                  {k.label}
                  <Icon className="h-3.5 w-3.5 text-[#93a3bd]" />
                </div>
                <div className="mt-1.5 font-mono text-[15px] font-semibold tabular-nums" style={{ color: valColor }}>
                  {k.value}
                  {k.drcr && <span className="ml-1 text-[10px] font-semibold text-[#059669]">{k.drcr}</span>}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[10.5px] text-[#6b7c99]">
                  {k.sub}
                  {k.tag && (
                    <span className="rounded-full bg-[#fdecec] px-1.5 py-px text-[9.5px] font-medium text-[#dc2626]">
                      {k.tag}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick create */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-[5px] border border-[#e6ebf3] bg-white px-2.5 py-2">
          <span className="mr-1 text-[10.5px] font-medium uppercase tracking-wide text-[#93a3bd]">Create</span>
          {QUICKS.map((q) => (
            <span
              key={q.label}
              className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#dde4ef] px-2 py-1 text-[11px] font-medium text-[#38455c]"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: q.dot }} />
              {q.label}
            </span>
          ))}
        </div>

        {/* Work area */}
        <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[1.55fr_1fr]">
          {/* Recent */}
          <div className="rounded-[5px] border border-[#e6ebf3] bg-white">
            <div className="flex items-center justify-between border-b border-[#eef2f8] px-2.5 py-1.5 text-[11px] font-semibold text-[#38455c]">
              Recent
              <span className="font-normal text-[#93a3bd]">42 vouchers today</span>
            </div>
            <table className="w-full text-[11px]">
              <tbody>
                {RECENT.map((r) => (
                  <tr key={r.no} className="border-b border-[#f2f5fa] last:border-0">
                    <td className="py-1.5 pl-2.5 pr-1">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.badge }} />
                        <span className="text-[#4d5d78]">{r.type}</span>
                      </span>
                    </td>
                    <td className="px-1 font-mono text-[#6b7c99]">{r.no}</td>
                    <td className="px-1 text-[#141a26]">{r.party}</td>
                    <td
                      className="px-1 text-right font-mono font-medium tabular-nums"
                      style={{ color: r.drcr === 'Dr' ? '#dc2626' : '#059669' }}
                    >
                      ₹{r.amount} {r.drcr}
                    </td>
                    <td className="py-1.5 pl-1 pr-2.5 text-right font-mono text-[10px] text-[#93a3bd]">{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Needs attention */}
          <div className="rounded-[5px] border border-[#e6ebf3] bg-white">
            <div className="flex items-center gap-1.5 border-b border-[#eef2f8] px-2.5 py-1.5 text-[11px] font-semibold text-[#38455c]">
              <AlertTriangle className="h-3.5 w-3.5 text-[#d97706]" />
              Needs attention
            </div>
            <div className="divide-y divide-[#f2f5fa]">
              {ATTENTION.map((a) => (
                <div key={a.title} className="flex items-start gap-2 px-2.5 py-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: toneColor(a.tone) }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-medium text-[#141a26]">{a.title}</div>
                    <div className="text-[10px] text-[#93a3bd]">{a.sub}</div>
                  </div>
                  {a.amount && (
                    <span
                      className="font-mono text-[11px] font-medium tabular-nums"
                      style={{ color: toneColor(a.tone) }}
                    >
                      {a.amount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-[#e6ebf3] bg-[#eef2f8] px-3 py-1.5 text-[10px] text-[#6b7c99]">
        <span className="flex items-center gap-3">
          <span>↑↓←→ Navigate</span>
          <span>Enter Open</span>
          <span className="hidden sm:inline">Ctrl+K Command</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3 w-3" /> 14:32 · AV · Owner
        </span>
      </div>
    </div>
  );
}
