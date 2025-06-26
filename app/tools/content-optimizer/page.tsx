'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { FileText, ArrowLeft, Download, Share2, Zap, Target, MessageSquare, BarChart3, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react'
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
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<ContentAnalysis[]>([])

  const analyzeContent = async () => {
    if (!content.trim()) return

    setIsAnalyzing(true)
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
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Tools</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI Content Optimizer</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-600 hover:text-green-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
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
            AI Content Optimizer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Optimize your content structure and clarity for better AI understanding. Get actionable suggestions to improve how AI systems discover, process, and recommend your content.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="max-w-4xl mx-auto">
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