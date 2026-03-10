# 360ace Food Consulting v2 - Next.js Website

This is a modern, production-ready Next.js website for 360ace Food Consulting with comprehensive food safety consulting services. Built with a **JSON-based content management system** for easy updates and maintenance.

## Features

✨ **Modern Tech Stack**
- Next.js 16 with App Router
- TypeScript for type safety
- Tailwind CSS v4 for styling
- React Server Components

🎨 **Smooth Animations**
- GSAP for scroll-triggered animations
- Lenis for buttery smooth scrolling
- Custom cursor on desktop
- Leaf-based molecule network (desktop)

🔒 **Security & SEO**
- Comprehensive security headers
- SEO optimized with metadata
- Open Graph and Twitter cards
- Structured data ready

⚡ **Performance**
- Optimized images with Next.js Image
- Static site generation
- Code splitting
- Fast page loads

📝 **JSON-based CMS**
- Easy content updates without touching code
- 5 full articles with detailed content
- Structured content blocks
- Category-based organization

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
360ace-Food-v2/
├── app/
│   ├── insights/
│   │   ├── [slug]/        # Dynamic article pages
│   │   │   └── page.tsx   # Individual article template
│   │   └── page.tsx       # Insights listing page
│   ├── layout.tsx         # Root layout with SEO and fonts
│   ├── page.tsx           # Home page with all sections
│   ├── not-found.tsx      # Custom 404 page
│   └── globals.css        # Global styles and design tokens
├── components/
│   ├── CustomCursor.tsx   # Custom cursor component
│   ├── Footer.tsx         # Footer component
│   ├── HeroMolecule.tsx   # Leaf + molecule network (desktop)
│   ├── Loader.tsx         # Page loader
│   ├── Navigation.tsx     # Main navigation
│   └── SmoothScroll.tsx   # Lenis smooth scroll wrapper
├── data/                  # JSON-based content files
│   ├── articles.json      # Blog articles/insights content
│   ├── services.json      # Services data
│   └── site-content.json  # General site content (hero, stats, CTA)
├── public/
│   ├── images/            # Image assets
│   └── favicon.png        # Favicon
├── app/robots.ts          # Robots.txt via Next metadata route
├── app/sitemap.ts         # Sitemap.xml via Next metadata route
├── app/manifest.ts        # PWA manifest
└── next.config.ts         # Next.js configuration with security headers
```

## Key Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **GSAP** - Professional-grade animations
- **Lenis** - Smooth scrolling library
- **Lucide React** - Beautiful icon library
- **JSON-based CMS** - Easy content management without database

## Design Tokens

The site uses a custom design system with the following tokens:

- **Primary Brand**: #059669 (emerald)
- **Accent**: #f97316 (ember)
- **Dark**: #020617
- **Neutral**: #64748b
- **Font Display**: Manrope
- **Font Body**: Inter

## Sections

1. **Hero** - Eye-catching hero with canvas animation
2. **Impact Stats** - Key metrics and capabilities
3. **Services** - 9 comprehensive service offerings
4. **Process** - 5-step engagement model
5. **Experts** - Team credentials and collaborations
6. **Insights** - Articles and thought leadership
   - 5 full articles with detailed content:
     - Engineering safer food systems through proactive compliance
     - Designing food safety training that sticks
     - How AI is Transforming Food Safety Monitoring in 2025
     - Navigating the New Wave of Sustainable Packaging Regulations
     - Advanced Allergen Management: Beyond Label Warnings
   - Category filtering (Compliance, Training, Technology, Regulatory, Food Safety)
   - Related articles suggestions
   - Individual article pages with references
   - Fully animated cards and transitions
7. **Contact** - Call-to-action for consultation

## Content Management

The site uses a **JSON-based content management system** for easy updates without touching code.

### Updating Articles

Edit `/data/articles.json` to add, modify, or remove articles. Each article includes:

```json
{
  "id": "unique-id",
  "title": "Article Title",
  "slug": "url-slug",
  "excerpt": "Short description",
  "date": "2024-01-01",
  "readTime": "8 min read",
  "author": "Author Name",
  "category": "Category",
  "image": "/images/image.jpg",
  "content": [
    {
      "type": "paragraph",
      "text": "Article content..."
    },
    {
      "type": "heading",
      "text": "Section Heading"
    },
    {
      "type": "list",
      "items": ["Item 1", "Item 2"]
    }
  ],
  "references": ["Reference 1", "Reference 2"]
}
```

Content block types:
- `paragraph` - Regular text paragraphs
- `heading` - Main section headings (H2)
- `subheading` - Subsection headings (H3)
- `list` - Bulleted lists

### Updating Services

Edit `/data/services.json` to modify service offerings. Each service includes:

```json
{
  "id": "service-id",
  "title": "Service Title",
  "description": "Service description",
  "icon": "lucide-icon-name",
  "iconColor": "emerald|orange|slate",
  "features": ["Feature 1", "Feature 2"],
  "link": {
    "text": "Link text",
    "url": "/url"
  }
}
```

### Updating Site Content

Edit `/data/site-content.json` for:
- Hero section text and CTAs
- Impact stats and metrics
- Contact section content

## Security Features

- X-DNS-Prefetch-Control
- Strict-Transport-Security (HSTS)
- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME-sniffing protection)
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy
 - Content-Security-Policy (CSP)

## SEO Features

- Comprehensive metadata
- Open Graph tags for social sharing
- Twitter Card support
- Semantic HTML
- Accessible components
- Image optimization

## Customization

### Colors
Edit the design tokens in `app/globals.css`:
```css
:root {
  --brand-primary: #059669;
  --brand-accent: #f97316;
  /* ... */
}
```

### Content
Update content in the `/data` directory:
- `site.ts` - Site-wide config (title, url, OG image, etc.)
- `articles.json` - Blog posts and insights
- `services.json` - Service offerings

### Images
Replace images in `public/images/` directory. Make sure to update image paths in JSON files accordingly.

## Routes

- `/` - Home page
- `/insights` - Articles listing page
- `/insights/[slug]` - Individual article pages
- `/not-found` - Custom 404 page

## Development

The site is built with:
- **Latest Next.js 16** with App Router
- **TypeScript** for type safety
- **JSON files** for content (no database required)
- **Dynamic routing** for article pages
- **Optimized builds** with static generation where possible

## Comparison with HTML Version

The Next.js v2 version adds:
- Type safety with TypeScript
- Better SEO with metadata API
- Image optimization
- Security headers
- Production build optimization
- JSON-based content management
- Dynamic article routing
- Better developer experience
- Structured content blocks for articles

## License

© 2025 360ace.Food Consulting. All rights reserved.

## Support

For questions or support, please contact the 360ace Food Consulting team.
