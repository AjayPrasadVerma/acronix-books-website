import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Sidebar } from '@/components/docs/Sidebar';
import { getDocCategories } from '@/lib/content';

export default function DocsLayout({ children }: { children: ReactNode }) {
  const groups = getDocCategories();
  return (
    <div className="border-t border-[var(--border)] bg-[var(--bg)] py-8 sm:py-12">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
          <Sidebar groups={groups} />
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </div>
  );
}
