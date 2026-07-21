import type { Metadata } from 'next';
import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  Boxes,
  Check,
  Cloud,
  Cpu,
  Database,
  Download,
  FileCheck2,
  HardDrive,
  KeyRound,
  Landmark,
  Lock,
  MonitorCog,
  MonitorDown,
  Play,
  Receipt,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  WifiOff,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge, Eyebrow, SectionHeading } from '@/components/ui/Primitives';
import { ButtonLink } from '@/components/ui/Button';
import { downloads, site } from '@/lib/site';
import { OsDownloadCards } from '@/components/download/OsDownloadCards';
import { UpdateChecker } from '@/components/download/UpdateChecker';
import { FirstRun } from '@/components/download/FirstRun';
import { UpdatesExplainer } from '@/components/download/UpdatesExplainer';
import { Compatibility } from '@/components/download/Compatibility';
import { DownloadFaq } from '@/components/download/DownloadFaq';

export const metadata: Metadata = {
  title: 'Download',
  description:
    'Download Acronix Books for Windows and Linux and start a free 14-day trial — a fast, offline-first GST accounting & ERP desktop app for Indian businesses of every size. GST-ready invoicing, inventory and vouchers, encrypted at rest. macOS coming soon.',
  alternates: { canonical: '/download/' },
};

const windows = downloads.windows;

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const HERO_TRUST: { icon: LucideIcon; label: string }[] = [
  { icon: WifiOff, label: 'No account needed offline' },
  { icon: Lock, label: 'AES-256 encrypted on device' },
  { icon: RefreshCw, label: 'Automatic updates' },
];

