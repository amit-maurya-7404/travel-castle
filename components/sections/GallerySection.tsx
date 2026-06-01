'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Camera, X } from 'lucide-react'

const galleryImages = [
  '/images/gallery/inbound_img1.jpeg',
  '/images/gallery/inbound_img2.jpeg',
  '/images/gallery/inbound_img3.jpeg',
  '/images/gallery/inbound_img4.jpeg',
  '/images/gallery/inbound_img5.jpeg',
  '/images/gallery/inbound_img6.jpeg',
  '/images/gallery/inbound_img7.jpeg',
  '/images/gallery/inbound_img8.jpeg',
  '/images/gallery/inbound_img9.jpeg',
  '/images/gallery/inbound_img10.jpeg',
  '/images/gallery/inbound_img11.jpeg',
  '/images/gallery/inbound_img12.jpeg',
  '/images/gallery/inbound_img13.jpeg',
  '/images/gallery/inbound_img14.jpeg',
  '/images/gallery/inbound_img15.jpeg',
  '/images/gallery/inbound_img16.jpeg',
  '/images/gallery/inbound_img17.jpeg',
  '/images/gallery/inbound_img18.jpeg',
  '/images/gallery/inbound_img19.jpeg',
  '/images/gallery/inbound_img20.jpeg',
  '/images/gallery/inbound_img21.jpeg',
  '/images/gallery/inbound_img22.jpeg',
  '/images/gallery/inbound_img23.jpeg',
]


export function GallerySection() {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  // Split gallery images into two rows
  const row1Images = galleryImages.slice(0, 11)
  const row2Images = galleryImages.slice(11)

  // Duplicate for seamless infinite marquee scroll
  const row1 = [...row1Images, ...row1Images]
  const row2 = [...row2Images, ...row2Images]

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-slide-in-up flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold uppercase text-xs tracking-widest">Journey in Frames</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Glimpses of unforgettable moments captured by our amazing community.
          </p>
        </div>
      </div>

      {/* Edge-to-edge Dual Infinite Scrolling Marquees */}
      <div className="relative w-full overflow-hidden hover-pause select-none space-y-6 md:space-y-8 py-4">
        {/* Row 1: Scrolling Left */}
        <div className="flex w-max gap-4 md:gap-6 animate-marquee-left">
          {row1.map((src, idx) => (
            <div
              key={`r1-${idx}`}
              className="relative w-[200px] h-[260px] sm:w-[240px] sm:h-[320px] md:w-[280px] md:h-[380px] rounded-3xl overflow-hidden group shadow-lg cursor-pointer flex-shrink-0 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] border border-white/10"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Gallery image row 1 ${idx}`}
                fill
                sizes="(max-width: 768px) 200px, 280px"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-xs">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500 ease-out">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex w-max gap-4 md:gap-6 animate-marquee-right">
          {row2.map((src, idx) => (
            <div
              key={`r2-${idx}`}
              className="relative w-[200px] h-[260px] sm:w-[240px] sm:h-[320px] md:w-[280px] md:h-[380px] rounded-3xl overflow-hidden group shadow-lg cursor-pointer flex-shrink-0 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] border border-white/10"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Gallery image row 2 ${idx}`}
                fill
                sizes="(max-width: 768px) 200px, 280px"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-xs">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500 ease-out">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all duration-300 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-all duration-300 transform hover:rotate-90 z-[210]"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative max-w-4xl w-full max-h-[80vh] aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Gallery Preview"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  )
}
