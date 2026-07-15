import type { ReleaseNote } from '@/lib/content';

/**
 * Hand-maintained changelog for the Acronix Books desktop app. Newest version
 * first — `getReleases()` re-exports this list verbatim. Keep the top entry in
 * sync with `apps/desktop/package.json` and `src/lib/site.ts` (`currentVersion`).
 *
 * Only ship what has actually shipped. Modules that live in the menu but are
 * disabled (Banking, Sale/Purchase Orders, Quotation, GRN, Returns) belong in
 * the roadmap on the changelog page, never in a release section.
 */
export const releases: ReleaseNote[] = [
  {
    version: '0.1.0',
    date: '2026-06-24',
    summary:
      'First public early-access release. A complete offline-first accounting and ERP workspace for Indian businesses of every size — multi-company, GST-ready, keyboard-driven, and encrypted at rest from the very first voucher.',
    sections: [
      {
        title: 'Accounting',
        items: [
          'Multi-company books with per-company financial years (April–March).',
          'Merged ledger master — one row for parties, bank, cash, tax and general heads — with hierarchical account groups.',
          'Ten voucher types: sales, purchase, receipt, payment, contra, journal, credit note, debit note, delivery challan and stock journal — all posting through one shared engine.',
          'Configurable voucher series with gap-free numbering and bill-by-bill outstanding tracking.',
        ],
      },
      {
        title: 'GST',
        items: [
          'HSN/SAC codes and tax categories applied automatically on every line.',
          'Sales, purchase, input-tax and output-tax registers plus an HSN summary.',
          'One-click GSTR-1 and GSTR-3B generation, exported to Excel in the government offline-utility layout.',
          'E-Invoice (IRN) and E-Way Bill generation built in.',
        ],
      },
      {
        title: 'Inventory',
        items: [
          'Items, item groups, units of measure and tax categories.',
          'Multiple warehouses with warehouse-wise stock balances.',
          'Stock journals, delivery challans and job-work rate masters for manufacturers and textile job work.',
          'Both Weighted-Average and FIFO valuation, per-company default with per-item override.',
        ],
      },
      {
        title: 'Reports',
        items: [
          'Day book, ledger statement and trial balance.',
          'Profit & loss and balance sheet with drill-down by account group.',
          'Outstandings (receivables/payables), cash book, cash flow and an IFRS cash-flow statement.',
          'Stock summary, stock ledger, party stock and job-work register.',
          'Export any report to PDF or Excel; virtualized lists stay responsive past 50,000 vouchers per year.',
        ],
      },
      {
        title: 'Security',
        items: [
          'SQLCipher AES-256 encryption of the entire book at rest, in one encrypted file.',
          'Envelope key vault: per-user key slots, a scrypt-derived KEK and a one-time printable recovery code.',
          'Encrypted login and unlock, idle auto-lock, and the key zeroed from memory on lock or quit.',
          'Tamper-evident audit hash chain, capability-based RBAC (five roles) and audit tools — login log, voucher audit and period lock.',
        ],
      },
      {
        title: 'Cloud sync',
        items: [
          'Optional full-book cloud sync with a per-client isolated, encrypted backup.',
          'Fresh-device restore — sign in on a new machine and pull your entire book down.',
          'Email-OTP verification at new-device enrolment; fully offline-first, sync only when you choose.',
        ],
      },
      {
        title: 'Platform',
        items: [
          'Per-user Windows installer — no administrator rights required.',
          'Built-in auto-update from the release feed, with a manual check (Ctrl+U).',
          'Keyboard-first throughout: F-key module jumps, a Ctrl+K command palette and F10 to save.',
          'Light and dark themes.',
        ],
      },
    ],
  },
  {
    version: '0.0.3',
    date: '2026-05-12',
    summary:
      'Final closed-beta build before early access. Focused on GST return accuracy and encrypted backup reliability.',
    sections: [
      {
        title: 'Added',
        items: [
          'GSTR-3B summary export alongside the existing GSTR-1 export.',
          'Encrypted backups via SQLite VACUUM INTO, restorable on the same or a new device.',
        ],
      },
      {
        title: 'Fixed',
        items: [
          'Rounding drift on inter-state invoices where IGST split across multiple HSN lines.',
          'Credit notes now correctly reverse the original invoice tax in GSTR-1.',
        ],
      },
    ],
  },
  {
    version: '0.0.2',
    date: '2026-04-03',
    summary:
      'Early closed-beta build. Introduced inventory and the first GST return export.',
    sections: [
      {
        title: 'Added',
        items: [
          'Inventory module: items, units, stock journals and warehouses.',
          'First GSTR-1 generation and Excel export.',
          'Idle auto-lock and the tamper-evident audit hash chain.',
        ],
      },
    ],
  },
];
