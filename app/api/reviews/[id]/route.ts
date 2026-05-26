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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    if (useMockData) {
      const review = getReviewById(id)
      if (!review) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 })
      }
      return NextResponse.json(review)
    }

    await connectDB()

    const review = await Review.findById(id)
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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const data = await request.json()

    if (useMockData) {
      const review = updateReview(id, data)
      if (!review) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 })
      }
      return NextResponse.json(review)
    }

    await connectDB()

    const review = await Review.findByIdAndUpdate(
      id,
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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    if (useMockData) {
      const deleted = deleteReview(id)
      if (!deleted) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true })
    }

    await connectDB()

    const review = await Review.findByIdAndDelete(id)

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
