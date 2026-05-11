'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-background border-b border-border/50 shadow-md"

      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Left: Logo */}
          <div className="flex-1 flex items-center gap-3 group  z-50">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Travel Castle"
                width={50}
                height={50}
                className="w-auto h-16 md:h-20"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation Links (Added whitespace-nowrap to prevent text wrapping) */}
          <div className="flex-[2] hidden md:flex items-center justify-center gap-8">
            <Link href="/domestic-trips" className="transition relative group font-medium text-foreground hover:text-primary whitespace-nowrap">
              Domestic Trips
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/international-trips" className="transition relative group font-medium text-foreground hover:text-primary whitespace-nowrap">
              International Trips
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/blogs" className="transition relative group font-medium text-foreground hover:text-primary whitespace-nowrap">
              Blogs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about-us" className="transition relative group font-medium text-foreground hover:text-primary whitespace-nowrap">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Right: Contact Us Button & Mobile Toggle */}
          <div className="flex-1 flex items-center justify-end z-50">
            <div className="hidden md:block">
              <Link href="/contact-us">
                <Button className="bg-primary hover:bg-accent text-white shadow-glow-primary hover-lift">Contact Us</Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md text-foreground hover:bg-black/5 transition-colors"
                aria-label="Open Menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Premium Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-background z-[60] shadow-2xl flex flex-col md:hidden transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <Image src="/logo.png" alt="Travel Castle" width={40} height={40} className="h-12 w-auto" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full bg-secondary hover:bg-black/10 text-foreground transition-all transform hover:rotate-90 duration-300"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-2 overflow-y-auto flex-grow">
          {['Domestic Trips', 'International Trips', 'Blogs', 'About Us'].map((item, index) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className={`flex items-center justify-between text-xl font-bold py-4 border-b border-border/30 text-foreground hover:text-primary transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}
        </div>

        <div className={`p-6 mt-auto transform transition-all duration-500 delay-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Link href="/contact-us" className="block" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full h-14 text-lg bg-primary hover:bg-accent text-white shadow-glow-primary rounded-xl">
              Contact Us
            </Button>
          </Link>
          <p className="text-center text-sm text-muted-foreground mt-6">
            © 2024 Travel Castle. All rights reserved.
          </p>
        </div>
      </div>
    </>
  )
}
