'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { FileText, ArrowLeft, Download, Share2, Zap, Target, MessageSquare, BarChart3, CheckCircle, AlertCircle, Lightbulb, Globe, Link as LinkIcon, Brain, Users, Database, Activity } from 'lucide-react'
import Link from 'next/link'

interface ContentAnalysis {
  content: string
  aiReadability: number
  contextClarity: number
  semanticStructure: number
  llmCompatibility: number
  suggestions: ContentSuggestion[]
  optimizedContent: string
  aiContext: string
}

interface ContentSuggestion {
  type: 'structure' | 'clarity' | 'context' | 'semantic'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  example?: string
}

export default function ContentOptimizer() {
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [inputType, setInputType] = useState<'text' | 'url'>('text')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isFetchingUrl, setIsFetchingUrl] = useState(false)
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<ContentAnalysis[]>([])
  const [error, setError] = useState('')

  const fetchContentFromUrl = async (url: string) => {
    setIsFetchingUrl(true)
    setError('')
    
    try {
      const response = await fetch('/api/content-fetcher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch content from URL')
      }
      
      const data = await response.json()
      setContent(data.content)
      setError('')
    } catch (error) {
      setError('Failed to fetch content from URL. Please check the URL and try again.')
      console.error('Error fetching content:', error)
    } finally {
      setIsFetchingUrl(false)
    }
  }

  const analyzeContent = async () => {
    if (!content.trim()) return

    setIsAnalyzing(true)
    setError('')
    
    try {
      const res = await fetch('/api/content-optimizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      const data = await res.json();
      setAnalysis(data);
      setAnalysisHistory(prev => [data, ...prev.slice(0, 4)]);
    } catch (error) {
      setError('Error analyzing content. Please try again.')
      setAnalysis({
        content,
        aiReadability: 0,
        contextClarity: 0,
        semanticStructure: 0,
        llmCompatibility: 0,
        suggestions: [],
        optimizedContent: '',
        aiContext: 'Error contacting the content optimization API.'
      });
    }
    setIsAnalyzing(false);
  }

  const handleUrlSubmit = async () => {
    if (!url.trim()) return
    await fetchContentFromUrl(url)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 80) return 'bg-blue-100'
    if (score >= 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'structure': return <BarChart3 className="w-4 h-4" />
      case 'clarity': return <Target className="w-4 h-4" />
      case 'context': return <MessageSquare className="w-4 h-4" />
      case 'semantic': return <Zap className="w-4 h-4" />
      default: return <Lightbulb className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tools" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Content Optimizer</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Optimize your content structure and clarity for better AI understanding. Get actionable suggestions to improve how AI systems discover, process, and recommend your content.
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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Structure Analysis</h3>
            <p className="text-gray-600 text-sm">
              Analyze and improve the structure of your content for better AI comprehension and processing.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Readability Scoring</h3>
            <p className="text-gray-600 text-sm">
              Get detailed scores on how easily AI systems can read, parse, and understand your content.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Semantic Optimization</h3>
            <p className="text-gray-600 text-sm">
              Optimize semantic relationships and context to improve AI understanding and recommendations.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Context Enhancement</h3>
            <p className="text-gray-600 text-sm">
              Enhance context clarity to help AI systems better understand and recommend your content.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">LLM Compatibility</h3>
            <p className="text-gray-600 text-sm">
              Ensure your content is optimized for large language models and AI-powered search engines.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Actionable Suggestions</h3>
            <p className="text-gray-600 text-sm">
              Receive specific, actionable recommendations to improve your content for AI discovery.
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Input Your Content</h3>
              <p className="text-gray-600 text-sm">
                Paste your content or provide a URL to fetch content for AI optimization analysis.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Our system analyzes readability, context clarity, semantic structure, and LLM compatibility.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Optimized Content</h3>
              <p className="text-gray-600 text-sm">
                Receive detailed suggestions and an optimized version of your content for better AI discovery.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Content Optimization</h2>
            <p className="text-gray-600">Optimize your content for better AI understanding and discovery</p>
          </div>
          <div className="max-w-4xl mx-auto">
            {/* Input Type Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setInputType('text')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  inputType === 'text'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Text Input</span>
              </button>
              <button
                onClick={() => setInputType('url')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  inputType === 'url'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>URL Input</span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Text Input */}
            {inputType === 'text' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content to Optimize
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your content here to get AI optimization suggestions..."
                  className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-900"
                />
              </div>
            )}

            {/* URL Input */}
            {inputType === 'url' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/article"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                    <button
                      onClick={handleUrlSubmit}
                      disabled={isFetchingUrl || !url.trim()}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isFetchingUrl ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Fetching...</span>
                        </>
                      ) : (
                        <>
                          <LinkIcon className="w-4 h-4" />
                          <span>Fetch Content</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {content && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fetched Content
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Content will appear here after fetching from URL..."
                      className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-900"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Analyze Button */}
            <div className="flex justify-center">
              <button
                onClick={analyzeContent}
                disabled={isAnalyzing || !content.trim()}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Content...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Optimize Content</span>
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
                  <h3 className="text-lg font-semibold text-gray-900">AI Readability</h3>
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.aiReadability)}`}>
                  {analysis.aiReadability}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How easily AI can read and parse your content</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Context Clarity</h3>
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.contextClarity)}`}>
                  {analysis.contextClarity}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How clearly AI understands the context</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Semantic Structure</h3>
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.semanticStructure)}`}>
                  {analysis.semanticStructure}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How well content is semantically organized</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">LLM Compatibility</h3>
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.llmCompatibility)}`}>
                  {analysis.llmCompatibility}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How compatible with large language models</p>
              </div>
            </div>

            {/* AI Context */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">AI Analysis Summary</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{analysis.aiContext}</p>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Optimization Suggestions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(suggestion.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(suggestion.priority)}`}>
                            {suggestion.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                        {suggestion.example && (
                          <div className="bg-gray-50 rounded p-2">
                            <p className="text-xs text-gray-500 mb-1">Example:</p>
                            <p className="text-sm text-gray-700">{suggestion.example}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimized Content */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Optimized Content</h3>
                </div>
                <button className="text-green-600 hover:text-green-700 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{analysis.optimizedContent}</pre>
              </div>
            </div>
          </motion.div>
        )}

        {/* History Section */}
        {analysisHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6 mt-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Analyses</h3>
            <div className="space-y-3">
              {analysisHistory.slice(1).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.content.substring(0, 100)}...
                    </p>
                    <p className="text-xs text-gray-500">
                      AI Readability: {item.aiReadability}% | LLM Compatibility: {item.llmCompatibility}%
                    </p>
                  </div>
                  <button 
                    onClick={() => setAnalysis(item)}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 