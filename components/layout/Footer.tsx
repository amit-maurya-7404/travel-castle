import Image from 'next/image'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr_1fr_1.3fr]">
          <div className="space-y-0">

            <div className="relative h-30 w-60 overflow-hidden ">
              <Image src="/logo.png" alt="Travel Castle" fill className="object-contain" />
            </div>
            <div>
              {/* <p className="text-2xl font-semibold tracking-tight">Travel Castle</p> */}
              {/* <p className="text-sm text-slate-400"></p> */}
            </div>

            <p className="max-w-md text-slate-400 leading-relaxed mb-5">
              Luxury travel planning for unforgettable journeys.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { href: '#', label: 'Facebook', icon: Facebook },
                { href: '#', label: 'Instagram', icon: Instagram },
                { href: '#', label: 'Twitter', icon: Twitter },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-primary hover:bg-primary/10"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 mb-6">Explore</h4>
            <ul className="space-y-3 text-slate-300">
              <li><a href="/domestic-trips" className="transition hover:text-white">Domestic Trips</a></li>
              <li><a href="/international-trips" className="transition hover:text-white">International Trips</a></li>
              <li><a href="/blogs" className="transition hover:text-white">Travel Blogs</a></li>
              <li><a href="/about-us" className="transition hover:text-white">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 mb-6">Support</h4>
            <ul className="space-y-3 text-slate-300">
              <li><a href="#" className="transition hover:text-white">Contact</a></li>
              <li><a href="#" className="transition hover:text-white">FAQ</a></li>
              <li><a href="#" className="transition hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="transition hover:text-white">Terms of Service</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 mb-6">Contact</h4>
              <div className="space-y-3 text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <p>G-6, Ecstasy Business Park, JSD Road, Near City of Joy, Mulund West, Mumbai - 400080.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <p className="flex flex-col gap-1">
                    <a href="tel:+919809660999" className="hover:text-primary transition">+91-9809660999</a>
                    <a href="tel:+919820702727" className="hover:text-primary transition">+91-9820702727</a>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <p>
                    <a href="mailto:info@travelcastle.in" className="hover:text-primary transition">info@travelcastle.in</a>
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-slate-100 mb-3">Stay inspired</p>
              <p className="text-sm text-slate-400 mb-5">Subscribe for fresh travel ideas and exclusive offers.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-primary/90"
                >
                  Subscribe
                </a>
              </div>
            </div> */}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-slate-500 text-sm sm:flex sm:items-center sm:justify-between">
          <p>© 2026 Travel Castle. All rights reserved.</p>
          <p>Designed for modern explorers and travel brands.</p>
        </div>
      </div>
    </footer>
  )
}
