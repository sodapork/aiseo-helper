import { getPayload } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical'
import { createEditor } from 'lexical'
import { $createHeadingNode } from '@lexical/rich-text'
import dotenv from 'dotenv'

dotenv.config()

interface BlogTopic {
  title: string
  excerpt: string
  keywords: string[]
  category: string
  tags: string[]
  contentOutline: string[]
}

interface UnsplashImage {
  id: string
  urls: {
    regular: string
    full: string
  }
  alt_description: string
  user: {
    name: string
    links: {
      html: string
    }
  }
}

class BlogAgent {
  private payload: any
  private unsplashAccessKey: string

  constructor() {
    this.unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY || ''
  }

  async initialize() {
    this.payload = await getPayload()
  }

  private getBlogTopics(): BlogTopic[] {
    return [
      {
        title: "7 Essential LLM Optimization Strategies for Better AI Citations",
        excerpt: "Discover the most effective strategies to optimize your content for Large Language Models and increase your chances of being cited in AI-generated responses.",
        keywords: ["LLM optimization", "AI citations", "content strategy", "SEO", "large language models"],
        category: "AI SEO",
        tags: ["LLM", "AI", "SEO", "Content Strategy", "Citations"],
        contentOutline: [
          "Understanding LLM Content Consumption",
          "Structured Data and Schema Markup",
          "Comprehensive Content Depth",
          "Authoritative Source Building",
          "Technical SEO for AI",
          "Content Freshness and Updates",
          "Measuring LLM Performance"
        ]
      },
      {
        title: "How to Structure Your Content for Maximum AI Visibility",
        excerpt: "Learn the best practices for structuring your website content to ensure it's easily discoverable and citable by AI systems like ChatGPT and Google's AI Overviews.",
        keywords: ["content structure", "AI visibility", "ChatGPT optimization", "Google AI", "content formatting"],
        category: "Content Strategy",
        tags: ["Content Structure", "AI", "ChatGPT", "Google", "Formatting"],
        contentOutline: [
          "The Importance of Clear Information Hierarchy",
          "Using Headers and Subheaders Effectively",
          "Implementing Structured Data",
          "Creating Comprehensive FAQ Sections",
          "Optimizing for Featured Snippets",
          "Mobile-First Content Design",
          "Testing Content with AI Tools"
        ]
      },
      {
        title: "The Complete Guide to GPTBot Crawling and AI Indexing",
        excerpt: "Master the art of making your content accessible to AI crawlers like GPTBot and ensure your website gets properly indexed by AI systems.",
        keywords: ["GPTBot", "AI crawling", "robots.txt", "AI indexing", "web crawling"],
        category: "Technical SEO",
        tags: ["GPTBot", "Crawling", "Indexing", "Technical SEO", "AI"],
        contentOutline: [
          "Understanding GPTBot and AI Crawlers",
          "Configuring robots.txt for AI",
          "Optimizing Site Architecture",
          "Improving Page Load Speed",
          "Mobile Optimization for AI",
          "Structured Data Implementation",
          "Monitoring AI Crawl Performance"
        ]
      },
      {
        title: "Advanced LLM Optimization: Beyond Traditional SEO",
        excerpt: "Explore advanced techniques for optimizing your content specifically for Large Language Models, going beyond traditional search engine optimization.",
        keywords: ["advanced LLM optimization", "AI-specific SEO", "content optimization", "LLM strategies"],
        category: "Advanced SEO",
        tags: ["Advanced SEO", "LLM", "AI", "Content Optimization", "Strategy"],
        contentOutline: [
          "Understanding LLM vs Traditional Search",
          "Content Depth and Comprehensiveness",
          "Authoritative Source Development",
          "Cross-Referencing and Citations",
          "Temporal Relevance",
          "Multimodal Content Optimization",
          "Future-Proofing Your Content"
        ]
      },
      {
        title: "Building Authority in the Age of AI: A Comprehensive Guide",
        excerpt: "Learn how to establish your website as an authoritative source that AI systems trust and cite regularly in their responses.",
        keywords: ["authority building", "AI trust", "content authority", "expertise", "credibility"],
        category: "Authority Building",
        tags: ["Authority", "Trust", "Credibility", "Expertise", "AI"],
        contentOutline: [
          "Understanding AI Authority Signals",
          "Expert Credentials and Background",
          "Comprehensive Content Coverage",
          "Regular Updates and Maintenance",
          "Cross-Domain Authority",
          "Social Proof and Recognition",
          "Long-term Authority Strategy"
        ]
      }
    ]
  }

