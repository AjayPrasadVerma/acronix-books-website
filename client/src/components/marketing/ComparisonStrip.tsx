import { Check, Minus } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Primitives';

// Acronix vs the traditional desktop accounting software an Indian SMB is
// most likely moving from. Every row is a REAL, verifiable difference — no
// invented competitor weaknesses, no fabricated benchmarks. Shared across all
// industry/solution pages (the differentiators don't change by trade).
//
// Deliberately "traditional accounting software", not a named competitor:
// naming one invites a feature-by-feature fight we'd have to keep honest and
// current, and risks claims we can't stand behind. The contrast that matters
// to a switcher is the architecture, and that we can state plainly.
interface Row {
  label: string;
  acronix: string;
  traditional: string;
  /** Whether the traditional side is a genuine "no" (—) or just different. */
  traditionalHas: boolean;
}

const rows: Row[] = [
  {
    label: 'Data at rest',
    acronix: 'AES-256 encrypted file — unreadable if the disk is copied',
    traditional: 'Usually a plain local data folder',
    traditionalHas: false,
  },
  {
    label: 'Switching machines',
    acronix: 'Sign in on the new device and your books sync down',
    traditional: 'Surrender the licence, copy a backup, restore by hand',
    traditionalHas: false,
  },
  {
    label: 'Working offline',
    acronix: 'Fully offline-first — no internet needed to run',
    traditional: 'Offline too, but cloud backup is bolt-on',
    traditionalHas: true,
  },
  {
    label: 'Keyboard-first entry',
    acronix: 'Every action has a shortcut; hands never leave the keys',
    traditional: 'Keyboard-driven — the one thing they got right',
    traditionalHas: true,
  },
  {
    label: 'The interface',
    acronix: 'A modern, high-density UI built this decade',
    traditional: 'Functional, but a 1990s screen',
    traditionalHas: false,
  },
  {
    label: 'GST suite',
    acronix: 'GSTR-1, 3B, e-invoice, e-way bill from the same vouchers',
    traditional: 'Present, often as paid add-ons',
    traditionalHas: true,
  },
];

export function ComparisonStrip() {
  return (
    <section className="border-b border-[var(--border)]">
      <Container size="wide" className="py-20 sm:py-24">
        <div className="max-w-2xl">
          <Badge tone="neutral">The honest comparison</Badge>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Moving from older accounting software?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--fg-muted)]">
            Where Acronix is genuinely different — and where the tool you have already does the job.
            No invented weaknesses.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--border)]">
          <div className="hidden grid-cols-[1.1fr_1.4fr_1.4fr] bg-[var(--bg-subtle)] text-sm font-semibold text-[var(--fg)] sm:grid">
            <div className="p-4"> </div>
            <div className="border-l border-[var(--border)] p-4 text-brand-600 dark:text-brand-400">
              Acronix Books
            </div>
            <div className="border-l border-[var(--border)] p-4 text-[var(--fg-muted)]">
              Traditional accounting software
            </div>
          </div>
          <ul>
            {rows.map((row, i) => (
              <li
                key={row.label}
                className={`grid gap-y-1 p-4 sm:grid-cols-[1.1fr_1.4fr_1.4fr] sm:gap-0 sm:p-0 ${
                  i > 0 ? 'border-t border-[var(--border)]' : ''
                }`}
              >
                <div className="text-sm font-semibold text-[var(--fg)] sm:p-4">{row.label}</div>
                <div className="flex items-start gap-2 text-sm text-[var(--fg-muted)] sm:border-l sm:border-[var(--border)] sm:p-4">
                  <Check
                    className="mt-0.5 h-4 w-4 flex-none text-brand-600 dark:text-brand-400"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{row.acronix}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-[var(--fg-muted)] sm:border-l sm:border-[var(--border)] sm:p-4">
                  {row.traditionalHas ? (
                    <Check className="mt-0.5 h-4 w-4 flex-none text-[var(--fg-subtle)]" aria-hidden />
                  ) : (
                    <Minus className="mt-0.5 h-4 w-4 flex-none text-[var(--fg-subtle)]" aria-hidden />
                  )}
                  <span className="leading-relaxed">{row.traditional}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
