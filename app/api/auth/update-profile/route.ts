import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '../../../../payload.config'

export async function PUT(request: NextRequest) {
  try {
    const payload = await getPayload({ config: payloadConfig })
    
    // Get the current user from the request
    const { user } = await payload.auth({ headers: request.headers })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const updateData = await request.json()

    // Validate email if provided
    if (updateData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(updateData.email)) {
        return NextResponse.json(
          { error: 'Please enter a valid email address' },
          { status: 400 }
        )
      }

      // Check if email is already taken by another user
      const existingUser = await payload.find({
        collection: 'users',
        where: {
          and: [
            { email: { equals: updateData.email.toLowerCase().trim() } },
            { id: { not_equals: user.id } }
          ]
        }
      })

      if (existingUser.docs.length > 0) {
        return NextResponse.json(
          { error: 'An account with this email address already exists' },
          { status: 409 }
        )
      }
    }

    // Update user profile
    const updatedUser = await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        ...updateData,
        email: updateData.email ? updateData.email.toLowerCase().trim() : undefined,
        name: updateData.name ? updateData.name.trim() : undefined,
      },
    })

    // Return updated user data
    return NextResponse.json({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        subscriptionStatus: updatedUser.subscriptionStatus,
        subscriptionTier: updatedUser.subscriptionTier,
        profile: updatedUser.profile,
        preferences: updatedUser.preferences,
        usage: updatedUser.usage,
        emailVerified: updatedUser.emailVerified,
      },
      message: 'Profile updated successfully',
    })
  } catch (error: any) {
    console.error('Update profile error:', error)
    
    // Handle validation errors
    if (error.errors) {
      const firstError = Object.values(error.errors)[0] as any
      return NextResponse.json(
        { error: firstError?.message || 'Validation failed' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update profile. Please try again.' },
      { status: 500 }
    )
  }
} 