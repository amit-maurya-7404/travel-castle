'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Clock4,
  ShieldCheck,
  Compass,
  Calendar,
  DollarSign,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  HelpCircle,
  Award,
  Globe2
} from 'lucide-react'

// Custom FAQs for the travel website
const faqs = [
  {
    question: 'How far in advance should I start planning my trip?',
    answer: 'For domestic trips, we recommend planning 4–6 weeks in advance. For international destinations, starting 3–6 months ahead ensures the best rates on flights, premium accommodation availability, and sufficient time for visa processing.'
  },
  {
    question: 'Can you customize itineraries for any budget?',
    answer: 'Absolutely! Our specialists craft bespoke experiences. By selecting your preferred budget range, we prioritize activities and stays that match your standard without compromising on safety or travel comfort.'
  },
  {
    question: 'How do you handle flights and visa coordination?',
    answer: 'We provide end-to-end support. Our team coordinates flight tickets, provides detailed visa documentation requirements, schedules appointments, and assists with dummy bookings to ensure a smooth application process.'
  },
  {
    question: 'What is your refund and cancellation policy?',
    answer: 'Our policies are transparent and flexible. The exact terms depend on airline and hotel guidelines, which we outline before booking. We charge a minimal booking token (₹5,000) that remains flexible or transferrable for qualifying circumstances.'
  },
  {
    question: 'Do we get support during our tour if anything goes wrong?',
    answer: 'Yes! All Travel Castle clients receive 24/7 dedicated support. You will be assigned a personal travel expert and a local on-ground representative whom you can contact via phone or WhatsApp at any time during your journey.'
  }
]

// Available categories for trip styles
const tripStyles = [
  { id: 'honeymoon', label: 'Honeymoon', emoji: '👩‍❤️‍👨' },
  { id: 'family', label: 'Family Tour', emoji: '👨‍👩‍👧‍👦' },
  { id: 'adventure', label: 'Adventure / Trek', emoji: '🏔️' },
  { id: 'bachelor', label: 'Bachelor Party', emoji: '🎉' },
  { id: 'solo', label: 'Solo Travel', emoji: '🎒' },
  { id: 'corporate', label: 'Corporate MICE', emoji: '💼' },
  { id: 'general', label: 'General Inquiry', emoji: '✨' }
]

// Budget categories
const budgetRanges = [
  'Under ₹50,000',
  '₹50,000 - ₹1.5 Lakhs',
  '₹1.5 Lakhs - ₹3 Lakhs',
  '₹3 Lakhs - ₹5 Lakhs',
  '₹5 Lakhs+'
]

