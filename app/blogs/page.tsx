'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapPin, Users, Sparkles, Calendar, Search, Tag } from 'lucide-react'

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
            <a href="/blogs" className="text-primary font-semibold transition relative group">
              Blogs
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
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
              <span className="text-primary font-semibold">Travel Stories</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-slide-in-down gradient-text">
              Travel Blogs & Stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in [animation-delay:0.2s] opacity-0">
              Stories, reflections and unfiltered notes from the road. Discover hidden gems and travel insights from our community
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'destinations', 'culture', 'adventure', 'food', 'tips'].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white border-primary shadow-glow-primary hover-lift'
                      : 'border-border hover:border-primary text-foreground hover:bg-primary/5'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      {filteredBlogs.length > 0 && (
        <section className="py-12 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 animate-slide-in-up">
              <h2 className="text-3xl font-bold text-foreground mb-2 gradient-text">Featured Story</h2>
              <p className="text-muted-foreground">Our latest travel tale</p>
            </div>
            <Card className="overflow-hidden bg-card border-border shadow-luxury glass animate-scale-in [animation-delay:0.3s] opacity-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={filteredBlogs[0].image}
                    alt={filteredBlogs[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-semibold uppercase">{filteredBlogs[0].category}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{filteredBlogs[0].date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{filteredBlogs[0].title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{filteredBlogs[0].description}</p>
                  <Button className="bg-primary hover:bg-accent text-white w-fit hover-lift">
                    Read Full Story
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blogs Grid */}
      <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-3xl -top-36 -left-36 animate-float"></div>
          <div className="absolute w-72 h-72 bg-accent/10 rounded-full blur-3xl -bottom-36 -right-36 animate-float [animation-delay:3s]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-primary/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg font-medium">
                No blogs found matching your criteria
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {filteredBlogs.slice(1).map((blog, idx) => (
                <Card
                  key={idx}
                  className="overflow-hidden border-border hover:shadow-luxury transition cursor-pointer card-3d group depth-card"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <MapPin className="w-10 h-10 text-white animate-bounce-subtle" />
                    </div>
                    <div className="absolute top-4 left-4 bg-primary/90 text-white px-2 py-1 rounded text-xs font-semibold">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">{blog.date}</span>
                      <span className="text-sm text-muted-foreground">{blog.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition duration-300">{blog.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {blog.description}
                    </p>
                    <a href="#" className="text-primary hover:text-accent font-semibold transition inline-flex items-center gap-1 group/link">
                      Read More <span className="group-hover/link:translate-x-1 transition">→</span>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -top-48 -right-48 animate-float"></div>
          <div className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl -bottom-48 -left-48 animate-float [animation-delay:2s]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-in-up relative z-10">
          <h2 className="text-4xl font-bold text-foreground mb-6 gradient-text">Stay Updated with Travel Stories</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest travel stories, tips, and exclusive offers delivered to your inbox
          </p>
          <div className="flex gap-4 justify-center flex-wrap max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button className="bg-primary hover:bg-accent text-white shadow-luxury hover-lift">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const blogs = [
  {
    title: 'Hidden Gems of Mountain Valleys',
    description: 'Discover hidden gems and local experiences that will change your perspective on travel. From secret waterfalls to authentic village stays.',
    image: '/images/blog-1.jpg',
    category: 'destinations',
    date: 'Dec 15, 2024',
    readTime: '5 min read'
  },
  {
    title: 'Exploring Ancient Temples & Culture',
    description: 'Journey through time and immerse yourself in centuries of history and tradition. A deep dive into cultural heritage.',
    image: '/images/blog-2.jpg',
    category: 'culture',
    date: 'Dec 10, 2024',
    readTime: '7 min read'
  },
  {
    title: 'Coastal Towns: A Vibrant Adventure',
    description: 'Experience the colorful charm of coastal living and embrace the Mediterranean lifestyle. Sun, sea, and unforgettable memories.',
    image: '/images/blog-3.jpg',
    category: 'destinations',
    date: 'Dec 5, 2024',
    readTime: '6 min read'
  },
  {
    title: 'Solo Travel: Finding Yourself on the Road',
    description: 'The transformative power of traveling alone. Stories of self-discovery, unexpected connections, and personal growth.',
    image: '/images/package-solo.jpg',
    category: 'adventure',
    date: 'Nov 28, 2024',
    readTime: '8 min read'
  },
  {
    title: 'Street Food Adventures Around the World',
    description: 'From Bangkok night markets to Mexican taquerias, exploring the world one delicious bite at a time.',
    image: '/images/package-family.jpg',
    category: 'food',
    date: 'Nov 20, 2024',
    readTime: '6 min read'
  },
  {
    title: 'Sustainable Travel: Making a Difference',
    description: 'How to travel responsibly and make a positive impact on the destinations you visit and the communities you encounter.',
    image: '/images/package-corporate.jpg',
    category: 'tips',
    date: 'Nov 15, 2024',
    readTime: '9 min read'
  },
  {
    title: 'Winter Wonderland: Seasonal Escapes',
    description: 'The magic of winter travel destinations. From skiing in the Alps to cozy cabin retreats in snowy landscapes.',
    image: '/images/hero-destination.jpg',
    category: 'destinations',
    date: 'Nov 10, 2024',
    readTime: '5 min read'
  },
  {
    title: 'Photography Tips for Travel Enthusiasts',
    description: 'Capture stunning travel memories with these professional photography tips and techniques for beginners and experts alike.',
    image: '/images/package-adventure.jpg',
    category: 'tips',
    date: 'Nov 5, 2024',
    readTime: '7 min read'
  }
]