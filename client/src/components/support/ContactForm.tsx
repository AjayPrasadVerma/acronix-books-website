'use client';

import { useMemo, useState } from 'react';
import { Check, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { company, site } from '@/lib/site';
import { cn } from '@/lib/utils';

/** The support topics a visitor can pick. `value` is stable (used in the email
 *  subject line); `label` is what the user sees. */
const TOPICS = [
  { value: 'General', label: 'General question' },
  { value: 'Installation', label: 'Installation & setup' },
  { value: 'GST/returns', label: 'GST & returns' },
  { value: 'Data & backup', label: 'Data & backup' },
  { value: 'Bug report', label: 'Bug report' },
  { value: 'Feature request', label: 'Feature request' },
] as const;

type TopicValue = (typeof TOPICS)[number]['value'];

// Deliberately permissive but sane client-side check. No server ever sees this.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Extra context we ask for so the reply is actionable on the first pass. */
const DIAGNOSTIC_BLOCK = [
  '',
  '— — — Please keep the details below so we can help faster — — —',
  `App version: (Settings → Updates, or press Ctrl+U — current release is ${site.currentVersion})`,
  'Operating system: (e.g. Windows 11 64-bit)',
  'Steps to reproduce / what you expected:',
].join('\n');

function buildMailto(name: string, email: string, topic: TopicValue, message: string): string {
  const subject = `[${topic}] ${site.name} support — ${name || 'Website enquiry'}`;
  const body = [
    `Hi ${site.name} team,`,
    '',
    message.trim() || '(Describe your question or issue here.)',
    '',
    `Name: ${name || '(not provided)'}`,
    `Reply-to: ${email || '(not provided)'}`,
    `Topic: ${topic}`,
    DIAGNOSTIC_BLOCK,
    '',
    'Thanks!',
  ].join('\n');
  return `mailto:${company.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const inputBase =
  'h-11 w-full rounded-xl border bg-[var(--bg)] px-3 text-sm text-[var(--fg)] transition-colors placeholder:text-[var(--fg-subtle)] focus-visible:border-brand-500 focus-visible:outline-none';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<TopicValue>('General');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  const directMailto = useMemo(
    () => buildMailto(name, email, topic, message),
    [name, email, topic, message],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !EMAIL_RE.test(trimmedEmail)) {
      setError('Please enter a valid email address so we can reply to you.');
      return;
    }
    if (!message.trim()) {
      setError('Please add a short message describing your question or issue.');
      return;
    }
    setError(null);
    // No backend: hand off to the visitor's email client. Nothing is sent from here.
    window.location.href = directMailto;
    setOpened(true);
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 sm:p-8">
      <div className="flex items-center gap-2 text-xs font-medium text-[var(--fg-subtle)]">
        <Mail className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
        This form opens your email app with a prefilled message — nothing is sent to a server.
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="support-name" className="text-sm font-semibold text-[var(--fg)]">
              Name
            </label>
            <input
              id="support-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={cn(inputBase, 'border-[var(--border-strong)]')}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="support-email" className="text-sm font-semibold text-[var(--fg)]">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="support-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError(null);
              }}
              aria-invalid={error ? true : undefined}
              className={cn(
                inputBase,
                error ? 'border-red-400 dark:border-red-500/60' : 'border-[var(--border-strong)]',
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="support-topic" className="text-sm font-semibold text-[var(--fg)]">
            Topic
          </label>
          <select
            id="support-topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value as TopicValue)}
            className={cn(inputBase, 'border-[var(--border-strong)] appearance-none pr-8')}
          >
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="support-message" className="text-sm font-semibold text-[var(--fg)]">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="support-message"
            rows={5}
            placeholder="Tell us what you need help with. For bugs, include the steps you took and what happened."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              if (error) setError(null);
            }}
            className={cn(
              'w-full rounded-xl border bg-[var(--bg)] px-3 py-2.5 text-sm leading-relaxed text-[var(--fg)] transition-colors placeholder:text-[var(--fg-subtle)] focus-visible:border-brand-500 focus-visible:outline-none',
              error ? 'border-red-400 dark:border-red-500/60' : 'border-[var(--border-strong)]',
            )}
          />
        </div>

        {error && (
          <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" variant="primary" className="shrink-0">
            <Send className="h-4 w-4" aria-hidden="true" />
            Open email &amp; send
          </Button>
          <p className="text-xs text-[var(--fg-subtle)]">
            Prefer to write it yourself? Email us at{' '}
            <a
              href={`mailto:${company.supportEmail}`}
              className="font-semibold text-brand-600 underline underline-offset-2 hover:no-underline dark:text-brand-400"
            >
              {company.supportEmail}
            </a>
            .
          </p>
        </div>
      </form>

      {opened && (
        <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm dark:border-teal-400/25 dark:bg-teal-400/10">
          <p className="flex items-center gap-2 font-semibold text-teal-700 dark:text-teal-300">
            <Check className="h-4 w-4" aria-hidden="true" />
            Your email app should have opened.
          </p>
          <p className="mt-1 text-teal-700/80 dark:text-teal-300/80">
            Review the prefilled message and hit send. Nothing was submitted from this page. If
            nothing opened,{' '}
            <a
              href={directMailto}
              className="font-semibold underline underline-offset-2 hover:no-underline"
            >
              try again
            </a>{' '}
            or email{' '}
            <a
              href={`mailto:${company.supportEmail}`}
              className="font-semibold underline underline-offset-2 hover:no-underline"
            >
              {company.supportEmail}
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
