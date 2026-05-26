import { connectDB } from '@/lib/mongodb'
import { Package } from '@/lib/models'
import {
  useMockData,
  getPackageById,
  updatePackage,
  deletePackage,
} from '@/lib/mockData'
import { NextRequest, NextResponse } from 'next/server'
import { Types } from 'mongoose'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    if (useMockData) {
      const pkg = getPackageById(id)
      if (!pkg) {
        return NextResponse.json({ error: 'Package not found' }, { status: 404 })
      }
      return NextResponse.json(pkg)
    }

    await connectDB()

    const pkg = await Package.findById(id)
    if (!pkg) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(pkg)
  } catch (error) {
    console.error('Error fetching package:', error)
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
      const pkg = updatePackage(id, data)
      if (!pkg) {
        return NextResponse.json({ error: 'Package not found' }, { status: 404 })
      }
      return NextResponse.json(pkg)
    }

    await connectDB()

    const pkg = await Package.findByIdAndUpdate(
      id,
      {
        title: data.title,
        description: data.description,
        category: data.category,
        type: data.type,
        image: data.image,
        duration: data.duration,
        price: data.price,
        highlights: data.highlights,
        itinerary: data.itinerary,
        published: data.published,
      },
      { new: true }
    )

    if (!pkg) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(pkg)
  } catch (error) {
    console.error('Error updating package:', error)
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
      const deleted = deletePackage(id)
      if (!deleted) {
        return NextResponse.json({ error: 'Package not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true })
    }

    await connectDB()

    const pkg = await Package.findByIdAndDelete(id)

    if (!pkg) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting package:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
