import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User, Clock, ChevronRight, Share2, Sparkles, Send } from 'lucide-react'
import { blogs } from '@/constants/blogsData'
import { Button } from '@/components/ui/button'

interface PageProps {
  params: Promise<{ id: string }>
}

// 1. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const blog = blogs.find((b) => b.id === id)
  if (!blog) {
    return {
      title: 'Blog Post Not Found | Travel Castle',
      description: 'The requested travel blog article could not be found on Travel Castle.',
    }
  }

  return {
    title: `${blog.title} | Travel Castle Blogs`,
    description: blog.description,
    keywords: blog.keywords,
    alternates: {
      canonical: `https://travelcastle.in/blogs/${blog.id}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://travelcastle.in/blogs/${blog.id}`,
      siteName: 'Travel Castle',
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  }
}

// Static params generation for super-fast SSG (Static Site Generation) caching and instant SEO crawls
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    id: blog.id,
  }))
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    notFound()
  }

  // Related posts (excluding current one)
  const relatedPosts = blogs.filter((b) => b.id !== id).slice(0, 2)

  // 2. Structured JSON-LD for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://travelcastle.in/blogs/${blog.id}`,
    },
    'headline': blog.title,
    'description': blog.description,
    'image': `https://travelcastle.in${blog.image}`,
    'datePublished': blog.date,
    'author': {
      '@type': 'Person',
      'name': blog.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Travel Castle',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://travelcastle.in/logo.png',
      },
    },
  }

  return (
    <>
      {/* Dynamic SEO JSON-LD Injection */}
      <script
        type="application/ld-json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-slate-950 text-slate-100 pb-20">
        {/* Glassmorphic Background Header Hero */}
        <div className="relative h-[45vh] md:h-[70vh] w-full overflow-hidden flex items-end">
          {/* Blurred Background Layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src={blog.image}
              alt=""
              fill
              className="object-cover blur-2xl opacity-30 scale-110"
              priority
            />
            {/* Soft gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-green-500/10"></div>
          </div>

          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 pb-8 md:pb-12">
            {/* Breadcrumb Navigation (Excellent for SEO Crawler Indexing) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 bg-white/5 border border-white/10 w-fit px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <Link href="/" className="hover:text-primary transition">Home</Link>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <Link href="/blogs" className="hover:text-primary transition">Blogs</Link>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-primary truncate max-w-[200px]">{blog.title}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15] drop-shadow-md">
              {blog.title}
            </h1>

            {/* Post Meta Section */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 border-t border-b border-white/10 py-4 mt-2 w-full">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{blog.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{blog.readTime}</span>
              </div>

              <span className="sm:ml-auto text-[10px] sm:text-xs uppercase tracking-widest font-extrabold bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full">
                {blog.category}
              </span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Main Content Column */}
            <main className="lg:col-span-8 space-y-8">
              {/* Featured Image */}
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Dynamic Rich Content Sections */}
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light">
                {blog.sections.map((section, idx) => {
                  switch (section.type) {
                    case 'heading':
                      return (
                        <h2 key={idx} className="text-2xl md:text-3xl font-extrabold text-white pt-6 pb-2 leading-tight">
                          {section.content}
                        </h2>
                      )
                    case 'subheading':
                      return (
                        <h3 key={idx} className="text-xl md:text-2xl font-bold text-white pt-4 pb-1">
                          {section.content}
                        </h3>
                      )
                    case 'paragraph':
                      return (
                        <p key={idx} className="text-slate-300 leading-relaxed font-light">
                          {section.content}
                        </p>
                      )
                    case 'quote':
                      return (
                        <blockquote key={idx} className="pl-6 border-l-4 border-primary italic text-white bg-white/5 py-4 pr-4 rounded-r-2xl font-medium my-6">
                          {section.content}
                        </blockquote>
                      )
                    case 'callout':
                      return (
                        <div key={idx} className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary/20 text-slate-200 text-base font-semibold leading-relaxed my-6 flex gap-3">
                          <span>{section.content}</span>
                        </div>
                      )
                    case 'list':
                      return (
                        <ul key={idx} className="space-y-4 my-6 list-none pl-1">
                          {(section.content as string[]).map((item, itemIdx) => {
                            // Extract bold parts like **text**
                            const parts = item.split('**');
                            return (
                              <li key={itemIdx} className="flex gap-3 text-slate-300 text-base md:text-lg leading-relaxed align-top">
                                <span className="text-primary mt-1 text-lg font-bold">✓</span>
                                <span>
                                  {parts.map((part, partIdx) =>
                                    partIdx % 2 === 1 ? (
                                      <strong key={partIdx} className="font-bold text-white">{part}</strong>
                                    ) : (
                                      part
                                    )
                                  )}
                                </span>
                              </li>
                            )
                          })}
                        </ul>
                      )
                    default:
                      return null
                  }
                })}
              </div>

              {/* Back Button */}
              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <Link href="/blogs">
                  <Button variant="outline" className="border-white/10 text-white bg-slate-700 hover:bg-white/5 flex items-center gap-2 rounded-xl">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blogs
                  </Button>
                </Link>
              </div>
            </main>

            {/* Sidebar Column (SEO Internal Linking / Lead Generation) */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Premium Plan Trip CTA Widget */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-xl space-y-5 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Sparkles className="h-6 w-6 animate-pulse-soft" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white">Want a Tailored Experience?</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Don't settle for off-the-shelf itineraries. Let <strong>Travel Castle</strong>, the best travel agency, customize your next adventure!
                  </p>
                </div>
                <Link href="/#packages" className="block w-full">
                  <Button className="w-full bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-bold h-11 rounded-xl hover-lift">
                    Customize My Trip
                  </Button>
                </Link>
              </div>

              {/* Related Articles Widget */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2">Related Articles</h4>
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link key={post.id} href={`/blogs/${post.id}`} className="block group">
                      <div className="flex gap-3 items-center">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                          <Image src={post.image} alt={post.title} fill className="object-cover" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-sm font-bold text-white group-hover:text-primary transition duration-300 line-clamp-2 leading-tight">
                            {post.title}
                          </h5>
                          <span className="text-xs text-slate-500">{post.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </article>
    </>
  )
}
