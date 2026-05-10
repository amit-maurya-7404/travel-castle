import { connectDB } from '@/lib/mongodb'
import { Blog } from '@/lib/models'
import {
  useMockData,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '@/lib/mockData'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (useMockData) {
      const blog = getBlogById(params.id)
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
      }
      return NextResponse.json(blog)
    }

    await connectDB()

    const blog = await Blog.findById(params.id)
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)
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
      const blog = updateBlog(params.id, data)
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
      }
      return NextResponse.json(blog)
    }

    await connectDB()

    const blog = await Blog.findByIdAndUpdate(
      params.id,
      {
        title: data.title,
        description: data.description,
        image: data.image,
        content: data.content,
        author: data.author,
        published: data.published,
      },
      { new: true }
    )

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error updating blog:', error)
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
      const deleted = deleteBlog(params.id)
      if (!deleted) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true })
    }

    await connectDB()

    const blog = await Blog.findByIdAndDelete(params.id)

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
