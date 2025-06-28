'use client'

import { useState } from 'react'
import { useAuth } from '../components/AuthProvider'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    marketingEmails: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { register, isLoading } = useAuth()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required')
      return false
    }

    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }

    if (!/(?=.*[a-z])/.test(formData.password)) {
      setError('Password must contain at least one lowercase letter')
      return false
    }

    if (!/(?=.*[A-Z])/.test(formData.password)) {
      setError('Password must contain at least one uppercase letter')
      return false
    }

    if (!/(?=.*\d)/.test(formData.password)) {
      setError('Password must contain at least one number')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    if (!formData.acceptTerms) {
      setError('You must accept the Terms of Service and Privacy Policy')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateForm()) {
      return
    }

    try {
      await register(formData.email, formData.password, formData.name)
      setSuccess('Account created successfully! Redirecting...')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed')
    }
  }

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { score: 0, label: '', color: '' }
    if (password.length < 8) return { score: 1, label: 'Weak', color: 'text-red-500' }
    if (password.length < 12) return { score: 2, label: 'Fair', color: 'text-yellow-500' }
    if (password.length < 16) return { score: 3, label: 'Good', color: 'text-blue-500' }
    return { score: 4, label: 'Strong', color: 'text-green-500' }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">AI</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-700" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-700" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-700" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-800 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-700" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-700" />
                  )}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.score === 1 ? 'bg-red-500 w-1/4' :
                          passwordStrength.score === 2 ? 'bg-yellow-500 w-1/2' :
                          passwordStrength.score === 3 ? 'bg-blue-500 w-3/4' :
                          passwordStrength.score === 4 ? 'bg-green-500 w-full' : ''
                        }`}
                      />
                    </div>
                    <span className={`text-sm font-medium ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters with uppercase, lowercase, and number
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-700" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`appearance-none block w-full pl-10 pr-10 py-3 border rounded-lg placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-800 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-700" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-700" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="acceptTerms" className="text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500 transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500 transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="marketingEmails"
                  name="marketingEmails"
                  type="checkbox"
                  checked={formData.marketingEmails}
                  onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="marketingEmails" className="text-gray-700">
                  Send me marketing emails about new features and updates
                </label>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !formData.acceptTerms}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create account'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-500 transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
} 