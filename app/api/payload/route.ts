import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'Payload CMS API is working!',
    status: 'success',
    timestamp: new Date().toISOString()
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ 
    message: 'Payload CMS POST endpoint',
    data: body,
    status: 'success'
  })
} 