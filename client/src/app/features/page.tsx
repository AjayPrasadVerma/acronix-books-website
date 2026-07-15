import type { Metadata } from 'next';
import {
  FileText,
  Receipt,
  Package,
  BarChart3,
  Lock,
  RefreshCw,
  Download,
  BookOpen,
  Zap,
  WifiOff,
  ShieldCheck,
  IndianRupee,
  CalendarRange,
  Building2,
  Keyboard,
  Gauge,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge, Eyebrow, SectionHeading } from '@/components/ui/Primitives';
import { ButtonLink } from '@/components/ui/Button';
import { Faq, type FaqItem } from '@/components/site/Faq';
import { FeatureRow, type FeatureRowProps } from '@/components/features/FeatureRow';
import {
  InvoicingVisual,
  GstVisual,
  InventoryVisual,
  ReportsVisual,
  SecurityVisual,
  SyncVisual,
} from '@/components/features/visuals';
import {
  LedgerIllustration,
  InvoiceIllustration,
  ReportsIllustration,
  SecurityIllustration,
  OfflineSyncIllustration,
} from '@/components/illustrations/Illustrations';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'A detailed tour of Acronix Books — accounting & vouchers, a full GST suite (GSTR-1, GSTR-3B, e-invoice, e-way bill, tax registers), inventory & job-work, PDF/Excel reports, AES-256 security, and optional encrypted cloud sync. An offline-first ERP built for Indian businesses of every size.',
  alternates: { canonical: '/features/' },
};

/* ------------------------------------------------------------------ */
/* The four product pillars, framed once up top.                       */
/* ------------------------------------------------------------------ */

interface Pillar {
  icon: typeof Zap;
  title: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    icon: Zap,
    title: 'Fast',
    body: 'Common actions land in under 200ms and hot queries in under 50ms. Lists are virtualized and shortcuts fire in a single frame, so data entry keeps pace with your typing — even at 50,000+ vouchers a year.',
  },
  {
    icon: WifiOff,
    title: 'Offline-first',
    body: 'Your books live in a local database on your own machine. Every screen works with the internet unplugged; the cloud is an option you switch on, never a dependency you wait for.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure',
    body: 'The database is encrypted at rest with SQLCipher AES-256, unlocked through a per-user key vault, and protected by role-based access, idle auto-lock, and a tamper-evident audit trail.',
  },
  {
    icon: Receipt,
    title: 'GST-ready',
    body: 'HSN/SAC codes and tax categories are part of invoicing from the first entry, so the tax registers, HSN summary, GSTR-1 and GSTR-3B, e-invoice and e-way bill all fall out of clean data — exported in the government offline-utility layout.',
  },
];

/* ------------------------------------------------------------------ */
/* The six feature areas, each a thorough, self-contained explainer.   */
/* ------------------------------------------------------------------ */

