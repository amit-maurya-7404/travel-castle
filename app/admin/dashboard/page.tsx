'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Box,
  BookOpen,
  Images,
  Star,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    packages: 0,
    blogs: 0,
    gallery: 0,
    reviews: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  // kept as you already added (even if unused)
  const [filteredPackages, setFilteredPackages] = useState<any[]>([])

  useEffect(() => {
    async function fetchStats() {
      try {
        const [packagesRes, blogsRes, galleryRes, reviewsRes] = await Promise.all([
          fetch('/api/packages'),
          fetch('/api/blogs'),
          fetch('/api/gallery'),
          fetch('/api/reviews'),
        ])

        const [packagesData, blogsData, galleryData, reviewsData] = await Promise.all([
          packagesRes.json(),
          blogsRes.json(),
          galleryRes.json(),
          reviewsRes.json(),
        ])

        // ✅ SAFE NORMALIZATION (prevents .map / .length crash)
        const packages = Array.isArray(packagesData)
          ? packagesData
          : packagesData?.data || []

        const blogs = Array.isArray(blogsData)
          ? blogsData
          : blogsData?.data || []

        const gallery = Array.isArray(galleryData)
          ? galleryData
          : galleryData?.data || []

        const reviews = Array.isArray(reviewsData)
          ? reviewsData
          : reviewsData?.data || []

        setStats({
          packages: packages.length || 0,
          blogs: blogs.length || 0,
          gallery: gallery.length || 0,
          reviews: reviews.length || 0,
        })

        // optional safe assignment (no crash guarantee)
        setFilteredPackages(Array.isArray(packages) ? packages : [])
      } catch (error) {
        console.error('Error fetching stats:', error)

        // fallback safety
        setStats({
          packages: 0,
          blogs: 0,
          gallery: 0,
          reviews: 0,
        })

        setFilteredPackages([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const dashboardCards = [
    {
      icon: Box,
      title: 'Packages',
      count: stats.packages,
      href: '/admin/packages',
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: BookOpen,
      title: 'Blogs',
      count: stats.blogs,
      href: '/admin/blogs',
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Images,
      title: 'Gallery',
      count: stats.gallery,
      href: '/admin/gallery',
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Star,
      title: 'Reviews',
      count: stats.reviews,
      href: '/admin/reviews',
      color: 'bg-amber-100 text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div className="animate-slide-in-down">
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-blue-600" />
          Welcome to Travel Castle Admin
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage all your travel packages, blogs, gallery images, and customer reviews
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
        {dashboardCards.map((card, idx) => {
          const Icon = card.icon

          return (
            <Link
              key={idx}
              href={card.href}
              className="group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <Card
                className={`p-6 ${card.bgColor} border-border hover:shadow-luxury transition-all duration-300 card-3d cursor-pointer h-full`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition" />
                </div>

                <h3 className="text-foreground font-semibold mb-2">
                  {card.title}
                </h3>

                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-foreground">
                    {isLoading ? '...' : card.count}
                  </p>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="animate-slide-in-up [animation-delay:0.4s] opacity-0">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Quick Actions
        </h2>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="grid md:grid-cols-2 gap-4">

            <Link href="/admin/packages?action=new">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                <Box className="w-4 h-4 mr-2" />
                Add New Package
              </Button>
            </Link>

            <Link href="/admin/blogs?action=new">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Write New Blog
              </Button>
            </Link>

            <Link href="/admin/gallery?action=new">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start">
                <Images className="w-4 h-4 mr-2" />
                Upload Gallery Image
              </Button>
            </Link>

            <Link href="/admin/reviews?action=new">
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white justify-start">
                <Star className="w-4 h-4 mr-2" />
                Add Review
              </Button>
            </Link>

          </div>
        </Card>
      </div>

    </div>
  )
}