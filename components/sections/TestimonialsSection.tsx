'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Sparkles, Quote } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { testimonials } from '@/constants/data'

export function TestimonialsSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -top-64 -right-64 animate-float opacity-50"></div>
        <div className="absolute w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[100px] -bottom-48 -left-48 animate-float-delayed opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 animate-slide-in-up flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold uppercase text-xs tracking-widest">Guest Experiences</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Travelers Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl font-light">
            Real stories from real adventurers who explored the world with us.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              watchDrag: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, idx) => (
                <CarouselItem key={idx} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="p-2 h-full">
                    <Card className="relative p-6 md:p-8 border-0 bg-white/10 backdrop-blur-2xl rounded-2xl  overflow-hidden group h-full flex flex-col border border-white/5">
                      {/* Gradient Glow */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                      <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 transform rotate-180" />

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-6">
                          {/* Avatar */}
                          <div className="relative w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden border border-white/10 ">
                            {testimonial.avatar ? (
                              <Image
                                src={testimonial.avatar}
                                alt={testimonial.author}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                                {testimonial.author.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-lg font-bold text-black mb-0">
                              {testimonial.author}
                            </p>
                            <div className="flex gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Sparkles key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                          </div>
                        </div>

                        <p className="text-base md:text-[1.2vw] text-black mb-8 leading-relaxed font-normal  flex-grow">
                          "{testimonial.text}"
                        </p>

                        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                          <p className="text-xs font-semibold text-primary tracking-widest uppercase">
                            {testimonial.destination}
                          </p>
                          <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                            <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                            <span className="text-primary text-[10px] font-bold uppercase tracking-tighter">
                              Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Professional Navigation */}
            <div className="hidden md:block">
              <CarouselPrevious className="-left-16 size-12 bg-background/50 backdrop-blur-xl border-border/50 text-foreground hover:bg-primary hover:text-white transition-all duration-300" />
              <CarouselNext className="-right-16 size-12 bg-background/50 backdrop-blur-xl border-border/50 text-foreground hover:bg-primary hover:text-white transition-all duration-300" />
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center gap-4 mt-8 md:hidden">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-white/5" />
              <CarouselNext className="relative inset-0 translate-y-0 bg-white/5" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
