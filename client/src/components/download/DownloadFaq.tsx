import { Faq, type FaqItem } from '@/components/site/Faq';

const items: FaqItem[] = [
  {
    question: 'Is it free?',
    answer:
      'It is free to try, not free forever. The download and a 14-day trial cost nothing and need no card, with every feature unlocked. After that it is ₹11,999 a year plus GST for the single plan. Your books are a local encrypted file, so even if you never renew you keep full read and export access forever — only new entries stop.',
  },
  {
    question: 'Do I need an account to use it?',
    answer:
      'No. Working offline requires no account and no sign-up at all. You only provide an email if you choose to be notified about macOS or Linux, or if you later opt in to cloud sync and backup.',
  },
  {
    question: 'Is it safe to install? Why does Windows warn me?',
    answer:
      'Acronix Books is safe to install. Because it is early-access software that is not yet code-signed with a purchased certificate, Windows SmartScreen may show a "Windows protected your PC" prompt for a new publisher. You can proceed by choosing "More info" and then "Run anyway". Code signing is on the roadmap and will remove this prompt in a future release.',
  },
  {
    question: 'Where is my data stored?',
    answer:
      'On your own machine. Your company file is kept locally and encrypted at rest with SQLCipher (AES-256). Nothing is uploaded anywhere unless you explicitly take a backup or enable cloud sync.',
  },
  {
    question: 'How do I move to a new PC?',
    answer:
      'You have two options. Take an encrypted backup on your current PC and restore it on the new one, or turn on optional cloud sync, which keeps an isolated encrypted copy of your book and restores it cleanly onto a fresh device. Either way your full history comes with you.',
  },
  {
    question: 'When will macOS be available?',
    answer:
      'Windows 10 and 11 (64-bit) and Linux (AppImage and .deb) are available now. The macOS build (Apple Silicon and Intel) is in the pipeline — leave your email on the platform cards above to be notified the moment it launches.',
  },
  {
    question: 'How big is the download and what does it need?',
    answer:
      'The Windows installer is roughly 80 MB. Once installed, Acronix Books needs about 200 MB of disk for the app and your data, runs on 4 GB of RAM (8 GB recommended), and works on any 64-bit Windows 10 or 11 PC.',
  },
  {
    question: 'How do updates work after I install?',
    answer:
      'Acronix Books keeps itself current. It checks the release feed in the background, downloads new versions automatically, and applies them on the next restart — no reinstalling. You can also run a manual check any time using the checker on this page.',
  },
];

export function DownloadFaq() {
  return (
    <Faq
      items={items}
      eyebrow="FAQ"
      title="Before you download"
      description="Honest answers on cost, safety, your data, and platform support."
      className="mt-24"
    />
  );
}
