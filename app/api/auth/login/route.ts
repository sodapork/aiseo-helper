import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '../../../../payload.config'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: payloadConfig })
    
    // Authenticate user with Payload
    const { user, token } = await payload.login({
      collection: 'users',
      data: {
        email: email.toLowerCase().trim(),
        password,
      },
    })

    // Check if user is verified (if email verification is enabled)
    if (user.emailVerified === false) {
      return NextResponse.json(
        { error: 'Please verify your email address before signing in' },
        { status: 401 }
      )
    }

    // Check subscription status
    if (user.subscriptionStatus === 'expired' || user.subscriptionStatus === 'cancelled') {
      // Allow login but warn about subscription
      console.log(`User ${user.email} logged in with ${user.subscriptionStatus} subscription`)
    }

    // Create response with enhanced user data
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionTier: user.subscriptionTier,
        profile: user.profile,
        preferences: user.preferences,
        usage: user.usage,
        emailVerified: user.emailVerified,
      },
      message: 'Login successful',
    })

    // Set the JWT token as an HTTP-only cookie
    if (token) {
      response.cookies.set('payload-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
    }

    return response
  } catch (error: any) {
    console.error('Login error:', error)
    
    // Handle specific authentication errors
    if (error.message?.includes('Invalid credentials')) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    if (error.message?.includes('User not found')) {
      return NextResponse.json(
        { error: 'No account found with this email address' },
        { status: 401 }
      )
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
} 