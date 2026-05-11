'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Save, Star } from 'lucide-react'
import Link from 'next/link'
import { ImageUpload } from '@/components/ui/image-upload'

export default function ReviewFormPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'

  const [formData, setFormData] = useState({
    author: '',
    rating: 5,
    text: '',
    destination: '',
    avatar: '',
    verified: false,
    published: true,
  })

  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      fetchReview()
    }
  }, [])

  async function fetchReview() {
    try {
      const res = await fetch(`/api/reviews/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          author: data.author,
          rating: data.rating,
          text: data.text,
          destination: data.destination || '',
          avatar: data.avatar || '',
          verified: data.verified,
          published: data.published,
        })
      }
    } catch (error) {
      console.error('Error fetching review:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = isNew ? '/api/reviews' : `/api/reviews/${params.id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/reviews')
      }
    } catch (error) {
      console.error('Error saving review:', error)
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
        <Link href="/admin/reviews">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isNew ? 'Add Review' : 'Edit Review'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <Card className="p-6 glass animate-scale-in [animation-delay:0.2s] opacity-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Author Name *
            </label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              placeholder="Customer name..."
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition ${
                      star <= formData.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Review Text *
            </label>
            <textarea
              required
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              placeholder="What did the customer think about their trip?"
              rows={6}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Destination
            </label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
              placeholder="e.g., Bali, Thailand"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Customer Avatar
            </label>
            <ImageUpload
              value={formData.avatar}
              onChange={(url) => setFormData({ ...formData, avatar: url })}
              onRemove={() => setFormData({ ...formData, avatar: '' })}
            />
          </div>

          {/* Verified */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="verified"
              checked={formData.verified}
              onChange={(e) =>
                setFormData({ ...formData, verified: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label htmlFor="verified" className="text-sm font-medium">
              Mark as verified customer
            </label>
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
            <Link href="/admin/reviews" className="flex-1">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Review'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
