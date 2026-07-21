// Single source of truth for site-wide constants. Keep the URLs here in sync
// with apps/desktop/electron-builder.yml (`publish.url`) and docs/release.md.

import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  BookText,
  CircleHelp,
  Download,
  History,
  Keyboard,
  LifeBuoy,
  Newspaper,
  Rocket,
  Settings2,
  Wrench,
} from 'lucide-react';
import { solutionBySlug, solutionGroups, solutions, type Solution } from './solutions';
import { industries } from './industries';

export const site = {
  name: 'Acronix Books',
  shortName: 'Acronix',
  /** Public production origin — used for canonical URLs, sitemap, OG tags. */
  url: 'https://acronixbooks.com',
  tagline: 'Modern ERP & Accounting for Indian business',
  description:
    'Acronix Books is a fast, offline-first ERP & accounting desktop app for Indian businesses of every size — GST-ready invoicing, inventory, vouchers, GSTR-1/3B, and encrypted cloud backup. Beat Tally on UX, beat Zoho on offline speed.',
  locale: 'en_IN',
  twitter: '@acronixbooks',
  email: 'support@acronixbooks.com',
  /**
   * Current shipped desktop version + its release date (YYYY-MM-DD). Derived at
   * build time from the update feed's latest.yml (see next.config.mjs) — every
   * surface that shows a version reads from here, so a production build tracks
   * the feed automatically. The literals are the offline/dev fallback; keep them
   * as the last-known-good value. Changelog notes stay hand-written in
   * content/releases.ts.
   */
  currentVersion: process.env.NEXT_PUBLIC_APP_VERSION ?? '0.1.0',
  currentReleaseDate: process.env.NEXT_PUBLIC_APP_RELEASE_DATE ?? '2026-06-24',
} as const;

/**
 * Company / legal identity used across support and policy pages. Update the
 * legal-entity name and address once the registered entity is finalised — the
 * policy pages read these so there's one place to change.
 */
export const company = {
  /** The owning company. Acronix Books is a product of Acronix. */
  legalName: 'Acronix',
  /** The product this site is about. */
  product: 'Acronix Books',
  /** Parent company website. */
  url: 'https://acronix.in',
  supportEmail: 'support@acronixbooks.com',
  /** Support phone. `tel` is the dial string; `display` is what a reader sees. */
  supportPhone: {
    tel: '+919625802906',
    display: '+91 96258 02906',
  },
  /** ISO date the current policy versions took effect. */
  policyEffectiveDate: '2026-07-01',
  jurisdiction: 'India',
  governingLawState: 'Gujarat, India',
  responseTime: 'within 1–2 business days',
} as const;

/**
 * Parent-company (Acronix) social profiles, mirrored from acronix.in and
 * surfaced in the site footer. Acronix Books has no separate accounts — these
 * are the canonical channels. `label` doubles as the icon key in the footer.
 */
export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/acronixsolutions' },
  { label: 'X', href: 'https://x.com/acronix_in' },
  { label: 'Instagram', href: 'https://www.instagram.com/acronix.in/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61588016175923' },
] as const;

/**
 * The auto-update feed root (electron-updater generic provider). The stable
 * installer link and the `latest.yml` manifest both live under here.
 * See docs/release.md.
 */
export const updateFeed = {
  base: 'https://acronixbooks.com/updates',
  manifest: 'https://acronixbooks.com/updates/latest.yml',
  windowsInstaller: 'https://acronixbooks.com/updates/AcronixBooks-Setup-latest.exe',
  // Linux ships two artifacts: a universal AppImage (primary — runs on most
  // distros, and the only one electron-updater can auto-update) and a .deb for
  // Debian/Ubuntu. These URLs are the contract the desktop electron-builder
  // `publish` config must match when the installer step uploads them.
  linuxAppImage: 'https://acronixbooks.com/updates/AcronixBooks-latest.AppImage',
  linuxDeb: 'https://acronixbooks.com/updates/AcronixBooks-latest.deb',
} as const;

/**
 * The commercial model. These numbers are ENFORCED BY THE SHIPPED APP — they
 * mirror `packages/shared/src/billing/contracts.ts` in the product repo
 * (`planSchema`, `TRIAL_DAYS`, `GRACE_DAYS`). If those change, change these in
 * the same breath: a pricing page that disagrees with the binary is a promise
 * the software then breaks.
 *
 * There is exactly ONE plan. The product repo's enum is `z.enum(['standard'])`
 * with the comment "Only one plan exists in v1" — so there are no Start/Smart/
 * Power-style editions to advertise, and we do not invent them.
 */
