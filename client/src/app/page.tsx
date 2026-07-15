import type { Metadata } from 'next';
import { Hero } from '@/components/landing/Hero';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { Pillars } from '@/components/landing/Pillars';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { ProductVisuals } from '@/components/landing/ProductVisuals';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { WhyDesktop } from '@/components/landing/WhyDesktop';
import { KeyboardHighlight } from '@/components/landing/KeyboardHighlight';
import { IndianBusiness } from '@/components/landing/IndianBusiness';
import { WhoItsFor } from '@/components/landing/WhoItsFor';
import { SecurityBand } from '@/components/landing/SecurityBand';
import { LandingFaq } from '@/components/landing/LandingFaq';
import { FinalCta } from '@/components/landing/FinalCta';

export const metadata: Metadata = {
  description:
    'Acronix Books is a fast, offline-first ERP & accounting desktop app for Indian businesses of every size — GST-ready invoicing, inventory, vouchers, one-click GSTR-1/3B, and AES-256 encrypted books. Free to download for Windows.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Pillars />
      <FeatureGrid />
      <ProductVisuals />
      <HowItWorks />
      <WhyDesktop />
      <KeyboardHighlight />
      <IndianBusiness />
      <WhoItsFor />
      <SecurityBand />
      <LandingFaq />
      <FinalCta />
    </>
  );
}
