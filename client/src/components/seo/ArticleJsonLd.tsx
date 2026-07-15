import { site } from '@/lib/site';

// Page-specific structured data for articles (blog posts) and technical
// documentation. Rendered per route alongside the site-wide JsonLd graph.
// Each component emits one `@graph` combining the article node with a
// BreadcrumbList so crawlers get both in a single script.

/** A breadcrumb trail entry. `href` is site-relative (e.g. `/docs/`). */
export interface CrumbInput {
  label: string;
  /** Omit for the current page (last crumb). */
  href?: string;
}

interface ListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

function breadcrumbNode(crumbs: CrumbInput[]) {
  return {
    '@type': 'BreadcrumbList' as const,
    itemListElement: crumbs.map((crumb, index): ListItem => {
      const entry: ListItem = {
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
      };
      if (crumb.href) entry.item = `${site.url}${crumb.href}`;
      return entry;
    }),
  };
}

function JsonLdScript({ graph }: { graph: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

const publisherRef = { '@id': `${site.url}/#organization` } as const;

export interface BlogPostingJsonLdProps {
  title: string;
  description: string;
  /** ISO date string (e.g. `2026-07-01`). */
  date: string;
  author: string;
  /** Blog post slug — used to build the canonical absolute URL. */
  slug: string;
  breadcrumbs: CrumbInput[];
}

export function BlogPostingJsonLd({
  title,
  description,
  date,
  author,
  slug,
  breadcrumbs,
}: BlogPostingJsonLdProps) {
  const url = `${site.url}/blog/${slug}/`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: title,
        description,
        datePublished: new Date(date).toISOString(),
        author: { '@type': 'Person', name: author },
        image: `${site.url}/opengraph-image`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        publisher: publisherRef,
        url,
      },
      breadcrumbNode(breadcrumbs),
    ],
  };
  return <JsonLdScript graph={graph} />;
}

export interface TechArticleJsonLdProps {
  title: string;
  description: string;
  /** Docs slug — used to build the canonical absolute URL. */
  slug: string;
  breadcrumbs: CrumbInput[];
}

export function TechArticleJsonLd({
  title,
  description,
  slug,
  breadcrumbs,
}: TechArticleJsonLdProps) {
  const url = `${site.url}/docs/${slug}/`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: title,
        description,
        image: `${site.url}/opengraph-image`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        publisher: publisherRef,
        url,
      },
      breadcrumbNode(breadcrumbs),
    ],
  };
  return <JsonLdScript graph={graph} />;
}
