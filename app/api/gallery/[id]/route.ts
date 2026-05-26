import { connectDB } from '@/lib/mongodb'
import { Gallery } from '@/lib/models'
import {
  useMockData,
  getGalleryById,
  updateGalleryItem,
  deleteGalleryItem,
} from '@/lib/mockData'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    if (useMockData) {
      const image = getGalleryById(id)
      if (!image) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 })
      }
      return NextResponse.json(image)
    }

    await connectDB()

    const image = await Gallery.findById(id)
    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(image)
  } catch (error) {
    console.error('Error fetching image:', error)
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
      const image = updateGalleryItem(id, data)
      if (!image) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 })
      }
      return NextResponse.json(image)
    }

    await connectDB()

    const image = await Gallery.findByIdAndUpdate(
      id,
      {
        title: data.title,
        image: data.image,
        category: data.category,
        published: data.published,
      },
      { new: true }
    )

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(image)
  } catch (error) {
    console.error('Error updating image:', error)
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
      const deleted = deleteGalleryItem(id)
      if (!deleted) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true })
    }

    await connectDB()

    const image = await Gallery.findByIdAndDelete(id)

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
