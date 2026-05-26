'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Mail, Phone, Sparkles, Clock4, ShieldCheck } from 'lucide-react'

const benefits = [
  {
    title: 'Tailor-made itineraries',
    description: 'Every trip is designed around your preferences, pace, and budget.',
  },
  {
    title: 'Dedicated travel expert',
    description: 'A personal travel specialist supports your journey from start to finish.',
  },
  {
    title: 'Trusted local partners',
    description: 'We work with premium local teams to deliver seamless experiences.',
  },
]

const contactInfo = [
  {
    icon: MapPin,
    label: 'Head Office',
    value: 'G-6, Ecstasy Business Park, JSD Road, Near City of Joy, Mulund West, Mumbai - 400080.',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-9809660999 / +91-9820702727',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@travelcastle.in',
  },
]

const stats = [
  { label: 'Avg. response time', value: '2 hours' },
  { label: 'Expert planners', value: '24/7 travel support' },
  { label: 'Satisfied clients', value: '98%+' },
]

export default function ContactUsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden bg-slate-950 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                <Sparkles className="h-4 w-4" />
                Talk to travel experts
              </span>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                Professional travel support for every step of your journey.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Whether you need a custom itinerary, business travel assistance, or a luxury escape, our expert team delivers clarity, care, and confidence from planning through departure.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/40">
              <div className="space-y-4 border-b border-white/10 pb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Why choose Travel Castle</p>
                <p className="text-lg text-slate-300">
                  We combine premium service, local expertise, and transparent communication to create trip planning that feels effortless.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="font-semibold text-white">{benefit.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-4xl border border-border bg-card p-10 shadow-xl shadow-slate-900/10">
            <div className="mb-10 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Contact form</p>
              <h2 className="text-3xl font-semibold text-foreground">Tell us what you need</h2>
              <p className="text-slate-500 leading-7">
                Share the details of your travel goals and we&apos;ll craft a personalized response that fits your style and schedule.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-3">
                  <span className="text-sm font-semibold text-slate-200">Full Name</span>
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="space-y-3">
                  <span className="text-sm font-semibold text-slate-200">Email address</span>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="john@company.com"
                    autoComplete="email"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-3">
                  <span className="text-sm font-semibold text-slate-200">Phone</span>
                  <Input
                    type="tel"
                    placeholder="+91 98096 60999"
                    autoComplete="tel"
                  />
                </label>
                <label className="space-y-3">
                  <span className="text-sm font-semibold text-slate-200">Subject</span>
                  <Input
                    placeholder="Trip planning, group travel, corporate event"
                  />
                </label>
              </div>

              <label className="space-y-3">
                <span className="text-sm font-semibold text-slate-200">Message</span>
                <Textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Share your travel goals, preferences, and ideal dates."
                  rows={8}
                  required
                />
              </label>

              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-sm text-slate-300">
                <p className="font-semibold text-slate-100">What to include</p>
                <p className="mt-2 leading-6">
                  Destination, number of travelers, travel dates, and any special requests help us prepare a precise and personalized proposal.
                </p>
              </div>

              <Button type="submit" className="w-full justify-center bg-primary text-white hover:bg-primary/90">
                Submit request
              </Button>

              <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-400">
                <p>Typical reply time: <span className="font-medium text-slate-100">within 2 hours</span></p>
                <p>Need urgent help? Call <span className="font-medium text-slate-100">+91-9809660999 / +91-9820702727</span></p>
              </div>

              {submitted && (
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-700">
                  <p className="font-semibold">Thank you!</p>
                  <p className="mt-1">Your request has been received. We will reply within one business day.</p>
                </div>
              )}
            </form>
          </div>

          <aside className="space-y-8 rounded-4xl border border-border bg-slate-950/90 p-10 shadow-xl shadow-slate-900/20">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Reach us anytime</p>
              <h3 className="text-2xl font-semibold text-white">Office & support</h3>
              <p className="text-slate-400 leading-7">
                Our travel advisors are ready to discuss your next itinerary, group travel plans, or corporate event with care and precision.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-100">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-300">{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <div className="flex items-center gap-3">
                <Clock4 className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium text-slate-100">Support hours</p>
              </div>
              <p className="text-slate-400">Monday – Friday • 9:00 AM – 6:00 PM</p>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="text-sm text-slate-300">Trusted planning with secure booking support and transparent pricing.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
