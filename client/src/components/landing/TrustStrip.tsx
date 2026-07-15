import { Zap, Layers, Lock, Receipt } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const items = [
  { icon: Zap, label: 'Sub-200ms actions' },
  { icon: Layers, label: '50,000+ vouchers / FY' },
  { icon: Lock, label: 'AES-256 encrypted' },
  { icon: Receipt, label: 'GST-ready' },
] as const;

export function TrustStrip() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container size="wide" className="py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-[var(--fg-muted)]">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
