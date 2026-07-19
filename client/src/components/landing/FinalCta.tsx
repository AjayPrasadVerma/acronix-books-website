import { Download, ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { downloads } from '@/lib/site';

export function FinalCta() {
  return (
    <section>
      <Container size="wide" className="py-20 sm:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-16 text-center sm:px-12">
          <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden />
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-[var(--fg)] sm:text-4xl">
            Start keeping faster, safer books today
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[var(--fg-muted)]">
            Free to download while in early access. Windows &amp; Linux now — macOS coming soon.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/download/" size="lg">
              <Download className="h-5 w-5" />
              Download for Windows
            </ButtonLink>
            <ButtonLink href="/docs/" variant="outline" size="lg">
              Read the docs
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-[var(--fg-subtle)]">{downloads.windows.sizeHint}</p>
        </div>
      </Container>
    </section>
  );
}