const rows: FeatureRowProps[] = [
  {
    id: 'invoicing',
    icon: FileText,
    eyebrow: 'Accounting & Vouchers',
    title: 'A complete voucher system, done right',
    lede: 'Acronix Books ships ten double-entry voucher types — Sale, Purchase, Receipt, Payment, Contra, Journal, Credit Note, Debit Note, Delivery Challan and Stock Journal — all driven by one shared voucher form and a single posting engine. Because every voucher posts to the same canonical ledger, the trial balance, P&L and balance sheet always tie out, and each entry lands in the correct financial year automatically.',
    steps: [
      {
        title: 'Set up your company and masters',
        body: 'Create one or more companies, then build your chart of accounts. A merged ledger master holds parties, banks, cash, tax and general accounts in one place, grouped under account groups.',
      },
      {
        title: 'Configure voucher series',
        body: 'Define numbering series per voucher type so sales, payment, journal and note numbers stay sequential, gap-free and audit-friendly across the year.',
      },
      {
        title: 'Enter vouchers at keyboard speed',
        body: 'Post any of the ten voucher types through one consistent, keyboard-first form with ledger auto-complete — no mouse required, and F10 saves in a single keystroke.',
      },
      {
        title: 'Track bills and review the day book',
        body: 'Bill-by-bill tracking ties receipts and payments back to specific invoices, and the day book gives a running, filterable view of every posting as it happens.',
      },
    ],
    capabilities: [
      {
        heading: 'The ten voucher types',
        items: [
          'Sale & purchase',
          'Receipt & payment',
          'Contra & journal',
          'Credit & debit notes',
          'Delivery challan & stock journal',
        ],
      },
      {
        heading: 'One engine, one ledger',
        items: [
          'Single generic voucher form',
          'Shared double-entry posting engine',
          'Merged ledger master',
          'Configurable voucher series',
        ],
      },
      {
        heading: 'Masters & scale',
        items: [
          'Ledgers & account groups',
          'Bill-by-bill outstanding tracking',
          'Multiple companies in one install',
          '50,000+ vouchers per FY, no slowdown',
        ],
      },
    ],
    audience:
      'a distributor running several firms who wants one place to post the full day book, reconcile bills, and keep each company’s financial year cleanly separated.',
    visual: <InvoicingVisual />,
    illustration: <LedgerIllustration className="h-40 w-full max-w-[240px]" />,
  },
  {
    id: 'gst',
    icon: Receipt,
    eyebrow: 'GST Compliance',
    title: 'A full GST suite, not just a returns button',
    lede: 'GST is wired into invoicing from the very first voucher, not bolted on at filing time. A dedicated GST module gives you the tax registers, an HSN summary, both monthly returns, and e-invoice and e-way bill generation — all computed straight from the same clean data, so month-end reconciliation becomes a review instead of a rebuild.',
    steps: [
      {
        title: 'Classify items once',
        body: 'Assign HSN/SAC codes and tax categories to your items and ledgers so the correct GST rate — CGST + SGST intra-state or IGST inter-state — is applied automatically on every invoice.',
      },
      {
        title: 'Review the tax registers',
        body: 'The Sales, Purchase, Output Tax and Input Tax registers, plus a rate-wise HSN summary, give you an auditable trail behind every figure before you file.',
      },
      {
        title: 'Generate GSTR-1 and GSTR-3B',
        body: 'Generate GSTR-1 (outward supplies) and GSTR-3B (summary) for the period and export each to Excel in the government offline-utility layout, ready for the portal.',
      },
      {
        title: 'Produce e-invoices and e-way bills',
        body: 'Prepare e-invoice and e-way bill data from the same voucher, so IRN and transport documents come from your books rather than a separate re-entry.',
      },
    ],
    capabilities: [
      {
        heading: 'GST-aware data entry',
        items: [
          'HSN & SAC codes',
          'Tax categories per item/ledger',
          'CGST/SGST vs IGST automatically',
          'GST-ready invoicing built in',
        ],
      },
      {
        heading: 'Registers & summaries',
        items: [
          'Sales & purchase registers',
          'Output & input tax registers',
          'Rate-wise HSN summary',
          'Computed locally from your books',
        ],
      },
      {
        heading: 'Returns',
        items: [
          'GSTR-1 — Excel export',
          'GSTR-3B — Excel export',
          'Offline-utility layout',
          'Monthly or quarterly periods',
        ],
      },
      {
        heading: 'E-documents',
        items: [
          'E-invoice generation',
          'E-way bill generation',
          'From the same voucher data',
          'Hand off cleanly to your CA',
        ],
      },
    ],
    audience:
      'an owner-operator or their accountant who files GSTR-1 and GSTR-3B every cycle, raises e-invoices and e-way bills, and wants every one of them to fall out of day-to-day invoicing instead of a last-minute spreadsheet rebuild.',
    visual: <GstVisual />,
    illustration: <InvoiceIllustration className="h-40 w-full max-w-[220px]" />,
    reverse: true,
  },
  {
    id: 'inventory',
    icon: Package,
    eyebrow: 'Inventory & Job-work',
    title: 'Stock control tuned for traders & manufacturers',
    lede: 'Track exactly what you hold, where you hold it, what it is worth, and what has gone out for outside processing. Acronix Books models items, item groups, units, tax categories and multiple warehouses, values stock by weighted-average or FIFO, and adds the delivery-challan and job-work handling that Surat textile traders and small manufacturers depend on to keep tabs on material sitting with a job worker.',
    steps: [
      {
        title: 'Define items, groups and units',
        body: 'Build your item master with item groups and units of measure (metres, cones, kg, pieces) that match how you actually buy and sell.',
      },
      {
        title: 'Place stock across warehouses',
        body: 'Hold inventory in more than one warehouse or location and see quantities per site, so branch and godown stock never blur together.',
      },
      {
        title: 'Move stock with challans and journals',
        body: 'Issue delivery challans for goods leaving your premises and record stock journals for internal transfers, adjustments, and production movements.',
      },
      {
        title: 'Rate and reconcile job-work',
        body: 'Set job-work rates for outsourced processing and track material sent out and received back, so nothing goes missing at the job worker.',
      },
    ],
    capabilities: [
      {
        heading: 'Item masters',
        items: [
          'Items & item groups',
          'Units of measure',
          'Tax categories',
          'Multi-warehouse stock',
        ],
      },
      {
        heading: 'Movement & valuation',
        items: [
          'Delivery challans & stock journals',
          'Inter-warehouse transfers',
          'Weighted-average & FIFO valuation',
          'Stock summary, ledger & party stock',
        ],
      },
      {
        heading: 'Job-work',
        items: [
          'Job-work rate masters',
          'Material sent for processing',
          'Job Work Register',
          'Built for textile job work',
        ],
      },
    ],
    audience:
      'a textile trader or job-work manufacturer who sends greige fabric or yarn out for dyeing and finishing and needs a clear ledger of what left, at what rate, and what came back.',
    visual: <InventoryVisual />,
  },
  {
    id: 'reports',
    icon: BarChart3,
    eyebrow: 'Reports & Exports',
    title: 'Answers in a keystroke, exports in a click',
    lede: 'Every report is computed locally from your own data, so it renders the instant you ask for it — no cloud round-trip, no spinner. Drill from the Profit & Loss or Balance Sheet straight into the ledger behind a figure, scroll a full year on a virtualized list without a stutter, then hand off a polished PDF or a working Excel file.',
    steps: [
      {
        title: 'Pick a report',
        body: 'Open the day book, trial balance, a ledger statement, the P&L, balance sheet, cash flow, outstandings or any stock report — all driven from the keyboard.',
      },
      {
        title: 'Scope it to a period',
        body: 'Filter by company, branch, and date range within the financial year. Results recompute locally in milliseconds.',
      },
      {
        title: 'Drill into the detail',
        body: 'Move from a P&L or balance-sheet group down to the individual vouchers behind it on virtualized lists that stay smooth across tens of thousands of rows.',
      },
      {
        title: 'Export and share',
        body: 'Send any report to PDF for a clean printed copy, or Excel for further working and sharing with your accountant.',
      },
    ],
    capabilities: [
      {
        heading: 'Ledgers & day book',
        items: [
          'Day Book',
          'Ledger Statement',
          'Trial Balance',
          'Cash Book',
        ],
      },
      {
        heading: 'Financial statements',
        items: [
          'Profit & Loss (drill-down)',
          'Balance Sheet (drill-down)',
          'Cash Flow',
          'Cash Flow Statement (IFRS)',
        ],
      },
      {
        heading: 'Outstandings & stock',
        items: [
          'Outstandings (receivables & payables)',
          'Stock Summary & Stock Ledger',
          'Party Stock',
          'Job Work Register',
        ],
      },
      {
        heading: 'Speed & export',
        items: [
          'Sub-50ms hot queries, computed locally',
          'Virtualized, non-stuttering lists',
          'Export to PDF & Excel',
          'Period & company scoping',
        ],
      },
    ],
    audience:
      'a retailer or accountant who wants a trial balance or party ledger on demand at the counter or the desk, and a print-ready PDF or Excel to share in seconds.',
    visual: <ReportsVisual />,
    illustration: <ReportsIllustration className="h-40 w-full max-w-[240px]" />,
    reverse: true,
  },
  {
    id: 'security',
    icon: Lock,
    eyebrow: 'Security & Encryption',
    title: 'Bank-grade security, on your own machine',
    lede: 'Your books never leave your control, and on disk they are unreadable without your credentials. Acronix Books encrypts the entire database with SQLCipher AES-256 and guards the key with a real envelope key-management system — layered with access control, idle auto-lock, and an audit trail you can trust.',
    steps: [
      {
        title: 'Encrypt the database at rest',
        body: 'The whole book is stored with SQLCipher AES-256 encryption. Without the key, the file on disk is meaningless bytes.',
      },
      {
        title: 'Guard the key in an envelope vault',
        body: 'A scrypt-derived key-encryption key (KEK) protects per-user key slots, so the encryption key is never stored in the clear — and a recovery code lets you back in.',
      },
      {
        title: 'Unlock and control access',
        body: 'Encrypted login and unlock gate every session; five role levels — Viewer, Operator, Accountant, Admin and Owner — scope what each user can do; and idle auto-lock closes the book when you step away.',
      },
      {
        title: 'Prove integrity with an audit chain',
        body: 'A tamper-evident audit hash chain, a login log and voucher audit record every change so alteration is detectable, period lock freezes filed periods, and encrypted .acxb backups (VACUUM INTO) stay protected outside the app.',
      },
    ],
    capabilities: [
      {
        heading: 'Encryption at rest',
        items: [
          'SQLCipher AES-256',
          'Envelope key vault',
          'Per-user key slots',
          'scrypt-derived KEK',
        ],
      },
      {
        heading: 'Access control',
        items: [
          'Encrypted login & unlock',
          'One-time recovery code',
          'Idle auto-lock',
          'RBAC — Viewer to Owner',
        ],
      },
      {
        heading: 'Integrity & backup',
        items: [
          'Tamper-evident audit hash chain',
          'Login log & voucher audit',
          'Period lock',
          'Encrypted .acxb backups',
        ],
      },
    ],
    audience:
      'any business that treats its financial records as sensitive — and every firm sharing one machine across staff who each need their own login and permission level.',
    visual: <SecurityVisual />,
    illustration: <SecurityIllustration className="h-40 w-full max-w-[220px]" />,
  },
  {
    id: 'sync',
    icon: RefreshCw,
    eyebrow: 'Cloud Sync & Backup',
    title: 'Optional cloud sync — offline-first always',
    lede: 'Switch on full-book cloud sync when you want an off-site safety net and access across devices, without ever giving up local-first speed. Each client gets its own isolated, encrypted cloud backup, and a fresh device can be restored to a complete book in minutes — but the app remains fully usable with the internet switched off.',
    steps: [
      {
        title: 'Work offline by default',
        body: 'Everything runs against your local database first. Sync is opt-in; nothing is sent anywhere until you choose to enable it.',
      },
      {
        title: 'Enable full-book sync',
        body: 'Turn on sync to push your complete book to an isolated, encrypted cloud backup that only your client can read.',
      },
      {
        title: 'Sync on your terms',
        body: 'The app keeps working offline and reconciles with the cloud when you have a connection — the cloud is a convenience, not a bottleneck.',
      },
      {
        title: 'Restore to a fresh device',
        body: 'On a new machine, sign in, confirm the emailed one-time code, and restore the full book from your encrypted backup to be up and running in minutes.',
      },
    ],
    capabilities: [
      {
        heading: 'Sync model',
        items: [
          'Full-book cloud sync',
          'Entirely optional & opt-in',
          'Offline-first by design',
          'Orthogonal to local unlock',
        ],
      },
      {
        heading: 'Isolation & encryption',
        items: [
          'Per-account isolated backup',
          'Encrypted in the cloud',
          'No shared tenancy of your data',
          'Email-OTP at new-device enrolment',
        ],
      },
      {
        heading: 'Recovery',
        items: [
          'Fresh-device restore',
          'Complete book, not a fragment',
          'Running again in minutes',
          'Off-site safety net',
        ],
      },
    ],
    audience:
      'a growing business that wants an off-site backup and the freedom to move to a new PC without losing a single voucher — while still working at full speed on days the internet is down.',
    visual: <SyncVisual />,
    illustration: <OfflineSyncIllustration className="h-40 w-full max-w-[240px]" />,
    reverse: true,
  },
];

