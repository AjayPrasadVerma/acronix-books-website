import { MonitorCheck, Clock, FileArchive } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/Primitives';

interface Note {
  icon: typeof MonitorCheck;
  title: string;
  body: string;
}

const notes: Note[] = [
  {
    icon: MonitorCheck,
    title: 'Windows 10 & 11 (64-bit)',
    body: 'The current build targets 64-bit Windows 10 and 11 — the versions on the vast majority of office PCs today. It runs comfortably on everyday hardware from 4 GB RAM upward and needs only about 200 MB of disk for the app and your data. 32-bit Windows is not supported.',
  },
  {
    icon: MonitorCheck,
    title: 'Linux (AppImage & .deb)',
    body: 'Linux is available today as a universal AppImage that runs on most distributions with no installation, plus a .deb for Debian and Ubuntu. It runs on the same everyday hardware as the Windows build.',
  },
  {
    icon: Clock,
    title: 'macOS status',
    body: 'The macOS build (Apple Silicon and Intel) is actively in the pipeline but not released yet. Leave your email on the platform cards above and we will notify you the moment it is available to download.',
  },
  {
    icon: FileArchive,
    title: 'Data portability & backups',
    body: 'Your books are yours to move. Take encrypted backup files on your own schedule and restore them whenever you need, or turn on optional cloud sync to keep an isolated encrypted copy that restores cleanly onto a fresh device — so switching PCs never means losing history.',
  },
];

export function Compatibility() {
  return (
    <section className="mt-24">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Compatibility"
          title="Platforms & portability"
          description="What runs today, what is coming, and how your data travels with you."
        />
        <div className="mt-12 grid gap-5">
          {notes.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--fg)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