export const plan = {
  id: 'standard',
  name: 'Standard',
  /** Free, full-featured evaluation window for a new account. */
  trialDays: 14,
  /**
   * Extra days of FULL access after the trial/paid period ends — the client's
   * entitlement runs to `periodEnd + graceDays`. Only after that does the app
   * fall back to read-only. It never locks you out of your own books: the data
   * is local, and reading + exporting keep working indefinitely.
   */
  graceDays: 7,
  /**
   * The subscription price, EXCLUSIVE of GST. `null` renders an honest
   * "pricing to be announced"; a number publishes the plan. People make
   * purchasing decisions on this page — never put a speculative figure here.
   */
  price: 11999 as number | null,
  currency: 'INR',
  period: 'year',
  /**
   * GST is charged ON TOP of `price` (software is 18%). Buyers here are
   * GST-registered and claim input credit, so the page must show the tax
   * explicitly and the all-in figure — never bury it. The inclusive total is
   * derived (see priceInclusiveGst), never hardcoded, so it cannot drift.
   */
  gstPercent: 18,
} as const;

/** All-in price a buyer actually pays (price + GST), rounded to the rupee. */
export const priceInclusiveGst = (): number | null =>
  plan.price === null ? null : Math.round(plan.price * (1 + plan.gstPercent / 100));

export type Platform = 'windows' | 'mac' | 'linux' | 'unknown';

export interface DownloadTarget {
  platform: Platform;
  label: string;
  /** File-size hint shown under the button. */
  sizeHint: string;
  /** `null` when the artifact isn't built yet (Coming soon). */
  href: string | null;
  /** Optional second format for the same OS (e.g. Linux .deb under the AppImage). */
  altHref?: string | null;
  altLabel?: string;
  status: 'available' | 'coming-soon';
  note: string;
}

export const downloads: Record<Exclude<Platform, 'unknown'>, DownloadTarget> = {
  windows: {
    platform: 'windows',
    label: 'Windows',
    sizeHint: 'Windows 10 & 11 · 64-bit · ~80 MB',
    href: updateFeed.windowsInstaller,
    status: 'available',
    note: 'One-click installer. Auto-updates itself once installed.',
  },
  mac: {
    platform: 'mac',
    label: 'macOS',
    sizeHint: 'Apple Silicon & Intel',
    href: null,
    status: 'coming-soon',
    note: 'In the pipeline — leave your email to be notified at launch.',
  },
  linux: {
    platform: 'linux',
    label: 'Linux',
    sizeHint: 'AppImage · .deb · 64-bit',
    href: updateFeed.linuxAppImage,
    altHref: updateFeed.linuxDeb,
    altLabel: 'Download .deb (Debian / Ubuntu)',
    status: 'available',
    note: 'AppImage runs on most distributions and auto-updates itself; a .deb is provided for Debian and Ubuntu.',
  },
};

// ------------------------------------------------------------------ *
// Primary navigation — a data-driven mega-menu. The Header renders this
// generically (no per-item JSX), so a new top-level entry or menu link is a
// data change here, never a component change. The Solutions and Industries
// panels are derived from lib/solutions.ts and lib/industries.ts so the menu
// can never drift out of sync with the pages that actually exist.
// ------------------------------------------------------------------ */

/** A single leaf link inside a menu panel, footer column, or drawer section. */
export interface NavLink {
  label: string;
  href: string;
  /** One-line summary. Shown where the panel has room; omitted in the footer. */
  description?: string;
  /** Panel glyph. A component reference, not a string — keeps it type-safe. */
  icon?: LucideIcon;
}

/**
 * A labelled column of links inside a menu panel. The uppercase `label` is what
 * turns a flat list into something scannable — it is the whole point of v2.
 */
export interface NavGroup {
  label: string;
  links: NavLink[];
}

/**
 * A top-level nav entry. Either a plain link, or a menu that expands into a
 * panel on desktop and an accordion section on mobile.
 *   - `columns`: one column per group, divided by a rule (Solutions, GST,
 *     Resources).
 *   - `grid`: a single group laid out as a two-column icon grid (Industries).
 */
export type NavEntry =
  | { kind: 'link'; label: string; href: string }
  | {
      kind: 'menu';
      label: string;
      layout: 'columns' | 'grid';
      /** Which edge of the trigger the panel hangs from. */
      align: 'left' | 'right';
      /** The group's overview page — the "see all" link at the panel's foot. */
      overviewHref: string;
      overviewLabel: string;
      groups: NavGroup[];
    };

/** Every link in a menu, flattened — for active-state and mobile rendering. */
export const menuLinks = (entry: Extract<NavEntry, { kind: 'menu' }>): NavLink[] =>
  entry.groups.flatMap((g) => g.links);

const solutionLink = (s: Solution, withDescription = true): NavLink => ({
  label: s.name,
  href: `/solutions/${s.slug}/`,
  icon: s.icon,
  ...(withDescription ? { description: s.tagline } : {}),
});

const industryLinks: NavLink[] = industries.map((i) => ({
  label: i.name,
  href: `/industries/${i.slug}/`,
  description: i.tagline,
  icon: i.icon,
}));

