import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { GroupTripsSection } from '@/components/sections/GroupTripsSection'
import { CustomizedPackagesSection } from '@/components/sections/CustomizedPackagesSection'
import { TravelBlogsSection } from '@/components/sections/TravelBlogsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <GroupTripsSection />
      <CustomizedPackagesSection />
      <TravelBlogsSection />
      <TestimonialsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  )
}
