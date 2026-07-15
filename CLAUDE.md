# Acronix Books Website — Project Rules for Claude

This file is the project-level contract for **this repo**. Every interaction in this working directory must follow it. If something here conflicts with what I (the user) say in chat, ask me — don't silently override.

Derived from the `acronix-books` monorepo `CLAUDE.md` (the product repo). The engineering standards are carried over verbatim; the rules that were written for the Electron ERP and do **not** apply to a public marketing site are marked **[ADAPTED]** with the reason. Where this file is silent, the monorepo's rules are the fallback.

---

## 1. What we're building

**The Acronix Books website** — `https://acronixbooks.com`. The public front door for the product: marketing, documentation, download, and the auto-update feed.

- **Its job:** convince an Indian SMB owner to download the app, teach them to use it, and serve installer + `latest.yml` to `electron-updater`.
- **Target reader:** Indian SMB owners (wholesalers, distributors, manufacturers, retailers, service businesses, schools) — many currently on Tally/Busy/Marg, plus their accountants. Not developers.
- **Relationship to the product repo:** this site *markets* the app in `../acronix-books`. It does not import from it, share a build with it, or deploy with it. It is a separate repo with a separate remote (`acronix-books-website`) and a separate deploy.
- **Project state:** extracted from the monorepo's `apps/web` into this standalone repo. One commit (`first commit`) on `master`. Site is content-complete: 21 routes, 15 MDX docs, 3 blog posts. **Not yet wired to CI or a deploy pipeline.**

### The duplication — read this before editing

An **identical copy** of this site still exists at `../acronix-books/apps/web/` (untracked in that repo). **This repo is the canonical home.** Never edit the monorepo copy; it is scheduled for deletion. If you find the two have drifted, say so — don't silently pick one.

---

## 2. Locked tech stack — do NOT re-propose alternatives

| Layer | Choice |
|---|---|
| Framework | **Next.js (App Router)** |
| Rendering | **Static export** (`output: 'export'`) — emits `client/out/`, no Node at serve time |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`) |
| Content | MDX — `next-mdx-remote` + `gray-matter`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings` |
| Icons | `lucide-react` |
| Serving | Static files behind nginx/Caddy on the VPS |

**[ADAPTED] Next.js is correct here.** The monorepo §2 rejects Next.js — that rejection is scoped to the Electron app ("Electron makes SSR pointless; Vite is the standard"). None of that reasoning applies to a public, SEO-dependent, statically-exported marketing site. Next.js is the locked choice **for this repo** and is not up for re-litigation.

**Explicitly rejected — do not propose unless I reopen the question:**
- A CMS (Contentful, Sanity, Strapi) — MDX in git is the content store.
- A component library (shadcn/ui, MUI, Ant) — this site owns its own small primitives in `src/components/ui/`.
- Client-side data fetching / a backend for the site — it is static. The only network calls are the update check and form posts.
- Analytics/tag managers that ship third-party JS — needs my explicit approval (see §11).
- Framer Motion / heavy animation libs — CSS handles what this site needs.

---

## 3. The four pillars — every decision checks against these

**[ADAPTED]** The product's pillars are Fast / Scalable / Secure / Lightweight. "Scalable" (50k vouchers/FY) is meaningless for a static site; it becomes **Findable**. The others carry.

1. **Fast** — Core Web Vitals green on a mid-range Android over 4G, which is how this audience browses. LCP < 2.5s, CLS < 0.1, INP < 200ms. Static HTML, no render-blocking third-party JS.
2. **Findable** — this site's traffic is organic search ("tally alternative", "gst billing software"). Every page has a unique title + meta description, canonical URL, OG image, and JSON-LD where it applies. It ships a correct `sitemap.xml` and `robots.txt`. A change that breaks SEO is a regression even if it looks better.
3. **Secure** — it's a static site, so the attack surface is what we add: no secrets in the client bundle, no third-party script without approval, no PII collected beyond an email the user typed on purpose. See §9.
4. **Lightweight** — minimal deps. Every new dependency must justify its bytes. Ship as little JS as possible; prefer a server component over a client one, and CSS over JS.

