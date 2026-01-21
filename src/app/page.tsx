import HeroSection from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CTASection from "@/components/sections/CTASection"; // Re-import

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <FeaturesSection />
      <CTASection />
    </>
  );
}
