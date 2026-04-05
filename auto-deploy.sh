#!/bin/bash
set -e

echo "🚀 ATC Dashboard - Automatic Deployment Script"
echo "=============================================="
echo ""

# Check prerequisites
if ! command -v git &> /dev/null; then
    echo "❌ Git not installed. Install from: https://git-scm.com"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed. Install from: https://nodejs.org"
    exit 1
fi

echo "✅ Git and Node.js found"
echo ""

# Step 1: GitHub
echo "📝 STEP 1: GitHub Setup"
echo "Go to https://github.com/new and create a repository named 'atc-dashboard'"
echo "Copy the HTTPS URL (looks like: https://github.com/YOUR_USERNAME/atc-dashboard.git)"
echo ""
read -p "Paste your GitHub repository URL here: " GITHUB_URL

# Validate URL
if [[ ! "$GITHUB_URL" =~ ^https://github.com/.*\.git$ ]]; then
    echo "❌ Invalid GitHub URL"
    exit 1
fi

echo "✅ GitHub URL accepted: $GITHUB_URL"
echo ""

# Step 2: Push to GitHub
echo "📤 STEP 2: Pushing code to GitHub..."
git remote add origin "$GITHUB_URL" 2>/dev/null || git remote set-url origin "$GITHUB_URL"
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub!"
else
    echo "❌ Failed to push. Make sure you're logged into GitHub."
    exit 1
fi

echo ""
echo "🎉 SUCCESS! Your code is on GitHub!"
echo ""
echo "Next step: Deploy to Vercel"
echo "================================"
echo ""
echo "1. Go to https://vercel.com"
echo "2. Sign in with GitHub"
echo "3. Click 'Add New Project'"
echo "4. Select 'atc-dashboard' from your repositories"
echo "5. Click 'Deploy'"
echo ""
echo "Your dashboard will be live in 2-3 minutes!"
echo ""
echo "Once deployed, you'll get a URL like:"
echo "   https://atc-dashboard.vercel.app"
echo ""

