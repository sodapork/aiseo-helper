import { buildConfig } from 'payload/config'
import path from 'path'

// Collections
import { Tools } from './collections/Tools'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- AI SEO Helper',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  collections: [
    Tools,
    Pages,
    Media,
    Users,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: {
    mongoURL: process.env.MONGODB_URI || 'mongodb://localhost/aiseo-helper',
  },
  cors: ['http://localhost:3000', 'https://aiseohelper.com'],
  csrf: ['http://localhost:3000', 'https://aiseohelper.com'],
}) 