/* ------------------------------------------------------------------ */
/* "Built for how Indian businesses actually work" facts.              */
/* ------------------------------------------------------------------ */

interface IndiaFact {
  icon: typeof IndianRupee;
  title: string;
  body: string;
}

const indiaFacts: IndiaFact[] = [
  {
    icon: IndianRupee,
    title: '₹ and Indian number formatting',
    body: 'Amounts read in the lakh–crore grouping you expect, with the rupee everywhere — no re-formatting foreign templates.',
  },
  {
    icon: CalendarRange,
    title: 'Financial year Apr–Mar',
    body: 'The financial year runs April to March by default, so opening balances, carry-forward, and year-end all line up with Indian practice.',
  },
  {
    icon: Receipt,
    title: 'The GST return cycle',
    body: 'HSN/SAC, tax categories, the tax registers, GSTR-1, GSTR-3B, e-invoice and e-way bill are built around the return cycle you file, not a generic tax module.',
  },
  {
    icon: Building2,
    title: 'Multi-company & branch',
    body: 'Run several firms and branches from one install, each with its own books, series, and financial years kept cleanly apart.',
  },
  {
    icon: Package,
    title: 'Job-work reality',
    body: 'Delivery challans and job-work rates match how textile and manufacturing businesses actually send material out and get it back.',
  },
  {
    icon: Keyboard,
    title: 'Keyboard-first data entry',
    body: 'Designed for high-volume typists: every action has a shortcut so an experienced operator never reaches for the mouse.',
  },
];

