'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Info } from 'lucide-react'

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  packageTitle: string
  optionName?: string
  totalPrice: number | string
  selectedDate?: Date
}

export function BookingDialog({ open, onOpenChange, packageTitle, optionName = 'Standard', totalPrice, selectedDate }: BookingDialogProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', date: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setFormData(prev => ({
        ...prev,
        date: selectedDate ? selectedDate.toISOString().split('T')[0] : ''
      }))
    }
  }, [open, selectedDate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.email || !formData.date) return
    setLoading(true)
    
    // Clean numeric price
    let numericPrice = 0
    if (typeof totalPrice === 'number') {
      numericPrice = totalPrice
    } else {
      // If it's a string, strip non-numeric characters (except digits)
      const cleaned = String(totalPrice).replace(/[^\d]/g, '')
      numericPrice = parseInt(cleaned, 10) || 0
    }

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          packageTitle,
          optionName,
          totalPrice: numericPrice,
          date: formData.date
        })
      })
      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
        if (result.previewUrl) {
          setPreviewUrl(result.previewUrl)
        }
      } else {
        alert(`Error: ${result.error || 'Failed to submit booking'}`)
      }
    } catch (err) {
      console.error(err)
      alert('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative border border-slate-100 animate-scale-in max-h-[calc(100dvh-2rem)] overflow-y-auto">
        <button
          onClick={() => { onOpenChange(false); setSubmitted(false); setPreviewUrl(null); }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors text-lg"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-100 font-bold text-xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-800">Booking Confirmed!</h3>
            <p className="text-sm text-slate-500 mt-2">
              A confirmation email has been sent to <strong>{formData.email}</strong>, and an alert has been dispatched to the owner.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Our travel consultant will call you back on <strong>{formData.phone}</strong> within 15 minutes to plan your trip{formData.date ? ` starting on ${new Date(formData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : ''}.
            </p>
            
            {previewUrl && (
              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100 text-left">
                <p className="text-xs text-amber-800 font-bold mb-1">Dev Notice (Test Email):</p>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline break-all font-semibold flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5 shrink-0" /> Click to view sent email preview
                </a>
              </div>
            )}

            <Button
              className="mt-6 w-full h-11 rounded-xl"
              onClick={() => { onOpenChange(false); setSubmitted(false); setPreviewUrl(null); }}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-sans">Book Your Trip</h3>
              <p className="text-xs text-slate-500 mt-0.5">Confirm details for {packageTitle}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100/50 text-xs text-slate-600 font-semibold space-y-1">
              <p>Trip: <span className="text-slate-800 font-bold">{packageTitle}</span></p>
              {optionName && optionName !== 'Standard' && <p>Option: <span className="text-slate-800 font-bold">{optionName}</span></p>}
              <p>Estimated Cost: <span className="text-primary font-extrabold text-sm">{typeof totalPrice === 'number' ? `₹${totalPrice.toLocaleString('en-IN')}` : totalPrice}</span></p>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Your Name *</label>
              <Input
                required
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white border-slate-200 focus-visible:ring-primary h-11 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Phone/Contact Number *</label>
              <Input
                required
                type="tel"
                placeholder="e.g. +91 98096 60999"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white border-slate-200 focus-visible:ring-primary h-11 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Preferred Departure Date *</label>
              <Input
                required
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-white border-slate-200 focus-visible:ring-primary h-11 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address *</label>
              <Input
                required
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white border-slate-200 focus-visible:ring-primary h-11 rounded-xl"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-white hover:bg-primary/90 font-bold rounded-xl shadow-sm"
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
