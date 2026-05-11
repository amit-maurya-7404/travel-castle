import { randomUUID } from 'crypto'

function isValidMongoUri(uri?: string) {
  if (!uri || typeof uri !== 'string') return false;
  
  const hasProtocol = uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://');
  const hasPlaceholders = uri.includes('<username>') || uri.includes('<password>');
  
  return hasProtocol && !hasPlaceholders;
}

export const useMockData = !isValidMongoUri(process.env.MONGODB_URI)

const makeId = () => randomUUID()
const timestamp = () => new Date().toISOString()

type Timestamped = {
  _id: string
  createdAt: string
  updatedAt: string
  published: boolean
}

export type PackageItem = Timestamped & {
  title: string
  description: string
  category: string
  type: string
  image: string
  locationTag?: string
  duration?: string
  months?: string
  discountTag?: string
  originalPrice?: number | string
  price?: number | string
  rating?: number
  reviews?: string
  isBestSeller?: boolean
  highlights: string[]
  itinerary: Array<{ day: number; title: string; description: string }>
}

export type BlogItem = Timestamped & {
  title: string
  description: string
  image: string
  content?: string
  author?: string
}

export type GalleryItem = Timestamped & {
  title?: string
  image: string
  category: string
}

export type ReviewItem = Timestamped & {
  author: string
  rating: number
  text: string
  destination?: string
  avatar?: string
  verified: boolean
}

const packages: PackageItem[] = [
  // Group Trips
  {
    _id: 'bali-group-trip',
    title: 'Bali Gateway',
    description: 'Experience the magic of Bali with a fun group of like-minded travelers.',
    category: 'honeymoon',
    type: 'international',
    image: '/images/package-honeymoon.jpg',
    locationTag: 'Delhi to Bali',
    duration: '5N/6D',
    months: 'Aug - Dec',
    originalPrice: '52,000',
    price: '45,000',
    discountTag: 'Upto 7000 OFF',
    rating: 5,
    reviews: '(8k+)',
    isBestSeller: true,
    highlights: ['Ubud tour', 'Beach clubs', 'Temple visits'],
    itinerary: [],
    published: true,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  },
  {
    _id: 'dubai-group-trip',
    title: 'Dubai Desert Safari',
    description: 'Thrilling desert safari, luxury shopping, and modern marvels await.',
    category: 'corporate',
    type: 'international',
    image: '/images/package-corporate.jpg',
    locationTag: 'Mumbai to Dubai',
    duration: '4N/5D',
    months: 'Sep - Mar',
    originalPrice: '62,000',
    price: '55,000',
    discountTag: 'Upto 7000 OFF',
    rating: 4.8,
    reviews: '(12k+)',
    isBestSeller: false,
    highlights: ['Desert safari', 'Burj Khalifa', 'Shopping'],
    itinerary: [],
    published: true,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  },
  {
    _id: 'europe-group-trip',
    title: 'Euro Trip Extravaganza',
    description: 'Explore the best of Europe across 5 countries in one epic journey.',
    category: 'adventure',
    type: 'international',
    image: '/images/package-adventure.jpg',
    locationTag: 'Delhi to Europe',
    duration: '13N/14D',
    months: 'Oct - Jan',
    originalPrice: '1,35,000',
    price: '1,20,000',
    discountTag: 'Upto 15000 OFF',
    rating: 4.9,
    reviews: '(5k+)',
    isBestSeller: true,
    highlights: ['5 Countries', 'Guided tours', 'Premium stays'],
    itinerary: [],
    published: true,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  },
  // Domestic
  {
    _id: 'kashmir-valley',
    title: 'Kashmir Valley Escape',
    description: 'Experience the paradise on earth with houseboat stays, shikara rides, and breathtaking landscapes of the Himalayas.',
    category: 'adventure',
    type: 'domestic',
    image: '/images/hero-destination.jpg',
    locationTag: 'Kashmir, North India',
    duration: '6N/7D',
    months: 'Nov - Mar',
    originalPrice: '35,000',
    price: '28,000',
    discountTag: 'Upto 7000 OFF',
    rating: 4.9,
    reviews: '(12k+)',
    isBestSeller: true,
    highlights: ['Houseboat stay', 'Gulmarg', 'Pahalgam'],
    itinerary: [],
    published: true,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  },
  {
    _id: 'rajasthan-royal',
    title: 'Rajasthan Royal Heritage',
    description: 'Journey through royal palaces, desert safaris, and vibrant culture of the land of kings.',
    category: 'family',
    type: 'domestic',
    image: '/images/package-adventure.jpg',
    locationTag: 'Rajasthan, West India',
    duration: '7N/8D',
    months: 'Oct - Feb',
    originalPrice: '42,000',
    price: '36,500',
    discountTag: 'Upto 5500 OFF',
    rating: 4.8,
    reviews: '(8k+)',
    isBestSeller: false,
    highlights: ['Forts', 'Palaces', 'Camel safari'],
    itinerary: [],
    published: true,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  }
]
const blogs: BlogItem[] = [
  {
    _id: '1',
    title: 'Hidden Gems of Mountain Valleys',
    description: 'Discover hidden gems and local experiences that will change your perspective on travel.',
    image: '/images/blog-1.jpg',
    author: 'Admin',
    published: true,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  },
  {
    _id: '2',
    title: 'Exploring Ancient Temples & Culture',
    description: 'Journey through time and immerse yourself in centuries of history and tradition.',
    image: '/images/blog-2.jpg',
    author: 'Admin',
    published: true,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  },
  {
    _id: '3',
    title: 'Coastal Towns: A Vibrant Adventure',
    description: 'Experience the colorful charm of coastal living and embrace the Mediterranean lifestyle.',
    image: '/images/blog-3.jpg',
    author: 'Admin',
    published: true,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  }
]
const gallery: GalleryItem[] = [
  { _id: '1', title: 'Mountain Vista', image: '/images/hero-destination.jpg', category: 'nature', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: '2', title: 'Beach Sunset', image: '/images/package-honeymoon.jpg', category: 'destination', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: '3', title: 'City Lights', image: '/images/package-corporate.jpg', category: 'experience', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: '4', title: 'Culture & Dance', image: '/images/blog-2.jpg', category: 'culture', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: '5', title: 'Solo Journey', image: '/images/package-solo.jpg', category: 'nature', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: '6', title: 'Adventure Peak', image: '/images/package-adventure.jpg', category: 'experience', published: true, createdAt: timestamp(), updatedAt: timestamp() },
]
const reviews: ReviewItem[] = [
  {
    _id: '1',
    author: 'Sakshi Sachdev',
    rating: 5,
    text: 'More than the place; it was the co-travelers! More than the group, it was our very own guide who made us feel loved, heard and seen without any judgments.',
    destination: 'Thailand',
    avatar: '/images/avatar-1.jpg',
    verified: true,
    published: true,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  },
  {
    _id: '2',
    author: 'James Watson',
    rating: 5,
    text: 'Most people go on holiday to escape stress, but my experience was the complete opposite. We started as strangers. By the end, we were an inseparable family.',
    destination: 'Thailand',
    avatar: '/images/avatar-2.jpg',
    verified: true,
    published: true,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  }
]

