'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  role: string
  subscriptionStatus: string
  subscriptionTier: string
  profile?: {
    avatar?: string
    bio?: string
    website?: string
  }
  preferences?: {
    theme: string
    notifications: boolean
    language: string
  }
  usage?: {
    apiCalls: number
    loginCount: number
    lastLogin: string
  }
  emailVerified?: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  hasPermission: (permission: string) => boolean
  canAccessFeature: (feature: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demo purposes
const mockUser: User = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  role: 'user',
  subscriptionStatus: 'active',
  subscriptionTier: 'pro',
  profile: {
    avatar: '/api/placeholder/150/150',
    bio: 'AI SEO enthusiast and content creator',
    website: 'https://example.com'
  },
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'en'
  },
  usage: {
    apiCalls: 1250,
    loginCount: 45,
    lastLogin: new Date().toISOString()
  },
  emailVerified: true
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate loading and set mock user
    const timer = setTimeout(() => {
      setUser(mockUser)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setUser(mockUser)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const register = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newUser = { ...mockUser, email, name }
      setUser(newUser)
      router.push('/dashboard')
    } catch (error) {
      console.error('Register error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Password reset email sent to:', email)
    } catch (error) {
      console.error('Forgot password error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const hasPermission = useCallback((permission: string) => {
    if (!user) return false
    if (user.role === 'admin') return true
    if (permission === 'access-admin' && user.role === 'admin') return true
    return false
  }, [user])

  const canAccessFeature = useCallback((feature: string) => {
    if (!user) return false
    if (user.subscriptionTier === 'enterprise') return true
    if (feature === 'basic-tools' && ['basic', 'pro', 'enterprise'].includes(user.subscriptionTier)) return true
    if (feature === 'advanced-tools' && ['pro', 'enterprise'].includes(user.subscriptionTier)) return true
    return false
  }, [user])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    hasPermission,
    canAccessFeature
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