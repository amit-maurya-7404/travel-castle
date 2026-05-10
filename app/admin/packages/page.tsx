'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  ChevronRight,
  Package,
} from 'lucide-react'
import Link from 'next/link'

interface PackageItem {
  _id: string
  title: string
  category: string
  description: string
  price?: number
  duration?: string
  published: boolean
  createdAt: string
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>([])
  const [filteredPackages, setFilteredPackages] = useState<PackageItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const categories = [
    'all',
    'honeymoon',
    'corporate',
    'bachelor',
    'family',
    'solo',
    'adventure',
  ]

  useEffect(() => {
    fetchPackages()
  }, [])

  useEffect(() => {
    let filtered = packages

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredPackages(filtered)
  }, [packages, searchTerm, selectedCategory])

  async function fetchPackages() {
    try {
      setIsLoading(true)
      const res = await fetch('/api/packages')
      const data = await res.json()

      if (!res.ok) {
        console.error('Error fetching packages:', data)
        setPackages([])
        return
      }

      const packagesData = Array.isArray(data) ? data : data?.packages ?? []
      setPackages(packagesData)
    } catch (error) {
      console.error('Error fetching packages:', error)
      setPackages([])
    } finally {
      setIsLoading(false)
    }
  }

  async function deletePackage(id: string) {
    try {
      const res = await fetch(`/api/packages/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPackages(packages.filter((p) => p._id !== id))
        setDeleteId(null)
      }
    } catch (error) {
      console.error('Error deleting package:', error)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-in-down">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Package className="w-8 h-8 text-blue-600" />
            Manage Packages
          </h1>
          <p className="text-muted-foreground">
            Create and manage travel packages
          </p>
        </div>
        <Link href="/admin/packages/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Package
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card className="p-4 glass">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Packages Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading packages...</p>
        </div>
      ) : filteredPackages.length === 0 ? (
        <Card className="p-12 text-center">
          <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No packages found</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredPackages.map((pkg, idx) => (
            <Card
              key={pkg._id}
              className="p-4 hover:shadow-lg transition card-3d stagger-children"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {pkg.title}
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {pkg.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-1">
                    {pkg.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    {pkg.duration && <span>Duration: {pkg.duration}</span>}
                    {pkg.price && <span>Price: ${pkg.price}</span>}
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        pkg.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {pkg.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/packages/${pkg._id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                  <button
                    onClick={() => setDeleteId(pkg._id)}
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

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="max-w-sm">
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">
                Delete Package?
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
                  onClick={() => deletePackage(deleteId)}
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
