import { Lock, KeyRound, ScrollText, Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Primitives';

interface Point {
  icon: typeof Lock;
  title: string;
  body: string;
}

const points: Point[] = [
  {
    icon: Lock,
    title: 'AES-256 at rest',
    body: 'SQLCipher encrypts your entire book on disk. Files stolen off the machine are unreadable.',
  },
  {
    icon: KeyRound,
    title: 'Envelope key vault',
    body: 'Per-user key slots, a recovery code, and a scrypt-derived KEK guard every login and unlock.',
  },
  {
    icon: Users,
    title: 'Role-based access',
    body: 'RBAC controls who can see and post what, with idle auto-lock protecting unattended sessions.',
  },
  {
    icon: ScrollText,
    title: 'Tamper-evident audit',
    body: 'A hash-chained audit trail makes any silent edit to history detectable after the fact.',
  },
];

export function SecurityBand() {
  return (
    <section className="border-b border-[var(--border)] bg-brand-600 dark:bg-brand-950">
      <Container size="wide" className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-brand-100 dark:text-brand-300">Secure by default</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your books are yours — and only yours
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-50/90 dark:text-brand-100/80">
            Security isn&apos;t a bolt-on. Encryption, key management, access control, and auditing
            are wired into the core of Acronix Books.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-50/85 dark:text-brand-100/75">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
