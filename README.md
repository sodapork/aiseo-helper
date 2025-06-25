# AI SEO Helper

A modern, responsive website showcasing AI-powered SEO optimization tools. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- 🎨 **Beautiful UI**: Responsive design with smooth animations and modern aesthetics
- 🔧 **Modular Architecture**: Easy to add new tools and features
- 📱 **Mobile-First**: Fully responsive across all devices
- ⚡ **Performance Optimized**: Fast loading with Next.js optimizations
- 🎯 **SEO Ready**: Built-in SEO optimizations and metadata

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
aiseo-helper/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Features.tsx       # Features showcase
│   ├── ToolsGrid.tsx      # Tools grid
│   └── Footer.tsx         # Footer
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

## Adding New Tools

To add a new tool to the website:

1. Open `components/ToolsGrid.tsx`
2. Add a new tool object to the `tools` array:

```typescript
{
  id: 'your-tool-id',
  name: 'Your Tool Name',
  description: 'Tool description',
  icon: YourIcon, // Import from lucide-react
  color: 'from-color-500 to-color-600',
  status: 'active',
  category: 'Category'
}
```

3. The tool will automatically appear in the tools grid with animations and styling.

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Styling
- Global styles: `app/globals.css`
- Component styles: Use Tailwind classes in component files
- Custom animations: Add to `app/globals.css`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
Build the project:
```bash
npm run build
```

The built files will be in the `.next` directory.

## SEO Optimization

The website includes:
- Meta tags and Open Graph data
- Structured data markup
- Optimized images and fonts
- Fast loading times
- Mobile-friendly design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@aiseohelper.com or create an issue in the repository. 