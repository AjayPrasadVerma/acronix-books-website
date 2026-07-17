import { plan, site, updateFeed } from '@/lib/site';

// Structured data for rich results. Organization + WebSite + SoftwareApplication
// are rendered site-wide; page-specific schemas (Article, BreadcrumbList) are
// injected per route where relevant.
export function JsonLd() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon-512.png`,
        email: site.email,
        sameAs: ['https://acronix.in'],
        parentOrganization: {
          '@type': 'Organization',
          name: 'Acronix',
          url: 'https://acronix.in',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { '@id': `${site.url}/#organization` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${site.url}/#app`,
        name: site.name,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Accounting & ERP',
        operatingSystem: 'Windows 10, Windows 11',
        softwareVersion: site.currentVersion,
        downloadUrl: updateFeed.windowsInstaller,
        description: site.description,
        // Derived from the single source of truth so the structured data can
        // never disagree with the pricing page. Schema.org `price` is the
        // pre-tax amount; a free-trial Offer would be a separate node if needed.
        offers: {
          '@type': 'Offer',
          price: String(plan.price ?? 0),
          priceCurrency: plan.currency,
          category: 'annual subscription',
        },
        publisher: { '@id': `${site.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
