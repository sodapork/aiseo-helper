# AI SEO Helper

A modern, responsive website showcasing AI-powered SEO optimization tools. Built with Next.js, TypeScript, Tailwind CSS, and Payload CMS.

## Features

- 🚀 **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- 🎨 **Beautiful UI**: Responsive design with smooth animations and modern aesthetics
- 🔧 **Modular Architecture**: Easy to add new tools and features
- 📱 **Mobile-First**: Fully responsive across all devices
- ⚡ **Performance Optimized**: Fast loading with Next.js optimizations
- 🎯 **SEO Ready**: Built-in SEO optimizations and metadata
- 📝 **Content Management**: Payload CMS for easy content management
- 🔐 **Admin Panel**: Secure admin interface for managing content

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd aiseo-helper
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
# Payload CMS Configuration
PAYLOAD_SECRET=your-super-secret-key-change-this-in-production
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/aiseo-helper

# OpenAI API Configuration (Required for AI tools)
OPENAI_API_KEY=your-openai-api-key-here

# For production, use a proper MongoDB connection string like:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aiseo-helper?retryWrites=true&w=majority
```

**Note**: You'll need an OpenAI API key for the AI-powered tools (Content Optimizer and Keyword Analyzer) to work. Get one from [OpenAI Platform](https://platform.openai.com/).

4. Set up MongoDB:
   - **Local MongoDB**: Install MongoDB locally and start the service
   - **MongoDB Atlas**: Create a free cluster and get your connection string
   - **Docker**: Run `docker run -d -p 27017:27017 --name mongodb mongo:latest`

5. Initialize Payload CMS:
```bash
npm run init-payload
```
This will:
- Set up the database collections
- Add sample tools to the database

6. Run the development server:
```bash
npm run dev
# or
yarn dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Accessing the Backend

### Payload Admin Panel
- **URL**: `http://localhost:3000/admin`
- **Note**: You'll need to create an admin user through the Payload admin interface

### Available Collections
- **Tools**: Add, edit, and manage SEO tools
- **Pages**: Create and manage static pages
- **Media**: Upload and manage images and files

### API Endpoints
Payload automatically generates REST and GraphQL APIs:

- **REST API**: `http://localhost:3000/api/tools`, `http://localhost:3000/api/pages`, etc.
- **GraphQL**: `http://localhost:3000/api/graphql`
- **Admin API**: `http://localhost:3000/api/admin`

### Using the API in Your Frontend
```typescript
// Fetch tools from the API
const response = await fetch('/api/tools')
const tools = await response.json()

// Create a new tool
const newTool = await fetch('/api/tools', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'New Tool',
    description: 'Tool description',
    category: 'Analysis',
    status: 'active',
  }),
})
```

## Project Structure

```
aiseo-helper/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── tools/             # Tool pages
│       ├── content-optimizer/
│       └── keyword-analyzer/
├── collections/           # Payload CMS collections
│   ├── Tools.ts           # SEO tools
│   ├── Pages.ts           # Static pages
│   └── Media.ts           # Media uploads
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Features.tsx       # Features showcase
│   ├── ToolsGrid.tsx      # Tools grid
│   └── Footer.tsx         # Footer
├── public/                # Static assets
├── scripts/               # Setup scripts
├── payload.config.ts      # Payload CMS configuration
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

## Adding New Tools

### Through the Admin Panel
1. Go to `http://localhost:3000/admin`
2. Navigate to "Tools" collection
3. Click "Create New"
4. Fill in the tool details
5. Save and publish

### Programmatically
```typescript
import payload from 'payload'

const newTool = await payload.create({
  collection: 'tools',
  data: {
    name: 'Your Tool Name',
    description: 'Tool description',
    category: 'Analysis',
    status: 'active',
    icon: 'Search',
    color: 'from-blue-500 to-blue-600',
    features: [
      { feature: 'Feature 1' },
      { feature: 'Feature 2' },
    ],
  },
})
```

## Database Management

### Local Development
- Database: `mongodb://localhost:27017/aiseo-helper`
- Collections are automatically created when you run `npm run init-payload`

### Production
- Use MongoDB Atlas or another cloud MongoDB provider
- Update `MONGODB_URI` in your environment variables
- Ensure `PAYLOAD_SECRET` is a strong, unique secret

### Backup and Restore
```bash
# Backup
mongodump --db aiseo-helper --out ./backup

# Restore
mongorestore --db aiseo-helper ./backup/aiseo-helper
```

## Available Tools

### Content Optimizer
Optimize your content structure and clarity for better AI understanding. Get actionable suggestions to improve how AI systems discover, process, and recommend your content.

**Features:**
- Content structure analysis
- AI readability scoring
- Semantic optimization suggestions
- Context enhancement recommendations

### Keyword Analyzer
Analyze how AI systems understand and process your keywords. Get insights into semantic relevance, context strength, and LLM understanding to optimize for AI-powered discovery.

**Features:**
- AI relevance scoring
- Semantic analysis
- Context strength evaluation
- LLM understanding metrics

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 