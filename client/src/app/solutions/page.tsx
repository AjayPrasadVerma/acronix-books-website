import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Primitives';
import { ButtonLink } from '@/components/ui/Button';
import { solutions } from '@/lib/solutions';
import { plan } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Everything Acronix Books does, broken down by the job — GST billing, inventory, double-entry accounting, e-invoice, e-way bill, GSTR-1/3B returns, reports and cloud backup.',
  alternates: { canonical: '/solutions/' },
};

export default function SolutionsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container size="wide" className="py-20 text-center sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Badge tone="brand">Solutions</Badge>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--fg)] sm:text-5xl">
              Everything it does, <span className="text-gradient">one job at a time</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">
              Acronix Books is a full ERP, so &ldquo;what does it do&rdquo; has a long answer. Here it
              is, split into the specific jobs a business actually needs done — each one describing
              features that ship in the build you can download.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--border)]">
        <Container size="wide" className="py-20 sm:py-24">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}/`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-7 transition-colors hover:border-brand-500/40"
                >
                  <h2 className="font-display text-lg font-bold text-[var(--fg)]">
                    {solution.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
                    {solution.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    Go deeper
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section>
        <Container size="narrow" className="py-20 text-center sm:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            See it on your own books
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
