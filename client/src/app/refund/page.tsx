import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { company } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description:
    'Acronix Books is free to download and use during early access, so there is nothing to purchase or refund today. How to cancel optional cloud sync and what happens if paid plans arrive later.',
  alternates: { canonical: '/refund/' },
};

const mailto = `mailto:${company.supportEmail}`;

export default function RefundPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Refund & Cancellation Policy"
      intro="The honest version: Acronix Books is free right now, so there is nothing to pay for and nothing to refund."
      lastUpdated={company.policyEffectiveDate}
    >
      <p>
        This is a plain-language summary and not legal advice. We will update it if our pricing
        changes, and the “Last updated” date above will reflect that.
      </p>

      <h2>1. Acronix Books is free during early access</h2>
      <p>
        Acronix Books is currently <strong>free to download and use</strong> during its early-access
        period. There is no purchase, no subscription, no trial timer, and no credit card required.
        Because you are not charged, <strong>there is nothing to refund today</strong>.
      </p>

      <h2>2. If paid plans are introduced later</h2>
      <p>
        We may introduce paid plans in the future. If and when we do, we will update this policy{' '}
        <strong>before</strong> any charges apply, and it will set out clearly:
      </p>
      <ul>
        <li>What each plan includes and what it costs;</li>
        <li>The refund window and the conditions under which a refund is available;</li>
        <li>How to request a refund and how long it takes to process.</li>
      </ul>
      <p>
        Choosing a paid plan will always be an explicit, opt-in decision. We will not convert your
        free early-access installation into a paid subscription without your clear consent.
      </p>

      <h2>3. Cancelling optional cloud sync</h2>
      <p>
        Cloud sync is an optional feature and is free during early access. You can cancel it at any
        time:
      </p>
      <ul>
        <li>
          <strong>Stop syncing</strong> — turn cloud sync off in the app. Acronix Books continues to
          work fully offline, and your local book stays on your machine, encrypted at rest.
        </li>
        <li>
          <strong>Delete your account</strong> — to remove the server-side copy of your book,
          request account deletion by emailing us at{' '}
          <a href={mailto}>{company.supportEmail}</a>. We will action it and confirm{' '}
          {company.responseTime}. Deleting your cloud account does not affect the local copy on your
          own computer.
        </li>
      </ul>

      <h2>4. Contact</h2>
      <p>
        Any questions about billing, cancellation, or this policy? Email{' '}
        <a href={mailto}>{company.supportEmail}</a> — we respond {company.responseTime}.
      </p>
    </LegalLayout>
  );
}
