import { Container } from '@/components/ui/Container';
import { Card, SectionHeading } from '@/components/ui/Primitives';
import {
  InvoiceIllustration,
  ReportsIllustration,
  GstIllustration,
  OfflineSyncIllustration,
} from '@/components/illustrations/Illustrations';

const visuals = [
  {
    Illustration: InvoiceIllustration,
    title: 'GST invoicing & vouchers',
    body: 'Raise tax invoices with HSN/SAC, CGST/SGST/IGST and ₹ totals — plus the full voucher set, all at keyboard speed.',
  },
  {
    Illustration: GstIllustration,
    title: 'GSTR-1, GSTR-3B & e-invoicing',
    body: 'Generate GSTR-1 and GSTR-3B to Excel, with sales/purchase registers, HSN summary, e-invoice and e-way bill built in.',
  },
  {
    Illustration: ReportsIllustration,
    title: 'Reports that tie out',
    body: 'Trial Balance, P&L, Balance Sheet and Cash Flow read from one ledger — export any report to PDF or Excel.',
  },
  {
    Illustration: OfflineSyncIllustration,
    title: 'Offline-first, encrypted',
    body: 'Your books live on your machine, AES-256 encrypted — with optional, isolated cloud backup when you want it.',
  },
];

export function ProductVisuals() {
  return (
    <section className="border-b border-[var(--border)] py-20 sm:py-24">
      <Container size="wide">
        <SectionHeading
          eyebrow="Built for real accounting"
          title="Finance, GST and inventory — in one fast desktop app"
          description="Purpose-built for Indian business: invoicing, GST returns, ledgers and stock, not a generic template."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visuals.map(({ Illustration, title, body }) => (
            <Card key={title} hover className="flex flex-col">
              <div className="mb-5 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <Illustration className="h-40 w-full" />
              </div>
              <h3 className="font-display text-base font-bold text-[var(--fg)]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
