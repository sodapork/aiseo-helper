'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'

const mockCategories = [
  { name: 'AI SEO', slug: 'ai-seo', count: 12 },
  { name: 'LLM Optimization', slug: 'llm-optimization', count: 8 },
  { name: 'Content Strategy', slug: 'content-strategy', count: 15 },
  { name: 'Technical SEO', slug: 'technical-seo', count: 6 },
  { name: 'Case Studies', slug: 'case-studies', count: 4 },
]

const mockTags = [
  { name: 'SEO', slug: 'seo', count: 25 },
  { name: 'AI', slug: 'ai', count: 18 },
  { name: 'Content', slug: 'content', count: 22 },
  { name: 'Strategy', slug: 'strategy', count: 14 },
  { name: 'LLM', slug: 'llm', count: 12 },
  { name: 'Optimization', slug: 'optimization', count: 16 },
]

export default function BlogFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug)
        ? prev.filter(cat => cat !== slug)
        : [...prev, slug]
    )
  }

  const toggleTag = (slug: string) => {
    setSelectedTags(prev =>
      prev.includes(slug)
        ? prev.filter(tag => tag !== slug)
        : [...prev, slug]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="font-medium text-gray-900">Filters</h3>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showFilters ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
          </button>
        </div>
        
        {hasActiveFilters && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedCategories.length + selectedTags.length} active filters
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Filter Content */}
      {showFilters && (
        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
            <div className="space-y-2">
              {mockCategories.map((category) => (
                <label key={category.slug} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.slug)}
                      onChange={() => toggleCategory(category.slug)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Tags</h4>
            <div className="space-y-2">
              {mockTags.map((tag) => (
                <label key={tag.slug} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.slug)}
                      onChange={() => toggleTag(tag.slug)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">#{tag.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {tag.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={() => {
              // TODO: Apply filters
              console.log('Selected categories:', selectedCategories)
              console.log('Selected tags:', selectedTags)
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  )
} 