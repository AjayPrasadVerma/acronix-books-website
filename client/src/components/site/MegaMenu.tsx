'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { menuLinks, nav, type NavEntry, type NavGroup, type NavLink } from '@/lib/site';
import { cn } from '@/lib/utils';

type MenuEntry = Extract<NavEntry, { kind: 'menu' }>;

interface NavProps {
  /** Whether an href is part of the active route. Supplied by the Header. */
  isActive: (href: string) => boolean;
}

const menuIsActive = (entry: MenuEntry, isActive: (href: string) => boolean) =>
  isActive(entry.overviewHref) || menuLinks(entry).some((l) => isActive(l.href));

const panelId = (label: string) => `mega-panel-${label.toLowerCase().replace(/\s+/g, '-')}`;

/* ------------------------------------------------------------------ *
 * Shared leaf renderer — used by every desktop panel AND the mobile
 * accordion, so the icon/label/description markup lives in exactly one
 * place. A per-menu copy of this would be the DRY failure this file exists
 * to avoid.
 * ------------------------------------------------------------------ */
// `compact` drops the description. A wide list (15 industries) needs to run
// horizontally across columns; keeping two lines of prose per row is what made
// the panel taller than the viewport.
function PanelLink({ link, compact = false }: { link: NavLink; compact?: boolean }) {
  const Icon = link.icon;
  return (
    <Link
      href={link.href}
      className="group/link flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-[var(--bg-subtle)] focus-visible:bg-[var(--bg-subtle)]"
    >
      {Icon && (
        <span
          className="mt-px inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg-muted)] transition-colors group-hover/link:border-brand-600/30 group-hover/link:text-brand-600 dark:group-hover/link:border-brand-400/30 dark:group-hover/link:text-brand-400"
          aria-hidden
        >
          <Icon className="h-4 w-4" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[var(--fg)] transition-colors group-hover/link:text-brand-600 dark:group-hover/link:text-brand-400">
          {link.label}
        </span>
        {!compact && link.description && (
          <span className="mt-0.5 block text-xs leading-snug text-[var(--fg-muted)]">
            {link.description}
          </span>
        )}
      </span>
    </Link>
  );
}

/** The small uppercase label that turns a list into a section. */
function GroupLabel({ children }: { children: string }) {
  return (
    <p className="px-2.5 pb-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
      {children}
    </p>
  );
}

function OverviewLink({ entry }: { entry: MenuEntry }) {
  return (
    <Link
      href={entry.overviewHref}
      className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-[var(--bg-subtle)] dark:text-brand-400"
    >
      {entry.overviewLabel}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Desktop panels
 * ------------------------------------------------------------------ */

/** Literal classes — Tailwind can't see a computed `grid-cols-${n}`. */
function columnsClass(count: number): string {
  if (count >= 3) return 'sm:grid-cols-3';
  if (count === 2) return 'sm:grid-cols-2';
  return 'grid-cols-1';
}

function GroupColumn({
  group,
  itemsClass,
  compact = false,
}: {
  group: NavGroup;
  itemsClass?: string;
  compact?: boolean;
}) {
  return (
    <div className="px-1.5 first:pl-0 last:pr-0">
      <GroupLabel>{group.label}</GroupLabel>
      <ul className={cn('grid gap-0.5', itemsClass)}>
        {group.links.map((link) => (
          <li key={link.href}>
            <PanelLink link={link} compact={compact} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuPanel({ entry }: { entry: MenuEntry }) {
  const isGrid = entry.layout === 'grid';
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-3 shadow-xl shadow-ink-950/10 ring-1 ring-black/5 dark:ring-white/5">
      <div
        className={cn(
          'grid',
          isGrid
            ? 'grid-cols-1'
            : cn('gap-0 divide-x divide-[var(--border)]', columnsClass(entry.groups.length)),
        )}
      >
        {entry.groups.map((group) => (
          <GroupColumn
            key={group.label}
            group={group}
            itemsClass={isGrid ? 'sm:grid-cols-2 lg:grid-cols-3' : undefined}
            compact={isGrid}
          />
        ))}
      </div>
      <div className="mt-2 border-t border-[var(--border)] pt-1.5">
        <OverviewLink entry={entry} />
      </div>
    </div>
  );
}

function panelPosition(entry: MenuEntry): string {
  const edge = entry.align === 'right' ? 'right-0' : 'left-0';
  // The grid panel holds every industry (15 and counting) — it has to run wide
  // across 3 columns, not tall down 2, or it outgrows the viewport.
  if (entry.layout === 'grid') return cn(edge, 'w-[min(94vw,52rem)]');
  if (entry.groups.length >= 3) return cn(edge, 'w-[min(94vw,50rem)]');
  return cn(edge, 'w-[min(92vw,32rem)]');
}

function DesktopMenuItem({
  entry,
  open,
  active,
  onOpen,
  onClose,
}: {
  entry: MenuEntry;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = panelId(entry.label);

  const panelLinks = () =>
    Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? []);

  // Set when the panel was opened BY KEYBOARD, meaning focus should follow into
  // it. Hover opens the same panel and must NOT steal focus, so the intent has
  // to be tracked rather than inferred from `open` alone.
  const focusOnOpenRef = useRef(false);

  // Focus after React has committed the panel — not in a rAF. The panel is
  // conditionally rendered, so a rAF scheduled from the keydown handler runs
  // before the commit, queries an empty panel and focuses nothing: the menu
  // opened but the caret stayed on the trigger.
  useEffect(() => {
    if (!open) {
      focusOnOpenRef.current = false;
      return;
    }
    if (focusOnOpenRef.current) {
      focusOnOpenRef.current = false;
      panelLinks()[0]?.focus();
    }
  }, [open]);

  /** Open (or, if already open, just dive in) and land on the first link. */
  const enterPanel = () => {
    if (open) {
      panelLinks()[0]?.focus();
      return;
    }
    focusOnOpenRef.current = true;
    onOpen();
  };

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      enterPanel();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) {
        onClose();
      } else {
        enterPanel();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const onPanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      triggerRef.current?.focus();
      return;
    }
    const links = panelLinks();
    const idx = links.findIndex((el) => el === document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      links[Math.min(idx + 1, links.length - 1)]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx <= 0) triggerRef.current?.focus();
      else links[idx - 1]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      links[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      links[links.length - 1]?.focus();
    }
  };

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? onClose() : onOpen())}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[0.95rem] font-medium transition-colors',
          open || active
            ? 'text-brand-600 dark:text-brand-400'
            : 'text-[var(--fg-muted)] hover:text-[var(--fg)]',
        )}
      >
        {entry.label}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <div className={cn('absolute top-full z-50 pt-2', panelPosition(entry))}>
          <div id={id} ref={panelRef} aria-label={entry.label} onKeyDown={onPanelKeyDown}>
            <MenuPanel entry={entry} />
          </div>
        </div>
      )}
    </div>
  );
}

