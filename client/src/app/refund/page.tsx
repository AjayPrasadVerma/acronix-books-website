import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { company, plan } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description:
    'How billing works for Acronix Books: a 14-day free trial, then an annual subscription. Because the trial is full-featured, the subscription is non-refundable once purchased — but you can cancel any time and keep read access to your books forever.',
  alternates: { canonical: '/refund/' },
};

const mailto = `mailto:${company.supportEmail}`;

export default function RefundPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Refund & Cancellation Policy"
      intro="The honest version: you try the whole product free for 14 days before you pay anything, so the annual subscription is non-refundable once purchased — and you can cancel any time, keeping full read access to your books forever."
      lastUpdated={company.policyEffectiveDate}
    >
      <p>
        This is a plain-language summary and not legal advice. We will update it if our pricing or
        terms change, and the “Last updated” date above will reflect that.
      </p>

      <h2>1. The free trial comes first</h2>
      <p>
        Every installation starts with a <strong>{plan.trialDays}-day free trial</strong> in which
        every feature is unlocked and no card is required. This is the complete product, not a
        cut-down edition — you are expected to evaluate it fully during the trial before deciding to
        pay. See the <a href="/pricing/">Pricing page</a> for the current annual price.
      </p>

      <h2>2. The subscription is non-refundable once purchased</h2>
      <p>
        Because the {plan.trialDays}-day trial lets you test the entire product on your own books at
        no cost and with no obligation, the annual subscription is{' '}
        <strong>non-refundable once you have paid</strong>. We do not offer partial or pro-rated
        refunds for the unused part of a subscription period.
      </p>
      <p>
        If a payment was taken in genuine error — for example, you were charged twice for the same
        licence — email us at <a href={mailto}>{company.supportEmail}</a> and we will investigate and
        correct it.
      </p>

      <h2>3. Cancelling your subscription</h2>
      <p>You can cancel at any time by emailing <a href={mailto}>{company.supportEmail}</a>. When you cancel:</p>
      <ul>
        <li>Your licence runs to the end of the period you have already paid for; it simply does not renew.</li>
        <li>
          After it expires, Acronix Books switches to <strong>read-only</strong> — you can still
          open, search, print and export every voucher and report. It only stops accepting new
          entries.
        </li>
        <li>
          Your books are an encrypted file on your own machine. You are <strong>never</strong> locked
          out of your own data, whether you renew or not.
        </li>
      </ul>

      <h2>4. Cancelling optional cloud sync</h2>
      <p>Cloud sync is optional. To stop it or remove the server-side copy of your book:</p>
      <ul>
        <li>
          <strong>Stop syncing</strong> — turn cloud sync off in the app. Acronix Books continues to
          work fully offline, and your local book stays on your machine, encrypted at rest.
        </li>
        <li>
          <strong>Delete your cloud data</strong> — request deletion by emailing{' '}
          <a href={mailto}>{company.supportEmail}</a>. We will action it and confirm{' '}
          {company.responseTime}. Deleting the cloud copy does not affect the local copy on your own
          computer.
        </li>
      </ul>

      <h2>5. Contact</h2>
      <p>
        Any questions about billing, cancellation, or this policy? Email{' '}
        <a href={mailto}>{company.supportEmail}</a> — we respond {company.responseTime}.
      </p>
    </LegalLayout>
  );
}
