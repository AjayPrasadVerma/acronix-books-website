import type { Metadata } from 'next';
import { Zap, Layers, ShieldCheck, Feather, Download, LifeBuoy } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge, Eyebrow, SectionHeading } from '@/components/ui/Primitives';
import { ButtonLink } from '@/components/ui/Button';
import {
  LedgerIllustration,
  OfflineSyncIllustration,
} from '@/components/illustrations/Illustrations';
import { company } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Acronix Books exists to give Indian businesses modern, fast, offline-first accounting — built to beat Tally on UX and Zoho on offline depth. Made in India, for Indian business.',
  alternates: { canonical: '/about/' },
};

interface Pillar {
  icon: typeof Zap;
  title: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    icon: Zap,
    title: 'Fast',
    body: 'Common actions land in under 200ms and hot queries under 50ms. Lists are virtualized and shortcuts fire in a single frame, so the software keeps pace with an experienced operator.',
  },
  {
    icon: Layers,
    title: 'Scalable',
    body: 'Built to absorb 50,000+ vouchers a year, and to run multiple companies, branches, and financial years from one install without a rewrite as you grow.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure',
    body: 'The whole database is encrypted at rest with SQLCipher AES-256, guarded by an envelope key vault, role-based access, idle auto-lock, and a tamper-evident audit trail.',
  },
  {
    icon: Feather,
    title: 'Lightweight',
    body: 'A lean, focused desktop app — a roughly 80 MB installer that runs comfortably on ordinary business hardware, with no kitchen-sink bloat.',
  },
];

const audience: string[] = [
  'Wholesalers & distributors',
  'Manufacturers & textile job-work',
  'Retailers & counters',
  'Service businesses',
  'Ecommerce sellers',
  'Schools & institutions',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container size="wide" className="py-20 text-center sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Badge tone="brand">Made in India for Indian business</Badge>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--fg)] sm:text-5xl">
              Modern accounting that <span className="text-gradient">respects your time</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">
              Acronix Books is a fast, offline-first ERP and accounting desktop app for Indian businesses of every size
              — built to beat Tally on modern UX and Zoho Books on offline depth, without asking you
              to relearn how you keep your books.
            </p>
            <p className="mx-auto mt-4 text-sm text-[var(--fg-subtle)]">
              A product of{' '}
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-600 underline underline-offset-2 dark:text-brand-400"
              >
                Acronix
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="border-b border-[var(--border)]">
        <Container className="py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Why we built it</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
                Indian businesses deserve better software
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--fg-muted)]">
                For decades, Indian accounting has meant a choice between a legacy desktop tool that
                is fast but dated, and a cloud suite that is modern but slow the moment your internet
                wobbles. Neither fully respects how a busy trader or accountant actually works.
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--fg-muted)]">
                Acronix Books takes the best of both: the instant, keyboard-driven speed of a local
                desktop app, with the modern interface, encryption, and optional cloud backup you
                expect from software built today. Your books stay on your machine, under your
                control, and every screen works with the internet unplugged.
              </p>
            </div>
            <div className="flex justify-center">
              <LedgerIllustration className="w-full max-w-md" />
            </div>
          </div>
        </Container>
      </section>

      {/* Four pillars */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
        <Container size="wide" className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="Our four pillars"
            title="Four commitments behind every decision"
            description="These are not slogans. Every feature is measured against them — if a change breaks one, the change is wrong, not the pillar."
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

      {/* Who it's for */}
      <section className="border-b border-[var(--border)]">
        <Container className="py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 flex justify-center lg:order-1">
              <OfflineSyncIllustration className="w-full max-w-md" />
            </div>
            <div className="order-1 lg:order-2">
              <Eyebrow>Who it&apos;s for</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
                Built for the businesses that keep India running
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--fg-muted)]">
                We started with Surat&apos;s textile traders — high-volume, job-work-heavy,
                keyboard-first — but the same core serves businesses across verticals.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {audience.map((who) => (
                  <li
                    key={who}
                    className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3.5 py-2.5 text-sm font-medium text-[var(--fg)]"
                  >
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand-500" aria-hidden />
                    {who}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Made in India */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
        <Container size="narrow" className="py-20 text-center sm:py-24">
          <Eyebrow>Local by design</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Made in India, for Indian business
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">
            This is not a foreign template with a rupee sign bolted on. The financial year runs
            April to March, amounts read in the lakh–crore grouping, and the GST return cycle —
            HSN/SAC, tax categories, GSTR-1 and GSTR-3B — is wired in from the first voucher. The
            vocabulary, the defaults, and the workflows match how businesses across India actually
            keep their books.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container size="wide" className="py-20 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Try it on your own books
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[var(--fg-muted)]">
            Free to download while in early access. Install in seconds — it auto-updates from there.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/download/" size="lg">
              <Download className="h-5 w-5" />
              Download for Windows
            </ButtonLink>
            <ButtonLink href="/support/" variant="outline" size="lg">
              <LifeBuoy className="h-5 w-5" />
              Talk to support
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
