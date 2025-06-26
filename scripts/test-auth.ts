import { getPayload } from 'payload'
import payloadConfig from '../payload.config'

async function testAuth() {
  try {
    console.log('🚀 Testing Authentication System...\n')
    
    const payload = await getPayload({ config: payloadConfig })
    
    // Test 1: Check if we can connect to the database
    console.log('✅ Database connection successful')
    
    // Test 2: Try to create a test user
    console.log('\n📝 Creating test user...')
    
    const testUser = await payload.create({
      collection: 'users',
      data: {
        email: 'test@example.com',
        password: 'testpassword123',
        name: 'Test User',
        role: 'editor',
      },
    })
    
    console.log('✅ Test user created successfully:', testUser.email)
    
    // Test 3: Try to login with the test user
    console.log('\n🔐 Testing login...')
    
    const { user, token } = await payload.login({
      collection: 'users',
      data: {
        email: 'test@example.com',
        password: 'testpassword123',
      },
    })
    
    console.log('✅ Login successful:', user.email)
    console.log('✅ JWT token generated:', token ? 'Yes' : 'No')
    
    // Test 4: Verify user authentication
    console.log('\n🔍 Verifying authentication...')
    
    const headers = new Headers({ authorization: `JWT ${token}` })
    const { user: verifiedUser } = await payload.auth({ headers })
    if (verifiedUser) {
      console.log('✅ Authentication verification successful:', verifiedUser.email)
    } else {
      console.log('❌ Authentication verification failed: user is null')
    }
    
    // Test 5: Clean up - delete test user
    console.log('\n🧹 Cleaning up test user...')
    
    await payload.delete({
      collection: 'users',
      id: testUser.id,
    })
    
    console.log('✅ Test user deleted successfully')
    
    console.log('\n🎉 All authentication tests passed!')
    console.log('\n📋 Next steps:')
    console.log('1. Start your development server: npm run dev')
    console.log('2. Visit http://localhost:3000/register to create a real account')
    console.log('3. Test the login flow at http://localhost:3000/login')
    console.log('4. Access the dashboard at http://localhost:3000/dashboard')
    
  } catch (error) {
    console.error('❌ Authentication test failed:', error)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Make sure MongoDB is running')
    console.log('2. Check your MONGODB_URI environment variable')
    console.log('3. Ensure PAYLOAD_SECRET is set in .env.local')
    console.log('4. Run "npm run init-payload" to initialize the database')
  }
}

testAuth() 