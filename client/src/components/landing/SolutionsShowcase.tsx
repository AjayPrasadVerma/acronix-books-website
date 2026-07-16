import { solutions } from '@/lib/solutions';
import { ShowcaseSection } from './ShowcaseSection';

export function SolutionsShowcase() {
  return (
    <ShowcaseSection
      eyebrow="Everything it does"
      title="One app, every job the books need"
      description="From GST billing to inventory, returns and encrypted cloud backup — each capability is a module built in, not an add-on. Explore any of them in depth."
      items={solutions}
      basePath="/solutions/"
      seeAllHref="/solutions/"
      seeAllLabel="See all solutions"
    />
  );
}