const INCLUDED: { icon: LucideIcon; title: string; items: string[] }[] = [
  {
    icon: Landmark,
    title: 'Accounting & vouchers',
    items: [
      'Multi-company books, financial years Apr–Mar',
      'Ledgers & hierarchical account groups',
      '10 voucher types — sale, purchase, receipt, payment, contra, journal, credit & debit notes, delivery challan, stock journal',
      'Configurable voucher series + bill-by-bill outstanding',
    ],
  },
  {
    icon: Receipt,
    title: 'GST compliance',
    items: [
      'HSN/SAC codes & tax categories on every line',
      'Sales, purchase, input & output tax registers + HSN summary',
      'One-click GSTR-1 and GSTR-3B (Excel)',
      'E-Invoice (IRN) and E-Way Bill generation',
    ],
  },
  {
    icon: Boxes,
    title: 'Inventory & job-work',
    items: [
      'Items, item groups, units & tax categories',
      'Multiple warehouses with warehouse-wise balances',
      'Stock journals, delivery challans & job-work rates',
      'Weighted-average and FIFO valuation',
    ],
  },
  {
    icon: BarChart3,
    title: 'Reports & exports',
    items: [
      'Day book, ledger statement, trial balance',
      'P&L and balance sheet with group drill-down',
      'Outstandings, cash book, cash flow (incl. IFRS)',
      'Stock summary/ledger, party stock, job-work register',
      'Export any report to PDF or Excel',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Security & access',
    items: [
      'SQLCipher AES-256 encryption at rest',
      'Envelope key vault, per-user slots & recovery code',
      'Encrypted unlock, idle auto-lock, key zeroed on quit',
      'Tamper-evident audit hash chain + RBAC (5 roles)',
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & platform',
    items: [
      'Optional isolated, encrypted cloud sync & restore',
      'Automatic background updates (manual check too)',
      'Keyboard-first: F-keys, Ctrl+K palette, F10 to save',
      'Light & dark themes',
    ],
  },
];

const STEPS = [
  {
    icon: Download,
    title: 'Download the installer',
    body: 'Grab the one-click installer for Windows. No account, no credit card, no trial timer.',
  },
  {
    icon: Play,
    title: 'Run the installer',
    body: 'Launch it and follow the prompts. It installs per-user in seconds — no administrator rights needed.',
  },
  {
    icon: KeyRound,
    title: 'Create your company',
    body: 'Open the app, create a company file, and start invoicing. Your data stays encrypted on your machine.',
  },
];

const REQUIREMENTS = [
  { icon: MonitorCog, label: 'Operating system', value: 'Windows 10 or 11 (64-bit)' },
  { icon: Cpu, label: 'Memory', value: '4 GB RAM (8 GB recommended)' },
  { icon: HardDrive, label: 'Disk space', value: '~200 MB free for install & data' },
  { icon: Database, label: 'Data storage', value: 'Local, SQLCipher AES-256 encrypted' },
];

export default function DownloadPage() {
  const META: { label: string; value: string }[] = [
    { label: 'Version', value: `v${site.currentVersion}` },
    { label: 'Released', value: formatDate(site.currentReleaseDate) },
    { label: 'Platform', value: 'Windows 10 & 11 · 64-bit' },
    { label: 'Download size', value: '~80 MB' },
    { label: 'License', value: '14-day trial, then ₹11,999/yr' },
    { label: 'Updates', value: 'Automatic' },
  ];

  return (
    <div className="pb-24">
      {/* Hero: messaging + release/version card */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — messaging */}
            <div className="animate-fade-up">
              <Eyebrow>Download</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--fg)] sm:text-5xl">
                Download <span className="text-gradient">Acronix Books</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--fg-muted)]">
                A fast, offline-first ERP &amp; accounting app for Indian business — GST-ready,
                keyboard-driven, and encrypted at rest. Install in seconds and it keeps itself up to
                date.
              </p>
              <ul className="mt-7 flex flex-col gap-2.5">
                {HERO_TRUST.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-[var(--fg)]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — the release/version card */}
            <div className="animate-fade-up">
              <div className="relative overflow-hidden rounded-2xl border border-brand-200 bg-[var(--bg-elevated)] p-7 shadow-lg shadow-brand-600/5 sm:p-8 dark:border-brand-400/25">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl"
                />
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-400/25 dark:bg-brand-400/10 dark:text-brand-400">
                      <MonitorDown className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold text-[var(--fg)]">
                        {site.name} for Windows
                      </p>
                      <p className="text-xs text-[var(--fg-subtle)]">Desktop installer (.exe)</p>
                    </div>
                  </div>
                  <Badge tone="accent">Early access</Badge>
                </div>

                <dl className="relative mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-[var(--border)] py-5">
                  {META.map((m) => (
                    <div key={m.label}>
                      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
                        {m.label}
                      </dt>
                      <dd className="mt-0.5 font-mono text-sm font-medium text-[var(--fg)]">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {windows.href && (
                  <div className="relative mt-6">
                    <ButtonLink href={windows.href} size="lg" className="w-full">
                      <Download className="h-5 w-5" aria-hidden="true" />
                      Download for Windows
                    </ButtonLink>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--fg-subtle)]">
                      <span className="inline-flex items-center gap-1.5">
                        <FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" />
                        AcronixBooks-Setup-latest.exe
                      </span>
                      <ButtonLink
                        href="/changelog/"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-semibold text-brand-600 hover:bg-transparent dark:text-brand-400"
                      >
                        Release notes
                      </ButtonLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Platform picker */}
      <section className="mt-20">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Choose your platform"
            title="One install, keeps itself current"
            description="Windows and Linux are available today. macOS is in the pipeline — leave your email and we'll tell you the moment it lands."
            className="max-w-2xl"
          />
          <div className="mt-10">
            <OsDownloadCards />
          </div>
        </Container>
      </section>

      {/* What's included */}
      <section className="mt-24">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="What's included"
            title="A full ERP in one download"
            description={`Everything below ships in v${site.currentVersion} — no add-ons, no paywalled tiers during early access.`}
            className="max-w-2xl"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map(({ icon: Icon, title, items }) => (
              <div
                key={title}
                className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-bold text-[var(--fg)]">{title}</h3>
                </div>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-[var(--fg-muted)]">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Install in 3 steps + SmartScreen note */}
      <section className="mt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Getting started"
                title="Install in 3 steps"
                description="From download to your first invoice in under a minute."
                className="max-w-xl"
              />
              <ol className="mt-8 flex flex-col gap-4">
                {STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-400/25 dark:bg-brand-400/10 dark:text-brand-400">
                      <step.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xs font-semibold text-[var(--fg-subtle)]">
                          Step {index + 1}
                        </span>
                        <h3 className="font-display text-base font-bold text-[var(--fg)]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* SmartScreen / code-signing honesty note */}
            <aside className="flex flex-col rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-400/25 dark:bg-amber-400/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300">
                <ShieldAlert className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-[var(--fg)]">
                A note on the Windows warning
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                The installer isn&rsquo;t code-signed yet — it&rsquo;s early-access software from a
                new publisher — so Windows SmartScreen may show a{' '}
                <span className="font-medium text-[var(--fg)]">
                  &ldquo;Windows protected your PC&rdquo;
                </span>{' '}
                prompt.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                To continue, click{' '}
                <span className="font-semibold text-[var(--fg)]">More info</span> →{' '}
                <span className="font-semibold text-[var(--fg)]">Run anyway</span>. Purchased code
                signing is on the roadmap and will remove the prompt in a future release.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      {/* What happens on first run */}
      <FirstRun />

      {/* Automatic updates + checker */}
      <section className="mt-24">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Always current"
            title="Automatic updates"
            description="Once installed, Acronix Books checks for new releases and updates itself in the background — no reinstalls, no interruptions."
          />
          <div className="mt-10">
            <UpdateChecker />
          </div>
        </Container>
      </section>

      {/* Detailed how-updates-work explainer */}
      <UpdatesExplainer />

      {/* System requirements */}
      <section id="requirements" className="mt-24 scroll-mt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12">
            <SectionHeading
              align="left"
              eyebrow="Before you install"
              title="System requirements"
              description="Lightweight by design — it runs comfortably on everyday office hardware, and your books stay encrypted on your own disk."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {REQUIREMENTS.map((req) => (
                <div
                  key={req.label}
                  className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg)]">
                    <req.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
                      {req.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[var(--fg)]">{req.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Platforms & portability */}
      <Compatibility />

      {/* Download-focused FAQ */}
      <DownloadFaq />

      {/* Closing reassurance */}
      <section className="mt-24">
        <Container size="narrow">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-400/25 dark:bg-brand-400/10 dark:text-brand-400">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-[var(--fg)]">
              Your books stay yours
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--fg-muted)]">
              Company data lives on your machine, encrypted at rest with SQLCipher (AES-256). No
              account is required to work offline — you&rsquo;re in full control of your data.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--fg-muted)]">
              <span className="inline-flex items-center gap-2">
                <Lock className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                AES-256 encrypted
              </span>
              <span className="inline-flex items-center gap-2">
                <WifiOff className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                Fully offline-capable
              </span>
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                <ButtonLink
                  href="/features/"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-semibold text-brand-600 hover:bg-transparent dark:text-brand-400"
                >
                  Explore all features
                </ButtonLink>
              </span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
