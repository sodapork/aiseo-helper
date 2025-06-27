'use client'

import { useEffect } from 'react'
import { useAuth } from '../components/AuthProvider'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Activity, 
  Zap, 
  Crown, 
  Shield, 
  TrendingUp, 
  Users, 
  Settings, 
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Target,
  Globe
} from 'lucide-react'

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, hasPermission, canAccessFeature } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const getSubscriptionStatusColor = () => {
    const colors = {
      'trial': 'text-yellow-600 bg-yellow-50',
      'active': 'text-green-600 bg-green-50',
      'premium': 'text-purple-600 bg-purple-50',
      'expired': 'text-red-600 bg-red-50',
      'cancelled': 'text-gray-600 bg-gray-50',
    }
    return colors[user?.subscriptionStatus as keyof typeof colors] || colors.cancelled
  }

  const getSubscriptionIcon = () => {
    const icons = {
      'trial': Zap,
      'active': Crown,
      'premium': Crown,
      'expired': Shield,
      'cancelled': Shield,
    }
    return icons[user?.subscriptionStatus as keyof typeof icons] || Shield
  }

  const SubscriptionIcon = getSubscriptionIcon()

  const quickActions = [
    {
      title: 'Content Optimizer',
      description: 'Optimize your content for AI search',
      icon: Target,
      href: '/tools/content-optimizer',
      available: canAccessFeature('basic-tools'),
    },
    {
      title: 'Keyword Analyzer',
      description: 'Analyze keywords for AI search',
      icon: BarChart3,
      href: '/tools/keyword-analyzer',
      available: canAccessFeature('basic-tools'),
    },
    {
      title: 'Advanced Analytics',
      description: 'Deep insights and reporting',
      icon: TrendingUp,
      href: '/tools/analytics',
      available: canAccessFeature('advanced-tools'),
    },
    {
      title: 'Team Management',
      description: 'Manage team members and permissions',
      icon: Users,
      href: '/team',
      available: hasPermission('access-admin'),
    },
  ]

  const stats = [
    {
      label: 'API Calls This Month',
      value: user?.usage?.apiCalls || 0,
      change: '+12%',
      changeType: 'positive' as 'positive' | 'negative' | 'neutral',
    },
    {
      label: 'Login Count',
      value: user?.usage?.loginCount || 0,
      change: '+5%',
      changeType: 'positive' as 'positive' | 'negative' | 'neutral',
    },
    {
      label: 'Last Login',
      value: user?.usage?.lastLogin ? new Date(user.usage.lastLogin).toLocaleDateString() : 'Never',
      change: '',
      changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your AI SEO optimization tools.
        </p>
      </div>

      {/* Subscription Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${getSubscriptionStatusColor()}`}>
              <SubscriptionIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {user?.subscriptionTier === 'free' ? 'Free Plan' : 
                 user?.subscriptionTier === 'basic' ? 'Basic Plan' :
                 user?.subscriptionTier === 'pro' ? 'Pro Plan' :
                 user?.subscriptionTier === 'enterprise' ? 'Enterprise Plan' : 'Free Plan'}
              </h2>
              <p className="text-sm text-gray-600 capitalize">
                Status: {user?.subscriptionStatus}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {user?.subscriptionStatus === 'trial' && (
              <div className="flex items-center text-yellow-600 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                Trial expires in 7 days
              </div>
            )}
            {user?.subscriptionStatus === 'expired' && (
              <div className="flex items-center text-red-600 text-sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Subscription expired
              </div>
            )}
            <Link
              href="/pricing"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {user?.subscriptionStatus === 'trial' || user?.subscriptionStatus === 'expired' 
                ? 'Upgrade Now' 
                : 'Manage Subscription'}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              {stat.change && (
                <div className={`flex items-center text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {stat.change}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link
                key={index}
                href={action.available ? action.href : '/pricing'}
                className={`block p-6 rounded-xl border transition-all duration-200 ${
                  action.available
                    ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                    : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    action.available ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {action.available && (
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
                {!action.available && (
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium feature
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Successfully optimized content</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Globe className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Analyzed 15 keywords</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Settings className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Updated profile settings</p>
              <p className="text-xs text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/settings"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <Settings className="h-5 w-5 text-gray-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Account Settings</p>
              <p className="text-sm text-gray-600">Manage your profile and preferences</p>
            </div>
          </Link>
          <Link
            href="/billing"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <Crown className="h-5 w-5 text-gray-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Billing & Subscription</p>
              <p className="text-sm text-gray-600">Manage your subscription and billing</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
} 