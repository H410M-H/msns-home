import { AnnouncementsSection } from '~/components/blocks/landing/Announcements'
import { CTASection } from '~/components/blocks/landing/CTASection'
import { FeaturesSection } from '~/components/blocks/landing/FeaturesSection'
import { HeroSection } from '~/components/blocks/landing/HeroSection'
import { QuickLinksSection } from '~/components/blocks/landing/QuickLinksSection'
import { TestimonialsSection } from '~/components/blocks/landing/Testimonials'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 font-sans">
      <HeroSection
      />
      <AnnouncementsSection />
      <QuickLinksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}

