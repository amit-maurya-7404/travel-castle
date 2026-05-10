'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, MapPin, Users, Calendar, Clock, Star } from 'lucide-react'
import { PackageCard } from '@/components/ui/PackageCard'
export default function DomesticTrips() {
  const [tripType, setTripType] = useState('all')

  const filteredTrips = tripType === 'all' ? domesticTrips : domesticTrips.filter(trip => trip.type === tripType)

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center gap-2 mb-4 justify-center animate-fade-in">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Explore India</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-slide-in-down gradient-text">
              Domestic Adventures
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in [animation-delay:0.2s] opacity-0">
              Discover the incredible diversity of India - from Himalayan peaks to tropical beaches, ancient temples to modern cities
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 flex-wrap justify-center">
            {['all', 'north', 'south', 'east', 'west'].map((filter) => (
              <Button
                key={filter}
                variant={tripType === filter ? 'default' : 'outline'}
                onClick={() => setTripType(filter)}
                className={`transition-all duration-300 ${
                  tripType === filter
                    ? 'bg-primary text-white border-primary shadow-glow-primary hover-lift'
                    : 'border-border hover:border-primary text-foreground hover:bg-primary/5'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)} India
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-3xl -top-36 -left-36 animate-float"></div>
          <div className="absolute w-72 h-72 bg-accent/10 rounded-full blur-3xl -bottom-36 -right-36 animate-float [animation-delay:3s]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {filteredTrips.map((trip, idx) => (
              <PackageCard key={idx} {...trip} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -top-48 -right-48 animate-float"></div>
          <div className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl -bottom-48 -left-48 animate-float [animation-delay:2s]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-in-up relative z-10">
          <h2 className="text-4xl font-bold text-foreground mb-6 gradient-text">Ready to Explore India?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our curated domestic adventures and discover the incredible diversity of our beautiful country
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-primary hover:bg-accent text-white px-8 shadow-luxury hover-lift">
              Book Your Trip
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 shadow-luxury hover-lift">
              Get Custom Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const domesticTrips = [
  {
    id: 'kashmir-valley',
    title: 'Kashmir Valley Escape',
    locationTag: 'Kashmir, North India',
    description: 'Experience the paradise on earth with houseboat stays, shikara rides, and breathtaking landscapes of the Himalayas.',
    image: '/images/hero-destination.jpg',
    duration: '6N/7D',
    months: 'Nov - Mar',
    originalPrice: '35,000',
    price: '28,000',
    discountTag: 'Upto 7000 OFF',
    rating: 4.9,
    reviews: '(12k+)',
    isBestSeller: true,
    type: 'north'
  },
  {
    id: 'rajasthan-royal',
    title: 'Rajasthan Royal Heritage',
    locationTag: 'Rajasthan, West India',
    description: 'Journey through royal palaces, desert safaris, and vibrant culture of the land of kings.',
    image: '/images/package-adventure.jpg',
    duration: '7N/8D',
    months: 'Oct - Feb',
    originalPrice: '42,000',
    price: '36,500',
    discountTag: 'Upto 5500 OFF',
    rating: 4.8,
    reviews: '(8k+)',
    isBestSeller: false,
    type: 'west'
  },
  {
    id: 'kerala-backwaters',
    title: 'Kerala Backwaters',
    locationTag: 'Kerala, South India',
    description: 'Cruise through serene backwaters, stay in houseboats, and experience the tropical paradise of Gods Own Country.',
    image: '/images/package-honeymoon.jpg',
    duration: '5N/6D',
    months: 'Sep - Apr',
    originalPrice: '28,000',
    price: '23,000',
    discountTag: 'Upto 5000 OFF',
    rating: 4.7,
    reviews: '(5k+)',
    isBestSeller: true,
    type: 'south'
  },
  {
    id: 'goa-beach',
    title: 'Goa Beach Paradise',
    locationTag: 'Goa, West India',
    description: 'Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of this coastal haven.',
    image: '/images/package-bachelor.jpg',
    duration: '4N/5D',
    months: 'Oct - Mar',
    originalPrice: '22,000',
    price: '18,500',
    discountTag: 'Upto 3500 OFF',
    rating: 4.6,
    reviews: '(15k+)',
    isBestSeller: false,
    type: 'west'
  },
  {
    id: 'darjeeling-sikkim',
    title: 'Darjeeling & Sikkim',
    locationTag: 'Darjeeling, East India',
    description: 'Tea gardens, monasteries, and stunning mountain views in this Himalayan wonderland.',
    image: '/images/blog-1.jpg',
    duration: '6N/7D',
    months: 'Mar - Jun',
    originalPrice: '38,000',
    price: '32,000',
    discountTag: 'Upto 6000 OFF',
    rating: 4.8,
    reviews: '(6k+)',
    isBestSeller: true,
    type: 'east'
  },
  {
    id: 'andaman-islands',
    title: 'Andaman Islands',
    locationTag: 'Andaman, East India',
    description: 'Crystal clear waters, coral reefs, and untouched islands perfect for adventure and relaxation.',
    image: '/images/blog-2.jpg',
    duration: '5N/6D',
    months: 'Oct - May',
    originalPrice: '45,000',
    price: '39,000',
    discountTag: 'Upto 6000 OFF',
    rating: 4.9,
    reviews: '(9k+)',
    isBestSeller: false,
    type: 'east'
  }
]