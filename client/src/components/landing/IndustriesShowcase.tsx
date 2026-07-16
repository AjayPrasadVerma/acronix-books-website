import { industries } from '@/lib/industries';
import { ShowcaseSection } from './ShowcaseSection';

// The section directly above this one on the homepage (WhoItsFor) already says
// "Fits the way your trade actually works". This one names the trades and sends
// you to the deep page, so its heading must not echo that back.
export function IndustriesShowcase() {
  return (
    <ShowcaseSection
      eyebrow="Go deeper by trade"
      title="Pick your line of business"
      description="Textile job work, distribution receivables, manufacturing cost, the retail counter and more — each one gets a page on exactly how Acronix handles it, including what it doesn't."
      items={industries}
      basePath="/industries/"
      seeAllHref="/industries/"
      seeAllLabel="See all industries"
      subtle
    />
  );
}
