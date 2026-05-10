import { connectDB } from '@/lib/mongodb'
import { Gallery } from '@/lib/models'
import { useMockData, getGallery, createGalleryItem } from '@/lib/mockData'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    if (useMockData) {
      return NextResponse.json(getGallery())
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query: any = {}
    if (category) query.category = category

    const images = await Gallery.find(query).sort({ createdAt: -1 })

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching gallery:', error)
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
      const image = createGalleryItem(data)
      return NextResponse.json(image, { status: 201 })
    }

    await connectDB()

    const image = await Gallery.create({
      title: data.title,
      image: data.image,
      category: data.category,
      published: data.published !== false,
    })

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
