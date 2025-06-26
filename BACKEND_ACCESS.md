# Backend Access Guide

## Quick Start

1. **Run the setup script:**
   ```bash
   npm run setup
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Access the admin panel:**
   - URL: `http://localhost:3000/admin`
   - Email: `admin@aiseohelper.com`
   - Password: `admin123`

## Admin Panel Features

### Collections Available

#### Users
- Manage admin users and roles
- Create new admin accounts
- Set user permissions

#### Tools
- Add new SEO tools
- Edit tool descriptions and features
- Manage tool categories and status
- Upload tool icons and images

#### Pages
- Create static pages
- Manage page content and SEO settings
- Set up hero sections and CTAs

#### Media
- Upload images and files
- Manage media library
- Generate different image sizes automatically

## API Endpoints

### REST API
Payload automatically generates REST endpoints for all collections:

```
GET    /api/tools          # List all tools
POST   /api/tools          # Create new tool
GET    /api/tools/:id      # Get specific tool
PATCH  /api/tools/:id      # Update tool
DELETE /api/tools/:id      # Delete tool

GET    /api/pages          # List all pages
POST   /api/pages          # Create new page
GET    /api/pages/:id      # Get specific page
PATCH  /api/pages/:id      # Update page
DELETE /api/pages/:id      # Delete page

GET    /api/users          # List all users
POST   /api/users          # Create new user
GET    /api/users/:id      # Get specific user
PATCH  /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user

GET    /api/media          # List all media
POST   /api/media          # Upload new media
GET    /api/media/:id      # Get specific media
PATCH  /api/media/:id      # Update media
DELETE /api/media/:id      # Delete media
```

### GraphQL API
- **Endpoint**: `http://localhost:3000/api/graphql`
- **Playground**: `http://localhost:3000/api/graphql` (in browser)

Example GraphQL query:
```graphql
query {
  Tools {
    docs {
      id
      name
      description
      category
      status
      features {
        feature
      }
    }
  }
}
```

### Admin API
- **Endpoint**: `http://localhost:3000/api/admin`
- Requires authentication

## Using the API in Your Frontend

### Fetch Tools
```typescript
// Get all tools
const response = await fetch('/api/tools')
const tools = await response.json()

// Get specific tool
const tool = await fetch('/api/tools/64f1234567890abcdef12345')
const toolData = await tool.json()
```

### Create New Tool
```typescript
const newTool = await fetch('/api/tools', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'New SEO Tool',
    description: 'Description of the tool',
    category: 'Analysis',
    status: 'active',
    icon: 'Search',
    color: 'from-blue-500 to-blue-600',
    features: [
      { feature: 'Feature 1' },
      { feature: 'Feature 2' },
    ],
  }),
})
```

### Update Tool
```typescript
const updatedTool = await fetch('/api/tools/64f1234567890abcdef12345', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Updated Tool Name',
    status: 'development',
  }),
})
```

## Database Schema

### Tools Collection
```typescript
{
  id: string
  name: string (required)
  description: string (required)
  category: 'Analysis' | 'Content' | 'Monitoring' | 'Research' | 'Optimization' | 'Technical'
  status: 'active' | 'development' | 'coming-soon'
  icon: string (required)
  color: string (required)
  link?: string
  features: Array<{ feature: string }>
  content?: RichText
  seo?: {
    title?: string
    description?: string
    keywords?: string
  }
  createdAt: Date
  updatedAt: Date
}
```

### Pages Collection
```typescript
{
  id: string
  title: string (required)
  slug: string (required, unique)
  status: 'draft' | 'published'
  content?: RichText
  hero?: {
    headline?: string
    subheadline?: string
    ctaText?: string
    ctaLink?: string
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string
    ogImage?: Media
  }
  createdAt: Date
  updatedAt: Date
}
```

## Environment Variables

Required environment variables in `.env.local`:

```env
# Payload CMS Configuration
PAYLOAD_SECRET=your-super-secret-key-change-this-in-production
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/aiseo-helper
```

## Common Commands

```bash
# Initialize Payload (creates admin user and sample data)
npm run init-payload

# Generate TypeScript types
npm run generate:types

# Generate GraphQL schema
npm run generate:graphQLSchema

# Run Payload CLI
npm run payload

# Setup everything (install deps, create env, init payload)
npm run setup
```

## Troubleshooting

### "MongoDB connection failed"
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env.local`
- Try: `mongosh --eval "db.runCommand('ping')"`

### "Admin panel not accessible"
- Run `npm run init-payload` first
- Check browser console for errors
- Verify admin user was created

### "API endpoints not working"
- Ensure Payload is properly initialized
- Check that collections are imported in `payload.config.ts`
- Verify environment variables are set

## Production Deployment

For production, you'll need:

1. **MongoDB Atlas** or cloud MongoDB instance
2. **Environment variables** set in your hosting platform
3. **Strong PAYLOAD_SECRET** (generate with: `openssl rand -base64 32`)
4. **Proper CORS settings** for your domain

Example production `.env`:
```env
PAYLOAD_SECRET=your-very-long-random-secret-key
PAYLOAD_PUBLIC_SERVER_URL=https://yourdomain.com
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aiseo-helper
``` 