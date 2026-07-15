import type { Metadata } from 'next';
import { Check, Download, BookOpen } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Primitives';
import { ButtonLink } from '@/components/ui/Button';
import { Faq, type FaqItem } from '@/components/site/Faq';
import { downloads } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Acronix Books is free to download and use during early access — full accounting, the complete GST suite, inventory, reports, RBAC, and encrypted local data included. No credit card, no trial timer.',
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

const faqs: FaqItem[] = [
  {
    question: 'Is Acronix Books really free?',
    answer:
      'Yes. During its early-access period, Acronix Books is free to download and use, with every feature included. You can run your real books on it today at no cost. No credit card is required and there is no trial timer counting down.',
  },
  {
    question: 'Will there be paid plans later?',
    answer:
      'We may introduce paid plans as the product matures. If we do, we will announce pricing and terms clearly before anything takes effect, and we will not convert your free installation into a paid subscription without your explicit consent.',
  },
  {
    question: 'Do I need a subscription to use cloud sync?',
    answer:
      'No. Cloud sync is optional and, like the rest of the app, free during early access. The app also works fully offline without any cloud account at all — sync is a convenience you switch on, never a requirement.',
  },
  {
    question: 'What happens to my data if I stop using it?',
    answer:
      'Your book is stored locally on your own machine, so it stays with you. If you use cloud sync, you can turn it off at any time and request deletion of your cloud account by emailing support.',
  },
];

export default function PricingPage() {
  const windows = downloads.windows;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container size="wide" className="py-20 text-center sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Badge tone="brand">Pricing</Badge>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--fg)] sm:text-5xl">
              Free during <span className="text-gradient">early access</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">
              One plan, everything included, no strings. Install Acronix Books and run your real
              books today — no credit card, no trial timer, no feature paywall.
            </p>
          </div>
        </Container>
      </section>

      {/* The single plan */}
      <section className="border-b border-[var(--border)]">
        <Container size="narrow" className="py-20 sm:py-24">
          <div className="overflow-hidden rounded-3xl border-2 border-brand-500/40 bg-[var(--bg-elevated)] shadow-lg shadow-brand-600/5">
            <div className="border-b border-[var(--border)] bg-brand-50/60 px-8 py-8 text-center dark:bg-brand-400/5 sm:px-10">
              <Badge tone="accent">Early access</Badge>
              <div className="mt-5 flex items-baseline justify-center gap-2">
                <span className="font-display text-5xl font-extrabold tracking-tight text-[var(--fg)] sm:text-6xl">
                  Free
                </span>
              </div>
              <p className="mt-3 text-[var(--fg-muted)]">
                Everything included · {windows.sizeHint}
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
                  Download for Windows
                </ButtonLink>
                <ButtonLink href="/features/" variant="outline" size="lg">
                  <BookOpen className="h-5 w-5" />
                  See all features
                </ButtonLink>
              </div>
              <p className="mt-5 text-center text-sm text-[var(--fg-subtle)]">
                No credit card required. macOS and Linux builds are coming soon.
              </p>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-[var(--fg-muted)]">
            Paid plans may be introduced as the product matures. If they are, we will publish
            pricing and terms clearly beforehand — your free early-access installation will never be
            switched to a paid subscription without your consent.
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <Faq
        items={faqs}
        eyebrow="Questions"
        title="Pricing questions, answered"
        description="Straight answers on cost, cloud sync, and what happens next."
        className="py-20 sm:py-24"
      />
    </>
  );
}
