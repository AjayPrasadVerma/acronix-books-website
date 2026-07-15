import { Zap, WifiOff, ShieldCheck, Receipt } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Primitives';

interface Pillar {
  icon: typeof Zap;
  title: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    icon: Zap,
    title: 'Fast',
    body: 'Sub-200ms common actions, sub-50ms hot queries, one-frame keyboard shortcuts, and virtualized lists that never stutter.',
  },
  {
    icon: WifiOff,
    title: 'Offline-first',
    body: 'Everything runs locally. No spinner waiting on the cloud — the internet is optional, never required to get work done.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure',
    body: 'Encrypted at rest with AES-256, per-user key vault, encrypted backups, and a tamper-evident audit trail.',
  },
  {
    icon: Receipt,
    title: 'GST-ready',
    body: 'GST-aware invoicing, HSN/tax categories, and one-click GSTR-1 & GSTR-3B generation with Excel export.',
  },
];

export function Pillars() {
  return (
    <section className="border-b border-[var(--border)]">
      <Container size="wide" className="py-20 sm:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="flex flex-col gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                <Icon className="h-5.5 w-5.5" aria-hidden />
              </span>
              <h3 className="font-display text-lg font-bold text-[var(--fg)]">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
