export function Footer() {
  return (
    <footer className="bg-foreground text-white py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8 stagger-children">
          <div>
            <h3 className="text-lg font-bold mb-4">Journey</h3>
            <p className="text-white/70">
              Creating unforgettable travel experiences
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="/domestic-trips" className="hover:text-white transition">Domestic Trips</a></li>
              <li><a href="/international-trips" className="hover:text-white transition">International Trips</a></li>
              <li><a href="/blogs" className="hover:text-white transition">Travel Blogs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="/about-us" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8">
          <p className="text-center text-white/70">
            © 2024 Journey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
