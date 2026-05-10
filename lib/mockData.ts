import { randomUUID } from 'crypto'

function isValidMongoUri(uri?: string) {
  return (
    typeof uri === 'string' &&
    (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'))
  )
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
  image: string
  duration?: string
  price?: number
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

const packages: PackageItem[] = []
const blogs: BlogItem[] = []
const gallery: GalleryItem[] = []
const reviews: ReviewItem[] = []

export function getPackages() {
  return packages
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
    image: data.image || '',
    duration: data.duration || '',
    price: data.price,
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
  item.image = data.image || item.image
  item.duration = data.duration || item.duration
  item.price = data.price !== undefined ? data.price : item.price
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

export function getBlogs() {
  return blogs
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

export function getGallery() {
  return gallery
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

export function getReviews() {
  return reviews
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
