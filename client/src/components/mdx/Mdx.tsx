import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { site } from '@/lib/site';
import { mdxComponents } from './mdx-components';

/**
 * The `#` anchor rehype-autolink-headings appends after each heading, as a hast
 * element. `.prose` styles the `.anchor` class (hidden until heading hover).
 * `@types/hast` isn't installed, so the shape is a plain literal — the plugin's
 * option type validates it structurally.
 */
const anchorContent = {
  type: 'element' as const,
  tagName: 'span',
  properties: { className: ['anchor'], 'aria-hidden': 'true' },
  children: [{ type: 'text' as const, value: '#' }],
};

/**
 * Server component that compiles and renders a raw MDX string with GFM support,
 * heading slugs and self-linking anchors, using the shared component map. Render
 * the result inside `<article className="prose">`.
 */
export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        // Exposes `{version}` (and future vars) to every MDX doc so prose can
        // track the shipped release instead of hard-coding it. See site.ts.
        scope: { version: site.currentVersion },
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'append', content: anchorContent }],
          ],
        },
      }}
    />
  );
}
