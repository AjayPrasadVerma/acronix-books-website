import Link from 'next/link';
import { AlertTriangle, ArrowRight, Check, Download } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Primitives';
import { ButtonLink } from '@/components/ui/Button';
import { plan } from '@/lib/site';

// Shared section primitives for the config-driven marketing pages
// (industries + solutions). Both page types render the same shapes — hero,
// problem grid, capability grid, scope note, CTA — so they live here once
// rather than being copied into each template (CLAUDE.md §4, DRY).
//
// These are presentational: callers pass resolved content. No data fetching,
// no page-specific branching.

export function MarketingHero({
  eyebrow,
  headline,
  highlight,
  intro,
  chips,
  breadcrumbs,
  primaryCta,
}: {
  eyebrow: string;
  headline: string;
  highlight: string;
  intro: string;
  chips: readonly string[];
  breadcrumbs?: React.ReactNode;
  primaryCta?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <Container size="wide" className="py-16 sm:py-20">
        {breadcrumbs}
        <div className={breadcrumbs ? 'mt-8 max-w-3xl' : 'max-w-3xl'}>
          <Badge tone="brand">{eyebrow}</Badge>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--fg)] sm:text-5xl">
            {headline} <span className="text-gradient">{highlight}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">{intro}</p>

          {chips.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {chips.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-sm font-medium text-[var(--fg-muted)]"
                >
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta?.href ?? '/download/'} size="lg">
              <Download className="h-5 w-5" />
              {primaryCta?.label ?? `Start your ${plan.trialDays}-day trial`}
            </ButtonLink>
            <ButtonLink href="/features/" variant="outline" size="lg">
              Explore every feature
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProblemGrid({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: readonly { title: string; body: string }[];
}) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container size="wide" className="py-20 sm:py-24">
        <div className="max-w-2xl">
          <Badge tone="neutral">{eyebrow}</Badge>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-7"
            >
              <h3 className="font-display text-lg font-bold text-[var(--fg)]">{c.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--fg-muted)]">{c.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CapabilityGrid({
  eyebrow,
  title,
  description,
  items,
  scopeNote,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  items: readonly { title: string; body: string }[];
  scopeNote?: string;
}) {
  return (
    <section className="border-b border-[var(--border)]">
      <Container size="wide" className="py-20 sm:py-24">
        <div className="max-w-2xl">
          <Badge tone="brand">{eyebrow}</Badge>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-[var(--fg-muted)]">{description}</p>
          )}
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <div key={c.title}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-500/20 bg-brand-50 dark:bg-brand-400/10">
                <Check className="h-4.5 w-4.5 text-brand-600 dark:text-brand-400" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-[var(--fg)]">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{c.body}</p>
            </div>
          ))}
        </div>

        {scopeNote && <ScopeNote body={scopeNote} />}
      </Container>
    </section>
  );
}

/**
 * The "here is what we do NOT do" block. Deliberately prominent rather than
 * buried: a marketing page that only lists strengths teaches a prospect to
 * distrust the whole page once they find the first gap themselves.
 */
export function ScopeNote({ body }: { body: string }) {
  return (
    <div className="mt-14 flex gap-4 rounded-2xl border border-amber-500/25 bg-amber-50/60 p-6 dark:bg-amber-400/5">
      <AlertTriangle className="h-5 w-5 flex-none text-amber-600 dark:text-amber-400" aria-hidden />
      <div>
        <h3 className="font-display text-base font-bold text-[var(--fg)]">
          What Acronix does not do here
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
      </div>
    </div>
  );
}

export function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container size="wide" className="py-16 sm:py-20">
        <h2 className="font-display text-xl font-bold text-[var(--fg)]">{title}</h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3.5 py-2 text-sm font-medium text-[var(--fg-muted)] transition-colors hover:border-brand-500/40 hover:text-[var(--fg)]"
              >
                {l.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function TrialCta({
  title = 'Try it on your own books',
  body,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section>
      <Container size="narrow" className="py-20 text-center sm:py-24">
        <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[var(--fg-muted)]">
          {body ??
            `${plan.trialDays} days, every feature unlocked, no credit card. Your data stays encrypted on your own machine.`}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/download/" size="lg">
            <Download className="h-5 w-5" />
            Download for Windows
          </ButtonLink>
          <ButtonLink href="/pricing/" variant="outline" size="lg">
            See pricing
            <ArrowRight className="h-5 w-5" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
