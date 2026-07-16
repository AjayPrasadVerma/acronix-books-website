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
function PanelLink({
  link,
  compact = false,
  active = false,
}: {
  link: NavLink;
  compact?: boolean;
  active?: boolean;
}) {
  const Icon = link.icon;
  return (
    <Link
      href={link.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group/link flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition-colors focus-visible:bg-[var(--bg-subtle)]',
        active ? 'bg-brand-50 dark:bg-brand-400/10' : 'hover:bg-[var(--bg-subtle)]',
      )}
    >
      {Icon && (
        <span
          className={cn(
            'mt-px inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition-colors',
            active
              ? 'border-brand-600/30 bg-brand-100/60 text-brand-600 dark:border-brand-400/30 dark:bg-brand-400/15 dark:text-brand-400'
              : 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg-muted)] group-hover/link:border-brand-600/30 group-hover/link:text-brand-600 dark:group-hover/link:border-brand-400/30 dark:group-hover/link:text-brand-400',
          )}
          aria-hidden
        >
          <Icon className="h-4 w-4" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block text-sm font-semibold transition-colors',
            active
              ? 'text-brand-600 dark:text-brand-400'
              : 'text-[var(--fg)] group-hover/link:text-brand-600 dark:group-hover/link:text-brand-400',
          )}
        >
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
  isActive,
}: {
  group: NavGroup;
  itemsClass?: string;
  compact?: boolean;
  isActive: (href: string) => boolean;
}) {
  return (
    <div className="px-1.5 first:pl-0 last:pr-0">
      <GroupLabel>{group.label}</GroupLabel>
      <ul className={cn('grid gap-0.5', itemsClass)}>
        {group.links.map((link) => (
          <li key={link.href}>
            <PanelLink link={link} compact={compact} active={isActive(link.href)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuPanel({
  entry,
  isActive,
}: {
  entry: MenuEntry;
  isActive: (href: string) => boolean;
}) {
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
            isActive={isActive}
          />
        ))}
      </div>
      <div className="mt-2 border-t border-[var(--border)] pt-1.5">
        <OverviewLink entry={entry} />
      </div>
    </div>
  );
}

// Panels open CENTRED, not pinned to a trigger's left or right edge — an
// edge-anchored panel drifts away from the label and reads as misaligned.
//
// They centre on the NAV CONTAINER, not on the individual trigger. Centring on
// the trigger is the obvious reading of "centred" and it is wrong here: the nav
// sits mid-header, so a 50rem panel under the rightmost trigger hangs off the
// right edge (measured: 77px past the viewport at 1024px, which also gave the
// whole page a horizontal scrollbar). Centring on the nav keeps every panel on
// screen at any width, and since the nav is itself centred the panel reads as
// centred too. The width cap alone does NOT solve this — it limits size, not
// position.
function panelPosition(entry: MenuEntry): string {
  // The grid panel holds every industry (15 and counting) — it runs wide across
  // 3 columns rather than tall down 2, or it outgrows the viewport.
  const width =
    entry.layout === 'grid'
      ? 'w-[min(94vw,52rem)]'
      : entry.groups.length >= 3
        ? 'w-[min(94vw,50rem)]'
        : 'w-[min(92vw,32rem)]';
  return cn('left-1/2 -translate-x-1/2', width);
}

function DesktopMenuItem({
  entry,
  open,
  active,
  onOpen,
  onClose,
  isActive,
}: {
  entry: MenuEntry;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
  isActive: (href: string) => boolean;
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
    // Deliberately NOT `relative`: the panel is absolutely positioned against
    // the nav container (which is), so it centres on the whole nav rather than
    // on this one trigger. Centring on the trigger overflowed the viewport for
    // the rightmost menus — a 50rem panel hung 77px off-screen at 1024px and
    // gave the page a horizontal scrollbar.
    <div onMouseEnter={onOpen} onMouseLeave={onClose}>
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
            <MenuPanel entry={entry} isActive={isActive} />
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
    // `relative` is load-bearing: every panel positions against this container
    // so it centres on the nav rather than on its own trigger. See panelPosition.
    <div ref={navRef} onBlur={onBlur} className="relative hidden items-center gap-1 md:flex">
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
            isActive={isActive}
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
  isActive,
}: {
  entry: MenuEntry;
  open: boolean;
  onToggle: () => void;
  isActive: (href: string) => boolean;
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
                <PanelLink key={link.href} link={link} active={isActive(link.href)} />
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
            isActive={isActive}
          />
        ),
      )}
    </div>
  );
}
