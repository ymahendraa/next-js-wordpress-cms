#!/bin/bash

# WordPress Docker Connection Test Script
# Run this script to test your WordPress Docker setup

echo "🐳 Testing WordPress Docker Setup..."
echo "========================================"

# Check if Docker is running
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed or not in PATH"
    echo "🔧 Install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "❌ Docker is not running"
    echo "🔧 Start Docker Desktop and try again"
    exit 1
fi

echo "✅ Docker is running"

# Check if WordPress container is running
if ! docker-compose ps | grep -q "wordpress.*Up"; then
    echo "❌ WordPress container is not running"
    echo "🔧 Run: docker-compose up -d"
    exit 1
fi

echo "✅ WordPress container is running"

# Read WordPress URL from .env.local
if [ -f .env.local ]; then
    export $(cat .env.local | grep WORDPRESS_API_URL | xargs)
    echo "📡 Testing URL: $WORDPRESS_API_URL"
else
    echo "❌ .env.local file not found!"
    exit 1
fi

# Wait a moment for WordPress to be ready
echo "⏳ Waiting for WordPress to be ready..."
sleep 3

# Test basic API endpoint
echo ""
echo "🔍 Testing WordPress installation..."
wp_response=$(curl -s -w "%{http_code}" -o /tmp/wp_home.html "http://localhost:8080")

if [ "$wp_response" -eq 200 ]; then
    echo "✅ WordPress is accessible at http://localhost:8080"
else
    echo "❌ WordPress not accessible (HTTP $wp_response)"
    echo "🔧 Check if WordPress installation is complete"
    exit 1
fi

# Test REST API endpoint
echo ""
echo "🔍 Testing REST API endpoint..."
response=$(curl -s -w "%{http_code}" -o /tmp/wp_test.json "$WORDPRESS_API_URL")

if [ "$response" -eq 200 ]; then
    echo "✅ WordPress REST API is accessible!"
else
    echo "❌ WordPress REST API failed (HTTP $response)"
    echo "🔧 Complete WordPress installation at http://localhost:8080"
    exit 1
fi

# Test posts endpoint
echo ""
echo "🔍 Testing posts endpoint..."
posts_response=$(curl -s -w "%{http_code}" -o /tmp/wp_posts.json "$WORDPRESS_API_URL/posts")

if [ "$posts_response" -eq 200 ]; then
    echo "✅ Posts endpoint is working!"
    
    # Count posts
    post_count=$(cat /tmp/wp_posts.json | grep -o '"id":' | wc -l)
    echo "📊 Found $post_count posts"
    
    if [ "$post_count" -eq 0 ]; then
        echo "⚠️  No posts found. Create some posts in WordPress admin!"
        echo "🔗 WordPress Admin: http://localhost:8080/wp-admin"
    fi
else
    echo "❌ Posts endpoint failed (HTTP $posts_response)"
fi

# Test posts with embed
echo ""
echo "🔍 Testing posts with featured images..."
embed_response=$(curl -s -w "%{http_code}" -o /tmp/wp_embed.json "$WORDPRESS_API_URL/posts?_embed&per_page=1")

if [ "$embed_response" -eq 200 ]; then
    echo "✅ Featured images endpoint is working!"
    
    # Check if featured media exists
    if grep -q "wp:featuredmedia" /tmp/wp_embed.json; then
        echo "🖼️  Featured images are available!"
    else
        echo "⚠️  No featured images found. Add featured images to your posts!"
    fi
else
    echo "❌ Featured images endpoint failed (HTTP $embed_response)"
fi

# Cleanup
rm -f /tmp/wp_test.json /tmp/wp_posts.json /tmp/wp_embed.json /tmp/wp_home.html

echo ""
echo "🎉 Test completed!"
echo ""
echo "� Next steps:"
echo "1. 🌐 WordPress Admin: http://localhost:8080/wp-admin"
echo "2. 📝 Create 5+ posts with featured images"
echo "3. ⚙️  Set permalinks to 'Post name'"
echo "4. 🚀 Run: npm run dev"
echo "5. 🌟 Visit: http://localhost:3000"