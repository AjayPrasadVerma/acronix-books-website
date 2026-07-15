import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// Generated at build time (static export). Allows every crawler across the
// whole site and points them at the sitemap.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
