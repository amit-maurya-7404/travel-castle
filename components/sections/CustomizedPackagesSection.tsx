import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { packages } from '@/constants/data'
import { PackageCard } from '@/components/ui/PackageCard'

export function CustomizedPackagesSection() {
  return (
    <section id="packages" className="py-20 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-80 h-80 bg-primary/10 rounded-full blur-3xl top-1/2 -right-40 animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-14 animate-slide-in-up flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold uppercase text-xs tracking-widest">Tailored Experiences</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Customized <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Packages</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl font-light">
            You imagine it. We build it. Every detail shaped around you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {packages.map((pkg, idx) => (
            <PackageCard key={idx} {...pkg} />
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in [animation-delay:0.6s] opacity-0">
          <Link href="/contact-us">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 hover-lift">
              Plan Your Custom Trip
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
