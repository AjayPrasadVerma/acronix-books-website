import { Gauge, WifiOff, Server } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Primitives';

interface Reason {
  icon: typeof Gauge;
  title: string;
  body: string;
}

const reasons: Reason[] = [
  {
    icon: Gauge,
    title: 'No network round-trips',
    body: 'Your books live in a local database on the same machine as the app, so opening a ledger, saving a voucher or running a report is a memory-speed operation — not a request that travels to a server and back. That is why common actions finish in under 200ms even with 50,000+ vouchers in a financial year.',
  },
  {
    icon: WifiOff,
    title: 'Works during outages',
    body: 'Broadband drops, GST portals go down and offices lose connectivity at the worst moments. Because Acronix Books needs no live connection to do the work, billing and data entry carry on uninterrupted — the internet is only ever used when you choose to sync or back up.',
  },
  {
    icon: Server,
    title: 'Your data stays on your machine',
    body: 'Nothing is streamed to a vendor cloud by default. Your company file sits on your own disk, encrypted with SQLCipher (AES-256), and you decide if and when a copy leaves it. No subscription can lock you out of your own accounts.',
  },
];

export function WhyDesktop() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container size="wide" className="py-20 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <Eyebrow>Why desktop, why offline-first</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
              Local-first beats the cloud where it counts
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--fg-muted)]">
              Cloud accounting is convenient until the connection isn&apos;t there or the server is
              busy. A desktop-native, offline-first app removes the network from the critical path
              entirely.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--fg-muted)]">
              You still get modern sync and backup — but as an option layered on top, never a
              dependency you have to keep alive just to raise an invoice.
            </p>
          </div>

          <div className="grid gap-5">
            {reasons.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-[var(--fg)]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
