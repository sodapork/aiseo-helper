'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { MemberstackProvider, useMemberstack } from '@memberstack/react'
import { MemberstackUser, signUpWithMemberstack, signInWithMemberstack, signOutWithMemberstack } from '../../lib/memberstack'

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
  memberstackUser?: MemberstackUser
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; error?: string }>
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: string }>
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
  refreshUser: () => Promise<void>
  hasPermission: (permission: string) => boolean
  isSubscriptionActive: () => boolean
  canAccessFeature: (feature: string) => boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
  marketingEmails?: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ 
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

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
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

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' }
      }

      setUser(data.user)
      router.push('/dashboard')
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Network error occurred' }
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        return { success: false, error: responseData.error || 'Registration failed' }
      }

      setUser(responseData.user)
      router.push('/dashboard')
      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Network error occurred' }
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
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

  const forgotPassword = useCallback(async (email: string) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to send reset email' }
      }

      return { success: true }
    } catch (error) {
      console.error('Forgot password error:', error)
      return { success: false, error: 'Network error occurred' }
    }
  }, [])

  const resetPassword = useCallback(async (token: string, password: string) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Password reset failed' }
      }

      return { success: true }
    } catch (error) {
      console.error('Reset password error:', error)
      return { success: false, error: 'Network error occurred' }
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
        return { success: false, error: data.error || 'Email verification failed' }
      }

      // Update user state if logged in
      if (user) {
        setUser({ ...user, emailVerified: true })
      }

      return { success: true }
    } catch (error) {
      console.error('Email verification error:', error)
      return { success: false, error: 'Network error occurred' }
    }
  }, [user])

  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        return { success: false, error: responseData.error || 'Profile update failed' }
      }

      setUser(responseData.user)
      return { success: true }
    } catch (error) {
      console.error('Profile update error:', error)
      return { success: false, error: 'Network error occurred' }
    }
  }, [])

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
      console.error('User refresh failed:', error)
    }
  }, [])

  const hasPermission = useCallback((permission: string) => {
    if (!user) return false
    
    // Admin has all permissions
    if (user.role === 'admin') return true
    
    // Role-based permissions
    const permissions = {
      'access-admin': ['admin'],
      'access-premium-features': ['admin', 'premium'],
      'access-basic-features': ['admin', 'premium', 'member'],
      'access-tools': ['admin', 'premium', 'member'],
      'export-data': ['admin', 'premium'],
      'unlimited-api-calls': ['admin', 'premium'],
    }
    
    return permissions[permission as keyof typeof permissions]?.includes(user.role) || false
  }, [user])

  const isSubscriptionActive = useCallback(() => {
    if (!user) return false
    return ['active', 'trial'].includes(user.subscriptionStatus)
  }, [user])

  const canAccessFeature = useCallback((feature: string) => {
    if (!user) return false
    
    // Feature access based on subscription tier
    const featureAccess = {
      'basic-tools': ['free', 'basic', 'pro', 'enterprise'],
      'advanced-tools': ['pro', 'enterprise'],
      'enterprise-tools': ['enterprise'],
      'unlimited-usage': ['pro', 'enterprise'],
      'priority-support': ['pro', 'enterprise'],
      'custom-integrations': ['enterprise'],
    }
    
    const allowedTiers = featureAccess[feature as keyof typeof featureAccess]
    return allowedTiers?.includes(user.subscriptionTier) || false
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