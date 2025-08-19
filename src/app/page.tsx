import { HeroHome } from "~/components/blocks/landing/HeroSection";
import { QuickLinksSection } from "~/components/blocks/landing/QuickLinksSection";
import { FeaturesSection } from "~/components/blocks/landing/FeaturesSection";
import { CTASection } from "~/components/blocks/landing/CTASection";
import { TestimonialsSection } from "~/components/blocks/landing/Testimonials";
import PopupAd from "~/components/blocks/landing/popup-ad";
import { Toaster } from "~/components/ui/sonner";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-800/60 to-emerald-50 font-sans">
      <HeroHome />
      <PopupAd />
      <Toaster richColors closeButton />
      {/* <AnnouncementsSection /> */}
      <QuickLinksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}

