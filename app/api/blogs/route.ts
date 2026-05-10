import { connectDB } from '@/lib/mongodb'
import { Blog } from '@/lib/models'
import { useMockData, getBlogs, createBlog } from '@/lib/mockData'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    if (useMockData) {
      return NextResponse.json(getBlogs())
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')

    let query: any = {}
    if (published !== null) query.published = published === 'true'

    const blogs = await Blog.find(query).sort({ createdAt: -1 })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
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
      const blog = createBlog(data)
      return NextResponse.json(blog, { status: 201 })
    }

    await connectDB()

    const blog = await Blog.create({
      title: data.title,
      description: data.description,
      image: data.image,
      content: data.content,
      author: data.author,
      published: data.published !== false,
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
