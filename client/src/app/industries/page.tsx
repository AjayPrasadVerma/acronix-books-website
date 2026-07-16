import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Primitives';
import { ButtonLink } from '@/components/ui/Button';
import { industries } from '@/lib/industries';
import { plan } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Acronix Books is one ERP that adapts to the trade you actually run — textile job work, wholesale receivables, manufacturing consumption, retail counters, services, e-commerce and institutes.',
  alternates: { canonical: '/industries/' },
};

export default function IndustriesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container size="wide" className="py-20 text-center sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Badge tone="brand">Industries</Badge>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--fg)] sm:text-5xl">
              One system, shaped to <span className="text-gradient">the trade you run</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">
              Acronix is not a different product per vertical with the same engine underneath. It is
              one ERP whose masters, vouchers and reports already model the awkward parts of how
              Indian businesses actually trade.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border)]">
        <Container size="wide" className="py-20 sm:py-24">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}/`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-7 transition-colors hover:border-brand-500/40"
                >
                  <h2 className="font-display text-lg font-bold text-[var(--fg)]">
                    {industry.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
                    {industry.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    See how it fits
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-[var(--fg-muted)]">
            Don&apos;t see your trade? The core — double-entry accounting, GST, inventory and
            reporting — is the same for every business. These pages simply call out the parts that
            matter most in each one.
          </p>
        </Container>
      </section>

      <section>
        <Container size="narrow" className="py-20 text-center sm:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Try it on your own books
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[var(--fg-muted)]">
            {plan.trialDays} days, every feature unlocked, no credit card.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/download/" size="lg">
              <Download className="h-5 w-5" />
              Download for Windows
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
