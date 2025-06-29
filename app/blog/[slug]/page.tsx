import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getBlogPostBySlug, getRecentBlogPosts } from '@/lib/data'
import { MarkdownContent } from '@/lib/markdown'
import RelatedPosts from '../../components/RelatedPosts'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found - SEO Helper',
    }
  }

  return {
    title: `${post.title} - SEO Helper`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
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