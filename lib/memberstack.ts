import { useMemberstack, MemberstackProvider } from '@memberstack/react'

// Memberstack configuration types
export interface MemberstackUser {
  id: string
  email: string
  name?: string
  membership?: {
    id: string
    name: string
    status: 'active' | 'inactive' | 'trial' | 'expired' | 'cancelled'
    plan?: {
      id: string
      name: string
      price?: number
      interval?: 'monthly' | 'yearly'
    }
  }
  metadata?: Record<string, any>
}

// Helper functions for Memberstack integration
export const getMemberstackUser = async (memberstack: any): Promise<MemberstackUser | null> => {
  try {
    const user = await memberstack.getCurrentUser()
    return user
  } catch (error) {
    console.error('Error getting Memberstack user:', error)
    return null
  }
}

export const signUpWithMemberstack = async (memberstack: any, email: string, password: string, metadata?: Record<string, any>) => {
  try {
    const result = await memberstack.signUp({
      email,
      password,
      metadata,
    })
    return { success: true, user: result.user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const signInWithMemberstack = async (memberstack: any, email: string, password: string) => {
  try {
    const result = await memberstack.signIn({
      email,
      password,
    })
    return { success: true, user: result.user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const signOutWithMemberstack = async (memberstack: any) => {
  try {
    await memberstack.signOut()
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Export the hooks and provider for use in components
export { useMemberstack, MemberstackProvider } 