import { connectDB } from '@/lib/mongodb'
import { Review } from '@/lib/models'
import {
  useMockData,
  getReviewById,
  updateReview,
  deleteReview,
} from '@/lib/mockData'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (useMockData) {
      const review = getReviewById(params.id)
      if (!review) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 })
      }
      return NextResponse.json(review)
    }

    await connectDB()

    const review = await Review.findById(params.id)
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error fetching review:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    if (useMockData) {
      const review = updateReview(params.id, data)
      if (!review) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 })
      }
      return NextResponse.json(review)
    }

    await connectDB()

    const review = await Review.findByIdAndUpdate(
      params.id,
      {
        author: data.author,
        rating: data.rating,
        text: data.text,
        destination: data.destination,
        avatar: data.avatar,
        verified: data.verified,
        published: data.published,
      },
      { new: true }
    )

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (useMockData) {
      const deleted = deleteReview(params.id)
      if (!deleted) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true })
    }

    await connectDB()

    const review = await Review.findByIdAndDelete(params.id)

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