export function getPackages(filters: { category?: string; type?: string; published?: boolean } = {}) {
  return packages.filter(item => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.type && item.type !== filters.type) return false;
    if (filters.published !== undefined && item.published !== filters.published) return false;
    return true;
  });
}

export function getPackageById(id: string) {
  return packages.find((item) => item._id === id) || null
}

export function createPackage(data: any) {
  const item: PackageItem = {
    _id: makeId(),
    title: data.title || 'Untitled Package',
    description: data.description || '',
    category: data.category || 'honeymoon',
    type: data.type || 'domestic',
    image: data.image || '',
    locationTag: data.locationTag || '',
    duration: data.duration || '',
    months: data.months || '',
    discountTag: data.discountTag || '',
    originalPrice: data.originalPrice,
    price: data.price,
    rating: data.rating || 5,
    reviews: data.reviews || '(0+)',
    isBestSeller: data.isBestSeller || false,
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    itinerary: Array.isArray(data.itinerary) ? data.itinerary : [],
    published: data.published !== false,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  }
  packages.unshift(item)
  return item
}

export function updatePackage(id: string, data: any) {
  const item = getPackageById(id)
  if (!item) return null
  item.title = data.title || item.title
  item.description = data.description || item.description
  item.category = data.category || item.category
  item.type = data.type || item.type
  item.image = data.image || item.image
  item.locationTag = data.locationTag || item.locationTag
  item.duration = data.duration || item.duration
  item.months = data.months || item.months
  item.discountTag = data.discountTag || item.discountTag
  item.originalPrice = data.originalPrice !== undefined ? data.originalPrice : item.originalPrice
  item.price = data.price !== undefined ? data.price : item.price
  item.rating = data.rating !== undefined ? data.rating : item.rating
  item.reviews = data.reviews || item.reviews
  item.isBestSeller = data.isBestSeller !== undefined ? data.isBestSeller : item.isBestSeller
  item.highlights = Array.isArray(data.highlights) ? data.highlights : item.highlights
  item.itinerary = Array.isArray(data.itinerary) ? data.itinerary : item.itinerary
  item.published = data.published !== undefined ? data.published : item.published
  item.updatedAt = timestamp()
  return item
}

