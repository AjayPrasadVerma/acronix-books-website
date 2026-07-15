import { Calendar, ChevronDown, FileSpreadsheet, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppWindow, Kbd, formatMoney } from './kit';

/* Faithful static port of the desktop app's Day Book report —
 * apps/desktop/src/renderer/src/screens/reports/DayBookScreen.tsx.
 * Interactivity (live query, virtualization, range dialog, search,
 * roving focus) is dropped; the JSX + classes mirror the real header
 * strip, the date-banded table (Vch Type · Vch No · Ledger · Narration ·
 * Debit · Credit), the per-date total rows, and the grand-total footer.
 * Dummy data is balanced so total Debit === total Credit (double entry). */

interface Leg {
  ledger: string;
  narration?: string;
  dr: number;
  cr: number;
}

interface Voucher {
  type: string;
  no: string;
  legs: Leg[];
}

interface Day {
  date: string; // "12-Jul-2026"
  vouchers: Voucher[];
}

const DAYS: Day[] = [
  {
    date: '12-Jul-2026',
    vouchers: [
      {
        type: 'Sale',
        no: 'SI-1042',
        legs: [
          { ledger: 'Ramdev Textiles', narration: 'Grey fabric — 12 bales', dr: 327600, cr: 0 },
          { ledger: 'Sales @ 5% GST', dr: 0, cr: 312000 },
          { ledger: 'Output IGST', dr: 0, cr: 15600 },
        ],
      },
      {
        type: 'Receipt',
        no: 'RV-210',
        legs: [
          { ledger: 'HDFC Bank — 4471', narration: 'NEFT against SI-1019', dr: 150000, cr: 0 },
          { ledger: 'Meghdoot Traders', dr: 0, cr: 150000 },
        ],
      },
    ],
  },
  {
    date: '13-Jul-2026',
    vouchers: [
      {
        type: 'Purchase',
        no: 'PI-338',
        legs: [
          { ledger: 'Purchase @ 5% GST', narration: 'Cotton yarn 40s', dr: 270000, cr: 0 },
          { ledger: 'Input IGST', dr: 13500, cr: 0 },
          { ledger: 'Surat Yarn Mills', dr: 0, cr: 283500 },
        ],
      },
      {
        type: 'Payment',
        no: 'PY-176',
        legs: [
          { ledger: 'Gujarat Transport Co.', narration: 'Freight — 3 LR', dr: 46800, cr: 0 },
          { ledger: 'HDFC Bank — 4471', dr: 0, cr: 46800 },
        ],
      },
      {
        type: 'Journal',
        no: 'JV-090',
        legs: [
          { ledger: 'Depreciation — Plant', narration: 'Monthly SLM charge', dr: 22500, cr: 0 },
          { ledger: 'Accumulated Depreciation', dr: 0, cr: 22500 },
        ],
      },
    ],
  },
  {
    date: '14-Jul-2026',
    vouchers: [
      {
        type: 'Contra',
        no: 'CV-058',
        legs: [
          { ledger: 'Cash in Hand', narration: 'Bank withdrawal', dr: 100000, cr: 0 },
          { ledger: 'HDFC Bank — 4471', dr: 0, cr: 100000 },
        ],
      },
      {
        type: 'Credit Note',
        no: 'CN-033',
        legs: [
          { ledger: 'Sales Return', narration: 'Short-shipment on SI-1042', dr: 18000, cr: 0 },
          { ledger: 'Output IGST', dr: 900, cr: 0 },
          { ledger: 'Ramdev Textiles', dr: 0, cr: 18900 },
        ],
      },
    ],
  },
];

function dayTotals(day: Day): { dr: number; cr: number } {
  return day.vouchers.reduce(
    (acc, v) => {
      for (const leg of v.legs) {
        acc.dr += leg.dr;
        acc.cr += leg.cr;
      }
      return acc;
    },
    { dr: 0, cr: 0 },
  );
}

const GRAND = DAYS.reduce(
  (acc, d) => {
    const t = dayTotals(d);
    acc.dr += t.dr;
    acc.cr += t.cr;
    return acc;
  },
  { dr: 0, cr: 0 },
);

const VOUCHER_COUNT = DAYS.reduce((n, d) => n + d.vouchers.length, 0);

function Amount({ value, tone }: { value: number; tone: 'debit' | 'credit' }) {
  if (value === 0) return null;
  return (
    <span className={cn('font-mono tabular-nums', tone === 'debit' ? 'text-debit' : 'text-credit')}>
      {formatMoney(value)}
    </span>
  );
}

