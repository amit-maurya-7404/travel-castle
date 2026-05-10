// Removed local layout components
import { HeroSection } from '@/components/sections/HeroSection'
import { GroupTripsSection } from '@/components/sections/GroupTripsSection'
import { CustomizedPackagesSection } from '@/components/sections/CustomizedPackagesSection'
import { TravelBlogsSection } from '@/components/sections/TravelBlogsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <GroupTripsSection />
      <CustomizedPackagesSection />
      <TravelBlogsSection />
      <TestimonialsSection />
      <GallerySection />
      <CTASection />
    </div>
  )
}
