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

// The update feed's latest.yml is electron-updater's own manifest and the single
// authoritative record of the shipped desktop version. Reading it at build time
// means the site never hard-codes the version — a production build always bakes
// in whatever the feed currently serves. See src/lib/site.ts (`currentVersion`).
const UPDATE_MANIFEST = 'https://acronixbooks.com/updates/latest.yml';
const SEMVER_RE = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const FETCH_TIMEOUT_MS = 8000;

/**
 * Derive `{ version, releaseDate }` from the update feed. Runs only on
 * `next build`. On any failure — offline dev box, feed briefly unreachable,
 * malformed manifest — it warns and returns null so the site falls back to the
 * committed literals in site.ts. A flaky feed must never red the build, and a
 * malformed version must never reach the page (§4: validate every boundary).
 */
async function readReleaseFromFeed() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(UPDATE_MANIFEST, { cache: 'no-store', signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();

    const version = text.match(/^version:\s*['"]?([^'"\s]+)['"]?\s*$/m)?.[1];
    if (!version || !SEMVER_RE.test(version)) {
      throw new Error(`no valid version in manifest (got: ${version ?? 'none'})`);
    }

    // latest.yml carries a full ISO timestamp; the site only shows the date.
    const rawDate = text.match(/^releaseDate:\s*['"]?([^'"\s]+)['"]?\s*$/m)?.[1];
    const dateOnly = rawDate?.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
    const releaseDate = dateOnly && !Number.isNaN(Date.parse(dateOnly)) ? dateOnly : undefined;

    return { version, releaseDate };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(`[next.config] Could not derive version from update feed — using site.ts fallback. Reason: ${reason}`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export default async function config(phase) {
  const release = phase === 'phase-production-build' ? await readReleaseFromFeed() : null;
  if (release) {
    console.log(`[next.config] Building with v${release.version} (${release.releaseDate ?? 'date unknown'}) from the update feed.`);
  }
  return {
    ...nextConfig,
    // Inlined into both server and client bundles. Absent keys leave site.ts on
    // its committed fallback (dev builds, or a failed fetch).
    env: {
      ...(release?.version ? { NEXT_PUBLIC_APP_VERSION: release.version } : {}),
      ...(release?.releaseDate ? { NEXT_PUBLIC_APP_RELEASE_DATE: release.releaseDate } : {}),
    },
  };
}
