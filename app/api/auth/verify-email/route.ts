import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '../../../../payload.config'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: payloadConfig })

    // Verify email using the token
    await payload.verifyEmail({
      collection: 'users',
      token,
    })

    return NextResponse.json({
      message: 'Email verified successfully!'
    })
  } catch (error: any) {
    console.error('Email verification error:', error)
    
    // Handle specific errors
    if (error.message?.includes('Token is invalid')) {
      return NextResponse.json(
        { error: 'Invalid verification token.' },
        { status: 400 }
      )
    }

    if (error.message?.includes('Token has expired')) {
      return NextResponse.json(
        { error: 'Verification token has expired. Please request a new verification email.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Email verification failed. Please try again.' },
      { status: 500 }
    )
  }
} 