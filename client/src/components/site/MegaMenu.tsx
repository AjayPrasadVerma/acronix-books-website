'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { nav, type NavEntry, type NavLink } from '@/lib/site';
import { cn } from '@/lib/utils';

type MenuEntry = Extract<NavEntry, { kind: 'menu' }>;

interface NavProps {
  /** Whether an href is part of the active route. Supplied by the Header. */
  isActive: (href: string) => boolean;
}

const menuIsActive = (entry: MenuEntry, isActive: (href: string) => boolean) =>
  isActive(entry.overviewHref) || entry.links.some((l) => isActive(l.href));

const panelId = (label: string) => `mega-panel-${label.toLowerCase().replace(/\s+/g, '-')}`;

/* ------------------------------------------------------------------ *
 * Shared leaf renderer — used by both desktop panels and mobile sections
 * so the label/description markup lives in exactly one place.
 * ------------------------------------------------------------------ */
function PanelLink({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      className="group/link block rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--bg-subtle)] focus-visible:bg-[var(--bg-subtle)]"
    >
      <span className="block text-sm font-semibold text-[var(--fg)] transition-colors group-hover/link:text-brand-600 dark:group-hover/link:text-brand-400">
        {link.label}
      </span>
      {link.description && (
        <span className="mt-0.5 block text-xs leading-snug text-[var(--fg-muted)]">
          {link.description}
        </span>
      )}
    </Link>
  );
}

function OverviewLink({ entry }: { entry: MenuEntry }) {
  return (
    <Link
      href={entry.overviewHref}
      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-[var(--bg-subtle)] dark:text-brand-400"
    >
      {entry.overviewLabel}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Desktop
 * ------------------------------------------------------------------ */
function MenuPanel({ entry }: { entry: MenuEntry }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-2 shadow-xl shadow-ink-950/10 ring-1 ring-black/5 dark:ring-white/5">
      <ul
        className={cn(
          'grid gap-0.5',
          entry.layout === 'mega' ? 'sm:grid-cols-2' : 'grid-cols-1',
        )}
      >
        {entry.links.map((link) => (
          <li key={link.href}>
            <PanelLink link={link} />
          </li>
        ))}
      </ul>
      <div className="mt-1 border-t border-[var(--border)] pt-1">
        <OverviewLink entry={entry} />
      </div>
    </div>
  );
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
        <div
          className={cn(
            'absolute top-full z-50 pt-2',
            entry.layout === 'mega' ? 'left-0 w-[min(92vw,40rem)]' : 'right-0 w-72',
          )}
        >
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
          {entry.links.map((link) => (
            <PanelLink key={link.href} link={link} />
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
