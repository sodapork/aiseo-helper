import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

export async function PUT(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json()
    
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
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

    // Verify current password and update to new password
    try {
      await payload.login({
        collection: 'users',
        data: {
          email: user.email,
          password: currentPassword,
        },
      })
    } catch (error) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Update the password
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: newPassword,
      },
    })

    return NextResponse.json({
      message: 'Password changed successfully',
    })
  } catch (error: any) {
    console.error('Password change error:', error)
    
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    )
  }
} 