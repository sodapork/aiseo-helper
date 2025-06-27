#!/bin/bash

echo "🚀 Setting up AI SEO Helper with Payload CMS..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cat > .env.local << EOF
# Payload CMS Configuration
PAYLOAD_SECRET=your-super-secret-key-change-this-in-production
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/aiseo-helper

# For production, use a proper MongoDB connection string like:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aiseo-helper?retryWrites=true&w=majority
EOF
    echo "✅ Created .env.local file"
else
    echo "ℹ️  .env.local already exists"
fi

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is not running. Please start MongoDB first."
        echo "   You can use:"
        echo "   - Local: brew services start mongodb-community (macOS)"
        echo "   - Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest"
        echo "   - Or use MongoDB Atlas cloud database"
    fi
else
    echo "⚠️  MongoDB client not found. Please ensure MongoDB is installed and running."
fi

echo "🎯 Initializing Payload CMS..."
npm run init-payload

echo "✅ Setup complete!"
echo ""
echo "🎉 Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Open http://localhost:3000 to view your site"
echo "3. Open http://localhost:3000/admin to access the admin panel"
echo "   - Email: admin@aiseohelper.com"
echo "   - Password: admin123"
echo ""
echo "📚 For more information, see the README.md file" 