import { NextRequest, NextResponse } from 'next/server'
import { BlogAgent } from '../../../scripts/blog-agent-simple'

export async function POST(request: NextRequest) {
  try {
    const agent = new BlogAgent()
    await agent.initialize()
    
    await agent.generateDailyBlog()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog post generated successfully' 
    })
  } catch (error) {
    console.error('Error generating blog post:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate blog post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Blog generation API endpoint',
    usage: {
      method: 'POST',
      description: 'Generate a new blog post',
      response: {
        success: 'boolean',
        message: 'string',
        error: 'string (if failed)'
      }
    }
  })
} 