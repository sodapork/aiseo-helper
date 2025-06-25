import payload from 'payload'
import config from '../payload.config'

async function initPayload() {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
      local: true,
    })

    console.log('Payload initialized successfully!')
    console.log(`Admin URL: ${payload.getAdminURL()}`)

    // Create first admin user if none exists
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.docs.length === 0) {
      const adminUser = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@aiseohelper.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin',
        },
      })
      console.log('Created admin user:', adminUser.email)
    }

    // Create sample tools
    const tools = await payload.find({
      collection: 'tools',
      limit: 1,
    })

    if (tools.docs.length === 0) {
      const sampleTools = [
        {
          name: 'LLM Keyword Analyzer',
          description: 'Analyze how AI systems understand and process your keywords for better LLM discovery',
          category: 'Analysis',
          status: 'active',
          icon: 'Search',
          color: 'from-blue-500 to-blue-600',
          link: '/tools/keyword-analyzer',
          features: [
            { feature: 'AI Relevance Scoring' },
            { feature: 'Semantic Analysis' },
            { feature: 'Context Strength Evaluation' },
            { feature: 'LLM Understanding Metrics' },
          ],
        },
        {
          name: 'AI Content Optimizer',
          description: 'Optimize your content structure for better AI understanding and recommendations',
          category: 'Content',
          status: 'active',
          icon: 'FileText',
          color: 'from-green-500 to-green-600',
          features: [
            { feature: 'Content Structure Analysis' },
            { feature: 'AI Readability Scoring' },
            { feature: 'Semantic Optimization' },
            { feature: 'Context Enhancement' },
          ],
        },
      ]

      for (const tool of sampleTools) {
        await payload.create({
          collection: 'tools',
          data: tool,
        })
      }
      console.log('Created sample tools')
    }

    process.exit(0)
  } catch (error) {
    console.error('Error initializing Payload:', error)
    process.exit(1)
  }
}

initPayload() 