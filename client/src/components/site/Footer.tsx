import Link from 'next/link';
import { Mail } from 'lucide-react';
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

        {/* Support strip. Email only — we do not publish a phone number or an
            office address, because we do not staff either. */}
        <div className="mt-12 flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="text-sm font-semibold text-[var(--fg)]">Need a hand?</p>
            <p className="mt-0.5 text-sm text-[var(--fg-muted)]">
              Email the team — we reply {company.responseTime}.
            </p>
          </div>
          <a
            href={`mailto:${company.supportEmail}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-brand-600/30 hover:text-brand-600 dark:hover:border-brand-400/30 dark:hover:text-brand-400"
          >
            <Mail className="h-4 w-4" aria-hidden />
            <span className="truncate">{company.supportEmail}</span>
          </a>
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
