import { connectDB } from '@/lib/mongodb'
import { Package, Blog, Review, Gallery } from '@/lib/models'
import { NextResponse } from 'next/server'

const DUMMY_PACKAGES = [
  {
    title: 'Best of Europe',
    description: 'Arrive into Paris - the City of Romance, Lights and Glamour. Explore 13 days of Europe highlights covering France, Belgium, Netherlands, Germany, Switzerland, Liechtenstein, Austria, Italy and Vatican City.',
    category: 'adventure',
    type: 'international',
    image: '/images/package-adventure.jpg',
    duration: '12N/13D',
    price: 300000,
    published: true,
  },
  {
    title: 'Grand Wonders of Europe',
    description: 'Embark on a spectacular 16-day journey across the United Kingdom, France, Belgium, Netherlands, Germany, Switzerland, Liechtenstein, Austria, Italy, and Vatican City.',
    category: 'adventure',
    type: 'international',
    image: '/images/package-adventure.jpg',
    duration: '15N/16D',
    price: 371000,
    published: true,
  }
]

const DUMMY_BLOGS = [
  {
    title: 'Hidden Gems of Mountain Valleys',
    description: 'Discover hidden gems and local experiences that will change your perspective on travel.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/images/blog-1.jpg',
    author: 'Travel Expert',
    published: true,
  },
  {
    title: 'Exploring Ancient Temples & Culture',
    description: 'Journey through time and immerse yourself in centuries of history and tradition.',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '/images/blog-2.jpg',
    author: 'Culture Buff',
    published: true,
  }
]

const DUMMY_REVIEWS = [
  {
    author: 'Sakshi Sachdev',
    rating: 5,
    text: 'More than the place; it was the co-travelers! More than the group, it was our very own guide who made us feel loved, heard and seen without any judgments.',
    destination: 'Thailand',
    avatar: '/images/avatar-1.jpg',
    verified: true,
    published: true,
  },
  {
    author: 'James Watson',
    rating: 5,
    text: 'Most people go on holiday to escape stress, but my experience was the complete opposite. They promised slow travel, and they absolutely delivered.',
    destination: 'Bali',
    avatar: '/images/avatar-2.jpg',
    verified: true,
    published: true,
  }
]

const DUMMY_GALLERY = [
  { title: 'Scenic Valley Ride', image: '/images/gallery/inbound_img1.jpeg', category: 'nature', published: true },
  { title: 'Beautiful Sunset Beach', image: '/images/gallery/inbound_img2.jpeg', category: 'destination', published: true },
  { title: 'Traditional Dance Show', image: '/images/gallery/inbound_img3.jpeg', category: 'culture', published: true },
  { title: 'Mountain Hiking Peak', image: '/images/gallery/inbound_img4.jpeg', category: 'nature', published: true },
  { title: 'Luxury Resort Experience', image: '/images/gallery/inbound_img5.jpeg', category: 'experience', published: true },
  { title: 'Historical Palace Tour', image: '/images/gallery/inbound_img6.jpeg', category: 'culture', published: true },
  { title: 'Forest Camping Site', image: '/images/gallery/inbound_img7.jpeg', category: 'nature', published: true },
  { title: 'Snorkeling Adventure', image: '/images/gallery/inbound_img8.jpeg', category: 'experience', published: true },
  { title: 'Local Market Flavors', image: '/images/gallery/inbound_img9.jpeg', category: 'culture', published: true },
  { title: 'High Altitude Lake', image: '/images/gallery/inbound_img10.jpeg', category: 'nature', published: true },
  { title: 'Desert Safari Camp', image: '/images/gallery/inbound_img11.jpeg', category: 'destination', published: true },
  { title: 'City Skyline Night', image: '/images/gallery/inbound_img12.jpeg', category: 'experience', published: true },
  { title: 'Ancient Temple Walk', image: '/images/gallery/inbound_img13.jpeg', category: 'culture', published: true },
  { title: 'Waterfall Trekking', image: '/images/gallery/inbound_img14.jpeg', category: 'nature', published: true },
  { title: 'Scenic Train Ride', image: '/images/gallery/inbound_img15.jpeg', category: 'experience', published: true },
  { title: 'Local Festival Colors', image: '/images/gallery/inbound_img16.jpeg', category: 'culture', published: true },
  { title: 'Peaceful River Stream', image: '/images/gallery/inbound_img17.jpeg', category: 'nature', published: true },
  { title: 'Hot Air Balloon Flight', image: '/images/gallery/inbound_img18.jpeg', category: 'experience', published: true },
  { title: 'Cultural Heritage Monument', image: '/images/gallery/inbound_img19.jpeg', category: 'culture', published: true },
  { title: 'Deep Forest Trail', image: '/images/gallery/inbound_img20.jpeg', category: 'nature', published: true },
  { title: 'Ocean Wave Coast', image: '/images/gallery/inbound_img21.jpeg', category: 'destination', published: true },
  { title: 'Paragliding View', image: '/images/gallery/inbound_img22.jpeg', category: 'experience', published: true },
  { title: 'Traditional Village Art', image: '/images/gallery/inbound_img23.jpeg', category: 'culture', published: true },
]

export async function GET() {
  try {
    await connectDB()

    // Clear existing data (optional, but good for a fresh start)
    await Package.deleteMany({})
    await Blog.deleteMany({})
    await Review.deleteMany({})
    await Gallery.deleteMany({})

    // Insert dummy data
    await Package.insertMany(DUMMY_PACKAGES)
    await Blog.insertMany(DUMMY_BLOGS)
    await Review.insertMany(DUMMY_REVIEWS)
    await Gallery.insertMany(DUMMY_GALLERY)

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully with dummy content!' 
    })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to seed database' 
    }, { status: 500 })
  }
}
