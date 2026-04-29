import HeroSection from '@/components/features/landing-page/hero-section';
import Services from '@/components/features/landing-page/services';
import WhyUs from '@/components/features/landing-page/why-us';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Services />
      <WhyUs />
    </main>
  );
}
