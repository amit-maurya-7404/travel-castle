import Image from 'next/image'
import { Sparkles, Camera } from 'lucide-react'

const galleryImages = [
  '/images/hero-destination.jpg',
  '/images/package-adventure.jpg',
  '/images/package-honeymoon.jpg',
  '/images/blog-1.jpg',
  '/images/blog-2.jpg',
  '/images/blog-3.jpg',
  '/images/package-solo.jpg',
  '/images/hero-destination.jpg',
]

export function GallerySection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((src, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden group break-inside-avoid shadow-lg cursor-pointer">
              <Image 
                src={src} 
                alt={`Gallery image ${idx + 1}`} 
                width={600} 
                height={800} 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
