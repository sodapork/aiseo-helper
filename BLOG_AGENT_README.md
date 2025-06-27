# AI SEO Helper Blog Agent

An automated blog generation system that creates daily content about LLM optimization, AI SEO, and related topics. The agent generates high-quality blog posts with featured images from Unsplash and publishes them automatically.

## 🚀 Features

- **Automated Content Generation**: Creates blog posts about LLM optimization and AI SEO
- **Unsplash Integration**: Automatically fetches relevant featured images
- **Scheduled Publishing**: Posts daily at 9 AM
- **SEO Optimized**: Includes meta tags, keywords, and structured content
- **Category & Tag Management**: Automatically creates and assigns categories/tags
- **Reading Time Calculation**: Estimates reading time for each post

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Unsplash API key (optional, for featured images)

## 🛠️ Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <your-repo-url>
   cd AISEO-Helper
   ```

2. **Run the setup script**:
   ```bash
   ./scripts/setup-blog-agent.sh
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Initialize Payload CMS**:
   ```bash
   npm run init-payload
   ```

## 🔧 Configuration

The setup script will help you configure the following environment variables in your `.env` file:

```env
# Required
PAYLOAD_SECRET=your-secure-secret-here
MONGODB_URI=mongodb://localhost:27017/aiseo-helper
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional (for featured images)
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

### Getting an Unsplash API Key

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your Access Key
4. Add it to your `.env` file

## 🎯 Usage

### Generate a Single Blog Post

```bash
npm run blog:generate
```

This will create one blog post with a random topic from the predefined list.

### Start Scheduled Blog Generation

```bash
npm run blog:schedule
```

This will:
- Generate a blog post immediately
- Schedule daily blog generation at 9 AM
- Continue running until stopped

### Manual Blog Generation

You can also run the script directly:

```bash
# Generate single post
npx tsx scripts/blog-agent-simple.ts

# Start scheduling
npx tsx scripts/blog-agent-simple.ts --schedule
```

## 📝 Blog Topics

The agent generates content on the following topics:

1. **7 Essential LLM Optimization Strategies for Better AI Citations**
   - Understanding LLM Content Consumption
   - Structured Data and Schema Markup
   - Comprehensive Content Depth
   - Authoritative Source Building
   - Technical SEO for AI
   - Content Freshness and Updates
   - Measuring LLM Performance

2. **How to Structure Your Content for Maximum AI Visibility**
   - Clear Information Hierarchy
   - Headers and Subheaders
   - Structured Data Implementation
   - FAQ Sections
   - Featured Snippets
   - Mobile-First Design
   - AI Tool Testing

3. **The Complete Guide to GPTBot Crawling and AI Indexing**
   - GPTBot and AI Crawlers
   - robots.txt Configuration
   - Site Architecture
   - Page Load Speed
   - Mobile Optimization
   - Structured Data
   - Performance Monitoring

4. **Advanced LLM Optimization: Beyond Traditional SEO**
   - LLM vs Traditional Search
   - Content Depth
   - Authority Development
   - Cross-Referencing
   - Temporal Relevance
   - Multimodal Content
   - Future-Proofing

5. **Building Authority in the Age of AI: A Comprehensive Guide**
   - AI Authority Signals
   - Expert Credentials
   - Content Coverage
   - Regular Updates
   - Cross-Domain Authority
   - Social Proof
   - Long-term Strategy

## 🏗️ Architecture

### BlogAgent Class

The main class that handles:
- Topic selection and content generation
- Unsplash image fetching
- Payload CMS integration
- Category and tag management
- Scheduling

### Content Structure

Each blog post includes:
- **Title**: SEO-optimized headline
- **Excerpt**: Brief summary for listings
- **Content**: Structured HTML with headers and sections
- **Featured Image**: From Unsplash (if configured)
- **Categories**: Auto-assigned based on topic
- **Tags**: Relevant keywords and topics
- **SEO Meta**: Title, description, keywords
- **Reading Time**: Estimated based on content length

### Database Collections

- **blog**: Main blog posts
- **blog-categories**: Post categories
- **blog-tags**: Post tags
- **media**: Featured images

## 🔍 Monitoring

### Logs

The agent provides detailed logging:
- Blog generation status
- Image upload results
- Error messages
- Scheduling information

### Payload Admin

Access the admin panel to:
- View generated posts
- Edit content manually
- Manage categories and tags
- Monitor media uploads

```bash
npm run payload
```

Then visit: `http://localhost:3000/admin`

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your `MONGODB_URI` in `.env`
   - Ensure MongoDB is running
   - Verify network connectivity

2. **Payload Secret Missing**
   - Run the setup script again
   - Check `.env` file exists
   - Verify `PAYLOAD_SECRET` is set

3. **Unsplash Images Not Loading**
   - Verify `UNSPLASH_ACCESS_KEY` is set
   - Check API key permissions
   - Review rate limits

4. **Blog Posts Not Creating**
   - Check Payload CMS is initialized
   - Verify database collections exist
   - Review error logs

### Debug Mode

Enable verbose logging by setting:
```env
DEBUG=payload:*
```

## 🔄 Customization

### Adding New Topics

Edit `scripts/blog-agent-simple.ts` and add to the `getBlogTopics()` method:

```typescript
{
  title: "Your New Topic",
  excerpt: "Brief description",
  keywords: ["keyword1", "keyword2"],
  category: "Your Category",
  tags: ["tag1", "tag2"],
  contentOutline: [
    "Section 1",
    "Section 2",
    "Section 3"
  ]
}
```

### Modifying Content Structure

Update the `createContent()` method to change:
- HTML structure
- Content formatting
- Pro tip placement
- Introduction/conclusion text

### Changing Schedule

Modify the `scheduleDailyBlog()` method to:
- Change posting time
- Adjust frequency
- Add multiple posting times

## 📊 Performance

### Optimization Tips

1. **Image Optimization**: Use appropriate image sizes
2. **Database Indexing**: Ensure proper MongoDB indexes
3. **Caching**: Implement Redis for better performance
4. **CDN**: Use CDN for media files

### Scaling

For high-volume sites:
- Implement queue system (Redis/Bull)
- Add rate limiting
- Use multiple worker processes
- Implement content deduplication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the logs
3. Create an issue on GitHub
4. Contact the development team

---

**Happy Blogging! 🚀**

The AI SEO Helper Blog Agent will help you maintain a consistent, high-quality blog focused on LLM optimization and AI SEO topics. 