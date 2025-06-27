import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getBlogPostBySlug, getRecentBlogPosts } from '@/lib/data'
import { MarkdownContent } from '@/lib/markdown'
import RelatedPosts from '../../components/RelatedPosts'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found - AI SEO Helper',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      images: [post.featuredImage.url],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return notFound()
  return (
    <div>
      <h1>{post.title}</h1>
      <MarkdownContent content={post.content} />
    </div>
  )
} 