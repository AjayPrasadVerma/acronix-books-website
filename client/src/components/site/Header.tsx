'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { DesktopNav, MobileNav } from '@/components/site/MegaMenu';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href !== '/' && pathname?.startsWith(href.replace(/\/$/, ''));

  // On the download page the CTA just points back here — hide it so it does
  // not read as the real "Download for Windows" button on that page.
  const onDownloadPage = pathname?.startsWith('/download') ?? false;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Acronix Books home" className="shrink-0">
          <Logo />
        </Link>

        <DesktopNav isActive={isActive} />

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {!onDownloadPage && (
            <ButtonLink href="/download/" size="sm">
              <Download className="h-4 w-4" />
              Download
            </ButtonLink>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--fg)]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[var(--border)] bg-[var(--bg)] md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            <MobileNav isActive={isActive} />
            {!onDownloadPage && (
              <ButtonLink href="/download/" className="mt-2 w-full">
                <Download className="h-4 w-4" />
                Start free trial
              </ButtonLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
