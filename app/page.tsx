import { Suspense } from 'react'
// Removed local layout components
import { HeroSection } from '@/components/sections/HeroSection'
import { GroupTripsSection } from '@/components/sections/GroupTripsSection'
import { CustomizedPackagesSection } from '@/components/sections/CustomizedPackagesSection'
import { TravelBlogsSection } from '@/components/sections/TravelBlogsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="min-h-[80vh] bg-slate-950 animate-pulse" />}>
        <HeroSection />
      </Suspense>
      <GroupTripsSection />
      <CustomizedPackagesSection />
      <TravelBlogsSection />
      <TestimonialsSection />
      <GallerySection />
      <CTASection />
      {/* <Footer /> */}
    </div>
  )
}
