import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { company, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Acronix Books handles your data: the website sets no tracking cookies and runs no analytics, your books stay encrypted on your own machine, and optional cloud sync is isolated per account.',
  alternates: { canonical: '/privacy/' },
};

const mailto = `mailto:${company.supportEmail}`;

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="We built Acronix Books to keep your financial data on your machine, under your control. This policy explains — in plain language — exactly what we do and do not collect."
      lastUpdated={company.policyEffectiveDate}
    >
      <p>
        This is a plain-language summary of how {company.legalName} handles your information. It is
        written to be read, not to hide behind jargon — but it is a summary, not legal advice, and
        we may update it from time to time. When we do, we will change the “Last updated” date
        above.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>
          The <strong>website</strong> ({site.url.replace('https://', '')}) is a static site. It
          sets no tracking cookies and runs no analytics. The only information it receives is what
          you choose to send us by email.
        </li>
        <li>
          The <strong>desktop app</strong> is offline-first. Your company data is stored locally on
          your own computer and encrypted at rest with SQLCipher (AES-256). We cannot see it.
        </li>
        <li>
          <strong>Cloud sync is optional.</strong> The app works fully without it. If you turn it
          on, your books sync to our servers over TLS for backup and multi-device restore, isolated
          per account.
        </li>
      </ul>

      <h2>1. The website</h2>
      <p>
        Our marketing and documentation website is a statically generated site. Visiting it does
        not create an account, and we do not run third-party analytics, advertising trackers, or
        set cookies to follow you across the web. We do not build a profile of your browsing.
      </p>
      <p>
        Standard web-server request logs (such as the IP address and user agent your browser sends
        with every request) may be processed transiently by our hosting provider to serve pages and
        protect against abuse. We do not use these logs to identify individual visitors.
      </p>
      <p>
        If you email us or fill in a “notify me” form, we receive the details you provide — that is
        covered under <em>Support</em> below.
      </p>

      <h2>2. The desktop app — your data stays with you</h2>
      <p>
        Acronix Books is an offline-first desktop application. Your entire company book — vouchers,
        ledgers, inventory, GST data, reports — lives in a single database file on your own machine.
        That file is <strong>encrypted at rest with SQLCipher (AES-256)</strong>.
      </p>
      <p>
        The encryption key is never stored in the clear. It is protected by an envelope key vault:
        a scrypt-derived key-encryption key wraps per-user key slots, with a one-time recovery code
        as a fallback. Because the app runs locally and the data is encrypted with a key only you
        hold, <strong>we have no ability to read your books</strong>. Nothing about your accounting
        data is transmitted to us unless you explicitly enable cloud sync.
      </p>

      <h2>3. Optional cloud sync</h2>
      <p>
        Cloud sync is entirely opt-in. You can install and use Acronix Books indefinitely without
        ever creating a cloud account. If you choose to enable it:
      </p>
      <ul>
        <li>
          Your book syncs to our servers (<code>sync.acronixbooks.com</code>) over an encrypted TLS
          connection, to provide off-site backup and multi-device restore.
        </li>
        <li>
          Each account’s data is <strong>isolated per account</strong>. Access is scoped to your
          authenticated account — there is no shared tenancy of your data.
        </li>
        <li>
          We use your <strong>email address</strong> to create and secure your account, and to send
          a one-time code (email OTP) when a new device enrolls, before that device can pull your
          full book.
        </li>
        <li>You can stop syncing at any time and continue using the app entirely offline.</li>
      </ul>

      <h2>4. What we collect for support</h2>
      <p>
        When you contact us for help, we collect only what you send us and what we need to
        reproduce and fix the problem, which may include:
      </p>
      <ul>
        <li>Your email address and the contents of your message.</li>
        <li>The app version and your operating system.</li>
        <li>Any logs, screenshots, or files you choose to attach.</li>
      </ul>
      <p>
        We use this information solely to respond to your request and improve the product. We do not
        sell it, and we do not share it with third parties for marketing.
      </p>

      <h2>5. Data retention and your rights</h2>
      <p>
        Support correspondence is retained only as long as needed to resolve your issue and keep a
        reasonable record of support history. Cloud-sync data is retained while your account is
        active.
      </p>
      <p>You may, at any time:</p>
      <ul>
        <li>Ask what personal information we hold about you.</li>
        <li>Ask us to correct it.</li>
        <li>
          Ask us to delete your support records and, if you use cloud sync, your cloud account and
          its synced data.
        </li>
      </ul>
      <p>
        To make any of these requests, email us at{' '}
        <a href={mailto}>{company.supportEmail}</a>. We aim to respond {company.responseTime}.
        Deleting your cloud account removes the server-side copy of your book; the local copy on
        your own machine is unaffected and remains under your control.
      </p>

      <h2>6. Children and jurisdiction</h2>
      <p>
        Acronix Books is business software intended for use by businesses and professionals. It is
        not directed at children, and we do not knowingly collect information from children.
      </p>
      <p>
        {company.legalName} operates from {company.jurisdiction}, and this policy is governed by the
        laws applicable in {company.governingLawState}.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about this policy or about your data? Write to us at{' '}
        <a href={mailto}>{company.supportEmail}</a> and we will get back to you{' '}
        {company.responseTime}.
      </p>
    </LegalLayout>
  );
}
