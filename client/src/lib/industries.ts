// Industry pages — content lives here as data, rendered by ONE template
// (app/industries/[slug]/page.tsx). This mirrors the product repo's §8 rule:
// ONE generic VoucherForm driven by per-type config, never 40 cloned files.
// A cloned per-industry page component would be the same DRY violation.
//
// 🚨 HONESTY RULE — read before adding or editing an entry.
// Every `capabilities` bullet must name something the app ACTUALLY SHIPS. This
// file is the most tempting place in the codebase to invent a feature, because
// vertical marketing copy sounds plausible in the abstract. It isn't abstract:
// a Surat trader will download the build and look for the thing you wrote.
// If a vertical has no specific support, say so (see `ecommerce`, `education`)
// rather than implying a module that does not exist.

import type { LucideIcon } from 'lucide-react';
import {
  Briefcase,
  Factory,
  GraduationCap,
  Shirt,
  ShoppingCart,
  Store,
  Truck,
} from 'lucide-react';

export interface IndustryChallenge {
  title: string;
  body: string;
}

export interface IndustryCapability {
  /** Must map to a shipped feature. */
  title: string;
  body: string;
}

export interface Industry {
  slug: string;
  /** Menu + card label. */
  name: string;
  /** One-line summary used in the nav panel and cards. */
  tagline: string;
  /** Nav/card glyph. A component reference, not a string — keeps it type-safe. */
  icon: LucideIcon;
  /** <title> — page-specific, not templated boilerplate. */
  title: string;
  /** <meta name="description"> */
  description: string;
  /** Hero H1 lead-in; `highlight` renders in the gradient. */
  headline: string;
  highlight: string;
  intro: string;
  /** What this trade actually wrestles with day to day. */
  challenges: IndustryChallenge[];
  /** How Acronix answers them — shipped features only. */
  capabilities: IndustryCapability[];
  /** Short scannable strip of the modules that matter most here. */
  highlights: string[];
  /**
   * Set when the product has NO vertical-specific support and the page is
   * honestly just "general accounting applied to this trade". Rendered as a
   * plain-spoken scope note instead of being quietly omitted.
   */
  scopeNote?: string;
}

