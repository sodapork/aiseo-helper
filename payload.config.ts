// Temporary Payload Configuration for Deployment
// This will be properly configured once we set up MongoDB

import { buildConfig } from 'payload/config'
import path from 'path'

// For now, we'll use a simple configuration that doesn't require database setup
const config = {
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- AI SEO Helper',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  collections: [],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: ['http://localhost:3000', 'https://aiseohelper.com'],
  csrf: ['http://localhost:3000', 'https://aiseohelper.com'],
}

export default buildConfig(config as any) 