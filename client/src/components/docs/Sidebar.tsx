'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, PanelLeftClose } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DocMeta } from '@/lib/content';

export interface SidebarGroup {
  category: string;
  docs: DocMeta[];
}

function normalize(pathname: string | null): string {
  if (!pathname) return '';
  return pathname.replace(/\/$/, '');
}

function DocLinks({ groups, onNavigate }: { groups: SidebarGroup[]; onNavigate?: () => void }) {
  const pathname = normalize(usePathname());
  return (
    <nav className="flex flex-col gap-7">
      {groups.map((group) => (
        <div key={group.category}>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
            {group.category}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.docs.map((doc) => {
              const href = `/docs/${doc.slug}`;
              const active = pathname === href;
              return (
                <li key={doc.slug}>
                  <Link
                    href={`${href}/`}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'block rounded-lg px-3 py-1.5 text-sm transition-colors',
                      active
                        ? 'bg-brand-50 font-semibold text-brand-700 dark:bg-brand-400/10 dark:text-brand-300'
                        : 'text-[var(--fg-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--fg)]',
                    )}
                  >
                    {doc.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function Sidebar({ groups }: { groups: SidebarGroup[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile disclosure */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm font-semibold text-[var(--fg)]"
        >
          <span className="inline-flex items-center gap-2">
            <PanelLeftClose className="h-4 w-4 text-[var(--fg-muted)]" />
            Browse documentation
          </span>
          <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
        </button>
        {open && (
          <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
            <DocLinks groups={groups} onNavigate={() => setOpen(false)} />
          </div>
        )}
      </div>

      {/* Desktop sticky rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pr-4">
          <DocLinks groups={groups} />
        </div>
      </aside>
    </>
  );
}
