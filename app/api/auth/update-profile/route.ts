import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

export async function PUT(request: NextRequest) {
  try {
    const { name, email } = await request.json()
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const payload = await getPayload()
    
    // Get the current user from the session
    const { user } = await payload.auth({ headers: request.headers })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Update the user profile
    const updatedUser = await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        name,
        email,
      },
    })

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
      },
      message: 'Profile updated successfully',
    })
  } catch (error: any) {
    console.error('Profile update error:', error)
    
    // Handle duplicate email error
    if (error.errors?.email?.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
} 