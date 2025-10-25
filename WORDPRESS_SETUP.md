# WordPress Docker Setup Guide

## 🐳 Quick Docker WordPress Setup

### 1. **Start WordPress with Docker**

```bash
# In the my-headless-blog directory
docker-compose up -d

# WordPress will be available at: http://localhost:8080
# MySQL database will run on port 3306 (internal)
```

### 2. **Complete WordPress Installation**

1. **Open WordPress in browser**:

   ```
   http://localhost:8080
   ```

2. **Follow the WordPress 5-minute installation**:
   - Choose language
   - Set site title: "My Headless Blog"
   - Create admin username and password
   - Set admin email
   - Complete installation

### 3. **Configure WordPress for Headless CMS**

#### **Set Permalinks**:

```
WordPress Admin → Settings → Permalinks
Select: "Post name" structure
Save Changes
```

#### **Create Sample Content**:

```
WordPress Admin → Posts → Add New

Create 5+ posts with:
- Compelling titles
- Rich content (paragraphs, headings, lists)
- Featured images (required!)
- Categories/tags (optional)
```

### 4. **Test REST API**

```bash
# Test if WordPress REST API is working
curl http://localhost:8080/wp-json/wp/v2/posts

# Test with featured images
curl http://localhost:8080/wp-json/wp/v2/posts?_embed
```

## 🔧 **Docker Management Commands**

```bash
# Start WordPress
docker-compose up -d

# Stop WordPress
docker-compose down

# View logs
docker-compose logs -f wordpress

# Restart WordPress
docker-compose restart

# Remove everything (including data)
docker-compose down -v
```

## 📁 **WordPress Data Persistence**

Your WordPress data is stored in Docker volumes:

- `wordpress_data`: WordPress files and uploads
- `db_data`: MySQL database

Data persists between container restarts unless you use `docker-compose down -v`.

## ⚙️ **Optional Plugins for Headless WordPress**

### Install via WordPress Admin:

1. **Advanced Custom Fields (ACF)** - Custom fields support
2. **Yoast SEO** - SEO optimization
3. **Classic Editor** - If you prefer classic editor

### Plugin Installation:

```
WordPress Admin → Plugins → Add New → Search → Install → Activate
```

## 🔗 **Connect to Next.js**

Your environment variables are already configured for Docker:

```env
WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚨 **Troubleshooting**

### **Port Conflicts**

If port 8080 is busy, edit `docker-compose.yml`:

```yaml
ports:
  - "8081:80" # Use port 8081 instead
```

### **Database Connection Issues**

```bash
# Check if containers are running
docker-compose ps

# Restart database
docker-compose restart db
```

### **WordPress Not Loading**

```bash
# Check logs
docker-compose logs wordpress

# Rebuild containers
docker-compose down
docker-compose up -d --build
```

## 🎯 **Quick Start Checklist**

1. ✅ Run `docker-compose up -d`
2. ✅ Visit `http://localhost:8080`
3. ✅ Complete WordPress installation
4. ✅ Set permalinks to "Post name"
5. ✅ Create 5+ posts with featured images
6. ✅ Test API: `curl http://localhost:8080/wp-json/wp/v2/posts`
7. ✅ Run `npm run dev` in Next.js project
8. ✅ Visit `http://localhost:3000`

That's it! Your headless WordPress + Next.js blog is ready! 🚀
