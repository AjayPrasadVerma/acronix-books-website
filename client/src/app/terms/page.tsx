import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { company, plan, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing your use of Acronix Books during early access — your licence to use the software, acceptable use, responsibility for your own filings and backups, warranties, and governing law.',
  alternates: { canonical: '/terms/' },
};

const mailto = `mailto:${company.supportEmail}`;

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      intro="These terms govern your use of Acronix Books. By downloading, installing, or using the software, you agree to them."
      lastUpdated={company.policyEffectiveDate}
    >
      <p>
        These Terms of Service (the “Terms”) are an agreement between you and {company.legalName}{' '}
        (“we”, “us”) covering your use of the Acronix Books desktop application, our website, and
        the optional cloud-sync service (together, the “Service”). This is a plain-language summary
        and not legal advice; we may update it, and continued use after an update means you accept
        the revised Terms.
      </p>

      <h2>1. Licence to use the software</h2>
      <p>
        Acronix Books is offered as a paid annual subscription with a{' '}
        <strong>{plan.trialDays}-day free trial</strong>; the current price is shown on our{' '}
        <a href="/pricing/">Pricing page</a>. Activating a licence grants you a personal,
        non-exclusive, non-transferable, revocable licence to install and use the software for your
        business or professional accounting purposes for the paid period.
      </p>
      <p>
        Billing, cancellation and our no-refund-after-purchase policy are set out in the{' '}
        <a href="/refund/">Refund &amp; Cancellation Policy</a>. If a subscription lapses, the app
        switches to read-only: you keep full read and export access to your own books and only lose
        the ability to record new entries.
      </p>
      <p>
        Early-access software is under active development. Features may change, be added, or be
        removed, and you may encounter bugs. We recommend keeping your own backups (see below).
      </p>

      <h2>2. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          Reverse-engineer, decompile, or attempt to extract source code except to the extent that
          applicable law expressly permits;
        </li>
        <li>Resell, sublicense, or redistribute the software as your own product;</li>
        <li>
          Use the Service to store or process content that is unlawful, or to breach the rights of
          others;
        </li>
        <li>
          Attempt to gain unauthorised access to our cloud infrastructure, other accounts, or to
          disrupt or overload the Service.
        </li>
      </ul>

      <h2>3. Your data and your responsibilities</h2>
      <p>
        You are solely responsible for the <strong>accuracy of your accounting records and your
        statutory filings</strong>, including GST returns generated or exported from Acronix Books.
        The software is a tool that computes from the data you enter; it does not replace the
        judgement of a qualified accountant or tax professional, and we do not file returns on your
        behalf. Always review generated figures before relying on or submitting them.
      </p>
      <p>
        You are also responsible for <strong>maintaining your own backups</strong>. Because your
        book is stored locally on your machine, the safety of that file — and of the credentials and
        recovery code that unlock it — is your responsibility. If you lose both your password and
        your recovery code, your data is unrecoverable by design. Optional cloud sync provides an
        off-site copy but does not remove your responsibility to keep local backups.
      </p>

      <h2>4. No warranty</h2>
      <p>
        The Service is provided <strong>“as is” and “as available”, without warranties of any
        kind</strong>, whether express or implied, including any implied warranties of
        merchantability, fitness for a particular purpose, or non-infringement. We do not warrant
        that the Service will be uninterrupted, error-free, or that it will meet every requirement,
        particularly during early access.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {company.legalName} will not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or for any loss of
        profits, revenue, data, or goodwill, arising out of or in connection with your use of — or
        inability to use — the Service. Our aggregate liability for any claim is limited to the
        amount you have paid us for the Service in the twelve months preceding the claim.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The Acronix Books software, website, name, and logo are owned by {company.legalName} and
        protected by applicable intellectual-property laws. These Terms grant you a licence to use
        the software; they do not transfer any ownership. The data you enter into the software
        remains yours.
      </p>

      <h2>7. Changes to the Service and pricing</h2>
      <p>
        We may modify, suspend, or discontinue any part of the Service at any time. If we change the
        subscription price, the new price applies from your next renewal, never retroactively to a
        period you have already paid for; we will publish any change before it takes effect.
      </p>

      <h2>8. Termination</h2>
      <p>
        You may stop using the Service at any time by uninstalling the software and, if you use
        cloud sync, requesting deletion of your cloud account. We may suspend or terminate your
        access if you breach these Terms. Provisions that by their nature should survive termination
        — including intellectual property, warranty disclaimers, and limitation of liability — will
        survive.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of India, and the courts of {company.governingLawState}{' '}
        will have jurisdiction over any dispute arising from them.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these Terms? Reach us at <a href={mailto}>{company.supportEmail}</a>. You
        can also review our{' '}
        <a href="/privacy/">Privacy Policy</a> and{' '}
        <a href="/refund/">Refund &amp; Cancellation Policy</a>. Learn more about the product at{' '}
        <a href={site.url}>{site.url.replace('https://', '')}</a>.
      </p>
    </LegalLayout>
  );
}
