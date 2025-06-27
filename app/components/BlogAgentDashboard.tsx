'use client'

import { useState } from 'react'

interface BlogStats {
  totalPosts: number
  lastGenerated: string | null
  nextScheduled: string | null
  isRunning: boolean
}

export default function BlogAgentDashboard() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [stats, setStats] = useState<BlogStats>({
    totalPosts: 0,
    lastGenerated: null,
    nextScheduled: null,
    isRunning: false
  })
  const [message, setMessage] = useState('')

  const generateBlog = async () => {
    setIsGenerating(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/blog-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage('✅ Blog post generated successfully!')
        // Refresh stats
        fetchStats()
      } else {
        setMessage(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setMessage(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const fetchStats = async () => {
    // This would typically fetch from your API
    // For now, we'll simulate some stats
    setStats({
      totalPosts: Math.floor(Math.random() * 50) + 10,
      lastGenerated: new Date().toISOString(),
      nextScheduled: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      isRunning: false
    })
  }

  const startScheduling = async () => {
    setMessage('🔄 Starting scheduled blog generation...')
    // This would typically call your scheduling API
    setStats(prev => ({ ...prev, isRunning: true }))
  }

  const stopScheduling = async () => {
    setMessage('⏹️ Stopping scheduled blog generation...')
    // This would typically call your scheduling API
    setStats(prev => ({ ...prev, isRunning: false }))
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Agent Dashboard</h1>
          <p className="text-gray-700">
            Manage your automated blog generation system
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
          stats.isRunning ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-900'
        }`}>
          {stats.isRunning ? "Running" : "Stopped"}
        </span>
      </div>

      {message && (
        <div className={`p-4 rounded-lg font-semibold border ${
          message.includes('✅') ? 'bg-green-600 text-white border-green-700' : 
          message.includes('❌') ? 'bg-red-600 text-white border-red-700' : 
          'bg-blue-700 text-white border-blue-900'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border text-gray-900">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Total Posts</h3>
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="text-2xl font-bold mt-2">{stats.totalPosts}</div>
          <p className="text-xs text-gray-700 mt-1">Generated blog posts</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border text-gray-900">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Last Generated</h3>
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-sm font-semibold mt-2">
            {stats.lastGenerated ? 
              new Date(stats.lastGenerated).toLocaleDateString() : 
              'Never'
            }
          </div>
          <p className="text-xs text-gray-700 mt-1">Most recent post</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border text-gray-900">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Next Scheduled</h3>
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-sm font-semibold mt-2">
            {stats.nextScheduled ? 
              new Date(stats.nextScheduled).toLocaleDateString() : 
              'Not scheduled'
            }
          </div>
          <p className="text-xs text-gray-700 mt-1">Next automatic post</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border text-gray-900">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Status</h3>
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div className="text-sm font-semibold mt-2">
            {stats.isRunning ? 'Active' : 'Inactive'}
          </div>
          <p className="text-xs text-gray-700 mt-1">Scheduling status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-bold mb-2 text-gray-900">Manual Generation</h3>
          <p className="text-gray-700 text-sm mb-4">
            Generate a single blog post immediately
          </p>
          <button 
            onClick={generateBlog} 
            disabled={isGenerating}
            className="w-full bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold shadow"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generate Blog Post
              </>
            )}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-bold mb-2 text-gray-900">Scheduled Generation</h3>
          <p className="text-gray-700 text-sm mb-4">
            Control automatic daily blog generation
          </p>
          <div className="space-y-2">
            <button 
              onClick={startScheduling} 
              disabled={stats.isRunning}
              className="w-full border border-gray-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold shadow"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Scheduling
            </button>
            <button 
              onClick={stopScheduling} 
              disabled={!stats.isRunning}
              className="w-full bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold shadow"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Stop Scheduling
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-bold mb-2 text-gray-900">Blog Topics</h3>
        <p className="text-gray-700 text-sm mb-4">
          Current topics covered by the blog agent
        </p>
        <div className="space-y-2">
          {[
            "7 Essential LLM Optimization Strategies for Better AI Citations",
            "How to Structure Your Content for Maximum AI Visibility", 
            "The Complete Guide to GPTBot Crawling and AI Indexing",
            "Advanced LLM Optimization: Beyond Traditional SEO",
            "Building Authority in the Age of AI: A Comprehensive Guide"
          ].map((topic, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
              <a
                href="#"
                className="text-blue-800 underline font-semibold hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
                tabIndex={0}
              >
                {topic}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-bold mb-2 text-gray-900">Quick Actions</h3>
        <p className="text-gray-700 text-sm mb-4">
          Additional tools and utilities
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button className="border border-gray-400 text-gray-900 px-3 py-2 rounded text-sm hover:bg-gray-200 flex items-center justify-center font-semibold shadow">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Refresh Images
          </button>
          <button className="border border-gray-400 text-gray-900 px-3 py-2 rounded text-sm hover:bg-gray-200 flex items-center justify-center font-semibold shadow">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Manage Tags
          </button>
          <button className="border border-gray-400 text-gray-900 px-3 py-2 rounded text-sm hover:bg-gray-200 flex items-center justify-center font-semibold shadow">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Posts
          </button>
          <button className="border border-gray-400 text-gray-900 px-3 py-2 rounded text-sm hover:bg-gray-200 flex items-center justify-center font-semibold shadow">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Schedule
          </button>
        </div>
      </div>
    </div>
  )
} 