import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import path from 'path'

// Collections
import { Blog } from './collections/Blog'
import { BlogCategories } from './collections/BlogCategories'
import { BlogTags } from './collections/BlogTags'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Blog,
    BlogCategories,
    BlogTags,
    Media,
    Users,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/aiseo-helper',
  }),
  cors: ['http://localhost:3000', process.env.NEXT_PUBLIC_SERVER_URL].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL].filter(Boolean),
}) 