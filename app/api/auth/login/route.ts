import { generateToken } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

async function parseRequestBody(request: NextRequest) {
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return request.json()
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData()
    return {
      email: formData.get('email'),
      password: formData.get('password'),
    }
  }

  const text = await request.text()
  try {
    return JSON.parse(text)
  } catch {
    return { email: undefined, password: undefined }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request)
    const email = typeof body.email === 'string' ? body.email : undefined
    const password = typeof body.password === 'string' ? body.password : undefined

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const ADMIN_EMAIL = 'admin@travelcastle.com'
    const ADMIN_PASSWORD = 'admin123'

    if (email.toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const token = generateToken(ADMIN_EMAIL)
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
    })

    response.cookies.set({
      name: 'admin-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

