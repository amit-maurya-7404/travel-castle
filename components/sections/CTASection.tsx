import { Button } from '@/components/ui/button'
import { ArrowRight, PlaneTakeoff } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden flex items-center justify-center">
      {/* Edge-to-Edge Gradient Banner */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#0a3d2c] to-black z-0"></div>

      {/* Elegant Overlay Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('/images/hero-destination.jpg')] bg-cover bg-center mix-blend-overlay"></div>

      {/* Floating Light Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow [animation-delay:2s]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-in-up relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/20">
          <PlaneTakeoff className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl tracking-tight">
          Ready to Start Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">Next Adventure?</span>
        </h2>

        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Let's create an unforgettable journey tailored exactly to your dreams. Stop dreaming, start exploring.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
          <Link href="/contact-us" className="w-full sm:w-auto flex-1">
            <Button size="lg" className="w-full bg-white text-black hover:bg-gray-200 px-8 h-14 rounded-full font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 group">
              Get in Touch
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#trips" className="w-full sm:w-auto flex-1">
            <Button size="lg" variant="outline" className="w-full border-white/30 text-white bg-white/10 hover:bg-white/10 px-8 h-14 rounded-full font-bold shadow-lg transition-all hover:border-white">
              View Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
