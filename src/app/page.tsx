import HeroSection from '@/components/features/landing-page/hero-section';
import Services from '@/components/features/landing-page/services';
import WhyUs from '@/components/features/landing-page/why-us';
import Reviews from '@/components/features/landing-page/reviews';
import PricingSection from '@/components/features/landing-page/pricing';
import FaqSection from '@/components/features/landing-page/faq';
import Header from '@/components/features/header';
import Footer from '@/components/features/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="space-y-30 bg-black">
        <HeroSection />
        <WhyUs />
        <Services />
        <Reviews />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
