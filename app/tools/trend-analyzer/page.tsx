'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { TrendingUp, Target, BarChart3, Zap, ArrowLeft, Download, Share2, Globe, Clock, TrendingDown } from 'lucide-react'
import Link from 'next/link'

interface TrendAnalysis {
  topic: string
  trendVelocity: number
  aiEngagementScore: number
  queryVolume: number
  topicClustering: string[]
  forecastConfidence: number
  dataSources: string[]
  insights: string[]
  relatedTopics: string[]
  timeframe: string
  dataStatus: {
    googleTrends: 'real' | 'mock' | 'error'
    socialMedia: 'real' | 'mock' | 'error'
    news: 'real' | 'mock' | 'error'
    aiConversations: 'real' | 'mock' | 'error'
  }
  dataMessages: string[]
}

export default function TrendAnalyzer() {
  const [topic, setTopic] = useState('')
  const [industry, setIndustry] = useState('')
  const [timeframe, setTimeframe] = useState('30d')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<TrendAnalysis | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<TrendAnalysis[]>([])

  const analyzeTrends = async () => {
    if (!topic.trim()) return

    setIsAnalyzing(true)
    
    try {
      const res = await fetch('/api/trend-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, industry, timeframe })
      });
      const data = await res.json();
      setAnalysis(data);
      setAnalysisHistory(prev => [data, ...prev.slice(0, 4)]);
    } catch (error) {
      setAnalysis({
        topic,
        trendVelocity: 0,
        aiEngagementScore: 0,
        queryVolume: 0,
        topicClustering: [],
        forecastConfidence: 0,
        dataSources: [],
        insights: ['Error analyzing trends. Please try again.'],
        relatedTopics: [],
        timeframe,
        dataStatus: {
          googleTrends: 'error',
          socialMedia: 'error',
          news: 'error',
          aiConversations: 'error'
        },
        dataMessages: []
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

  const getTrendIcon = (velocity: number) => {
    if (velocity >= 80) return <TrendingUp className="w-5 h-5 text-green-600" />
    if (velocity >= 60) return <TrendingUp className="w-5 h-5 text-blue-600" />
    if (velocity >= 40) return <TrendingUp className="w-5 h-5 text-yellow-600" />
    return <TrendingDown className="w-5 h-5 text-red-600" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tools" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Trend Analyzer</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Identify trending topics and queries that AI systems are focusing on
            </p>
          </div>
        </div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic or Keyword
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., artificial intelligence, machine learning..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  onKeyPress={(e) => e.key === 'Enter' && analyzeTrends()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry (Optional)
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g., technology, healthcare, finance..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeframe
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
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
                onClick={analyzeTrends}
                disabled={isAnalyzing || !topic.trim()}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Trends...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    <span>Analyze Trends</span>
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
            {/* Data Source Status Alerts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Source Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-3 rounded-lg border ${
                  analysis.dataStatus?.googleTrends === 'real' 
                    ? 'bg-green-50 border-green-200' 
                    : analysis.dataStatus?.googleTrends === 'mock'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.dataStatus?.googleTrends === 'real' 
                        ? 'bg-green-500' 
                        : analysis.dataStatus?.googleTrends === 'mock'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium">Google Trends</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {analysis.dataStatus?.googleTrends === 'real' ? 'Real data' : 
                     analysis.dataStatus?.googleTrends === 'mock' ? 'Mock data' : 'Error'}
                  </p>
                </div>

                <div className={`p-3 rounded-lg border ${
                  analysis.dataStatus?.socialMedia === 'real' 
                    ? 'bg-green-50 border-green-200' 
                    : analysis.dataStatus?.socialMedia === 'mock'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.dataStatus?.socialMedia === 'real' 
                        ? 'bg-green-500' 
                        : analysis.dataStatus?.socialMedia === 'mock'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium">Social Media</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {analysis.dataStatus?.socialMedia === 'real' ? 'Real data' : 
                     analysis.dataStatus?.socialMedia === 'mock' ? 'Mock data' : 'Error'}
                  </p>
                </div>

                <div className={`p-3 rounded-lg border ${
                  analysis.dataStatus?.news === 'real' 
                    ? 'bg-green-50 border-green-200' 
                    : analysis.dataStatus?.news === 'mock'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.dataStatus?.news === 'real' 
                        ? 'bg-green-500' 
                        : analysis.dataStatus?.news === 'mock'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium">News API</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {analysis.dataStatus?.news === 'real' ? 'Real data' : 
                     analysis.dataStatus?.news === 'mock' ? 'Mock data' : 'Error'}
                  </p>
                </div>

                <div className={`p-3 rounded-lg border ${
                  analysis.dataStatus?.aiConversations === 'real' 
                    ? 'bg-green-50 border-green-200' 
                    : analysis.dataStatus?.aiConversations === 'mock'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.dataStatus?.aiConversations === 'real' 
                        ? 'bg-green-500' 
                        : analysis.dataStatus?.aiConversations === 'mock'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium">AI Analysis</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {analysis.dataStatus?.aiConversations === 'real' ? 'Real data' : 
                     analysis.dataStatus?.aiConversations === 'mock' ? 'Mock data' : 'Error'}
                  </p>
                </div>
              </div>

              {/* Data Messages */}
              {analysis.dataMessages && analysis.dataMessages.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Data Source Details:</h4>
                  <ul className="space-y-1">
                    {analysis.dataMessages.map((message, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start space-x-2">
                        <span className="text-gray-400">•</span>
                        <span>{message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Trend Velocity</h3>
                  {getTrendIcon(analysis.trendVelocity)}
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.trendVelocity)}`}>
                  {analysis.trendVelocity}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How quickly this topic is gaining traction</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">AI Engagement</h3>
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.aiEngagementScore)}`}>
                  {analysis.aiEngagementScore}%
                </div>
                <p className="text-sm text-gray-600 mt-2">How much AI systems are engaging with this topic</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Query Volume</h3>
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.queryVolume)}`}>
                  {analysis.queryVolume}%
                </div>
                <p className="text-sm text-gray-600 mt-2">Search and query volume for this topic</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Forecast Confidence</h3>
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.forecastConfidence)}`}>
                  {analysis.forecastConfidence}%
                </div>
                <p className="text-sm text-gray-600 mt-2">Confidence in trend predictions</p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Insights */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h3>
                <ul className="space-y-3">
                  {(analysis.insights ?? []).map((insight, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Sources */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Sources</h3>
                <div className="space-y-2">
                  {(analysis.dataSources ?? []).map((source, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{source}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Analysis timeframe: {analysis.timeframe}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Topic Clustering and Related Topics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Topic Clustering */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Topic Clustering</h3>
                <p className="text-gray-600 mb-4">Related topics that are trending together</p>
                <div className="flex flex-wrap gap-2">
                  {(analysis.topicClustering ?? []).map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm hover:bg-indigo-200 transition-colors cursor-pointer"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Topics */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Trending Topics</h3>
                <p className="text-gray-600 mb-4">Topics closely related and also trending</p>
                <div className="flex flex-wrap gap-2">
                  {(analysis.relatedTopics ?? []).map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors cursor-pointer"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Trend Analyses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysisHistory.slice(1).map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.topic}</h3>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Trend Velocity</span>
                    <span className={`font-semibold ${getScoreColor(item.trendVelocity)}`}>
                      {item.trendVelocity}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">AI Engagement</span>
                    <span className={`font-semibold ${getScoreColor(item.aiEngagementScore)}`}>
                      {item.aiEngagementScore}%
                    </span>
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