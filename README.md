# LNK Blog - Headless WordPress Blog

A modern, headless blog application built with **WordPress** (Docker) as the content management system and **Next.js** as the frontend. This project demonstrates a complete headless CMS setup with a beautiful, responsive design featuring purple gradient theming.

## 🚀 Features

- **Headless Architecture**: WordPress backend + Next.js frontend
- **Docker Setup**: Easy WordPress deployment with Docker containers
- **Static Site Generation (SSG)**: Fast page loads with Incremental Static Regeneration (ISR)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **Image Optimization**: Next.js Image component with WordPress media support
- **Purple Gradient Theme**: Beautiful purple gradient design throughout the UI
- **Featured Images**: Support for WordPress featured images with fallback handling

## 📁 Project Structure

```
my-headless-blog/
├── docker-compose.yml              # WordPress + MySQL Docker setup
├── start-wordpress.sh              # WordPress startup script
├── test-wp-connection.sh           # WordPress API connection test
├── WORDPRESS_SETUP.md              # WordPress setup documentation
├── package.json                    # Node.js dependencies and scripts
├── package-lock.json               # Locked dependency versions
├── next.config.ts                  # Next.js configuration for images
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── eslint.config.mjs               # ESLint configuration
├── postcss.config.mjs              # PostCSS configuration
├── .env.local                      # Environment variables (Docker URLs)
├── .gitignore                      # Git ignore file
├── app/
│   ├── page.tsx                    # Home Page (3 recent articles + hero)
│   ├── layout.tsx                  # Root Layout with Header/Footer
│   ├── globals.css                 # Global CSS styles with Tailwind
│   ├── favicon.ico                 # Site favicon
│   ├── articles/
│   │   ├── page.tsx                # Article List Page (grid layout)
│   │   └── [slug]/
│   │       └── page.tsx            # Article Detail Page (dynamic routing)
│   ├── components/
│   │   ├── Header.tsx              # Navigation Header with gradient links
│   │   ├── Footer.tsx              # Footer Component
│   │   ├── ArticleCard.tsx         # Reusable Article Card with images
│   │   └── BackButton.tsx          # Back navigation button component
│   └── lib/
│       └── wordpress.ts            # WordPress API Helper Functions
└── public/                         # Static Assets
    ├── placeholder-image.svg       # Placeholder image for posts without featured images
    ├── next.svg                    # Next.js logo
    ├── vercel.svg                  # Vercel logo
    ├── file.svg                    # File icon
    ├── globe.svg                   # Globe icon
    └── window.svg                  # Window icon
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 16.0.0 (App Router)
- **Backend**: WordPress (Docker)
- **Database**: MySQL (Docker)
- **Styling**: Tailwind CSS 4.0 with custom typography
- **Language**: TypeScript 5.0+
- **Rendering**: SSG with ISR (60s revalidation)
- **Images**: Next.js Image optimization with WordPress media

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher)

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd my-headless-blog
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start WordPress with Docker

Start the WordPress and MySQL containers using the provided script:

```bash
# Make the script executable and start WordPress
chmod +x start-wordpress.sh
./start-wordpress.sh

# Or manually with docker-compose:
# docker-compose up -d
```

**Wait for WordPress to be ready** (usually takes 1-2 minutes). You can check if it's ready by visiting:

- WordPress Site: http://localhost:8080
- WordPress Admin: http://localhost:8080/wp-admin

### Step 4: WordPress Initial Setup

1. **Access WordPress Admin**: Go to http://localhost:8080/wp-admin
2. **Complete Installation**: Follow the WordPress setup wizard
3. **Create Admin Account**: Set up your admin username and password
4. **Install Required Plugins** (Optional but recommended):
   - Go to Plugins → Add New
   - Search for "Application Passwords" and install if not already available

### Step 5: Configure WordPress for Headless Use

1. **Enable REST API**: WordPress REST API is enabled by default
2. **Test API Connection**: Use the provided test script:

   ```bash
   chmod +x test-wp-connection.sh
   ./test-wp-connection.sh

   # Or test manually:
   # curl http://localhost:8080/wp-json/wp/v2/posts
   ```

3. **Create Sample Content**:
   - Create a few blog posts with content and images
   - **Important**: Set featured images for your posts (in post editor sidebar)
   - Publish the posts to make them available via API

### Step 6: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# WordPress API Configuration
WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080
```

### Step 7: Start the Next.js Development Server

```bash
npm run dev
```

The application will be available at:

- **Frontend**: http://localhost:3000
- **WordPress Admin**: http://localhost:8080/wp-admin

## 🎨 Setting Featured Images

To ensure your blog posts display properly with images:

1. **Edit a Post** in WordPress admin
2. **Set Featured Image**:
   - Look for "Featured Image" in the right sidebar
   - Click "Set featured image"
   - Upload or select an image from media library
   - Update the post
3. **Verify**: Check your Next.js frontend to see the image displayed

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Start WordPress containers
./start-wordpress.sh
# Or: docker-compose up -d

# Stop WordPress containers
docker-compose down

# Test WordPress API connection
./test-wp-connection.sh
# Or: curl http://localhost:8080/wp-json/wp/v2/posts
```

## 📝 Content Management

### Adding New Posts

1. Go to WordPress admin at http://localhost:8080/wp-admin
2. Navigate to Posts → Add New
3. Create your content
4. **Set a featured image** (important for thumbnails)
5. Publish the post
6. The post will automatically appear on your Next.js frontend

### Managing Images

- Upload images through WordPress Media Library
- Set featured images for proper thumbnail display
- Images are automatically optimized by Next.js

## 🎯 Key Features Explained

### Homepage

- **Hero Section**: Purple gradient text on white background
- **Recent Posts**: Displays 3 most recent published posts
- **Responsive Grid**: Adapts to different screen sizes

### Articles Page

- **Grid Layout**: Clean grid of all published articles
- **Pagination**: Handles large numbers of posts
- **Featured Images**: Displays post thumbnails

### Article Detail Page

- **Full Content**: Complete post content with proper typography
- **SEO Metadata**: Automatic meta tags generation
- **Back Navigation**: Easy navigation back to articles list
- **Enhanced Typography**: Custom CSS for better readability

## 🚨 Troubleshooting

### WordPress Not Starting

```bash
# Check Docker containers
docker-compose ps

# View logs
docker-compose logs wordpress
docker-compose logs db

# Restart containers
docker-compose restart
```

### No Posts Showing

- Ensure posts are published (not draft)
- Check WordPress API: http://localhost:8080/wp-json/wp/v2/posts
- Verify WordPress is running on port 8080

### Images Not Loading

- Check if featured images are set in WordPress
- Verify image domains in `next.config.ts`
- Ensure WordPress uploads directory is accessible

### API Connection Issues

```bash
# Test WordPress API
curl http://localhost:8080/wp-json/wp/v2/posts

# Check if WordPress is running
curl http://localhost:8080
```

## 🔄 Data Flow

1. **Content Creation**: Content is created in WordPress admin
2. **API Exposure**: WordPress exposes content via REST API
3. **Static Generation**: Next.js fetches data at build time and on revalidation
4. **ISR**: Pages are regenerated every 60 seconds for fresh content
5. **Frontend Display**: Users see fast, static pages with up-to-date content

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Tailwind CSS](https://tailwindcss.com)
- [Docker Compose](https://docs.docker.com/compose/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
