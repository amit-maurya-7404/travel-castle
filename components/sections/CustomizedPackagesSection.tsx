'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { packages } from '@/constants/data'
import { PackageCard } from '@/components/ui/PackageCard'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CustomizedPackagesSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <section id="packages" className="py-20 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-80 h-80 bg-primary/10 rounded-full blur-3xl top-1/2 -right-40 animate-float"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-14 animate-slide-in-up flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold uppercase text-xs tracking-widest">Tailored Experiences</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Customized <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Packages</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl font-light">
            You imagine it. We build it. Every detail shaped around you.
          </p>
        </div>

        {/* Packages Carousel */}
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
              {packages.map((pkg, idx) => (
                <CarouselItem key={idx} className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="cursor-pointer">
                          <PackageCard {...pkg} onClick={() => { }} />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="bg-[#0a0a0a] border border-white/10 text-white sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">Customize {pkg.title}</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Fill out this form and our travel experts will contact you shortly to plan your dream trip.
                          </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); alert('Request sent successfully!'); }}>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Your Name</label>
                            <Input required placeholder="John Doe" className="bg-white/5 border-white/10 text-white focus-visible:ring-primary h-12" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Phone Number</label>
                            <Input required type="tel" placeholder="+91 XXXXX XXXXX" className="bg-white/5 border-white/10 text-white focus-visible:ring-primary h-12" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <Input required type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 text-white focus-visible:ring-primary h-12" />
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-bold h-12 mt-4 text-lg shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                            Submit Request
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
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

        <div className="text-center mt-12 animate-fade-in [animation-delay:0.6s] opacity-0">
          <Link href="/contact-us">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 hover-lift">
              Plan Your Custom Trip
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
