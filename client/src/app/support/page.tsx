import type { Metadata } from 'next';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Bug,
  Clock,
  Cloud,
  DatabaseBackup,
  FileText,
  HardDriveDownload,
  KeyRound,
  Lightbulb,
  LifeBuoy,
  Mail,
  Receipt,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge, Card, Eyebrow, SectionHeading } from '@/components/ui/Primitives';
import { Faq, type FaqItem } from '@/components/site/Faq';
import { SecurityIllustration } from '@/components/illustrations/Illustrations';
import { ContactForm } from '@/components/support/ContactForm';
import { company, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Help & Support',
  description:
    'Get help with Acronix Books — the offline-first GST accounting & ERP desktop app for Indian businesses of every size. Browse self-serve guides for installation, GST filing, and backups, or email our support team for a reply within 1–2 business days.',
  alternates: { canonical: '/support/' },
};

interface LinkItem {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
}

/** Section 2 — self-serve guides most people need first. */
const SELF_SERVE: LinkItem[] = [
  {
    icon: Rocket,
    title: 'Getting started',
    body: 'Set up your company and post your first voucher in minutes.',
    href: '/docs/getting-started/',
  },
  {
    icon: HardDriveDownload,
    title: 'Installation',
    body: 'Download, install, and run Acronix Books on Windows.',
    href: '/docs/installation/',
  },
  {
    icon: Receipt,
    title: 'GST filing',
    body: 'Generate GSTR-1 and GSTR-3B and export them for filing.',
    href: '/docs/gst-filing/',
  },
  {
    icon: DatabaseBackup,
    title: 'Backup & restore',
    body: 'Create encrypted .acxb backups and restore them safely.',
    href: '/docs/backup-and-restore/',
  },
  {
    icon: Wrench,
    title: 'Troubleshooting',
    body: 'Fix common issues and recover if something looks off.',
    href: '/docs/troubleshooting/',
  },
  {
    icon: FileText,
    title: 'Docs FAQ',
    body: 'Quick answers to the questions we hear most often.',
    href: '/docs/faq/',
  },
];

/** Section 3 — topic-oriented entry points into the docs. */
const TOPICS: LinkItem[] = [
  {
    icon: HardDriveDownload,
    title: 'Installation & setup',
    body: 'System requirements, installer, and first-run company setup.',
    href: '/docs/installation/',
  },
  {
    icon: Receipt,
    title: 'GST & returns',
    body: 'HSN, tax categories, e-invoice, e-way bill, GSTR-1 & 3B exports.',
    href: '/docs/gst-filing/',
  },
  {
    icon: DatabaseBackup,
    title: 'Data & backup',
    body: 'Where your data lives, encrypted backups, and moving to a new PC.',
    href: '/docs/backup-and-restore/',
  },
  {
    icon: RefreshCw,
    title: 'Updates',
    body: 'Automatic background updates and how to check manually with Ctrl+U.',
    href: '/docs/updating-the-app/',
  },
  {
    icon: KeyRound,
    title: 'Security & users',
    body: 'At-rest encryption, recovery code, and role-based user access.',
    href: '/docs/security/',
  },
  {
    icon: Cloud,
    title: 'Cloud sync',
    body: 'Optional encrypted cloud backup and restore on a fresh device.',
    href: '/docs/cloud-sync/',
  },
];

