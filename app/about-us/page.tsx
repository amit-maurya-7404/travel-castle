'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, Users, Sparkles, Heart, Award, Globe, Star } from 'lucide-react'

export default function AboutUs() {
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
            <a href="/international-trips" className="text-foreground hover:text-primary transition relative group">
              International Trips
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/blogs" className="text-foreground hover:text-primary transition relative group">
              Blogs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/about-us" className="text-primary font-semibold transition relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
            </a>
            <Button className="bg-primary hover:bg-accent text-white shadow-glow-primary hover-lift">Contact Us</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start animate-fade-in">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Our Story</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-slide-in-down gradient-text">
                Crafting Unforgettable Journeys
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-in [animation-delay:0.2s] opacity-0">
                Born from a passion for exploration and a belief that travel should be transformative, we've been creating life-changing experiences for over a decade.
              </p>
              <div className="animate-scale-in [animation-delay:0.4s] opacity-0 flex gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary hover:bg-accent text-white px-8 hover-lift shadow-luxury">
                  Join Our Community
                </Button>
              </div>
            </div>

            <div className="relative h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden shadow-luxury-lg animate-float card-3d group">
              <Image
                src="/images/hero-destination.jpg"
                alt="Travel Castle team"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl top-1/4 -left-48 animate-float"></div>
          <div className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl bottom-1/4 -right-48 animate-float [animation-delay:2s]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-in-up">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold uppercase text-sm tracking-widest">Our Foundation</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4 gradient-text">Mission & Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What drives us and what we stand for
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-slide-in-left">
              <h3 className="text-3xl font-bold text-foreground mb-6">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To create transformative travel experiences that connect people with diverse cultures, breathtaking landscapes, and meaningful connections. We believe that travel should not just be about seeing new places, but about growing as individuals and building a more connected world.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every journey we craft is designed to leave a lasting impact — on our travelers, the communities we visit, and the planet we all share.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-luxury animate-slide-in-right">
              <Image
                src="/images/package-honeymoon.jpg"
                alt="Our mission"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <Card
                key={idx}
                className="p-8 text-center bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-luxury depth-card hover:shadow-luxury-lg transition-all duration-300 card-3d group cursor-pointer stagger-children"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/30 transition-colors duration-300 group-hover:scale-110">
                  <div className="text-3xl">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-80 h-80 bg-primary/10 rounded-full blur-3xl -bottom-40 -left-40 animate-float [animation-delay:2s]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-in-up">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold uppercase text-sm tracking-widest">Meet the Team</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4 gradient-text">The People Behind Your Journeys</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate travelers, experienced guides, and adventure enthusiasts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {team.map((member, idx) => (
              <Card
                key={idx}
                className="overflow-hidden bg-card border-border hover:shadow-luxury transition h-full flex flex-col card-3d group depth-card"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition duration-300">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground flex-grow leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </Card>
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
          <h2 className="text-4xl font-bold text-foreground mb-6 gradient-text">Ready to Start Your Adventure?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered their passion for exploration with us
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-primary hover:bg-accent text-white px-8 shadow-luxury hover-lift">
              Plan Your Trip
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 shadow-luxury hover-lift">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const stats = [
  { number: '10+', label: 'Years Experience' },
  { number: '50K+', label: 'Happy Travelers' },
  { number: '100+', label: 'Destinations' },
  { number: '4.9/5', label: 'Average Rating' }
]

const values = [
  {
    icon: '🌍',
    title: 'Sustainable Travel',
    description: 'We prioritize eco-friendly practices and support local communities in all our destinations.'
  },
  {
    icon: '🤝',
    title: 'Authentic Experiences',
    description: 'We believe in genuine connections and meaningful cultural exchanges over tourist traps.'
  },
  {
    icon: '💝',
    title: 'Community First',
    description: 'Building lasting friendships and creating a supportive travel community is at our core.'
  },
  {
    icon: '⭐',
    title: 'Excellence',
    description: 'From planning to execution, we maintain the highest standards in everything we do.'
  },
  {
    icon: '🎯',
    title: 'Personalization',
    description: 'Every trip is tailored to individual preferences and travel styles.'
  },
  {
    icon: '🔒',
    title: 'Safety & Trust',
    description: 'Your safety and security are our top priorities in every aspect of travel.'
  }
]

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    bio: 'With 15+ years in travel, Sarah founded Travel Castle to share her passion for authentic adventures.',
    image: '/images/avatar-1.jpg'
  },
  {
    name: 'Mike Chen',
    role: 'Head of Operations',
    bio: 'Former expedition leader who ensures every detail of your journey is perfectly executed.',
    image: '/images/avatar-2.jpg'
  },
  {
    name: 'Priya Sharma',
    role: 'Cultural Liaison',
    bio: 'Expert in local cultures and traditions, ensuring respectful and enriching experiences.',
    image: '/images/avatar-3.jpg'
  },
  {
    name: 'David Rodriguez',
    role: 'Adventure Specialist',
    bio: 'Certified guide and adventure enthusiast who designs thrilling yet safe experiences.',
    image: '/images/avatar-1.jpg'
  },
  {
    name: 'Emma Thompson',
    role: 'Customer Experience',
    bio: 'Dedicated to making your travel dreams come true with personalized service.',
    image: '/images/avatar-2.jpg'
  },
  {
    name: 'Raj Patel',
    role: 'Destination Expert',
    bio: 'Knows every hidden gem and local secret across our featured destinations.',
    image: '/images/avatar-3.jpg'
  }
]