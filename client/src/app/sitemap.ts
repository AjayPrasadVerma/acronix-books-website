import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getAllDocs, getAllPosts } from '@/lib/content';

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

  // Content collections are authored by another agent. Guard the calls so a
  // temporarily-missing export can't take the whole sitemap build down.
  const docs = typeof getAllDocs === 'function' ? getAllDocs() : [];
  for (const doc of docs) {
    entries.push({
      url: `${site.url}/docs/${doc.slug}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  const posts = typeof getAllPosts === 'function' ? getAllPosts() : [];
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
