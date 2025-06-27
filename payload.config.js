import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Temporary Payload Configuration for Deployment
// This will be properly configured once we set up MongoDB
import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { Pages } from './collections/Pages.js';
import { Media } from './collections/Media.js';
import { Tools } from './collections/Tools.js';
import { Blog } from './collections/Blog.js';
import { BlogCategories } from './collections/BlogCategories.js';
import { BlogTags } from './collections/BlogTags.js';
// For now, we'll use a simple configuration that doesn't require database setup
const payloadSecret = process.env.PAYLOAD_SECRET;
if (!payloadSecret) {
    throw new Error('PAYLOAD_SECRET environment variable is required but not set.');
}
export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    editor: lexicalEditor({}),
    collections: [Pages, Media, Tools, Blog, BlogCategories, BlogTags],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
    cors: ['http://localhost:3000', 'https://aiseohelper.com'],
    csrf: ['http://localhost:3000', 'https://aiseohelper.com'],
    db: mongooseAdapter({
        url: process.env.MONGODB_URI || 'mongodb://localhost:27017/aiseo-helper',
    }),
    secret: payloadSecret,
});
