import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Admin routes are now public - no authentication required
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
