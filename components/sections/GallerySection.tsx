'use client'

import Image from 'next/image'
import { Sparkles, Camera } from 'lucide-react'



import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { useState, useEffect } from 'react'

const galleryImages = [
  '/images/hero-destination.jpg',
  '/images/package-adventure.jpg',
  '/images/package-honeymoon.jpg',
  '/images/blog-1.jpg',
  '/images/blog-2.jpg',
  '/images/blog-3.jpg',
  '/images/package-solo.jpg',
  '/images/hero-destination.jpg',
]

export function GallerySection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-slide-in-up flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold uppercase text-xs tracking-widest">Journey in Frames</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Glimpses of unforgettable moments captured by our amazing community.
          </p>
        </div>

        {/* Gallery Carousel */}
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
              {galleryImages.map((src, idx) => (
                <CarouselItem key={idx} className="pl-4 basis-[70%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <div className="relative rounded-2xl overflow-hidden group shadow-lg cursor-pointer aspect-[3/4]">
                      <Image
                        src={src}
                        alt={`Gallery image ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8 md:hidden">
              <CarouselPrevious className="relative inset-0 translate-y-0" />
              <CarouselNext className="relative inset-0 translate-y-0" />
            </div>
            <CarouselPrevious className="hidden md:flex -left-12 bg-background/50 backdrop-blur-md border-border/50 text-foreground hover:bg-primary hover:text-white transition-all" />
            <CarouselNext className="hidden md:flex -right-12 bg-background/50 backdrop-blur-md border-border/50 text-foreground hover:bg-primary hover:text-white transition-all" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
