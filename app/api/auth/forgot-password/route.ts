import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '../../../../payload.config'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: payloadConfig })

    // Check if user exists
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: { equals: email.toLowerCase().trim() }
      }
    })

    if (existingUser.docs.length === 0) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: 'If an account with that email exists, a password reset link has been sent.'
      })
    }

    // Send password reset email
    await payload.forgotPassword({
      collection: 'users',
      data: {
        email: email.toLowerCase().trim(),
      },
      disableEmail: false,
    })

    return NextResponse.json({
      message: 'If an account with that email exists, a password reset link has been sent.'
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    
    // Don't reveal specific errors for security
    return NextResponse.json({
      message: 'If an account with that email exists, a password reset link has been sent.'
    })
  }
} 