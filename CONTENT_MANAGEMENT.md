# Content Management Guide

This site now uses a static content approach instead of Payload CMS. Here's how to manage your content:

## 📁 Content Structure

```
data/
├── tools.json          # Tool data
└── blog-posts.json     # Blog post data
```

## 🛠️ Managing Tools

To add or edit tools, modify `data/tools.json`:

```json
{
  "id": "your-tool-id",
  "name": "Your Tool Name",
  "description": "Tool description",
  "icon": "Search", // Lucide React icon name
  "color": "from-blue-500 to-blue-600", // Tailwind gradient
  "status": "in beta", // in beta, in development, complete
  "category": "Analysis", // Analysis, Content, Monitoring, etc.
  "link": "/tools/your-tool", // Optional: link to tool page
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "seo": {
    "title": "SEO Title",
    "description": "SEO Description",
    "keywords": "keyword1, keyword2"
  }
}
```

## 📝 Managing Blog Posts

To add or edit blog posts, modify `data/blog-posts.json`:

```json
{
  "id": "unique-id",
  "title": "Your Blog Post Title",
  "excerpt": "Brief description of the post",
  "slug": "your-blog-post-slug",
  "author": "Author Name",
  "authorBio": "Author bio",
  "publishedAt": "2024-01-15",
  "readingTime": 5,
  "status": "published", // published or draft
  "featuredImage": {
    "url": "https://images.unsplash.com/...",
    "alt": "Image description"
  },
  "categories": [
    {
      "id": "1",
      "name": "Category Name",
      "slug": "category-slug",
      "color": "blue"
    }
  ],
  "tags": [
    {
      "id": "1",
      "name": "Tag Name",
      "slug": "tag-slug"
    }
  ],
  "content": "# Your Markdown Content\n\nWrite your content in markdown format...",
  "seo": {
    "title": "SEO Title",
    "description": "SEO Description",
    "keywords": "keyword1, keyword2"
  }
}
```

## 📝 Writing Blog Content

Blog posts use markdown format. Supported features:

- **Headers**: `# H1`, `## H2`, `### H3`
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Links**: `[text](url)`
- **Lists**: `- item` or `* item`
- **Pro Tips**: `**Pro Tip**` (automatically styled)

## 🚀 Deployment

1. **Local Development**:
   ```bash
   npm run dev
   ```

2. **Build for Production**:
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**:
   - Push changes to GitHub
   - Vercel automatically deploys

## 🔄 Workflow

1. **Edit Content**: Modify JSON files in `data/`
2. **Test Locally**: Run `npm run dev`
3. **Commit Changes**: `git add . && git commit -m "Update content"`
4. **Deploy**: Push to GitHub (Vercel auto-deploys)

## 📊 Benefits of Static Approach

- ✅ **Faster**: No database queries
- ✅ **Cheaper**: No database costs
- ✅ **Simpler**: No CMS setup required
- ✅ **Reliable**: No database downtime
- ✅ **SEO-friendly**: Static generation
- ✅ **Version Control**: Content in Git

## 🎯 Adding New Content Types

To add new content types (e.g., case studies, testimonials):

1. Create new JSON file in `data/`
2. Add interface in `lib/data.ts`
3. Create utility functions
4. Update components to use new data

## 📞 Support

For questions about content management, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev/icons/) 