export function deletePackage(id: string) {
  const index = packages.findIndex((item) => item._id === id)
  if (index === -1) return false
  packages.splice(index, 1)
  return true
}

export function getBlogs(filters: { published?: boolean } = {}) {
  return blogs.filter(item => {
    if (filters.published !== undefined && item.published !== filters.published) return false;
    return true;
  });
}

export function getBlogById(id: string) {
  return blogs.find((item) => item._id === id) || null
}

export function createBlog(data: any) {
  const item: BlogItem = {
    _id: makeId(),
    title: data.title || 'Untitled Blog',
    description: data.description || '',
    image: data.image || '',
    content: data.content || '',
    author: data.author || 'Admin',
    published: data.published !== false,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  }
  blogs.unshift(item)
  return item
}

export function updateBlog(id: string, data: any) {
  const item = getBlogById(id)
  if (!item) return null
  item.title = data.title || item.title
  item.description = data.description || item.description
  item.image = data.image || item.image
  item.content = data.content || item.content
  item.author = data.author || item.author
  item.published = data.published !== undefined ? data.published : item.published
  item.updatedAt = timestamp()
  return item
}

export function deleteBlog(id: string) {
  const index = blogs.findIndex((item) => item._id === id)
  if (index === -1) return false
  blogs.splice(index, 1)
  return true
}

export function getGallery(filters: { published?: boolean } = {}) {
  return gallery.filter(item => {
    if (filters.published !== undefined && item.published !== filters.published) return false;
    return true;
  });
}

export function getGalleryById(id: string) {
  return gallery.find((item) => item._id === id) || null
}

export function createGalleryItem(data: any) {
  const item: GalleryItem = {
    _id: makeId(),
    title: data.title || '',
    image: data.image || '',
    category: data.category || 'destination',
    published: data.published !== false,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  }
  gallery.unshift(item)
  return item
}

export function updateGalleryItem(id: string, data: any) {
  const item = getGalleryById(id)
  if (!item) return null
  item.title = data.title || item.title
  item.image = data.image || item.image
  item.category = data.category || item.category
  item.published = data.published !== undefined ? data.published : item.published
  item.updatedAt = timestamp()
  return item
}

export function deleteGalleryItem(id: string) {
  const index = gallery.findIndex((item) => item._id === id)
  if (index === -1) return false
  gallery.splice(index, 1)
  return true
}

export function getReviews(filters: { published?: boolean } = {}) {
  return reviews.filter(item => {
    if (filters.published !== undefined && item.published !== filters.published) return false;
    return true;
  });
}

export function getReviewById(id: string) {
  return reviews.find((item) => item._id === id) || null
}

export function createReview(data: any) {
  const item: ReviewItem = {
    _id: makeId(),
    author: data.author || 'Anonymous',
    rating: data.rating || 5,
    text: data.text || '',
    destination: data.destination || '',
    avatar: data.avatar || '',
    verified: data.verified || false,
    published: data.published !== false,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  }
  reviews.unshift(item)
  return item
}

export function updateReview(id: string, data: any) {
  const item = getReviewById(id)
  if (!item) return null
  item.author = data.author || item.author
  item.rating = data.rating !== undefined ? data.rating : item.rating
  item.text = data.text || item.text
  item.destination = data.destination || item.destination
  item.avatar = data.avatar || item.avatar
  item.verified = data.verified !== undefined ? data.verified : item.verified
  item.published = data.published !== undefined ? data.published : item.published
  item.updatedAt = timestamp()
  return item
}

export function deleteReview(id: string) {
  const index = reviews.findIndex((item) => item._id === id)
  if (index === -1) return false
  reviews.splice(index, 1)
  return true
}
