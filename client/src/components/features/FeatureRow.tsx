import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Check, Users } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';

export interface FeatureStep {
  /** Short imperative or noun-phrase step name. */
  title: string;
  /** One or two sentences of concrete detail. */
  body: string;
}

export interface CapabilityGroup {
  heading: string;
  items: string[];
}

export interface FeatureRowProps {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  /** 2–4 sentence explanatory lede: what it is and why it matters. */
  lede: string;
  /** Numbered walk-through of the workflow. */
  steps: FeatureStep[];
  /** Label above the steps. Defaults to "How it works". */
  stepsLabel?: string;
  /** Concrete sub-features, grouped sensibly. */
  capabilities: CapabilityGroup[];
  /** Real-world "who it's for" note tied to a specific user. */
  audience: string;
  visual: ReactNode;
  /** Optional finance line-art accent shown above the main visual. */
  illustration?: ReactNode;
  /** When true, the visual sits on the left on desktop. */
  reverse?: boolean;
}

export function FeatureRow({
  id,
  icon: Icon,
  eyebrow,
  title,
  lede,
  steps,
  stepsLabel = 'How it works',
  capabilities,
  audience,
  visual,
  illustration,
  reverse = false,
}: FeatureRowProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-[var(--border)] py-20 last:border-b-0 sm:py-24"
    >
      {/* Intro: heading + lede alongside the visual */}
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={cn(reverse && 'lg:order-2')}>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <Eyebrow className="mt-6">{eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--fg-muted)]">{lede}</p>
        </div>
        <div className={cn('space-y-5', reverse && 'lg:order-1')}>
          {illustration && (
            <div className="flex items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-5">
              {illustration}
            </div>
          )}
          {visual}
        </div>
      </div>

      {/* How it works — numbered walk-through */}
      <div className="mt-14 sm:mt-16">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
          {stepsLabel}
        </h3>
        <ol className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-50 font-display text-sm font-bold tabular-nums text-brand-700 dark:border-brand-400/25 dark:bg-brand-400/10 dark:text-brand-300">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-[var(--fg)]">{step.title}</p>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-[var(--fg-muted)]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Capabilities — grouped concrete sub-features */}
      <div className="mt-12">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
          What&apos;s included
        </h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((group) => (
            <div
              key={group.heading}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5"
            >
              <p className="font-display font-bold text-[var(--fg)]">{group.heading}</p>
              <ul className="mt-3 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[var(--fg-muted)]">
                    <span className="mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                    <span className="text-[0.95rem] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Who it's for */}
      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-4">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-400/10 dark:text-teal-400">
          <Users className="h-4 w-4" aria-hidden />
        </span>
        <p className="text-[0.95rem] leading-relaxed text-[var(--fg-muted)]">
          <span className="font-semibold text-[var(--fg)]">Who it&apos;s for — </span>
          {audience}
        </p>
      </div>
    </section>
  );
}
