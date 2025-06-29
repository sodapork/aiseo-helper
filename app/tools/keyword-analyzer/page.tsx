'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Search, TrendingUp, Target, BarChart3, Zap, ArrowLeft, Download, Share2, Brain, Lightbulb, Activity, Database, Users, FileText } from 'lucide-react'
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tools" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <Search className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">LLM Keyword Analyzer</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Analyze how AI systems understand and process your keywords. Get insights into semantic relevance, context strength, and LLM understanding to optimize for AI-powered discovery.
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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Relevance Scoring</h3>
            <p className="text-gray-600 text-sm">
              Understand how relevant your keywords are to AI systems and their processing capabilities.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Semantic Analysis</h3>
            <p className="text-gray-600 text-sm">
              Deep semantic understanding of how AI models interpret and process your keywords.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Context Strength Evaluation</h3>
            <p className="text-gray-600 text-sm">
              Measure how well AI systems can contextualize and understand your keywords.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">LLM Understanding Metrics</h3>
            <p className="text-gray-600 text-sm">
              Comprehensive metrics on how language models comprehend and process your keywords.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Processing Insights</h3>
            <p className="text-gray-600 text-sm">
              Detailed insights into how AI systems process and categorize your keywords.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimization Recommendations</h3>
            <p className="text-gray-600 text-sm">
              Get actionable recommendations to improve your keywords for better AI discovery.
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Your Keyword</h3>
              <p className="text-gray-600 text-sm">
                Input any keyword or phrase you want to analyze for AI system understanding and processing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Our system analyzes semantic relevance, context strength, and LLM understanding patterns.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Insights</h3>
              <p className="text-gray-600 text-sm">
                Receive comprehensive analysis with scores, suggestions, and optimization recommendations.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Keyword Analysis</h2>
            <p className="text-gray-600">Understand how AI systems process your keywords and optimize for better discovery</p>
          </div>
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