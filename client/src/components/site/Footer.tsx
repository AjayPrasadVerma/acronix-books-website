import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/ui/Container';
import { company, nav, site } from '@/lib/site';

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
      <Container className="py-14" size="wide">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Acronix Books home">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">
              {site.tagline}. Built for Indian businesses of every size — offline-first, GST-ready, and secure by
              default.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {Object.entries(nav.footer).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-sm font-semibold text-[var(--fg)]">{group}</h3>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith('mailto:') ? (
                        <a
                          href={link.href}
                          className="text-sm text-[var(--fg-muted)] transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-[var(--fg-muted)] transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--fg-subtle)] sm:flex-row sm:items-center">
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
