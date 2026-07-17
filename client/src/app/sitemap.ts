import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getAllDocs, getAllPosts } from '@/lib/content';
import { industries } from '@/lib/industries';
import { solutions } from '@/lib/solutions';

// Required so `output: export` prerenders the sitemap to a static sitemap.xml.
export const dynamic = 'force-static';

// Generated at build time (static export → sitemap.xml). Keep URLs trailing-
// slashed to match next.config `trailingSlash: true`, otherwise crawlers see
// a redirect on every entry.
const lastModified = new Date().toISOString();

interface StaticRoute {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}

const staticRoutes: StaticRoute[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/features/', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/download/', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/solutions/', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/industries/', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/request-license/', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/pricing/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/docs/', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/security/', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/changelog/', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/blog/', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/support/', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/about/', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy/', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms/', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/refund/', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Solution + industry pages are DERIVED from the same data the pages and the
  // nav render from, never re-listed by hand. A hardcoded list here is how the
  // first 15 of them shipped invisible to crawlers.
  for (const solution of solutions) {
    entries.push({
      url: `${site.url}/solutions/${solution.slug}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  for (const industry of industries) {
    entries.push({
      url: `${site.url}/industries/${industry.slug}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  const docs = getAllDocs();
  for (const doc of docs) {
    entries.push({
      url: `${site.url}/docs/${doc.slug}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  const posts = getAllPosts();
  for (const post of posts) {
    entries.push({
      url: `${site.url}/blog/${post.slug}/`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
