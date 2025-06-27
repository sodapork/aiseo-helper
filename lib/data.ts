import toolsData from '@/data/tools.json'
import blogPostsData from '@/data/blog-posts.json'

export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  color: string
  status: string
  category: string
  link?: string
  features: string[]
  seo: {
    title: string
    description: string
    keywords: string
  }
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  slug: string
  author: string
  authorBio: string
  publishedAt: string
  readingTime: number
  status: string
  featuredImage: {
    url: string
    alt: string
  }
  categories: Array<{
    id: string
    name: string
    slug: string
    color: string
  }>
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
  content: string
  seo: {
    title: string
    description: string
    keywords: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

// Tools functions
export function getAllTools(): Tool[] {
  return toolsData as Tool[]
}

export function getToolById(id: string): Tool | undefined {
  return toolsData.find(tool => tool.id === id) as Tool | undefined
}

export function getToolsByCategory(category: string): Tool[] {
  return toolsData.filter(tool => tool.category === category) as Tool[]
}

export function getToolsByStatus(status: string): Tool[] {
  return toolsData.filter(tool => tool.status === status) as Tool[]
}

// Blog functions
export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData.filter(post => post.status === 'published') as BlogPost[]
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find(post => post.slug === slug && post.status === 'published') as BlogPost | undefined
}

export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  return blogPostsData.filter(post => 
    post.status === 'published' && 
    post.categories.some(cat => cat.slug === categorySlug)
  ) as BlogPost[]
}

export function getBlogPostsByTag(tagSlug: string): BlogPost[] {
  return blogPostsData.filter(post => 
    post.status === 'published' && 
    post.tags.some(tag => tag.slug === tagSlug)
  ) as BlogPost[]
}

export function getRecentBlogPosts(limit: number = 6): BlogPost[] {
  return getAllBlogPosts()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

// Categories and Tags functions
export function getAllCategories(): Category[] {
  const categories = new Map<string, Category>()
  
  blogPostsData.forEach(post => {
    post.categories.forEach(cat => {
      if (!categories.has(cat.id)) {
        categories.set(cat.id, cat)
      }
    })
  })
  
  return Array.from(categories.values())
}

export function getAllTags(): Tag[] {
  const tags = new Map<string, Tag>()
  
  blogPostsData.forEach(post => {
    post.tags.forEach(tag => {
      if (!tags.has(tag.id)) {
        tags.set(tag.id, tag)
      }
    })
  })
  
  return Array.from(tags.values())
}

// Search functions
export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase()
  
  return blogPostsData.filter(post => 
    post.status === 'published' &&
    (post.title.toLowerCase().includes(lowercaseQuery) ||
     post.excerpt.toLowerCase().includes(lowercaseQuery) ||
     post.content.toLowerCase().includes(lowercaseQuery) ||
     post.tags.some(tag => tag.name.toLowerCase().includes(lowercaseQuery)))
  ) as BlogPost[]
}

export function searchTools(query: string): Tool[] {
  const lowercaseQuery = query.toLowerCase()
  
  return toolsData.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.category.toLowerCase().includes(lowercaseQuery) ||
    tool.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  ) as Tool[]
} 