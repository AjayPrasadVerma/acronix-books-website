// Static export (SSG) — emits a fully static `out/` served behind Caddy/nginx on
// the VPS, exactly as docs/release.md describes. No Node runtime at serve time.
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Static export cannot use the on-demand Image Optimization server.
  images: { unoptimized: true },
  // Emit each route as `path/index.html` so any static file server resolves
  // clean URLs (/docs → /docs/index.html) without extra rewrite rules.
  trailingSlash: true,
  reactStrictMode: true,
  // Type errors still fail the build (matches the monorepo's "no escape
  // hatches" standard). Linting runs via the repo-level ESLint config / `tsc`
  // (Next 16 removed both `next lint` and the `eslint` config key).
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
