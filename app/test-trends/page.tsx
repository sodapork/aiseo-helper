'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { TrendingUp, TestTube, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function TestTrends() {
  const [topic, setTopic] = useState('artificial intelligence')
  const [timeframe, setTimeframe] = useState('30d')
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)

  const testGoogleTrends = async () => {
    setIsTesting(true)
    setTestResult(null)

    try {
      const response = await fetch(`/api/test-google-trends?topic=${encodeURIComponent(topic)}&timeframe=${timeframe}`)
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({
        error: 'Test failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    setIsTesting(false)
  }

  const getStatusIcon = (hasKey: boolean) => {
    if (hasKey) {
      return <CheckCircle className="w-5 h-5 text-green-600" />
    }
    return <XCircle className="w-5 h-5 text-red-600" />
  }

  const getStatusText = (hasKey: boolean) => {
    return hasKey ? 'Configured' : 'Not configured'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Google Trends API Test</h1>
          <p className="text-xl text-gray-600">
            Test your Google Trends API integration
          </p>
        </div>

        {/* Test Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., artificial intelligence"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeframe
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={testGoogleTrends}
              disabled={isTesting}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isTesting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Testing...</span>
                </>
              ) : (
                <>
                  <TestTube className="w-5 h-5" />
                  <span>Test Google Trends API</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Environment Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">SerpApi Key</p>
                <p className="text-sm text-gray-600">Check test results below</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">RapidAPI Key</p>
                <p className="text-sm text-gray-600">Check test results below</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Environment</p>
                <p className="text-sm text-gray-600">Check test results below</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Test Results */}
        {testResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
            
            {testResult.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-900">Test Failed</span>
                </div>
                <p className="text-red-700">{testResult.message}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Test Successful</span>
                  </div>
                  <p className="text-green-700">API integration is working correctly!</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Test Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Topic:</strong> {testResult.topic}</p>
                      <p><strong>Timeframe:</strong> {testResult.timeframe}</p>
                      <p><strong>Timestamp:</strong> {new Date(testResult.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">API Response</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Success:</strong> {testResult.apiResponse?.success ? 'Yes' : 'No'}</p>
                      <p><strong>Message:</strong> {testResult.apiResponse?.message || 'N/A'}</p>
                      <p><strong>Interest Score:</strong> {testResult.apiResponse?.data?.interest_over_time || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Raw Response</h4>
                  <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
} 