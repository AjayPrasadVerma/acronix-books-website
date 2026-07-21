import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { ThankYou } from '@/components/download/ThankYou';

// A post-download funnel page, not a search landing page — keep it out of the
// index (and it is deliberately absent from sitemap.ts).
export const metadata: Metadata = {
  title: 'Thank you for downloading',
  description:
    'Your Acronix Books download is starting. Here are your next steps to install and activate the trial.',
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <Container className="py-24 text-center text-sm text-[var(--fg-muted)]">
          Preparing your download…
        </Container>
      }
    >
      <ThankYou />
    </Suspense>
  );
}
