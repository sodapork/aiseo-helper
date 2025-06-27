'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { BookOpen, ArrowLeft, Download, Share2, Settings, FileText, Copy, CheckCircle, AlertCircle, Sparkles, Target, Users } from 'lucide-react'
import Link from 'next/link'

interface GlossaryEntry {
  term: string
  glossaryEntry: string
  timestamp: string
  tone: string
  industry: string
  targetAudience: string
}

export default function GlossaryGenerator() {
  const [term, setTerm] = useState('')
  const [tone, setTone] = useState('professional')
  const [industry, setIndustry] = useState('general')
  const [targetAudience, setTargetAudience] = useState('general audience')
  const [isGenerating, setIsGenerating] = useState(false)
  const [glossaryEntry, setGlossaryEntry] = useState<GlossaryEntry | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and authoritative' },
    { value: 'casual', label: 'Casual', description: 'Friendly and approachable' },
    { value: 'technical', label: 'Technical', description: 'Detailed and precise' },
    { value: 'educational', label: 'Educational', description: 'Clear and instructional' },
    { value: 'conversational', label: 'Conversational', description: 'Natural and engaging' }
  ]

  const industryOptions = [
    { value: 'general', label: 'General' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'legal', label: 'Legal' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'consulting', label: 'Consulting' }
  ]

  const audienceOptions = [
    { value: 'general audience', label: 'General Audience' },
    { value: 'professionals', label: 'Professionals' },
    { value: 'beginners', label: 'Beginners' },
    { value: 'experts', label: 'Experts' },
    { value: 'students', label: 'Students' },
    { value: 'business owners', label: 'Business Owners' },
    { value: 'developers', label: 'Developers' },
    { value: 'marketers', label: 'Marketers' }
  ]

  const generateGlossaryEntry = async () => {
    if (!term.trim()) return

    setIsGenerating(true)
    setError('')
    
    try {
      const res = await fetch('/api/glossary-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          term: term.trim(),
          tone,
          industry,
          targetAudience
        })
      });
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setGlossaryEntry(data);
    } catch (error) {
      setError('Error generating glossary entry. Please try again.')
      console.error('Error:', error)
    }
    setIsGenerating(false);
  }

  const copyToClipboard = async () => {
    if (!glossaryEntry) return
    
    try {
      await navigator.clipboard.writeText(glossaryEntry.glossaryEntry);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }

  const downloadAsHtml = () => {
    if (!glossaryEntry) return
    
    const blob = new Blob([glossaryEntry.glossaryEntry], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${glossaryEntry.term.toLowerCase().replace(/\s+/g, '-')}-glossary.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/tools" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Tools</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Glossary Generator</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-600 hover:text-purple-600 transition-colors">
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
            AI Glossary Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create comprehensive glossary terms optimized for AI and LLM understanding. Generate structured, citation-friendly content that follows semantic best practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-2">
                  Glossary Term
                </label>
                <input
                  type="text"
                  id="term"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Enter the term you want to define..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  {toneOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  {industryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  {audienceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={generateGlossaryEntry}
                disabled={!term.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Glossary Entry</span>
                  </>
                )}
              </button>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Generated Glossary Entry</h3>
              {glossaryEntry && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadAsHtml}
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>

            {glossaryEntry ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Term:</strong> {glossaryEntry.term}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Tone:</strong> {glossaryEntry.tone}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Industry:</strong> {glossaryEntry.industry}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Target Audience:</strong> {glossaryEntry.targetAudience}
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: glossaryEntry.glossaryEntry }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Your generated glossary entry will appear here</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Use Our Glossary Generator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Optimized Structure</h3>
              <p className="text-gray-600">
                Structured content that follows semantic best practices for better AI understanding and citation.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Citation-Friendly</h3>
              <p className="text-gray-600">
                Content designed to be easily cited by AI systems with clear definitions and real-world examples.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Audience-Tailored</h3>
              <p className="text-gray-600">
                Customize tone and style for your specific industry and target audience needs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 