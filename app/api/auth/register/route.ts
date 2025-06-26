import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '../../../../payload.config'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()
    
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: payloadConfig })
    
    // Create new user with Payload
    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        role: 'editor', // Default role for new users
      },
    })

    // Automatically log in the user after registration
    const { token } = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      message: 'Registration successful',
    })

    // Set the JWT token as an HTTP-only cookie
    if (token) {
      response.cookies.set('payload-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    return response
  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Handle duplicate email error
    if (error.errors?.email?.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
} 