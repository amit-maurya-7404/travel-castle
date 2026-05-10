'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { groupTrips } from '@/constants/data'
import { PackageCard } from '@/components/ui/PackageCard'

export function GroupTripsSection() {
  const [tripFilter, setTripFilter] = useState('all')

  return (
    <section id="trips" className="py-24 bg-gradient-to-b from-background via-black/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -top-36 -left-36 animate-pulse-slow"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] -bottom-36 -right-36 animate-pulse-slow [animation-delay:2s]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-14 animate-slide-in-up flex flex-col items-center text-center">
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

        {/* Premium Filters */}
        <div className="flex gap-3 justify-center mb-16 flex-wrap">
          {['all', 'domestic', 'international'].map((filter) => (
            <button
              key={filter}
              onClick={() => setTripFilter(filter)}
              className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 overflow-hidden ${
                tripFilter === filter 
                  ? 'text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] scale-105' 
                  : 'text-muted-foreground bg-white/5 border border-white/10 hover:bg-white/10 hover:text-foreground'
              }`}
            >
              {tripFilter === filter && (
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-green-500 opacity-90 -z-10"></span>
              )}
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Group Trips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groupTrips.map((trip, idx) => (
            <PackageCard key={idx} {...trip} />
          ))}
        </div>
      </div>
    </section>
  )
}

