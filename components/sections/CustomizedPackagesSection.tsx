'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  MessageSquare 
} from 'lucide-react'
import { packages } from '@/constants/data'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Custom category card that doesn't display itinerary metadata like duration, price, or location tags
interface CategoryCardProps {
  title: string
  description: string
  image: string
  isBestSeller?: boolean
}

function CategoryCard({ title, description, image, isBestSeller }: CategoryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 h-[380px] w-full cursor-pointer shadow-xl transition-all duration-500 hover:shadow-luxury hover:border-primary/40 hover:-translate-y-1">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Double gradient overlay for text readability and hover blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-1"></div>
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-1"></div>
      </div>

      {/* Popular Style Badge */}
      {isBestSeller && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-full shadow-md border border-white/10">
          Popular Choice
        </div>
      )}

      {/* Card Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end z-10 h-[60%]">
        <h3 className="text-2xl font-extrabold text-white mb-2 leading-tight group-hover:text-primary transition-colors drop-shadow-md">
          {title}
        </h3>

        <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-4 font-light opacity-90 group-hover:text-white transition-colors">
          {description}
        </p>

        {/* CTA Button Badge */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/20 self-start px-3 py-1.5 rounded-xl group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Customize Style</span>
        </div>
      </div>
    </div>
  )
}

// A local customization form component to manage state isolation for each dialog
function CustomizationForm({ tripTitle, tripId }: { tripTitle: string; tripId: string }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [travelers, setTravelers] = useState('')
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          tripType: tripId.replace('-trips', '').replace('-tours', ''),
          destination: tripTitle,
          message: `Custom itinerary request for ${tripTitle} package style.
Travel Dates: ${date || 'Not specified'}
Number of Travelers: ${travelers || 'Not specified'}
Special Notes: ${note || 'None'}`,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitted(true)
        setName('')
        setPhone('')
        setEmail('')
        setDate('')
        setTravelers('')
        setNote('')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Connection failed. Please check your internet connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10 space-y-5 animate-scale-in">
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 animate-bounce-subtle" />
        </div>
        <div className="space-y-2">
          <p className="font-extrabold text-white text-xl">Custom Request Sent!</p>
          <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
            Thank you for choosing Travel Castle. Our travel designer will call you back on your number shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form className="space-y-4 mt-6 text-left" onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300">Your Full Name <span className="text-destructive">*</span></label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kabir Malhotra" 
            className="bg-white/5 border-white/10 text-white focus-visible:ring-primary h-12 rounded-xl pl-11" 
          />
        </div>
      </div>

      {/* Phone and Email Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Phone Number <span className="text-destructive">*</span></label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              required 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210" 
              className="bg-white/5 border-white/10 text-white focus-visible:ring-primary h-12 rounded-xl pl-11" 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Email Address <span className="text-destructive">*</span></label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              required 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. kabir@example.com" 
              className="bg-white/5 border-white/10 text-white focus-visible:ring-primary h-12 rounded-xl pl-11" 
            />
          </div>
        </div>
      </div>

      {/* Travel Date and Travelers Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Travel Month / Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. Nov 2026" 
              className="bg-white/5 border-white/10 text-white focus-visible:ring-primary h-12 rounded-xl pl-11" 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">No. of Travelers</label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              placeholder="e.g. 2 Adults, 1 Kid" 
              className="bg-white/5 border-white/10 text-white focus-visible:ring-primary h-12 rounded-xl pl-11" 
            />
          </div>
        </div>
      </div>

      {/* Special Notes / Ideas */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300">Tell us your ideas / requirements</label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g., Prefers a private pool villa, needs vegetarian recommendations, looking for flight inclusions..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 text-white focus-visible:ring-primary rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300"
          />
        </div>
      </div>
      
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-xl font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-bold h-12 mt-2 text-base rounded-xl transition-all shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:scale-[1.01]"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registering Request...
          </>
        ) : (
          'Plan Custom Itinerary'
        )}
      </Button>
    </form>
  )
}

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
                          <CategoryCard 
                            title={pkg.title}
                            description={pkg.description}
                            image={pkg.image}
                            isBestSeller={pkg.isBestSeller}
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="bg-[#0a0a0a] border border-white/10 text-white sm:max-w-[480px]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">Customize {pkg.title}</DialogTitle>
                          <DialogDescription className="text-gray-400 text-xs mt-1">
                            Fill out this form and our travel experts will contact you shortly to plan your dream trip.
                          </DialogDescription>
                        </DialogHeader>
                        <CustomizationForm tripTitle={pkg.title} tripId={pkg.id} />
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
