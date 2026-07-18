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
//
// These pages don't enumerate what's missing — that's a marketing call, and a
// site is not obliged to list its own gaps. What it IS obliged to do is not
// assert what isn't there. So: if a vertical has no specific support, write
// about the general capability that genuinely serves it (GST, stock, credit,
// reports) and stay silent on the rest. Never bridge the gap with a claim.
// Verified absent as of now — do NOT write these into any entry:
// serial/IMEI tracking, typed size/colour variant matrix, batch/expiry on the
// sale invoice (it exists on stock journals, challans and the Stock Ledger
// only), expiry-alert reports, price lists / quantity slabs / scheme engines,
// route or van sales, bill-of-materials, POS hardware or scanner integration,
// jewellery weight/purity, marketplace settlement reconciliation.

import type { LucideIcon } from 'lucide-react';
import {
  BookMarked,
  Briefcase,
  Factory,
  FlaskConical,
  GraduationCap,
  Package,
  PenTool,
  Shirt,
  ShoppingBasket,
  ShoppingCart,
  Sofa,
  Store,
  Truck,
  Wrench,
  Zap,
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
   * Per-trade FAQ. Optional while the 20 entries are enriched one at a time —
   * the template renders the section only when present, so a not-yet-written
   * entry still builds. Rendered with the shared Faq component, which emits
   * FAQPage JSON-LD, so each answer is also a rich-result candidate.
   */
  faqs?: { question: string; answer: string }[];
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
    faqs: [
      {
        question: 'Can Acronix track greige sent to a processor and returned as finished fabric?',
        answer:
          'Yes. A delivery challan moves the goods out without posting a sale or touching your GST turnover, and the material stays on your books as your stock while it sits at the dyer or printer. When it comes back you receive it in, and the Party Stock report shows, at any moment, exactly what is lying with which processor versus what is in your own godown.',
      },
      {
        question: 'Does it handle the §143 job-work return window?',
        answer:
          'The Job Work Register tracks every job-work movement against its statutory return window, so your outstanding exposure per job worker is a report you open rather than a total you reconstruct from a notebook. You see what has crossed the window and what is approaching it.',
      },
      {
        question: 'Every processor charges a different rate per process and quality. Is that painful?',
        answer:
          'No. You keep a rate per job worker and process, and the purchase form pulls the right rate in automatically, so the voucher matches the rate card without re-keying it on every entry.',
      },
      {
        question: 'Can it bill in metres and also track in than or thaan?',
        answer:
          'Items carry a unit of measure and Acronix keeps quantity and value in that unit through stock movements and reports. Set the unit that matches how you actually trade the cloth.',
      },
      {
        question: 'Is GST — GSTR-1, e-invoice, e-way bill — included for a textile trader?',
        answer:
          'Yes, in the single plan. HSN-wise summaries, GSTR-1 and GSTR-3B, e-invoice (IRN) and e-way bill all work from the same vouchers you already entered, with nothing re-keyed into a separate return tool.',
      },
      {
        question: 'Does it work offline in a Surat market where the connection drops?',
        answer:
          'Acronix is offline-first: the app runs entirely on your machine and never needs the internet to bill, post or report. Cloud sync is an optional backup you switch on, not a requirement — a dropped line never stops a dispatch.',
      },
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
  },
  {
    slug: 'grocery',
    name: 'Grocery & Kirana',
    tagline: 'Counter billing, khata credit and thin-margin stock',
    icon: ShoppingBasket,
    title: 'Billing & Accounting Software for Grocery and Kirana Stores',
    description:
      'Fast GST billing for a kirana counter, khata credit tracked bill-by-bill, live stock across shop and godown, and books that keep working when the line drops. Honest about what it does not do on expiry.',
    headline: 'Margins this thin leave',
    highlight: 'no room for a guess',
    intro:
      'A kirana shop makes a few rupees on a packet and makes it back on volume. That means the counter has to be fast, the khata has to be exact, and the difference between the purchase rate and today’s selling rate has to be visible — not remembered.',
    challenges: [
      {
        title: 'The khata is the real ledger',
        body: 'Regulars buy through the month and settle in parts. A single running balance hides which month’s purchases are still unpaid and which were already cleared.',
      },
      {
        title: 'Rates move under you',
        body: 'Oil, dal and atta land at a different cost each time. If the book values every lot at whatever you paid last, the margin you think you made is fiction.',
      },
      {
        title: 'Shelf, back room, godown',
        body: 'Stock is split across places within one shop. Total quantity is easy; knowing whether the case is behind the counter or two streets away is what saves the trip.',
      },
      {
        title: 'Shelf life you chase by hand',
        body: 'Perishables and dated packets have to move before they turn. Most shops track this by walking the shelf, and the software is no help at all.',
      },
    ],
    capabilities: [
      {
        title: 'Khata as bill-by-bill outstanding',
        body: 'Every credit sale creates a bill; a part-payment allocates against the specific bills it clears. So "kitna baaki hai" answers with a list of dates and amounts, not one number.',
      },
      {
        title: 'Weighted-average costing that keeps up',
        body: 'Set weighted-average as the company default and each new inward lot re-averages the cost automatically — so margin reflects what the stock actually cost, not the last rate you happened to type.',
      },
      {
        title: 'Credit limit and credit days per customer',
        body: 'Both sit on the ledger master. The terms you agreed with a party are recorded where the party is, instead of living in your head and being renegotiated at the counter.',
      },
      {
        title: 'Billing without a mouse, without the internet',
        body: 'Type, Enter, print, next — the whole app is keyboard-driven, and the book is a local encrypted database. A broadband outage is not a shop closure.',
      },
      {
        title: 'Reorder levels on the item master',
        body: 'Minimum, maximum and reorder quantities are fields on each item, so the list of what has dropped below its level is data you can read rather than a shelf you have to walk.',
      },
      {
        title: 'Batch and expiry on stock movements',
        body: 'Stock journals, delivery challans and the Stock Ledger carry batch number, manufacture date and expiry date, so a lot you took in can be traced through the godown.',
      },
    ],
    highlights: [
      'Bill-by-bill khata',
      'Weighted-average cost',
      'Credit limit & days',
      'Reorder levels',
      'Offline-first',
      'Keyboard-first',
    ],
  },
  {
    slug: 'stationery',
    name: 'Stationery & Office Supplies',
    tagline: 'Thousands of small SKUs, school seasons and office credit',
    icon: PenTool,
    title: 'Accounting Software for Stationery & Office Supply Dealers',
    description:
      'Handle a few thousand low-value SKUs, seasonal buying spikes and corporate accounts on credit — with GST-ready billing, multi-warehouse stock and bill-by-bill outstanding. Offline-first and keyboard-driven.',
    headline: 'Four thousand SKUs, and',
    highlight: 'twelve rupees each',
    intro:
      'Stationery is the item-count problem in its purest form. No single line is worth much, so nobody wants to spend a minute on it — but there are thousands of them, they sell in dozens and reams and boxes, and the entire year’s cash flow is decided in two months around admissions.',
    challenges: [
      {
        title: 'The item master is the business',
        body: 'Find the right item out of thousands, fast, or the counter stops. A slow search on an item list is not a minor annoyance here — it is the bottleneck.',
      },
      {
        title: 'Season concentrates the risk',
        body: 'Buy heavy before school reopens and you carry the cost of everything you misjudged for a year. The buying decision is made months before the sale.',
      },
      {
        title: 'Two very different customers',
        body: 'A walk-in pays now; a school or an office buys on a purchase order and pays in forty-five days. One book has to serve both without one distorting the other.',
      },
      {
        title: 'Rates are not uniform',
        body: 'Notebooks, pens, files and printers do not all sit at the same GST rate. Deciding tax per invoice, per line, is how a return goes wrong.',
      },
    ],
    capabilities: [
      {
        title: 'An item master built for volume',
        body: 'SKU, barcode and alias fields on every item, with lookups going through indexed SQLite queries on the local machine — the app targets sub-50ms on hot-path queries, so search does not degrade as the catalogue grows.',
      },
      {
        title: 'Tax category travels with the item',
        body: 'The GST rate and HSN live on the item master, not in the biller’s memory. A mixed invoice of notebooks and printers taxes each line correctly, and the HSN-wise summary falls out of the same data.',
      },
      {
        title: 'Corporate accounts on real terms',
        body: 'Credit limit and credit days per party, bill-by-bill allocation of every receipt, and ageing that tells you which school invoice is past forty-five days rather than what the school owes in total.',
      },
      {
        title: 'Stock split across shop and store',
        body: 'Multi-warehouse tracking with proper movements behind it, so the season stock sitting in the back store is a position you can read, not an estimate.',
      },
      {
        title: 'Reorder, minimum and maximum levels',
        body: 'Set them per item so the re-buy decision is anchored to a number you chose in a calm month, not to a gap you noticed on a busy one.',
      },
      {
        title: 'GST returns without re-entry',
        body: 'GSTR-1, GSTR-3B and e-invoice all read the vouchers you already raised at the counter.',
      },
    ],
    highlights: [
      'Fast item search',
      'Per-item tax category',
      'Credit limit & days',
      'Multi-warehouse',
      'Reorder levels',
      'GSTR-1 & 3B',
    ],
  },
  {
    slug: 'furniture',
    name: 'Furniture & Home Furnishing',
    tagline: 'Bulky stock, long delivery gaps and showroom-to-godown moves',
    icon: Sofa,
    title: 'Accounting Software for Furniture & Home Furnishing Dealers',
    description:
      'Delivery challans for goods that leave weeks after the sale, multi-warehouse stock across showroom and godown, e-way bills for bulky dispatch, and bill-by-bill outstanding. GST-ready, offline-first.',
    headline: 'Sold today,',
    highlight: 'delivered in three weeks',
    intro:
      'Furniture breaks the assumption that money and goods move together. The customer pays an advance in the showroom, the sofa is in a godown across town, delivery is next month, and something in between has to hold the promise without corrupting the books.',
    challenges: [
      {
        title: 'The sale and the dispatch are different days',
        body: 'A piece can be paid for, reserved, and still physically sitting in the godown for weeks. Booking it as gone is wrong; pretending it is available is worse.',
      },
      {
        title: 'The showroom piece is not for sale',
        body: 'Display stock is real stock in the wrong state. It shows in the total and disappoints the buyer who wanted the one in the box.',
      },
      {
        title: 'Every dispatch is a transport event',
        body: 'Bulky goods mean a vehicle, a value threshold and a document. The paperwork has real weight in this trade, not just a compliance footnote.',
      },
      {
        title: 'Advances against nothing yet',
        body: 'Part payment taken before delivery has to sit somewhere sensible and get applied to the right invoice when the invoice finally exists.',
      },
    ],
    capabilities: [
      {
        title: 'Delivery challans that move goods, not the GL',
        body: 'A challan moves stock without posting a single ledger entry — so a piece that has physically left for a customer’s house before the invoice is raised is accounted for honestly. Convert it to a Sale with one key when it becomes one.',
      },
      {
        title: 'Showroom and godown as separate warehouses',
        body: 'Multi-warehouse tracking with real movements behind it. Display stock lives in its own location, so the sellable position is the position you can actually sell.',
      },
      {
        title: 'E-way bill straight from the voucher',
        body: 'The payload is generated from the voucher that created the movement, rather than the invoice being retyped into a portal by whoever is free.',
      },
      {
        title: 'Advances allocated bill-by-bill',
        body: 'Every receipt allocates against specific bills, so a booking advance lands on the invoice it belongs to instead of floating as an unexplained party credit.',
      },
      {
        title: 'FIFO or weighted-average, per item',
        body: 'A slow-moving high-value piece and a fast-moving accessory do not need the same valuation logic. Set a company default and override per item.',
      },
      {
        title: 'Stock journals for internal movement',
        body: 'Godown to showroom, showroom to a customer’s trial and back — two-legged postings, no fictional customer invented to explain the move.',
      },
    ],
    highlights: [
      'Delivery challans',
      'Multi-warehouse',
      'E-way bill',
      'Bill-by-bill advances',
      'FIFO + weighted-average',
      'Stock journals',
    ],
  },
  {
    slug: 'electricals',
    name: 'Electricals & Hardware',
    tagline: 'Deep catalogues, MRP pricing and contractor credit',
    icon: Zap,
    title: 'Accounting Software for Electrical & Hardware Dealers',
    description:
      'GST billing across a deep multi-brand catalogue, bill-by-bill contractor credit, multi-warehouse stock and e-way bills. Offline-first and keyboard-driven. No serial-number or warranty tracking — stated up front.',
    headline: 'A counter that sells',
    highlight: 'nine paise and nine thousand',
    intro:
      'An electrical and hardware shop sells a screw and a switchgear panel off the same counter, to a walk-in and to a contractor who will pay after the site bills. The catalogue is deep, the brands overlap, and the receivable is where the money actually is.',
    challenges: [
      {
        title: 'The same thing from four brands',
        body: 'A 16A socket exists five times over with different makes and rates. Picking the wrong line is a margin error nobody catches until stock is counted.',
      },
      {
        title: 'Contractors pay when the site pays',
        body: 'Credit runs long and is drawn down across many small purchases. A party-level balance tells you nothing about which month’s supply is still unrecovered.',
      },
      {
        title: 'Rates hang off MRP and discount',
        body: 'Selling is often a discount off a printed price rather than a rate you set, and the discount depends on who is standing there.',
      },
      {
        title: 'Stock across shop and store',
        body: 'Wire, conduit and heavy items are not kept at the counter. What you can hand over now and what you can hand over tomorrow are different questions.',
      },
    ],
    capabilities: [
      {
        title: 'Bill-by-bill contractor outstanding',
        body: 'Every supply becomes a bill; every part-recovery allocates against specific bills. Ageing shows what is ninety days out per invoice — which is the conversation you need to have, backed by a list.',
      },
      {
        title: 'Credit limit enforced where it is recorded',
        body: 'Credit limit and credit days live on the ledger master, so the terms are a property of the party rather than a judgement call made at the counter by whoever is free.',
      },
      {
        title: 'Catalogue that stays fast',
        body: 'SKU, barcode and alias fields per item over indexed local queries — brand-level depth does not turn item lookup into a wait.',
      },
      {
        title: 'HSN and rate on the item, not the invoice',
        body: 'Mixed-rate invoices are routine here. Tax category and HSN sit on the item master so each line is taxed correctly and the HSN summary comes out clean.',
      },
      {
        title: 'Multi-warehouse and e-way bill',
        body: 'Shop and store tracked separately with real movements, and e-way bill payloads generated from the voucher that created the dispatch.',
      },
      {
        title: 'FIFO where cost actually moves',
        body: 'Wire and metal costs move with the market. Set FIFO on those items and weighted-average elsewhere — the choice is per item, not a global switch you inherit.',
      },
    ],
    highlights: [
      'Bill-by-bill outstanding',
      'Credit limit & days',
      'Fast catalogue search',
      'Multi-warehouse',
      'E-way bill',
      'FIFO + weighted-average',
    ],
  },
  {
    slug: 'auto-parts',
    name: 'Auto Parts & Spares',
    tagline: 'Part-number lookup, counter speed and distributor returns',
    icon: Wrench,
    title: 'Accounting Software for Auto Parts & Spares Dealers',
    description:
      'Fast part lookup by SKU, barcode or alias, bill-by-bill garage credit, multi-warehouse stock and GST-ready billing — offline-first. No fitment catalogue or supersession chains; that is stated plainly.',
    headline: 'The customer is a mechanic',
    highlight: 'holding the old part',
    intro:
      'Spares is a lookup business. Someone walks in with a broken component and a vehicle waiting on a lift, and the only thing that matters for the next ninety seconds is whether you can find the right part and know it is in the rack. Everything else in the book is downstream of that.',
    challenges: [
      {
        title: 'Everything is a number nobody remembers',
        body: 'Parts are identified by long alphanumeric codes that differ per manufacturer. Search is not a feature here; it is the transaction.',
      },
      {
        title: 'Slow movers eat the capital',
        body: 'Breadth is the whole proposition, so you stock things that sell twice a year. Knowing what has not moved is what stops the shelf becoming a museum.',
      },
      {
        title: 'Garages buy daily, settle monthly',
        body: 'A workshop takes ten small items over four weeks and pays once. Reconstructing what that payment covered is a monthly argument.',
      },
      {
        title: 'Wrong part goes back',
        body: 'Returns to the distributor and from the mechanic are normal traffic, not exceptions, and both legs have to land in the books correctly.',
      },
    ],
    capabilities: [
      {
        title: 'Three ways to find one part',
        body: 'SKU, barcode and alias fields on the item master, queried against a local indexed SQLite database. No round trip to a server while the mechanic waits.',
      },
      {
        title: 'Credit and debit notes as real vouchers',
        body: 'Returns post through the same engine as the sale — stock and ledger both reverse properly, instead of being patched afterwards with a journal that nobody can explain at audit.',
      },
      {
        title: 'Bill-by-bill garage accounts',
        body: 'Each supply is a bill; the monthly settlement allocates across the specific bills it clears. The month-end conversation becomes a printed list rather than a memory test.',
      },
      {
        title: 'Stock summary that exposes dead lines',
        body: 'Stock summary and ledger statement reports aggregate in SQL, so the position across a wide catalogue stays instant as years of movement pile up behind it.',
      },
      {
        title: 'Rack and godown tracked separately',
        body: 'Multi-warehouse stock with real movements, so "we have it, but not here" is something the software can tell you.',
      },
      {
        title: 'Offline at the counter',
        body: 'The book is a local encrypted file. The lookup that decides your sale does not depend on a broadband line staying up.',
      },
    ],
    highlights: [
      'SKU / barcode / alias search',
      'Credit & debit notes',
      'Bill-by-bill outstanding',
      'Stock summary',
      'Multi-warehouse',
      'Offline-first',
    ],
  },
  {
    slug: 'chemicals',
    name: 'Chemicals & Industrial Supplies',
    tagline: 'Batch traceability, drum-level stock and industrial credit',
    icon: FlaskConical,
    title: 'Accounting Software for Chemical & Industrial Supply Traders',
    description:
      'Batch-wise stock movements, multi-warehouse tracking, e-way bills for every dispatch and bill-by-bill industrial credit — on an encrypted, offline-first book. Clear about where batch data stops.',
    headline: 'When a lot goes wrong,',
    highlight: 'you need to know where it went',
    intro:
      'Chemical trading carries a liability that most trades do not. A lot that fails is not a return — it is a recall conversation with a factory buyer, and the first question is which drums from that batch went where. The books have to be able to answer.',
    challenges: [
      {
        title: 'The batch is the unit that matters',
        body: 'Two drums of the same product from different lots are not interchangeable to the buyer. Stock tracked only by item name loses the one attribute with consequences.',
      },
      {
        title: 'Movement is regulated and documented',
        body: 'Industrial dispatch means vehicles, values and paperwork that has to exist before the truck leaves — not reconstructed the following week.',
      },
      {
        title: 'Factory buyers pay on their cycle',
        body: 'Terms are long and negotiated per account. Exposure to one buyer builds quietly across invoices until it is uncomfortable.',
      },
      {
        title: 'Cost moves with the market',
        body: 'Input prices swing hard. Valuing this month’s stock at an average of the last two years is a way of not knowing your margin.',
      },
    ],
    capabilities: [
      {
        title: 'Batch, manufacture and expiry on stock movements',
        body: 'Stock journals and delivery challans capture batch number, manufacture date and expiry date, and the Stock Ledger shows them — so tracing what came in under a lot is real work the software does, not a register you keep alongside it.',
      },
      {
        title: 'FIFO where it is the honest answer',
        body: 'Set FIFO per item so consumption follows the lots in order rather than dissolving into an average. Valuation layers are written on every inward movement regardless of mode, so switching method later needs no backfill.',
      },
      {
        title: 'Multi-warehouse across yard and store',
        body: 'Stock tracked per location with proper movements and valuation behind it, so a segregated store is a real position rather than a note on a wall.',
      },
      {
        title: 'E-way bill and e-invoice from the voucher',
        body: 'Generated from the same voucher that created the dispatch, so the document and the movement cannot disagree.',
      },
      {
        title: 'Bill-by-bill exposure per buyer',
        body: 'Credit limit and credit days on the ledger master, ageing per invoice, and receipts allocated against specific bills. Exposure to a large account is a report, not a feeling.',
      },
      {
        title: 'Immutable postings and a tamper-evident audit log',
        body: 'Posted vouchers never mutate; corrections go through reversals. Privileged actions land in a hash-chained audit log, which makes an out-of-app edit to the file detectable.',
      },
    ],
    highlights: [
      'Batch on stock movements',
      'FIFO valuation',
      'Multi-warehouse',
      'E-way bill',
      'Bill-by-bill outstanding',
      'Audit log',
    ],
  },
  {
    slug: 'packaging',
    name: 'Packaging & Paper',
    tagline: 'Spec-driven items, job orders and conversion stock',
    icon: Package,
    title: 'Accounting Software for Packaging & Paper Traders',
    description:
      'Track reels and converted stock across warehouses, bill customers on GST-ready invoices, run bill-by-bill outstanding and cost conversion through stock journals with FIFO or weighted-average valuation.',
    headline: 'The same board becomes',
    highlight: 'a different item downstream',
    intro:
      'Packaging is a conversion trade wearing a trading trade’s clothes. Paper arrives as a reel and leaves as boxes cut to a buyer’s size, and the accounting question underneath is the awkward one: what did the thing you shipped actually cost to make from the thing you bought?',
    challenges: [
      {
        title: 'Input and output are not the same item',
        body: 'A reel consumed and cartons produced is a real stock event. Software that only knows purchase and sale forces you to fake one of them.',
      },
      {
        title: 'Every buyer wants their own size',
        body: 'Specification is the product. A box is defined by dimensions, ply and board grade, and no two customers order quite the same thing.',
      },
      {
        title: 'Cost is decided by the input price',
        body: 'Kraft prices move. If the book cannot say what the reel behind this month’s dispatch cost, the quote you gave was a hope.',
      },
      {
        title: 'Bulk goods, bulk paperwork',
        body: 'Volume dispatch means vehicles and documents on nearly every outward movement.',
      },
    ],
    capabilities: [
      {
        title: 'Conversion as a two-legged stock journal',
        body: 'Reels out, converted stock in — one voucher, both legs, no invented customer or supplier to explain where the paper went.',
      },
      {
        title: 'Perpetual COGS instead of a year-end reveal',
        body: 'Cost of goods sold posts as you go rather than being reconstructed at closing, so the margin on a job is a number you can look at in the month you did it.',
      },
      {
        title: 'FIFO or weighted-average, per item',
        body: 'Board where the input price swings can run FIFO while consumables stay on weighted-average. Company default, per-item override.',
      },
      {
        title: 'Work sent to a converter',
        body: 'Job work tracking covers goods sent out for processing — the rate agreed per job worker and the §143 return exposure, as reports rather than reminders.',
      },
      {
        title: 'Multi-warehouse for raw and finished',
        body: 'Reel store and finished-goods godown tracked separately, with movements and valuation behind each.',
      },
      {
        title: 'E-way bill from the dispatch voucher',
        body: 'Generated off the voucher that moved the goods, so the document matches the movement by construction.',
      },
    ],
    highlights: [
      'Stock journals',
      'Perpetual COGS',
      'FIFO + weighted-average',
      'Job work (§143)',
      'Multi-warehouse',
      'E-way bill',
    ],
  },
  {
    slug: 'books',
    name: 'Books & Publishing',
    tagline: 'Title-level stock, distributor credit and return-heavy trade',
    icon: BookMarked,
    title: 'Accounting Software for Booksellers & Publishers',
    description:
      'Title-wise stock across shop and godown, distributor credit tracked bill-by-bill, returns as first-class credit notes, and mixed-rate GST handled per item. Offline-first, encrypted, keyboard-driven.',
    headline: 'A trade where the stock',
    highlight: 'comes back',
    intro:
      'Bookselling has an unusual shape: titles are unique, most of them sell in ones, and a large share of what you take in goes back to the distributor unsold. The books have to handle a return flow that other trades treat as an exception and this one treats as Tuesday.',
    challenges: [
      {
        title: 'Every title is its own SKU',
        body: 'There is no such thing as a bulk line. A shop with ten thousand titles has ten thousand items, most of which move once or twice a year.',
      },
      {
        title: 'Returns are the business model',
        body: 'Unsold stock going back is planned, not a failure. If a return is an awkward correction in the software, the books drift from the shelf every month.',
      },
      {
        title: 'What you sell is not all books',
        body: 'Printed titles sit alongside stationery, bags and gifts on the same bill, and those do not carry the same tax treatment.',
      },
      {
        title: 'Distributor accounts run long',
        body: 'Supply comes in through the year, returns go back through the year, and the net position with each distributor is genuinely hard to state.',
      },
    ],
    capabilities: [
      {
        title: 'Credit and debit notes through the same engine',
        body: 'A return posts as a real voucher: stock comes back, the ledger reverses, the bill adjusts. No journal entry invented afterwards to make a number agree.',
      },
      {
        title: 'Per-item tax category on a mixed bill',
        body: 'Tax category and HSN live on the item master, so a bill carrying a title and a notebook taxes each line on its own terms and the HSN-wise summary reflects it.',
      },
      {
        title: 'Bill-by-bill net position per distributor',
        body: 'Every supply is a bill, every payment and every note allocates against specific bills — so the running argument about what is actually owed becomes a statement you can print.',
      },
      {
        title: 'Title-level lookup that stays fast',
        body: 'SKU, barcode and alias fields on the item master, queried locally against indexed SQLite, so a ten-thousand-title catalogue does not make search the bottleneck.',
      },
      {
        title: 'Shop and godown as separate warehouses',
        body: 'Multi-warehouse stock with real movements behind it, and delivery challans for moving titles out without posting a sale that has not happened.',
      },
      {
        title: 'Proper statements for the auditor',
        body: 'Trial Balance, P&L, Balance Sheet, day book and ledger statement, aggregated in SQL and exportable to PDF or Excel.',
      },
    ],
    highlights: [
      'Credit & debit notes',
      'Per-item tax category',
      'Bill-by-bill outstanding',
      'Fast title search',
      'Multi-warehouse',
      'Financial statements',
    ],
  },
];

export const industryBySlug = new Map(industries.map((i) => [i.slug, i]));
