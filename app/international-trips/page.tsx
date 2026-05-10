'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, MapPin, Users, Calendar, Clock, Star } from 'lucide-react'
import { PackageCard } from '@/components/ui/PackageCard'
export default function InternationalTrips() {
  const [tripType, setTripType] = useState('all')

  const filteredTrips = tripType === 'all' ? internationalTrips : internationalTrips.filter(trip => trip.type === tripType)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50 animate-fade-in glass shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 group hover-lift">
            <a href="/">
              <Image
                src="/logo.png"
                alt="Travel Castle"
                width={50}
                height={50}
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="/domestic-trips" className="text-foreground hover:text-primary transition relative group">
              Domestic Trips
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/international-trips" className="text-primary font-semibold transition relative group">
              International Trips
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            </a>
            <a href="/blogs" className="text-foreground hover:text-primary transition relative group">
              Blogs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/about-us" className="text-foreground hover:text-primary transition relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <Button className="bg-primary hover:bg-accent text-white shadow-glow-primary hover-lift">Contact Us</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center gap-2 mb-4 justify-center animate-fade-in">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Global Adventures</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-slide-in-down gradient-text">
              International Journeys
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in [animation-delay:0.2s] opacity-0">
              Explore the world beyond borders - from European castles to Asian temples, African safaris to American wonders
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 flex-wrap justify-center">
            {['all', 'asia', 'europe', 'africa', 'americas', 'oceania'].map((filter) => (
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
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
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
          <h2 className="text-4xl font-bold text-foreground mb-6 gradient-text">Ready for Global Adventures?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Embark on international journeys that will broaden your horizons and create unforgettable memories
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

const internationalTrips = [
  {
    id: 'bali-paradise',
    title: 'Bali Paradise Escape',
    locationTag: 'Bali, Indonesia',
    description: 'Tropical beaches, ancient temples, rice terraces, and vibrant culture in the Island of Gods.',
    image: '/images/package-family.jpg',
    duration: '7N/8D',
    months: 'Apr - Oct',
    originalPrice: '55,000',
    price: '48,000',
    discountTag: 'Upto 7000 OFF',
    rating: 4.8,
    reviews: '(18k+)',
    isBestSeller: true,
    type: 'asia'
  },
  {
    id: 'swiss-alps',
    title: 'Swiss Alps Adventure',
    locationTag: 'Switzerland, Europe',
    description: 'Snow-capped peaks, crystal lakes, charming villages, and world-class skiing in the heart of Europe.',
    image: '/images/hero-destination.jpg',
    duration: '6N/7D',
    months: 'Nov - Feb',
    originalPrice: '1,20,000',
    price: '95,000',
    discountTag: 'Upto 25000 OFF',
    rating: 4.9,
    reviews: '(5k+)',
    isBestSeller: true,
    type: 'europe'
  },
  {
    id: 'kenya-safari',
    title: 'Kenya Safari Experience',
    locationTag: 'Kenya, Africa',
    description: 'Witness the Big Five, Maasai culture, and the breathtaking landscapes of the African savanna.',
    image: '/images/package-adventure.jpg',
    duration: '8N/9D',
    months: 'Jul - Oct',
    originalPrice: '85,000',
    price: '72,000',
    discountTag: 'Upto 13000 OFF',
    rating: 4.7,
    reviews: '(3k+)',
    isBestSeller: false,
    type: 'africa'
  },
  {
    id: 'iceland-lights',
    title: 'Iceland Northern Lights',
    locationTag: 'Iceland, Europe',
    description: 'Geysers, waterfalls, glaciers, and the magical Northern Lights in this volcanic wonderland.',
    image: '/images/blog-3.jpg',
    duration: '5N/6D',
    months: 'Sep - Mar',
    originalPrice: '1,40,000',
    price: '1,15,000',
    discountTag: 'Upto 25000 OFF',
    rating: 4.9,
    reviews: '(7k+)',
    isBestSeller: true,
    type: 'europe'
  },
  {
    id: 'peru-inca',
    title: 'Peru Inca Trail',
    locationTag: 'Peru, South America',
    description: 'Ancient Incan ruins, Machu Picchu, Amazon rainforest, and Andean culture.',
    image: '/images/package-solo.jpg',
    duration: '9N/10D',
    months: 'May - Sep',
    originalPrice: '1,10,000',
    price: '95,000',
    discountTag: 'Upto 15000 OFF',
    rating: 4.8,
    reviews: '(4k+)',
    isBestSeller: false,
    type: 'americas'
  },
  {
    id: 'japan-cultural',
    title: 'Japan Cultural Journey',
    locationTag: 'Japan, Asia',
    description: 'Tokyo skyscrapers, Kyoto temples, Mount Fuji, and the perfect blend of tradition and modernity.',
    image: '/images/package-corporate.jpg',
    duration: '8N/9D',
    months: 'Mar - May',
    originalPrice: '90,000',
    price: '78,000',
    discountTag: 'Upto 12000 OFF',
    rating: 4.9,
    reviews: '(11k+)',
    isBestSeller: true,
    type: 'asia'
  },
  {
    id: 'newzealand-adventure',
    title: 'New Zealand Adventure',
    locationTag: 'New Zealand, Oceania',
    description: 'Breathtaking landscapes, bungee jumping, Maori culture, and Middle-earth filming locations.',
    image: '/images/blog-1.jpg',
    duration: '11N/12D',
    months: 'Dec - Feb',
    originalPrice: '1,60,000',
    price: '1,42,000',
    discountTag: 'Upto 18000 OFF',
    rating: 4.9,
    reviews: '(6k+)',
    isBestSeller: false,
    type: 'oceania'
  },
  {
    id: 'morocco-desert',
    title: 'Morocco Desert & Mountains',
    locationTag: 'Morocco, Africa',
    description: 'Sahara dunes, Atlas Mountains, medinas, and the rich tapestry of North African culture.',
    image: '/images/blog-2.jpg',
    duration: '7N/8D',
    months: 'Sep - Nov',
    originalPrice: '65,000',
    price: '54,000',
    discountTag: 'Upto 11000 OFF',
    rating: 4.7,
    reviews: '(5k+)',
    isBestSeller: false,
    type: 'africa'
  }
]