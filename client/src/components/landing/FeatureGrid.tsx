import Link from 'next/link';
import {
  FileText,
  Receipt,
  Package,
  BarChart3,
  Lock,
  RefreshCw,
  ArrowUpRight,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card, SectionHeading } from '@/components/ui/Primitives';

interface Feature {
  icon: typeof FileText;
  title: string;
  body: string;
  href: string;
}

const features: Feature[] = [
  {
    icon: FileText,
    title: 'Invoicing & Vouchers',
    body: 'Full voucher set — sales, purchase, receipt, payment, contra, journal, credit & debit notes — with series, bills and financial years.',
    href: '/features/#invoicing',
  },
  {
    icon: Receipt,
    title: 'GST Filing — GSTR-1 / 3B',
    body: 'GST-ready invoicing, HSN & tax categories, and one-click GSTR-1 and GSTR-3B generation with Excel export.',
    href: '/features/#gst',
  },
  {
    icon: Package,
    title: 'Inventory & Stock',
    body: 'Items, item groups, units, warehouses, stock journals, delivery challans and job-work rates — built for traders.',
    href: '/features/#inventory',
  },
  {
    icon: BarChart3,
    title: 'Reports & Exports',
    body: 'Ledger statements and a deep library of reports, each exportable to polished PDF and Excel in a click.',
    href: '/features/#reports',
  },
  {
    icon: Lock,
    title: 'Security & Encryption',
    body: 'SQLCipher AES-256 at rest, an envelope key vault with per-user slots, RBAC, and a tamper-evident audit chain.',
    href: '/features/#security',
  },
  {
    icon: RefreshCw,
    title: 'Cloud Sync & Backup',
    body: 'Optional full-book sync with per-client isolated encrypted backup and fresh-device restore — offline-first, always.',
    href: '/features/#sync',
  },
];

export function FeatureGrid() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container size="wide" className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Everything in one app"
          title="A complete accounting & ERP toolkit"
          description="From the first invoice to your GST return — every module is built in, works offline, and stays out of your way."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body, href }) => (
            <Link key={title} href={href} className="group focus-visible:outline-none">
              <Card hover className="h-full">
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-[var(--fg-subtle)] transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[var(--fg)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
