# MS Utsho Portfolio Website

A premium, modern, and highly interactive personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Sanity CMS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **Headless CMS**: Sanity CMS for content management
- **Premium Animations**: Framer Motion and GSAP for smooth interactions
- **UI Components**: Shadcn/UI for accessible, reusable components
- **SEO Optimized**: Dynamic metadata, Open Graph, sitemap, robots.txt
- **Contact Form**: Functional contact form with Resend email integration
- **Responsive Design**: Mobile-first, works perfectly on all devices
- **Type Safety**: Full TypeScript support with Sanity types
- **Performance**: Optimized for Lighthouse scores 95+

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [Environment Variables](#environment-variables)
- [Sanity CMS Setup](#sanity-cms-setup)
- [Development](#development)
- [Deployment](#deployment)
- [Content Management](#content-management)
- [Performance Optimization](#performance-optimization)
- [Accessibility](#accessibility)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS
- **Framer Motion** - React animations
- **GSAP** - Complex animations
- **Shadcn/UI** - UI components
- **Lucide Icons** - Icon system

### CMS
- **Sanity CMS** - Headless content management
- **next-sanity** - Next.js integration

### Backend
- **Next.js API Routes** - Server-side functionality
- **Resend** - Email service

### Deployment
- **Vercel** - Hosting platform
- **Sanity Hosting** - CMS hosting

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── contact/       # Contact form API
│   │   ├── projects/          # Project detail pages
│   │   │   └── [slug]/       # Dynamic routes
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   ├── sitemap.ts        # Dynamic sitemap
│   │   └── globals.css       # Global styles
│   ├── components/            # React components
│   │   ├── sections/         # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/               # Shadcn/UI components
│   │   └── layouts/          # Layout components
│   ├── sanity/               # Sanity CMS configuration
│   │   ├── client.ts         # Sanity client
│   │   ├── config.ts         # Sanity config
│   │   ├── schemas/          # Content schemas
│   │   └── types/            # TypeScript types
│   ├── lib/                  # Utility libraries
│   ├── utils/                # Helper functions
│   ├── types/                # TypeScript types
│   ├── constants/            # Constants
│   ├── hooks/                # Custom React hooks
│   ├── context/              # React context providers
│   └── styles/               # Additional styles
├── public/                   # Static assets
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── components.json         # Shadcn/UI configuration
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🔧 Installation Guide

### Prerequisites

- **Node.js** v20 or higher
- **npm** v10 or higher
- **Git** v2 or higher
- **VS Code** (recommended)

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd portfolio-website
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Copy the `.env.example` file and create a `.env.local` file:

```bash
cp .env.example .env.local
```

Update the environment variables with your actual values:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_email@example.com

# Contact Form Configuration
CONTACT_EMAIL=msutsho55@gmail.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Portfolio
```

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Environment Variables

### Sanity CMS Variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Dataset name (default: production)
- `NEXT_PUBLIC_SANITY_API_VERSION` - API version (default: 2024-01-01)

### Email Service Variables

- `RESEND_API_KEY` - Your Resend API key
- `RESEND_FROM_EMAIL` - Sender email address
- `CONTACT_EMAIL` - Recipient email for contact form

### Site Configuration

- `NEXT_PUBLIC_SITE_URL` - Your site URL (localhost:3000 for dev)
- `NEXT_PUBLIC_SITE_NAME` - Site name for metadata

## 📝 Sanity CMS Setup

### Step 1: Create a Sanity Project

1. Go to [Sanity.io](https://www.sanity.io)
2. Create a new project
3. Copy your Project ID

### Step 2: Configure Schemas

The schemas are already defined in `src/sanity/schemas/`:

- `hero.ts` - Hero section content
- `about.ts` - About section content
- `skill.ts` - Skills and expertise
- `experience.ts` - Work experience, education, certifications
- `project.ts` - Portfolio projects
- `service.ts` - Services offered
- `testimonial.ts` - Client testimonials
- `blog.ts` - Blog posts
- `socialLink.ts` - Social media links
- `contactInfo.ts` - Contact information

### Step 3: Deploy Sanity Studio

```bash
npm install -g @sanity/cli
sanity login
sanity deploy
```

### Step 4: Add Content

Access your Sanity Studio at `https://<your-project-id>.sanity.studio` and add content.

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Code Quality

The project uses:
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Prettier** - Code formatting (recommended)

### Adding New Components

1. Create component in `src/components/`
2. Follow the existing naming convention
3. Use TypeScript for type safety
4. Add proper exports

### Adding New Sanity Schemas

1. Create schema file in `src/sanity/schemas/`
2. Export the schema
3. Add to `src/sanity/schemas/index.ts`
4. Update TypeScript types in `src/sanity/types/index.ts`

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure environment variables
5. Deploy

### Environment Variables for Production

Add these in Vercel project settings:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_production_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
RESEND_API_KEY=your_production_resend_key
RESEND_FROM_EMAIL=your_domain_email
CONTACT_EMAIL=msutsho55@gmail.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Portfolio
```

### Deploy Sanity Studio

```bash
sanity deploy
```

## 📚 Content Management

### Adding Projects

1. Go to Sanity Studio
2. Navigate to "Projects"
3. Click "New Project"
4. Fill in:
   - Title
   - Description
   - Category
   - Technologies
   - Images
   - GitHub link
   - Live demo URL
   - Case study details
5. Publish

### Adding Skills

1. Go to Sanity Studio
2. Navigate to "Skills"
3. Click "New Skill"
4. Fill in:
   - Skill name
   - Category
   - Proficiency level (0-100)
   - Display order
5. Publish

### Managing Contact Info

1. Go to Sanity Studio
2. Navigate to "Contact Information"
3. Update your contact details
4. Publish changes

## ⚡ Performance Optimization

### Image Optimization

- Next.js Image component for automatic optimization
- Sanity CDN for image delivery
- Lazy loading for below-fold images

### Code Splitting

- Dynamic imports for heavy components
- Route-based code splitting
- Server components by default

### Font Optimization

- `next/font` for automatic font optimization
- Geist font family (Vercel's font)
- Subset loading for performance

### Bundle Size

- Tree shaking enabled
- Production builds optimized
- Unused code eliminated

## ♿ Accessibility

### Features Implemented

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus states for interactive elements
- Proper color contrast ratios
- Screen reader support
- Alt text for images

### Testing Accessibility

Use tools like:
- Lighthouse Accessibility Audit
- axe DevTools
- WAVE Evaluation Tool

## 🔒 Security

### Implemented Features

- Environment variables for sensitive data
- Server-side validation
- Input sanitization
- Email validation
- Rate limiting (basic)
- Spam protection
- HTTPS enforced in production

### Best Practices

- Never commit `.env.local` files
- Use strong API keys
- Regular dependency updates
- Security headers configured

## 🐛 Troubleshooting

### Common Issues

**Issue: Sanity content not loading**

Solution:
- Check environment variables
- Verify Sanity project ID
- Ensure dataset exists
- Check API version

**Issue: Contact form not sending emails**

Solution:
- Verify Resend API key
- Check sender email is verified
- Ensure recipient email is correct
- Check API rate limits

**Issue: Build errors**

Solution:
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors
- Verify all imports

**Issue: Images not displaying**

Solution:
- Check Sanity CDN configuration
- Verify image asset references
- Check image URLs in browser console

## 📞 Support

For issues or questions:
- Email: msutsho55@gmail.com
- Phone: 01756680320
- WhatsApp: 01756680320
- Facebook: https://www.facebook.com/msutsho/
- LinkedIn: https://www.linkedin.com/in/ms-utsho/

## 📄 License

This project is proprietary and confidential.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Sanity for the excellent CMS
- Vercel for hosting
- Shadcn/UI for beautiful components
- Framer Motion for smooth animations

---

**Built with ❤️ by MS Utsho**
