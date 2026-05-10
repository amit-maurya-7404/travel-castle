import { connectDB } from '@/lib/mongodb'
import { Package } from '@/lib/models'
import {
  useMockData,
  getPackages,
  createPackage,
} from '@/lib/mockData'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    if (useMockData) {
      return NextResponse.json(getPackages())
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const published = searchParams.get('published')

    let query: any = {}
    if (category) query.category = category
    if (published !== null) query.published = published === 'true'

    const packages = await Package.find(query).sort({ createdAt: -1 })

    return NextResponse.json(packages)
  } catch (error) {
    console.error('Error fetching packages:', error)
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
      const packageData = createPackage(data)
      return NextResponse.json(packageData, { status: 201 })
    }

    await connectDB()

    const packageData = await Package.create({
      title: data.title,
      description: data.description,
      category: data.category,
      image: data.image,
      duration: data.duration,
      price: data.price,
      highlights: data.highlights || [],
      itinerary: data.itinerary || [],
      published: data.published !== false,
    })

    return NextResponse.json(packageData, { status: 201 })
  } catch (error) {
    console.error('Error creating package:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