export default function ContactUsPage() {
  // Form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [tripType, setTripType] = useState('general')
  const [destination, setDestination] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  
  // Submission UI states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setPreviewUrl(null)

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
          tripType,
          destination,
          budget,
          message,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitted(true)
        if (data.previewUrl) {
          setPreviewUrl(data.previewUrl)
        }
        // Reset form inputs except selected trip type
        setName('')
        setEmail('')
        setPhone('')
        setDestination('')
        setBudget('')
        setMessage('')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Failed to submit form:', err)
      setError('Connection failed. Please check your internet connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Toggle helper for FAQ
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 py-16 text-white md:py-24">
        {/* Glowing background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,102,204,0.22),transparent_55%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-[80px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            
            {/* Hero Left Content */}
            <div className="space-y-6 animate-slide-in-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                <Sparkles className="h-4 w-4 text-blue-400 animate-pulse-soft" />
                Plan with Travel Experts
              </span>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-white">
                Let&apos;s Design Your <span className="gradient-text bg-gradient-to-r from-blue-400 to-indigo-300">Dream Getaway</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-300">
                Connect with Travel Castle&apos;s specialists. Whether it&apos;s a romantic honeymoon, family break, or a corporate retreat, we craft seamless experiences tailored exactly for you.
              </p>
              
              {/* Quick Trust Highlights */}
              <div className="grid gap-4 sm:grid-cols-3 pt-4">
                {[
                  { value: '2 Hours', label: 'Avg Response Time', desc: 'Fast turnaround' },
                  { value: '24/7', label: 'Travel Support', desc: 'Peace of mind guaranteed' },
                  { value: '100% Custom', label: 'Bespoke Itineraries', desc: 'Designed for you' }
                ].map((stat, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md p-4 transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.05]">
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs font-semibold text-primary mt-1">{stat.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Right Banner Details */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 md:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden animate-slide-in-right">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full filter blur-xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Travel Castle Premium Assurance</h3>
                    <p className="text-xs text-slate-400">Award-winning service standards</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-slate-300 border-l-2 border-primary/50 pl-4">
                  We integrate top-tier local accommodations, handpicked guides, and reliable transportation networks to secure travel that is safe, comfortable, and memorable.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    'No hidden service fees or charge surprises',
                    'Flexible changes & easy date reschedule options',
                    'Dedicated trip coordinator on WhatsApp throughout the tour'
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <ShieldCheck className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FORM & INFO SECTION */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,102,204,0.03),transparent_40%)] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            
            {/* LEFT: Plan Request Form */}
            <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-luxury hover-lift smooth-transition relative">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Interactive Form
                </span>
                <h2 className="text-3xl font-extrabold text-foreground mt-3">Plan Your Bespoke Tour</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  Let us know your travel preferences, and we will formulate an exclusive itinerary details report for you.
                </p>
              </div>

              {submitted ? (
                // SUCCESS STATE CARD
                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 p-8 text-center space-y-6 animate-scale-in">
                  <div className="mx-auto h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center border border-emerald-200">
                    <CheckCircle2 className="h-10 w-10 animate-bounce-subtle" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">Inquiry Received!</h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      Thank you for contacting Travel Castle. We have saved your preferences. A travel consultant will review this and reach out shortly.
                    </p>
                  </div>
                  
                  <div className="rounded-2xl bg-background border border-border p-5 text-left text-sm max-w-md mx-auto space-y-2">
                    <p className="font-semibold text-foreground flex items-center gap-1.5 border-b border-border pb-2 mb-2">
                      <Compass className="h-4 w-4 text-primary" /> Request Summary
                    </p>
                    <p className="text-muted-foreground">Style: <span className="font-medium text-foreground capitalize">{tripType}</span></p>
                    {destination && <p className="text-muted-foreground">Destination: <span className="font-medium text-foreground">{destination}</span></p>}
                    {budget && <p className="text-muted-foreground">Budget: <span className="font-medium text-foreground">{budget}</span></p>}
                    <p className="text-muted-foreground">Typical reply time: <span className="text-primary font-medium">within 2 hours</span></p>
                  </div>

                  {previewUrl && (
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/30 text-left max-w-md mx-auto text-sm space-y-2">
                      <p className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1">
                        <Mail className="h-4 w-4" /> Local Development Note:
                      </p>
                      <p className="text-blue-600 dark:text-blue-300 text-xs">
                        Nodemailer runs in sandbox test mode. Click the preview button below to inspect the actual generated client confirmation and owner notification emails:
                      </p>
                      <a 
                        href={previewUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-2 font-semibold text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800"
                      >
                        Open Email Preview →
                      </a>
                    </div>
                  )}

                  <div className="pt-2">
                    <Button 
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="rounded-xl border-border px-6 hover:bg-muted"
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                // FORM CODE
                <form className="space-y-6" onSubmit={handleSubmit}>
                  
                  {/* Trip Style Selector */}
                  <div className="space-y-3">
                    <span className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Compass className="h-4 w-4 text-primary" /> 
                      What type of trip are you planning?
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {tripStyles.map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setTripType(style.id)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-200 ${
                            tripType === style.id
                              ? 'bg-primary border-primary text-white shadow-glow-primary scale-102'
                              : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                        >
                          <span>{style.emoji}</span>
                          <span>{style.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-bold text-foreground">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="fullName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Anjali Sharma"
                        autoComplete="name"
                        required
                        className="rounded-xl border-border bg-muted/20 focus-visible:ring-primary focus-visible:ring-2 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="emailAddress" className="text-sm font-bold text-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="emailAddress"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., anjali@example.com"
                        autoComplete="email"
                        required
                        className="rounded-xl border-border bg-muted/20 focus-visible:ring-primary focus-visible:ring-2 h-11"
                      />
                    </div>
                  </div>

                  {/* Phone and Destination */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="phoneNumber" className="text-sm font-bold text-foreground">
                        Phone Number
                      </label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., +91 98765 43210"
                        autoComplete="tel"
                        className="rounded-xl border-border bg-muted/20 focus-visible:ring-primary focus-visible:ring-2 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="destinationName" className="text-sm font-bold text-foreground">
                        Where do you want to go?
                      </label>
                      <Input
                        id="destinationName"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g., Kashmir, Bali, Ladakh"
                        className="rounded-xl border-border bg-muted/20 focus-visible:ring-primary focus-visible:ring-2 h-11"
                      />
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-2">
                    <label htmlFor="budgetCategory" className="text-sm font-bold text-foreground flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" /> Estimated Trip Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setBudget(range)}
                          className={`px-3 py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                            budget === range
                              ? 'bg-primary/10 border-primary text-primary font-bold'
                              : 'bg-muted/20 border-border text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message / Details */}
                  <div className="space-y-2">
                    <label htmlFor="tripMessage" className="text-sm font-bold text-foreground">
                      Tell us more about your travel plans <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="tripMessage"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="List travel dates, number of people, preferred lodging, and specific highlights you'd like to experience..."
                      rows={6}
                      required
                      className="rounded-xl border-border bg-muted/20 focus-visible:ring-primary focus-visible:ring-2 p-4"
                    />
                  </div>

                  {/* Error Notification */}
                  {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                      ⚠️ {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary text-white hover:bg-accent font-semibold rounded-xl text-md transition-all shadow-glow-primary hover-lift flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Inquiry...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Request Custom Quote
                      </>
                    )}
                  </Button>

                  {/* Trust Footer */}
                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
                    <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Secure Encryption</span>
                    <span className="flex items-center gap-1"><Clock4 className="h-4 w-4 text-primary" /> Replies within 2 hours</span>
                    <span className="flex items-center gap-1"><Globe2 className="h-4 w-4 text-blue-500" /> 100+ Global Partners</span>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT: Contact Information & Google Map */}
            <div className="space-y-8 animate-slide-in-right">
              
              {/* Contact Cards */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground pl-1">Head Office & Support</h3>
                
                {/* 1. Office Location */}
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 hover-lift smooth-transition">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-primary border border-blue-500/20 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Head Office</p>
                    <p className="text-sm font-semibold text-foreground leading-relaxed">
                      G-6, Ecstasy Business Park, JSD Road, Near City of Joy, Mulund West, Mumbai - 400080.
                    </p>
                  </div>
                </div>

                {/* 2. Direct Support Phone */}
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 hover-lift smooth-transition">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Call Helpline</p>
                    <p className="text-sm font-bold text-foreground select-all">
                      +91-9809660999 / +91-9820702727
                    </p>
                    <p className="text-xs text-muted-foreground">Mobile & WhatsApp assistance available</p>
                  </div>
                </div>

                {/* 3. Direct Email */}
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 hover-lift smooth-transition">
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Inquiry</p>
                    <p className="text-sm font-bold text-foreground select-all">
                      info@travelcastle.in
                    </p>
                    <p className="text-xs text-muted-foreground">General support and business partnerships</p>
                  </div>
                </div>

                {/* 4. Support Hours */}
                <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground border-b border-border/50 pb-2">
                    <Clock4 className="h-4 w-4 text-primary" />
                    <span>Operating Hours</span>
                    <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 animate-pulse-soft">
                      ● Active Now
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-muted-foreground">Monday – Friday:</div>
                    <div className="font-semibold text-right">9:00 AM – 6:00 PM</div>
                    <div className="text-muted-foreground">Saturday:</div>
                    <div className="font-semibold text-right">10:00 AM – 4:00 PM</div>
                    <div className="text-muted-foreground">Sunday:</div>
                    <div className="font-semibold text-right text-destructive">Closed (Emergency Only)</div>
                  </div>
                </div>
              </div>

              {/* Styled Google Maps Embed */}
              <div className="rounded-2xl border border-border bg-card p-3 shadow-luxury overflow-hidden hover-lift smooth-transition relative group">
                <div className="absolute top-4 left-4 z-10 bg-slate-950/80 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm pointer-events-none flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-red-500" /> Mulund West, Mumbai
                </div>
                <iframe
                  title="Travel Castle Head Office Location Map"
                  src="https://maps.google.com/maps?q=G-6,%20Ecstasy%20Business%20Park,%20Mulund%20West,%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* WhatsApp Quick Chat Floating-Style Action */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 shadow-luxury flex items-center justify-between group hover:scale-[1.01] transition-all">
                <div className="space-y-1">
                  <h4 className="font-bold text-white flex items-center gap-1.5 text-md">
                    <MessageCircle className="h-5 w-5 fill-white text-emerald-500 shrink-0" />
                    Quick WhatsApp Support
                  </h4>
                  <p className="text-emerald-100 text-xs leading-relaxed max-w-xs">
                    Need instant recommendations or itinerary customization suggestions? Chat directly.
                  </p>
                </div>
                <a
                  href="https://wa.me/919809660999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 h-10 w-10 flex items-center justify-center rounded-full shrink-0 shadow-lg transition-transform group-hover:scale-110"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="h-5 w-5 fill-emerald-600 text-white" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. FAQ ACCORDION SECTION */}
      <section className="py-16 bg-muted/30 border-y border-border relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-primary border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="h-4 w-4" /> Got Questions?
            </div>
            <h2 className="text-3xl font-extrabold text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-sm">
              Read quick replies to our customers&apos; most common booking and customize tour planning queries.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div 
                  key={index}
                  className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-foreground hover:bg-muted/35 transition-colors focus:outline-none"
                  >
                    <span className="text-base md:text-md pr-4">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-primary shrink-0 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200" />
                    )}
                  </button>

                  {/* Expandable answer */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-60 border-t border-border/50' : 'max-h-0'
                    }`}
                  >
                    <div className="p-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>
      
      {/* 4. TRUST ASSURANCE RIBBON */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-extrabold tracking-widest text-muted-foreground uppercase mb-6">Recognized Partner Networks & Affiliations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-45 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
            {['Incredible India', 'IATA Accreditation', 'TAAI Member', 'ISO 9001:2015 Certified', 'Trusted Travel Network'].map((brand, i) => (
              <span key={i} className="text-sm md:text-base font-bold text-foreground tracking-tight">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
