import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import payloadConfig from '../payload.config'

interface UserExport {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
  updatedAt: string
}

async function exportUsers() {
  try {
    console.log('📊 Exporting user data...\n')
    
    const payload = await getPayload({ config: payloadConfig })
    
    // Get all users from the database
    const users = await payload.find({
      collection: 'users',
      limit: 1000, // Adjust as needed
    })
    
    if (!users.docs || users.docs.length === 0) {
      console.log('❌ No users found in the database')
      return
    }
    
    console.log(`✅ Found ${users.docs.length} users`)
    
    // Transform user data for export
    const userExports: UserExport[] = users.docs.map(user => ({
      id: String(user.id),
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))
    
    // Create exports directory if it doesn't exist
    const exportsDir = path.join(process.cwd(), 'exports')
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true })
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    
    // 1. Export as JSON
    const jsonPath = path.join(exportsDir, `users-${timestamp}.json`)
    fs.writeFileSync(jsonPath, JSON.stringify(userExports, null, 2))
    console.log(`📄 JSON export: ${jsonPath}`)
    
    // 2. Export email list only (CSV)
    const emailCsvPath = path.join(exportsDir, `email-list-${timestamp}.csv`)
    const emailCsv = ['email,name,role,created_at\n']
    userExports.forEach(user => {
      emailCsv.push(`"${user.email}","${user.name}","${user.role}","${user.createdAt}"\n`)
    })
    fs.writeFileSync(emailCsvPath, emailCsv.join(''))
    console.log(`📧 Email list (CSV): ${emailCsvPath}`)
    
    // 3. Export emails only (plain text, one per line)
    const emailListPath = path.join(exportsDir, `emails-only-${timestamp}.txt`)
    const emailsOnly = userExports.map(user => user.email).join('\n')
    fs.writeFileSync(emailListPath, emailsOnly)
    console.log(`📝 Emails only: ${emailListPath}`)
    
    // 4. Export detailed CSV
    const detailedCsvPath = path.join(exportsDir, `users-detailed-${timestamp}.csv`)
    const detailedCsv = ['id,email,name,role,created_at,updated_at\n']
    userExports.forEach(user => {
      detailedCsv.push(`"${user.id}","${user.email}","${user.name}","${user.role}","${user.createdAt}","${user.updatedAt}"\n`)
    })
    fs.writeFileSync(detailedCsvPath, detailedCsv.join(''))
    console.log(`📊 Detailed CSV: ${detailedCsvPath}`)
    
    // 5. Export by role
    const roles = Array.from(new Set(userExports.map(user => user.role)))
    roles.forEach(role => {
      const roleUsers = userExports.filter(user => user.role === role)
      const rolePath = path.join(exportsDir, `users-${role}-${timestamp}.csv`)
      const roleCsv = ['email,name,created_at\n']
      roleUsers.forEach(user => {
        roleCsv.push(`"${user.email}","${user.name}","${user.createdAt}"\n`)
      })
      fs.writeFileSync(rolePath, roleCsv.join(''))
      console.log(`👥 ${role} users: ${rolePath}`)
    })
    
    // Display summary
    console.log('\n📈 Export Summary:')
    console.log(`Total users: ${userExports.length}`)
    roles.forEach(role => {
      const count = userExports.filter(user => user.role === role).length
      console.log(`- ${role}: ${count} users`)
    })
    
    console.log('\n🎉 All exports completed successfully!')
    console.log(`📁 Files saved in: ${exportsDir}`)
    
  } catch (error) {
    console.error('❌ Export failed:', error)
  }
}

exportUsers() 