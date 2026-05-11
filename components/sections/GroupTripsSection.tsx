'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { PackageCard } from '@/components/ui/PackageCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { groupTrips } from '@/constants/data'

export function GroupTripsSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <section id="trips" className="py-24 bg-gradient-to-b from-background via-black/5 to-background relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10 animate-slide-in-up flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold uppercase text-xs tracking-widest">Group Adventures</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Travel With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl font-light">
            Handpicked adventures — travel with a community that gets it. Join us for unforgettable group experiences.
          </p>
        </div>

        {/* Group Trips Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              watchDrag: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {groupTrips.map((trip, idx) => (
                <CarouselItem key={idx} className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <PackageCard {...trip} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8 md:hidden">
              <CarouselPrevious className="relative inset-0 translate-y-0" />
              <CarouselNext className="relative inset-0 translate-y-0" />
            </div>
            <CarouselPrevious className="hidden md:flex -left-12 bg-background/50 backdrop-blur-md border-border/50 text-foreground hover:bg-primary hover:text-white transition-all z-20" />
            <CarouselNext className="hidden md:flex -right-12 bg-background/50 backdrop-blur-md border-border/50 text-foreground hover:bg-primary hover:text-white transition-all z-20" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

