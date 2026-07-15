import { Faq, type FaqItem } from '@/components/site/Faq';

const items: FaqItem[] = [
  {
    question: 'What is Acronix Books?',
    answer:
      'Acronix Books is a modern ERP and accounting desktop app built for Indian businesses of every size. It brings multi-company accounting, the full voucher set, GST invoicing with one-click GSTR-1 and GSTR-3B, inventory, and reporting into a single fast, offline-first application. It is designed to feel as quick as the old keyboard-driven tools while looking and behaving like modern software.',
  },
  {
    question: 'Is Acronix Books really free?',
    answer:
      'Yes. Acronix Books is free to download and use during its early-access period (currently version 0.1.0). There is no trial timer, no credit card, and no account required to work offline — you download the installer and start keeping books.',
  },
  {
    question: 'Does it work fully offline?',
    answer:
      'It does. Acronix Books is offline-first: your books live in a local encrypted database and every action runs on your own machine, so billing, data entry and reports keep working with no internet at all. A connection is only used when you choose to use optional cloud sync or backup.',
  },
  {
    question: 'Is my data safe, and where is it stored?',
    answer:
      'Your company data is stored locally on your own machine, encrypted at rest with SQLCipher (AES-256). Access is guarded by a per-user key vault with a recovery code, role-based permissions, and idle auto-lock, and a tamper-evident audit hash chain makes silent edits to history detectable. Nothing leaves your machine unless you turn on sync or take a backup.',
  },
  {
    question: 'Can it handle my GST returns?',
    answer:
      'Yes. Invoicing is GST-aware with HSN/SAC tax categories, and Acronix Books generates GSTR-1 and GSTR-3B in one click with Excel export for filing. Everything follows the Indian April–March financial year and the monthly/quarterly return cycle.',
  },
  {
    question: 'I use Tally today — can I move over?',
    answer:
      'Acronix Books is built to feel familiar to Tally users, with the same keyboard-first speed and voucher-driven workflow, plus a modern interface. It is in early access, so guided migration and import tooling are on the roadmap — the best first step is to install it free and set up a company to try alongside your current books.',
  },
  {
    question: 'Does it support multiple users and roles?',
    answer:
      'Yes. Acronix Books includes role-based access control (RBAC) so you can decide who is allowed to see and post what, backed by a per-user key vault and an audit trail. Idle auto-lock protects sessions left unattended.',
  },
  {
    question: 'Can I run more than one company?',
    answer:
      'You can. A single install can hold multiple companies, each with its own GSTIN, masters and books, and you can switch between them instantly — useful for group entities, branches, or an accountant handling several clients.',
  },
  {
    question: 'Which operating systems are supported?',
    answer:
      'Windows 10 and 11 (64-bit) are available now. macOS and Linux builds are in the pipeline — you can leave your email on the download page to be notified the moment they launch.',
  },
  {
    question: 'How do updates work?',
    answer:
      'Once installed, Acronix Books keeps itself current. It checks the release feed in the background, downloads new versions automatically, and applies them on the next restart — no reinstalling. You can also check for updates manually any time from the download page.',
  },
];

export function LandingFaq() {
  return (
    <Faq
      items={items}
      eyebrow="FAQ"
      title="Questions, answered"
      description="The essentials about what Acronix Books is, how it keeps your data safe, and how to get started."
      className="border-b border-[var(--border)] py-20 sm:py-24"
    />
  );
}
