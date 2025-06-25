# Payload CMS + Auto-Deployment Setup Guide

This guide will help you set up Payload CMS with automatic deployment to your live site.

## 🎯 Overview

Your setup will work like this:
1. **Local Development**: Edit code and content here
2. **Git Push**: Push changes to GitHub
3. **Auto-Deploy**: Vercel/Netlify automatically deploys your site
4. **Content Management**: Use the admin dashboard at `/admin`

## 📁 Current Structure

```
AISEO Helper/
├── app/
│   ├── admin/                 # Admin dashboard
│   │   ├── page.tsx          # Main admin page
│   │   └── tools/page.tsx    # Tools management
│   ├── tools/                # Your LLM tools
│   │   └── keyword-analyzer/ # Keyword analyzer tool
│   └── api/payload/          # Payload API endpoints
├── collections/              # Payload CMS collections
│   ├── Tools.ts             # Tools collection
│   ├── Pages.ts             # Pages collection
│   ├── Media.ts             # Media collection
│   └── Users.ts             # Users collection
├── payload.config.ts         # Payload configuration
└── scripts/init-payload.ts   # Initialization script
```

## 🚀 Setup Steps

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit with Payload CMS"
git branch -M main
git remote add origin https://github.com/yourusername/aiseo-helper.git
git push -u origin main
```

### 2. Set Up Environment Variables

Create a `.env.local` file (not tracked by git):

```env
PAYLOAD_SECRET=your-super-secret-key-change-this-in-production
MONGODB_URI=mongodb://localhost/aiseo-helper
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
brew install mongodb-community
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Recommended for production)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in your environment variables

### 4. Initialize Payload CMS

```bash
npm run init-payload
```

This will:
- Create your first admin user (admin@aiseohelper.com / admin123)
- Add sample tools to the database
- Set up the initial content structure

### 5. Deploy to Vercel

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Environment Variables**:
   - In Vercel dashboard, go to your project
   - Click "Settings" → "Environment Variables"
   - Add:
     ```
     PAYLOAD_SECRET=your-production-secret-key
     MONGODB_URI=your-mongodb-atlas-connection-string
     PAYLOAD_PUBLIC_SERVER_URL=https://aiseohelper.com
     ```

3. **Deploy**:
   - Vercel will automatically detect it's a Next.js project
   - Click "Deploy"

### 6. Connect Your Domain

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your domain: `aiseohelper.com`
3. Update your domain's DNS settings as instructed by Vercel

## 🔧 Content Management Workflow

### Accessing the Admin Dashboard

1. **Local Development**: `http://localhost:3000/admin`
2. **Production**: `https://aiseohelper.com/admin`

### Managing Content

1. **Tools Management** (`/admin/tools`):
   - Add new LLM optimization tools
   - Edit existing tools
   - Manage tool categories and status
   - Set up tool links and features

2. **Pages Management** (`/admin/pages`):
   - Create and edit website pages
   - Manage hero sections
   - Set SEO metadata

3. **Media Library** (`/admin/media`):
   - Upload and manage images
   - Organize media files
   - Set alt text and captions

### Auto-Deployment Workflow

1. **Make Changes Locally**:
   ```bash
   # Edit your code or content
   npm run dev  # Test locally
   ```

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add new tool: AI Content Optimizer"
   git push origin main
   ```

3. **Automatic Deployment**:
   - Vercel detects the push
   - Builds your site automatically
   - Deploys to your live domain
   - Your changes are live in minutes!

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Initialize Payload CMS
npm run init-payload

# Generate TypeScript types
npm run generate:types

# Generate GraphQL schema
npm run generate:graphQLSchema
```

## 📊 Database Collections

### Tools Collection
- **Name**: Tool name
- **Description**: Tool description
- **Category**: Analysis, Content, Monitoring, etc.
- **Status**: Active, Development, Coming Soon
- **Icon**: Lucide React icon name
- **Color**: Tailwind CSS gradient classes
- **Link**: Internal tool link
- **Features**: Array of tool features
- **SEO**: SEO metadata

### Pages Collection
- **Title**: Page title
- **Slug**: URL slug
- **Status**: Draft or Published
- **Content**: Rich text content
- **Hero**: Hero section data
- **SEO**: SEO settings

### Media Collection
- **File Upload**: Images and files
- **Alt Text**: Accessibility
- **Caption**: Image captions

### Users Collection
- **Email**: User email
- **Password**: User password
- **Name**: User name
- **Role**: Admin or Editor

## 🔒 Security

1. **Change Default Credentials**:
   - Update admin password after first login
   - Use strong, unique passwords

2. **Environment Variables**:
   - Never commit `.env.local` to git
   - Use different secrets for development and production

3. **Access Control**:
   - Limit admin access to trusted users
   - Use role-based permissions

## 🚀 Production Checklist

- [ ] MongoDB Atlas cluster set up
- [ ] Environment variables configured in Vercel
- [ ] Domain connected and SSL enabled
- [ ] Admin password changed
- [ ] Content backed up
- [ ] Analytics tracking set up
- [ ] Error monitoring configured

## 🆘 Troubleshooting

### Common Issues

1. **Payload not loading**:
   - Check MongoDB connection
   - Verify environment variables
   - Check console for errors

2. **Build failures**:
   - Check TypeScript errors
   - Verify all dependencies installed
   - Check Vercel build logs

3. **Content not updating**:
   - Clear browser cache
   - Check if changes were saved
   - Verify deployment completed

### Getting Help

- Check Payload documentation: https://payloadcms.com/docs
- Check Vercel documentation: https://vercel.com/docs
- Check MongoDB Atlas documentation: https://docs.atlas.mongodb.com

## 🎉 You're Ready!

Your AI SEO Helper site is now set up with:
- ✅ Payload CMS for content management
- ✅ Auto-deployment via Vercel
- ✅ MongoDB database
- ✅ Admin dashboard
- ✅ LLM optimization tools

Start managing your content at `/admin` and watch your changes go live automatically! 