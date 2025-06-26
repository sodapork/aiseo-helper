import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '../../../../payload.config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: payloadConfig })
    
    // Check if user is authenticated and is admin
    const { user } = await payload.auth({ headers: request.headers })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }
    
    // Get format from query params
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const role = searchParams.get('role') // Optional role filter
    
    // Get all users from the database
    const query: any = {}
    if (role) {
      query.role = { equals: role }
    }
    
    const users = await payload.find({
      collection: 'users',
      where: query,
      limit: 1000,
    })
    
    if (!users.docs || users.docs.length === 0) {
      return NextResponse.json(
        { error: 'No users found' },
        { status: 404 }
      )
    }
    
    // Transform user data
    const userData = users.docs.map(user => ({
      id: String(user.id),
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))
    
    // Return data based on format
    switch (format.toLowerCase()) {
      case 'csv':
        const csvHeaders = 'email,name,role,created_at\n'
        const csvData = userData.map(user => 
          `"${user.email}","${user.name}","${user.role}","${user.createdAt}"`
        ).join('\n')
        
        return new NextResponse(csvHeaders + csvData, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="users-${new Date().toISOString().split('T')[0]}.csv"`,
          },
        })
      
      case 'emails':
        const emails = userData.map(user => user.email).join('\n')
        return new NextResponse(emails, {
          headers: {
            'Content-Type': 'text/plain',
            'Content-Disposition': `attachment; filename="emails-${new Date().toISOString().split('T')[0]}.txt"`,
          },
        })
      
      case 'json':
      default:
        return NextResponse.json({
          users: userData,
          total: userData.length,
          exportedAt: new Date().toISOString(),
        })
    }
    
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Failed to export users' },
      { status: 500 }
    )
  }
} 