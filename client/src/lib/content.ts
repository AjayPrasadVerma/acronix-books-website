/**
 * Build-time content layer for the Acronix Books site.
 *
 * Docs and blog posts are authored as MDX files under `content/` and read from
 * the filesystem with `fs`/`gray-matter` at build time (this project uses Next's
 * static export — there is no request-time runtime). Release notes are a typed
 * TS data module (`content/releases.ts`) re-exported here.
 *
 * Frontmatter arrives from gray-matter as `unknown`-shaped data; every field is
 * narrowed through the small validators below into a fully typed object with
 * sensible defaults, so the rest of the app never touches an untyped value.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { releases } from '../../content/releases';

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingMinutes: number;
}

export interface ReleaseNote {
  version: string;
  date: string;
  summary: string;
  sections: { title: string; items: string[] }[];
}

/* ------------------------------------------------------------------ *
 * Paths
 * ------------------------------------------------------------------ */
const CONTENT_DIR = path.join(process.cwd(), 'content');
const DOCS_DIR = path.join(CONTENT_DIR, 'docs');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');

/**
 * Explicit, ordered list of doc categories. Drives sidebar ordering and the
 * sort key in getAllDocs/getDocCategories so output is fully deterministic.
 */
const CATEGORY_ORDER = [
  'Getting started',
  'Daily use',
  'Compliance',
  'Data & security',
  'Help',
] as const;

/* ------------------------------------------------------------------ *
 * Narrowing helpers — turn `unknown` frontmatter into typed values.
 * ------------------------------------------------------------------ */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function str(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

function num(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function strArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

/* ------------------------------------------------------------------ *
 * Low-level file access
 * ------------------------------------------------------------------ */
function readMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

function readRaw(dir: string, slug: string): { data: unknown; content: string } | null {
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(source);
  return { data: parsed.data, content: parsed.content };
}

function countWords(content: string): number {
  const words = content
    .replace(/```[\s\S]*?```/g, ' ') // drop fenced code
    .replace(/[#>*_`~\-|]/g, ' ') // drop common markdown punctuation
    .split(/\s+/)
    .filter(Boolean);
  return words.length;
}

/* ------------------------------------------------------------------ *
 * Frontmatter -> typed meta
 * ------------------------------------------------------------------ */
function toDocMeta(slug: string, data: unknown): DocMeta {
  const fm = isRecord(data) ? data : {};
  const category = str(fm.category, 'Getting started');
  const knownCategory = (CATEGORY_ORDER as readonly string[]).includes(category)
    ? category
    : 'Getting started';
  return {
    slug,
    title: str(fm.title, slug),
    description: str(fm.description, ''),
    category: knownCategory,
    order: num(fm.order, 999),
  };
}

function toPostMeta(slug: string, data: unknown, content: string): PostMeta {
  const fm = isRecord(data) ? data : {};
  return {
    slug,
    title: str(fm.title, slug),
    description: str(fm.description, ''),
    date: str(fm.date, '1970-01-01'),
    author: str(fm.author, 'Acronix Books Team'),
    tags: strArray(fm.tags),
    readingMinutes: Math.max(1, Math.ceil(countWords(content) / 200)),
  };
}

function categoryRank(category: string): number {
  const idx = (CATEGORY_ORDER as readonly string[]).indexOf(category);
  return idx === -1 ? CATEGORY_ORDER.length : idx;
}

/* ------------------------------------------------------------------ *
 * Docs API
 * ------------------------------------------------------------------ */
export function getDocSlugs(): string[] {
  return readMdxFiles(DOCS_DIR);
}

export function getDoc(slug: string): { meta: DocMeta; content: string } | null {
  const raw = readRaw(DOCS_DIR, slug);
  if (!raw) return null;
  return { meta: toDocMeta(slug, raw.data), content: raw.content };
}

export function getAllDocs(): DocMeta[] {
  return getDocSlugs()
    .map((slug) => {
      const raw = readRaw(DOCS_DIR, slug);
      return raw ? toDocMeta(slug, raw.data) : null;
    })
    .filter((meta): meta is DocMeta => meta !== null)
    .sort((a, b) => {
      const byCategory = categoryRank(a.category) - categoryRank(b.category);
      if (byCategory !== 0) return byCategory;
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });
}

export function getDocCategories(): { category: string; docs: DocMeta[] }[] {
  const all = getAllDocs();
  return CATEGORY_ORDER.map((category) => ({
    category,
    docs: all.filter((doc) => doc.category === category),
  })).filter((group) => group.docs.length > 0);
}

/* ------------------------------------------------------------------ *
 * Blog API
 * ------------------------------------------------------------------ */
export function getPostSlugs(): string[] {
  return readMdxFiles(BLOG_DIR);
}

export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const raw = readRaw(BLOG_DIR, slug);
  if (!raw) return null;
  return { meta: toPostMeta(slug, raw.data, raw.content), content: raw.content };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const raw = readRaw(BLOG_DIR, slug);
      return raw ? toPostMeta(slug, raw.data, raw.content) : null;
    })
    .filter((meta): meta is PostMeta => meta !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/* ------------------------------------------------------------------ *
 * Releases API
 * ------------------------------------------------------------------ */
export function getReleases(): ReleaseNote[] {
  return [...releases].sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));
}
