'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  MapPin,
  Users,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  ArrowLeft,
  Sparkles,
  Download,
  Share2,
  Camera,
  Luggage,
  Navigation,
  MessageCircle,
  Shield
} from 'lucide-react'

export default function PackageDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState('overview')

  // Package details based on ID
  const packageDetails = getPackageDetails(id)

  if (!packageDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Package Not Found</h1>
          <p className="text-muted-foreground mb-8">The package you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-primary hover:bg-accent text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30">

      {/* Premium Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] w-full flex items-end pb-12 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={packageDetails.heroImage}
            alt={packageDetails.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full animate-slide-in-up">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group mb-6 bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-white font-bold uppercase text-xs tracking-widest">{packageDetails.category}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] drop-shadow-2xl tracking-tight">
                {packageDetails.title}
              </h1>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-white shadow-xl">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{packageDetails.groupSize}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-white shadow-xl">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{packageDetails.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-white shadow-xl">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{packageDetails.location}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-6 md:mt-0">
              <Button variant="outline" className="h-14 px-6 rounded-xl border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white/10 font-bold hover:scale-105 transition-all">
                <Share2 className="w-5 h-5 mr-2" /> Share
              </Button>
              <Button className="h-14 px-8 rounded-xl bg-primary hover:bg-accent text-white font-bold shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:scale-105 transition-all">
                <Download className="w-5 h-5 mr-2" /> Download Itinerary
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-[#050505] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Left Content (Tabs & Information) */}
            <div className="w-full lg:w-[65%] xl:w-[70%]">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="sticky top-[72px] z-40 bg-[#050505]/95 backdrop-blur pt-4 pb-4 border-b border-white/10 mb-8">
                  <TabsList className="inline-flex h-14 items-center justify-start rounded-full bg-black/40 border border-white/10 p-1 w-full overflow-x-auto hide-scrollbar">
                    <TabsTrigger value="overview" className="rounded-full px-6 h-12 font-medium text-gray-400 data-[state=active]:bg-primary data-[state=active]:text-black hover:text-white transition-all whitespace-nowrap">Overview</TabsTrigger>
                    <TabsTrigger value="itinerary" className="rounded-full px-6 h-12 font-medium text-gray-400 data-[state=active]:bg-primary data-[state=active]:text-black hover:text-white transition-all whitespace-nowrap">Itinerary</TabsTrigger>
                    <TabsTrigger value="costing" className="rounded-full px-6 h-12 font-medium text-gray-400 data-[state=active]:bg-primary data-[state=active]:text-black hover:text-white transition-all whitespace-nowrap">Costing</TabsTrigger>
                    <TabsTrigger value="other-info" className="rounded-full px-6 h-12 font-medium text-gray-400 data-[state=active]:bg-primary data-[state=active]:text-black hover:text-white transition-all whitespace-nowrap">Other Info</TabsTrigger>
                  </TabsList>
                </div>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-12 animate-fade-in mt-0">
                  <div>
                    <h2 className="text-3xl font-extrabold text-white mb-6">About This Journey</h2>
                    <p className="text-lg text-gray-400 leading-relaxed font-light">{packageDetails.overview}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Trip Highlights</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {packageDetails.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-black/20 p-4 rounded-2xl border border-white/5">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 font-light">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Journey in Frames (Gallery) */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Camera className="w-6 h-6 text-primary" /> Journey in Frames
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="relative h-40 rounded-2xl overflow-hidden group">
                          <Image src={`/images/blog-${(i % 3) + 1}.jpg`} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Itinerary Tab */}
                <TabsContent value="itinerary" className="animate-fade-in mt-0">
                  <h2 className="text-3xl font-extrabold text-white mb-8">Detailed Itinerary</h2>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-primary/20">
                    {packageDetails.itinerary.map((day, idx) => (
                      <div key={idx} className="relative flex items-start gap-6 group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] bg-primary text-black font-bold flex-shrink-0 relative z-10 mt-1 shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]">
                          D{day.day}
                        </div>
                        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-colors">
                          <h3 className="text-xl font-bold text-primary mb-2">{day.title}</h3>
                          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-semibold uppercase tracking-wider">
                            <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> 150 KM</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 HRS</span>
                          </div>
                          <p className="text-gray-400 font-light leading-relaxed mb-4">{day.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {day.activities.map((activity, actIdx) => (
                              <span key={actIdx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">{activity}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Costing Tab */}
                <TabsContent value="costing" className="animate-fade-in space-y-12 mt-0">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><CheckCircle className="text-green-500" /> Inclusions</h3>
                      <ul className="space-y-4">
                        {packageDetails.inclusions.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" /><span className="text-sm text-gray-300">{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><XCircle className="text-red-500" /> Exclusions</h3>
                      <ul className="space-y-4">
                        {packageDetails.exclusions.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-400 flex-shrink-0" /><span className="text-sm text-gray-300">{item}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Upcoming Batches & Costing</h3>
                    <div className="space-y-4">
                      {['May 2026', 'June 2026'].map((month, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                          <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-bold text-primary">{month}</h4>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full uppercase tracking-wider">{idx === 0 ? 'Filling Fast' : 'Available'}</span>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-black/30 p-4 rounded-xl flex justify-between items-center border border-white/5">
                              <span className="text-gray-300">Double Sharing</span>
                              <span className="text-white font-bold text-lg">₹{parseInt(packageDetails.price.replace(/,/g, '')) + 5000}</span>
                            </div>
                            <div className="bg-black/30 p-4 rounded-xl flex justify-between items-center border border-white/5">
                              <span className="text-gray-300">Triple Sharing</span>
                              <span className="text-white font-bold text-lg">₹{packageDetails.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Other Info Tab */}
                <TabsContent value="other-info" className="animate-fade-in space-y-8 mt-0">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Luggage className="text-primary" /> Things to Carry</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {['Valid ID Proof', 'Comfortable Trekking Shoes', 'Warm Layers & Thermals', 'Power Bank', 'Sunscreen & Sunglasses', 'Personal Medications'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Important Policies</h3>
                    <ul className="space-y-4">
                      {packageDetails.bookingInfo.map((info, idx) => (
                        <li key={idx} className="text-gray-400 font-light flex items-start gap-3">
                          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Content (Sticky Sidebar Widget) */}
            <div className="w-full lg:w-[35%] xl:w-[30%]">
              <div className="sticky top-28 space-y-6">

                {/* Costing Widget */}
                <Card className="p-6 bg-white/5 border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden group backdrop-blur-xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-green-400 group-hover:h-2 transition-all duration-300"></div>
                  <div className="mb-6 mt-2">
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-1">Starting from</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-extrabold text-white">₹{packageDetails.price}/-</span>
                    </div>
                    <span className="text-gray-400 text-xs mt-1 block">per person (Triple Sharing)</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl text-sm border border-white/5">
                      <span className="text-gray-400 flex items-center gap-2"><Clock className="w-4 h-4" /> Duration</span>
                      <span className="text-white font-bold">{packageDetails.duration}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl text-sm border border-white/5">
                      <span className="text-gray-400 flex items-center gap-2"><MapPin className="w-4 h-4" /> Pickup/Drop</span>
                      <span className="text-white font-bold">{packageDetails.location}</span>
                    </div>
                  </div>

                  <Button className="w-full h-14 bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:scale-[1.02] transition-transform">
                    Book Now
                  </Button>

                  <div className="text-center mt-4 bg-primary/10 rounded-lg p-2 border border-primary/20">
                    <p className="text-xs text-primary font-bold">
                      *Pay a token amount of ₹5000/- to block your seat.
                    </p>
                  </div>
                </Card>

                {/* Lead Capture Widget */}
                <Card className="p-6 bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 rounded-3xl shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Wanderlust Calling?</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 font-light">Allow our experts to call you back & help you plan!</p>

                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full h-12 px-4 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500" />
                    <input type="tel" placeholder="Phone Number" className="w-full h-12 px-4 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500" />
                    <Button type="button" className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold rounded-xl transition-colors">
                      Send Callback Request
                    </Button>
                  </form>
                </Card>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-110 transition-transform z-50 cursor-pointer">
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* Related Packages - Redesigned */}
      <section className="py-24 bg-gradient-to-b from-[#050505] via-black/40 to-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4">You Might Also <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Love</span></h2>
            <p className="text-lg text-gray-400 font-light">Explore more amazing travel experiences curated for you.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packageDetails.relatedPackages.map((pkg, idx) => (
              <Link key={idx} href={`/packages/${pkg.id}`} className="block">
                <Card className="relative overflow-hidden border-0 bg-transparent h-[350px] flex flex-col group cursor-pointer shadow-2xl rounded-3xl">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {pkg.title}
                    </h3>
                    <div className="flex justify-between items-end mt-2">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Starting at</p>
                        <span className="text-primary font-extrabold text-xl">₹{pkg.price}</span>
                      </div>
                      <span className="text-sm font-medium text-white/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                        {pkg.duration}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
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
    }
  }

  // Return dummy content for ANY package ID to prevent "Package Not Found"
  return packages[id as keyof typeof packages] || {
    ...packages['honeymoon-trips'],
    title: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' Package',
  }
}