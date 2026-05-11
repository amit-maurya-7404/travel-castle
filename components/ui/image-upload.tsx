'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  onRemove: () => void
  disabled?: boolean
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (data.url) {
        onChange(data.url)
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-border">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={onRemove}
                variant="destructive"
                size="icon"
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Upload"
              src={value}
            />
          </div>
        ) : (
          <div className="w-40 h-40 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center bg-muted/50">
            {isUploading ? (
              <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
            ) : (
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-all font-medium text-sm">
              <Upload className="h-4 w-4" />
              {value ? 'Change Image' : 'Upload from device'}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={disabled || isUploading}
            />
          </label>
          <p className="text-xs text-muted-foreground">
            JPG, PNG or WebP. Max 5MB.
          </p>
        </div>
      </div>
    </div>
  )
}
