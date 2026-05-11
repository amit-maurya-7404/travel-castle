import mongoose from 'mongoose'

// Admin User Schema
const adminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: String,
  },
  { timestamps: true }
)

// Package Schema
const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'honeymoon',
        'corporate',
        'bachelor',
        'family',
        'solo',
        'adventure',
      ],
      required: true,
    },
    type: {
      type: String,
      enum: ['domestic', 'international'],
      default: 'domestic',
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    duration: String,
    price: Number,
    highlights: [String],
    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

// Blog Schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: String,
    author: String,
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

// Gallery Image Schema
const gallerySchema = new mongoose.Schema(
  {
    title: String,
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['destination', 'experience', 'culture', 'nature'],
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    destination: String,
    avatar: String,
    verified: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export const AdminUser =
  mongoose.models.AdminUser ||
  mongoose.model('AdminUser', adminUserSchema)
export const Package =
  mongoose.models.Package || mongoose.model('Package', packageSchema)
export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)
export const Gallery =
  mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema)
export const Review =
  mongoose.models.Review || mongoose.model('Review', reviewSchema)