export function DayBookMock() {
  return (
    <AppWindow
      active="Reports"
      statusLeft={
        <>
          <span className="flex items-center gap-1">
            <Kbd keys="Ctrl+E" size="xs" /> Export
          </span>
          <span className="flex items-center gap-1">
            <Kbd keys="F5" size="xs" /> Date range
          </span>
          <span className="flex items-center gap-1">
            <Kbd keys="Esc" size="xs" /> Back
          </span>
        </>
      }
    >
      <div className="flex flex-col gap-2.5">
        {/* Header strip */}
        <section className="flex flex-wrap items-center gap-2.5 rounded-sm border border-border bg-surface px-3 py-2">
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Reports · Day Book
            </span>
            <span className="text-[13px] font-medium">Day Book</span>
          </div>

          <div className="flex-1" />

          {/* Date-range preset pill */}
          <span className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-bar px-2.5 text-[12px] font-mono tabular-nums">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-sans font-medium text-foreground">This month</span>
            <span className="text-muted-foreground">·</span>
            01–14 Jul 2026
            <Kbd keys="F5" size="xs" className="ml-0.5 opacity-70" />
          </span>

          {/* Export button group (PDF / Excel) */}
          <span className="inline-flex h-8 items-stretch overflow-hidden rounded-sm border border-border">
            <span className="inline-flex items-center gap-1.5 border-r border-border bg-surface px-2.5 text-[12px] font-medium text-foreground">
              <FileText className="h-3.5 w-3.5 text-debit" />
              PDF
            </span>
            <span className="inline-flex items-center gap-1.5 border-r border-border bg-surface px-2.5 text-[12px] font-medium text-foreground">
              <FileSpreadsheet className="h-3.5 w-3.5 text-credit" />
              Excel
            </span>
            <span className="inline-flex items-center bg-primary px-1.5 text-primary-foreground">
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
          </span>
        </section>

        {/* Day Book table */}
        <section className="overflow-hidden rounded-sm border border-border bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-[12.5px] tabular-nums">
              <thead className="border-b border-border bg-bar text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground">
                <tr>
                  <th className="w-[110px] px-3 py-1.5 text-left font-semibold">Vch Type</th>
                  <th className="w-[130px] px-3 py-1.5 text-left font-semibold">Vch No</th>
                  <th className="px-3 py-1.5 text-left font-semibold">Ledger</th>
                  <th className="px-3 py-1.5 text-left font-semibold">Narration</th>
                  <th className="w-[130px] px-3 py-1.5 text-right font-semibold">Debit</th>
                  <th className="w-[130px] px-3 py-1.5 text-right font-semibold">Credit</th>
                </tr>
              </thead>
              <tbody>
                {DAYS.map((day) => {
                  const t = dayTotals(day);
                  return (
                    <DayRows key={day.date} day={day} totalDr={t.dr} totalCr={t.cr} />
                  );
                })}
              </tbody>
              <tfoot className="border-t-2 border-border bg-bar">
                <tr>
                  <td colSpan={4} className="px-3 py-2 text-right text-[11.5px] font-bold uppercase tracking-wider text-foreground">
                    Grand Total
                    <span className="ml-2 font-mono text-[10.5px] font-normal tabular-nums text-muted-foreground">
                      {VOUCHER_COUNT} vouchers
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right font-mono font-bold text-debit">{formatMoney(GRAND.dr)}</td>
                  <td className="px-3 py-2 text-right font-mono font-bold text-credit">{formatMoney(GRAND.cr)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>
    </AppWindow>
  );
}

function DayRows({ day, totalDr, totalCr }: { day: Day; totalDr: number; totalCr: number }) {
  return (
    <>
      {/* Date band header */}
      <tr className="border-y border-border/70 bg-background">
        <td colSpan={6} className="px-3 py-1 text-[12px] font-semibold text-foreground">
          {day.date}
        </td>
      </tr>

      {day.vouchers.map((v) =>
        v.legs.map((leg, i) => {
          const isHead = i === 0;
          return (
            <tr key={`${v.no}-${leg.ledger}-${String(i)}`} className="border-b border-border/40">
              <td className="px-3 py-1 text-[12px] text-muted-foreground">{isHead ? v.type : ''}</td>
              <td className="px-3 py-1 font-mono text-[12px] font-medium text-primary">{isHead ? v.no : ''}</td>
              <td className="px-3 py-1">{leg.ledger}</td>
              <td className="max-w-0 truncate px-3 py-1 text-muted-foreground">{leg.narration ?? ''}</td>
              <td className="px-3 py-1 text-right">
                <Amount value={leg.dr} tone="debit" />
              </td>
              <td className="px-3 py-1 text-right">
                <Amount value={leg.cr} tone="credit" />
              </td>
            </tr>
          );
        }),
      )}

      {/* Per-date total */}
      <tr className="border-b border-border/80 bg-background/60">
        <td colSpan={4} className="px-3 py-1 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Total for {day.date}
        </td>
        <td className="px-3 py-1 text-right font-mono font-semibold text-debit">{formatMoney(totalDr)}</td>
        <td className="px-3 py-1 text-right font-mono font-semibold text-credit">{formatMoney(totalCr)}</td>
      </tr>
    </>
  );
}
