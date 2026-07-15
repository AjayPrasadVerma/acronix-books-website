import type { Metadata } from 'next';
import {
  ArrowUpCircle,
  Boxes,
  Bug,
  Cloud,
  Compass,
  Download,
  FileSpreadsheet,
  Keyboard,
  Landmark,
  MonitorDown,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge, Eyebrow } from '@/components/ui/Primitives';
import { ButtonLink } from '@/components/ui/Button';
import { getReleases } from '@/lib/content';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Every Acronix Books release — new features, improvements and fixes across accounting, GST, inventory, security and cloud sync, plus what is coming next.',
  alternates: { canonical: '/changelog/' },
};

/** Map a section title to an icon; falls back to a generic sparkle. */
const SECTION_ICONS: Record<string, LucideIcon> = {
  Accounting: Landmark,
  GST: FileSpreadsheet,
  Inventory: Boxes,
  Reports: FileSpreadsheet,
  Security: ShieldCheck,
  'Cloud sync': Cloud,
  Platform: MonitorDown,
  Keyboard: Keyboard,
  Added: Plus,
  Improved: ArrowUpCircle,
  Fixed: Bug,
};

function sectionIcon(title: string): LucideIcon {
  return SECTION_ICONS[title] ?? Sparkles;
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** The stability channel a version belongs to, from its number alone. */
function channel(version: string): 'early-access' | 'beta' {
  return version.startsWith('0.0') ? 'beta' : 'early-access';
}

const ROADMAP: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Landmark,
    title: 'Banking & reconciliation',
    body: 'Bank entries and statement reconciliation to match your books against the bank.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Orders & pre-sales',
    body: 'Sale orders, purchase orders and quotations that flow into invoices.',
  },
  {
    icon: Boxes,
    title: 'GRN & returns',
    body: 'Goods-receipt notes plus sale and purchase returns for the full trade cycle.',
  },
  {
    icon: MonitorDown,
    title: 'macOS & Linux builds',
    body: 'Native desktop builds beyond Windows — Apple Silicon, Intel and Linux.',
  },
];

const changelogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: site.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Windows 10, Windows 11',
  softwareVersion: site.currentVersion,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
};

export default function ChangelogPage() {
  const releases = getReleases();

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="border-b border-[var(--border)]">
        <Container size="narrow" className="py-16 sm:py-20">
          <Eyebrow>Changelog</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[var(--fg)] sm:text-5xl">
            Release history
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">
            Every shipped build of Acronix Books, dated and detailed. The desktop app auto-updates
            itself, so you always run the latest — this is simply the record of what changed and
            when.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <Badge tone="brand">Current · v{site.currentVersion}</Badge>
            <span className="text-[var(--fg-subtle)]">
              {releases.length} release{releases.length === 1 ? '' : 's'} shipped
            </span>
            <span aria-hidden className="text-[var(--border-strong)]">
              ·
            </span>
            <ButtonLink
              href="/download/"
              variant="ghost"
              size="sm"
              className="h-auto p-0 font-semibold text-brand-600 hover:bg-transparent dark:text-brand-400"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download the latest
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <Container size="narrow" className="pt-16">
        <ol className="relative flex flex-col gap-16 border-l border-[var(--border)] pl-6 sm:pl-10">
          {releases.map((release, i) => {
            const isLatest = i === 0;
            const ch = channel(release.version);
            return (
              <li key={release.version} id={`v${release.version}`} className="relative scroll-mt-24">
                <span
                  aria-hidden
                  className={cnDot(isLatest)}
                />

                {/* Release header */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--fg)]">
                    v{release.version}
                  </h2>
                  {isLatest && <Badge tone="brand">Latest</Badge>}
                  {ch === 'early-access' ? (
                    <Badge tone="accent">Early access</Badge>
                  ) : (
                    <Badge tone="neutral">Pre-release</Badge>
                  )}
                  <time
                    dateTime={release.date}
                    className="ml-auto font-mono text-xs font-medium text-[var(--fg-subtle)]"
                  >
                    {formatDate(release.date)}
                  </time>
                </div>

                <p className="mt-3 max-w-2xl leading-relaxed text-[var(--fg-muted)]">
                  {release.summary}
                </p>

                {/* Grouped changes */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {release.sections.map((section) => {
                    const Icon = sectionIcon(section.title);
                    return (
                      <div
                        key={section.title}
                        className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5"
                      >
                        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--fg)]">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          {section.title}
                        </h3>
                        <ul className="mt-3 flex flex-col gap-2.5">
                          {section.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex gap-2.5 text-sm leading-relaxed text-[var(--fg-muted)]"
                            >
                              <span
                                aria-hidden
                                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ol>
      </Container>

      {/* Roadmap */}
      <Container size="narrow" className="mt-20">
        <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-subtle)] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-400/25 dark:bg-brand-400/10 dark:text-brand-400">
              <Compass className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-[var(--fg)]">On the roadmap</h2>
              <p className="text-sm text-[var(--fg-muted)]">
                Planned, not yet shipped. It lands here the day it does.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {ROADMAP.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg-subtle)]">
                  <Icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--fg)]">{title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-[var(--fg-subtle)]">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            The installed app updates itself automatically as each release ships.
          </p>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(changelogJsonLd) }}
      />
    </div>
  );
}

/** Timeline node dot — larger and ringed for the latest release. Centred on the
 * border line via a negative left equal to the list padding plus -translate-x-1/2. */
function cnDot(isLatest: boolean): string {
  const base =
    'absolute top-2 -translate-x-1/2 left-[-1.5rem] sm:left-[-2.5rem] rounded-full border-2 border-[var(--bg)]';
  return isLatest
    ? `${base} h-4 w-4 bg-brand-500 ring-4 ring-brand-500/20`
    : `${base} h-3 w-3 bg-[var(--border-strong)]`;
}
