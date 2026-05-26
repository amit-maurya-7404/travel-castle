'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
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
  Heart,
  Share2,
  Camera,
  Utensils,
  Car,
  Hotel,
  Mountain,
  Waves,
  TreePine,
  Building,
  Plane
} from 'lucide-react'
import Link from 'next/link'

interface TripDetail {
  id: string
  title: string
  location: string
  description: string
  image: string
  duration: string
  groupSize: string
  nextDate: string
  price: string
  rating: number
  reviews: number
  type: string
  highlights: string[]
  itinerary: DayItinerary[]
  inclusions: string[]
  exclusions: string[]
  accommodation: string
  transportation: string
  meals: string
  difficulty: string
  bestTime: string
  ageGroup: string
  visa: string
  flights: string
}

interface DayItinerary {
  day: number
  title: string
  description: string
  activities: string[]
  meals: string[]
  accommodation: string
}

const tripDetails: Record<string, TripDetail> = {
  'bali-paradise': {
    id: 'bali-paradise',
    title: 'Bali Paradise Escape',
    location: 'Bali, Indonesia',
    description: 'Tropical beaches, ancient temples, rice terraces, and vibrant culture in the Island of Gods. Experience the perfect blend of relaxation and adventure in this Indonesian paradise.',
    image: '/images/package-family.jpg',
    duration: '8 Days / 7 Nights',
    groupSize: '10-15 people',
    nextDate: 'Dec 20, 2024',
    price: '₹85,000',
    rating: 4.9,
    reviews: 203,
    type: 'asia',
    highlights: [
      'Private villa stays with ocean views',
      'Sunrise at Mount Batur',
      'Traditional Balinese cooking class',
      'Rice terrace tours in Ubud',
      'Spa treatments with local herbs',
      'Beach hopping in Nusa Dua',
      'Temple ceremonies experience',
      'Dolphin watching tour'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bali',
        description: 'Welcome to Bali! Upon arrival at Ngurah Rai International Airport, our representative will greet you and transfer you to your beachfront resort in Nusa Dua.',
        activities: ['Airport pickup', 'Welcome briefing', 'Beach relaxation', 'Sunset dinner'],
        meals: ['Dinner'],
        accommodation: 'Beachfront Resort in Nusa Dua'
      },
      {
        day: 2,
        title: 'Uluwatu & Kecak Dance',
        description: 'Explore the southern tip of Bali with stunning cliffside temples and beaches. Witness the famous Kecak fire dance performance at sunset.',
        activities: ['Uluwatu Temple visit', 'Kecak dance show', 'Beach time', 'Seafood dinner'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Beachfront Resort in Nusa Dua'
      },
      {
        day: 3,
        title: 'Ubud Cultural Experience',
        description: 'Journey to Ubud, the cultural heart of Bali. Visit the Monkey Forest, explore rice terraces, and experience traditional Balinese life.',
        activities: ['Drive to Ubud', 'Sacred Monkey Forest', 'Rice terrace walk', 'Art market visit', 'Traditional dance show'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Boutique Hotel in Ubud'
      },
      {
        day: 4,
        title: 'Mount Batur Sunrise Trek',
        description: 'Early morning trek to Mount Batur for breathtaking sunrise views over the volcanic landscape. Return for a relaxing spa session.',
        activities: ['Sunrise trek (optional)', 'Volcano views', 'Local village visit', 'Balinese spa treatment'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Boutique Hotel in Ubud'
      },
      {
        day: 5,
        title: 'Cooking Class & Art Village',
        description: 'Learn to cook authentic Balinese cuisine with local ingredients. Visit traditional art villages and see craftsmen at work.',
        activities: ['Balinese cooking class', 'Art village tours', 'Wood carving demonstration', 'Batik painting workshop'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Boutique Hotel in Ubud'
      },
      {
        day: 6,
        title: 'Nusa Penida Island Hopping',
        description: 'Take a speedboat to Nusa Penida for crystal clear waters, limestone cliffs, and pristine beaches. Snorkel in coral gardens.',
        activities: ['Speedboat to Nusa Penida', 'Crystal Bay visit', 'Angel\'s Billabong', 'Snorkeling', 'Beach relaxation'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Beachfront Resort in Nusa Dua'
      },
      {
        day: 7,
        title: 'Water Sports & Leisure',
        description: 'Enjoy water sports and leisure activities in Nusa Dua. Optional dolphin watching tour or simply relax by the pool.',
        activities: ['Water sports (banana boat, parasailing)', 'Dolphin watching (optional)', 'Pool time', 'Shopping at beach markets'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Beachfront Resort in Nusa Dua'
      },
      {
        day: 8,
        title: 'Departure',
        description: 'After breakfast, transfer to the airport for your flight home. Carry beautiful memories of Bali with you!',
        activities: ['Breakfast', 'Airport transfer'],
        meals: ['Breakfast'],
        accommodation: 'No accommodation'
      }
    ],
    inclusions: [
      'Return international flights from major Indian cities',
      'Airport transfers and transportation',
      '7 nights accommodation in beachfront resorts',
      'Daily breakfast, lunch & dinner',
      'English speaking guide throughout',
      'All temple entry fees & permits',
      'Speedboat to Nusa Penida',
      'Balinese cooking class',
      'Spa treatment session',
      '24/7 support during trip'
    ],
    exclusions: [
      'Visa fees (ETA visa on arrival)',
      'Travel insurance',
      'Personal expenses',
      'Tips & gratuities',
      'Additional activities',
      'Medical expenses',
      'Anything not mentioned in inclusions'
    ],
    accommodation: 'Beachfront resorts and boutique hotels with Balinese architecture',
    transportation: 'AC coaches for sightseeing, speedboats for island transfers',
    meals: 'Daily breakfast, lunch & dinner with local and international cuisine',
    difficulty: 'Easy to Moderate',
    bestTime: 'April to September',
    ageGroup: 'All ages (8+ years)',
    visa: 'ETA visa on arrival (approx. $80)',
    flights: 'Direct flights from Delhi/Mumbai/Bangalore'
  }
}

export default function InternationalTripDetailPage({ params }: { params: { id: string } }) {
  const trip = tripDetails[params.id] || tripDetails['bali-paradise']
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/international-trips" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition">
          <ArrowLeft className="w-4 h-4" />
          Back to International Trips
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {trip.type.charAt(0).toUpperCase() + trip.type.slice(1)}
              </Badge>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(trip.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/50'}`} />
                ))}
                <span className="text-white/80 text-sm ml-1">({trip.reviews} reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{trip.title}</h1>
            <div className="flex items-center gap-2 text-white/90 mb-4">
              <MapPin className="w-5 h-5" />
              <span>{trip.location}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-white/80">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{trip.groupSize}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Next: {trip.nextDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Plane className="w-4 h-4" />
                <span>{trip.flights}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price & Booking CTA */}
      <section className="bg-primary text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-3xl font-bold mb-1">{trip.price}</div>
              <div className="text-primary-foreground/80">per person (including all taxes)</div>
            </div>
            <div className="flex gap-4">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Heart className="w-4 h-4 mr-2" />
                Save Trip
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="booking">Booking Info</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Description */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Trip Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{trip.description}</p>

                {/* Highlights */}
                <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {trip.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Facts */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-4 text-center">
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Duration</div>
                  <div className="text-sm text-muted-foreground">{trip.duration}</div>
                </Card>
                <Card className="p-4 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Group Size</div>
                  <div className="text-sm text-muted-foreground">{trip.groupSize}</div>
                </Card>
                <Card className="p-4 text-center">
                  <Mountain className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Difficulty</div>
                  <div className="text-sm text-muted-foreground">{trip.difficulty}</div>
                </Card>
                <Card className="p-4 text-center">
                  <TreePine className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Best Time</div>
                  <div className="text-sm text-muted-foreground">{trip.bestTime}</div>
                </Card>
              </div>

              {/* Visa & Flights Info */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Travel Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Visa Requirements
                    </h4>
                    <p className="text-muted-foreground text-sm">{trip.visa}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Plane className="w-5 h-5 text-primary" />
                      Flights
                    </h4>
                    <p className="text-muted-foreground text-sm">{trip.flights}</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="itinerary" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {trip.itinerary.map((day) => (
                    <AccordionItem key={day.day} value={`day-${day.day}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-4 text-left">
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                            {day.day}
                          </div>
                          <div>
                            <div className="font-semibold">Day {day.day}: {day.title}</div>
                            <div className="text-sm text-muted-foreground">{day.accommodation}</div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <p className="text-muted-foreground mb-4 leading-relaxed">{day.description}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Camera className="w-4 h-4" />
                              Activities
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {day.activities.map((activity, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Utensils className="w-4 h-4" />
                              Meals
                            </h4>
                            <div className="text-sm text-muted-foreground">
                              {day.meals.join(', ')}
                            </div>

                            <h4 className="font-semibold mb-2 mt-4 flex items-center gap-2">
                              <Hotel className="w-4 h-4" />
                              Accommodation
                            </h4>
                            <div className="text-sm text-muted-foreground">
                              {day.accommodation}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </TabsContent>

            <TabsContent value="inclusions" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-green-600">What's Included</h2>
                  <ul className="space-y-3">
                    {trip.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-red-600">What's Excluded</h2>
                  <ul className="space-y-3">
                    {trip.exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Additional Details */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-primary" />
                    Accommodation
                  </h3>
                  <p className="text-muted-foreground text-sm">{trip.accommodation}</p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    Transportation
                  </h3>
                  <p className="text-muted-foreground text-sm">{trip.transportation}</p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-primary" />
                    Meals
                  </h3>
                  <p className="text-muted-foreground text-sm">{trip.meals}</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="booking" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Booking Information</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Important Notes</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Booking confirmation requires 30% advance payment</li>
                      <li>• Full payment due 45 days before departure</li>
                      <li>• International flights included in package</li>
                      <li>• Travel insurance mandatory for international trips</li>
                      <li>• Visa assistance provided</li>
                      <li>• Minimum group size: 8 people</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Contact Us</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
                        <span className="flex flex-col gap-1">
                          <a href="tel:+919809660999" className="hover:text-primary transition">+91-9809660999</a>
                          <a href="tel:+919820702727" className="hover:text-primary transition">+91-9820702727</a>
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary shrink-0" />
                        <span>
                          <a href="mailto:international@travelcastle.in" className="hover:text-primary transition">international@travelcastle.in</a>
                        </span>
                      </div>
                    </div>

                    <Button className="w-full mt-6 bg-primary hover:bg-accent text-white">
                      Book This Trip
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Trips */}
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">You Might Also Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedTrips.map((relatedTrip, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-luxury transition cursor-pointer card-3d group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={relatedTrip.image}
                    alt={relatedTrip.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition">{relatedTrip.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{relatedTrip.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{relatedTrip.price}</span>
                    <span className="text-sm text-muted-foreground">{relatedTrip.duration}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const relatedTrips = [
  {
    title: 'Swiss Alps Adventure',
    location: 'Switzerland, Europe',
    price: '₹1,25,000',
    duration: '7 Days',
    image: '/images/hero-destination.jpg'
  },
  {
    title: 'Japan Cultural Journey',
    location: 'Japan, Asia',
    price: '₹1,45,000',
    duration: '9 Days',
    image: '/images/package-corporate.jpg'
  },
  {
    title: 'Kenya Safari Experience',
    location: 'Kenya, Africa',
    price: '₹1,35,000',
    duration: '9 Days',
    image: '/images/package-adventure.jpg'
  }
]