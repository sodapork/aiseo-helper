# 🚀 Vercel Setup Guide for AI SEO Helper

This guide will walk you through setting up automatic deployment with Vercel for your AI SEO Helper website.

## 📋 Prerequisites

- ✅ Next.js project ready (you have this!)
- ✅ GitHub account
- ✅ Vercel account (free)

## 🎯 Step-by-Step Setup

### Step 1: Create GitHub Repository

1. **Go to [GitHub.com](https://github.com)** and sign in
2. **Click the "+" icon** in the top right → "New repository"
3. **Fill in the details**:
   - **Repository name**: `aiseo-helper`
   - **Description**: `AI SEO Helper - LLM optimization tools with Payload CMS`
   - **Visibility**: Public (or Private)
   - **Don't** initialize with README (we already have one)
4. **Click "Create repository"**

### Step 2: Connect Your Local Repository

After creating the GitHub repository, run these commands in your terminal:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote set-url origin https://github.com/YOUR_USERNAME/aiseo-helper.git

# Push your code to GitHub
git push -u origin main
```

### Step 3: Set Up Vercel

#### Option A: Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import Git Repository**:
   - Find and select your `aiseo-helper` repository
   - Vercel will automatically detect it's a Next.js project
5. **Configure Project**:
   - **Project Name**: `aiseo-helper` (or your preferred name)
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `.next` (should be auto-detected)
   - **Install Command**: `npm install` (should be auto-detected)

6. **Click "Deploy"**

#### Option B: Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow the prompts:
# - Set up and deploy? → Yes
# - Which scope? → Select your account
# - Link to existing project? → No
# - What's your project's name? → aiseo-helper
# - In which directory is your code located? → ./
# - Want to override the settings? → No
```

### Step 4: Configure Environment Variables

After your first deployment, you need to set up environment variables:

1. **Go to your Vercel dashboard**
2. **Select your project**
3. **Go to "Settings" → "Environment Variables"**
4. **Add these variables**:

```
PAYLOAD_SECRET=your-super-secret-production-key-here
MONGODB_URI=your-mongodb-atlas-connection-string
PAYLOAD_PUBLIC_SERVER_URL=https://aiseohelper.com
OPENAI_API_KEY=your-openai-api-key-here
```

**Important Notes**:
- **PAYLOAD_SECRET**: Generate a strong random string (32+ characters)
- **MONGODB_URI**: Use MongoDB Atlas connection string for production
- **PAYLOAD_PUBLIC_SERVER_URL**: Your production domain
- **OPENAI_API_KEY**: Your OpenAI API key for AI-powered tools (Content Optimizer and Keyword Analyzer)

### Step 5: Set Up MongoDB Atlas (Production Database)

1. **Go to [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Create a free account** or sign in
3. **Create a new cluster**:
   - Choose "FREE" tier
   - Select your preferred cloud provider and region
   - Click "Create"
4. **Set up database access**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `aiseo-helper-admin`
   - Password: Generate a strong password
   - Role: "Atlas admin"
   - Click "Add User"
5. **Set up network access**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Vercel)
   - Click "Confirm"
6. **Get your connection string**:
   - Go to "Database"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Add this to your Vercel environment variables as `MONGODB_URI`

### Step 6: Connect Your Domain

1. **In Vercel dashboard**, go to "Settings" → "Domains"
2. **Add your domain**: `aiseohelper.com`
3. **Update DNS settings**:
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add these DNS records as instructed by Vercel:
     - Type: `A` | Name: `@` | Value: `76.76.19.19`
     - Type: `CNAME` | Name: `www` | Value: `cname.vercel-dns.com`

### Step 7: Test Your Deployment

1. **Visit your deployed site**: `https://aiseohelper.com`
2. **Test the admin dashboard**: `https://aiseohelper.com/admin`
3. **Test your tools**: `https://aiseohelper.com/tools/keyword-analyzer`

## 🔄 Auto-Deployment Workflow

Once set up, your workflow becomes:

1. **Make changes locally**:
   ```bash
   npm run dev  # Test your changes
   ```

2. **Deploy with one command**:
   ```bash
   npm run deploy
   ```
   
   Or manually:
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin main
   ```

3. **Vercel automatically**:
   - Detects the push
   - Builds your site
   - Deploys to production
   - Your changes are live in 1-2 minutes!

## 🛠️ Troubleshooting

### Common Issues

**Build Fails**:
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors locally first

**Environment Variables Not Working**:
- Make sure they're set in Vercel dashboard
- Redeploy after adding new variables
- Check variable names match exactly

**Database Connection Issues**:
- Verify MongoDB Atlas connection string
- Check network access allows Vercel IPs
- Ensure database user has correct permissions

**Domain Not Working**:
- Check DNS settings
- Wait for DNS propagation (can take 24-48 hours)
- Verify domain is added in Vercel dashboard

### Getting Help

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

## 🎉 You're All Set!

Your AI SEO Helper site now has:
- ✅ Automatic deployment via Vercel
- ✅ Production database with MongoDB Atlas
- ✅ Custom domain support
- ✅ SSL certificate (automatic)
- ✅ Global CDN
- ✅ One-command deployment

**Next Steps**:
1. Test your live site
2. Set up your admin user: `npm run init-payload`
3. Start managing content at `/admin`
4. Make changes and watch them go live automatically!

## 📊 Monitoring Your Site

- **Vercel Dashboard**: Monitor deployments, performance, and errors
- **MongoDB Atlas**: Monitor database performance and usage
- **Analytics**: Add Google Analytics or Vercel Analytics for insights

Your site is now production-ready with automatic deployment! 🚀 