If a proposal violates a pillar, the proposal changes — not the pillar.

---

## 4. Enterprise coding standards (non-negotiable — carried over verbatim)

**The meta-rules govern everything below. A change that breaks one is wrong, even if it compiles and ships.**

- **🚨 STRICTLY TYPED TYPESCRIPT — NO ESCAPE HATCHES.** `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitAny`, `strictNullChecks` — all already on in `client/tsconfig.json`; never weaken them. **Zero `any`.** Zero `as Foo` casts — if you reach for one, the design is wrong; fix the source type. Zero `// @ts-ignore` / `// @ts-expect-error` without a one-line justification. `next.config.mjs` sets `typescript.ignoreBuildErrors: false` — **never flip it to unblock a build.**

- **🚨 NEVER VIOLATE DRY — EXTRACT THE THIRD TIME.** Two similar blocks are coincidence; three are a duplication that gets extracted. Repeated section layouts → a shared component. Repeated copy/constants → `src/lib/site.ts`. Repeated card/badge/button markup → `src/components/ui/`. The monorepo exists to avoid KiteOne's 5000-line components; the same standard applies to a landing page built from copy-pasted `<section>` blocks.

- **🚨 VALIDATE EVERY BOUNDARY, EVERY TIME.** There is no IPC here, but the rule stands wherever untrusted data enters: **MDX frontmatter** is parsed and must be validated before use (a typo'd `date:` should fail the build loudly, not render "Invalid Date"); **any fetched JSON** (e.g. the update check against `latest.yml`) is `unknown` until parsed; **any form input** is validated client-side before submit *and* must be re-validated by whatever endpoint receives it — this site being static does not make the endpoint trusted.

- **Naming.** Functions are verbs. Components are PascalCase nouns. Files match their default export. camelCase for TS.
- **Comments.** Default to none. Only explain *why* — non-obvious constraints, workarounds, spec links.
- **One module, one purpose.** Files over 400 lines need justification. Components over 250 lines must split. *(The product repo has drifted badly here — `reports.ts` is 7,551 lines. Do not import that habit into a repo that is still clean.)*
- **No commented-out code. No `console.log` in shipped code. No `TODO` without a tracking issue.**
- **Conventional commits.** PRs get a description and screenshots for visual changes.

---

## 5. Content model — the source of truth

**[ADAPTED]** Replaces the monorepo's §5/§6 (SQLite schema + data-layer types), which have no analogue here.

- **`client/src/lib/site.ts` is the single source of truth** for site-wide constants: origin, tagline, description, `currentVersion`, support email, legal/company identity, the `updateFeed` URLs, download targets, and nav. **Never hardcode any of these in a component.** One place to change.
- **Docs + blog are MDX** in `client/content/{docs,blog}/`. The filename is the slug. Frontmatter is the metadata contract — keep it consistent across files in a folder; adding a field to one means teaching the loader about it.
- **`client/content/releases.ts`** backs the changelog.
- **`site.ts` must stay in sync with the product repo** — `currentVersion` tracks `apps/desktop/package.json`, and `updateFeed` tracks `apps/desktop/electron-builder.yml` (`publish.url`) + `docs/release.md`. A version bump here without a real shipped installer is a lie to `electron-updater`.
- **URLs end in a slash.** `trailingSlash: true` — every internal `href` must match (`/docs/`, not `/docs`) or the static server serves a redirect at best.

---

## 6. Design — a marketing site, NOT the ERP

**[ADAPTED] — this is the sharpest inversion, read it carefully.**

The product repo's §13 mandates: *"Look like Tally / Busy / Marg, not Linear / Notion / Vercel. No 'Welcome back!' greetings, no hero text, no friendly micro-copy, no marketing tagline… A change that could appear on a Stripe Atlas marketing page is wrong."*

**That rule is correct for the ERP and exactly backwards here.** It exists because an operator doing 200 vouchers a day needs density and zero decoration. A prospect deciding whether to abandon Tally needs persuasion. This site already has — and should have — a hero, a tagline, and micro-copy. Applying §13 literally would forbid the site that exists.

**What actually governs this repo:**

- **Marketing pages** (`/`, `/features/`, `/pricing/`, `/download/`, `/about/`) are marketing pages: hero, tagline, benefit copy, CTAs, visual rhythm, generous whitespace. This is the one place in the Acronix codebase where a Stripe-Atlas-grade landing page is the *goal*.
- **Docs pages** (`/docs/*`) lean the other way: dense, scannable, information-first. A user lands here mid-task with a problem. No marketing copy in docs.
- **Product mockups must not lie.** `src/components/mockups/` depicts the real app — and the real app follows §13 (dense, sharp corners, keyboard chips, DR red / CR emerald, tabular-nums). A mockup styled like the marketing page around it misrepresents the product. **The mockups obey the ERP's design rules even though the page around them doesn't.**
- **Brand consistency:** the marketing site may be warm, but it must be recognizably the same product — same navy/slate palette, same logo, same emerald/red accounting semantics wherever numbers appear.
- **Accessibility is not optional:** semantic HTML, real focus states, WCAG AA contrast, alt text on meaningful images. *(The ERP's keyboard-first gate in §13/§12 does **not** transfer — a website is navigated by mouse, scroll, and touch. Standard tab-order accessibility is the bar here, not a shortcut map and status bar.)*
- **Responsive down to 360px.** This audience is heavily mobile. A desktop-only layout is a bug.
- Dark mode is supported (`ThemeScript` / `ThemeToggle`) — style both, never ship a light-only surface.

---

## 7. Git workflow — carried over

- **Default branch is `master`.** All PRs target `master`.
- **All development happens on ONE long-lived branch named `features`.** Never create additional branches. Work on `features`, push `features`, PR `features` → `master`. *(This repo has no `features` branch yet — create it on the first change.)*
- **One PR at a time.** Before opening a new PR, verify the previous one is closed (`gh pr list --state open`).
- **Never push directly to `master`.** Only via PR from `features`.
- **Never run `git push`, `git commit`, or `gh pr create` without my explicit instruction.**

---

## 8. Quality gate — before every push

**[ADAPTED]** The monorepo's gate is `pnpm typecheck && pnpm build && pnpm test`. This repo **has no tests and no CI**. The gate is what exists:

```
cd client
npm run typecheck     # tsc --noEmit
npm run build         # next build — also typechecks (ignoreBuildErrors: false)
```

Both must pass. Never push red code. The monorepo's pre-commit hook and GitHub Actions gate do **not** cover this repo — until CI exists here, **the gate is only real if it's actually run.**

Additionally, for any visual change: **run `npm run dev` and look at the page** at desktop *and* 360px width, in light *and* dark mode. Screenshots go in the PR.

---

## 9. Security — static site

**[ADAPTED]** No SQLCipher, no DEK, no envelope encryption, no RBAC — none of §15 transfers. What matters here:

- **Nothing secret ships to the client.** A static export means every env var inlined at build time is public. No API keys, no tokens, no `DATABASE_URL`. If it needs a secret, it does not belong in this repo.
- **No third-party script without my approval** — analytics, chat widgets, pixels, fonts-from-CDN. Each one is bytes, a privacy exposure, and a supply-chain risk (pillars 3 + 4).
- **Forms collect the minimum.** `NotifyForm` / `ContactForm` take an email the user typed on purpose. Never collect more than needed, and never put user data in a URL query string. The receiving endpoint re-validates — this repo cannot trust it and it cannot trust this repo.
- **External links** to untrusted origins get `rel="noopener noreferrer"`.
- **The site's security claims must be true.** `/security/` and `/docs/security.mdx` describe the product's real crypto (SQLCipher, scrypt envelope encryption, plaintext cloud mirror for AI queryability). If the product's `docs/security.md` changes, this page is a lie until updated. **Never overstate the security posture to sell** — in particular, the cloud mirror is *plaintext by design*; do not let copy imply the cloud backup is end-to-end encrypted.

---

## 10. Where things live

```
/Users/ajayprasadverma/Acronix/Acronix Books Website/
├── CLAUDE.md                  ← this file
└── client/                    ← the Next.js app (repo root is one level up)
    ├── next.config.mjs        ← static export, trailingSlash, strict TS
    ├── package.json
    ├── content/
    │   ├── docs/*.mdx         ← 15 docs, filename = slug
    │   ├── blog/*.mdx         ← 3 posts
    │   └── releases.ts        ← changelog source
    ├── public/                ← favicons, manifest, static assets
    ├── out/                   ← BUILD OUTPUT — generated, never hand-edit (see §12)
    └── src/
        ├── app/               ← App Router: 21 routes + sitemap.ts + robots.ts
        ├── components/
        │   ├── landing/       ← hero, pillars, CTA — marketing surfaces
        │   ├── docs/          ← sidebar, pager
        │   ├── mockups/       ← app depictions — these follow the ERP design rules
        │   ├── mdx/, seo/, site/, ui/, brand/, theme/, legal/, support/
        └── lib/
            ├── site.ts        ← SINGLE SOURCE OF TRUTH (§5)
            ├── content.ts     ← MDX loading
            └── utils.ts
```

Note the repo root is the parent of `client/` — all npm commands run from `client/`.

---

## 11. Operational rules for Claude in this project

- **[ADAPTED] Use zsh/bash on macOS.** The monorepo mandates PowerShell — that file is stale; it still describes a Windows box (`D:\Acronix\Acronix Books\`) and a Windows memory path. This project is on **macOS** (`darwin`), shell is **zsh**.
- **The path has spaces** — `/Users/ajayprasadverma/Acronix/Acronix Books Website/` — always quote it.
- **Never delete or `--force` anything without confirming.**
- **Don't create files I didn't ask for.** No "while I was at it" READMEs or scaffolding I didn't agree to.
- **Brief over verbose.** Match response length to the request. No trailing summaries that restate the diff.
- **Copy is a product decision, not a code detail.** Do not rewrite marketing copy, pricing, or legal text on your own initiative — propose it and let me decide.
- **Legal pages** (`/privacy/`, `/terms/`, `/refund/`) make binding claims. Never invent policy. Flag anything that looks wrong rather than "fixing" it.

---

## 12. Known issues — the current state of this repo

Carried from the audit of `first commit`. Fix before they bite:

1. **No `.gitignore` anywhere.** `node_modules/` is untracked *only because it was never installed* — the first `npm install` + `git add .` commits it.
2. **`client/out/` is committed** — 315 of 419 tracked files are build output. Every build now produces a large, conflict-prone diff. Needs `.gitignore` + `git rm -r --cached`.
3. **`.DS_Store` and `client/tsconfig.tsbuildinfo` are tracked.**
4. **No lockfile and `"next": "latest"`** — builds are not reproducible; a Next release can break the site with no code change. Pin the version and commit a lockfile.
5. **No CI** — the §8 gate is manual until a workflow exists.
6. **No `.nvmrc`** (the monorepo pins Node 24) and **no ESLint/Prettier config** — the monorepo's Prettier settings (`singleQuote`, `printWidth: 100`, `trailingComma: all`, semi) are the house style; match them by hand until configured.

---

## 13. User context

I am a solo developer with strong React/Electron/Node.js experience, comfortable with modular architecture and transactional accounting. I prefer **concrete recommendations with tradeoffs over exhaustive option dumps**. Make architectural calls quickly when defaults are good. Brief responses.

When I ask exploratory questions ("what about X?", "how should we handle Y?"), respond in 2-3 sentences with a recommendation and the main tradeoff — don't implement until I agree.
