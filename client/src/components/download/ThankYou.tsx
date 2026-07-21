'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CircleCheckBig,
  Download,
  KeyRound,
  LifeBuoy,
  ScrollText,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { downloadFiles, plan, type DownloadFileKey } from '@/lib/site';

function isDownloadKey(value: string | null): value is DownloadFileKey {
  return value !== null && Object.prototype.hasOwnProperty.call(downloadFiles, value);
}

const NEXT_STEPS = [
  {
    icon: KeyRound,
    title: `Activate your ${plan.trialDays}-day trial`,
    body: 'Request a License Number and unlock the app — no card needed to start.',
    href: '/request-license/',
  },
  {
    icon: BookOpen,
    title: 'Set up in under a minute',
    body: 'From install to your first GST invoice, one step at a time.',
    href: '/docs/getting-started/',
  },
  {
    icon: ScrollText,
    title: "See what's new",
    body: 'The latest release notes and everything that shipped.',
    href: '/changelog/',
  },
  {
    icon: LifeBuoy,
    title: 'Need a hand?',
    body: 'Reach a real person on chat or email — we reply fast.',
    href: '/support/',
  },
] as const;

export function ThankYou() {
  const params = useSearchParams();
  const key = isDownloadKey(params.get('d')) ? (params.get('d') as DownloadFileKey) : null;
  const file = key ? downloadFiles[key] : null;

  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!file) return;
    // The installer is same-origin, so a programmatic click on a `download`
    // anchor starts the file download without navigating away from this page.
    // Best-effort — the visible link below is the guaranteed manual fallback if
    // a browser download blocker intervenes.
    const timer = setTimeout(() => {
      anchorRef.current?.click();
      setStarted(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [file]);

  const filename = file ? file.href.split('/').pop() : null;

  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-400/25 dark:bg-brand-400/10 dark:text-brand-400">
          <CircleCheckBig className="h-7 w-7" aria-hidden="true" />
        </span>

        {file ? (
          <>
            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
              Your download is starting
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--fg-muted)]">
              Acronix Books for <span className="font-semibold text-[var(--fg)]">{file.label}</span>{' '}
              {started ? 'should be downloading now.' : 'will begin in a moment.'} If nothing
              happens, use the link below.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <a
                ref={anchorRef}
                href={file.href}
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[var(--bg)]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download again
              </a>
              {filename && (
                <span className="font-mono text-xs text-[var(--fg-subtle)]">{filename}</span>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
              Ready when you are
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--fg-muted)]">
              Pick your platform on the download page and the installer will start automatically.
            </p>
            <div className="mt-8">
              <ButtonLink href="/download/" size="lg">
                <Download className="h-4 w-4" aria-hidden="true" />
                Go to downloads
              </ButtonLink>
            </div>
          </>
        )}
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
          While that downloads — your next steps
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {NEXT_STEPS.map((step) => (
            <li key={step.href}>
              <Link
                href={step.href}
                className="group flex h-full items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 transition-colors hover:border-brand-300 dark:hover:border-brand-400/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-400/25 dark:bg-brand-400/10 dark:text-brand-400">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-semibold text-[var(--fg)]">
                    {step.title}
                    <ArrowRight className="h-4 w-4 shrink-0 text-[var(--fg-subtle)] transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600 dark:group-hover:text-brand-400" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-[var(--fg-muted)]">
                    {step.body}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
