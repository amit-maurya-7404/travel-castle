import { connectDB } from '@/lib/mongodb'
import { Review } from '@/lib/models'
import { useMockData, getReviews, createReview } from '@/lib/mockData'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    if (useMockData) {
      return NextResponse.json(getReviews())
    }

    await connectDB()

    const reviews = await Review.find().sort({ createdAt: -1 })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (useMockData) {
      const review = createReview(data)
      return NextResponse.json(review, { status: 201 })
    }

    await connectDB()

    const review = await Review.create({
      author: data.author,
      rating: data.rating,
      text: data.text,
      destination: data.destination,
      avatar: data.avatar,
      verified: data.verified || false,
      published: data.published !== false,
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
