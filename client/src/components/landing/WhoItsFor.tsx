import { Truck, Factory, Store, Briefcase, ShoppingCart, GraduationCap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card, SectionHeading } from '@/components/ui/Primitives';

interface Audience {
  icon: typeof Truck;
  title: string;
  body: string;
}

const audiences: Audience[] = [
  {
    icon: Truck,
    title: 'Wholesalers & distributors',
    body: 'High invoice volumes fly through keyboard-driven billing, with items, warehouses and ledger balances always a keystroke away.',
  },
  {
    icon: Factory,
    title: 'Manufacturers (job-work)',
    body: 'Delivery challans, stock journals and job-work rates track material out and finished goods in across outsourced stages.',
  },
  {
    icon: Store,
    title: 'Retailers',
    body: 'Fast counter billing with GST-ready invoices, tidy inventory, and day-book and ledger reports that reconcile at day end.',
  },
  {
    icon: Briefcase,
    title: 'Service businesses',
    body: 'Bill services against SAC codes, run receivables from ledger statements, and file GSTR-1/3B without a separate tool.',
  },
  {
    icon: ShoppingCart,
    title: 'Ecommerce sellers',
    body: 'Keep GST-clean books across marketplaces, reconcile stock movement, and export returns and reports to Excel in a click.',
  },
  {
    icon: GraduationCap,
    title: 'Schools & institutions',
    body: 'Run multi-ledger accounting with RBAC and a tamper-evident audit trail, so fees and expenses stay accountable.',
  },
];

export function WhoItsFor() {
  return (
    <section className="border-b border-[var(--border)]">
      <Container size="wide" className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Who it's for"
          title="Fits the way your trade actually works"
          description="One app covers the books, GST and inventory for a wide range of Indian businesses of every size — from fast-moving trade counters to job-work manufacturing floors."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map(({ icon: Icon, title, body }) => (
            <Card key={title} hover className="flex flex-col gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                <Icon className="h-5 w-5" aria-hidden />
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
