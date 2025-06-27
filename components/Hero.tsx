'use client'

import { motion } from 'motion/react'
import { ArrowRight, Zap, TrendingUp, Target } from 'lucide-react'

export default function Hero() {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools')
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Optimize for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {' '}AI Search & LLMs
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get your content discovered by AI assistants, chatbots, and LLM-powered search engines. Our tools help you rank in the new era of AI-driven discovery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button 
              onClick={scrollToTools}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 group"
            >
              <span>Explore Tools</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <Zap className="w-6 h-6 text-blue-600" />
              <span className="font-medium">AI Assistant Visibility</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <span className="font-medium">LLM Discovery</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <Target className="w-6 h-6 text-purple-600" />
              <span className="font-medium">Semantic Optimization</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 