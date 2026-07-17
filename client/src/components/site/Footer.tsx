import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/ui/Container';
import { company, nav, site, type NavLink } from '@/lib/site';

/** Shared leaf — mailto: needs a plain anchor, everything else routes. */
function FooterLink({ link }: { link: NavLink }) {
  const className =
    'text-sm text-[var(--fg-muted)] transition-colors hover:text-brand-600 dark:hover:text-brand-400';
  return link.href.startsWith('mailto:') ? (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container className="py-14" size="wide">
        <div className="max-w-sm">
          <Link href="/" aria-label="Acronix Books home">
            <Logo />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">
            {site.tagline}. Built for Indian businesses of every size — offline-first, GST-ready,
            and secure by default.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(nav.footer).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-[var(--fg)]">{group}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Support strip. Phone + email — both are real, staffed channels. Do
            not add an office address here until there is one to publish. */}
        <div className="mt-12 flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="text-sm font-semibold text-[var(--fg)]">Need a hand?</p>
            <p className="mt-0.5 text-sm text-[var(--fg-muted)]">
              Call us, or email and we reply {company.responseTime}.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <a
              href={`tel:${company.supportPhone.tel}`}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-600/30 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100 dark:border-brand-400/30 dark:bg-brand-400/10 dark:text-brand-300 dark:hover:bg-brand-400/20"
            >
              <Phone className="h-4 w-4" aria-hidden />
              <span className="tabular-nums">{company.supportPhone.display}</span>
            </a>
            <a
              href={`mailto:${company.supportEmail}`}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-brand-600/30 hover:text-brand-600 dark:hover:border-brand-400/30 dark:hover:text-brand-400"
            >
              <Mail className="h-4 w-4" aria-hidden />
              <span className="truncate">{company.supportEmail}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--fg-subtle)] sm:flex-row sm:items-center">
          <p>
            © {year} {company.legalName}. All rights reserved. {site.name} is a product of{' '}
            <a
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--fg-muted)] underline decoration-[var(--border-strong)] underline-offset-2 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
            >
              Acronix
            </a>
            .
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            Made in India for Indian business
          </p>
        </div>
      </Container>
    </footer>
  );
}
