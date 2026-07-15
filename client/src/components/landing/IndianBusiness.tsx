import {
  Receipt,
  CalendarRange,
  IndianRupee,
  Barcode,
  Building2,
  Scissors,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card, SectionHeading } from '@/components/ui/Primitives';

interface Item {
  icon: typeof Receipt;
  title: string;
  body: string;
}

const items: Item[] = [
  {
    icon: Receipt,
    title: 'Built around the GST return cycle',
    body: 'Invoices carry the GST detail returns actually need, so GSTR-1 and GSTR-3B generate in one click and export to Excel — matching how you file each month or quarter on the portal.',
  },
  {
    icon: CalendarRange,
    title: 'April–March financial year',
    body: 'Periods, opening balances and reports follow the Indian FY (Apr–Mar), not a January calendar year, so your day book, ledgers and trial balance line up with how you actually close the books.',
  },
  {
    icon: IndianRupee,
    title: 'Rupee formatting throughout',
    body: 'Amounts render in the Indian numbering system with lakh and crore grouping and the ₹ symbol, so figures read the way your team, auditors and clients expect at a glance.',
  },
  {
    icon: Barcode,
    title: 'HSN / SAC & tax categories',
    body: 'Attach HSN codes to goods and SAC codes to services through reusable tax categories, keeping rates consistent across items and flowing correctly into every invoice and return.',
  },
  {
    icon: Building2,
    title: 'Multi-company & multi-branch',
    body: 'Run several companies or branches from a single install, each with its own GSTIN, masters and books, and switch between them instantly without juggling separate files or logins.',
  },
  {
    icon: Scissors,
    title: 'Job-work for manufacturers & textile',
    body: 'Track material sent and received through delivery challans, warehouses and stock journals, with job-work rates for units that outsource stages of manufacturing — a fit for textile and fabrication trades.',
  },
];

export function IndianBusiness() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container size="wide" className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Made for Indian business"
          title="It already speaks GST, ₹ and Apr–Mar"
          description="Acronix Books is built for the way Indian businesses of every size run — the compliance calendar, the numbering, and the trades are baked in, not bolted on for a global template."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="flex flex-col gap-3">
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
