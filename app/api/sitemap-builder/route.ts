import { NextRequest, NextResponse } from 'next/server'

interface SitemapAnalysis {
  originalUrl: string
  aiCompatibilityScore: number
  llmDiscoveryScore: number
  structureOptimization: number
  aiFriendlyFormatting: number
  suggestions: string[]
  optimizedSitemap: string
  analysis: string
  issues: string[]
  improvements: string[]
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const sitemapFile = formData.get('sitemap') as File
    const sitemapUrl = formData.get('sitemapUrl') as string

    if (!sitemapFile && !sitemapUrl) {
      return NextResponse.json(
        { error: 'No sitemap file or URL provided' },
        { status: 400 }
      )
    }

    let sitemapContent = ''
    let originalUrl = ''

    // Handle file upload
    if (sitemapFile) {
      sitemapContent = await sitemapFile.text()
      originalUrl = sitemapFile.name
    }

    // Handle URL input
    if (sitemapUrl) {
      try {
        const response = await fetch(sitemapUrl)
        if (!response.ok) {
          throw new Error('Failed to fetch sitemap')
        }
        sitemapContent = await response.text()
        originalUrl = sitemapUrl
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to fetch sitemap from URL' },
          { status: 400 }
        )
      }
    }

    // Analyze the sitemap content
    const analysis = analyzeSitemap(sitemapContent, originalUrl)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Sitemap builder error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function analyzeSitemap(content: string, originalUrl: string): SitemapAnalysis {
  // Parse XML content
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(content, 'text/xml')
  
  // Check for parsing errors
  const parseError = xmlDoc.getElementsByTagName('parsererror')
  if (parseError.length > 0) {
    throw new Error('Invalid XML format')
  }

  const urls = xmlDoc.getElementsByTagName('url')
  const issues: string[] = []
  const improvements: string[] = []
  let totalUrls = urls.length
  let hasLastmod = 0
  let hasChangefreq = 0
  let hasPriority = 0
  let hasImageTags = 0
  let hasVideoTags = 0
  let hasNewsTags = 0
  let hasHreflang = 0
  let hasAlternate = 0

  // Analyze each URL entry
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const loc = url.getElementsByTagName('loc')[0]?.textContent
    const lastmod = url.getElementsByTagName('lastmod')[0]?.textContent
    const changefreq = url.getElementsByTagName('changefreq')[0]?.textContent
    const priority = url.getElementsByTagName('priority')[0]?.textContent
    const images = url.getElementsByTagName('image:image')
    const videos = url.getElementsByTagName('video:video')
    const news = url.getElementsByTagName('news:news')
    const hreflang = url.getElementsByTagName('xhtml:link')

    if (lastmod) hasLastmod++
    if (changefreq) hasChangefreq++
    if (priority) hasPriority++
    if (images.length > 0) hasImageTags++
    if (videos.length > 0) hasVideoTags++
    if (news.length > 0) hasNewsTags++
    if (hreflang.length > 0) hasHreflang++

    // Check for issues
    if (!loc) {
      issues.push(`URL entry ${i + 1} is missing location`)
    }
    if (!lastmod) {
      issues.push(`URL entry ${i + 1} is missing lastmod date`)
    }
    if (!changefreq) {
      issues.push(`URL entry ${i + 1} is missing changefreq`)
    }
    if (!priority) {
      issues.push(`URL entry ${i + 1} is missing priority`)
    }
  }

  // Calculate scores
  const aiCompatibilityScore = Math.min(100, Math.round(
    (hasLastmod / totalUrls) * 30 +
    (hasChangefreq / totalUrls) * 25 +
    (hasPriority / totalUrls) * 25 +
    (hasImageTags / totalUrls) * 10 +
    (hasVideoTags / totalUrls) * 10
  ))

  const llmDiscoveryScore = Math.min(100, Math.round(
    (hasLastmod / totalUrls) * 40 +
    (hasChangefreq / totalUrls) * 30 +
    (hasPriority / totalUrls) * 30
  ))

  const structureOptimization = Math.min(100, Math.round(
    (hasImageTags / totalUrls) * 30 +
    (hasVideoTags / totalUrls) * 30 +
    (hasNewsTags / totalUrls) * 20 +
    (hasHreflang / totalUrls) * 20
  ))

  const aiFriendlyFormatting = Math.min(100, Math.round(
    (hasLastmod / totalUrls) * 35 +
    (hasChangefreq / totalUrls) * 35 +
    (hasPriority / totalUrls) * 30
  ))

  // Generate improvements
  if (hasLastmod / totalUrls < 0.8) {
    improvements.push('Add lastmod dates to all URL entries for better AI understanding')
  }
  if (hasChangefreq / totalUrls < 0.8) {
    improvements.push('Add changefreq attributes to help AI understand content freshness')
  }
  if (hasPriority / totalUrls < 0.8) {
    improvements.push('Add priority values to indicate content importance to AI systems')
  }
  if (hasImageTags / totalUrls < 0.3) {
    improvements.push('Include image tags for multimedia content discovery')
  }
  if (hasVideoTags / totalUrls < 0.1) {
    improvements.push('Add video tags for video content optimization')
  }
  if (hasHreflang / totalUrls < 0.2) {
    improvements.push('Include hreflang tags for international content')
  }

  // Generate optimized sitemap
  const optimizedSitemap = generateOptimizedSitemap(xmlDoc, improvements)

  // Generate analysis summary
  const analysis = `Your sitemap contains ${totalUrls} URLs. The AI compatibility score of ${aiCompatibilityScore}% indicates ${aiCompatibilityScore >= 80 ? 'good' : aiCompatibilityScore >= 60 ? 'moderate' : 'poor'} optimization for AI systems. The LLM discovery score of ${llmDiscoveryScore}% shows ${llmDiscoveryScore >= 80 ? 'excellent' : llmDiscoveryScore >= 60 ? 'good' : 'limited'} potential for discovery by language models.`

  return {
    originalUrl,
    aiCompatibilityScore,
    llmDiscoveryScore,
    structureOptimization,
    aiFriendlyFormatting,
    suggestions: improvements,
    optimizedSitemap,
    analysis,
    issues: issues.slice(0, 10), // Limit to first 10 issues
    improvements
  }
}

