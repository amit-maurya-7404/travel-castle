'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { TripHeroCarousel } from '@/components/sections/trip-hero-carousel'
import { GallerySection } from '@/components/sections/GallerySection'
import { BookingDialog } from '@/components/booking-dialog'
import { Calendar } from '@/components/ui/calendar'
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Star,
  Phone,
  MessageCircle,
  ChevronDown,
  Download,
  CheckCircle,
  XCircle,
  Sparkles,
  Luggage,
  Shield,
  Info
} from 'lucide-react'

// Contact Constants
const contactEmail = 'info@travelcastle.in'
const contactPhone = '+919809660999'
const contactPhoneDisplay = '+91-9809660999 / +91-9820702727'
const instagramUrl = 'https://instagram.com/travelcastle'

type SelectionItem = {
  name: string
  price: number
}

interface RequestCallbackDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  price: number
  selectedDate?: Date
}

// Local Dialog Modal Component for Callback Requests
function RequestCallbackDialog({ open, onOpenChange, title, price, selectedDate }: RequestCallbackDialogProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', date: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setFormData(prev => ({
        ...prev,
        date: selectedDate ? selectedDate.toISOString().split('T')[0] : ''
      }))
    }
  }, [open, selectedDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative border border-slate-100 animate-scale-in">
        <button
          onClick={() => { onOpenChange(false); setSubmitted(false); }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-800">Request Sent!</h3>
            <p className="text-sm text-slate-500 mt-2">
              Our travel consultant will call you back on <strong>{formData.phone}</strong> within 15 minutes to help plan your <strong>{title}</strong> journey{formData.date ? ` starting on ${new Date(formData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : ''}.
            </p>
            <Button
              className="mt-6 w-full"
              onClick={() => { onOpenChange(false); setSubmitted(false); }}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 font-sans">Plan Your Journey</h3>
              <p className="text-xs text-slate-500 mt-0.5">Customized callback for {title}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Your Name *</label>
              <Input
                required
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white border-slate-200 focus-visible:ring-primary h-11 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Phone Number *</label>
              <Input
                required
                type="tel"
                placeholder="e.g. +91 98096 60999"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white border-slate-200 focus-visible:ring-primary h-11 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Preferred Travel Date</label>
              <Input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-white border-slate-200 focus-visible:ring-primary h-11 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white border-slate-200 focus-visible:ring-primary h-11 rounded-xl"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-white hover:bg-primary/90 font-bold rounded-xl"
              >
                {loading ? 'Sending...' : 'Request callback'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}


export default function PackageDetail() {
  const [selections, setSelections] = useState<SelectionItem[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [callbackOpen, setCallbackOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [expandedDays, setExpandedDays] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState('overview')
  const [isClient, setIsClient] = useState(false)

  const tabContainerRef = useRef<HTMLDivElement>(null)
  const activeTabRef = useRef(activeTab)

  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  // Package details based on ID
  const packageDetails = getPackageDetails(id)

  useEffect(() => {
    activeTabRef.current = activeTab
  }, [activeTab])

  // Setup client verification
  useEffect(() => {
    setIsClient(true)
    if (typeof window === 'undefined') return

    const sections = [
      'overview',
      'itinerary',
      'batches',
      'costing',
      'note',
      'stays',
      'inclusions',
      'exclusions',
      'payment',
      'cancellation',
      'things-to-carry',
      'travel-essentials',
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0
        let activeSection = activeTabRef.current

        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            activeSection = entry.target.id
          }
        })

        if (activeSection !== activeTabRef.current) {
          setActiveTab(activeSection)
          scrollActiveTabIntoView(activeSection)
        }
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    )

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  if (!packageDetails) {
    return notFound()
  }

  // Selections & Pricing Calculations
  const lowestPrice = useMemo(() => {
    const rawPrice = parseInt(packageDetails.price.replace(/,/g, ''), 10) || 0
    return rawPrice
  }, [packageDetails])

  const total = useMemo(() => {
    return selections.reduce((sum, item) => sum + item.price, 0)
  }, [selections])

  // Options Calculations
  const currentOptionName = useMemo(() => {
    return selections.length > 0 ? selections[0].name : 'Triple Sharing (Standard)'
  }, [selections])

  const currentTotalPrice = useMemo(() => {
    return selections.length > 0 ? total : lowestPrice
  }, [selections, total, lowestPrice])

  // Local configurations mapping the reference structure
  const difficulty: string = 'Moderate'
  const groupSize = packageDetails.groupSize || '2-12 People'
  const rating = 4.9

  const heroMedia = useMemo(() => {
    return [
      { type: 'image' as const, src: packageDetails.heroImage, alt: packageDetails.title }
    ]
  }, [packageDetails])

  const batchDates = useMemo(() => {
    return [
      {
        month: 'May 2026',
        ranges: ['10 May - 16 May', '18 May - 24 May', '26 May - 01 June']
      },
      {
        month: 'June 2026',
        ranges: ['05 June - 11 June', '15 June - 21 June', '25 June - 01 July']
      }
    ]
  }, [])

  const costingDetails = useMemo(() => {
    const rawPrice = parseInt(packageDetails.price.replace(/,/g, ''), 10) || 25000
    return [
      { label: 'Triple Sharing (Standard)', value: `₹${packageDetails.price}` },
      { label: 'Double Sharing (Premium Room)', value: `₹${(rawPrice + 5000).toLocaleString('en-IN')}` }
    ]
  }, [packageDetails])

  const stays = useMemo(() => {
    if (packageDetails && 'stays' in packageDetails && Array.isArray(packageDetails.stays)) {
      return packageDetails.stays
    }
    return [
      '3-Star Deluxe Hotel Rooms (Room + Breakfast)',
      'Premium Houseboats (where applicable)',
      'Comfortable Alpine Camping Tents'
    ]
  }, [packageDetails])

  const paymentPolicy = useMemo(() => {
    return [
      'Pay a token amount of ₹5,000 to block your seat/slot.',
      '50% advance payment required to confirm booking 30 days before departure.',
      'Remaining dues must be settled 15 days before the trip starts.'
    ]
  }, [])

  const cancellationPolicy = useMemo(() => {
    return [
      'Cancellations made 30 days or more before the departure date will receive a 100% refund.',
      'Cancellations made between 15 and 30 days before departure will receive a 50% refund.',
      'No refunds will be given for cancellations made within 15 days of departure.'
    ]
  }, [])

  const thingsToCarry = useMemo(() => {
    return [
      'Valid Government Photo ID Card (Aadhaar / Voter ID / Passport)',
      'Sturdy trekking or walking shoes with decent grip',
      'Warm jackets, thermals, and windcheaters',
      'Personal water bottle, towels, and toiletries kit',
      'Power bank and spare camera batteries',
      'Sunscreen lotion (SPF 50+), sunglasses, and lip balm',
      'Personal medications and basic first aid kit'
    ]
  }, [])

  const travelEssentials = useMemo(() => {
    return [
      {
        title: 'Mandatory Documents',
        items: ['Original Govt ID Card', 'Printout of Voucher/Itinerary', 'Medical clearance certificate (if high-altitude)']
      },
      {
        title: 'Clothing & Footwear',
        items: ['Quick-dry outfits', 'Comfortable woolen socks', 'Poncho or raincoat']
      }
    ]
  }, [])

  // Action handlers
  const handleBookNow = () => {
    setBookingOpen(true)
  }

  const handleSelectOption = (label: string, valueStr: string) => {
    const numericPrice = parseInt(valueStr.replace(/[^\d]/g, ''), 10) || 0
    const item = { name: label, price: numericPrice }

    setSelections(prev => {
      const exists = prev.some(i => i.name === label)
      if (exists) {
        return prev.filter(i => i.name !== label)
      } else {
        return [item] // Support toggling single choice options
      }
    })
  }

  const scrollActiveTabIntoView = (tabId: string) => {
    if (typeof window === 'undefined' || !tabContainerRef.current) return

    const container = tabContainerRef.current
    const activeTab = container.querySelector(`[data-tab-id="${tabId}"]`) as HTMLElement

    if (activeTab) {
      const containerRect = container.getBoundingClientRect()
      const tabRect = activeTab.getBoundingClientRect()

      const isTabVisible = tabRect.left >= containerRect.left &&
        tabRect.right <= containerRect.right

      if (!isTabVisible) {
        const scrollLeft = tabRect.left - containerRect.left - (containerRect.width / 2) + (tabRect.width / 2)
        container.scrollTo({
          left: container.scrollLeft + scrollLeft,
          behavior: 'smooth'
        })
      }
    }
  }

  const toggleDay = (dayNum: number) => {
    setExpandedDays(prev =>
      prev.includes(dayNum)
        ? prev.filter(d => d !== dayNum)
        : [...prev, dayNum]
    )
  }

  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return
    const el = document.getElementById(sectionId)
    if (el) {
      const navbarHeight = 80
      const tabNavbarHeight = 24
      const totalOffset = navbarHeight + tabNavbarHeight + 20

      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - totalOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    scrollActiveTabIntoView(sectionId)
  }

  // Pre-configured WhatsApp Url
  const whatsappMsg = `Hi Travel Castle! I'm planning for the ${packageDetails.title} trip. Can you help me with details?`
  const encodedWhatsappMsg = encodeURIComponent(whatsappMsg)
  const whatsappUrl = `https://wa.me/919809660999?text=${encodedWhatsappMsg}`

  const difficultyColor =
    difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
      difficulty === 'Moderate' ? 'bg-amber-100 text-amber-700' :
        'bg-rose-100 text-rose-700'

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="grow">
        {/* HERO SECTION */}
        <div className="relative h-[50vh] sm:h-[45vh] md:h-[70vh] overflow-hidden pt-20">
          <TripHeroCarousel media={heroMedia} />

          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-5 md:px-6 pb-6 sm:pb-8 lg:pb-10">
              {/* Overlay elements can be rendered here */}
            </div>
          </div>
        </div>

        {/* STICKY TAB NAVBAR */}
        <div className="sticky top-20 z-40 bg-white border-b shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6 flex">
            <div className="flex w-fit overflow-hidden">
              <div
                ref={tabContainerRef}
                className="flex w-fit overflow-x-auto gap-2 sm:gap-4 py-0 mr-auto scrollbar-none"
              >
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'itinerary', label: 'Itinerary' },
                  { id: 'batches', label: 'Batches' },
                  { id: 'costing', label: 'Price' },
                  { id: 'note', label: 'Note' },
                  { id: 'stays', label: 'Stays' },
                  { id: 'inclusions', label: 'Inclusions' },
                  { id: 'exclusions', label: 'Exclusions' },
                  { id: 'payment', label: 'Payment Policy' },
                  { id: 'cancellation', label: 'Cancellation' },
                  { id: 'things-to-carry', label: 'Things To Carry' },
                  { id: 'travel-essentials', label: 'Travel Essentials' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    data-tab-id={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT LAYOUT GRID */}
        <div className="max-w-6xl mx-auto px-[4vw] sm:px-[5vw] md:px-6 py-[4vh] sm:py-[5vh] md:py-[6vh]">
          <div className="grid lg:grid-cols-[2.5fr_1fr] gap-[4vw] lg:gap-[3vw]">

            {/* LEFT CONTENT */}
            <div className="space-y-[8vh]">

              {/* HEADER SECTION */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  {packageDetails.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-slate-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="shrink-0" />
                    <span className="text-sm sm:text-base">{packageDetails.location}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1">
                    <CalendarIcon size={16} className="shrink-0" />
                    <span className="text-sm sm:text-base">{packageDetails.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Badge className={`${difficultyColor} text-xs sm:text-sm px-3 py-1 font-semibold border-none`}>
                    {difficulty}
                  </Badge>
                  <Badge className="bg-slate-100 text-slate-700 text-xs sm:text-sm px-3 py-1 font-semibold border-none">
                    <Users size={14} className="mr-1" /> {groupSize}
                  </Badge>
                  <Badge className="bg-amber-100 text-amber-700 text-xs sm:text-sm px-3 py-1 font-semibold border-none">
                    <Star size={14} className="mr-1 fill-amber-500 text-amber-500" /> {rating}
                  </Badge>
                </div>
              </div>

              {/* OVERVIEW & HIGHLIGHTS */}
              <section id="overview" className="scroll-mt-36">
                <h2 className="text-2xl font-bold mb-4 font-sans text-slate-900">Overview & Highlights</h2>
                <Card className="p-4 md:p-6 space-y-4 bg-linear-to-br from-slate-50 to-white border-slate-100 shadow-sm rounded-3xl">
                  <div className="space-y-4">
                    <div>
                      <p
                        style={
                          showFullDesc
                            ? {}
                            : {
                              display: '-webkit-box',
                              WebkitLineClamp: 4,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }
                        }
                        className="text-slate-600 leading-relaxed text-sm sm:text-base transition-all duration-300"
                      >
                        {packageDetails.description}
                      </p>

                      <button
                        onClick={() => setShowFullDesc(!showFullDesc)}
                        className="mt-2 text-primary font-bold text-sm hover:underline"
                      >
                        {showFullDesc ? 'Show Less' : 'Show More'}
                      </button>
                    </div>

                    {packageDetails.whyChoose?.length ? (
                      <div className="rounded-2xl bg-slate-100/50 p-4 md:p-5 border border-slate-200/50">
                        <ul className="space-y-2.5 text-slate-600 text-sm sm:text-base">
                          {packageDetails.whyChoose.map((point, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span className="text-slate-400">•</span>
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5 pt-4 border-t border-slate-100">
                    {packageDetails.highlights.map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span className="text-lg shrink-0 mt-0.5">✨</span>
                        <span className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              {/* ITINERARY */}
              <section id="itinerary" className="scroll-mt-36">
                <h2 className="text-2xl font-bold mb-4 font-sans text-slate-900">Itinerary</h2>
                <div className="space-y-3">
                  {Array.isArray(packageDetails.itinerary) && packageDetails.itinerary.length > 0 ? (
                    packageDetails.itinerary.map(day => (
                      <div
                        key={day.day}
                        className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                      >
                        <button
                          onClick={() => toggleDay(day.day)}
                          className="w-full flex items-start justify-between p-5 text-left grow transition-colors hover:bg-slate-50/50"
                        >
                          <div className="flex items-start gap-4 grow min-w-0">
                            <div className="shrink-0">
                              <Badge className="bg-primary/15 text-primary text-xs font-bold border-none px-3.5 py-1 rounded-full">
                                Day {day.day}
                              </Badge>
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                                {day.title}
                              </h3>
                              {!expandedDays.includes(day.day) && (
                                <p className="text-xs sm:text-sm text-slate-500 line-clamp-1 mt-1 font-medium">
                                  {day.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <ChevronDown
                            size={20}
                            className={`shrink-0 ml-2 text-slate-400 transition-transform duration-300 ${expandedDays.includes(day.day) ? 'rotate-180 text-primary' : ''
                              }`}
                          />
                        </button>

                        {expandedDays.includes(day.day) && (
                          <div className="px-5 pb-5 pt-1 bg-slate-50/40 border-t border-slate-100">
                            <p className="text-sm sm:text-base text-slate-650 leading-relaxed">
                              {day.description}
                            </p>

                            {/* Itinerary Activities */}
                            {day.activities?.length ? (
                              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                                {day.activities.map((act, actIdx) => (
                                  <span key={actIdx} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 shadow-2xs">
                                    {act}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-350 bg-slate-50 p-6 text-slate-600 text-center font-medium">
                      Itinerary details will be available shortly.
                    </div>
                  )}
                </div>
              </section>

              {/* BATCHES */}
              <section id="batches" className="scroll-mt-36">
                <h2 className="text-2xl font-bold mb-4 font-sans text-slate-900">Choose Departure Date</h2>
                <Card className="p-5 border border-slate-200/80 shadow-xs rounded-3xl bg-white space-y-4">
                  <p className="text-sm font-semibold text-slate-500">
                    This trip is fully customizable. Please select your preferred departure date:
                  </p>
                  <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                    <div className="border border-slate-100 rounded-2xl p-4 shadow-2xs bg-white mx-auto md:mx-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ before: new Date() }}
                        className="rounded-md border-none"
                      />
                    </div>
                    <div className="space-y-4 max-w-sm flex-1">
                      <div className="rounded-2xl bg-primary/5 border border-primary/10 p-5 space-y-3">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          Customized Dynamic Trip
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Since all our itineraries are bespoke, your selected date serves as the tentative launch date. Our travel experts will finalize everything based on your specific requirements.
                        </p>
                      </div>

                      {selectedDate ? (
                        <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-5 space-y-2">
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Selected Date</p>
                          <p className="text-lg font-extrabold text-slate-800 font-sans">
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                          <Button
                            className="w-full mt-2 h-11 bg-primary text-white hover:bg-primary/90 font-bold rounded-xl"
                            onClick={handleBookNow}
                          >
                            Book with this Date
                          </Button>
                        </div>
                      ) : (
                        <div className="rounded-2xl bg-slate-50 border border-slate-150 p-5 text-center">
                          <p className="text-sm text-slate-550 font-semibold">
                            Please select a date from the calendar to plan your departure.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </section>

              {/* COSTING */}
              <section id="costing" className="scroll-mt-36">
                <h2 className="text-2xl font-bold mb-4 font-sans text-slate-900">Trip Price</h2>
                <Card className="p-6 border border-slate-200/80 shadow-xs rounded-2xl bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Starting Price</p>
                    <p className="text-3xl font-extrabold text-primary mt-1">₹{packageDetails.price}</p>
                  </div>
                  <div className="text-left sm:text-right text-slate-500 text-sm font-medium">
                    <p>* Per person on twin/triple sharing basis</p>
                    <p className="text-xs text-slate-400 mt-1">Final pricing may vary depending on customized options, group size, and dates</p>
                  </div>
                </Card>
              </section>

              {/* NOTE */}
              <section id="note" className="scroll-mt-36">
                <h2 className="text-2xl font-bold mb-4 font-sans text-slate-900">Note</h2>
                <Card className="p-5 border-slate-200/80 shadow-xs rounded-2xl bg-linear-to-br from-amber-50/40 to-white border-l-4 border-l-amber-500">
                  <ul className="list-disc list-inside space-y-2.5 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                    {packageDetails.bookingInfo.map((item, idx) => (
                      <li key={idx} className="marker:text-amber-500">{item}</li>
                    ))}
                  </ul>
                </Card>
              </section>

              {/* STAYS */}
              <section id="stays" className="scroll-mt-36">
                <h2 className="text-2xl font-bold mb-4 font-sans text-slate-900">Stays</h2>
                <Card className="p-5 border-slate-200/80 shadow-xs rounded-2xl bg-white">
                  <div className="space-y-3.5 pl-1">
                    {stays.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <span className="text-slate-400 shrink-0 text-sm">•</span>
                        <span className="text-sm sm:text-base text-slate-700 font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              {/* ACCORDION POLICIES & ESSENTIALS */}
              <Accordion type="single" collapsible defaultValue="inclusions" className="space-y-4">
                <section id="inclusions" className="scroll-mt-36">
                  <AccordionItem value="inclusions" className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden px-5 py-1">
                    <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-4">What's Included</AccordionTrigger>
                    <AccordionContent className="pb-5 pt-2">
                      <div className="grid gap-3 font-semibold">
                        {packageDetails.inclusions.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <span className="text-emerald-500 shrink-0">✅</span>
                            <span className="text-sm sm:text-base text-slate-650 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </section>

                <section id="exclusions" className="scroll-mt-36">
                  <AccordionItem value="exclusions" className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden px-5 py-1">
                    <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-4">What's Not Included</AccordionTrigger>
                    <AccordionContent className="pb-5 pt-2">
                      <div className="grid gap-3 font-semibold">
                        {packageDetails.exclusions.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <span className="text-rose-500 shrink-0">❌</span>
                            <span className="text-sm sm:text-base text-slate-650 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </section>

                <section id="payment" className="scroll-mt-36">
                  <AccordionItem value="payment" className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden px-5 py-1">
                    <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-4">Payment Policy</AccordionTrigger>
                    <AccordionContent className="pb-5 pt-2">
                      <div className="space-y-3 font-semibold">
                        {paymentPolicy.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <span className="text-slate-400 shrink-0 mt-0.5">•</span>
                            <span className="text-sm sm:text-base text-slate-650 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </section>

                <section id="cancellation" className="scroll-mt-36">
                  <AccordionItem value="cancellation" className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden px-5 py-1">
                    <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-4">Cancellation Policy</AccordionTrigger>
                    <AccordionContent className="pb-5 pt-2">
                      <div className="space-y-3 font-semibold">
                        {cancellationPolicy.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <span className="text-slate-400 shrink-0 mt-0.5">•</span>
                            <span className="text-sm sm:text-base text-slate-650 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </section>

                <section id="things-to-carry" className="scroll-mt-36">
                  <AccordionItem value="things-to-carry" className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden px-5 py-1">
                    <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-4">Things To Carry</AccordionTrigger>
                    <AccordionContent className="pb-5 pt-2">
                      <div className="space-y-3 font-semibold">
                        {thingsToCarry.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <span className="text-slate-400 shrink-0 mt-0.5">•</span>
                            <span className="text-sm sm:text-base text-slate-650 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </section>

                <section id="travel-essentials" className="scroll-mt-36">
                  <AccordionItem value="travel-essentials" className="border border-slate-200/80 bg-white rounded-2xl overflow-hidden px-5 py-1">
                    <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-4">Travel Essentials</AccordionTrigger>
                    <AccordionContent className="pb-5 pt-2">
                      <div className="space-y-6">
                        {travelEssentials.map((group, idx) => (
                          <div key={idx}>
                            <h3 className="font-bold text-base text-slate-800 mb-3">{group.title}</h3>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {group.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-650 border border-slate-200/40">
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </section>
              </Accordion>

              {/* MOBILE BOTTOM CTA TRIGGER */}
              <div className="lg:hidden space-y-3">
                <Button size="lg" className="w-full h-13 text-base font-bold shadow-md" onClick={() => setCallbackOpen(true)}>
                  <Phone size={18} /> Enquire Now
                </Button>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="hidden lg:block space-y-[3vh]">
              <div className="lg:sticky lg:top-32">
                {/* PRICE CARD */}
                <Card className="p-6 shadow-luxury border-slate-200/80 bg-white space-y-5 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-indigo-500 group-hover:h-2 transition-all duration-300"></div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                      Starting Price
                    </p>
                    <p className="text-3xl font-extrabold text-primary mt-1.5">
                      ₹{packageDetails.price}
                    </p>
                    <p className="text-xs text-slate-400 font-bold mt-2">
                      per person
                    </p>
                  </div>

                  <div className="grid gap-3 pt-2">
                    <Button
                      size="lg"
                      className="w-full h-13 font-bold text-base shadow-sm"
                      onClick={handleBookNow}
                    >
                      <Phone size={18} /> Book Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full h-13 font-bold text-base hover:bg-slate-50 border-slate-200"
                      onClick={() => setCallbackOpen(true)}
                    >
                      <MessageCircle size={18} /> Request Callback
                    </Button>
                  </div>
                </Card>

                {/* HELPLINE CONTACT CARD */}
                <Card className="p-6 mt-[3vh] border-slate-200/85 rounded-3xl bg-linear-to-b from-primary/5 to-transparent">
                  <h3 className="font-bold text-lg text-slate-800 mb-1">Need Help?</h3>
                  <p className="text-sm text-slate-500 font-medium mb-5">
                    Contact our travel experts anytime
                  </p>

                  <div className="space-y-3.5 text-sm font-bold">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <span className="font-semibold">{contactEmail}</span>
                    </a>
                    <a
                      href={`tel:${contactPhone}`}
                      className="flex items-center gap-2.5 text-slate-700 hover:text-primary transition-colors"
                    >
                      <Phone size={16} className="text-slate-400" />
                      {contactPhoneDisplay}
                    </a>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-slate-700 hover:text-primary transition-colors"
                    >
                      <MessageCircle size={16} className="text-slate-400" />
                      Instagram
                    </a>
                  </div>
                </Card>

                {/* DOWNLOAD ITINERARY */}
                <Button
                  variant="outline"
                  className="w-full h-12 mt-[3vh] justify-center font-bold border-slate-200 hover:bg-slate-50 rounded-2xl"
                  onClick={() => alert(`PDF download feature for "${packageDetails.title}" coming soon!`)}
                >
                  <Download size={18} /> Download Itinerary
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM STICKY CTA BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white lg:hidden border-t border-slate-200/80 shadow-2xl z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xxs text-slate-400 uppercase tracking-widest font-bold">
              {selections.length > 0 ? 'Total selected' : 'Starting at'}
            </p>
            <p className="text-lg font-extrabold text-slate-850">
              ₹{(selections.length > 0 ? total : lowestPrice).toLocaleString('en-IN')}
            </p>
          </div>
          <Button onClick={handleBookNow} className="h-12 px-6 font-bold rounded-xl shadow-md shrink-0">
            Book Now
          </Button>
        </div>
      </div>

      {/* MOBILE BOTTOM PADDING FOR STICKY CTA */}
      <div className="h-[90px] lg:h-0 min-h-20 lg:min-h-0" />

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 lg:bottom-6 right-6 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(16,185,129,0.45)] hover:scale-110 hover:-translate-y-1 transition-all z-50 cursor-pointer border border-emerald-400 group"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute right-0 top-0 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
      </a>

      {/* GALLERY SECTION */}
      <GallerySection />

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        packageTitle={packageDetails.title}
        optionName={currentOptionName}
        totalPrice={currentTotalPrice}
        selectedDate={selectedDate}
      />

      <RequestCallbackDialog
        open={callbackOpen}
        onOpenChange={setCallbackOpen}
        title={packageDetails.title}
        price={lowestPrice}
        selectedDate={selectedDate}
      />

    </div>
  )
}

function getPackageDetails(id: string) {
  const packages = {
    'honeymoon-trips': {
      title: 'Romantic Honeymoon Getaways',
      category: 'Honeymoon',
      description: 'Create unforgettable memories with your loved one in the most romantic destinations around the world.',
      heroImage: '/images/package-honeymoon.jpg',
      duration: '7-10 Days',
      groupSize: '2 People',
      location: 'Multiple Destinations',
      price: '45,000',
      bestTime: 'October - May',
      overview: 'Our honeymoon packages are designed to create magical moments for newlyweds. From private beach villas to mountain retreats, we curate experiences that celebrate love and create lasting memories. Each package includes romantic touches, privacy, and personalized service.',
      stays: [
        'Luxury Honeymoon Suites & Villas',
        'Romantic beach resorts & private island stays',
        'Premium boutique hotels with jacuzzi facilities'
      ],
      highlights: [
        'Private romantic dinners with ocean views',
        'Couples spa treatments and massages',
        'Sunset yacht cruises',
        'Personalized wedding anniversary celebrations',
        'Luxury accommodations with jacuzzis',
        'Professional photography sessions'
      ],
      whyChoose: [
        'Curated romantic experiences',
        'Privacy and personalization',
        'Luxury accommodations',
        'Professional service',
        'Memorable surprises included'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Welcome',
          description: 'Arrive at your destination and be greeted with a refreshing welcome drink and flower garlands. Transfer to your luxury resort.',
          activities: ['Airport Transfer', 'Welcome Drink', 'Check-in']
        },
        {
          day: 2,
          title: 'Romantic Beach Day',
          description: 'Spend a relaxing day at the beach with private cabana service, couples massage, and sunset dinner.',
          activities: ['Beach Relaxation', 'Couples Massage', 'Sunset Dinner']
        },
        {
          day: 3,
          title: 'Adventure & Romance',
          description: 'Enjoy a gentle adventure activity followed by a private dinner under the stars.',
          activities: ['Island Hopping', 'Water Sports', 'Private Dinner']
        },
        {
          day: 4,
          title: 'Cultural Experience',
          description: 'Explore local culture with a private guide, visit temples, and enjoy traditional performances.',
          activities: ['Temple Visit', 'Cultural Show', 'Local Cuisine']
        },
        {
          day: 5,
          title: 'Relaxation Day',
          description: 'Free day for relaxation, spa treatments, or optional activities.',
          activities: ['Spa Day', 'Pool Time', 'Shopping']
        },
        {
          day: 6,
          title: 'Farewell Celebration',
          description: 'Celebrate your last day with champagne breakfast and departure transfer.',
          activities: ['Champagne Breakfast', 'Departure Transfer']
        }
      ],
      inclusions: [
        'Return airfare (economy class)',
        'Luxury accommodation with breakfast',
        'Private airport transfers',
        'Welcome drinks and refreshments',
        'Couples spa session (2 hours)',
        'Romantic dinner with wine',
        'Sunset yacht cruise',
        'Professional photography',
        '24/7 concierge service',
        'Travel insurance'
      ],
      exclusions: [
        'International airfare (if applicable)',
        'Personal expenses and shopping',
        'Additional meals not mentioned',
        'Tips and gratuities',
        'Visa fees',
        'Any optional activities'
      ],
      bookingInfo: [
        '50% advance payment required to confirm booking',
        'Full payment 30 days before departure',
        'Cancellation charges apply as per policy',
        'Dates are flexible based on availability',
        'Customizations available on request'
      ],
      relatedPackages: [
        {
          id: 'family-trips',
          title: 'Family Adventures',
          description: 'Fun-filled trips for the whole family',
          image: '/images/package-family.jpg',
          price: '35,000',
          duration: '7 Days'
        },
        {
          id: 'solo-trips',
          title: 'Solo Adventures',
          description: 'Travel your way, discover yourself',
          image: '/images/package-solo.jpg',
          price: '25,000',
          duration: '5 Days'
        }
      ]
    },
    'corporate-trips': {
      title: 'Corporate Team Building Retreats',
      category: 'Corporate',
      description: 'Strengthen team bonds and boost morale with expertly planned corporate retreats and team building activities.',
      heroImage: '/images/package-corporate.jpg',
      duration: '3-5 Days',
      groupSize: '10-50 People',
      location: 'Multiple Destinations',
      price: '15,000',
      bestTime: 'Throughout Year',
      overview: 'Our corporate packages are designed to enhance team collaboration, creativity, and morale. From adventure activities to strategic planning sessions, we create memorable experiences that align with your company culture and objectives.',
      stays: [
        'Premium 4-Star & 5-Star business hotels',
        'Luxury corporate retreat resorts with conference halls',
        'Team-friendly adventure camps & lodges'
      ],
      highlights: [
        'Team building activities and workshops',
        'Adventure sports and challenges',
        'Strategic planning sessions',
        'Networking opportunities',
        'Luxury accommodations',
        'Professional event management'
      ],
      whyChoose: [
        'Customized team activities',
        'Professional facilitators',
        'Luxury accommodations',
        'Complete event management',
        'Measurable outcomes'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Icebreakers',
          description: 'Welcome arrival, team introductions, and icebreaker activities to set the tone.',
          activities: ['Welcome Session', 'Team Building Games', 'Dinner']
        },
        {
          day: 2,
          title: 'Adventure Day',
          description: 'Full day of adventure activities including rafting, trekking, and team challenges.',
          activities: ['Adventure Sports', 'Team Challenges', 'Outdoor Activities']
        },
        {
          day: 3,
          title: 'Strategy & Planning',
          description: 'Strategic planning sessions, workshops, and goal setting activities.',
          activities: ['Workshops', 'Strategy Sessions', 'Goal Setting']
        },
        {
          day: 4,
          title: 'Cultural Experience',
          description: 'Local cultural immersion and team reflection activities.',
          activities: ['Cultural Tours', 'Reflection Sessions', 'Awards']
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Final activities, feedback session, and departure transfers.',
          activities: ['Feedback Session', 'Departure Transfer']
        }
      ],
      inclusions: [
        'Luxury accommodation with meals',
        'All team building activities',
        'Professional facilitators',
        'Transportation within destination',
        'Welcome and farewell dinners',
        'Adventure sports equipment',
        'Medical assistance',
        'Event photography'
      ],
      exclusions: [
        'Airfare to destination',
        'Personal expenses',
        'Additional activities',
        'Travel insurance',
        'Tips and gratuities'
      ],
      bookingInfo: [
        'Minimum 10 participants required',
        'Custom itinerary available',
        'Corporate discounts applicable',
        'Flexible payment terms',
        'On-site coordination included'
      ],
      relatedPackages: [
        {
          id: 'adventure-tours',
          title: 'Adventure Tours',
          description: 'Thrilling expeditions for adrenaline seekers',
          image: '/images/package-adventure.jpg',
          price: '20,000',
          duration: '5 Days'
        },
        {
          id: 'family-trips',
          title: 'Family Adventures',
          description: 'Fun-filled trips for the whole family',
          image: '/images/package-family.jpg',
          price: '35,000',
          duration: '7 Days'
        }
      ]
    },
    'bachelor-bachelorette': {
      title: 'Unforgettable Bachelor/Bachelorette Parties',
      category: 'Celebration',
      description: 'Celebrate the end of singledom with epic adventures, luxury experiences, and lifelong memories.',
      heroImage: '/images/package-bachelor.jpg',
      duration: '2-4 Days',
      groupSize: '5-15 People',
      location: 'Multiple Destinations',
      price: '25,000',
      bestTime: 'Throughout Year',
      overview: 'Make your last night of freedom unforgettable with our carefully curated bachelor/bachelorette packages. From beach parties to city adventures, we ensure every moment is filled with excitement, luxury, and fun.',
      stays: [
        'Private luxury villas with private swimming pools',
        'Boutique party-friendly beach resorts',
        'Premium city-center luxury apartments'
      ],
      highlights: [
        'Private villa accommodations',
        'Exclusive club access',
        'Adventure activities',
        'Professional photography',
        'Luxury transportation',
        'Personalized celebrations'
      ],
      whyChoose: [
        'Discreet and professional service',
        'Customized celebrations',
        'Luxury experiences',
        'Safety first approach',
        'Memorable surprises'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Welcome',
          description: 'Arrive and settle into your private villa with welcome drinks and introductions.',
          activities: ['Villa Check-in', 'Welcome Party', 'Group Dinner']
        },
        {
          day: 2,
          title: 'Adventure Day',
          description: 'Full day of exciting activities including water sports, adventure games, and exploration.',
          activities: ['Water Sports', 'Adventure Activities', 'Beach Games']
        },
        {
          day: 3,
          title: 'Celebration Night',
          description: 'Epic celebration with club access, private parties, and special surprises.',
          activities: ['Club Access', 'Private Party', 'Celebration Activities']
        },
        {
          day: 4,
          title: 'Relaxation & Departure',
          description: 'Morning relaxation, brunch, and departure with memorable goodbyes.',
          activities: ['Brunch', 'Relaxation', 'Departure']
        }
      ],
      inclusions: [
        'Private villa accommodation',
        'Welcome drinks and snacks',
        'All adventure activities',
        'Club entry and VIP treatment',
        'Professional photography',
        'Luxury transportation',
        'Celebration decorations',
        '24/7 support staff'
      ],
      exclusions: [
        'Airfare to destination',
        'Personal shopping and expenses',
        'Additional drinks beyond welcome',
        'Tips and gratuities',
        'Travel insurance'
      ],
      bookingInfo: [
        'Minimum group size: 5 people',
        'Age verification required',
        'Responsible drinking policy',
        'Flexible customization available',
        'Privacy guaranteed'
      ],
      relatedPackages: [
        {
          id: 'adventure-tours',
          title: 'Adventure Tours',
          description: 'Thrilling expeditions for adrenaline seekers',
          image: '/images/package-adventure.jpg',
          price: '20,000',
          duration: '5 Days'
        },
        {
          id: 'solo-trips',
          title: 'Solo Adventures',
          description: 'Travel your way, discover yourself',
          image: '/images/package-solo.jpg',
          price: '25,000',
          duration: '5 Days'
        }
      ]
    },
    'family-trips': {
      title: 'Joyful Family Adventures',
      category: 'Family',
      description: 'Create precious family memories with safe, fun, and engaging experiences for all ages.',
      heroImage: '/images/package-family.jpg',
      duration: '5-8 Days',
      groupSize: '4-12 People',
      location: 'Multiple Destinations',
      price: '35,000',
      bestTime: 'October - May',
      overview: 'Our family packages are designed to cater to every family member, from toddlers to grandparents. With a mix of adventure, relaxation, and cultural experiences, we ensure everyone has an amazing time.',
      stays: [
        'Family-friendly resort hotels with kids club facilities',
        'Spacious luxury apartments & suites',
        'Comfortable mid-range hotels in convenient locations'
      ],
      highlights: [
        'Kid-friendly activities',
        'Family accommodation options',
        'Educational experiences',
        'Safety-focused adventures',
        'Professional child care',
        'Memorable family moments'
      ],
      whyChoose: [
        'All-age appropriate activities',
        'Family-focused accommodations',
        'Safety and comfort priority',
        'Educational components',
        'Flexible pacing'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Family Arrival',
          description: 'Warm welcome with family check-in, orientation, and introductory activities.',
          activities: ['Family Welcome', 'Villa Tour', 'Group Introduction']
        },
        {
          day: 2,
          title: 'Beach Family Day',
          description: 'Relaxing beach activities suitable for all ages, from sandcastle building to gentle water play.',
          activities: ['Beach Activities', 'Water Games', 'Family Picnic']
        },
        {
          day: 3,
          title: 'Adventure Day',
          description: 'Age-appropriate adventure activities with options for different skill levels.',
          activities: ['Gentle Treks', 'Boat Rides', 'Nature Walks']
        },
        {
          day: 4,
          title: 'Cultural Experience',
          description: 'Family-friendly cultural activities, local interactions, and traditional experiences.',
          activities: ['Cultural Tours', 'Local Interactions', 'Traditional Games']
        },
        {
          day: 5,
          title: 'Free Family Time',
          description: 'Flexible day for family bonding, optional activities, and relaxation.',
          activities: ['Free Time', 'Optional Activities', 'Family Bonding']
        },
        {
          day: 6,
          title: 'Farewell Celebration',
          description: 'Family celebration, feedback session, and departure preparations.',
          activities: ['Family Celebration', 'Feedback', 'Departure']
        }
      ],
      inclusions: [
        'Family accommodation with kids\' amenities',
        'All meals including kids\' menu',
        'Family activities and entertainment',
        'Professional child supervision',
        'Transportation within destination',
        'Welcome and farewell activities',
        'Family photography',
        '24/7 family support'
      ],
      exclusions: [
        'International airfare',
        'Personal expenses',
        'Additional activities',
        'Travel insurance',
        'Tips and gratuities'
      ],
      bookingInfo: [
        'Family discounts available',
        'Child-friendly accommodations',
        'Flexible activity options',
        'Professional child care included',
        'Custom family packages available'
      ],
      relatedPackages: [
        {
          id: 'honeymoon-trips',
          title: 'Honeymoon Getaways',
          description: 'Romantic experiences for couples',
          image: '/images/package-honeymoon.jpg',
          price: '45,000',
          duration: '7 Days'
        },
        {
          id: 'adventure-tours',
          title: 'Adventure Tours',
          description: 'Thrilling expeditions for adrenaline seekers',
          image: '/images/package-adventure.jpg',
          price: '20,000',
          duration: '5 Days'
        }
      ]
    },
    'solo-trips': {
      title: 'Empowering Solo Adventures',
      category: 'Solo Travel',
      description: 'Travel your way, discover yourself, and create unforgettable solo experiences with like-minded travelers.',
      heroImage: '/images/package-solo.jpg',
      duration: '5-10 Days',
      groupSize: 'Individual',
      location: 'Multiple Destinations',
      price: '25,000',
      bestTime: 'Throughout Year',
      overview: 'Our solo travel packages are designed for independent travelers seeking self-discovery, new experiences, and meaningful connections. Travel at your own pace with the support of our expert guides and fellow solo travelers.',
      stays: [
        'Safe & vibrant premium hostels & co-living spaces',
        'Comfortable boutique guesthouses',
        '3-star standard hotel rooms'
      ],
      highlights: [
        'Flexible itineraries',
        'Small group experiences',
        'Self-discovery activities',
        'Safety and security focus',
        'Cultural immersion',
        'Personal growth opportunities'
      ],
      whyChoose: [
        'Complete flexibility',
        'Safe solo travel environment',
        'Like-minded companions',
        'Personal space respected',
        'Expert guidance available',
        'Self-discovery focus'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Personal Arrival',
          description: 'Independent arrival with optional group welcome and personal orientation.',
          activities: ['Self Check-in', 'Optional Welcome', 'Personal Time']
        },
        {
          day: 2,
          title: 'Exploration Day',
          description: 'Free exploration with optional group activities and personal discoveries.',
          activities: ['City Exploration', 'Optional Group Tours', 'Personal Activities']
        },
        {
          day: 3,
          title: 'Adventure Experience',
          description: 'Optional adventure activities with choices based on personal preferences.',
          activities: ['Optional Adventures', 'Personal Challenges', 'Group Support']
        },
        {
          day: 4,
          title: 'Cultural Immersion',
          description: 'Deep dive into local culture with optional group participation.',
          activities: ['Cultural Experiences', 'Local Interactions', 'Optional Group Events']
        },
        {
          day: 5,
          title: 'Reflection & Connection',
          description: 'Personal reflection time with optional group sharing and connections.',
          activities: ['Personal Reflection', 'Optional Sharing', 'Group Connections']
        },
        {
          day: 6,
          title: 'Personal Departure',
          description: 'Flexible departure with optional farewell and continued journey planning.',
          activities: ['Optional Farewell', 'Flexible Departure', 'Future Planning']
        }
      ],
      inclusions: [
        'Solo-friendly accommodation',
        'Flexible meal options',
        'Optional group activities',
        '24/7 support hotline',
        'Travel safety briefing',
        'Optional guided tours',
        'Emergency assistance',
        'Flexible transportation'
      ],
      exclusions: [
        'International airfare',
        'Personal expenses',
        'Optional activities',
        'Travel insurance',
        'Tips and gratuities'
      ],
      bookingInfo: [
        'Completely flexible booking',
        'Solo traveler discounts',
        'Optional group activities',
        'Personal safety focus',
        'Flexible cancellation policy',
        'Individual preferences respected'
      ],
      relatedPackages: [
        {
          id: 'adventure-tours',
          title: 'Adventure Tours',
          description: 'Thrilling expeditions for adrenaline seekers',
          image: '/images/package-adventure.jpg',
          price: '20,000',
          duration: '5 Days'
        },
        {
          id: 'corporate-trips',
          title: 'Corporate Retreats',
          description: 'Team building and corporate events',
          image: '/images/package-corporate.jpg',
          price: '15,000',
          duration: '3 Days'
        }
      ]
    },
    'adventure-tours': {
      title: 'Thrilling Adventure Expeditions',
      category: 'Adventure',
      description: 'Push your limits and conquer new heights with our adrenaline-pumping adventure tours and expeditions.',
      heroImage: '/images/package-adventure.jpg',
      duration: '5-12 Days',
      groupSize: '6-15 People',
      location: 'Multiple Destinations',
      price: '20,000',
      bestTime: 'October - May',
      overview: 'For thrill-seekers and adventure enthusiasts, our adventure packages offer the ultimate adrenaline rush. From mountain treks to water sports, experience the world\'s most exciting destinations with expert guides and top-notch safety measures.',
      stays: [
        'Comfortable alpine camping tents & domes',
        'Rustic mountain lodges & homestays',
        '3-star base-camp hotel rooms'
      ],
      highlights: [
        'Extreme adventure activities',
        'Professional expert guides',
        'Top safety standards',
        'Adrenaline-pumping experiences',
        'Skill development opportunities',
        'Unforgettable challenges'
      ],
      whyChoose: [
        'Expert adventure guides',
        'Premium safety equipment',
        'Challenging experiences',
        'Skill-building focus',
        'Small group sizes',
        'Memorable adventures'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Adventure Briefing',
          description: 'Arrival, safety briefing, equipment check, and introductory adventure activities.',
          activities: ['Safety Briefing', 'Equipment Check', 'Intro Activities']
        },
        {
          day: 2,
          title: 'Mountain Adventure',
          description: 'Trekking, climbing, and mountain-based adventure activities.',
          activities: ['Mountain Trekking', 'Rock Climbing', 'Adventure Sports']
        },
        {
          day: 3,
          title: 'Water Adventures',
          description: 'Rafting, kayaking, and water-based thrilling experiences.',
          activities: ['White Water Rafting', 'Kayaking', 'Water Sports']
        },
        {
          day: 4,
          title: 'Extreme Challenges',
          description: 'High-adrenaline activities including zip-lining, paragliding, and more.',
          activities: ['Zip-lining', 'Paragliding', 'Extreme Sports']
        },
        {
          day: 5,
          title: 'Recovery & Reflection',
          description: 'Rest day with optional light activities and adventure reflection.',
          activities: ['Rest & Recovery', 'Optional Activities', 'Adventure Review']
        },
        {
          day: 6,
          title: 'Final Adventure',
          description: 'Culminating adventure experience and celebration of achievements.',
          activities: ['Final Challenge', 'Achievement Celebration', 'Departure']
        }
      ],
      inclusions: [
        'Professional adventure guides',
        'All safety equipment',
        'Adventure activity fees',
        'Transportation to sites',
        'Adventure accommodation',
        'Meals during activities',
        'Medical support',
        'Adventure photography'
      ],
      exclusions: [
        'International airfare',
        'Personal adventure gear',
        'Additional activities',
        'Travel insurance',
        'Tips and gratuities'
      ],
      bookingInfo: [
        'Fitness assessment required',
        'Minimum age restrictions apply',
        'Safety waivers mandatory',
        'Professional guides included',
        'Flexible adventure levels',
        'Group size limits apply'
      ],
      relatedPackages: [
        {
          id: 'solo-trips',
          title: 'Solo Adventures',
          description: 'Travel your way, discover yourself',
          image: '/images/package-solo.jpg',
          price: '25,000',
          duration: '5 Days'
        },
        {
          id: 'corporate-trips',
          title: 'Corporate Retreats',
          description: 'Team building and corporate events',
          image: '/images/package-corporate.jpg',
          price: '15,000',
          duration: '3 Days'
        }
      ]
    },
    'best-of-europe-13-days': {
      title: 'Best of Europe 13 Days',
      category: 'Group Adventures',
      description: 'Explore France, Belgium, Netherlands, Germany, Switzerland, Austria and Italy in one grand 13-day adventure.',
      heroImage: '/images/package-adventure.jpg',
      duration: '13 Days',
      groupSize: '15-40 People',
      location: 'Multiple Countries (Europe)',
      price: '3,00,000',
      bestTime: 'May - October',
      overview: 'Discover the best of Europe in 13 days. From Eiffel Tower in Paris to St. Mark\'s Square in Venice, Lindt Chocolate Home in Switzerland, Grand Place in Brussels, canals of Amsterdam and Colosseum in Rome. A complete grand group adventure.',
      stays: [
        '03 Nights accommodation in B&B / Millennium CDG or similar hotel in Paris',
        '01 Night accommodation in Ramada / Amrath / Van der Valk or similar hotel in Netherlands',
        '01 Night accommodation in Intercity / Elaya or similar hotel in Germany',
        '03 Nights accommodation in La Maison / Radisson or similar hotel in Central Switzerland',
        '01 Night accommodation in Alpenkoning / Hocheder or similar hotel in Innsbruck / Seefeld',
        '01 Night accommodation in Four Points by Sheraton / Blue Dream or similar hotel in Padova / Ferrara',
        '01 Night accommodation in Park / Le Fonti or similar hotel in Tuscany',
        '01 Night accommodation in SHG / Selene / Simon or similar hotel in Rome'
      ],
      highlights: [
        'Private romantic Seine River Cruise',
        'Palace of Versailles Guided Tour',
        'Eiffel Tower 3rd (Top) Level Entrance',
        'Full day excitement and thrill at Disneyland® Paris',
        'Jungfraujoch - Top of Europe cogwheel train',
        'Vatican City: Vatican Museums & Sistine Chapel',
        'Venice Gondola Ride & Private Boat Transfers'
      ],
      whyChoose: [
        'Excursion to Jungfraujoch & Mt. Titlis included',
        'All major entrance tickets covered',
        'Expert tour managers and local guides',
        'Indian Jain/Vegetarian/Non-Vegetarian meals'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrive into Paris - the City of Romance, Lights and Glamour',
          description: 'Welcome! Today, we embark on our journey to Paris, a city celebrated for its high fashion, world-famous museums, awe-inspiring landmarks, and captivating cabarets. Upon arrival, you\'ll be warmly welcomed by our Travel Professional, who will guide you to your hotel and provide assistance with the check-in process. Overnight stay at the hotel in Paris. (Dinner)',
          activities: ['Airport Transfer', 'Hotel Check-in', 'Welcome Dinner']
        },
        {
          day: 2,
          title: 'Guided Paris City Tour, Eiffel Tower 3rd Level & Palace of Versailles',
          description: 'Today, we embark on a guided city tour of Paris, where you\'ll have the opportunity to marvel at Place Vendôme, Place de l’Opéra Garnier, Musée d’Orsay, Place de la Concorde, Champs Elysées, Arc de Triomphe, Alexander Bridge, Les Invalides, and more. Following our city exploration, we\'ll ascend to the 3rd Level of the iconic Eiffel Tower (subject to operational status, fallback to 2nd level). Our adventure continues with a visit to the Palace of Versailles, a masterpiece under the French Ministry of Culture. Overnight stay at the hotel in Paris. (Breakfast, Lunch, Dinner)',
          activities: ['Paris City Tour', 'Eiffel Tower 3rd Level', 'Palace of Versailles Visit']
        },
        {
          day: 3,
          title: 'Disneyland® Paris, River Seine Cruise & Paris by Night Tour',
          description: 'Spend an exciting day at Disneyland® Paris, choosing between Disney Park or Walt Disney Studios Park to enjoy thrilling rides, shows, and street parades. Later, treat yourself to a romantic cruise along the Seine River, gliding under historic bridges with views of Notre Dame and Eiffel Tower. Complete the evening with a Paris by Night Tour to witness the City of Light in all its night-time splendour. Overnight stay at the hotel in Paris. (Breakfast, Lunch, Dinner)',
          activities: ['Disneyland Paris', 'Seine River Cruise', 'Paris by Night Tour']
        },
        {
          day: 4,
          title: 'Onto Brussels: Grand Place, Manneken Pis & Mini Europe',
          description: 'Travel to Brussels, capital of Belgium. Visit the Grand Place, widely regarded as one of Europe\'s most beautiful squares, to see the medieval Town Hall and the famous Manneken Pis statue. Next, visit Mini Europe, a miniature park showcasing over 350 European monuments reproduced in fine detail. Overnight stay at the hotel in Netherlands. (Breakfast, Lunch, Dinner)',
          activities: ['Brussels City Tour', 'Grand Place', 'Manneken Pis', 'Mini Europe Entrance']
        },
        {
          day: 5,
          title: 'Keukenhof Gardens (till 10th May) / Dutch Village (from 11th May), Amsterdam Canal Cruise, Drive to Germany',
          description: 'Travel to Lisse to visit the Keukenhof Gardens (until 10th May) showcasing tulips, daffodils, and hyacinths. From 11th May, visit a charming traditional Dutch village near Amsterdam with windmills and wooden houses. Continue to Amsterdam for a glass-topped canal cruise. Later, drive to your hotel in the Frankfurt area. Overnight stay at the hotel in Germany. (Breakfast, Lunch, Dinner)',
          activities: ['Keukenhof or Dutch Village', 'Amsterdam Canal Cruise', 'Drive to Frankfurt']
        },
        {
          day: 6,
          title: 'Heidelberg Altstadt, Black Forest Cuckoo Clocks, Rhine Falls Boat Ride & Switzerland',
          description: 'Drive to Heidelberg Altstadt (Old Town) stretching along the Neckar River and see the Church of the Holy Spirit. Next, visit the heart of the Black Forest for a traditional cuckoo clock demonstration. Later, explore the magnificent Rhine Falls, Europe\'s largest waterfall, with a boat ride. Continue to Switzerland. Overnight stay in Central Switzerland. (Breakfast, Lunch, Dinner)',
          activities: ['Heidelberg Walking Tour', 'Black Forest Cuckoo Clocks', 'Rhine Falls Boat Ride']
        },
        {
          day: 7,
          title: 'Jungfraujoch - Top of Europe & Scenic Interlaken',
          description: 'Embark on an alpine journey to Jungfraujoch. Grindelwald Terminal serves as our starting point, taking the state-of-the-art Eiger Express 3S-Bahn to Eigergletscher station, followed by a cogwheel train to the highest railway station in Europe at 11,333 feet. Visit the Ice Palace and Sphinx Observatory. Later, explore Interlaken. Overnight stay in Central Switzerland. (Breakfast, Lunch, Dinner)',
          activities: ['Eiger Express Ride', 'Jungfraujoch Cogwheel Train', 'Ice Palace & Sphinx', 'Interlaken Free Time']
        },
        {
          day: 8,
          title: 'Mt. Titlis Cable Cars & Rotair, Lucerne Orientation, Lindt Home of Chocolate',
          description: 'Exhilarating trip to Mt. Titlis (3,020m) by revolving cable car (Rotair) and walk the Titlis Cliff Walk suspension bridge. Later, enjoy Lucerne orientation tour (Lion Monument, Kapellbrücke). Conclude with a visit to the Lindt Home of Chocolate in Zurich. Overnight stay in Central Switzerland. (Breakfast, Lunch, Dinner)',
          activities: ['Rotair Revolving Cable Car', 'Titlis Cliff Walk', 'Lucerne Walking Tour', 'Lindt Chocolate Museum']
        },
        {
          day: 9,
          title: 'Vaduz Train Ride (Liechtenstein), Swarovski Crystal Museum & Innsbruck (Austria)',
          description: 'Drive to Vaduz, capital of the Principality of Liechtenstein, and take a guided mini train ride. Next, explore Swarovski Crystal Worlds in Wattens. Proceed to Innsbruck for orientation tour (Maria Theresien Strasse and the Golden Roof). Overnight stay in Innsbruck/Seefeld. (Breakfast, Lunch, Dinner)',
          activities: ['Vaduz Mini Train', 'Swarovski Crystal Worlds', 'Innsbruck Orientation']
        },
        {
          day: 10,
          title: 'Venice: Private Boat, St. Mark\'s Square & Gondola Ride',
          description: 'Travel to Venice. Board private boat to St. Mark\'s Square. View St. Mark\'s Basilica, Bell Tower, Clock Tower, and the Bridge of Sighs. Experience a classic Venetian Gondola ride through picturesque waterways. Overnight stay in Padova/Bologna/Ferrara. (Breakfast, Lunch, Dinner)',
          activities: ['Venice Boat Transfer', 'St. Mark\'s Square Tour', 'Venetian Gondola Ride']
        },
        {
          day: 11,
          title: 'Guided Florence City Tour & Leaning Tower of Pisa',
          description: 'Guided tour of Florence with a local guide. View the Duomo, Campanile, Baptistery, and Piazza Della Signoria. Proceed to Pisa to see the Square of Miracles and Leaning Tower of Pisa. Overnight stay in Tuscany region. (Breakfast, Lunch, Dinner)',
          activities: ['Florence Guided Tour', 'Piazza Della Signoria', 'Pisa Leaning Tower Photo-stop']
        },
        {
          day: 12,
          title: 'Vatican City, Sistine Chapel, St. Peter\'s Basilica & Rome Sights',
          description: 'Travel to Rome. Visit Vatican City, the Vatican Museums, the Sistine Chapel (Michelangelo\'s Last Judgement), and St. Peter\'s Basilica. Orientation tour of Rome including Colosseum (exterior), Trevi Fountain, Roman Forum, and Victor Emmanuel Monument. Overnight stay in Rome. (Breakfast, Lunch, Dinner)',
          activities: ['Vatican Museums Entrance', 'Sistine Chapel & St. Peter\'s', 'Colosseum & Trevi Fountain']
        },
        {
          day: 13,
          title: 'Departure: Fly Back Home',
          description: 'Check out from your hotel and transfer to the airport carrying pleasant memories of your European journey. Safe travels! (Breakfast)',
          activities: ['Hotel Check-out', 'Airport Transfer']
        }
      ],
      inclusions: [
        'Accommodation in B&B / Millennium CDG Paris, Ramada / Amrath Netherlands, Intercity / Elaya Germany, La Maison / Radisson Central Switzerland, Alpenkoning / Hocheder Innsbruck, Four Points Padova/Ferrara, Park / Le Fonti Tuscany, SHG / Selene Rome',
        'Daily Continental buffet breakfast, 11 Indian Jain/Vegetarian lunches, 12 Indian Jain/Vegetarian/Non-Vegetarian dinners',
        'Eiffel Tower 3rd level tickets (fallback to 2nd level if closed), Versailles Palace guided tour',
        'Disneyland® Paris entrance (Disney Park or Walt Disney Studios Park), Seine River Cruise, Paris by Night Tour',
        'Mini Europe entrance in Brussels, Keukenhof entrance (till 10th May), Amsterdam Canal Cruise',
        'Rhine Falls boat ride, Excursion to Jungfraujoch - Top of Europe, Mt. Titlis cable car & Cliff Walk',
        'Lindt Home of Chocolate, Vaduz train ride, Swarovski Crystal Museum, Venice boat & Gondola ride',
        'Florence guided city tour, Rome orientation tour, Vatican Museums & Sistine Chapel',
        'Services of our Tour Manager or local representatives'
      ],
      exclusions: [
        'Airfare, Passport, POE, Visa fees, and Travel Insurance',
        'Personal expenses (laundry, minibar, phone calls, alcohol, porterage)',
        'Any extra meals or activities not included in the regular menus',
        'GST, TCS, and other taxes as applicable',
        'Anything which is not specified in the Itinerary'
      ],
      bookingInfo: [
        'Booking subject to RBI / Government regulations',
        'No refunds for unutilized services',
        'Land surcharges applicable on certain departure dates',
        '50% advance payment required to confirm booking'
      ],
      relatedPackages: [
        {
          id: 'corporate-trips',
          title: 'Corporate Retreats',
          description: 'Team building and corporate events',
          image: '/images/package-corporate.jpg',
          price: '15,000',
          duration: '3 Days'
        },
        {
          id: 'adventure-tours',
          title: 'Adventure Tours',
          description: 'Thrilling expeditions for adrenaline seekers',
          image: '/images/package-adventure.jpg',
          price: '20,000',
          duration: '5 Days'
        }
      ]
    },
    'grand-wonders-of-europe-16-days': {
      title: 'Grand Wonders of Europe 16 Days',
      category: 'Group Adventures',
      description: 'Explore the UK, France, Belgium, Netherlands, Germany, Switzerland, Liechtenstein, Austria, Italy, and Vatican City in one epic 16-day grand tour.',
      heroImage: '/images/package-adventure.jpg',
      duration: '16 Days',
      groupSize: '15-40 People',
      location: 'Multiple Countries (Europe)',
      price: '3,71,000',
      bestTime: 'May - October',
      overview: 'Experience the ultimate grand tour of Europe. From the London Eye in the UK to the canals of Amsterdam, Jungfraujoch Top of Europe, Mt. Titlis Cliff Walk, Venice Gondola, Vatican Museums, and Colosseum. Fully managed premium group trip.',
      stays: [
        '03 Nights accommodation in Atrium / Courtyard by Mariott LHR / Sheraton Skyline or similar Hotel in London',
        '03 Nights accommodation in B&B / Millennium CDG or similar hotel in Paris',
        '01 Night accommodation in Amrath / Van der Valk or similar hotel in Netherlands',
        '01 Night accommodation in Intercity / Elaya or similar hotel in Germany',
        '03 Nights accommodation in La Maison / Radisson or similar hotel in Central Switzerland',
        '01 Night accommodation in Alpenkoning / Hocheder or similar hotel in Innsbruck / Seefeld',
        '01 Night accommodation in Four Points by Sheraton / Blue Dream or similar hotel in Padova / Ferrara',
        '01 Night accommodation in Park / Le Fonti or similar hotel in Tuscany',
        '01 Night accommodation in SHG / Selene / Simon or similar hotel in Rome'
      ],
      highlights: [
        'London Eye Ride & Madame Tussauds Wax Museum',
        'Lord\'s Cricket Ground & Tower of London Entrance',
        'Highspeed Eurostar Train from London to Paris',
        'Eiffel Tower 3rd Level & Versailles Palace Guided Tour',
        'Jungfraujoch - Top of Europe & Mount Titlis Rotair',
        'Venice Private Boat & Classic Gondola Ride',
        'Vatican Museums, Sistine Chapel & Colosseum'
      ],
      whyChoose: [
        'Highspeed Eurostar Train London to Paris included',
        'Jungfraujoch & Mt. Titlis revolving cable cars included',
        'Expert tour managers and local guides throughout',
        'Daily Continental breakfast & Indian Jain/Veg lunches/dinners'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrive into London - Capital of England and the United Kingdom',
          description: 'Welcome to London! Upon arrival, you\'ll be warmly welcomed by our Tour Manager and guided to your hotel for a smooth check-in process. Spend the rest of the day unwinding and enjoying the comforts of your accommodation. Overnight stay at the hotel in London. (Dinner)',
          activities: ['Airport Transfer', 'Hotel Check-in', 'Welcome Dinner']
        },
        {
          day: 2,
          title: 'Guided London City Tour, Changing of Guards, Madame Tussauds, London Eye & Thames Cruise',
          description: 'Explore London\'s iconic landmarks with our local guide: Big Ben, Parliament, Westminster Abbey, Trafalgar Square, Piccadilly Circus, Tower Bridge, and Hyde Park. Witness Changing of the Guards at Buckingham Palace (subject to operation). Visit Madame Tussauds Wax Museum, ride the 135m tall London Eye overlooking the river Thames, and enjoy a scenic Thames River Cruise. Overnight stay at the hotel in London. (Breakfast, Lunch, Dinner)',
          activities: ['London City Tour', 'Madame Tussauds Entrance', 'London Eye Ride', 'Thames River Cruise']
        },
        {
          day: 3,
          title: 'Lord\'s Cricket Ground (Home of Cricket), Tower of London & Oxford Street Shopping',
          description: 'Go behind the scenes at the legendary Lord\'s Cricket Ground (or Oval Cricket Ground if matches are scheduled). See the Grade II* Victorian Pavilion, Long Room, dressing rooms, and MCC Museum. Later, visit the historic Tower of London (UNESCO Site) to marvel at the Crown Jewels and the Kohinoor diamond. Spend the evening shopping at Oxford Street. Overnight stay at the hotel in London. (Breakfast, Lunch, Dinner)',
          activities: ['Lord\'s Cricket Ground Tour', 'Tower of London Entrance', 'Oxford Street Free Time']
        },
        {
          day: 4,
          title: 'Proceed to Paris via High-Speed Eurostar Train',
          description: 'Board the high-speed Eurostar train connecting London to Paris through the Channel Tunnel, enjoying the English and French countryside en route. Arrive in the fashionable city of Paris, check in at the hotel, and relax. Overnight stay at the hotel in Paris. (Breakfast, Packed Lunch, Dinner)',
          activities: ['Eurostar Train Journey', 'Paris Hotel Check-in', 'Group Dinner']
        },
        {
          day: 5,
          title: 'Guided Paris City Tour, Eiffel Tower 3rd Level, Palace of Versailles & Seine River Cruise',
          description: 'Embark on a guided tour of Paris (Place Vendôme, Opéra Garnier, Musée d’Orsay, Place de la Concorde, Champs Elysées, Arc de Triomphe). Ascend to the 3rd Level of the Eiffel Tower for panoramic views. Visit the spectacular Palace of Versailles. Conclude with a romantic Seine River Cruise and a Paris by Night Tour to witness the City of Light illuminated. Overnight stay at the hotel in Paris. (Breakfast, Lunch, Dinner)',
          activities: ['Paris Guided Tour', 'Eiffel Tower 3rd Level', 'Palace of Versailles Visit', 'River Seine Cruise']
        },
        {
          day: 6,
          title: 'Full Day Excitement at Disneyland® Paris',
          description: 'Indulge in a full day of excitement at Disneyland® Paris. Choose between Disney® Park (fairy tales across five realms) or Walt Disney Studios® Park (behind-the-scenes movie sets and stunt performances). Overnight stay at the hotel in Paris. (Breakfast, Packed Lunch, Dinner)',
          activities: ['Disneyland Paris Tickets', 'Theme Park Rides & Shows']
        },
        {
          day: 7,
          title: 'Onto Brussels: Grand Place, Manneken Pis & Mini Europe',
          description: 'Travel to Brussels, capital of Belgium. Visit the Grand Place (medieval Town Hall), the famous Manneken Pis statue, and Mini Europe, a miniature park showcasing over 350 European monuments reproduced in fine detail. Overnight stay at the hotel in Netherlands. (Breakfast, Lunch, Dinner)',
          activities: ['Brussels Orientation', 'Grand Place & Manneken Pis', 'Mini Europe Entrance']
        },
        {
          day: 8,
          title: 'Keukenhof Gardens (till 10th May) / Dutch Village (from 11th May), Amsterdam Canal Cruise, Drive to Germany',
          description: 'Visit Keukenhof Gardens (until May 10th) showcasing colorful tulips, daffodils, and hyacinths. From May 11th, visit a traditional Dutch village near Amsterdam with windmills and artisan workshops. Next, embark on a glass-topped Amsterdam Canal Cruise. Later, drive to your hotel in the Frankfurt area. Overnight stay at the hotel in Germany. (Breakfast, Lunch, Dinner)',
          activities: ['Keukenhof or Dutch Village', 'Amsterdam Canal Cruise', 'Drive to Frankfurt']
        },
        {
          day: 9,
          title: 'Heidelberg Altstadt, Black Forest Cuckoo Clock Demo, Rhine Falls Boat Ride & Switzerland',
          description: 'Explore Heidelberg Altstadt (Old Town) and the Church of the Holy Spirit. Next, visit the heart of the Black Forest for a cuckoo clock demonstration. Later, explore the magnificent Rhine Falls with a boat ride. Continue your scenic drive to Switzerland. Overnight stay in Central Switzerland. (Breakfast, Lunch, Dinner)',
          activities: ['Heidelberg Walking Tour', 'Black Forest Demonstration', 'Rhine Falls Boat Ride']
        },
        {
          day: 10,
          title: 'Jungfraujoch - Top of Europe & Scenic Interlaken',
          description: 'Take the Eiger Express 3S-Bahn from Grindelwald Terminal to Eigergletscher, then ride the cogwheel train to Jungfraujoch (highest railway station in Europe at 11,333 feet). Explore the Ice Palace and Sphinx Observatory. Later, explore Interlaken. Overnight stay in Central Switzerland. (Breakfast, Lunch, Dinner)',
          activities: ['Eiger Express Ride', 'Jungfraujoch Cogwheel Train', 'Sphinx Observatory', 'Interlaken Tour']
        },
        {
          day: 11,
          title: 'Mt. Titlis Cable Cars & Rotair, Lucerne Orientation, Lindt Home of Chocolate',
          description: 'Exhilarating trip to the summit of Mt. Titlis (3,020m) by revolving cable car (Rotair) and walk the Titlis Cliff Walk suspension bridge. Later, enjoy a Lucerne orientation tour (Lion Monument, Kapellbrücke). Conclude with a visit to the Lindt Home of Chocolate in Zurich. Overnight stay in Central Switzerland. (Breakfast, Lunch, Dinner)',
          activities: ['Mt. Titlis Rotair Cable Car', 'Titlis Cliff Walk', 'Lucerne Orientation', 'Lindt Chocolate Museum']
        },
        {
          day: 12,
          title: 'Vaduz Train Ride (Liechtenstein), Swarovski Crystal Museum & Innsbruck (Austria)',
          description: 'Scenic drive to Vaduz, capital of Liechtenstein, for a mini train ride. Next, explore Swarovski Crystal Worlds in Wattens. Proceed to Innsbruck to see the Maria Theresien Strasse and Golden Roof. Overnight stay in Innsbruck/Seefeld. (Breakfast, Lunch, Dinner)',
          activities: ['Vaduz Mini Train', 'Swarovski Crystal Worlds', 'Innsbruck Orientation']
        },
        {
          day: 13,
          title: 'Venice: Private Boat, St. Mark\'s Square & Gondola Ride',
          description: 'Travel to Venice. Board a private boat to St. Mark\'s Square. View St. Mark\'s Basilica, Bell Tower, Clock Tower, and the Bridge of Sighs. Experience a classic Venetian Gondola ride through picturesque waterways. Overnight stay in Padova/Ferrara. (Breakfast, Lunch, Dinner)',
          activities: ['Venice Boat Transfer', 'St. Mark\'s Square Sights', 'Venetian Gondola Ride']
        },
        {
          day: 14,
          title: 'Guided Florence City Tour & Leaning Tower of Pisa',
          description: 'Guided tour of Florence with a local guide. View the Duomo, Campanile, Baptistery, and Piazza Della Signoria. Proceed to Pisa to see the Square of Miracles and Leaning Tower of Pisa. Overnight stay in Tuscany region. (Breakfast, Lunch, Dinner)',
          activities: ['Florence Walking Tour', 'Piazza Della Signoria', 'Pisa Leaning Tower Photo-stop']
        },
        {
          day: 15,
          title: 'Vatican City, Sistine Chapel, St. Peter\'s Basilica & Rome Sights',
          description: 'Travel to Rome. Visit Vatican City, the Vatican Museums, the Sistine Chapel (Michelangelo\'s Last Judgement), and St. Peter\'s Basilica. Orientation tour of Rome including Colosseum (exterior), Trevi Fountain, Roman Forum, and Victor Emmanuel Monument. Overnight stay in Rome. (Breakfast, Lunch, Dinner)',
          activities: ['Vatican Museums & Sistine Chapel', 'St. Peter\'s Basilica Visit', 'Colosseum & Trevi Fountain Sights']
        },
        {
          day: 16,
          title: 'Departure: Fly Back Home',
          description: 'Check out from your hotel and transfer to the airport carrying pleasant memories of your European journey. Safe travels! (Breakfast)',
          activities: ['Hotel Check-out', 'Airport Transfer']
        }
      ],
      inclusions: [
        'Accommodation in Atrium / Courtyard LHR / Sheraton Skyline London, B&B / Millennium CDG Paris, Amrath / Van der Valk Netherlands, Intercity / Elaya Germany, La Maison / Radisson Central Switzerland, Alpenkoning / Hocheder Innsbruck, Four Points Padova/Ferrara, Park / Le Fonti Tuscany, SHG / Selene Rome',
        'Eurostar high-speed train tickets from London to Paris',
        'Daily Continental buffet breakfast, 14 Indian Jain/Vegetarian lunches, 15 Indian Jain/Vegetarian/Non-Vegetarian dinners',
        'London Eye, Madame Tussauds, Lord\'s Cricket Ground, Tower of London, Thames River Cruise',
        'Eiffel Tower 3rd level tickets (fallback to 2nd level if closed), Versailles Palace guided tour, Seine Cruise',
        'Disneyland® Paris entrance (Disney Park or Walt Disney Studios Park), Paris by Night Tour',
        'Mini Europe in Brussels, Keukenhof entrance (till 10th May), Amsterdam Canal Cruise',
        'Rhine Falls boat ride, Excursion to Jungfraujoch - Top of Europe, Mt. Titlis revolving Rotair & Cliff Walk',
        'Lindt Home of Chocolate, Vaduz train ride, Swarovski Crystal Museum, Venice boat & Gondola ride',
        'Florence guided city tour, Rome orientation tour, Vatican Museums & Sistine Chapel',
        'Services of our Tour Manager or local representatives'
      ],
      exclusions: [
        'Airfare, Passport, POE, Visa fees, and Travel Insurance',
        'Personal expenses (laundry, minibar, phone calls, alcohol, porterage)',
        'Any extra meals or activities not included in the regular menus',
        'GST, TCS, and other taxes as applicable',
        'Anything which is not specified in the Itinerary'
      ],
      bookingInfo: [
        'Booking subject to RBI / Government regulations',
        'No refunds for unutilized services',
        'Land surcharges applicable on certain departure dates',
        '50% advance payment required to confirm booking'
      ],
      relatedPackages: [
        {
          id: 'corporate-trips',
          title: 'Corporate Retreats',
          description: 'Team building and corporate events',
          image: '/images/package-corporate.jpg',
          price: '15,000',
          duration: '3 Days'
        },
        {
          id: 'adventure-tours',
          title: 'Adventure Tours',
          description: 'Thrilling expeditions for adrenaline seekers',
          image: '/images/package-adventure.jpg',
          price: '20,000',
          duration: '5 Days'
        }
      ]
    }
  }

  // Return dummy content for ANY package ID to prevent "Package Not Found"
  return packages[id as keyof typeof packages] || {
    ...packages['honeymoon-trips'],
    title: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' Package',
  }
}