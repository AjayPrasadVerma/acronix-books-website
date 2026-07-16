// Solution pages — capability deep-dives, one per job the product does.
// Rendered by ONE template (app/solutions/[slug]/page.tsx) from this config,
// using the shared sections in components/marketing/sections.
//
// 🚨 HONESTY RULE — same as lib/industries.ts, and it bites harder here.
// These pages are the ones a prospect reads to decide whether a specific
// capability exists. Every bullet must name something the build actually does.
// Where a capability has a real limit, `scopeNote` says so out loud — see
// `cloud-sync`, where the server-side mirror is deliberately NOT end-to-end
// encrypted (product CLAUDE.md §15.13). Never let copy imply otherwise.

import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  Boxes,
  CloudUpload,
  FileCheck,
  FileSpreadsheet,
  ReceiptIndianRupee,
  Truck,
} from 'lucide-react';

/**
 * The nav groups a solution can belong to. The mega-menu derives its columns by
 * mapping over this tuple — so a new group is added here, never hand-listed in
 * the component. Order here IS the column order on screen.
 */
export const solutionGroups = [
  'Accounting & billing',
  'GST compliance',
  'Inventory & reports',
] as const;

export type SolutionGroup = (typeof solutionGroups)[number];

export interface Solution {
  slug: string;
  /** Menu + card label. */
  name: string;
  /** One-liner for the nav panel and cards. */
  tagline: string;
  /** Nav/card glyph. A component reference, not a string — keeps it type-safe. */
  icon: LucideIcon;
  /** Which mega-menu column this solution sits under. */
  group: SolutionGroup;
  title: string;
  description: string;
  headline: string;
  highlight: string;
  intro: string;
  challenges: { title: string; body: string }[];
  capabilities: { title: string; body: string }[];
  highlights: string[];
  scopeNote?: string;
}