const FAQS: FaqItem[] = [
  {
    question: 'How do I get help?',
    answer: `Start with the self-serve guides on this page — installation, GST filing, backups, and troubleshooting cover most questions. If you still need a hand, email us at ${company.supportEmail} (or use the contact form on this page). We typically reply ${company.responseTime}.`,
  },
  {
    question: 'How do I find my app version?',
    answer: `Open Acronix Books and go to Settings → Updates, or press Ctrl+U from anywhere in the app. The current version is shown there. Including it in your message helps us reproduce and fix issues faster. The latest published release is ${site.currentVersion}.`,
  },
  {
    question: 'Where is my data, and is it safe?',
    answer:
      'Your books live in a single encrypted file on your own computer, secured at rest with SQLCipher (AES-256). The app is offline-first, so no account or internet connection is required to work. Data only leaves your machine if you opt into the optional encrypted cloud backup, which stays isolated per client.',
  },
  {
    question: 'How do I back up or move to a new PC?',
    answer:
      'Use the built-in backup to create an encrypted .acxb snapshot, then restore that file on the new machine after installing Acronix Books. You can also enable optional cloud sync and use Restore from Cloud on a fresh device. See the Backup & restore guide for step-by-step instructions.',
  },
  {
    question: 'Is there phone support?',
    answer: `Yes — call ${company.supportPhone.display}. For anything touching your data, send an email to ${company.supportEmail} as well: your app version, OS and the steps that led to the issue in writing are what let us give an accurate answer instead of a guess. We reply ${company.responseTime}.`,
  },
  {
    question: 'How do I report a bug or request a feature?',
    answer:
      'Use the contact form on this page and pick “Bug report” or “Feature request” as the topic. For bugs, include your app version (Ctrl+U), your operating system, and the exact steps to reproduce the problem. For feature requests, tell us the outcome you want and how you work today — it directly shapes what we build next.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Help & Support',
  url: `${site.url}/support/`,
  mainEntity: {
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    contactPoint: {
      '@type': 'ContactPoint',
      email: company.supportEmail,
      telephone: company.supportPhone.tel,
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  },
};

function LinkCard({ item }: { item: LinkItem }) {
  const Icon = item.icon;
  return (
    <Link href={item.href} className="group focus-visible:outline-none">
      <Card hover className="h-full">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-400/25 dark:bg-brand-400/10 dark:text-brand-400">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="flex items-center gap-1.5 font-display text-base font-bold text-[var(--fg)]">
              {item.title}
              <ArrowRight
                className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">{item.body}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function SupportPage() {
  return (
    <div className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
        <Container className="pt-16 sm:pt-24">
          <div className="mx-auto max-w-2xl text-center animate-fade-up">
            <Eyebrow>Help &amp; Support</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--fg)] sm:text-5xl">
              We&rsquo;re here to <span className="text-gradient">help you</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--fg-muted)]">
              Find quick answers in our guides, or reach the team directly. Whether you&rsquo;re
              installing, filing GST, or moving to a new PC, we&rsquo;ve got you covered.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50/60 p-6 text-center dark:border-brand-400/25 dark:bg-brand-400/[0.07]">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-600 dark:border-brand-400/25 dark:bg-ink-900 dark:text-brand-400">
              <LifeBuoy className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="text-sm font-medium text-[var(--fg-muted)]">Talk to our support team</p>
            <a
              href={`tel:${company.supportPhone.tel}`}
              className="font-display text-xl font-bold tabular-nums text-brand-700 underline-offset-4 hover:underline dark:text-brand-300 sm:text-2xl"
            >
              {company.supportPhone.display}
            </a>
            <a
              href={`mailto:${company.supportEmail}`}
              className="text-base font-semibold text-[var(--fg)] underline-offset-4 hover:underline"
            >
              {company.supportEmail}
            </a>
            <Badge tone="neutral" className="mt-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Email replies {company.responseTime}
            </Badge>
          </div>
        </Container>
      </section>

      {/* Try these first — self-serve grid */}
      <section className="mt-24">
        <Container>
          <SectionHeading
            eyebrow="Self-serve"
            title="Try these first"
            description="Most questions have a fast answer in the docs. Start here before reaching out."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SELF_SERVE.map((item) => (
              <LinkCard key={item.title} item={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* Topic cards */}
      <section className="mt-24">
        <Container>
          <SectionHeading
            eyebrow="Browse by topic"
            title="Find help by topic"
            description="Jump straight to the guide that matches what you're working on."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((item) => (
              <LinkCard key={item.title} item={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* Contact form */}
      <section className="mt-24">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Contact us"
            title="Send us a message"
            description="Fill this in and we'll open your email app with a prefilled message. No account, no server — your words go straight to our inbox."
          />
          <div className="mt-10">
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* Bug report + feature request guidance */}
      <section className="mt-16">
        <Container size="narrow">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-red-500">
                  <Bug className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-base font-bold text-[var(--fg)]">
                  What to include in a bug report
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>
                    <strong className="font-semibold text-[var(--fg)]">App version</strong> — from
                    Settings → Updates, or press <kbd className="rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-xs">Ctrl+U</kbd>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>
                    <strong className="font-semibold text-[var(--fg)]">Operating system</strong> —
                    e.g. Windows 11 64-bit.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>
                    <strong className="font-semibold text-[var(--fg)]">Steps to reproduce</strong> —
                    what you did, what you expected, and what actually happened.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-brand-600 dark:text-brand-400">
                  <Lightbulb className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-base font-bold text-[var(--fg)]">
                  Request a feature
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">
                Missing something you need? Use the contact form above with the{' '}
                <strong className="font-semibold text-[var(--fg)]">Feature request</strong> topic and
                tell us the outcome you want and how you work today. Your input directly shapes the
                roadmap — modules like Banking, Sale/Purchase Orders, and Returns are already on the
                way.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Faq
        className="mt-24"
        eyebrow="Support FAQ"
        title="Common support questions"
        items={FAQS}
      />

      {/* Closing reassurance */}
      <section className="mt-24">
        <Container size="narrow">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-8 text-center sm:flex-row sm:text-left">
            <SecurityIllustration className="h-28 w-28 shrink-0" />
            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--fg)]">
                Your books stay yours
              </h2>
              <p className="mt-3 text-[var(--fg-muted)]">
                We can only see what you choose to send us. Your company data lives encrypted on your
                own machine — support is here to guide you, never to reach into your files.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--fg-muted)] sm:justify-start">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                  Encrypted at rest
                </span>
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                  Email support {company.responseTime}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
