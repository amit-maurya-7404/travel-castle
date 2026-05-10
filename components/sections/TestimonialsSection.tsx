'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '@/constants/data'

export function TestimonialsSection() {
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -top-64 -right-64 animate-pulse-slow"></div>
        <div className="absolute w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[100px] -bottom-48 -left-48 animate-pulse-slow [animation-delay:3s]"></div>
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

        <div className="relative max-w-4xl mx-auto">
          {/* Frosted Glass Testimonial Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-green-500/30 rounded-[2.5rem] blur-xl opacity-50"></div>
            
            <Card className="relative p-8 md:p-12 border-0 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/10 transform rotate-180" />
              
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                {/* Avatar with Glow */}
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex-shrink-0 overflow-hidden border-4 border-white/10 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
                  <Image
                    src={testimonials[testimonialIndex].avatar}
                    alt={testimonials[testimonialIndex].author}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full"></div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                    <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/30">
                      Verified Traveler
                    </span>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed font-light italic text-gray-200">
                    "{testimonials[testimonialIndex].text}"
                  </p>
                  
                  <div>
                    <p className="text-xl font-bold text-white mb-1">
                      {testimonials[testimonialIndex].author}
                    </p>
                    <p className="text-sm font-medium text-primary tracking-wide uppercase">
                      Traveled to {testimonials[testimonialIndex].destination}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-10 gap-6">
            {/* Dots Indicator */}
            <div className="flex gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === testimonialIndex 
                      ? 'w-8 bg-gradient-to-r from-primary to-green-400 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevTestimonial}
                className="rounded-full w-12 h-12 border-white/10 bg-white/5 hover:bg-primary hover:border-primary text-white transition-all duration-300 shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextTestimonial}
                className="rounded-full w-12 h-12 border-white/10 bg-white/5 hover:bg-primary hover:border-primary text-white transition-all duration-300 shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
