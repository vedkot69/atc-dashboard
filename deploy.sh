#!/bin/bash

echo "🚀 ATC Dashboard Deployment Script"
echo "=================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if git is configured
if [ -z "$(git config user.email)" ]; then
    echo "⚙️  Configuring git..."
    git config --global user.email "claude@caratsense.in"
    git config --global user.name "ATC Dashboard"
fi

# Install dependencies
echo ""
echo "📥 Installing dependencies..."
npm install

# Build the project locally to verify it works
echo ""
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo ""
echo "🌐 Deploying to Vercel..."
echo "Note: This will open your browser to authenticate"
echo ""
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your dashboard is now live! Check the URL above."
