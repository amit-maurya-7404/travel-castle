import { clearAuthCookie } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    await clearAuthCookie()
    return NextResponse.json({
      success: true,
      message: 'Logout successful',
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
