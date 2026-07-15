import { Download, Building2, Keyboard, CloudUpload } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/Primitives';

interface Step {
  icon: typeof Download;
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    icon: Download,
    title: 'Install in seconds',
    body: 'Download the one-click Windows installer and run it — no account, no credit card, no trial timer. Acronix Books installs locally in a few seconds and quietly keeps itself up to date from then on.',
  },
  {
    icon: Building2,
    title: 'Create your company & masters',
    body: 'Set up your company with its GSTIN and financial year, then build out the masters you need — ledgers and account groups, tax categories with HSN/SAC, items, units and warehouses. Run several companies from one install and switch between them instantly.',
  },
  {
    icon: Keyboard,
    title: 'Enter vouchers at keyboard speed',
    body: 'Record the full voucher set — sales, purchase, receipt, payment, contra, journal, credit and debit notes — without ever reaching for the mouse. Every field, series and bill reference is a keystroke away, and common actions land in under 200ms.',
  },
  {
    icon: CloudUpload,
    title: 'File GST, then sync & back up',
    body: 'Generate GSTR-1 and GSTR-3B in one click and export to Excel for filing. Take encrypted backups on your schedule, and optionally turn on cloud sync to keep an isolated, encrypted copy that restores cleanly onto a fresh device.',
  },
];

export function HowItWorks() {
  return (
    <section className="border-b border-[var(--border)]">
      <Container size="wide" className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="How it works"
          title="From install to filed returns"
          description="Acronix Books follows the rhythm accountants already know — set up once, enter fast all year, and file at quarter end. Here is the whole loop."
        />
        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, body }, index) => (
            <li
              key={title}
              className="relative flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-display text-3xl font-bold text-[var(--border-strong)]">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--fg)]">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
