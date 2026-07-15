'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { site, updateFeed } from '@/lib/site';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'loading' | 'up-to-date' | 'newer' | 'error';

interface Result {
  status: Status;
  latest: string | null;
}

const UNREACHABLE =
  "Couldn't reach the update server — the app updates itself automatically once installed.";

/** Parse the electron-updater `latest.yml` for its `version:` line without
 * pulling in a YAML dependency. Returns null when the line is absent. */
function parseVersion(text: string): string | null {
  const match = text.match(/^version:\s*(.+)$/m);
  const captured = match?.[1];
  if (!captured) return null;
  const value = captured.trim().replace(/^['"]|['"]$/g, '');
  return value.length > 0 ? value : null;
}

/** Compare dotted numeric versions. Returns 1 if a > b, -1 if a < b, 0 equal.
 * Falls back to a string compare for any non-numeric segment. */
function compareVersions(a: string, b: string): number {
  const pa = a.split('.');
  const pb = b.split('.');
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i += 1) {
    const na = Number.parseInt(pa[i] ?? '0', 10);
    const nb = Number.parseInt(pb[i] ?? '0', 10);
    if (Number.isNaN(na) || Number.isNaN(nb)) {
      const sa = pa[i] ?? '';
      const sb = pb[i] ?? '';
      if (sa === sb) continue;
      return sa > sb ? 1 : -1;
    }
    if (na !== nb) return na > nb ? 1 : -1;
  }
  return 0;
}

export function UpdateChecker() {
  const [result, setResult] = useState<Result>({ status: 'idle', latest: null });

  async function check() {
    setResult({ status: 'loading', latest: null });
    try {
      const response = await fetch(updateFeed.manifest, { cache: 'no-store' });
      if (!response.ok) {
        setResult({ status: 'error', latest: null });
        return;
      }
      const text = await response.text();
      const latest = parseVersion(text);
      if (!latest) {
        setResult({ status: 'error', latest: null });
        return;
      }
      const cmp = compareVersions(latest, site.currentVersion);
      setResult({ status: cmp > 0 ? 'newer' : 'up-to-date', latest });
    } catch {
      // Network failure, CORS block, DNS, abort — all land here. Never throws.
      setResult({ status: 'error', latest: null });
    }
  }

  const loading = result.status === 'loading';

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--fg)]">Check for the latest version</p>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            Bundled with this release:{' '}
            <span className="font-mono font-semibold text-[var(--fg)]">v{site.currentVersion}</span>
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={check}
          disabled={loading}
          className="shrink-0"
        >
          <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} aria-hidden="true" />
          {loading ? 'Checking…' : 'Check now'}
        </Button>
      </div>

      <div aria-live="polite" className="mt-4">
        {result.status === 'up-to-date' && (
          <StatusRow
            tone="ok"
            icon={<CheckCircle2 className="h-5 w-5" aria-hidden="true" />}
            title="You're on the latest version."
            detail={`Published release: v${result.latest ?? site.currentVersion}.`}
          />
        )}
        {result.status === 'newer' && (
          <StatusRow
            tone="info"
            icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
            title={`A newer version is available — v${result.latest}.`}
            detail="Installed apps update themselves automatically, or grab the latest installer above."
          />
        )}
        {result.status === 'error' && (
          <StatusRow
            tone="warn"
            icon={<AlertCircle className="h-5 w-5" aria-hidden="true" />}
            title="Update server unreachable"
            detail={UNREACHABLE}
          />
        )}
      </div>

      <p className="mt-4 text-xs text-[var(--fg-subtle)]">
        The installed desktop app checks this feed automatically in the background — you rarely need
        to do this yourself.
      </p>
    </div>
  );
}

function StatusRow({
  tone,
  icon,
  title,
  detail,
}: {
  tone: 'ok' | 'info' | 'warn';
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border px-4 py-3',
        tone === 'ok' &&
          'border-teal-200 bg-teal-50 dark:border-teal-400/25 dark:bg-teal-400/10',
        tone === 'info' &&
          'border-brand-200 bg-brand-50 dark:border-brand-400/25 dark:bg-brand-400/10',
        tone === 'warn' &&
          'border-amber-200 bg-amber-50 dark:border-amber-400/25 dark:bg-amber-400/10',
      )}
    >
      <span
        className={cn(
          'mt-0.5 shrink-0',
          tone === 'ok' && 'text-teal-600 dark:text-teal-400',
          tone === 'info' && 'text-brand-600 dark:text-brand-400',
          tone === 'warn' && 'text-amber-600 dark:text-amber-400',
        )}
      >
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-[var(--fg)]">{title}</p>
        <p className="mt-0.5 text-sm text-[var(--fg-muted)]">{detail}</p>
      </div>
    </div>
  );
}