/* ------------------------------------------------------------------ */
/* FAQ.                                                                */
/* ------------------------------------------------------------------ */

const faqs: FaqItem[] = [
  {
    question: 'Is my data safe, and where is it stored?',
    answer:
      'Your books are stored in a local database on your own computer, encrypted at rest with SQLCipher AES-256. The encryption key is protected by an envelope key vault: a scrypt-derived key-encryption key wraps per-user key slots, and a recovery code lets you regain access if needed.\n\nAccess is gated by encrypted login and unlock, role-based permissions, and idle auto-lock, and a tamper-evident audit hash chain makes changes detectable. You hold the keys — nobody can read the file on disk without your credentials.',
  },
  {
    question: 'Does it work offline?',
    answer:
      'Yes — completely. Acronix Books is offline-first: every screen, voucher, report, and export runs against your local database with no internet connection required. There is no cloud round-trip in the critical path, which is a big part of why common actions land in under 200ms.\n\nCloud sync is entirely optional. When you turn it on, the app still works fully offline and reconciles with the cloud only when you have a connection.',
  },
  {
    question: 'Is it really free?',
    answer:
      'Yes. Acronix Books is free to download and use during its early-access period (currently v0.1.0). You can install it and run your real books today at no cost.',
  },
  {
    question: 'Which GST returns and documents are supported?',
    answer:
      'Invoicing is GST-ready from the first entry, with HSN/SAC codes and tax categories applied automatically. The GST module gives you the Sales, Purchase, Output Tax and Input Tax registers and a rate-wise HSN summary, plus GSTR-1 (outward supplies) and GSTR-3B (summary) — both exported to Excel in the government offline-utility layout.\n\nYou can also generate e-invoice and e-way bill data from the same voucher, so IRN and transport documents come from your books instead of a separate re-entry.',
  },
  {
    question: 'Can I import my data from Tally?',
    answer:
      'A dedicated Tally import is not part of the current early-access release. In the meantime you can set up your companies, ledgers, account groups, and item masters directly, and begin fresh books — most businesses start Acronix Books at the beginning of a financial year or period for a clean cut-over. Watch the changelog for data-migration tooling as the product matures.',
  },
  {
    question: 'Does it support multiple users and roles?',
    answer:
      'Yes. Acronix Books has capability-based access control with five role levels — Viewer, Operator, Accountant, Admin and Owner — so each user gets their own encrypted login and a permission level that scopes what they can see and do. Idle auto-lock protects a shared machine when someone steps away, and the tamper-evident audit hash chain, login log and voucher audit record who changed what.',
  },
  {
    question: 'Can I manage more than one company?',
    answer:
      'Yes. A single install can hold multiple companies, and you can work across multi-company, branch, and financial-year combinations from one place. Each company keeps its own ledgers, voucher series, and Apr–Mar financial years cleanly separated.',
  },
  {
    question: 'What are the system requirements and which operating systems are supported?',
    answer:
      'Acronix Books is a desktop application. Windows 10 and 11 (64-bit) are supported today with a one-click installer of roughly 80 MB. macOS and Linux builds are in the pipeline and coming soon.\n\nBecause it runs locally, it is comfortable on ordinary business hardware and scales to 50,000+ vouchers per financial year without slowing down.',
  },
  {
    question: 'How do updates work?',
    answer:
      'The Windows app auto-updates itself once installed — you install once and it keeps itself current, so you always have the latest fixes and features without manually re-downloading. New releases are documented in the changelog.',
  },
  {
    question: 'Is cloud sync required, and is my cloud data isolated?',
    answer:
      'Cloud sync is fully optional and opt-in — the app is designed to work end-to-end without it. If you do enable it, you get full-book sync to a per-client isolated, encrypted cloud backup that only your client can read; there is no shared tenancy of your data.\n\nThat backup also powers fresh-device restore: sign in on a new machine and recover your complete book in minutes.',
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container size="wide" className="py-20 text-center sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Badge tone="brand">Built for Indian businesses of every size</Badge>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--fg)] sm:text-5xl">
              Every module you need, <span className="text-gradient">explained in full</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">
              Accounting, GST, inventory, reporting, security, and cloud sync — one fast,
              offline-first desktop app that respects how accountants actually work. Here is exactly
              what each part does and how it fits together.
            </p>
          </div>
        </Container>
      </section>

      {/* Four pillars overview */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
        <Container size="wide" className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="What holds it together"
            title="Four ideas run through every feature"
            description="Acronix Books is built on four commitments. They are not marketing lines — they show up concretely in each module below."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                  <Icon className="h-5.5 w-5.5" aria-hidden />
                </span>
                <h3 className="font-display text-lg font-bold text-[var(--fg)]">{title}</h3>
                <p className="text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The six feature areas */}
      <Container size="wide">
        {rows.map((row) => (
          <FeatureRow key={row.id} {...row} />
        ))}
      </Container>

      {/* Built for how Indian businesses actually work */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <Container size="wide" className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="Local by design"
            title="Built for how Indian businesses actually work"
            description="This is not a foreign template with a rupee sign bolted on. The defaults, the workflows, and the vocabulary match the way businesses across India run their books."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {indiaFacts.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                  <Icon className="h-5.5 w-5.5" aria-hidden />
                </span>
                <h3 className="font-display text-base font-bold text-[var(--fg)]">{title}</h3>
                <p className="text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Speed & keyboard-first explainer */}
      <section className="border-t border-[var(--border)]">
        <Container size="wide" className="py-20 sm:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Speed you can feel</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
                Why a local desktop app beats cloud SaaS on latency
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--fg-muted)]">
                A cloud accounting tool sends every keystroke and lookup on a round-trip to a server
                — and you feel every millisecond of it. Acronix Books runs against a local SQLite
                database on the same machine as your hands, so there is no network in the critical
                path. The result is software that keeps up with an experienced operator instead of
                making them wait.
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--fg-muted)]">
                That local-first architecture is what makes the whole product feel instant, from the
                first voucher of the day to the last report at closing.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Gauge,
                  stat: '< 200ms',
                  label: 'Common actions',
                  body: 'Opening a voucher, saving, switching company — all under a fifth of a second.',
                },
                {
                  icon: Zap,
                  stat: '< 50ms',
                  label: 'Hot queries',
                  body: 'Reports and lookups read straight from local storage, not a distant server.',
                },
                {
                  icon: Keyboard,
                  stat: '1 frame',
                  label: 'Keyboard shortcuts',
                  body: 'Every action has a shortcut that fires in a single frame — no perceptible lag.',
                },
                {
                  icon: BarChart3,
                  stat: '50k+',
                  label: 'Vouchers / FY',
                  body: 'Virtualized lists render only what is on screen, so a full year scrolls without stutter.',
                },
              ].map(({ icon: Icon, stat, label, body }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-4 font-display text-2xl font-extrabold tabular-nums text-[var(--fg)]">
                    {stat}
                  </p>
                  <p className="text-sm font-semibold text-[var(--fg)]">{label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Faq
        items={faqs}
        eyebrow="Questions"
        title="Everything you might be wondering"
        description="Straight answers on data safety, offline use, GST, cost, and getting set up."
        className="border-t border-[var(--border)] bg-[var(--bg-subtle)] py-20 sm:py-24"
      />

      {/* Closing CTA */}
      <section className="border-t border-[var(--border)]">
        <Container size="wide" className="py-20 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            See it run on your own books
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[var(--fg-muted)]">
            Free to download while in early access. Install in seconds — it auto-updates from there.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/download/" size="lg">
              <Download className="h-5 w-5" />
              Download for Windows
            </ButtonLink>
            <ButtonLink href="/docs/" variant="outline" size="lg">
              <BookOpen className="h-5 w-5" />
              Read the docs
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
