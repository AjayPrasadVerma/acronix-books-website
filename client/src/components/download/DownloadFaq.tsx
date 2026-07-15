import { Faq, type FaqItem } from '@/components/site/Faq';

const items: FaqItem[] = [
  {
    question: 'Is it really free?',
    answer:
      'Yes. Acronix Books is free to download and use during early access (version 0.1.0). There is no trial timer and no credit card — you download the installer and start keeping books straight away.',
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
    question: 'When will macOS and Linux be available?',
    answer:
      'Windows 10 and 11 (64-bit) are available now. macOS (Apple Silicon and Intel) and Linux (AppImage and .deb) builds are in the pipeline — leave your email on the platform cards above to be notified the moment they launch.',
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
