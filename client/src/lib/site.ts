// Single source of truth for site-wide constants. Keep the URLs here in sync
// with apps/desktop/electron-builder.yml (`publish.url`) and docs/release.md.

export const site = {
  name: 'Acronix Books',
  shortName: 'Acronix',
  /** Public production origin — used for canonical URLs, sitemap, OG tags. */
  url: 'https://acronixbooks.com',
  tagline: 'Modern ERP + Accounting for Indian business',
  description:
    'Acronix Books is a fast, offline-first ERP & accounting desktop app for Indian businesses of every size — GST-ready invoicing, inventory, vouchers, GSTR-1/3B, and encrypted cloud backup. Beat Tally on UX, beat Zoho on offline speed.',
  locale: 'en_IN',
  twitter: '@acronixbooks',
  email: 'support@acronixbooks.com',
  /** Current shipped desktop version — bump alongside apps/desktop/package.json. */
  currentVersion: '0.1.0',
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
  /** ISO date the current policy versions took effect. */
  policyEffectiveDate: '2026-07-01',
  jurisdiction: 'India',
  governingLawState: 'Gujarat, India',
  responseTime: 'within 1–2 business days',
} as const;

/**
 * The auto-update feed root (electron-updater generic provider). The stable
 * installer link and the `latest.yml` manifest both live under here.
 * See docs/release.md.
 */
export const updateFeed = {
  base: 'https://acronixbooks.com/updates',
  manifest: 'https://acronixbooks.com/updates/latest.yml',
  windowsInstaller: 'https://acronixbooks.com/updates/AcronixBooks-Setup-latest.exe',
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
   * `null` until the real number is decided — the UI renders an honest
   * "pricing to be announced" instead of a placeholder figure. Never put a
   * speculative price here; people make purchasing decisions on this page.
   */
  price: null as number | null,
  currency: 'INR',
  period: 'year',
} as const;

export type Platform = 'windows' | 'mac' | 'linux' | 'unknown';

export interface DownloadTarget {
  platform: Platform;
  label: string;
  /** File-size hint shown under the button. */
  sizeHint: string;
  /** `null` when the artifact isn't built yet (Coming soon). */
  href: string | null;
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
    sizeHint: 'AppImage · .deb',
    href: null,
    status: 'coming-soon',
    note: 'In the pipeline — leave your email to be notified at launch.',
  },
};

export const nav = {
  primary: [
    { label: 'Features', href: '/features/' },
    { label: 'Pricing', href: '/pricing/' },
    { label: 'Docs', href: '/docs/' },
    { label: 'Changelog', href: '/changelog/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Support', href: '/support/' },
  ],
  footer: {
    Product: [
      { label: 'Features', href: '/features/' },
      { label: 'Pricing', href: '/pricing/' },
      { label: 'Download', href: '/download/' },
      { label: 'Changelog', href: '/changelog/' },
      { label: 'System requirements', href: '/download/#requirements' },
    ],
    Resources: [
      { label: 'Documentation', href: '/docs/' },
      { label: 'Getting started', href: '/docs/getting-started/' },
      { label: 'GST filing', href: '/docs/gst-filing/' },
      { label: 'Blog', href: '/blog/' },
    ],
    Company: [
      { label: 'About', href: '/about/' },
      { label: 'Security', href: '/security/' },
      { label: 'Help & Support', href: '/support/' },
      { label: 'Contact', href: 'mailto:support@acronixbooks.com' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms of Service', href: '/terms/' },
      { label: 'Refund & Cancellation', href: '/refund/' },
    ],
  },
} as const;
