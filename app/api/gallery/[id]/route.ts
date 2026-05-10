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
  { params }: { params: { id: string } }
) {
  try {
    if (useMockData) {
      const image = getGalleryById(params.id)
      if (!image) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 })
      }
      return NextResponse.json(image)
    }

    await connectDB()

    const image = await Gallery.findById(params.id)
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
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    if (useMockData) {
      const image = updateGalleryItem(params.id, data)
      if (!image) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 })
      }
      return NextResponse.json(image)
    }

    await connectDB()

    const image = await Gallery.findByIdAndUpdate(
      params.id,
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
  { params }: { params: { id: string } }
) {
  try {
    if (useMockData) {
      const deleted = deleteGalleryItem(params.id)
      if (!deleted) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true })
    }

    await connectDB()

    const image = await Gallery.findByIdAndDelete(params.id)

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
