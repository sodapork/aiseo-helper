'use client'

import { useAuth } from '../components/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  FileText, 
  Settings, 
  Users, 
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react'

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const stats = [
    {
      name: 'Total Projects',
      value: '12',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Active Tools',
      value: '8',
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Team Members',
      value: '3',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Analytics Score',
      value: '94%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  const quickActions = [
    {
      name: 'Content Optimizer',
      description: 'Optimize your content for AI search engines',
      href: '/tools/content-optimizer',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Keyword Analyzer',
      description: 'Analyze keywords for AI search optimization',
      href: '/tools/keyword-analyzer',
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Settings',
      description: 'Manage your account and preferences',
      href: '/settings',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your AI SEO projects today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${action.bgColor}`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{action.name}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Content optimization completed for "AI SEO Guide"</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <Activity className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New keyword analysis started</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
                <BarChart3 className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Project "E-commerce SEO" created</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 