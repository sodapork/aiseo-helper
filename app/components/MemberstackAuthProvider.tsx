'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useMemberstack } from '@memberstack/react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'premium' | 'member' | 'guest'
  subscriptionStatus: 'active' | 'inactive' | 'trial' | 'expired' | 'cancelled'
  subscriptionTier: 'free' | 'basic' | 'pro' | 'enterprise'
  profile?: {
    avatar?: string
    bio?: string
    company?: string
    website?: string
    location?: string
    phone?: string
  }
  preferences?: {
    theme: 'light' | 'dark' | 'system'
    emailNotifications: boolean
    marketingEmails: boolean
  }
  usage?: {
    lastLogin?: string
    loginCount: number
    apiCalls: number
  }
  emailVerified?: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: () => Promise<{ success: boolean; error?: string }>
  register: () => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  forgotPassword: () => Promise<{ success: boolean; error?: string }>
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; error?: string }>
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: string }>
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
  refreshUser: () => Promise<void>
  hasPermission: (permission: string) => boolean
  isSubscriptionActive: () => boolean
  canAccessFeature: (feature: string) => boolean
  openMemberstackModal: (type: 'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD' | 'PROFILE') => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function MemberstackAuthProvider({ 
  children, 
  user: initialUser 
}: { 
  children: ReactNode
  user: User | null 
}) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()
  const memberstack = useMemberstack()

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check existing auth system
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        })
        
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setUser(null)
      } finally {
        setIsInitialized(true)
      }
    }

    if (!initialUser) {
      checkAuth()
    } else {
      setIsInitialized(true)
    }
  }, [initialUser])

  const openMemberstackModal = useCallback(async (type: 'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD' | 'PROFILE') => {
    try {
      await memberstack.openModal(type)
    } catch (error) {
      console.error('Error opening Memberstack modal:', error)
    }
  }, [memberstack])

  const login = useCallback(async () => {
    setIsLoading(true)
    try {
      await memberstack.openModal('LOGIN')
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    } finally {
      setIsLoading(false)
    }
  }, [memberstack])

  const register = useCallback(async () => {
    setIsLoading(true)
    try {
      await memberstack.openModal('SIGNUP')
      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Registration failed' }
    } finally {
      setIsLoading(false)
    }
  }, [memberstack])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      // Logout from existing system
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const forgotPassword = useCallback(async () => {
    try {
      await memberstack.openModal('FORGOT_PASSWORD')
      return { success: true }
    } catch (error: any) {
      console.error('Forgot password error:', error)
      return { success: false, error: error.message || 'Failed to send reset email' }
    }
  }, [memberstack])

  const resetPassword = useCallback(async (token: string, password: string) => {
    try {
      // Use existing API for password reset
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to reset password' }
      }

      return { success: true }
    } catch (error: any) {
      console.error('Reset password error:', error)
      return { success: false, error: error.message || 'Failed to reset password' }
    }
  }, [])

  const verifyEmail = useCallback(async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to verify email' }
      }

      return { success: true }
    } catch (error: any) {
      console.error('Email verification error:', error)
      return { success: false, error: error.message || 'Failed to verify email' }
    }
  }, [])

  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      await memberstack.openModal('PROFILE')
      return { success: true }
    } catch (error: any) {
      console.error('Update profile error:', error)
      return { success: false, error: error.message || 'Failed to update profile' }
    }
  }, [memberstack])

  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      })
      
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      }
    } catch (error) {
      console.error('Refresh user error:', error)
    }
  }, [])

  const hasPermission = useCallback((permission: string) => {
    if (!user) return false
    
    switch (permission) {
      case 'admin':
        return user.role === 'admin'
      case 'premium':
        return ['admin', 'premium'].includes(user.role)
      case 'member':
        return ['admin', 'premium', 'member'].includes(user.role)
      default:
        return false
    }
  }, [user])

  const isSubscriptionActive = useCallback(() => {
    if (!user) return false
    return user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trial'
  }, [user])

  const canAccessFeature = useCallback((feature: string) => {
    if (!user) return false
    
    switch (feature) {
      case 'content-optimizer':
        return user.subscriptionTier === 'pro' || user.subscriptionTier === 'enterprise'
      case 'keyword-analyzer':
        return user.subscriptionTier === 'pro' || user.subscriptionTier === 'enterprise'
      case 'advanced-analytics':
        return user.subscriptionTier === 'enterprise'
      default:
        return true
    }
  }, [user])

  const value: AuthContextType = {
    user,
    isLoading: isLoading || !isInitialized,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    updateProfile,
    refreshUser,
    hasPermission,
    isSubscriptionActive,
    canAccessFeature,
    openMemberstackModal,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 