export const industries: Industry[] = [
  {
    slug: 'textile',
    name: 'Textile & Fabric',
    tagline: 'Job work, greige tracking and processor exposure',
    icon: Shirt,
    title: 'Accounting Software for Textile & Fabric Traders',
    description:
      'Acronix Books handles the way textile actually works — greige sent out for processing, stock sitting at a job worker, delivery challans without a sale, and §143 exposure you can prove. GST-ready, offline-first.',
    headline: 'Built for the trade where stock leaves',
    highlight: 'and is still yours',
    intro:
      'Most accounting software assumes goods move when they are sold. Textile does not work that way. Greige goes to a processor, sits there for weeks, comes back as finished fabric — and never stopped being your stock. Acronix models that directly instead of asking you to fake it with dummy sales.',
    challenges: [
      {
        title: 'Stock that is yours but not with you',
        body: 'Fabric sits at a dyer, a printer, an embroidery unit. On paper it is your closing stock. In most software it has either vanished or been booked as a sale.',
      },
      {
        title: '§143 exposure nobody can total',
        body: 'Goods sent for job work have a statutory return window. Knowing what is outstanding, with whom, and for how long usually means a notebook and a phone call.',
      },
      {
        title: 'Goods moving without an invoice',
        body: 'A challan is not a sale. Forcing every movement through a sales voucher pollutes turnover, GST returns and the party ledger all at once.',
      },
      {
        title: 'Rates that differ per job worker',
        body: 'Every processor has its own rate card per process and quality. Re-keying those on each voucher is how errors get in.',
      },
    ],
    capabilities: [
      {
        title: 'Party Stock — ownership, not location',
        body: 'A dedicated report tracks goods across ownership boundaries: what is physically at a processor while remaining on your books, and what belongs to someone else while sitting in your godown.',
      },
      {
        title: 'Job Work Register with §143 exposure',
        body: 'Every job-work movement is tracked against its return window, so outstanding exposure per job worker is a report you open — not a total you reconstruct.',
      },
      {
        title: 'Delivery Challans that do not touch the GL',
        body: 'A challan moves stock and ownership without posting a single ledger entry. Turnover, GST and the party ledger stay clean. Convert it to a Sale later with one key when it becomes one.',
      },
      {
        title: 'Job Work Rates that autofill',
        body: 'Maintain a rate per job worker and process. The purchase form pulls the right rate in automatically, so the voucher matches the rate card without re-keying.',
      },
      {
        title: 'Stock Journals for internal movement',
        body: 'Two-legged postings move stock between warehouses, qualities or states without inventing a customer or a supplier for it.',
      },
      {
        title: 'The full GST suite on top',
        body: 'HSN-wise summaries, GSTR-1 and GSTR-3B, e-invoice and e-way bill — all working from the same vouchers, with no separate re-entry.',
      },
    ],
    highlights: [
      'Party Stock report',
      'Job Work Register (§143)',
      'Delivery Challans',
      'Job Work Rates',
      'Stock Journals',
      'Multi-warehouse',
    ],
  },
  {
    slug: 'wholesale',
    name: 'Wholesale & Distribution',
    tagline: 'Bill-by-bill outstanding, credit limits, fast billing',
    icon: Truck,
    title: 'Accounting Software for Wholesalers & Distributors',
    description:
      'Bill-by-bill outstanding from day one, per-party credit limits and credit days, multi-warehouse stock, e-way bills and keyboard-speed billing. Offline-first, so a dropped connection never stops a dispatch.',
    headline: 'Know exactly who owes you what,',
    highlight: 'against which bill',
    intro:
      'Distribution lives and dies on receivables. Not "the party owes ₹4.2 lakh" — but which bill, how old, against which payment, and whether they are past their limit before you load the next truck.',
    challenges: [
      {
        title: 'Outstanding by party is not enough',
        body: 'A lump-sum balance tells you nothing about which invoice is 90 days late or which payment was against which bill.',
      },
      {
        title: 'Credit decisions made from memory',
        body: 'Whether a party is over their limit is usually known by whoever has been there longest — not by the software, and not at the counter.',
      },
      {
        title: 'Billing speed at the counter',
        body: 'A dispatch queue does not wait for a mouse. Every second per invoice multiplies across a day.',
      },
      {
        title: 'Stock split across godowns',
        body: 'Knowing total stock is easy. Knowing what is in which godown, right now, is what stops a promise you cannot keep.',
      },
    ],
    capabilities: [
      {
        title: 'Bill-by-bill tracking from day one',
        body: 'Every invoice becomes a bill; every receipt allocates against specific bills. Outstanding is per-bill and per-age, not a party-level lump sum — it was in the schema from the first migration, not bolted on.',
      },
      {
        title: 'Credit limit and credit days per party',
        body: 'Both live on the ledger master, so the terms you agreed are recorded where the party is, not in someone’s head.',
      },
      {
        title: 'Keyboard-driven billing',
        body: 'The entire app is operable without a mouse — function keys per module, Enter to advance, a command palette on Ctrl+K. Built for someone who bills all day, not someone demoing.',
      },
      {
        title: 'Multi-warehouse stock',
        body: 'Stock is tracked per warehouse with movements and valuation layers behind it, so the godown-wise position is a report rather than an estimate.',
      },
      {
        title: 'E-way bill and e-invoice',
        body: 'Generate the payloads straight from the voucher that created the movement, instead of re-typing an invoice into a portal.',
      },
      {
        title: 'Offline-first',
        body: 'The book is a local encrypted database. Dispatch does not stop because the internet did — cloud backup catches up when the line returns.',
      },
    ],
    highlights: [
      'Bill-by-bill outstanding',
      'Credit limit & days',
      'Multi-warehouse',
      'E-way bill',
      'Ageing reports',
      'Keyboard-first',
    ],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    tagline: 'Consumption, production and true cost of goods',
    icon: Factory,
    title: 'Accounting Software for Manufacturers',
    description:
      'Two-legged stock journals for consumption and production, job work tracking, FIFO or weighted-average valuation per item, perpetual inventory and COGS. GST-ready and offline-first.',
    headline: 'Raw material in, finished goods out —',
    highlight: 'costed properly',
    intro:
      'A manufacturing book has to answer one hard question honestly: what did this actually cost to make? That means consumption and production as real stock events, and a valuation method you chose rather than inherited.',
    challenges: [
      {
        title: 'Production is not a purchase',
        body: 'Finished goods appearing out of nowhere, or raw material written off as an expense, both quietly corrupt the cost of what you sell.',
      },
      {
        title: 'Valuation method decided for you',
        body: 'Most packages pick FIFO or weighted-average globally and permanently. Different items genuinely need different answers.',
      },
      {
        title: 'Work sent outside the factory',
        body: 'Sub-contracted processes leave your stock in someone else’s unit, still on your books and still your statutory exposure.',
      },
      {
        title: 'Cost known only at year end',
        body: 'If COGS is a closing exercise, every margin number you look at during the year is a guess.',
      },
    ],
    capabilities: [
      {
        title: 'Stock Journals with two-legged posting',
        body: 'Consumption and production are modelled as what they are: stock leaving one state and arriving in another, inside one voucher, without a fictional customer or supplier.',
      },
      {
        title: 'FIFO and weighted-average, per item',
        body: 'Set a company default and override it per item. Valuation layers are written on every inward movement even in weighted-average mode, so switching method later never needs a backfill.',
      },
      {
        title: 'Perpetual inventory and COGS',
        body: 'Cost of goods sold is posted as you go rather than reconstructed at year end, so margin is a number you can look at in month three.',
      },
      {
        title: 'Job work for sub-contracted processes',
        body: 'Track goods sent out for processing, the rate agreed per job worker, and the §143 return exposure — as reports, not reminders.',
      },
      {
        title: 'Multi-warehouse and internal movement',
        body: 'Move stock between stores, shop floor and finished-goods godowns as first-class movements with a full audit trail.',
      },
      {
        title: 'Immutable, auditable postings',
        body: 'Posted vouchers never mutate. Corrections happen through reversals, and every privileged action lands in a tamper-evident audit log.',
      },
    ],
    highlights: [
      'Stock Journals',
      'FIFO + weighted-average',
      'Perpetual COGS',
      'Job work',
      'Multi-warehouse',
      'Audit trail',
    ],
    scopeNote:
      'Acronix models consumption and production through stock journals, with valuation and COGS behind them. It does not currently ship a bill-of-materials or production-planning module — if your process depends on multi-level BOM explosion, that is not here yet.',
  },
  {
    slug: 'retail',
    name: 'Retail',
    tagline: 'Counter-speed billing that never waits for the internet',
    icon: Store,
    title: 'Accounting & GST Billing Software for Retail Shops',
    description:
      'Keyboard-speed GST billing, live stock, day book and cash/bank position — running offline on the shop computer, with your books encrypted on your own machine.',
    headline: 'Billing at the speed of',
    highlight: 'a queue at the counter',
    intro:
      'A retail counter has a very short patience budget. The software should disappear: type, Enter, print, next. And it should never, ever stop because a broadband line went down.',
    challenges: [
      {
        title: 'Cloud software at a counter',
        body: 'A browser-based till is exactly as reliable as your internet connection, which is to say: not, on the day it matters.',
      },
      {
        title: 'Mouse-driven billing',
        body: 'Every click is a second, every second is a queue. Software designed for demos is not designed for a Saturday evening.',
      },
      {
        title: 'Stock that drifts from reality',
        body: 'If billing and stock are not the same event, the shelf and the report disagree within a week.',
      },
      {
        title: 'GST as a month-end panic',
        body: 'Returns should fall out of the billing you already did, not become a separate re-entry exercise on the 10th.',
      },
    ],
    capabilities: [
      {
        title: 'Fully keyboard-driven',
        body: 'Function keys per module, Enter to advance, Esc to back out, Ctrl+K for anything. The app targets sub-200ms on common actions and is designed to be run without touching a mouse.',
      },
      {
        title: 'Offline-first by architecture',
        body: 'The book is a local encrypted SQLite database, not a web session. Billing continues through an outage; optional cloud backup syncs when the connection returns.',
      },
      {
        title: 'Billing and stock are one event',
        body: 'An invoice moves stock, posts the ledger and creates the bill in a single transaction — whole or nothing. The shelf and the report cannot drift apart.',
      },
      {
        title: 'GST returns from the vouchers you already raised',
        body: 'GSTR-1, GSTR-3B, HSN summaries and e-invoice all read the same vouchers. No parallel data entry.',
      },
      {
        title: 'Day book and cash position',
        body: 'What came in, what went out, what is in the drawer and the bank — as reports that aggregate in SQL, so they stay instant as the years pile up.',
      },
      {
        title: 'Encrypted on your own machine',
        body: 'The database file is SQLCipher-encrypted. Copied to a pen drive, it is unreadable bytes — your turnover is not casually browsable by whoever borrows the PC.',
      },
    ],
    highlights: [
      'Keyboard-first',
      'Offline-first',
      'Live stock',
      'GSTR-1 & 3B',
      'Day book',
      'Encrypted books',
    ],
  },
  {
    slug: 'services',
    name: 'Services',
    tagline: 'GST on services without inventory getting in the way',
    icon: Briefcase,
    title: 'Accounting Software for Service Businesses',
    description:
      'Service billing, receivables and the full GST suite without an inventory module you never asked for. Offline-first, encrypted, and keyboard-driven.',
    headline: 'Service billing without',
    highlight: 'the inventory baggage',
    intro:
      'A consultancy, an agency or a repair business does not have a godown. Most accounting packages still make you walk through stock fields to raise an invoice for work you did with your hands and your time.',
    challenges: [
      {
        title: 'Inventory you do not have',
        body: 'Forms built around stock make service billing an exercise in skipping fields and leaving them blank.',
      },
      {
        title: 'Receivables are the whole business',
        body: 'When there is no stock to sell, cash flow is entirely about which invoice got paid and which did not.',
      },
      {
        title: 'GST on services still applies',
        body: 'Place of supply, reverse charge and returns do not get simpler just because nothing moved on a truck.',
      },
    ],
    capabilities: [
      {
        title: 'Service items are first-class',
        body: 'One unified item master with a stock flag. Turn it off and the item behaves as a service: no quantity tracking, no valuation, no warehouse — the form stops asking.',
      },
      {
        title: 'Bill-by-bill receivables',
        body: 'Every invoice is a bill; every receipt allocates against specific bills. Ageing and outstanding are per-invoice, which is exactly the view a service business needs.',
      },
      {
        title: 'The full GST suite',
        body: 'GSTR-1, GSTR-3B, e-invoicing and tax registers work identically for services — driven by the same vouchers, with tax categories per item.',
      },
      {
        title: 'Real financial reports',
        body: 'Trial Balance, P&L, Balance Sheet and Cash Flow, aggregated in SQL and exportable to PDF or Excel.',
      },
      {
        title: 'Multi-company from day one',
        body: 'Run several entities from one install with data separated by company and access governed by role — useful when the practice and the trading arm are different books.',
      },
    ],
    highlights: [
      'Service items',
      'Bill-by-bill receivables',
      'GSTR-1 & 3B',
      'Financial reports',
      'Multi-company',
      'Role-based access',
    ],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    tagline: 'GST-clean books behind your online selling',
    icon: ShoppingCart,
    title: 'Accounting Software for E-commerce Sellers',
    description:
      'Keep GST-compliant, audit-ready books behind your online sales — inventory, HSN-wise summaries, GSTR-1 and GSTR-3B, encrypted locally. Marketplace settlement reconciliation is not included.',
    headline: 'The books behind',
    highlight: 'the storefront',
    intro:
      'Selling online does not change what the department expects of your books. Acronix keeps the accounting, inventory and GST side clean and auditable — and is candid about the part it does not do.',
    challenges: [
      {
        title: 'Volume makes small errors expensive',
        body: 'Hundreds of small orders means an HSN or rate mistake replicates before anybody notices.',
      },
      {
        title: 'Stock across channels',
        body: 'What you can promise online depends on what is actually on the shelf, in the right place.',
      },
      {
        title: 'Returns are ordinary, not exceptional',
        body: 'Credit notes are a routine daily event rather than a rare correction, and the books have to absorb them cleanly.',
      },
    ],
    capabilities: [
      {
        title: 'HSN-wise summaries and rate discipline',
        body: 'Tax categories live on the item master, so the rate travels with the product instead of being re-decided per invoice. HSN summaries come out of the same data.',
      },
      {
        title: 'Credit notes as a first-class voucher',
        body: 'Returns post through the same engine as sales, reversing stock and ledger correctly rather than being patched with a journal.',
      },
      {
        title: 'Multi-warehouse inventory',
        body: 'Track stock per location with proper movements and valuation behind it.',
      },
      {
        title: 'GSTR-1 and GSTR-3B',
        body: 'Returns are generated from your vouchers, with the exports you need for the portal.',
      },
    ],
    highlights: ['HSN summaries', 'Credit notes', 'Multi-warehouse', 'GSTR-1 & 3B', 'Encrypted books'],
    scopeNote:
      'Being straight with you: Acronix does not integrate with Amazon, Flipkart or any marketplace, and does not reconcile settlement reports. If automated marketplace payout reconciliation is your main problem, this is not the tool for that job — it is the tool for keeping the resulting books correct.',
  },
  {
    slug: 'education',
    name: 'Education',
    tagline: 'Fees, expenses and audit-ready books for a school',
    icon: GraduationCap,
    title: 'Accounting Software for Schools & Institutes',
    description:
      'Run a school or institute’s books on a proper double-entry ledger — fee receipts, expense heads, bill-by-bill outstanding, role-based access and audit trail. No student-information or fee-management module.',
    headline: 'A school’s books,',
    highlight: 'kept properly',
    intro:
      'An institute’s accounting is not exotic: money comes in from families, goes out to staff and suppliers, and an auditor eventually wants to see all of it reconcile. What it does need is rigour — and access control, because fee data is sensitive.',
    challenges: [
      {
        title: 'Receipts scattered across registers',
        body: 'Collections recorded in books, spreadsheets and someone’s phone rarely agree at audit time.',
      },
      {
        title: 'Outstanding nobody can total',
        body: 'Knowing what is still due, against which receipt, is the single most-asked question in a school office.',
      },
      {
        title: 'Sensitive data on a shared computer',
        body: 'Fee ledgers sit on an office PC that several people use, and the file is usually readable by anyone who can copy it.',
      },
    ],
    capabilities: [
      {
        title: 'Receipts against bills',
        body: 'Every receipt allocates against specific outstanding bills, so "what is still due" is a report rather than an argument.',
      },
      {
        title: 'Role-based access control',
        body: 'Five roles from Viewer to Owner. An office clerk can record receipts without being able to void them or edit masters — enforced in the backend, not just hidden in the UI.',
      },
      {
        title: 'Encrypted books and a tamper-evident audit log',
        body: 'The database is encrypted on disk, and privileged actions are written to a hash-chained audit log that makes out-of-app edits detectable.',
      },
      {
        title: 'Real financial statements',
        body: 'Trial Balance, Income & Expenditure via P&L, Balance Sheet and Cash Flow — exportable for the auditor.',
      },
    ],
    highlights: ['Receipts & outstanding', 'Role-based access', 'Encrypted books', 'Audit log', 'Financial statements'],
    scopeNote:
      'Scope, stated plainly: this is an accounting system, not a school-management system. There is no student information module, no fee-structure builder, no attendance and no report cards. Students and parents are ledger accounts, and fees are receipts against bills. If you need an SIS, use one alongside Acronix — not instead of it.',
  },
];

export const industryBySlug = new Map(industries.map((i) => [i.slug, i]));
