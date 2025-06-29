import payload from 'payload'
import config from '../payload.config'

async function init() {
  try {
    console.log('🚀 Initializing Payload CMS...')
    
    // Initialize Payload
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
      config,
    })

    console.log('✅ Payload initialized successfully')

    // Check if admin user exists
    const adminUser = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@aiseohelper.com',
        },
      },
    })

    if (adminUser.docs.length === 0) {
      console.log('👤 Creating admin user...')
      
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@aiseohelper.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin',
        },
      })
      
      console.log('✅ Admin user created: admin@aiseohelper.com / admin123')
    } else {
      console.log('ℹ️  Admin user already exists')
    }

    // Create default blog categories
    const categories = [
      { name: 'AI SEO', slug: 'ai-seo', color: 'blue' },
      { name: 'LLM Optimization', slug: 'llm-optimization', color: 'green' },
      { name: 'Content Strategy', slug: 'content-strategy', color: 'purple' },
    ]

    for (const category of categories) {
      const existingCategory = await payload.find({
        collection: 'blog-categories',
        where: {
          slug: {
            equals: category.slug,
          },
        },
      })

      if (existingCategory.docs.length === 0) {
        await payload.create({
          collection: 'blog-categories',
          data: category,
        })
        console.log(`✅ Created category: ${category.name}`)
      }
    }

    // Create default blog tags
    const tags = [
      { name: 'SEO', slug: 'seo' },
      { name: 'AI', slug: 'ai' },
      { name: 'LLM', slug: 'llm' },
      { name: 'Content', slug: 'content' },
      { name: 'Optimization', slug: 'optimization' },
      { name: 'Strategy', slug: 'strategy' },
    ]

    for (const tag of tags) {
      const existingTag = await payload.find({
        collection: 'blog-tags',
        where: {
          slug: {
            equals: tag.slug,
          },
        },
      })

      if (existingTag.docs.length === 0) {
        await payload.create({
          collection: 'blog-tags',
          data: tag,
        })
        console.log(`✅ Created tag: ${tag.name}`)
      }
    }

    console.log('🎉 Payload CMS initialization complete!')
    console.log('📝 Access admin panel at: http://localhost:3000/admin')
    console.log('🔑 Login with: admin@aiseohelper.com / admin123')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Initialization failed:', error)
    process.exit(1)
  }
}

init() 