import { RadioTower, DownloadCloud, RotateCw } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface Stage {
  icon: typeof RadioTower;
  title: string;
  body: string;
}

const stages: Stage[] = [
  {
    icon: RadioTower,
    title: 'Checks the release feed',
    body: 'In the background, the installed app periodically checks the secure update feed for a newer published version. This is a lightweight check that never interrupts what you are doing.',
  },
  {
    icon: DownloadCloud,
    title: 'Downloads in the background',
    body: 'When a newer release is found, it downloads quietly while you keep working. There is nothing to reinstall and no separate installer to hunt down.',
  },
  {
    icon: RotateCw,
    title: 'Applies on restart',
    body: 'The update is applied the next time you restart Acronix Books, so you are always on the latest version without breaking your flow. You can also trigger a manual check any time.',
  },
];

export function UpdatesExplainer() {
  return (
    <section className="mt-16">
      <Container size="narrow">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 sm:p-8">
          <h3 className="font-display text-lg font-bold text-[var(--fg)]">
            How the auto-updater works
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
            You install once and stay current — the update flow is fully automatic, with a manual
            check available whenever you want to force it.
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {stages.map(({ icon: Icon, title, body }, index) => (
              <li
                key={title}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-[var(--fg-subtle)]">
                    Step {index + 1}
                  </span>
                </div>
                <h4 className="mt-3 text-sm font-bold text-[var(--fg)]">{title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
