import type { Metadata } from 'next';
import { Home, BookOpen } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Logo } from '@/components/brand/Logo';

export const metadata: Metadata = {
  title: 'Page not found',
  // Never index a 404, and drop the site-wide canonical (`/` in layout.tsx) so
  // this page doesn't declare the homepage as its canonical URL.
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <Logo className="mb-10" glyphClassName="h-8 w-8" />
      <p className="font-display text-7xl font-extrabold leading-none text-brand-600 sm:text-8xl dark:text-brand-400">
        404
      </p>
      <h1 className="mt-6 font-display text-2xl font-bold text-[var(--fg)] sm:text-3xl">
        This page took the day off
      </h1>
      <p className="mt-4 max-w-md text-base text-[var(--fg-muted)]">
        The page you are looking for doesn&apos;t exist or may have moved. Let&apos;s get you back
        to something useful.
      </p>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          <Home className="h-4 w-4" aria-hidden="true" />
          Back home
        </ButtonLink>
        <ButtonLink href="/docs/" variant="outline" size="lg">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          Browse the docs
        </ButtonLink>
      </div>
    </Container>
  );
}
