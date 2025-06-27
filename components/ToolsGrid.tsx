'use client'

import { motion } from 'motion/react'
import { Search, FileText, BarChart3, Target, Globe, TrendingUp, Zap, Settings, MessageSquare, Cpu, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getAllTools, type Tool } from '@/lib/data'

// Icon mapping for dynamic icon rendering
const iconMap = {
  Search,
  FileText,
  BarChart3,
  Target,
  Globe,
  TrendingUp,
  Zap,
  Settings,
  MessageSquare,
  Cpu,
  BookOpen
}

export default function ToolsGrid() {
  const router = useRouter()
  const tools = getAllTools()

  const handleToolClick = (tool: Tool) => {
    if (tool.link) {
      router.push(tool.link)
    }
  }

  // Helper function to get status tag styling
  const getStatusStyling = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in beta':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      case 'in development':
        return 'bg-red-100 text-red-800 border border-red-200'
      case 'complete':
        return 'bg-green-100 text-green-800 border border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap]
    return IconComponent || Search // fallback to Search icon
  }

  return (
    <section id="tools" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            LLM Optimization Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive suite of tools designed to help your content get discovered by AI assistants, chatbots, and LLM-powered search engines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = getIconComponent(tool.icon)
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => handleToolClick(tool)}
              >
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex-1 min-w-0">
                      {tool.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${getStatusStyling(tool.status)}`}>
                      {tool.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {tool.category}
                    </span>
                    <span className="text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Try Now →
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            More LLM optimization tools coming soon! We're constantly developing new solutions for AI-powered discovery.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Request New Tool
          </button>
        </motion.div>
      </div>
    </section>
  )
} 