'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { BookOpen, ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { blogs } from '@/constants/data'

export function TravelBlogsSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <section id="blogs" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -bottom-40 -left-40 animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-14 animate-slide-in-up flex flex-col items-center text-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-primary font-bold uppercase text-xs tracking-widest">Stories & Insights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Journals</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-md font-light">
            Stories, reflections and unfiltered notes from the road. Get inspired for your next adventure.
          </p>
        </div>

        {/* Blogs Carousel */}
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
              {blogs.map((blog, idx) => (
                <CarouselItem key={idx} className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Link href={`#`} className="block group h-full">
                      <Card
                        className="border-0 bg-transparent shadow-none hover:bg-white/5 transition-all duration-500 rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full"
                      >
                        <div className="relative h-64 md:h-72 overflow-hidden rounded-3xl m-2">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                          />
                          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                            Featured
                          </div>
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                        </div>

                        <div className="p-4 pt-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-widest mb-3">
                            <span>Travel</span>
                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                            <span>5 Min Read</span>
                          </div>

                          <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition duration-300">
                            {blog.title}
                          </h3>

                          <p className="text-muted-foreground mb-6 leading-relaxed font-light line-clamp-2">
                            {blog.description}
                          </p>

                          <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                            <span className="text-primary font-bold text-sm tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                              Read Article
                            </span>
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors duration-300">
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
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
