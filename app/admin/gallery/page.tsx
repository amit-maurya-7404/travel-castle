'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit2, Trash2, Images } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface GalleryItem {
  _id: string
  title?: string
  image: string
  category: string
  published: boolean
  createdAt: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const categories = ['all', 'destination', 'experience', 'culture', 'nature']

  useEffect(() => {
    fetchGallery()
  }, [])

  async function fetchGallery() {
    try {
      setIsLoading(true)
      const res = await fetch('/api/gallery')
      const data = await res.json()
      setImages(data)
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteImage(id: string) {
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setImages(images.filter((img) => img._id !== id))
        setDeleteId(null)
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter((img) => img.category === selectedCategory)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-in-down">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Images className="w-8 h-8 text-purple-600" />
            Manage Gallery
          </h1>
          <p className="text-muted-foreground">Upload and manage gallery images</p>
        </div>
        <Link href="/admin/gallery/new">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Upload Image
          </Button>
        </Link>
      </div>

      {/* Category Filter */}
      <Card className="p-4 glass">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'border border-border hover:border-purple-600'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </Card>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading gallery...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <Card className="p-12 text-center">
          <Images className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No images found</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <Card
              key={img._id}
              className="overflow-hidden hover:shadow-lg transition card-3d stagger-children group"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                  src={img.image}
                  alt={img.title || 'Gallery image'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  {img.title || 'Untitled'}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {img.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/gallery/${img._id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </Link>
                    <button
                      onClick={() => setDeleteId(img._id)}
                      className="p-2 hover:bg-red-100 rounded transition text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
                Delete Image?
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
                  onClick={() => deleteImage(deleteId)}
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