function generateOptimizedSitemap(xmlDoc: Document, improvements: string[]): string {
  // Create a copy of the original sitemap
  const optimizedDoc = xmlDoc.cloneNode(true) as Document
  const urls = optimizedDoc.getElementsByTagName('url')

  // Apply optimizations
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    
    // Add missing lastmod if not present
    if (!url.getElementsByTagName('lastmod')[0]) {
      const lastmod = optimizedDoc.createElement('lastmod')
      lastmod.textContent = new Date().toISOString()
      url.appendChild(lastmod)
    }

    // Add missing changefreq if not present
    if (!url.getElementsByTagName('changefreq')[0]) {
      const changefreq = optimizedDoc.createElement('changefreq')
      changefreq.textContent = 'weekly'
      url.appendChild(changefreq)
    }

    // Add missing priority if not present
    if (!url.getElementsByTagName('priority')[0]) {
      const priority = optimizedDoc.createElement('priority')
      priority.textContent = '0.5'
      url.appendChild(priority)
    }
  }

  // Convert to string with proper formatting
  const serializer = new XMLSerializer()
  return serializer.serializeToString(optimizedDoc)
}

// Polyfill for DOMParser in Node.js environment
class DOMParser {
  parseFromString(str: string, contentType: string): Document {
    // This is a simplified implementation
    // In a real implementation, you'd use a proper XML parser like xml2js
    const doc = new Document()
    // Basic XML parsing logic would go here
    return doc
  }
}

// Polyfill for XMLSerializer in Node.js environment
class XMLSerializer {
  serializeToString(doc: Document): string {
    // This is a simplified implementation
    // In a real implementation, you'd use a proper XML serializer
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <!-- Optimized sitemap content would go here -->\n</urlset>'
  }
} 