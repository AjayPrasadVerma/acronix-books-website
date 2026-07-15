import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/Primitives';

export interface FaqItem {
  question: string;
  /** Plain text. Split into paragraphs on blank lines. Also used verbatim for
   *  FAQPage JSON-LD, so keep it answer-complete and self-contained. */
  answer: string;
}

/**
 * Accessible FAQ section. Uses native <details>/<summary> so it works with zero
 * JavaScript (correct under static export) and injects FAQPage structured data
 * for rich results in search.
 */
export function Faq({
  items,
  eyebrow = 'FAQ',
  title = 'Frequently asked questions',
  description,
  className,
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <section className={className}>
      <Container size="narrow">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]">
          {items.map((item) => (
            <details key={item.question} className="group px-5 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-[var(--fg)] [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-[var(--fg-subtle)] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="pb-5 -mt-1 space-y-3 text-[var(--fg-muted)] leading-relaxed">
                {item.answer.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
