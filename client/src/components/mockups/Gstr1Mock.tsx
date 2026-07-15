import {
  Building2,
  Calendar,
  ChevronDown,
  FileJson,
  FileSpreadsheet,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppWindow, Kbd, formatMoney } from './kit';

/* Faithful static port of the desktop app's GSTR-1 screen —
 * apps/desktop/src/renderer/src/screens/reports/gstr-1/Gstr1Screen.tsx.
 * The real screen fires an Excel (Ctrl+E) / JSON (Ctrl+J) export off a
 * server-computed return; this mockup renders the return itself as the
 * section table the government GSTR-1 offline utility mirrors. Live
 * queries and export wiring are dropped; the numbers are dummy but
 * internally consistent (section rows sum to the grand-total row). */

interface Section {
  /** Portal table code — e.g. "4A,4B". */
  code: string;
  name: string;
  desc: string;
  count: number;
  /** null money columns render as "—" and stay out of the grand total. */
  taxable: number | null;
  igst: number | null;
  cgst: number | null;
  sgst: number | null;
  /** true = a real outward-supply row that feeds the grand total. */
  inTotal: boolean;
}

const SUPPLY_SECTIONS: Section[] = [
  {
    code: '4A,4B',
    name: 'B2B',
    desc: 'Supplies to registered persons',
    count: 128,
    taxable: 4_250_000,
    igst: 255_000,
    cgst: 216_750,
    sgst: 216_750,
    inTotal: true,
  },
  {
    code: '5A',
    name: 'B2C (Large)',
    desc: 'Inter-state to unregistered, invoice > ₹1L',
    count: 12,
    taxable: 685_000,
    igst: 123_300,
    cgst: 0,
    sgst: 0,
    inTotal: true,
  },
  {
    code: '7',
    name: 'B2C (Small)',
    desc: 'Consolidated retail, rate-wise',
    count: 342,
    taxable: 1_180_000,
    igst: 36_000,
    cgst: 90_600,
    sgst: 90_600,
    inTotal: true,
  },
  {
    code: '9B',
    name: 'Credit / Debit Notes (Registered)',
    desc: 'Notes against B2B invoices',
    count: 9,
    taxable: 142_000,
    igst: 5_400,
    cgst: 6_390,
    sgst: 6_390,
    inTotal: true,
  },
];

function sumBy(key: 'count' | 'taxable' | 'igst' | 'cgst' | 'sgst'): number {
  return SUPPLY_SECTIONS.reduce((acc, s) => acc + (s[key] ?? 0), 0);
}

const TOTAL_COUNT = sumBy('count');
const TOTAL_TAXABLE = sumBy('taxable');
const TOTAL_IGST = sumBy('igst');
const TOTAL_CGST = sumBy('cgst');
const TOTAL_SGST = sumBy('sgst');
const TOTAL_TAX = TOTAL_IGST + TOTAL_CGST + TOTAL_SGST;

// HSN Summary (table 12) is a cross-check restatement of the same supplies —
// it mirrors the grand total, so it is displayed but NOT summed again.
// Documents Issued (table 13) is a pure document count with no tax value.
const CROSS_CHECK_SECTIONS: Section[] = [
  {
    code: '12',
    name: 'HSN Summary',
    desc: 'Rate-wise HSN totals (cross-check)',
    count: 24,
    taxable: TOTAL_TAXABLE,
    igst: TOTAL_IGST,
    cgst: TOTAL_CGST,
    sgst: TOTAL_SGST,
    inTotal: false,
  },
  {
    code: '13',
    name: 'Documents Issued',
    desc: 'Invoice / note series ranges',
    count: 156,
    taxable: null,
    igst: null,
    cgst: null,
    sgst: null,
    inTotal: false,
  },
];

const ALL_SECTIONS = [...SUPPLY_SECTIONS, ...CROSS_CHECK_SECTIONS];

function totalTaxOf(s: Section): number | null {
  if (s.igst === null || s.cgst === null || s.sgst === null) return null;
  return s.igst + s.cgst + s.sgst;
}

function Num({ value, bold }: { value: number | null; bold?: boolean }) {
  if (value === null) {
    return <span className="text-muted-foreground/60">—</span>;
  }
  return <span className={cn('font-mono tabular-nums', bold && 'font-semibold')}>{formatMoney(value)}</span>;
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-sm border border-border bg-surface px-3 py-2">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="font-mono text-lg font-semibold tabular-nums text-foreground">{value}</span>
    </div>
  );
}

