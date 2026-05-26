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
  {
    _id: 'best-of-europe-13-days',
    title: 'Best of Europe',
    description: 'Arrive into Paris - the City of Romance, Lights and Glamour. Explore 13 days of Europe highlights covering France, Belgium, Netherlands, Germany, Switzerland, Liechtenstein, Austria, Italy and Vatican City.',
    category: 'adventure',
    type: 'international',
    image: '/images/package-adventure.jpg',
    locationTag: 'Paris to Rome',
    duration: '12N/13D',
    months: 'May - Oct',
    originalPrice: '3,35,000',
    price: '3,00,000',
    discountTag: 'Upto 35000 OFF',
    rating: 4.9,
    reviews: '(6k+)',
    isBestSeller: true,
    highlights: [
      'Eiffel Tower 3rd Level (Top Level)',
      'Palace of Versailles Guided Tour',
      'Disneyland® Paris Full Day Experience',
      'Romantic River Seine Cruise',
      'Jungfraujoch - Top of Europe & Mount Titlis Rotair',
      'Vatican City: St. Peter\'s Basilica & Sistine Chapel',
      'Venice Private Boat & Gondola Ride',
      'Grand Place in Brussels & Amsterdam Canal Cruise'
    ],
    itinerary: [],
    published: true,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  },
  {
    _id: 'grand-wonders-of-europe-16-days',
    title: 'Grand Wonders of Europe',
    description: 'Embark on a spectacular 16-day journey across the United Kingdom, France, Belgium, Netherlands, Germany, Switzerland, Liechtenstein, Austria, Italy, and Vatican City.',
    category: 'adventure',
    type: 'international',
    image: '/images/package-adventure.jpg',
    locationTag: 'London to Rome',
    duration: '15N/16D',
    months: 'May - Oct',
    originalPrice: '4,10,000',
    price: '3,71,000',
    discountTag: 'Upto 39000 OFF',
    rating: 4.9,
    reviews: '(8k+)',
    isBestSeller: true,
    highlights: [
      'London Eye Ride & Madame Tussauds',
      'Lord\'s Cricket Ground & Tower of London',
      'Highspeed Eurostar Train from London to Paris',
      'Eiffel Tower 3rd Level & Palace of Versailles',
      'Jungfraujoch - Top of Europe Cogwheel Train',
      'Venice Gondola Ride & Vatican Museums'
    ],
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
  { _id: 'inbound-1', title: 'Scenic Valley Ride', image: '/images/gallery/inbound_img1.jpeg', category: 'nature', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-2', title: 'Beautiful Sunset Beach', image: '/images/gallery/inbound_img2.jpeg', category: 'destination', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-3', title: 'Traditional Dance Show', image: '/images/gallery/inbound_img3.jpeg', category: 'culture', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-4', title: 'Mountain Hiking Peak', image: '/images/gallery/inbound_img4.jpeg', category: 'nature', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-5', title: 'Luxury Resort Experience', image: '/images/gallery/inbound_img5.jpeg', category: 'experience', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-6', title: 'Historical Palace Tour', image: '/images/gallery/inbound_img6.jpeg', category: 'culture', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-7', title: 'Forest Camping Site', image: '/images/gallery/inbound_img7.jpeg', category: 'nature', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-8', title: 'Snorkeling Adventure', image: '/images/gallery/inbound_img8.jpeg', category: 'experience', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-9', title: 'Local Market Flavors', image: '/images/gallery/inbound_img9.jpeg', category: 'culture', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-10', title: 'High Altitude Lake', image: '/images/gallery/inbound_img10.jpeg', category: 'nature', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-11', title: 'Desert Safari Camp', image: '/images/gallery/inbound_img11.jpeg', category: 'destination', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-12', title: 'City Skyline Night', image: '/images/gallery/inbound_img12.jpeg', category: 'experience', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-13', title: 'Ancient Temple Walk', image: '/images/gallery/inbound_img13.jpeg', category: 'culture', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-14', title: 'Waterfall Trekking', image: '/images/gallery/inbound_img14.jpeg', category: 'nature', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-15', title: 'Scenic Train Ride', image: '/images/gallery/inbound_img15.jpeg', category: 'experience', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-16', title: 'Local Festival Colors', image: '/images/gallery/inbound_img16.jpeg', category: 'culture', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-17', title: 'Peaceful River Stream', image: '/images/gallery/inbound_img17.jpeg', category: 'nature', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-18', title: 'Hot Air Balloon Flight', image: '/images/gallery/inbound_img18.jpeg', category: 'experience', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-19', title: 'Cultural Heritage Monument', image: '/images/gallery/inbound_img19.jpeg', category: 'culture', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-20', title: 'Deep Forest Trail', image: '/images/gallery/inbound_img20.jpeg', category: 'nature', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-21', title: 'Ocean Wave Coast', image: '/images/gallery/inbound_img21.jpeg', category: 'destination', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-22', title: 'Paragliding View', image: '/images/gallery/inbound_img22.jpeg', category: 'experience', published: true, createdAt: timestamp(), updatedAt: timestamp() },
  { _id: 'inbound-23', title: 'Traditional Village Art', image: '/images/gallery/inbound_img23.jpeg', category: 'culture', published: true, createdAt: timestamp(), updatedAt: timestamp() },
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
