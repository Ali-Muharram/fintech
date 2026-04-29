import HeroSection from '@/components/features/landing-page/hero-section';
import Services from '@/components/features/landing-page/services';
import WhyUs from '@/components/features/landing-page/why-us';
import Reviews from '@/components/features/landing-page/reviews';

export default function Home() {
  return (
    <main className="space-y-15 bg-black">
      <HeroSection />
      <WhyUs />
      <Services />
      <Reviews />
    </main>
  );
}
