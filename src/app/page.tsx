import { HeroHome } from "~/components/blocks/landing/HeroSection";
import { QuickLinksSection } from "~/components/blocks/landing/QuickLinksSection";
import { FeaturesSection } from "~/components/blocks/landing/FeaturesSection";
import { CTASection } from "~/components/blocks/landing/CTASection";
import { TestimonialsSection } from "~/components/blocks/landing/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 font-sans">
      <HeroHome />
      {/* <AnnouncementsSection /> */}
      <QuickLinksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}

