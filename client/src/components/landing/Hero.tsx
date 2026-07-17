import Link from 'next/link';
import { Download, Check, KeyRound } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Primitives';
import { Container } from '@/components/ui/Container';
import { downloads, plan, site } from '@/lib/site';
import { DashboardMock } from '@/components/mockups/DashboardMock';

// e.g. "0.1.0" -> "0.1" for the early-access badge.
const shortVersion = site.currentVersion.split('.').slice(0, 2).join('.');
const win = downloads.windows;

// Tally-style scannable value props — instant business credibility.
const highlights = [
  'GST-ready invoicing',
  'GSTR-1, GSTR-3B & e-invoice',
  'Offline-first',
  'AES-256 encrypted',
  'Keyboard-driven',
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <Container size="wide" className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge tone="brand" className="animate-fade-up">
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
            Now in early access · v{shortVersion}
          </Badge>
          <h1 className="animate-fade-up mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-[var(--fg)] sm:text-5xl lg:text-[3.75rem]">
            Accounting &amp; ERP that&apos;s{' '}
            <span className="text-gradient">fast, offline, and built for India</span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)] sm:text-xl">
            A modern, fully keyboard-driven desktop app for every Indian business — from a single
            shop to a multi-branch, multi-company enterprise. GST-ready invoicing, inventory, and
            vouchers, with sub-200ms actions and your data encrypted on your own machine.
          </p>

          {/* Primary CTAs. The licence leads, the download follows — the app
              activates with a License Number, so sending someone to the
              installer first lands them on an activation screen with nothing to
              type into it. */}
          <div className="animate-fade-up mt-9 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/request-license/" size="lg">
              <KeyRound className="h-5 w-5" />
              Start your {plan.trialDays}-day trial
            </ButtonLink>
            <ButtonLink href={win.href ?? '/download/'} external variant="outline" size="lg">
              <Download className="h-5 w-5" />
              Download for Windows
            </ButtonLink>
          </div>
          <p className="animate-fade-up mt-3 text-sm text-[var(--fg-subtle)]">
            {plan.trialDays}-day trial, no card · {win.sizeHint} · macOS &amp; Linux coming soon.
            Activates with a License Number we issue — by{' '}
            <Link href="/terms/" className="underline underline-offset-2 hover:text-[var(--fg)]">
              Terms
            </Link>{' '}
            &amp;{' '}
            <Link href="/privacy/" className="underline underline-offset-2 hover:text-[var(--fg)]">
              Privacy
            </Link>
            .
          </p>

          {/* Tally-style highlight strip */}
          <ul className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
            {highlights.map((h) => (
              <li
                key={h}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-sm font-medium text-[var(--fg-muted)]"
              >
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Product screenshot on a brand-gradient shelf that bleeds from the hero */}
      <div className="relative mt-16 sm:mt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-10 h-[70%] bg-gradient-to-b from-brand-500/20 via-brand-500/8 to-transparent blur-3xl"
        />
        <Container size="wide" className="pb-4">
          <div className="animate-fade-up mx-auto max-w-5xl rounded-2xl bg-gradient-to-b from-brand-500/12 to-transparent p-1.5 shadow-2xl shadow-brand-950/20 ring-1 ring-inset ring-[var(--border)] sm:p-2">
            <DashboardMock />
          </div>
        </Container>
      </div>
    </section>
  );
}
