import { NextRequest, NextResponse } from 'next/server'
import { getAllBlogPosts, searchBlogPosts } from '@/lib/data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const category = searchParams.get('category')
  const tag = searchParams.get('tag')
  const limit = searchParams.get('limit')

  let posts = getAllBlogPosts()

  // Apply search filter
  if (query) {
    posts = searchBlogPosts(query)
  }

  // Apply category filter
  if (category) {
    posts = posts.filter(post => 
      post.categories.some(cat => cat.slug === category)
    )
  }

  // Apply tag filter
  if (tag) {
    posts = posts.filter(post => 
      post.tags.some(t => t.slug === tag)
    )
  }

  // Apply limit
  if (limit) {
    posts = posts.slice(0, parseInt(limit))
  }

  return NextResponse.json({
    posts,
    total: posts.length,
    query: query || null,
    category: category || null,
    tag: tag || null
  })
} 