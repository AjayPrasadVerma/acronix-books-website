import { Building2, Database, Users, FileText } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/Primitives';

interface Item {
  icon: typeof Building2;
  title: string;
  body: string;
}

const items: Item[] = [
  {
    icon: Building2,
    title: 'Create your first company',
    body: 'On first launch you create a company file — its name, GSTIN and April–March financial year. No account, sign-up or internet connection is needed to work offline; you can be raising your first invoice within a minute of opening the app.',
  },
  {
    icon: Database,
    title: 'Your data lives on your machine',
    body: 'The company file is stored locally on your own disk and encrypted at rest with SQLCipher (AES-256). It never leaves your machine unless you deliberately take a backup or turn on cloud sync, so you stay in full control of your books.',
  },
  {
    icon: Users,
    title: 'Set up users & roles',
    body: 'Add users and assign role-based permissions (RBAC) to control who can view and post what. A per-user key vault and a recovery code protect access, and idle auto-lock secures sessions that are left unattended.',
  },
  {
    icon: FileText,
    title: 'Build masters and start entering',
    body: 'Set up ledgers, tax categories, items, units and warehouses, then record vouchers at keyboard speed. When it is time to file, generate GSTR-1 and GSTR-3B and export your reports to PDF or Excel.',
  },
];

export function FirstRun() {
  return (
    <section className="mt-24">
      <Container size="narrow">
        <SectionHeading
          eyebrow="After you install"
          title="What happens on first run"
          description="No account, no setup wizard maze — here is exactly what to expect the first time you open Acronix Books."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-bold text-[var(--fg)]">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
