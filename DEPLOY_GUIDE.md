# Deploy to Vercel - Step by Step

## Option 1: Vercel CLI (Easiest)

### 1. Install Vercel CLI
npm i -g vercel

### 2. Deploy from your project directory
cd /path/to/project
vercel

### 3. Follow the prompts
- Link to an existing Vercel project or create a new one
- Confirm the settings
- Vercel will deploy automatically

Your site will be live in seconds!

---

## Option 2: GitHub + Vercel Dashboard (Recommended)

### 1. Push to GitHub
git init
git add .
git commit -m "Initial commit: ATC Dashboard"
git remote add origin https://github.com/YOUR_USERNAME/atc-dashboard.git
git branch -M main
git push -u origin main

### 2. Import into Vercel
1. Go to vercel.com
2. Sign up or log in
3. Click "New Project"
4. Select your GitHub repository
5. Vercel auto-detects Next.js settings
6. Click "Deploy"

Your dashboard is live!

---

## What You Get with Vercel

✅ Automatic deployments on every git push
✅ Free HTTPS & CDN
✅ Serverless functions (if needed)
✅ Environment variables management
✅ Analytics & monitoring
✅ Git integration
✅ Custom domains
