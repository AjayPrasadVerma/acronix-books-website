/**
 * Tiny class-name joiner. Keeps the dependency surface minimal (no clsx /
 * tailwind-merge) — good enough for conditional classes across this site.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
