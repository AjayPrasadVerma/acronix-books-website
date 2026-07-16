import type { Metadata } from 'next';
import { Check, Download, BookOpen, Clock, ShieldCheck, Eye } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Primitives';
import { ButtonLink } from '@/components/ui/Button';
import { Faq, type FaqItem } from '@/components/site/Faq';
import { downloads, plan } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing',
  description: `Acronix Books gives you a ${plan.trialDays}-day free trial with every feature unlocked — full accounting, the complete GST suite, inventory, reports and encrypted local data. No credit card to start, and your books stay readable forever.`,
  alternates: { canonical: '/pricing/' },
};

const included: string[] = [
  'Full double-entry accounting & vouchers',
  'Complete GST suite — GSTR-1, GSTR-3B, e-invoice, e-way bill',
  'Inventory, multi-warehouse & job-work',
  'Financial reports — Trial Balance, P&L, Balance Sheet, Cash Flow',
  'PDF & Excel export on every report',
  'Role-based access control (5 roles)',
  'AES-256 encrypted local data',
  'Optional encrypted cloud sync & backup',
  'Multiple companies & financial years',
  'Automatic background updates',
];

// The lifecycle the SHIPPED APP enforces (see site.ts `plan` — mirrored from
// the product's billing contracts). Stated plainly because the previous version
// of this page claimed the opposite.
const lifecycle = [
  {
    icon: Clock,
    title: `${plan.trialDays} days, everything unlocked`,
    body: `Install and run your real books immediately. Every feature on the list below is active from minute one — no credit card, no feature paywall, no sales call.`,
  },
  {
    icon: ShieldCheck,
    title: `${plan.graceDays} days of grace`,
    body: `When the trial ends, Acronix keeps working in full for another ${plan.graceDays} days. A renewal that slips by a week never stops you invoicing on a Monday morning.`,
  },
  {
    icon: Eye,
    title: 'Then read-only — never locked out',
    body: 'After that, the app switches to read-only: you can still open, search, print and export every voucher and report. Your book is a file on your own machine, and it stays yours whether you pay us or not.',
  },
] as const;

const faqs: FaqItem[] = [
  {
    question: 'What do I get during the free trial?',
    answer: `Everything. The ${plan.trialDays}-day trial is the complete product — full accounting, the entire GST suite, inventory, every report, cloud sync, all of it. There is no cut-down "trial edition", and no feature is held back to force an upgrade. No credit card is needed to start.`,
  },
  {
    question: 'What happens when the trial ends?',
    answer: `You get a further ${plan.graceDays} days of full access as a grace period. After that, Acronix Books switches to read-only: you can still open your books, run reports, print invoices and export to PDF or Excel — you just cannot record new entries until you subscribe. You are never locked out of your own data.`,
  },
  {
    question: 'Can I lose access to my books?',
    answer:
      'No. Your book is an encrypted file on your own machine, not a record in our cloud that we can switch off. Even in read-only mode you keep full read and export access, forever. If you also use cloud sync, that is an optional backup of a book you already own — never the only copy.',
  },
  {
    question: 'Are there different editions or tiers?',
    answer:
      'No. There is one plan with every feature in it. We deliberately do not sell a cheap edition with the useful parts removed — GST compliance is not a premium add-on for an Indian business, it is the job.',
  },
  {
    question: 'Do I need a subscription to use cloud sync?',
    answer:
      'Cloud sync is part of the same single plan, and it is optional. The app runs fully offline with no cloud account at all — sync is a convenience you switch on, never a requirement, and never something the app needs in order to open your books.',
  },
  {
    question: 'What happens to my data if I stop paying?',
    answer:
      'It stays on your machine, in your file, readable and exportable. If you used cloud sync you can turn it off at any time and email support to have the cloud copy deleted — that removes our mirror, not your book.',
  },
];

export default function PricingPage() {
  const windows = downloads.windows;
  const priceKnown = plan.price !== null;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container size="wide" className="py-20 text-center sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Badge tone="brand">Pricing</Badge>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--fg)] sm:text-5xl">
              One plan.{' '}
              <span className="text-gradient">Every feature. {plan.trialDays} days free.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">
              No editions, no feature paywall, no cut-down &ldquo;lite&rdquo; version. Start with a{' '}
              {plan.trialDays}-day trial of the complete product — and keep reading your books
              forever, whatever you decide after that.
            </p>
          </div>
        </Container>
      </section>

      {/* The single plan */}
      <section className="border-b border-[var(--border)]">
        <Container size="narrow" className="py-20 sm:py-24">
          <div className="overflow-hidden rounded-3xl border-2 border-brand-500/40 bg-[var(--bg-elevated)] shadow-lg shadow-brand-600/5">
            <div className="border-b border-[var(--border)] bg-brand-50/60 px-8 py-8 text-center dark:bg-brand-400/5 sm:px-10">
              <Badge tone="accent">{plan.name}</Badge>
              <div className="mt-5 flex items-baseline justify-center gap-2">
                {priceKnown ? (
                  <>
                    <span className="font-display text-5xl font-extrabold tracking-tight text-[var(--fg)] sm:text-6xl">
                      ₹{plan.price?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-lg text-[var(--fg-muted)]">/ {plan.period}</span>
                  </>
                ) : (
                  <span className="font-display text-4xl font-extrabold tracking-tight text-[var(--fg)] sm:text-5xl">
                    {plan.trialDays} days free
                  </span>
                )}
              </div>
              <p className="mt-3 text-[var(--fg-muted)]">
                {priceKnown
                  ? `${plan.trialDays}-day free trial · no credit card to start`
                  : 'Subscription pricing is being finalised — we will publish it here before it takes effect.'}
              </p>
            </div>

            <div className="px-8 py-8 sm:px-10">
              <ul className="grid gap-3 sm:grid-cols-2">
                {included.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--fg)]">
                    <Check
                      className="mt-0.5 h-4.5 w-4.5 flex-none text-brand-600 dark:text-brand-400"
                      aria-hidden
                    />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <ButtonLink href="/download/" size="lg">
                  <Download className="h-5 w-5" />
                  Start your {plan.trialDays}-day trial
                </ButtonLink>
                <ButtonLink href="/features/" variant="outline" size="lg">
                  <BookOpen className="h-5 w-5" />
                  See all features
                </ButtonLink>
              </div>
              <p className="mt-5 text-center text-sm text-[var(--fg-subtle)]">
                {windows.sizeHint} · No credit card required · macOS and Linux coming soon.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What actually happens over time — the honest lifecycle */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
        <Container size="wide" className="py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="neutral">How it works</Badge>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
              What happens after the trial
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--fg-muted)]">
              Spelled out in full, because too much accounting software treats this as the fine
              print.
            </p>
          </div>

          <ol className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {lifecycle.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-50 dark:bg-brand-400/10">
                  <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" aria-hidden />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-[var(--fg-subtle)]">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-[var(--fg)]">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-[var(--fg-muted)]">
            Your books live in an encrypted file on your own machine. Read-only means read-only —
            not a padlock over your data. You can open, search, print and export every voucher and
            report for as long as you own the computer.
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <Faq
        items={faqs}
        eyebrow="Questions"
        title="Pricing questions, answered"
        description="Straight answers on the trial, what read-only really means, and who owns your data."
        className="py-20 sm:py-24"
      />
    </>
  );
}
