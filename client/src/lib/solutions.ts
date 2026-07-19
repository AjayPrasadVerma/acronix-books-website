// Solution pages — capability deep-dives, one per job the product does.
// Rendered by ONE template (app/solutions/[slug]/page.tsx) from this config,
// using the shared sections in components/marketing/sections.
//
// 🚨 HONESTY RULE — same as lib/industries.ts, and it bites harder here.
// These pages are the ones a prospect reads to decide whether a specific
// capability exists. Every bullet must name something the build actually does.
//
// The pages don't enumerate gaps — but `cloud-sync` MUST keep its "How the
// server copy works" bullet. That is not a gap-confession, it is where the
// customer's financial data physically sits: the server mirror is readable by
// design (product CLAUDE.md §15.13), while the local file stays SQLCipher-
// encrypted. docs/security.mdx says "there is no plaintext copy of your
// ledgers" — true of the local file, and misleading about the cloud unless
// this bullet stands. Never let copy imply cloud sync is end-to-end encrypted.

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
  /** Optional per-solution FAQ. Rendered via the shared Faq component, which
   *  also emits FAQPage JSON-LD. Optional so an un-enriched entry still builds. */
  faqs?: { question: string; answer: string }[];
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
    faqs: [
      {
        question: 'How does Acronix decide between CGST/SGST and IGST on an invoice?',
        answer:
          'It derives the split from two state codes — your company state and the party place of supply. When they match it posts CGST plus SGST; when they differ it posts IGST. You never pick the treatment per invoice, so two operators cannot quietly disagree on the same customer.',
      },
      {
        question: 'Do I have to re-select the tax rate and HSN on every line?',
        answer:
          'No. Rate and HSN are properties of the item on its master, so they travel onto every voucher line the same way each time. The same item data also feeds the HSN summary your return needs, so nothing is entered a second time.',
      },
      {
        question: 'Can I print a compliant tax invoice straight from the voucher?',
        answer:
          'Yes. You print a tax invoice directly from the sale voucher, and Save & Print posts and prints in one keystroke (Ctrl+Shift+P) so counter billing stays a single motion rather than a save-then-hunt-for-print sequence.',
      },
      {
        question: 'Can I raise the e-invoice and e-way bill from the same sale?',
        answer:
          'Yes. One sale voucher feeds the ledger, stock, the bill, GSTR-1, the HSN summary, the e-invoice (IRN) payload and the e-way bill payload. The invoice is entered once and every downstream document is built from it.',
      },
      {
        question: 'How fast is billing, and does it need a mouse?',
        answer:
          'The app is fully keyboard-driven — function keys per module, Enter to advance a field, Ctrl+K for anything — and targets sub-200ms on common actions. It is built for someone raising a hundred invoices a day, not for a demo.',
      },
      {
        question: 'Can a posted invoice be edited afterwards?',
        answer:
          'A posted voucher is immutable. Corrections happen through reversal vouchers rather than a silent edit, so the invoice you printed and the entry in the books can never drift apart and the audit trail stays honest.',
      },
    ],
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
    faqs: [
      {
        question: 'Do I have to choose FIFO or weighted-average once for the whole company?',
        answer:
          'No. There is a company default with a per-item override, so a fast-moving commodity and a lot-tracked item can value differently in the same books. Valuation layers are written on every inward movement even in weighted-average mode, so the choice is genuinely per item.',
      },
      {
        question: 'Can I switch an item from weighted-average to FIFO later without a painful backfill?',
        answer:
          'Yes. Because the valuation layers are recorded on every inward movement regardless of the current method, switching an item to the other method needs no reconstruction of past cost — the data the other method needs is already there.',
      },
      {
        question: 'Can I move stock between godowns without booking a fake sale?',
        answer:
          'Yes. A Stock Journal is a two-legged posting that moves stock between warehouses, qualities or states with no customer and no ledger impact, so internal logistics never pollute your turnover or GST returns.',
      },
      {
        question: 'How do I move goods out before it is a confirmed sale?',
        answer:
          'A Delivery Challan moves goods and ownership without posting a ledger entry, and converts to a Sale with one key when it becomes one. The movement is recorded when it happens rather than being backdated into an invoice later.',
      },
      {
        question: 'Does it show stock per warehouse or only a company total?',
        answer:
          'Stock is tracked per warehouse with real movements behind every figure, so a godown-wise position is a report you open rather than an estimate. Reorder, minimum and maximum levels sit on the item so shortfalls surface before they bite.',
      },
      {
        question: 'Can I track my goods sitting at someone else’s premises?',
        answer:
          'Yes. Party Stock tracks goods by ownership rather than location — your material lying at a processor while still on your books, and someone else’s material sitting in your godown — so the closing stock you report is the stock you actually own.',
      },
    ],
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
    faqs: [
      {
        question: 'Do all the different voucher types post the same way?',
        answer:
          'Yes. Sale, Purchase, Receipt, Payment, Contra, Journal, Credit Note, Debit Note, Stock Journal and Delivery Challan all post through one shared engine into a single ledger_entries table, driven by one generic form rather than ten cloned ones. New behaviour is a rule on the engine, not a new class of bug.',
      },
      {
        question: 'Can my Trial Balance, P&L and Balance Sheet ever disagree with each other?',
        answer:
          'They read from the same canonical ledger, so they are three views of one set of entries rather than three independent calculations. There is no second place for a figure to live, which is exactly why they stay consistent.',
      },
      {
        question: 'Can a posted voucher be edited or deleted?',
        answer:
          'No. A posted row is immutable and follows a DRAFT → POSTED → VOID lifecycle. You correct a posted voucher by voiding it through a reversal, never by updating or deleting history — so the audit trail is real, not decoration.',
      },
      {
        question: 'Then how do I fix a mistake in a posted entry?',
        answer:
          'You post a reversal, which cancels the original with a fresh entry and leaves both visible. The original stands, the correction stands, and anyone reading the books later can see exactly what happened and when.',
      },
      {
        question: 'Can I lock a filed period so nothing back-dates into it?',
        answer:
          'Period lock freezes the books to a date, after which the engine rejects any post, edit or void that would land at or before it. Every lock and unlock is itself recorded, so a reconciled quarter cannot quietly reopen.',
      },
      {
        question: 'Does it handle multiple companies and financial years?',
        answer:
          'Yes. Multi-company and multi-financial-year are built in, with company_id on every transactional and master row, so several businesses and several years live in one encrypted book without separate installs or files.',
      },
    ],
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
    faqs: [
      {
        question: 'Do I have to re-type the invoice into the IRP portal?',
        answer:
          'No. The IRP-schema payload is generated from the sale you already recorded — same party, same lines, same tax — so the e-invoice is built from your books rather than keyed a second time into a government site.',
      },
      {
        question: 'Can I catch problems before I submit to the portal?',
        answer:
          'Yes. A dedicated GST validation panel surfaces missing or inconsistent fields — GSTIN, HSN, place of supply — while they are still cheap to fix, instead of letting you discover them at submission, which is the most expensive moment to find them.',
      },
      {
        question: 'Where does the IRN end up after it is generated?',
        answer:
          'The signed IRP response is parsed and attached back onto the invoice, so the IRN lives on the voucher itself rather than in a portal download folder that nobody keeps. Your record and the portal record match.',
      },
      {
        question: 'Can I prepare the e-invoice offline and push it when connected?',
        answer:
          'The app runs on a local encrypted database, so the payload is built and validated on your machine. You do the assembly and the checking without waiting on the line, and the push happens against the portal when you are connected.',
      },
      {
        question: 'Can I cancel an e-invoice?',
        answer:
          'Yes. Cancellation is supported and gated behind the Accountant role, so the ability to reverse an IRN sits with the people who should hold it rather than with anyone at a billing counter.',
      },
      {
        question: 'What data does the payload actually use?',
        answer:
          'It is a lossless function of the sale voucher — the party, the lines, the HSN and the tax that produced the invoice. Because it is derived from the same voucher, the e-invoice cannot diverge from the books it came from.',
      },
    ],
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
    faqs: [
      {
        question: 'Where do the vehicle, transporter and mode details go?',
        answer:
          'They are captured in a transport block on the voucher that moves the goods, so the payload is complete at the moment you need it instead of being assembled by hand from a slip on the dispatch desk.',
      },
      {
        question: 'Where does the distance figure come from?',
        answer:
          'Ship-to addresses carry a distance field on the master, so the number is pulled from there rather than re-guessed per consignment. Guessing distance is a common, avoidable rejection, and this takes the guess out of it.',
      },
      {
        question: 'Is the e-way bill built from the sale I already recorded?',
        answer:
          'Yes. The EWB payload is generated from the voucher that created the movement, so vehicle, party, lines and distance all come from data you already entered rather than a separate re-keying of the consignment.',
      },
      {
        question: 'Can it flag missing fields before the portal rejects the bill?',
        answer:
          'Yes. The same GST validation surfaces missing or inconsistent fields before submission, so a gap is caught on your screen while it is cheap to fix rather than at the government portal while a truck waits.',
      },
      {
        question: 'Does a dropped connection stop dispatch at the gate?',
        answer:
          'No. Billing runs on a local encrypted database, so an outage does not halt the gate — you keep working and the payload is ready to push the moment the line returns. Your books never depend on your broadband.',
      },
      {
        question: 'Can I raise the e-way bill and e-invoice from the same voucher?',
        answer:
          'Yes. Both payloads come off the same sale voucher, so one entry drives the invoice, the IRN and the e-way bill rather than three passes at the same consignment in three different places.',
      },
    ],
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
    faqs: [
      {
        question: 'Do I re-enter anything to file GSTR-1 and GSTR-3B?',
        answer:
          'No. Both returns are generated from the same vouchers that produced your invoices, so filing month is a read operation rather than an export-and-rebuild project. Everything a return needs is already in the entries you made.',
      },
      {
        question: 'Is the HSN summary produced for me?',
        answer:
          'Yes. HSN-wise summaries fall out of the HSN and rate that already sit on each item, alongside input and output tax registers. They are aggregated in SQL, so they stay fast as the year fills up.',
      },
      {
        question: 'Can I export in the shape the portal expects?',
        answer:
          'Exports are formatted for the portal’s own templates rather than a generic dump you reshape by hand, so what leaves Acronix is closer to what the portal wants to receive.',
      },
      {
        question: 'What if a 3B figure genuinely needs a manual judgement call?',
        answer:
          'The override lives in the system and is gated behind the Accountant role, so a considered adjustment is recorded where it belongs instead of in a side spreadsheet nobody keeps. The judgement call has a home and a trail.',
      },
      {
        question: 'Can I trace a summary total back to the vouchers underneath it?',
        answer:
          'Yes. A GST dashboard gives you the period’s position and drills back to the vouchers underneath, so a total is something you can defend line by line rather than assert.',
      },
      {
        question: 'Do the returns stay fast as my volume grows?',
        answer:
          'They are aggregated in the database rather than summed in the UI, so a busy year computes as quickly as a quiet one. The books are built to absorb hundreds of thousands of vouchers without the returns slowing down.',
      },
    ],
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
        title: 'Instant, even on a full year',
        body: 'Reports are computed where the data lives and come back finished, so a full-year Trial Balance opens as fast as a one-week one.',
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
        body: 'Lists open on a sensible working window and search finds anything outside it instantly, so the books stay quick as the years pile up.',
      },
    ],
    highlights: ['Trial Balance', 'P&L & Balance Sheet', 'Cash Flow', 'Day Book', 'Ageing', 'PDF + Excel'],
    faqs: [
      {
        question: 'Which statutory reports are included?',
        answer:
          'Trial Balance, Profit & Loss, Balance Sheet and Cash Flow Statement, with group-wise variants. They all read from the one canonical ledger, so the statutory set is internally consistent by construction rather than by reconciliation.',
      },
      {
        question: 'What operational reports do I get beyond the statutory ones?',
        answer:
          'Day Book, Cash Book, Ledger Statement, Outstanding and ageing, Sales and Purchase registers, Stock Summary and Stock Ledger — around twenty reports in all, covering the day-to-day questions as well as the year-end ones.',
      },
      {
        question: 'Do reports slow down once the books get big?',
        answer:
          'No. Reports are computed where the data lives and come back finished, so a full-year Trial Balance opens as fast as a one-week one. The engine is built to stay quick at hundreds of thousands of vouchers, not just in year one.',
      },
      {
        question: 'Can I trace a figure back to the vouchers behind it?',
        answer:
          'Yes. Figures drill back to the entries underneath, so a total is something you can walk an auditor through rather than a number you cannot explain. A figure you cannot trace is a figure you cannot defend.',
      },
      {
        question: 'Can I export reports to PDF and Excel?',
        answer:
          'Every report exports cleanly to both PDF and Excel, including voucher lists — so getting a report to your CA is a proper file, not a screenshot. Export is part of the report, not an afterthought bolted on.',
      },
      {
        question: 'How does it stay usable at half a million vouchers?',
        answer:
          'Lists open on a sensible working window and search finds anything outside it instantly, while the heavy aggregation happens in the database. The books stay responsive as the years pile up rather than degrading exactly as your business succeeds.',
      },
    ],
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
        title: 'How the server copy works',
        body: 'Sync keeps a server-side mirror of the synced company — scoped to your account, access-audited, with authentication secrets separately encrypted. It is a readable mirror by design: that is what lets the books be queried directly rather than only restored. Your local file and its .acxb backups stay SQLCipher-encrypted either way.',
      },
      {
        title: 'Genuinely optional',
        body: 'The app runs fully offline with no cloud account at all. Sync is a convenience you switch on, never a requirement — leave it off and your books never leave your machine.',
      },
    ],
    highlights: ['Encrypted local book', 'Multi-device restore', 'Email-OTP enrolment', 'TLS 1.2+', 'Fully optional'],
    faqs: [
      {
        question: 'Do I need a cloud account to use Acronix at all?',
        answer:
          'No. The app is offline-first and runs fully on your machine with no cloud account. Sync is a convenience you switch on for off-site backup and multi-device restore — leave it off and your books never leave your machine.',
      },
      {
        question: 'If my PC dies, can I get my books onto a new machine?',
        answer:
          'Yes, if sync is on. You sign in on a replacement machine and pull the whole book back down. Restoring onto a new PC is the moment you find out whether a backup was real, and this is the path that makes it real.',
      },
      {
        question: 'What stops someone else restoring my book on their own device?',
        answer:
          'A new device must pass an emailed one-time code before its first full pull — the moment the data-access risk actually exists. Routine logins on a device you have already enrolled are not re-challenged, so the friction lands only where it matters.',
      },
      {
        question: 'Is the connection to the server secure?',
        answer:
          'The server accepts no plaintext HTTP — every request is TLS 1.2+ with HSTS — and refresh tokens rotate with reuse detection, so a stolen token family is revoked. Auth and sync endpoints are rate-limited and their mutations are written to a server audit log.',
      },
      {
        question: 'Is the cloud copy end-to-end encrypted?',
        answer:
          'No — and it is worth knowing exactly what sits on the server. Cloud sync keeps a readable mirror of the synced company: it is not end-to-end encrypted, and the financial data is readable server-side by design, which is what lets the books be queried directly rather than only restored. That copy is scoped to your account and access-audited, the transport is TLS 1.2+, and authentication secrets are stored separately encrypted. Your local file and its .acxb backups stay AES-256 SQLCipher-encrypted regardless, and sync is optional — leave it off and nothing leaves your machine.',
      },
      {
        question: 'Is my local file encrypted whether or not I turn sync on?',
        answer:
          'Yes. Your book is a SQLCipher-encrypted file on your own machine, and its .acxb backups are encrypted too. Copied to a pen drive it is unreadable bytes. That protection does not depend on sync and does not change whether or not you use it.',
      },
    ],
  },
];

export const solutionBySlug = new Map(solutions.map((s) => [s.slug, s]));