export function DesktopNav({ isActive }: NavProps) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openLabel) return;
    const onPointerDown = (e: MouseEvent) => {
      if (e.target instanceof Node && navRef.current?.contains(e.target)) return;
      setOpenLabel(null);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [openLabel]);

  // Close when focus leaves the whole nav (Tab out) — the menu never traps focus.
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget;
    if (next instanceof Node && navRef.current?.contains(next)) return;
    setOpenLabel(null);
  };

  return (
    <div ref={navRef} onBlur={onBlur} className="hidden items-center gap-1 md:flex">
      {nav.primary.map((entry) =>
        entry.kind === 'link' ? (
          <Link
            key={entry.label}
            href={entry.href}
            className={cn(
              'rounded-lg px-3 py-2 text-[0.95rem] font-medium transition-colors',
              isActive(entry.href)
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-[var(--fg-muted)] hover:text-[var(--fg)]',
            )}
          >
            {entry.label}
          </Link>
        ) : (
          <DesktopMenuItem
            key={entry.label}
            entry={entry}
            open={openLabel === entry.label}
            active={menuIsActive(entry, isActive)}
            onOpen={() => setOpenLabel(entry.label)}
            onClose={() => setOpenLabel(null)}
          />
        ),
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Mobile — accordion sections inside the existing drawer
 * ------------------------------------------------------------------ */
function MobileSection({
  entry,
  open,
  onToggle,
}: {
  entry: MenuEntry;
  open: boolean;
  onToggle: () => void;
}) {
  const id = `${panelId(entry.label)}-mobile`;
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-[var(--fg)] hover:bg-[var(--bg-subtle)]"
      >
        {entry.label}
        <ChevronDown
          className={cn('h-5 w-5 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open && (
        <div id={id} className="mb-1 ml-2 border-l border-[var(--border)] pl-2">
          {entry.groups.map((group) => (
            <div key={group.label} className="pt-1.5 first:pt-0">
              <GroupLabel>{group.label}</GroupLabel>
              {group.links.map((link) => (
                <PanelLink key={link.href} link={link} />
              ))}
            </div>
          ))}
          <OverviewLink entry={entry} />
        </div>
      )}
    </div>
  );
}

export function MobileNav({ isActive }: NavProps) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-1">
      {nav.primary.map((entry) =>
        entry.kind === 'link' ? (
          <Link
            key={entry.label}
            href={entry.href}
            className={cn(
              'rounded-lg px-3 py-2.5 text-base font-medium hover:bg-[var(--bg-subtle)]',
              isActive(entry.href) ? 'text-brand-600 dark:text-brand-400' : 'text-[var(--fg)]',
            )}
          >
            {entry.label}
          </Link>
        ) : (
          <MobileSection
            key={entry.label}
            entry={entry}
            open={openLabel === entry.label}
            onToggle={() =>
              setOpenLabel((current) => (current === entry.label ? null : entry.label))
            }
          />
        ),
      )}
    </div>
  );
}
