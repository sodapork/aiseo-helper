#!/bin/bash

echo "🚀 Setting up AI SEO Helper Blog Agent"
echo "======================================"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env 2>/dev/null || touch .env
fi

# Check for Unsplash API key
if ! grep -q "UNSPLASH_ACCESS_KEY" .env; then
    echo ""
    echo "🔑 Unsplash API Key Setup"
    echo "========================="
    echo "To get featured images for your blog posts, you'll need an Unsplash API key:"
    echo "1. Go to https://unsplash.com/developers"
    echo "2. Create a new application"
    echo "3. Copy your Access Key"
    echo ""
    read -p "Enter your Unsplash Access Key (or press Enter to skip): " unsplash_key
    
    if [ ! -z "$unsplash_key" ]; then
        echo "UNSPLASH_ACCESS_KEY=$unsplash_key" >> .env
        echo "✅ Unsplash API key added to .env"
    else
        echo "⚠️  Skipping Unsplash setup. Blog posts will be created without featured images."
    fi
fi

# Check for Payload secret
if ! grep -q "PAYLOAD_SECRET" .env; then
    echo ""
    echo "🔐 Payload Secret Setup"
    echo "======================="
    echo "You need a secure secret for Payload CMS:"
    payload_secret=$(openssl rand -base64 32)
    echo "PAYLOAD_SECRET=$payload_secret" >> .env
    echo "✅ Generated and added Payload secret to .env"
fi

# Check for MongoDB URI
if ! grep -q "MONGODB_URI" .env; then
    echo ""
    echo "🗄️  MongoDB Setup"
    echo "================"
    echo "You need a MongoDB connection string:"
    echo "1. Use MongoDB Atlas (recommended): https://www.mongodb.com/atlas"
    echo "2. Or use a local MongoDB instance"
    echo ""
    read -p "Enter your MongoDB URI (or press Enter for local): " mongo_uri
    
    if [ -z "$mongo_uri" ]; then
        mongo_uri="mongodb://localhost:27017/aiseo-helper"
    fi
    
    echo "MONGODB_URI=$mongo_uri" >> .env
    echo "✅ MongoDB URI added to .env"
fi

# Check for server URL
if ! grep -q "NEXT_PUBLIC_SERVER_URL" .env; then
    echo ""
    echo "🌐 Server URL Setup"
    echo "==================="
    read -p "Enter your server URL (or press Enter for localhost): " server_url
    
    if [ -z "$server_url" ]; then
        server_url="http://localhost:3000"
    fi
    
    echo "NEXT_PUBLIC_SERVER_URL=$server_url" >> .env
    echo "✅ Server URL added to .env"
fi

echo ""
echo "✅ Blog Agent Setup Complete!"
echo "============================"
echo ""
echo "📋 Next Steps:"
echo "1. Install dependencies: npm install"
echo "2. Initialize Payload: npm run init-payload"
echo "3. Start the development server: npm run dev"
echo "4. Generate a test blog post: npm run blog:generate"
echo "5. Start scheduled blog generation: npm run blog:schedule"
echo ""
echo "📚 Available Commands:"
echo "• npm run blog:generate - Generate a single blog post"
echo "• npm run blog:schedule - Start daily blog generation at 9 AM"
echo "• npm run dev - Start development server"
echo "• npm run payload - Access Payload admin panel"
echo ""
echo "🎯 Blog Topics Covered:"
echo "• LLM Optimization Strategies"
echo "• AI Content Visibility"
echo "• GPTBot Crawling & Indexing"
echo "• Advanced SEO Techniques"
echo "• Authority Building for AI"
echo ""
echo "Happy blogging! 🚀" 