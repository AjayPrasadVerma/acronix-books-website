import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import {
  CapabilityGrid,
  MarketingHero,
  ProblemGrid,
  RelatedLinks,
  TrialCta,
} from '@/components/marketing/sections';
import { solutions, solutionBySlug } from '@/lib/solutions';

// ONE template for every solution — content from lib/solutions.ts, sections
// from components/marketing/sections. Shares those sections with the industry
// template so there is a single implementation of each shape (CLAUDE.md §4).

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutionBySlug.get(slug);
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.description,
    alternates: { canonical: `/solutions/${solution.slug}/` },
  };
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params;
  const solution = solutionBySlug.get(slug);
  if (!solution) notFound();

  return (
    <>
      <MarketingHero
        eyebrow={solution.name}
        headline={solution.headline}
        highlight={solution.highlight}
        intro={solution.intro}
        chips={solution.highlights}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Solutions', href: '/solutions/' },
              { label: solution.name, href: `/solutions/${solution.slug}/` },
            ]}
          />
        }
      />

      <ProblemGrid
        eyebrow="The problem"
        title="Where this usually goes wrong"
        items={solution.challenges}
      />

      <CapabilityGrid
        eyebrow="What Acronix does"
        title="How it works in the app you can download"
        description="Every capability below ships in the current build."
        items={solution.capabilities}
        scopeNote={solution.scopeNote}
      />

      <RelatedLinks
        title="More of what Acronix does"
        links={solutions
          .filter((s) => s.slug !== solution.slug)
          .map((s) => ({ label: s.name, href: `/solutions/${s.slug}/` }))}
      />

      <TrialCta />
    </>
  );
}
