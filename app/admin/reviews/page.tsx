'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Edit2, Trash2, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface ReviewItem {
  _id: string
  author: string
  rating: number
  text: string
  destination?: string
  avatar?: string
  verified: boolean
  published: boolean
  createdAt: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  async function fetchReviews() {
    try {
      setIsLoading(true)
      const res = await fetch('/api/reviews')
      const data = await res.json()
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteReview(id: string) {
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setReviews(reviews.filter((r) => r._id !== id))
        setDeleteId(null)
      }
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-in-down">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Star className="w-8 h-8 text-amber-600" />
            Manage Reviews
          </h1>
          <p className="text-muted-foreground">View and manage customer reviews</p>
        </div>
        <Link href="/admin/reviews/new">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Review
          </Button>
        </Link>
      </div>

      {/* Reviews List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <Card className="p-12 text-center">
          <Star className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No reviews found</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review, idx) => (
            <Card
              key={review._id}
              className="p-4 hover:shadow-lg transition card-3d stagger-children"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Avatar */}
                {review.avatar && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {review.author}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {review.destination && `Destination: ${review.destination}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={review.rating} />
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Verified
                        </span>
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded font-semibold ${
                          review.published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {review.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    "{review.text}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link href={`/admin/reviews/${review._id}`}>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </Link>
                  <button
                    onClick={() => setDeleteId(review._id)}
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
                Delete Review?
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
                  onClick={() => deleteReview(deleteId)}
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
