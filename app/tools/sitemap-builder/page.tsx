'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Map, ArrowLeft, Download, Share2, Upload, FileText, Brain, Lightbulb, Activity, Database, Users, Zap } from 'lucide-react'
import Link from 'next/link'

interface SitemapAnalysis {
  originalUrl: string
  aiCompatibilityScore: number
  llmDiscoveryScore: number
  structureOptimization: number
  aiFriendlyFormatting: number
  suggestions: string[]
  optimizedSitemap: string
  analysis: string
  issues: string[]
  improvements: string[]
}

export default function SitemapBuilder() {
  const [sitemapFile, setSitemapFile] = useState<File | null>(null)
  const [sitemapUrl, setSitemapUrl] = useState('')
  const [inputType, setInputType] = useState<'file' | 'url'>('file')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<SitemapAnalysis | null>(null)
  const [error, setError] = useState('')

  const analyzeSitemap = async () => {
    if ((!sitemapFile && !sitemapUrl.trim()) || isAnalyzing) return

    setIsAnalyzing(true)
    setError('')
    
    try {
      let formData = new FormData()
      
      if (inputType === 'file' && sitemapFile) {
        formData.append('sitemap', sitemapFile)
      } else if (inputType === 'url' && sitemapUrl.trim()) {
        formData.append('sitemapUrl', sitemapUrl.trim())
      }

      const res = await fetch('/api/sitemap-builder', {
        method: 'POST',
        body: formData
      });
      
      if (!res.ok) {
        throw new Error('Failed to analyze sitemap')
      }
      
      const data = await res.json();
      setAnalysis(data);
    } catch (error) {
      setError('Error analyzing sitemap. Please try again.')
      console.error('Error:', error)
    }
    setIsAnalyzing(false);
  }

  const downloadOptimizedSitemap = () => {
    if (!analysis) return
    
    const blob = new Blob([analysis.optimizedSitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-optimized-sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/xml' || file?.name.endsWith('.xml')) {
      setSitemapFile(file)
      setError('')
    } else {
      setError('Please select a valid XML sitemap file')
      setSitemapFile(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tools" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                <Map className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Site Map Builder</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Upload your sitemap and get an AI-optimized version for better LLM discovery. Enhance your site structure for AI search engines and chatbots.
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Beta Version
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sitemap AI Analysis</h3>
            <p className="text-gray-600 text-sm">
              Upload your existing sitemap and get comprehensive AI compatibility analysis.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">LLM Discovery Optimization</h3>
            <p className="text-gray-600 text-sm">
              Optimize your sitemap structure for better discovery by AI systems and LLMs.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Structure Enhancement</h3>
            <p className="text-gray-600 text-sm">
              Enhance your sitemap structure with AI-friendly metadata and relationships.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Friendly Formatting</h3>
            <p className="text-gray-600 text-sm">
              Get a properly formatted sitemap optimized for AI search engines and chatbots.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Analysis</h3>
            <p className="text-gray-600 text-sm">
              Detailed analysis of your sitemap's AI compatibility and optimization opportunities.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Actionable Insights</h3>
            <p className="text-gray-600 text-sm">
              Get specific recommendations to improve your sitemap for AI discovery.
            </p>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Sitemap</h3>
              <p className="text-gray-600 text-sm">
                Upload your XML sitemap file or provide a URL to your existing sitemap.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Our system analyzes your sitemap for AI compatibility and LLM discovery potential.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Optimized Version</h3>
              <p className="text-gray-600 text-sm">
                Receive an AI-optimized sitemap with enhanced structure and metadata.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Sitemap</h2>
            <p className="text-gray-600">Get an AI-optimized version for better LLM discovery</p>
          </div>
          <div className="max-w-4xl mx-auto">
            {/* Input Type Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setInputType('file')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  inputType === 'file'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload File</span>
              </button>
              <button
                onClick={() => setInputType('url')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  inputType === 'url'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Sitemap URL</span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* File Upload */}
            {inputType === 'file' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload XML Sitemap
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    accept=".xml"
                    onChange={handleFileChange}
                    className="hidden"
                    id="sitemap-upload"
                  />
                  <label htmlFor="sitemap-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium text-purple-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">XML sitemap files only</p>
                  </label>
                </div>
                {sitemapFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm">
                      ✓ {sitemapFile.name} selected
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* URL Input */}
            {inputType === 'url' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sitemap URL
                </label>
                <input
                  type="url"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  placeholder="https://example.com/sitemap.xml"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
              </div>
            )}

            {/* Analyze Button */}
            <div className="flex justify-center">
              <button
                onClick={analyzeSitemap}
                disabled={isAnalyzing || (!sitemapFile && !sitemapUrl.trim())}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Sitemap...</span>
                  </>
                ) : (
                  <>
                    <Map className="w-5 h-5" />
                    <span>Analyze Sitemap</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">AI Compatibility</h3>
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.aiCompatibilityScore)}`}>
                  {analysis.aiCompatibilityScore}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How well AI systems can understand your sitemap</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">LLM Discovery</h3>
                  <Map className="w-5 h-5 text-indigo-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.llmDiscoveryScore)}`}>
                  {analysis.llmDiscoveryScore}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How easily LLMs can discover your content</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Structure Optimization</h3>
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.structureOptimization)}`}>
                  {analysis.structureOptimization}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How well your sitemap structure is optimized</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">AI-Friendly Formatting</h3>
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.aiFriendlyFormatting)}`}>
                  {analysis.aiFriendlyFormatting}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How well formatted for AI consumption</p>
              </div>
            </div>

            {/* Analysis Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">Analysis Summary</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{analysis.analysis}</p>
            </div>

            {/* Issues and Improvements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Issues */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Issues Found</h3>
                <ul className="space-y-2">
                  {analysis.issues.map((issue, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Suggested Improvements</h3>
                <ul className="space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Optimized Sitemap */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Map className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">AI-Optimized Sitemap</h3>
                </div>
                <button 
                  onClick={downloadOptimizedSitemap}
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{analysis.optimizedSitemap}</pre>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button 
                onClick={downloadOptimizedSitemap}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Optimized Sitemap</span>
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share Analysis</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 