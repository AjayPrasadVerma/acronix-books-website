import { Printer, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppWindow, Kbd, formatMoney } from './kit';

/* Faithful static port of the desktop app's Sale (tax invoice) entry —
 * apps/desktop/src/renderer/src/screens/vouchers/sale/* driven by the generic
 * VoucherForm (voucher-form/*). Interactivity (RHF state, live tax recompute,
 * IPC queries) is dropped; the JSX + classes mirror the real Header / Section /
 * Grid / Field / ItemsTable / TotalsRail / Footer, rendered inside `.acx-app`
 * so it uses the app theme and flips with the site's light/dark. */

// ── Header fields (mirrors VoucherForm's Section "Header" Grid/Field) ──

interface HeaderField {
  label: React.ReactNode;
  value: string;
  hint?: string;
  required?: boolean;
}

const HEADER_FIELDS: HeaderField[] = [
  {
    label: (
      <>
        <u>C</u>ustomer
      </>
    ),
    value: 'Ramdev Textiles',
    hint: 'GSTIN 24ABCDE1234F1Z5',
    required: true,
  },
  {
    label: (
      <>
        Place <u>o</u>f Supply
      </>
    ),
    value: 'Gujarat (24)',
  },
  {
    label: (
      <>
        <u>S</u>eries
      </>
    ),
    value: 'Sale · SI',
    required: true,
  },
  {
    label: (
      <>
        Date <span className="text-muted-foreground/60 text-[10px]">F2</span>
      </>
    ),
    value: '14 Jul 2026',
    required: true,
  },
  {
    label: (
      <>
        Customer PO No <span className="text-muted-foreground/60 text-[10px]">Alt+R</span>
      </>
    ),
    value: 'PO-2291',
  },
  { label: 'Customer PO Date', value: '11 Jul 2026' },
  { label: 'Due Date', value: '13 Aug 2026' },
];

// ── Line items (mirrors ItemsTable columns) ──────────────────────────────

interface Row {
  name: string;
  hsn: string;
  qty: number;
  unit: string;
  rate: number;
  discPct: number;
  taxable: number;
  gstPct: number;
}

/* Textile invoice lines. `taxable` is authoritative; CGST/SGST and the row
 * amount are derived from it so every column and the footer add up exactly. */
const ROWS: Row[] = [
  { name: 'Cotton Fabric 44"', hsn: '5208', qty: 1200, unit: 'MTR', rate: 82.5, discPct: 0, taxable: 99000, gstPct: 5 },
  { name: 'Poly Viscose Suiting', hsn: '5407', qty: 800, unit: 'MTR', rate: 145, discPct: 5, taxable: 110200, gstPct: 5 },
  { name: 'Cotton Yarn 30s', hsn: '5205', qty: 500, unit: 'KG', rate: 220, discPct: 0, taxable: 110000, gstPct: 5 },
  { name: 'Denim 3/1 Twill', hsn: '5209', qty: 600, unit: 'MTR', rate: 165, discPct: 0, taxable: 99000, gstPct: 5 },
  { name: 'Silk Blend Dupion', hsn: '5007', qty: 300, unit: 'MTR', rate: 310, discPct: 0, taxable: 93000, gstPct: 5 },
  { name: 'Embroidery Job Work', hsn: '998821', qty: 400, unit: 'PCS', rate: 45, discPct: 0, taxable: 18000, gstPct: 5 },
];

const halfGst = (r: Row): number => (r.taxable * r.gstPct) / 200;
const rowAmount = (r: Row): number => r.taxable + halfGst(r) * 2;

const TOTAL_TAXABLE = ROWS.reduce((s, r) => s + r.taxable, 0);
const TOTAL_CGST = ROWS.reduce((s, r) => s + halfGst(r), 0);
const TOTAL_SGST = TOTAL_CGST;
const TOTAL_TAX = TOTAL_CGST + TOTAL_SGST;
const ROUND_OFF = 0;
const INVOICE_TOTAL = TOTAL_TAXABLE + TOTAL_TAX + ROUND_OFF;

// ── Component ─────────────────────────────────────────────────────────────