export const solutions: Solution[] = [
  {
    slug: 'gst-billing',
    name: 'GST Billing & Invoicing',
    tagline: 'Compliant invoices at keyboard speed',
    icon: ReceiptIndianRupee,
    group: 'Accounting & billing',
    title: 'GST Billing & Invoicing Software',
    description:
      'Raise GST-compliant invoices in seconds — CGST/SGST/IGST resolved from place of supply, HSN and rates carried on the item master, tax-invoice print and e-invoice from the same voucher.',
    headline: 'A GST invoice should take',
    highlight: 'seconds, not a form tour',
    intro:
      'Billing is the thing you do a hundred times a day, so it is the thing that should cost you the least. Acronix resolves the tax treatment from the data it already has and gets out of the way.',
    challenges: [
      {
        title: 'CGST/SGST vs IGST decided by hand',
        body: 'Intra- or inter-state is a function of two state codes. Deciding it per invoice is a mistake waiting to be replicated.',
      },
      {
        title: 'Rates re-chosen on every voucher',
        body: 'When the rate is a per-line decision rather than a property of the product, two operators will eventually disagree.',
      },
      {
        title: 'Invoices re-typed into a portal',
        body: 'E-invoicing turns into duplicate data entry the moment the billing system and the IRP are not fed by the same voucher.',
      },
    ],
    capabilities: [
      {
        title: 'Place of supply drives the tax split',
        body: 'The company state code and the party state code decide CGST+SGST versus IGST automatically. It is derived, not typed.',
      },
      {
        title: 'Tax categories on the item master',
        body: 'Rate and HSN belong to the product, so they travel onto every voucher line the same way every time — and HSN summaries fall out of the same data.',
      },
      {
        title: 'Fully keyboard-driven entry',
        body: 'Function keys per module, Enter to advance, Ctrl+K for anything. The app targets sub-200ms on common actions.',
      },
      {
        title: 'Tax-invoice print and Save & Print',
        body: 'Print a compliant tax invoice straight from the voucher — including a Save & Print in one keystroke (Ctrl+Shift+P).',
      },
      {
        title: 'One voucher, many outputs',
        body: 'The same sale feeds the ledger, stock, the bill, GSTR-1, the HSN summary, e-invoice and the e-way bill. Nothing is entered twice.',
      },
      {
        title: 'Posted invoices are immutable',
        body: 'A posted voucher never mutates. Corrections happen through reversals, so the audit trail stays honest.',
      },
    ],
    highlights: ['Auto CGST/SGST/IGST', 'HSN on the item', 'Tax-invoice print', 'Keyboard-first', 'E-invoice ready'],
  },
  {
    slug: 'inventory',
    name: 'Inventory & Stock',
    tagline: 'Multi-warehouse stock with real valuation',
    icon: Boxes,
    group: 'Inventory & reports',
    title: 'Inventory Management Software',
    description:
      'Multi-warehouse stock, FIFO or weighted-average valuation per item, stock journals, delivery challans and party-held stock — with movements and valuation layers behind every number.',
    headline: 'Stock numbers you can',
    highlight: 'actually defend',
    intro:
      'Closing stock is not a number you type at year end — it is the consequence of every movement you recorded. Acronix keeps the movements and the layers so the valuation can be explained, not asserted.',
    challenges: [
      {
        title: 'Valuation decided globally, forever',
        body: 'Most packages pick FIFO or weighted-average once, for everything, and switching later means a painful backfill.',
      },
      {
        title: 'Stock that is not where it is owned',
        body: 'Goods at a job worker, or someone else’s goods in your godown, break software that equates location with ownership.',
      },
      {
        title: 'Movement forced through sales',
        body: 'If the only way to move stock is to invoice it, your turnover and GST returns get polluted by internal logistics.',
      },
    ],
    capabilities: [
      {
        title: 'FIFO and weighted-average, per item',
        body: 'A company default with a per-item override. Valuation layers are written on every inward movement even in weighted-average mode, so switching method later needs no backfill.',
      },
      {
        title: 'Multi-warehouse from day one',
        body: 'Stock is tracked per warehouse with movements behind it, so a godown-wise position is a report rather than an estimate.',
      },
      {
        title: 'Stock Journals for internal movement',
        body: 'Two-legged postings move stock between warehouses, qualities or states — no fictional customer, no polluted turnover.',
      },
      {
        title: 'Delivery Challans that skip the GL',
        body: 'Move goods and ownership without posting a ledger entry, then convert to a Sale with one key when it becomes one.',
      },
      {
        title: 'Party Stock — ownership, not location',
        body: 'Track goods across ownership boundaries: yours sitting at a processor, and someone else’s sitting with you.',
      },
      {
        title: 'Perpetual inventory and COGS',
        body: 'Cost of goods sold posts as you go rather than being reconstructed at year end.',
      },
    ],
    highlights: ['Multi-warehouse', 'FIFO + weighted-average', 'Stock journals', 'Delivery challans', 'Party stock'],
    scopeNote:
      'Acronix tracks stock, movement and valuation. It does not currently ship a bill-of-materials or production-planning module, and there is no barcode-scanner integration yet.',
  },
  {
    slug: 'accounting',
    name: 'Accounting & Vouchers',
    tagline: 'One posting engine, one ledger, real double entry',
    icon: BookOpen,
    group: 'Accounting & billing',
    title: 'Double-Entry Accounting & Voucher Software',
    description:
      'Every voucher posts through one shared engine into one canonical ledger — sales, purchases, receipts, payments, contra, journals, credit and debit notes. Immutable postings, period lock and a tamper-evident audit log.',
    headline: 'One ledger,',
    highlight: 'one version of the truth',
    intro:
      'Accounting software earns trust in the boring layer: whether every voucher lands in the same ledger, through the same rules, and whether a posted entry can quietly change afterwards. Acronix is opinionated about all three.',
    challenges: [
      {
        title: 'Every voucher type with its own logic',
        body: 'When each voucher posts its own way, the trial balance becomes an act of faith and every new type is a new class of bug.',
      },
      {
        title: 'Posted entries that can be edited',
        body: 'If a posted voucher can be silently altered, the audit trail is decoration.',
      },
      {
        title: 'Closed periods that reopen themselves',
        body: 'A back-dated entry landing in a filed period is how a reconciled quarter stops reconciling.',
      },
    ],
    capabilities: [
      {
        title: 'One canonical ledger',
        body: 'All vouchers post through a shared engine into a single ledger_entries table. Trial Balance, P&L and Balance Sheet read only from there — so they cannot disagree with each other.',
      },
      {
        title: 'The core voucher set',
        body: 'Sale, Purchase, Receipt, Payment, Contra, Journal, Credit Note, Debit Note, Stock Journal and Delivery Challan, all driven by one generic form rather than ten cloned ones.',
      },
      {
        title: 'DRAFT → POSTED → VOID',
        body: 'Posted rows are immutable. Voids happen through reversal vouchers, never by updating or deleting history.',
      },
      {
        title: 'Bill-by-bill from day one',
        body: 'Invoices become bills; receipts allocate against specific bills. Outstanding is per-bill and per-age, not a party-level lump sum.',
      },
      {
        title: 'Period lock',
        body: 'Freeze the books to a date. The engine then rejects posts, edits and voids that would land at or before it — and every lock and unlock is recorded.',
      },
      {
        title: 'Tamper-evident audit log',
        body: 'Privileged actions are hash-chained, so an out-of-app edit to the database is detectable rather than invisible.',
      },
    ],
    highlights: ['One ledger', '10 voucher types', 'Immutable postings', 'Bill-by-bill', 'Period lock', 'Audit chain'],
  },
  {
    slug: 'e-invoice',
    name: 'E-Invoice (IRN)',
    tagline: 'IRP payloads from the voucher you already raised',
    icon: FileCheck,
    group: 'GST compliance',
    title: 'E-Invoice (IRN) Software',
    description:
      'Generate IRP-schema e-invoice payloads directly from your sales vouchers, and import the signed response back onto the invoice — with validation before you ever hit the portal.',
    headline: 'E-invoicing without',
    highlight: 'typing it twice',
    intro:
      'The e-invoice payload is a lossless function of the invoice you already recorded. Acronix treats it that way: build from the voucher, validate first, import the response back.',
    challenges: [
      {
        title: 'Duplicate entry into the IRP',
        body: 'Re-keying an invoice into a portal is both slow and a fresh opportunity to diverge from your own books.',
      },
      {
        title: 'Rejections found at the portal',
        body: 'Discovering a missing GSTIN or a bad HSN at submission time is the most expensive moment to discover it.',
      },
      {
        title: 'The IRN never making it back',
        body: 'An IRN that lives only in a portal download is not on your invoice, and not in your records.',
      },
    ],
    capabilities: [
      {
        title: 'Payloads built from the voucher',
        body: 'The IRP JSON is generated from the sale you already recorded — same party, same lines, same tax.',
      },
      {
        title: 'Validation before submission',
        body: 'A dedicated GST validation panel surfaces the problems — missing GSTIN, HSN, place of supply — while you can still fix them cheaply.',
      },
      {
        title: 'Response imported back',
        body: 'The signed IRP response is parsed and attached to the invoice, so the IRN lives on the voucher rather than in a download folder.',
      },
      {
        title: 'Cancellation handled',
        body: 'Cancel flows are supported and gated behind the Accountant role.',
      },
    ],
    highlights: ['IRP-schema payload', 'Pre-submit validation', 'Response import', 'Role-gated cancel'],
    scopeNote:
      'Acronix builds and parses the payloads; it is not a GSP and does not transmit to the IRP on your behalf. You move the payload and the response through your GSP or the portal. That also means no per-invoice GSP fee flows through us.',
  },
  {
    slug: 'e-way-bill',
    name: 'E-Way Bill',
    tagline: 'EWB payloads straight from the movement',
    icon: Truck,
    group: 'GST compliance',
    title: 'E-Way Bill Software',
    description:
      'Build e-way bill payloads from the voucher that created the movement, with transport details, distance and validation — then import the response back onto the record.',
    headline: 'The truck is already loaded.',
    highlight: 'The bill should be too',
    intro:
      'An e-way bill describes a movement your voucher already recorded. Acronix builds it from that voucher, including the transport block, instead of asking you to reconstruct it.',
    challenges: [
      {
        title: 'Transport details living on paper',
        body: 'Vehicle, transporter and distance recorded outside the system means the EWB is assembled by hand every time.',
      },
      {
        title: 'Distance guessed per consignment',
        body: 'Getting distance wrong is a common, avoidable rejection.',
      },
      {
        title: 'Dispatch waiting on the internet',
        body: 'If the billing system is a web app, a dropped line stops the gate.',
      },
    ],
    capabilities: [
      {
        title: 'Transport block on the voucher',
        body: 'Vehicle, transporter and mode are captured on the voucher that moves the goods, so the payload is complete when you need it.',
      },
      {
        title: 'Distance from the ship-to address',
        body: 'Ship-to addresses carry a distance field, so the number comes from the master rather than being re-guessed per consignment.',
      },
      {
        title: 'Validation before submission',
        body: 'The same GST validation surfaces missing or inconsistent fields before they become a rejection.',
      },
      {
        title: 'Offline-first dispatch',
        body: 'Billing runs on a local encrypted database. An outage does not stop the gate; the payload is ready when the line returns.',
      },
    ],
    highlights: ['Transport block', 'Ship-to distance', 'Pre-submit validation', 'Offline-first'],
    scopeNote:
      'As with e-invoicing, Acronix generates and parses the payloads rather than acting as a GSP. Transmission to the NIC portal happens through your GSP or the portal itself.',
  },
  {
    slug: 'gst-returns',
    name: 'GSTR-1 & GSTR-3B',
    tagline: 'Returns that fall out of the vouchers you raised',
    icon: FileSpreadsheet,
    group: 'GST compliance',
    title: 'GSTR-1 & GSTR-3B Return Filing Software',
    description:
      'GSTR-1 and GSTR-3B generated from your own vouchers, with HSN summaries, tax registers and portal-shaped Excel exports — plus overrides where the return genuinely needs judgement.',
    headline: 'Returns should be a report,',
    highlight: 'not a re-entry project',
    intro:
      'Everything a return needs is already in the vouchers you raised. Filing month should be a read operation.',
    challenges: [
      {
        title: 'Returns rebuilt in a spreadsheet',
        body: 'Exporting to Excel and re-summarising by hand every month is where errors and lost evenings live.',
      },
      {
        title: 'Judgement calls with nowhere to live',
        body: 'Some 3B figures genuinely need an override. If the software has no place for it, it goes in a spreadsheet nobody keeps.',
      },
      {
        title: 'Summaries that cannot be drilled',
        body: 'A total you cannot trace back to vouchers is a total you cannot defend.',
      },
    ],
    capabilities: [
      {
        title: 'GSTR-1 and GSTR-3B from your vouchers',
        body: 'Both are generated from the same data that produced your invoices — no parallel entry, no export-and-rebuild.',
      },
      {
        title: 'HSN summary and tax registers',
        body: 'HSN-wise summaries plus input and output tax registers, aggregated in SQL so they stay fast as volume grows.',
      },
      {
        title: 'Portal-shaped exports',
        body: 'Excel exports formatted for the portal’s own templates, rather than a generic dump you reshape by hand.',
      },
      {
        title: 'Overrides, recorded',
        body: 'Where a return needs a judgement call, the override lives in the system and is gated behind the Accountant role.',
      },
      {
        title: 'A GST dashboard',
        body: 'A summary view of the period’s GST position, drillable back to the vouchers underneath.',
      },
    ],
    highlights: ['GSTR-1', 'GSTR-3B', 'HSN summary', 'Tax registers', 'Portal exports'],
    scopeNote:
      'Acronix prepares returns and the exports for them. It does not file on your behalf and does not reconcile GSTR-2A/2B against your purchases yet — you or your CA still submit through the portal.',
  },
  {
    slug: 'reports',
    name: 'Reports & Analytics',
    tagline: 'Twenty reports that stay instant at scale',
    icon: BarChart3,
    group: 'Inventory & reports',
    title: 'Accounting Reports & Analytics',
    description:
      'Trial Balance, P&L, Balance Sheet, Cash Flow, Day Book, Stock Summary, ageing and the GST registers — aggregated in SQL, exportable to PDF and Excel, fast at 500k vouchers.',
    headline: 'Reports that stay fast',
    highlight: 'when the books get big',
    intro:
      'A report that is quick in year one and unusable in year four is not a report, it is a demo. Acronix aggregates in the database and returns finished rows.',
    challenges: [
      {
        title: 'Reports that crawl as data grows',
        body: 'Software that pulls raw rows into the UI and sums them there degrades exactly as your business succeeds.',
      },
      {
        title: 'Numbers that cannot be traced',
        body: 'A figure you cannot drill into is a figure you cannot defend to an auditor.',
      },
      {
        title: 'Export as an afterthought',
        body: 'If getting a report to your CA means a screenshot, the report is not finished.',
      },
    ],
    capabilities: [
      {
        title: 'Aggregated in SQL, always',
        body: 'Every report does its SUM and GROUP BY in the database and returns finished rows — audited across all twenty reports, with no JS-side aggregation anywhere.',
      },
      {
        title: 'The full statutory set',
        body: 'Trial Balance, Profit & Loss, Balance Sheet and Cash Flow Statement, with group-wise variants.',
      },
      {
        title: 'The operational set',
        body: 'Day Book, Cash Book, Ledger Statement, Outstanding and ageing, Sales and Purchase registers, Stock Summary and Stock Ledger.',
      },
      {
        title: 'PDF and Excel on everything',
        body: 'Every report exports cleanly, including voucher lists.',
      },
      {
        title: 'Built for 500k vouchers',
        body: 'Bounded working windows, FTS5 search and compound indices mean a list stays instant instead of loading a year into memory.',
      },
    ],
    highlights: ['Trial Balance', 'P&L & Balance Sheet', 'Cash Flow', 'Day Book', 'Ageing', 'PDF + Excel'],
  },
  {
    slug: 'cloud-sync',
    name: 'Cloud Backup & Sync',
    tagline: 'Optional off-site backup and multi-device restore',
    icon: CloudUpload,
    group: 'Inventory & reports',
    title: 'Cloud Backup & Sync',
    description:
      'Optional encrypted-in-transit cloud backup with multi-device restore and email-OTP device enrolment. Your local book stays encrypted on your machine; the app works fully offline without an account.',
    headline: 'Off-site backup',
    highlight: 'you can switch on — or not',
    intro:
      'A hard disk dies eventually. Acronix can keep an off-site copy of your book and restore it onto a new machine — but the app never needs it to open your books, and we are specific about what the cloud copy is.',
    challenges: [
      {
        title: 'One machine, one copy',
        body: 'An offline-first app is only as durable as the disk it sits on, unless something else holds a copy.',
      },
      {
        title: 'A new machine, a lost book',
        body: 'Restoring onto a replacement PC is the moment you find out whether your backup was real.',
      },
      {
        title: 'Cloud as a requirement',
        body: 'Software that will not open without a connection has made your books hostage to your broadband.',
      },
    ],
    capabilities: [
      {
        title: 'Local stays encrypted, always',
        body: 'Your book is a SQLCipher-encrypted file on your own machine. Copied to a pen drive, it is unreadable bytes. That does not change whether or not you use sync.',
      },
      {
        title: 'Full-book restore onto a new device',
        body: 'Sign in on a replacement machine and pull the whole book back down.',
      },
      {
        title: 'Email-OTP at new-device enrolment',
        body: 'A new device must pass an emailed one-time code before its first full pull — the moment the risk actually exists. Routine logins on a known device are not re-challenged.',
      },
      {
        title: 'TLS 1.2+ with HSTS',
        body: 'The server accepts no plaintext HTTP, and refresh tokens rotate with reuse detection so a stolen token family gets revoked.',
      },
      {
        title: 'Genuinely optional',
        body: 'The app runs fully offline with no cloud account at all. Sync is a convenience you switch on, never a requirement.',
      },
    ],
    highlights: ['Encrypted local book', 'Multi-device restore', 'Email-OTP enrolment', 'TLS 1.2+', 'Fully optional'],
    scopeNote:
      'Being precise, because this matters: cloud sync is NOT end-to-end encrypted. Your local file and its backups are encrypted, and everything in transit is TLS — but the server-side copy is a readable mirror, held so the books can be queried directly in future. Access is scoped per account and audited, and authentication secrets are separately encrypted, but you should decide with that fact in front of you rather than behind it. If you want zero server-side readability, keep sync switched off and use local encrypted backups instead.',
  },
];

export const solutionBySlug = new Map(solutions.map((s) => [s.slug, s]));
