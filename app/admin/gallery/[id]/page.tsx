'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Save, ImagePlus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ImageUpload } from '@/components/ui/image-upload'

const CATEGORIES = ['destination', 'experience', 'culture', 'nature']

export default function GalleryFormPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: 'destination',
    published: true,
  })

  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      fetchImage()
    }
  }, [])

  async function fetchImage() {
    try {
      const res = await fetch(`/api/gallery/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          title: data.title || '',
          image: data.image,
          category: data.category,
          published: data.published,
        })
      }
    } catch (error) {
      console.error('Error fetching image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = isNew ? '/api/gallery' : `/api/gallery/${params.id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/gallery')
      }
    } catch (error) {
      console.error('Error saving image:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 animate-slide-in-down">
        <Link href="/admin/gallery">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isNew ? 'Upload Image' : 'Edit Image'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <Card className="p-6 glass animate-scale-in [animation-delay:0.2s] opacity-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Image Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Image title..."
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Gallery Image *
            </label>
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              onRemove={() => setFormData({ ...formData, image: '' })}
            />
          </div>

          {/* Published */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label htmlFor="published" className="text-sm font-medium">
              Publish immediately
            </label>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <Link href="/admin/gallery" className="flex-1">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Image'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
