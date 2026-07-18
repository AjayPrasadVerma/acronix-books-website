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
import { ComparisonStrip } from '@/components/marketing/ComparisonStrip';
import { Faq } from '@/components/site/Faq';
import { industries, industryBySlug } from '@/lib/industries';

// ONE template for every industry — content comes from lib/industries.ts, and
// the sections come from components/marketing/sections. Cloning this per
// vertical would be the DRY violation CLAUDE.md §4 forbids, and is exactly the
// failure mode the product repo's §8 (one VoucherForm, 40 configs) exists to
// avoid.

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryBySlug.get(slug);
  if (!industry) return {};
  return {
    title: industry.title,
    description: industry.description,
    alternates: { canonical: `/industries/${industry.slug}/` },
  };
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const industry = industryBySlug.get(slug);
  if (!industry) notFound();

  return (
    <>
      <MarketingHero
        eyebrow={industry.name}
        headline={industry.headline}
        highlight={industry.highlight}
        intro={industry.intro}
        chips={industry.highlights}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Industries', href: '/industries/' },
              { label: industry.name, href: `/industries/${industry.slug}/` },
            ]}
          />
        }
      />

      <ProblemGrid
        eyebrow="The reality"
        title="What makes this trade different"
        items={industry.challenges}
      />

      <CapabilityGrid
        eyebrow="How Acronix handles it"
        title="Features that exist, doing the actual work"
        description="Everything below is in the build you can download today."
        items={industry.capabilities}
      />

      <ComparisonStrip />

      {industry.faqs && industry.faqs.length > 0 && (
        <Faq
          items={industry.faqs}
          eyebrow="Questions"
          title={`${industry.name} — questions, answered`}
          className="border-b border-[var(--border)] py-20 sm:py-24"
        />
      )}

      <RelatedLinks
        title="Other trades we build for"
        links={industries
          .filter((i) => i.slug !== industry.slug)
          .map((i) => ({ label: i.name, href: `/industries/${i.slug}/` }))}
      />

      <TrialCta />
    </>
  );
}