/** Derived from `solutionGroups` — a regrouping in the data reshapes the panel. */
const solutionColumns: NavGroup[] = solutionGroups.map((group) => ({
  label: group,
  links: solutions.filter((s) => s.group === group).map((s) => solutionLink(s)),
}));

/**
 * The GST panel links ONLY to pages that already exist — the four GST-facing
 * solution pages and the two GST docs. We deliberately do not publish rate/HSN/
 * penalty reference tables: those are tax-compliance claims we cannot stand
 * behind, and a wrong one costs a reader real money.
 */
const gstSolutionSlugs = ['gst-billing', 'e-invoice', 'e-way-bill', 'gst-returns'];

const gstColumns: NavGroup[] = [
  {
    label: 'In Acronix',
    links: gstSolutionSlugs.flatMap((slug) => {
      const s = solutionBySlug.get(slug);
      return s ? [solutionLink(s, false)] : [];
    }),
  },
  {
    label: 'Guides',
    links: [
      { label: 'GST filing', href: '/docs/gst-filing/', icon: BookText },
      { label: 'Tax setup', href: '/docs/tax-setup/', icon: Settings2 },
    ],
  },
];

const resourceColumns: NavGroup[] = [
  {
    label: 'Documentation',
    links: [
      { label: 'All docs', href: '/docs/', icon: BookOpen },
      { label: 'Getting started', href: '/docs/getting-started/', icon: Rocket },
      { label: 'Keyboard shortcuts', href: '/docs/keyboard-shortcuts/', icon: Keyboard },
    ],
  },
  {
    label: 'Support',
    links: [
      { label: 'Help & support', href: '/support/', icon: LifeBuoy },
      { label: 'FAQ', href: '/docs/faq/', icon: CircleHelp },
      { label: 'Troubleshooting', href: '/docs/troubleshooting/', icon: Wrench },
    ],
  },
  {
    label: 'Product',
    links: [
      { label: 'Changelog', href: '/changelog/', icon: History },
      { label: 'Blog', href: '/blog/', icon: Newspaper },
      { label: 'Download', href: '/download/', icon: Download },
    ],
  },
];

const primary: NavEntry[] = [
  {
    kind: 'menu',
    label: 'Solutions',
    layout: 'columns',
    align: 'left',
    overviewHref: '/solutions/',
    // Counts are DERIVED, never typed — if a reader counts the links, the
    // number must match. Hardcoding it is how "7 industries" survives into a
    // release that ships 15. See CLAUDE.md §9.
    overviewLabel: `See all ${solutions.length} solutions`,
    groups: solutionColumns,
  },
  {
    kind: 'menu',
    label: 'Industries',
    layout: 'grid',
    align: 'left',
    overviewHref: '/industries/',
    overviewLabel: `See all ${industries.length} industries`,
    groups: [{ label: 'By industry', links: industryLinks }],
  },
  {
    kind: 'menu',
    label: 'GST',
    layout: 'columns',
    align: 'left',
    overviewHref: '/solutions/gst-billing/',
    overviewLabel: 'GST billing & invoicing',
    groups: gstColumns,
  },
  { kind: 'link', label: 'Pricing', href: '/pricing/' },
  {
    kind: 'menu',
    label: 'Resources',
    layout: 'columns',
    align: 'right',
    overviewHref: '/docs/',
    overviewLabel: 'Browse the documentation',
    groups: resourceColumns,
  },
];

/** Footer columns. Keyed by heading; Solutions/Industries reuse the nav data. */
const footer: Record<string, NavLink[]> = {
  Solutions: [
    ...solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}/` })),
    { label: 'All solutions', href: '/solutions/' },
  ],
  Industries: [
    ...industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}/` })),
    { label: 'All industries', href: '/industries/' },
  ],
  Product: [
    { label: 'Features', href: '/features/' },
    { label: 'Pricing', href: '/pricing/' },
    { label: 'Request a licence', href: '/request-license/' },
    { label: 'Download', href: '/download/' },
    { label: 'Changelog', href: '/changelog/' },
    { label: 'System requirements', href: '/download/#requirements' },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs/' },
    { label: 'Getting started', href: '/docs/getting-started/' },
    { label: 'Installation', href: '/docs/installation/' },
    { label: 'Keyboard shortcuts', href: '/docs/keyboard-shortcuts/' },
    { label: 'GST filing', href: '/docs/gst-filing/' },
    { label: 'Backup & restore', href: '/docs/backup-and-restore/' },
    { label: 'Blog', href: '/blog/' },
  ],
  Company: [
    { label: 'About', href: '/about/' },
    { label: 'Security', href: '/security/' },
    { label: 'Help & Support', href: '/support/' },
    { label: 'FAQ', href: '/docs/faq/' },
    { label: 'Troubleshooting', href: '/docs/troubleshooting/' },
    { label: 'Contact', href: `mailto:${company.supportEmail}` },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Terms of Service', href: '/terms/' },
    { label: 'Refund & Cancellation', href: '/refund/' },
  ],
};

export const nav = { primary, footer };
