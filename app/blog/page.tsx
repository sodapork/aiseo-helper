import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User, Search, Filter } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import BlogSearch from '../components/BlogSearch'
import BlogFilters from '../components/BlogFilters'
import { getAllBlogPosts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Blog - SEO Helper',
  description: 'Latest insights and guides on LLM optimization, AI SEO, and getting your content discovered by AI systems.',
  keywords: 'AI SEO blog, LLM optimization tips, AI search strategies, content optimization',
}

export default function BlogPage() {
  const blogPosts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI SEO Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stay ahead of the curve with the latest insights, strategies, and tips for optimizing your content for AI search engines and LLMs.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <BlogSearch />
            </div>
            <div className="lg:w-64">
              <BlogFilters />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors">
              Load More Posts
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-white border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated with AI SEO Insights
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get the latest AI SEO tips and strategies delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 