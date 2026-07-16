import type { Metadata } from 'next';
import {
  Lock,
  KeyRound,
  LifeBuoy,
  LogIn,
  Timer,
  Archive,
  FileCheck2,
  Users,
  Server,
  Cloud,
  BookOpen,
  ShieldAlert,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge, Eyebrow, SectionHeading } from '@/components/ui/Primitives';
import { ButtonLink } from '@/components/ui/Button';
import { SecurityIllustration } from '@/components/illustrations/Illustrations';
import { company } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Security',
  description:
    'How Acronix Books protects your books: SQLCipher AES-256 encryption at rest, an envelope key vault with per-user key slots and a scrypt KEK, recovery code, idle auto-lock, encrypted backups, a tamper-evident audit chain, RBAC, and a renderer with zero database access.',
  alternates: { canonical: '/security/' },
};

const mailto = `mailto:${company.supportEmail}`;

interface Control {
  icon: typeof Lock;
  title: string;
  body: string;
}

const controls: Control[] = [
  {
    icon: Lock,
    title: 'AES-256 encryption at rest',
    body: 'Your entire book lives in a single SQLCipher-encrypted database. Without your key, the file on disk is meaningless bytes — a copied file, stolen disk, or leaked backup reveals nothing.',
  },
  {
    icon: KeyRound,
    title: 'Envelope key vault',
    body: 'A random 256-bit data key encrypts the database. It is never stored in the clear: a scrypt-derived key-encryption key (KEK, 64 MiB memory-hard) wraps it into per-user key slots.',
  },
  {
    icon: LifeBuoy,
    title: 'One-time recovery code',
    body: 'At first run you get a one-time recovery code that wraps the same key. Forget your password and it lets you back in. Lose both, and your data is unrecoverable — by design.',
  },
  {
    icon: LogIn,
    title: 'Encrypted login & unlock',
    body: 'Every session is gated by an encrypted unlock. Password hashes live inside the encrypted database; the key is derived only after you authenticate and exists only in memory.',
  },
  {
    icon: Timer,
    title: 'Idle auto-lock',
    body: 'Step away and the book locks itself automatically (15 minutes by default). The data key is zeroed from memory on lock and on quit, so an unattended machine stays protected.',
  },
  {
    icon: Archive,
    title: 'Encrypted backups',
    body: 'A backup is a clean, consistent snapshot written to an .acxb file that stays AES-256 encrypted. It is never a raw copy of a live database, so a backup left on a pen drive or in a cloud folder is as protected as the book itself.',
  },
  {
    icon: FileCheck2,
    title: 'Tamper-evident audit chain',
    body: 'Every privileged action is recorded in a SHA-256 hash chain, where each row commits to the one before it. Out-of-app edits and after-the-fact alterations become detectable.',
  },
  {
    icon: Users,
    title: 'Role-based access control',
    body: 'Five capability-based roles — Viewer, Operator, Accountant, Admin, and Owner — scope what each user on a shared machine can see and do. Access is checked per capability, not a blanket admin flag.',
  },
  {
    icon: Server,
    title: 'The screen never touches your data',
    body: 'The part of the app you see cannot reach the database. Every request is validated before it is allowed anywhere near your books, and the interface never holds the encryption key.',
  },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container size="wide" className="py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge tone="brand">Security</Badge>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--fg)] sm:text-5xl">
                Your books, <span className="text-gradient">encrypted and yours</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--fg-muted)]">
                Acronix Books treats your financial data as the sensitive asset it is. It is
                encrypted at rest, unlocked through a real key-management vault, and never leaves
                your machine unless you choose to enable cloud sync. We built the security model
                first, not last.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/docs/security/" size="lg">
                  <BookOpen className="h-5 w-5" />
                  Read the security docs
                </ButtonLink>
                <ButtonLink href="/download/" variant="outline" size="lg">
                  Download for Windows
                </ButtonLink>
              </div>
            </div>
            <div className="flex justify-center">
              <SecurityIllustration className="w-full max-w-md" />
            </div>
          </div>
        </Container>
      </section>

      {/* Threat model framing */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
        <Container size="narrow" className="py-16 text-center sm:py-20">
          <Eyebrow>The threat we design against</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--fg)] sm:text-3xl">
            A copied database file must reveal nothing
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">
            For an offline-first desktop app, the real risks are local: a copied database, a stolen
            disk, a leaked backup, or edits made outside the app. So the whole file is encrypted, the
            key is guarded, and every change is chained. Someone who walks off with your file gets
            ciphertext.
          </p>
        </Container>
      </section>

      {/* Controls grid */}
      <section className="border-b border-[var(--border)]">
        <Container size="wide" className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="How it works"
            title="Defence in depth, on your own machine"
            description="Every control below is in the shipping product — not a roadmap promise."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {controls.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                  <Icon className="h-5.5 w-5.5" aria-hidden />
                </span>
                <h3 className="font-display text-base font-bold text-[var(--fg)]">{title}</h3>
                <p className="text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Cloud sync security */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
        <Container className="py-20 sm:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Optional cloud sync</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
                Off-site backup, isolated per account
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--fg-muted)]">
                Cloud sync is entirely optional and orthogonal to local unlock — the app runs fully
                offline with no cloud account at all. When you do turn it on, we hold the security
                bar high.
              </p>
            </div>
            <ul className="grid gap-4">
              {[
                {
                  icon: Cloud,
                  title: 'TLS in transit, isolated per account',
                  body: 'Sync runs over TLS, and every query is scoped to your authenticated account — there is no shared tenancy of your data.',
                },
                {
                  icon: LogIn,
                  title: 'Email-OTP at new-device enrollment',
                  body: 'A new device must pass an emailed one-time code before its first full-book pull — right at the moment the access risk appears.',
                },
                {
                  icon: Timer,
                  title: 'Rate-limited auth with token rotation',
                  body: 'Authentication and sync endpoints are rate-limited, and refresh tokens rotate with reuse-detection so a leaked token family is revoked.',
                },
              ].map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5"
                >
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-[var(--fg)]">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Responsible disclosure */}
      <section>
        <Container size="narrow" className="py-20 sm:py-24">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-8 sm:p-10">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
              <ShieldAlert className="h-5.5 w-5.5" aria-hidden />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-[var(--fg)]">
              Responsible disclosure
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--fg-muted)]">
              Found a security issue? We want to hear from you. Please report it privately to{' '}
              <a
                href={mailto}
                className="font-semibold text-brand-600 underline underline-offset-2 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                {company.supportEmail}
              </a>{' '}
              rather than disclosing it publicly, and give us a reasonable window to investigate and
              fix it before any public discussion. We will acknowledge your report{' '}
              {company.responseTime} and keep you posted on the fix.
            </p>
            <div className="mt-7">
              <ButtonLink href="/docs/security/" variant="outline">
                <BookOpen className="h-4.5 w-4.5" />
                Read the full security model
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
