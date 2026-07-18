import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Primitives';
import { DashboardMock } from '@/components/mockups/DashboardMock';
import { VoucherEntryMock } from '@/components/mockups/VoucherEntryMock';
import { Gstr1Mock } from '@/components/mockups/Gstr1Mock';

// "See the actual app" — real product mockups, not stock illustrations. Shared
// across every industry and solution page: it is the same app for every trade,
// so the same screens are honest everywhere. This is the section that turns a
// text-only page into something that looks like a real product — using assets
// that already exist in the repo (they were only on the homepage before).
//
// The mockups render inside `.acx-app`, so they carry the real ERP design
// tokens (dense, sharp, DR-red / CR-emerald) even on a marketing page — the app
// is shown as it is, never dressed up to match the page around it.
const shots = [
  {
    title: 'The gateway',
    body: 'Open to work, not a welcome screen. Key figures, GST due dates and recent vouchers, all on one keyboard-driven dashboard.',
    render: () => <DashboardMock />,
  },
  {
    title: 'Voucher entry at keyboard speed',
    body: 'Sale, purchase, receipt, payment — one fast form, party and item search inline, totals live as you type. No mouse required.',
    render: () => <VoucherEntryMock />,
  },
  {
    title: 'GST returns, filing-ready',
    body: 'GSTR-1 laid out the way the portal expects it, generated from the same vouchers you already entered — nothing re-keyed.',
    render: () => <Gstr1Mock />,
  },
];

export function ProductShowcase() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container size="wide" className="py-20 sm:py-24">
        <div className="max-w-2xl">
          <Badge tone="brand">The actual app</Badge>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            Not a mockup of a promise
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--fg-muted)]">
            These are real screens from the build you can download today — the same app whichever
            trade you run.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {shots.map((shot, i) => (
            <div
              key={shot.title}
              className="grid items-center gap-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 sm:p-6 lg:grid-cols-2 lg:gap-12"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <h3 className="font-display text-xl font-bold text-[var(--fg)]">{shot.title}</h3>
                <p className="mt-3 text-[var(--fg-muted)] leading-relaxed">{shot.body}</p>
              </div>
              <div
                className={`overflow-hidden rounded-xl ring-1 ring-inset ring-[var(--border)] ${
                  i % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                {shot.render()}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
