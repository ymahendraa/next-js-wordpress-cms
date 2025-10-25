#!/bin/bash

# WordPress Docker Quick Start Script
echo "🐳 WordPress Docker Quick Start"
echo "==============================="

# Check if Docker is running
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed"
    echo "🔧 Install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "❌ Docker is not running"
    echo "🔧 Start Docker Desktop and try again"
    exit 1
fi

echo "✅ Docker is running"

# Start WordPress
echo ""
echo "🚀 Starting WordPress with Docker..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to start..."
sleep 10

# Check if containers are running
if docker-compose ps | grep -q "wordpress.*Up" && docker-compose ps | grep -q "db.*Up"; then
    echo "✅ WordPress and database are running!"
else
    echo "❌ Failed to start services"
    echo "🔧 Check Docker logs: docker-compose logs"
    exit 1
fi

echo ""
echo "🎉 WordPress is ready!"
echo ""
echo "📋 Next steps:"
echo "1. 🌐 Open WordPress: http://localhost:8080"
echo "2. 🔧 Complete WordPress installation"
echo "3. 📝 Create posts with featured images"
echo "4. ⚙️  Set permalinks to 'Post name' in Settings"
echo "5. 🧪 Test connection: ./test-wp-connection.sh"
echo "6. 🚀 Start Next.js: npm run dev"
echo ""
echo "🛑 To stop WordPress: docker-compose down"