'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Database, FileText, Users, ArrowRight, Plus, Edit } from 'lucide-react'
import Link from 'next/link'

interface Tool {
  id: string
  name: string
  description: string
  category: string
  status: string
  icon: string
  color: string
  link?: string
}

export default function AdminPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For now, we'll use mock data
    // In production, this would fetch from Payload API
    const mockTools = [
      {
        id: '1',
        name: 'LLM Keyword Analyzer',
        description: 'Analyze how AI systems understand and process your keywords',
        category: 'Analysis',
        status: 'active',
        icon: 'Search',
        color: 'from-blue-500 to-blue-600',
        link: '/tools/keyword-analyzer',
      },
      {
        id: '2',
        name: 'AI Content Optimizer',
        description: 'Optimize your content structure for better AI understanding',
        category: 'Content',
        status: 'active',
        icon: 'FileText',
        color: 'from-green-500 to-green-600',
      },
    ]
    
    setTimeout(() => {
      setTools(mockTools)
      setLoading(false)
    }, 1000)
  }, [])

  const adminSections = [
    {
      title: 'Tools Management',
      description: 'Manage your LLM optimization tools',
      icon: Settings,
      link: '/admin/tools',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Content Pages',
      description: 'Edit website pages and content',
      icon: FileText,
      link: '/admin/pages',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Media Library',
      description: 'Manage images and files',
      icon: Database,
      link: '/admin/media',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'User Management',
      description: 'Manage admin users and permissions',
      icon: Users,
      link: '/admin/users',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI SEO Helper Admin</span>
            </div>
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              ← Back to Site
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Content Management Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage your LLM optimization tools, content, and website settings. All changes will be automatically deployed to your live site.
          </p>
        </motion.div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {adminSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <Link href={section.link}>
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {section.description}
                  </p>
                  <div className="flex items-center text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-medium">Manage</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Tools Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tools Overview</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Tool</span>
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading tools...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <div key={tool.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tool.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tool.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {tool.category}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-blue-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-left">
              <div className="font-medium text-gray-900">Deploy Changes</div>
              <div className="text-sm text-gray-600">Push updates to live site</div>
            </button>
            <button className="px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-left">
              <div className="font-medium text-gray-900">Backup Content</div>
              <div className="text-sm text-gray-600">Create content backup</div>
            </button>
            <button className="px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-left">
              <div className="font-medium text-gray-900">View Analytics</div>
              <div className="text-sm text-gray-600">Check site performance</div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 