  private async getUnsplashImage(query: string): Promise<UnsplashImage | null> {
    if (!this.unsplashAccessKey) {
      console.warn('Unsplash access key not configured')
      return null
    }

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1`,
        {
          headers: {
            'Authorization': `Client-ID ${this.unsplashAccessKey}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`)
      }

      const data = await response.json()
      return data.results[0] || null
    } catch (error) {
      console.error('Error fetching Unsplash image:', error)
      return null
    }
  }

  private async createLexicalContent(outline: string[]): Promise<any> {
    const editor = createEditor({
      namespace: 'BlogAgent',
      onError: (error) => {
        console.error('Lexical editor error:', error)
      }
    })
    editor.update(() => {
      const root = $getRoot()
      root.clear()

      // Add introduction
      const introHeading = $createHeadingNode('h2')
      introHeading.append($createTextNode('Introduction'))
      root.append(introHeading)

      const introPara = $createParagraphNode()
      introPara.append($createTextNode('In today\'s AI-driven digital landscape, optimizing your content for Large Language Models (LLMs) has become crucial for maintaining visibility and authority. This comprehensive guide will walk you through the essential strategies to ensure your content is discoverable, citable, and valuable to AI systems.'))
      root.append(introPara)

      // Add content sections
      outline.forEach((section, index) => {
        const heading = $createHeadingNode('h3')
        heading.append($createTextNode(section))
        root.append(heading)

        const para = $createParagraphNode()
        para.append($createTextNode(`This section will cover the key aspects of ${section.toLowerCase()}. We'll explore best practices, implementation strategies, and real-world examples to help you optimize your content effectively.`))
        root.append(para)

        // Add a practical tip
        const tipPara = $createParagraphNode()
        tipPara.append($createTextNode(`💡 Pro Tip: Focus on providing comprehensive, well-structured information that directly addresses user queries and search intent.`))
        root.append(tipPara)
      })

      // Add conclusion
      const conclusionHeading = $createHeadingNode('h2')
      conclusionHeading.append($createTextNode('Conclusion'))
      root.append(conclusionHeading)

      const conclusionPara = $createParagraphNode()
      conclusionPara.append($createTextNode('Optimizing your content for LLMs requires a strategic approach that combines technical SEO, content quality, and user experience. By implementing these strategies consistently, you can improve your chances of being cited by AI systems and maintaining visibility in the evolving digital landscape.'))
      root.append(conclusionPara)
    })

    // Return the editor state as JSON
    return editor.getEditorState().toJSON()
  }

  private async createOrGetCategory(categoryName: string): Promise<string> {
    try {
      const existingCategory = await this.payload.find({
        collection: 'blog-categories',
        where: {
          name: { equals: categoryName }
        }
      })

      if (existingCategory.docs.length > 0) {
        return existingCategory.docs[0].id
      }

      const newCategory = await this.payload.create({
        collection: 'blog-categories',
        data: {
          name: categoryName,
          slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
          description: `Articles about ${categoryName}`
        }
      })

      return newCategory.id
    } catch (error) {
      console.error('Error creating/getting category:', error)
      return ''
    }
  }

  private async createOrGetTags(tagNames: string[]): Promise<string[]> {
    const tagIds: string[] = []

    for (const tagName of tagNames) {
      try {
        const existingTag = await this.payload.find({
          collection: 'blog-tags',
          where: {
            name: { equals: tagName }
          }
        })

        if (existingTag.docs.length > 0) {
          tagIds.push(existingTag.docs[0].id)
        } else {
          const newTag = await this.payload.create({
            collection: 'blog-tags',
            data: {
              name: tagName,
              slug: tagName.toLowerCase().replace(/\s+/g, '-')
            }
          })
          tagIds.push(newTag.id)
        }
      } catch (error) {
        console.error('Error creating/getting tag:', error)
      }
    }

    return tagIds
  }

  private async uploadImageFromUnsplash(image: UnsplashImage): Promise<string | null> {
    try {
      const response = await fetch(image.urls.full)
      const buffer = await response.arrayBuffer()

      const media = await this.payload.create({
        collection: 'media',
        data: {
          alt: image.alt_description || 'Blog featured image',
          filename: `unsplash-${image.id}.jpg`,
          mimeType: 'image/jpeg',
          filesize: buffer.byteLength,
          width: 1920,
          height: 1080,
          url: image.urls.full
        },
        file: new Blob([buffer], { type: 'image/jpeg' })
      })

      return media.id
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  async generateDailyBlog(): Promise<void> {
    try {
      const topics = this.getBlogTopics()
      const randomTopic = topics[Math.floor(Math.random() * topics.length)]

      console.log(`Generating blog post: ${randomTopic.title}`)

      // Get Unsplash image
      const imageQuery = `${randomTopic.keywords.join(' ')} digital marketing`
      const unsplashImage = await this.getUnsplashImage(imageQuery)

      // Create category and tags
      const categoryId = await this.createOrGetCategory(randomTopic.category)
      const tagIds = await this.createOrGetTags(randomTopic.tags)

      // Create lexical content
      const content = await this.createLexicalContent(randomTopic.contentOutline)

      // Upload image if available
      let featuredImageId: string | null = null
      if (unsplashImage) {
        featuredImageId = await this.uploadImageFromUnsplash(unsplashImage)
      }

      // Create blog post
      const blogPost = await this.payload.create({
        collection: 'blog',
        data: {
          title: randomTopic.title,
          slug: randomTopic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
          excerpt: randomTopic.excerpt,
          content: content,
          author: 'AI SEO Helper',
          authorBio: 'AI-powered content optimization expert',
          featuredImage: featuredImageId,
          status: 'published',
          publishedAt: new Date().toISOString(),
          categories: categoryId ? [categoryId] : [],
          tags: tagIds,
          readingTime: Math.ceil(randomTopic.contentOutline.length * 2),
          seo: {
            title: randomTopic.title,
            description: randomTopic.excerpt,
            keywords: randomTopic.keywords.join(', ')
          }
        }
      })

      console.log(`Successfully created blog post: ${blogPost.id}`)
    } catch (error) {
      console.error('Error generating daily blog:', error)
    }
  }

  async scheduleDailyBlog(): Promise<void> {
    console.log('Starting daily blog generation schedule...')
    
    // Generate first blog post immediately
    await this.generateDailyBlog()

    // Schedule daily generation at 9 AM
    const scheduleNextBlog = () => {
      const now = new Date()
      const nextRun = new Date(now)
      nextRun.setHours(9, 0, 0, 0)
      
      if (nextRun <= now) {
        nextRun.setDate(nextRun.getDate() + 1)
      }

      const timeUntilNext = nextRun.getTime() - now.getTime()
      
      setTimeout(async () => {
        await this.generateDailyBlog()
        scheduleNextBlog() // Schedule next day
      }, timeUntilNext)

      console.log(`Next blog generation scheduled for: ${nextRun.toISOString()}`)
    }

    scheduleNextBlog()
  }
}

// Main execution
async function main() {
  const agent = new BlogAgent()
  await agent.initialize()
  
  if (process.argv.includes('--schedule')) {
    await agent.scheduleDailyBlog()
  } else {
    await agent.generateDailyBlog()
  }
}

if (require.main === module) {
  main().catch(console.error)
}

export { BlogAgent } 