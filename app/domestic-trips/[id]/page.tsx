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
  Building
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
  'kashmir-valley': {
    id: 'kashmir-valley',
    title: 'Kashmir Valley Escape',
    location: 'Kashmir, North India',
    description: 'Experience the paradise on earth with houseboat stays, shikara rides, and breathtaking landscapes of the Himalayas. This comprehensive tour takes you through the most beautiful valleys and lakes of Kashmir.',
    image: '/images/hero-destination.jpg',
    duration: '7 Days / 6 Nights',
    groupSize: '8-12 people',
    nextDate: 'Dec 15, 2024',
    price: '₹45,000',
    rating: 4.8,
    reviews: 127,
    type: 'north',
    highlights: [
      'Houseboat stay on Dal Lake',
      'Shikara ride at sunrise',
      'Gulmarg gondola ride',
      'Pahalgam valley exploration',
      'Mughal gardens tour',
      'Local cuisine experience'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Srinagar',
        description: 'Welcome to the beautiful valley of Kashmir! Upon arrival at Srinagar airport, you will be greeted by our representative and transferred to your hotel. Enjoy a relaxed evening with a traditional Kashmiri welcome dinner.',
        activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner', 'City orientation'],
        meals: ['Dinner'],
        accommodation: 'Deluxe Hotel in Srinagar'
      },
      {
        day: 2,
        title: 'Srinagar Sightseeing',
        description: 'Today we explore the crown jewels of Srinagar - the Mughal Gardens. Visit Shalimar Bagh, Nishat Bagh, and Chashme Shahi. In the afternoon, enjoy a shikara ride on the iconic Dal Lake.',
        activities: ['Mughal Gardens tour', 'Shikara ride on Dal Lake', 'Floating vegetable market visit', 'Local handicraft shopping'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Deluxe Hotel in Srinagar'
      },
      {
        day: 3,
        title: 'Houseboat Experience',
        description: 'Transfer to a traditional houseboat on Dal Lake. Experience the unique lifestyle of living on water while enjoying the serene beauty of the lake. Evening cultural performance onboard.',
        activities: ['Houseboat check-in', 'Lake exploration', 'Cultural performance', 'Sunset viewing'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Luxury Houseboat on Dal Lake'
      },
      {
        day: 4,
        title: 'Gulmarg Adventure',
        description: 'Drive to Gulmarg, the meadow of flowers. Take the gondola ride to Kongdoori Mountain for panoramic views. Enjoy skiing (seasonal) or simply walk through the lush meadows.',
        activities: ['Drive to Gulmarg', 'Gondola ride', 'Meadow walks', 'Photography session', 'Local pony ride'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Mountain Resort in Gulmarg'
      },
      {
        day: 5,
        title: 'Pahalgam Valley',
        description: 'Journey to Pahalgam, known as the valley of shepherds. Visit Betaab Valley, Chandanwari, and Aru Valley. Enjoy the pristine beauty and adventure activities.',
        activities: ['Drive to Pahalgam', 'Betaab Valley visit', 'Aru Valley exploration', 'River rafting (optional)', 'Bonfire evening'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Valley Resort in Pahalgam'
      },
      {
        day: 6,
        title: 'Sonamarg & Return',
        description: 'Visit Sonamarg, the meadow of gold, and explore the Thajiwas Glacier. Return to Srinagar with memories of a lifetime. Farewell dinner with traditional Kashmiri music.',
        activities: ['Drive to Sonamarg', 'Glacier visit', 'Photography', 'Return to Srinagar', 'Farewell dinner'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Deluxe Hotel in Srinagar'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'After breakfast, transfer to the airport for your onward journey. Carry sweet memories of Kashmir with you!',
        activities: ['Breakfast', 'Airport transfer'],
        meals: ['Breakfast'],
        accommodation: 'No accommodation'
      }
    ],
    inclusions: [
      'Accommodation in deluxe hotels & houseboat',
      'Daily breakfast, lunch & dinner',
      'All transportation by AC vehicle',
      'English speaking guide',
      'All entry fees & permits',
      'Shikara ride on Dal Lake',
      'Gondola ride in Gulmarg',
      'Cultural performances',
      'Airport transfers',
      '24/7 support'
    ],
    exclusions: [
      'International airfare',
      'Personal expenses',
      'Travel insurance',
      'Tips & gratuities',
      'Additional activities',
      'Medical expenses',
      'Anything not mentioned in inclusions'
    ],
    accommodation: 'Deluxe hotels and traditional houseboat with modern amenities',
    transportation: 'AC Tempo Traveller/Similar for sightseeing, Airport transfers included',
    meals: 'Daily breakfast, lunch & dinner (vegetarian/non-vegetarian options available)',
    difficulty: 'Easy to Moderate',
    bestTime: 'April to October',
    ageGroup: 'All ages (5+ years)'
  }
}

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const trip = tripDetails[params.id] || tripDetails['kashmir-valley']
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/domestic-trips" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition">
          <ArrowLeft className="w-4 h-4" />
          Back to Domestic Trips
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
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {trip.type.charAt(0).toUpperCase() + trip.type.slice(1)} India
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
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
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
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
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
                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
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
                      <li>• Booking confirmation requires 50% advance payment</li>
                      <li>• Full payment due 30 days before departure</li>
                      <li>• Cancellation charges apply as per policy</li>
                      <li>• Travel insurance is recommended</li>
                      <li>• Minimum group size: 6 people</li>
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
                          <a href="mailto:bookings@travelcastle.in" className="hover:text-primary transition">bookings@travelcastle.in</a>
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
    title: 'Rajasthan Royal Heritage',
    location: 'Rajasthan, West India',
    price: '₹42,000',
    duration: '8 Days',
    image: '/images/package-adventure.jpg'
  },
  {
    title: 'Kerala Backwaters',
    location: 'Kerala, South India',
    price: '₹38,000',
    duration: '6 Days',
    image: '/images/package-honeymoon.jpg'
  },
  {
    title: 'Goa Beach Paradise',
    location: 'Goa, West India',
    price: '₹35,000',
    duration: '5 Days',
    image: '/images/package-bachelor.jpg'
  }
]