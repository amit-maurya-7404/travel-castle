'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit2, Trash2, Search, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface BlogItem {
  _id: string
  title: string
  description: string
  author?: string
  published: boolean
  createdAt: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<BlogItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const filtered = blogs.filter((b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredBlogs(filtered)
  }, [blogs, searchTerm])

  async function fetchBlogs() {
    try {
      setIsLoading(true)
      const res = await fetch('/api/blogs')
      const data = await res.json()
      setBlogs(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteBlog(id: string) {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setBlogs(blogs.filter((b) => b._id !== id))
        setDeleteId(null)
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-in-down">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-green-600" />
            Manage Blogs
          </h1>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Blog
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card className="p-4 glass">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </Card>

      {/* Blogs List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No blogs found</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredBlogs.map((blog, idx) => (
            <Card
              key={blog._id}
              className="p-4 hover:shadow-lg transition card-3d stagger-children"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {blog.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    {blog.author && <span>By {blog.author}</span>}
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        blog.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/blogs/${blog._id}`}>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </Link>
                  <button
                    onClick={() => setDeleteId(blog._id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="max-w-sm">
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">
                Delete Blog?
              </h2>
              <p className="text-muted-foreground mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => deleteBlog(deleteId)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
