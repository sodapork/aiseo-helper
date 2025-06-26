'use client'


import { useState } from 'react'
import { motion } from 'motion/react'
import { Search, TrendingUp, Target, BarChart3, Zap, ArrowLeft, Download, Share2 } from 'lucide-react'
import Link from 'next/link'

interface KeywordAnalysis {
  keyword: string
  aiRelevance: number
  semanticScore: number
  contextStrength: number
  llmUnderstanding: number
  suggestions: string[]
  relatedTerms: string[]
  aiContext: string
}

export default function KeywordAnalyzer() {
  const [keyword, setKeyword] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<KeywordAnalysis | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<KeywordAnalysis[]>([])

  const analyzeKeyword = async () => {
    if (!keyword.trim()) return

    setIsAnalyzing(true)
    
    try {
      const res = await fetch('/api/keyword-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword })
      });
      const data = await res.json();
      setAnalysis(data);
      setAnalysisHistory(prev => [data, ...prev.slice(0, 4)]);
    } catch (error) {
      setAnalysis({
        keyword,
        aiRelevance: 0,
        semanticScore: 0,
        contextStrength: 0,
        llmUnderstanding: 0,
        suggestions: ['Error fetching analysis. Please try again.'],
        relatedTerms: [],
        aiContext: 'An error occurred while contacting the analysis API.'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Tools</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">LLM Keyword Analyzer</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
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
            LLM Keyword Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analyze how AI systems understand and process your keywords. Get insights into semantic relevance, context strength, and LLM understanding to optimize for AI-powered discovery.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex space-x-4">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter a keyword to analyze for AI systems..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                onKeyPress={(e) => e.key === 'Enter' && analyzeKeyword()}
              />
              <button
                onClick={analyzeKeyword}
                disabled={isAnalyzing || !keyword.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Analyze</span>
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
                  <h3 className="text-lg font-semibold text-gray-900">AI Relevance</h3>
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.aiRelevance)}`}>
                  {analysis.aiRelevance}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How relevant this keyword is to AI systems</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Semantic Score</h3>
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.semanticScore)}`}>
                  {analysis.semanticScore}%
                </div>
                <p className="text-sm text-gray-600 mt-2">Semantic understanding by AI models</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Context Strength</h3>
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.contextStrength)}`}>
                  {analysis.contextStrength}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How well AI can contextualize this keyword</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">LLM Understanding</h3>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.llmUnderstanding)}`}>
                  {analysis.llmUnderstanding}%
                </div>
                <p className="text-sm text-gray-600 mt-2">Overall LLM comprehension level</p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Context */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Context Analysis</h3>
                <p className="text-gray-600 leading-relaxed">{analysis.aiContext}</p>
              </div>

              {/* Suggestions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Optimization Suggestions</h3>
                <ul className="space-y-2">
                  {(analysis.suggestions ?? []).map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Terms */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Terms for AI Systems</h3>
              <div className="flex flex-wrap gap-2">
                {(analysis.relatedTerms ?? []).map((term, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share Analysis</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Analysis History */}
        {analysisHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Analyses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysisHistory.slice(1).map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.keyword}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">AI Relevance</span>
                    <span className={`font-semibold ${getScoreColor(item.aiRelevance)}`}>{item.aiRelevance}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">LLM Understanding</span>
                    <span className={`font-semibold ${getScoreColor(item.llmUnderstanding)}`}>{item.llmUnderstanding}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 