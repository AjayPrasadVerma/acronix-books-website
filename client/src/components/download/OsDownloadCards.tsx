'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { Apple, Clock, Download, MonitorDown, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/Primitives';
import { Button, ButtonLink } from '@/components/ui/Button';
import { downloads, type DownloadTarget, type Platform } from '@/lib/site';
import { cn } from '@/lib/utils';
import { NotifyForm } from './NotifyForm';

type KnownPlatform = Exclude<Platform, 'unknown'>;

const ICONS: Record<KnownPlatform, ComponentType<{ className?: string }>> = {
  windows: MonitorDown,
  mac: Apple,
  linux: Terminal,
};

const ORDER: KnownPlatform[] = ['windows', 'mac', 'linux'];

/** Best-effort OS detection. Prefers the modern UA-Client-Hints API and falls
 * back to a coarse userAgent sniff. Never throws. */
function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'unknown';

  const hinted = (
    navigator as Navigator & { userAgentData?: { platform?: string } }
  ).userAgentData?.platform;
  const raw = (hinted ?? navigator.userAgent ?? '').toLowerCase();

  if (!raw) return 'unknown';
  if (raw.includes('win')) return 'windows';
  if (raw.includes('mac') || raw.includes('iphone') || raw.includes('ipad') || raw.includes('ios')) {
    return 'mac';
  }
  if (raw.includes('linux') || raw.includes('android') || raw.includes('cros') || raw.includes('x11')) {
    return 'linux';
  }
  return 'unknown';
}

function PlatformIcon({ platform, className }: { platform: KnownPlatform; className?: string }) {
  const Icon = ICONS[platform];
  return <Icon className={className} />;
}

/** One platform column in the picker grid. The detected OS is highlighted. */
function PlatformCard({
  platform,
  target,
  recommended,
}: {
  platform: KnownPlatform;
  target: DownloadTarget;
  recommended: boolean;
}) {
  const available = target.status === 'available' && target.href !== null;

  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-2xl border bg-[var(--bg-elevated)] p-6 transition-colors',
        recommended
          ? 'border-brand-300 ring-1 ring-brand-500/20 dark:border-brand-400/40'
          : 'border-[var(--border)]',
      )}
    >
      {recommended && (
        <span className="absolute -top-3 left-6 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-brand-700 dark:border-brand-400/30 dark:bg-brand-400/15 dark:text-brand-300">
          Recommended for you
        </span>
      )}

      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl border',
            available
              ? 'border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-400/25 dark:bg-brand-400/10 dark:text-brand-400'
              : 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg-subtle)]',
          )}
        >
          <PlatformIcon platform={platform} className="h-6 w-6" />
        </span>
        {available ? (
          <Badge tone="accent">Available now</Badge>
        ) : (
          <Badge tone="neutral">
            <Clock className="h-3 w-3" aria-hidden="true" />
            Coming soon
          </Badge>
        )}
      </div>

      <h3 className="mt-4 font-display text-xl font-bold text-[var(--fg)]">{target.label}</h3>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">{target.sizeHint}</p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{target.note}</p>

      <div className="mt-auto pt-5">
        {available && target.href ? (
          <>
            <ButtonLink href={target.href} className="w-full">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download for {target.label}
            </ButtonLink>
            <p className="mt-2 text-center text-xs text-[var(--fg-subtle)]">
              Free · No account required
            </p>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <Button type="button" variant="outline" className="w-full" disabled>
              <Clock className="h-4 w-4" aria-hidden="true" />
              Not yet available
            </Button>
            <NotifyForm platform={platform} />
          </div>
        )}
      </div>
    </div>
  );
}

export function OsDownloadCards() {
  // Render deterministically on the server (Windows-first), then refine once we
  // can read `navigator` on the client. Avoids hydration mismatches.
  const [detected, setDetected] = useState<Platform>('unknown');

  useEffect(() => {
    setDetected(detectPlatform());
  }, []);

  const recommended: KnownPlatform =
    detected === 'mac' || detected === 'linux' ? detected : 'windows';

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {ORDER.map((platform) => (
        <PlatformCard
          key={platform}
          platform={platform}
          target={downloads[platform]}
          recommended={platform === recommended}
        />
      ))}
    </div>
  );
}
