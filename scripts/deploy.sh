#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root."
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git not initialized. Run 'git init' first."
    exit 1
fi

# Check if remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Error: Git remote not set. Add your GitHub repository first."
    echo "Run: git remote add origin https://github.com/YOUR_USERNAME/aiseo-helper.git"
    exit 1
fi

# Clean install dependencies with legacy peer deps
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Add all changes
echo "📝 Adding changes to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy: $(date)"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Vercel will automatically deploy your changes."
    echo "📊 Check your Vercel dashboard for deployment status."
else
    echo "❌ Failed to push to GitHub. Please check your connection and try again."
    exit 1
fi

echo "✅ Deployment build completed successfully!" 