export function VoucherEntryMock() {
  return (
    <AppWindow
      active="Vouchers"
      company="Surat Textile Mills"
      statusLeft={
        <>
          <span className="flex items-center gap-1">
            <Kbd keys="F10" size="xs" /> Save
          </span>
          <span className="flex items-center gap-1">
            <Kbd keys="Alt+N" size="xs" /> Add row
          </span>
          <span className="flex items-center gap-1">
            <Kbd keys="Esc" size="xs" /> Cancel
          </span>
        </>
      }
    >
      <div className="overflow-hidden rounded-sm border border-border bg-surface">
        {/* Screen header — voucher type + no. + intra-state tax-mode badge */}
        <div className="flex items-center gap-3 border-b border-border bg-bar px-3 py-2">
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Vouchers · Sale Invoices
            </span>
            <span className="truncate text-[13px] font-medium">Post Sale Invoice · No. SI-1042</span>
          </div>
          <div className="flex-1" />
          <span className="rounded-sm bg-credit/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-credit">
            Intra-state (CGST+SGST)
          </span>
          <span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:flex">
            <Kbd keys="Enter" size="xs" /> next · <Kbd keys="F10" size="xs" /> post
          </span>
        </div>

        {/* 2-column body — form on the left, totals rail on the right */}
        <div className="flex">
          <div className="min-w-0 flex-1 space-y-3 p-3">
            {/* Header fields */}
            <section className="space-y-2">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Header
              </div>
              <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                {HEADER_FIELDS.map((f, i) => (
                  <FieldBox key={i} field={f} />
                ))}
              </div>
            </section>

            {/* Items grid */}
            <section className="space-y-2">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Items
              </div>
              <div className="overflow-x-auto rounded-sm border border-border">
                <table className="w-full min-w-[720px] text-[12px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-muted-foreground">
                      <Th className="w-7">#</Th>
                      <Th className="min-w-[170px]">Item</Th>
                      <Th className="w-20">HSN/SAC</Th>
                      <ThNum className="w-20">Qty</ThNum>
                      <Th className="w-12">Unit</Th>
                      <ThNum className="w-20">Rate</ThNum>
                      <ThNum className="w-14">Disc%</ThNum>
                      <ThNum className="w-24">Taxable</ThNum>
                      <ThNum className="w-14">GST%</ThNum>
                      <ThNum className="w-28">Amount</ThNum>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((r, i) => (
                      <tr key={r.name} className="border-b border-border/50 last:border-b-0">
                        <td className="px-2 py-1.5 text-center font-mono tabular-nums text-muted-foreground">
                          {i + 1}
                        </td>
                        <td className="truncate px-2 py-1.5 font-medium">{r.name}</td>
                        <td className="px-2 py-1.5 font-mono tabular-nums text-muted-foreground">{r.hsn}</td>
                        <NumCell>{formatMoney(r.qty)}</NumCell>
                        <td className="px-2 py-1.5 text-muted-foreground">{r.unit}</td>
                        <NumCell>{formatMoney(r.rate)}</NumCell>
                        <NumCell muted>{r.discPct ? `${r.discPct}%` : '—'}</NumCell>
                        <NumCell>{formatMoney(r.taxable)}</NumCell>
                        <NumCell muted>{r.gstPct}%</NumCell>
                        <NumCell bold>{formatMoney(rowAmount(r))}</NumCell>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <span className="inline-flex h-6 items-center gap-1.5 rounded-sm border border-border px-2 text-[11px] text-muted-foreground">
                Add row <Kbd keys="Alt+N" size="xs" className="opacity-80" />
              </span>
            </section>

            {/* Narration */}
            <section className="space-y-1">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                <u>N</u>arration
              </div>
              <div className="flex h-8 items-center rounded-sm border border-input-border bg-input px-3 text-[12px] text-foreground/80">
                Against PO-2291 — 6 line grey cotton &amp; blends, dispatched via Gujarat Transport Co.
              </div>
            </section>
          </div>

          {/* Totals rail — GST breakup (mirrors TotalsRail) */}
          <aside className="w-52 shrink-0 space-y-0.5 border-l border-border bg-muted/20 px-3 py-3 font-mono text-[12px] tabular-nums">
            <RailHeader>Totals</RailHeader>
            <RailRow label="Taxable value" value={formatMoney(TOTAL_TAXABLE)} />
            <RailRow label="CGST @ 2.5%" value={formatMoney(TOTAL_CGST)} />
            <RailRow label="SGST @ 2.5%" value={formatMoney(TOTAL_SGST)} />
            <RailRow label="IGST" value={formatMoney(0)} muted />
            <RailRow label="Total tax" value={formatMoney(TOTAL_TAX)} />
            <RailRow label="Round Off" value={formatMoney(ROUND_OFF)} muted />
            <div className="my-1 h-px bg-border" />
            <div className="flex items-center justify-between gap-2">
              <span className="font-sans text-[11.5px] font-semibold">Invoice Total</span>
              <span className="text-[15px] font-semibold text-foreground">₹{formatMoney(INVOICE_TOTAL)}</span>
            </div>
            <p className="pt-2 font-sans text-[10px] leading-snug text-muted-foreground">
              Intra-state supply (Gujarat → Gujarat): CGST + SGST apply. IGST applies on inter-state
              invoices.
            </p>

            <div className="h-3" />
            <RailHeader>Party Outstanding</RailHeader>
            <RailRow label="Before" value="Dr ₹1,84,300.00" />
            <RailRow label="Invoice" value={formatMoney(INVOICE_TOTAL)} muted />
            <div className="my-1 h-px bg-border" />
            <div className="flex items-center justify-between gap-2">
              <span className="font-sans text-[11.5px]">After</span>
              <span className="font-semibold text-foreground">Dr ₹7,39,960.00</span>
            </div>
          </aside>
        </div>

        {/* Footer action row */}
        <div className="flex items-center justify-between gap-3 border-t border-border bg-bar px-3 py-2">
          <span className="inline-flex h-8 items-center gap-2 rounded-sm border border-border px-3 text-[12px] text-muted-foreground">
            Cancel <Kbd keys="Esc" size="xs" className="opacity-90" />
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 items-center gap-2 rounded-sm border border-border bg-surface px-3 text-[12px] font-medium">
              <Printer className="h-3.5 w-3.5 text-primary" />
              Save &amp; Print <Kbd keys="Ctrl+Shift+P" size="xs" className="opacity-80" />
            </span>
            <span className="inline-flex h-8 items-center gap-2 rounded-sm bg-primary px-3 text-[12px] font-medium text-primary-foreground">
              <Save className="h-3.5 w-3.5" />
              Post Sale Invoice <Kbd keys="F10" size="xs" className="opacity-90" />
            </span>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

// ── Small presentational helpers ──────────────────────────────────────────

function FieldBox({ field }: { field: HeaderField }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {field.label}
        {field.required && <span className="text-destructive">*</span>}
      </div>
      <div className="flex h-8 items-center rounded-sm border border-input-border bg-input px-2.5 text-[12.5px] text-foreground">
        <span className="truncate">{field.value}</span>
      </div>
      {field.hint && <div className="truncate font-mono text-[10px] text-muted-foreground">{field.hint}</div>}
    </div>
  );
}

function Th({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <th className={cn('px-2 py-1.5 text-left font-medium', className)}>{children}</th>;
}
function ThNum({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <th className={cn('px-2 py-1.5 text-right font-medium', className)}>{children}</th>;
}

function NumCell({ children, bold, muted }: { children: React.ReactNode; bold?: boolean; muted?: boolean }) {
  return (
    <td
      className={cn(
        'px-2 py-1.5 text-right font-mono tabular-nums',
        muted ? 'text-muted-foreground' : bold ? 'font-semibold text-foreground' : 'text-foreground/80',
      )}
    >
      {children}
    </td>
  );
}

function RailHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 font-sans text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
      {children}
    </div>
  );
}

function RailRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={cn('flex items-center justify-between gap-2', muted && 'text-muted-foreground')}>
      <span className="font-sans text-[11.5px]">{label}</span>
      <span>{value}</span>
    </div>
  );
}
