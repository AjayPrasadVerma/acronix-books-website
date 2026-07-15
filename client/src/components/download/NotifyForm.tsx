'use client';

import { useEffect, useState } from 'react';
import { Bell, Check, Mail } from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/Button';
import { site, type Platform } from '@/lib/site';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'acronix-notify';

const PLATFORM_LABEL: Record<Platform, string> = {
  windows: 'Windows',
  mac: 'macOS',
  linux: 'Linux',
  unknown: 'your platform',
};

// Deliberately permissive but sane client-side check. No server ever sees this.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface StoredIntent {
  email: string;
  platforms: Platform[];
  savedAt: string;
}

function readIntent(): StoredIntent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      'email' in parsed &&
      typeof (parsed as { email: unknown }).email === 'string'
    ) {
      const record = parsed as Record<string, unknown>;
      const platforms = Array.isArray(record.platforms)
        ? record.platforms.filter((p): p is Platform => typeof p === 'string')
        : [];
      return {
        email: record.email as string,
        platforms,
        savedAt: typeof record.savedAt === 'string' ? record.savedAt : '',
      };
    }
  } catch {
    return null;
  }
  return null;
}

export function NotifyForm({ platform }: { platform: Platform }) {
  const label = PLATFORM_LABEL[platform];
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = readIntent();
    if (existing && existing.platforms.includes(platform)) {
      setEmail(existing.email);
      setSaved(true);
    }
  }, [platform]);

  const subject = `Notify me: ${site.name} for ${label}`;
  const body = `Hi ${site.name} team,\n\nPlease let me know as soon as the ${label} build is available to download.\n\nThanks!`;
  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);

    // No backend: persist the intent locally only.
    try {
      const existing = readIntent();
      const platforms = new Set<Platform>(existing?.platforms ?? []);
      platforms.add(platform);
      const next: StoredIntent = {
        email: trimmed,
        platforms: Array.from(platforms),
        savedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage may be unavailable (private mode) — the mailto fallback
      // below still lets the visitor reach us, so we fail silently.
    }
    setSaved(true);
  }

  if (saved) {
    return (
      <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm dark:border-teal-400/25 dark:bg-teal-400/10">
        <p className="flex items-center gap-2 font-semibold text-teal-700 dark:text-teal-300">
          <Check className="h-4 w-4" aria-hidden="true" />
          We&rsquo;ll let you know.
        </p>
        <p className="mt-1 text-teal-700/80 dark:text-teal-300/80">
          Saved to this browser only — no server was contacted. Prefer email?{' '}
          <a
            href={mailtoHref}
            className="font-semibold underline underline-offset-2 hover:no-underline"
          >
            Message us directly
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
      <label htmlFor={`notify-${platform}`} className="sr-only">
        Email address to be notified about {label}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--fg-subtle)]"
            aria-hidden="true"
          />
          <input
            id={`notify-${platform}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError(null);
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `notify-${platform}-error` : undefined}
            className={cn(
              'h-11 w-full rounded-xl border bg-[var(--bg)] pl-9 pr-3 text-sm text-[var(--fg)] transition-colors',
              'placeholder:text-[var(--fg-subtle)] focus-visible:border-brand-500',
              error ? 'border-red-400 dark:border-red-500/60' : 'border-[var(--border-strong)]',
            )}
          />
        </div>
        <Button type="submit" variant="primary" className="shrink-0">
          <Bell className="h-4 w-4" aria-hidden="true" />
          Notify me
        </Button>
      </div>
      {error && (
        <p id={`notify-${platform}-error`} className="text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      <p className="text-xs text-[var(--fg-subtle)]">
        No server, no spam — your email stays in this browser. Or{' '}
        <ButtonLink
          href={mailtoHref}
          variant="ghost"
          size="sm"
          className="inline h-auto p-0 text-xs font-semibold text-brand-600 hover:bg-transparent dark:text-brand-400"
        >
          email us instead
        </ButtonLink>
        .
      </p>
    </form>
  );
}
