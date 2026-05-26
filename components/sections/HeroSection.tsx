import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star, MapPin } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center pt-10 md:pt-0 pb-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-destination.jpg"
          alt="Travel background"
          fill
          className="object-cover"
          priority
        />
        {/* Smooth, sophisticated gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/80 lg:via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grow flex flex-col justify-center mt-8 md:mt-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column - Clean & Simple Text */}
          <div className="text-center lg:text-left animate-slide-in-up flex flex-col items-center lg:items-start">
            <div className="inline-block mb-4 md:mb-6 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-primary font-medium text-xs md:text-sm tracking-widest uppercase shadow-lg">
              Start Your Adventure
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.1] drop-shadow-lg">
              Find Your Next <br className="hidden sm:block" />
              <span className="text-primary relative inline-block mt-1 md:mt-2">
                Perfect Escape
                {/* Subtle underline SVG */}
                <svg className="absolute w-full h-2 md:h-3 -bottom-1 md:-bottom-2 left-0 text-primary/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-lg leading-relaxed font-light drop-shadow-md">
              Discover breathtaking destinations, connect with like-minded travelers, and create memories that last a lifetime.
            </p>

            {/* Sleek search bar - responsive */}
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1.5 md:p-2 flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:bg-white/15 transition-all duration-300">
              <div className="pl-3 md:pl-4 pr-1 md:pr-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
              </div>
              <input
                type="text"
                placeholder="Where to go?"
                className="grow bg-transparent border-none outline-none text-white placeholder:text-gray-300 font-medium px-1 md:px-2 text-sm md:text-lg w-full min-w-0"
              />
              <Link href="#packages">
                <Button className="rounded-full bg-primary hover:bg-accent text-white px-5 md:px-8 h-10 md:h-12 shadow-lg hover:shadow-primary/50 transition-all font-semibold text-sm md:text-base whitespace-nowrap">
                  Search
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Elegant Floating Cards (Hidden on small mobile, visible on sm and up but scaled) */}
          <div className="relative h-75 sm:h-100 lg:h-125 hidden sm:block">
            {/* Main Center Review Card */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-70 lg:w-85 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 lg:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 animate-float">
              <div className="flex gap-3 lg:gap-4 items-center mb-3 lg:mb-4">
                <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full overflow-hidden relative border-2 border-primary/50 shadow-glow-primary">
                  <Image src="/images/avatar-1.jpg" alt="Traveler" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base lg:text-lg">Sarah Jenkins</h4>
                  <div className="flex text-yellow-400 gap-0.5 mt-0.5 lg:mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-200 text-xs lg:text-sm leading-relaxed italic line-clamp-4 lg:line-clamp-none">
                "Absolutely breathtaking experience. The itinerary was flawless and the guides were incredibly knowledgeable. Will definitely book again!"
              </p>
            </div>

            {/* Top Right Review Card */}
            <div className="absolute top-0 lg:top-8 right-0 lg:-right-8 w-60 lg:w-70 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-4 lg:p-5 shadow-2xl z-10 animate-float [animation-delay:1.5s] opacity-70 rotate-6 hover:rotate-0 hover:opacity-100 hover:z-30 transition-all duration-500 cursor-default hidden md:block">
              <div className="flex gap-2 lg:gap-3 items-center mb-2 lg:mb-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-accent/80 flex items-center justify-center text-white font-bold border border-white/20 text-sm">
                  M
                </div>
                <div>
                  <h4 className="text-white font-medium text-xs lg:text-sm">Mark D.</h4>
                  <div className="flex text-yellow-400 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-[10px] lg:text-xs leading-relaxed line-clamp-3">
                "The group trip to Bali exceeded all my expectations. The perfect balance of adventure and relaxation."
              </p>
            </div>

            {/* Bottom Left Destination Card */}
            <Link href="/packages/honeymoon-trips">
              <div className="absolute bottom-4 lg:bottom-12 -left-4 lg:-left-8 w-60 lg:w-70 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-4 lg:p-5 shadow-2xl z-30 animate-float [animation-delay:2.5s] -rotate-6 hover:rotate-0 hover:z-40 transition-all duration-500 group cursor-pointer hidden md:block">
                <div className="flex items-center justify-between mb-2 lg:mb-3">
                  <span className="text-[10px] lg:text-xs text-white/70 uppercase tracking-widest font-semibold">Trending</span>
                  <div className="bg-primary/20 text-primary text-[10px] lg:text-xs px-2 py-1 rounded-full font-bold border border-primary/30">Top Rated</div>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">Swiss Alps</h3>
                <p className="text-xs lg:text-sm text-gray-300 mb-3 lg:mb-4">7 Days • 6 Nights</p>
                <div className="flex justify-between items-center pt-2 lg:pt-3 border-t border-white/10">
                  <span className="text-white font-bold text-base lg:text-lg">$1,299</span>
                  <span className="text-primary text-xs lg:text-sm font-semibold group-hover:translate-x-1 transition-transform">Explore →</span>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Elegant, Simple Stats Footer - Responsive Grid */}
      <div className="relative z-10 w-full mt-2 lg:mt-auto bg-linear-to-t from-black/80 to-transparent pt-8 lg:pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-6 lg:pt-8">
          <div className="grid grid-cols-2 lg:flex lg:flex-wrap lg:justify-between items-center gap-y-8 gap-x-4 lg:gap-0">

            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 group text-center lg:text-left">
              <span className="text-3xl lg:text-4xl font-light text-white group-hover:text-primary transition-colors">10k<span className="text-primary text-2xl lg:text-3xl font-bold ml-0.5">+</span></span>
              <span className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider font-semibold w-full lg:w-24 leading-snug">Happy Travelers</span>
            </div>

            <div className="hidden lg:block w-px h-10 bg-white/10"></div>

            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 group text-center lg:text-left">
              <span className="text-3xl lg:text-4xl font-light text-white group-hover:text-primary transition-colors">50<span className="text-primary text-2xl lg:text-3xl font-bold ml-0.5">+</span></span>
              <span className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider font-semibold w-full lg:w-24 leading-snug">Amazing Destinations</span>
            </div>

            <div className="hidden lg:block w-px h-10 bg-white/10"></div>

            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 group text-center lg:text-left">
              <span className="text-3xl lg:text-4xl font-light text-white group-hover:text-primary transition-colors">4.9</span>
              <span className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider font-semibold w-full lg:w-24 leading-snug">Average Rating</span>
            </div>

            <div className="hidden lg:block w-px h-10 bg-white/10"></div>

            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 group text-center lg:text-left">
              <span className="text-3xl lg:text-4xl font-light text-white group-hover:text-primary transition-colors">9<span className="text-primary text-2xl lg:text-3xl font-bold ml-0.5">+</span></span>
              <span className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider font-semibold w-full lg:w-24 leading-snug">Years Experience</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
