import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { MapPin, Calendar, Clock, Star } from 'lucide-react'

interface PackageCardProps {
  id: string;
  title: string;
  image: string;
  locationTag?: string;
  duration?: string;
  months?: string;
  discountTag?: string;
  originalPrice?: string | number;
  price?: string | number;
  rating?: number;
  reviews?: string;
  isBestSeller?: boolean;
}

export function PackageCard({
  id,
  title,
  image,
  locationTag = 'Anywhere',
  duration = 'N/A',
  months = 'All Year',
  discountTag,
  originalPrice = '0',
  price = '0',
  rating = 5,
  reviews = '(0+)',
  isBestSeller = false,
}: PackageCardProps) {
  return (
    <Link href={`/packages/${id}`} className="block h-full">
      <Card className="relative overflow-hidden border-0 bg-transparent h-[400px] flex flex-col group cursor-pointer shadow-2xl rounded-3xl">
        {/* Edge-to-edge Image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Cinematic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>

        {/* Top Left Badge */}
        {isBestSeller && (
          <div className="absolute top-4 left-0 bg-blue-600 text-white text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-r-lg z-10 shadow-lg">
            Best Seller
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-2xl font-bold text-white mb-3 leading-tight drop-shadow-md group-hover:text-primary transition-colors">{title}</h3>
          
          {/* Location Badge */}
          <div className="self-start bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 mb-4 shadow-sm">
            <MapPin className="w-3 h-3" />
            <span>{locationTag}</span>
          </div>
          
          {/* Duration & Months Row */}
          <div className="flex items-center gap-2 text-white text-xs font-semibold mb-4 w-full">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{duration}</span>
            </div>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{months}</span>
            </div>
            
            {/* Discount Badge */}
            {discountTag && (
              <div className="ml-auto bg-green-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm flex items-center h-5">
                {discountTag}
              </div>
            )}
          </div>

          {/* Pricing & Rating Row */}
          <div className="flex items-end justify-between border-t border-white/20 pt-4">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs line-through decoration-red-500/50 decoration-2 font-medium">₹{originalPrice}</span>
              <span className="text-white font-extrabold text-xl">₹{price}</span>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex text-yellow-400 gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-600'}`} />
                ))}
              </div>
              <span className="text-gray-300 text-[10px] font-bold tracking-wide text-yellow-400/90">{reviews}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
