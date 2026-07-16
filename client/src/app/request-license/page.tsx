import type { Metadata } from 'next';
import { KeyRound, Mail, Phone, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Primitives';
import { company, plan, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Request a License Number',
  description:
    'Acronix Books activates with a License Number. Request one by phone or email — we issue it against your email and your 14-day trial starts when you activate.',
  alternates: { canonical: '/request-license/' },
};

// Licences are issued by hand today (an operator runs the issuing script), so
// this page routes to a human rather than pretending to be a self-serve form.
// A static export cannot mint a licence, and a form that only *looks* like it
// works would be worse than a phone number: the visitor would wait for an email
// that never comes. When the server grows a `POST /licenses/request` endpoint,
// this page gets the form and the copy below stops being true.
const STEPS = [
  {
    icon: Phone,
    title: 'Tell us you want one',
    body: `Call ${company.supportPhone.display} or email ${company.supportEmail}. We need an email address to issue against — that is the identity your licence is tied to.`,
  },
  {
    icon: KeyRound,
    title: 'We issue your License Number',
    body: 'It looks like ACR-XXXX-XXXX-XXXX. It arrives by email, usually the same working day.',
  },
  {
    icon: ShieldCheck,
    title: 'Activate and set your password',
    body: `Download the app, enter the License Number, and choose a password. Your ${plan.trialDays}-day trial starts at activation and every feature is unlocked for it.`,
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Request a License Number',
  url: `${site.url}/request-license/`,
  mainEntity: {
    '@type': 'Organization',
    name: site.name,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.supportPhone.tel,
      email: company.supportEmail,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  },
};

export default function RequestLicensePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <Container size="narrow" className="py-16 text-center sm:py-20">
          <Badge tone="brand">Get started</Badge>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--fg)] sm:text-5xl">
            Request a <span className="text-gradient">License Number</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)]">
            Acronix Books activates with a License Number. We issue it by hand right now — which
            means you get a person, not a signup form, and we can set your books up with you.
          </p>

          <div className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={`tel:${company.supportPhone.tel}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700"
            >
              <Phone className="h-5 w-5" aria-hidden />
              <span className="tabular-nums">{company.supportPhone.display}</span>
            </a>
            <a
              href={`mailto:${company.supportEmail}?subject=${encodeURIComponent('License Number request — Acronix Books')}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-3 text-base font-semibold text-[var(--fg)] transition-colors hover:border-brand-600/30 hover:text-brand-600 dark:hover:border-brand-400/30 dark:hover:text-brand-400"
            >
              <Mail className="h-5 w-5" aria-hidden />
              Email us
            </a>
          </div>
          <p className="mt-3 text-sm text-[var(--fg-subtle)]">
            No card, no charge to request. We reply {company.responseTime}.
          </p>
        </Container>
      </section>

      <section className="border-b border-[var(--border)]">
        <Container size="narrow" className="py-16 sm:py-20">
          <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--fg)]">
            How it works
          </h2>
          <ol className="mt-8 flex flex-col gap-6">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-brand-500/20 bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-[var(--fg)]">
                    <span className="mr-2 font-mono text-sm text-[var(--fg-subtle)]">{i + 1}</span>
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-muted)]">{body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5">
            <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
              <strong className="font-semibold text-[var(--fg)]">Already using Acronix?</strong> To
              renew, call or email with your License Number and we&apos;ll extend it. Your books are
              on your own machine and stay readable and exportable regardless — a lapsed licence
              stops new entries, it never locks you out of your own data.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
