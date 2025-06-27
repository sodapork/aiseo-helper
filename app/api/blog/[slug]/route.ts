import { NextRequest, NextResponse } from 'next/server'
import { getBlogPostBySlug } from '@/lib/data'

export async function GET(request: NextRequest) {
  // Extract slug from the URL
  const url = new URL(request.url)
  const slug = url.pathname.split('/').filter(Boolean).pop()

  if (!slug) {
    return NextResponse.json(
      { error: 'Missing slug' },
      { status: 400 }
    )
  }

  try {
    const post = getBlogPostBySlug(slug)

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
} 