import { Keyboard } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Primitives';

interface Shortcut {
  keys: string[];
  action: string;
}

const shortcuts: Shortcut[] = [
  { keys: ['Ctrl', 'N'], action: 'New voucher' },
  { keys: ['Alt', 'S'], action: 'Save & next' },
  { keys: ['/'], action: 'Search anything' },
  { keys: ['Ctrl', 'P'], action: 'Print / PDF' },
  { keys: ['F5'], action: 'Change date' },
  { keys: ['Ctrl', 'K'], action: 'Command palette' },
  { keys: ['Alt', 'C'], action: 'Switch company' },
  { keys: ['Esc'], action: 'Cancel / back' },
];

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="inline-flex min-w-[1.75rem] items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-2 py-1 font-mono text-xs font-semibold text-[var(--fg)] shadow-sm">
      {children}
    </kbd>
  );
}

export function KeyboardHighlight() {
  return (
    <section className="border-b border-[var(--border)]">
      <Container size="wide" className="py-20 sm:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Fully keyboard-driven</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
              Your hands never leave the keyboard
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--fg-muted)]">
              Every action has a shortcut, and every shortcut lands in one frame. Fly through data
              entry the way power users of the old accounting tools always wanted to — no mouse
              required, no lag between keystroke and result.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400">
              <Keyboard className="h-4.5 w-4.5" aria-hidden />
              Muscle memory that respects an accountant&apos;s speed
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6">
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {shortcuts.map(({ keys, action }) => (
                <li
                  key={action}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3"
                >
                  <span className="text-sm font-medium text-[var(--fg-muted)]">{action}</span>
                  <span className="flex items-center gap-1">
                    {keys.map((k, i) => (
                      <span key={k} className="flex items-center gap-1">
                        {i > 0 && (
                          <span className="text-xs text-[var(--fg-subtle)]" aria-hidden>
                            +
                          </span>
                        )}
                        <Kbd>{k}</Kbd>
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