export function Gstr1Mock() {
  return (
    <AppWindow
      active="GST"
      statusLeft={
        <>
          <span className="flex items-center gap-1">
            <Kbd keys="Ctrl+E" size="xs" /> Export
          </span>
          <span className="flex items-center gap-1">
            <Kbd keys="F5" size="xs" /> Refresh
          </span>
          <span className="flex items-center gap-1">
            <Kbd keys="Esc" size="xs" /> Back
          </span>
        </>
      }
    >
      <div className="flex flex-col gap-2.5">
        {/* Header bar */}
        <div className="flex flex-wrap items-center gap-2.5 rounded-sm border border-border bg-surface px-3 py-2">
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Reports · GST
            </span>
            <span className="flex items-center gap-1.5 text-[14px] font-semibold">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              GSTR-1 · Outward Supplies
            </span>
          </div>

          <div className="flex-1" />

          {/* Return period selector */}
          <div className="inline-flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> Period
            </span>
            <span className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-bar px-2 font-mono text-[12.5px] font-medium">
              Jun 2026
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </span>
          </div>

          {/* Company GSTIN */}
          <span className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-bar px-2 font-mono text-[12px] text-muted-foreground">
            <Building2 className="h-3.5 w-3.5" />
            24ABCDE1234F1Z5
          </span>

          {/* Export actions */}
          <span className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-bar px-2.5 text-[12px] font-medium">
            <FileJson className="h-3.5 w-3.5 text-muted-foreground" />
            Generate JSON
            <Kbd keys="Ctrl+J" size="xs" className="opacity-70" />
          </span>
          <span className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-primary px-2.5 text-[12px] font-semibold text-primary-foreground">
            <FileSpreadsheet className="h-3.5 w-3.5" />
            Export to Excel
            <Kbd keys="Ctrl+E" size="xs" className="opacity-80" />
          </span>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-2.5">
          <SummaryTile label="Total Invoices" value={TOTAL_COUNT.toLocaleString('en-IN')} />
          <SummaryTile label="Total Taxable Value" value={`₹ ${formatMoney(TOTAL_TAXABLE)}`} />
          <SummaryTile label="Total Tax" value={`₹ ${formatMoney(TOTAL_TAX)}`} />
        </div>

        {/* Sections table */}
        <div className="overflow-hidden rounded-sm border border-border bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-[12px]">
              <thead>
                <tr className="border-b border-border bg-bar text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-3 py-2 text-left">Section</th>
                  <th className="px-3 py-2 text-left">Description</th>
                  <th className="bg-primary/10 px-3 py-2 text-right">Records</th>
                  <th className="px-3 py-2 text-right">Taxable Value</th>
                  <th className="px-3 py-2 text-right">IGST</th>
                  <th className="px-3 py-2 text-right">CGST</th>
                  <th className="px-3 py-2 text-right">SGST/UTGST</th>
                  <th className="px-3 py-2 text-right">Total Tax</th>
                </tr>
              </thead>
              <tbody>
                {ALL_SECTIONS.map((s) => (
                  <tr key={s.code} className="border-t border-border/50 first:border-t-0">
                    <td className="whitespace-nowrap px-3 py-2">
                      <span className="mr-1.5 font-semibold text-foreground">{s.name}</span>
                      <span className="rounded-sm border border-border bg-bar px-1 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground">
                        {s.code}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{s.desc}</td>
                    <td className="bg-primary/10 px-3 py-2 text-right font-mono font-medium tabular-nums text-primary">
                      {s.count.toLocaleString('en-IN')}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <Num value={s.taxable} />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <Num value={s.igst} />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <Num value={s.cgst} />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <Num value={s.sgst} />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <Num value={totalTaxOf(s)} bold />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border bg-bar font-semibold">
                  <td className="px-3 py-2" colSpan={2}>
                    Grand Total · outward supplies
                  </td>
                  <td className="bg-primary/10 px-3 py-2 text-right font-mono tabular-nums text-primary">
                    {TOTAL_COUNT.toLocaleString('en-IN')}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Num value={TOTAL_TAXABLE} bold />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Num value={TOTAL_IGST} bold />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Num value={TOTAL_CGST} bold />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Num value={TOTAL_SGST} bold />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Num value={TOTAL_TAX} bold />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Footer note */}
        <p className="px-1 text-[11px] text-muted-foreground">
          Values match the government GSTR-1 offline-utility layout. HSN Summary (12) and Documents Issued (13) are
          cross-checks and are not re-added to the grand total.
        </p>
      </div>
    </AppWindow>
  );
}
