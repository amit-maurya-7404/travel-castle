import { connectDB } from '@/lib/mongodb'
import { Package, Blog, Review, Gallery } from '@/lib/models'
import { NextResponse } from 'next/server'

const DUMMY_PACKAGES = [
  // Domestic
  {
    title: 'Kashmir Valley Escape',
    description: 'Experience the paradise on earth with houseboat stays, shikara rides, and breathtaking landscapes of the Himalayas.',
    category: 'adventure',
    type: 'domestic',
    image: '/images/hero-destination.jpg',
    duration: '6N/7D',
    price: 28000,
    published: true,
  },
  {
    title: 'Rajasthan Royal Heritage',
    description: 'Journey through royal palaces, desert safaris, and vibrant culture of the land of kings.',
    category: 'family',
    type: 'domestic',
    image: '/images/package-adventure.jpg',
    duration: '7N/8D',
    price: 36500,
    published: true,
  },
  {
    title: 'Kerala Backwaters',
    description: 'Cruise through serene backwaters, stay in houseboats, and experience the tropical paradise of Gods Own Country.',
    category: 'honeymoon',
    type: 'domestic',
    image: '/images/package-honeymoon.jpg',
    duration: '5N/6D',
    price: 23000,
    published: true,
  },
  {
    title: 'Goa Beach Paradise',
    description: 'Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of this coastal haven.',
    category: 'bachelor',
    type: 'domestic',
    image: '/images/package-bachelor.jpg',
    duration: '4N/5D',
    price: 18500,
    published: true,
  },
  // International
  {
    title: 'Bali Paradise Escape',
    description: 'Tropical beaches, ancient temples, rice terraces, and vibrant culture in the Island of Gods.',
    category: 'family',
    type: 'international',
    image: '/images/package-family.jpg',
    duration: '7N/8D',
    price: 48000,
    published: true,
  },
  {
    title: 'Swiss Alps Adventure',
    description: 'Snow-capped peaks, crystal lakes, charming villages, and world-class skiing in the heart of Europe.',
    category: 'adventure',
    type: 'international',
    image: '/images/hero-destination.jpg',
    duration: '6N/7D',
    price: 95000,
    published: true,
  },
  {
    title: 'Japan Cultural Journey',
    description: 'Tokyo skyscrapers, Kyoto temples, Mount Fuji, and the perfect blend of tradition and modernity.',
    category: 'corporate',
    type: 'international',
    image: '/images/package-corporate.jpg',
    duration: '8N/9D',
    price: 78000,
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
  { title: 'Mountain Vista', image: '/images/hero-destination.jpg', category: 'nature', published: true },
  { title: 'Beach Sunset', image: '/images/package-honeymoon.jpg', category: 'destination', published: true },
  { title: 'City Lights', image: '/images/package-corporate.jpg', category: 'experience', published: true },
  { title: 'Cultural Dance', image: '/images/blog-2.jpg', category: 'culture', published: true }
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
