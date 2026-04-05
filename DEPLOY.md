# Deploy to Vercel - Quick Guide

## 🚀 Fastest Way (5 minutes)

### Step 1: Prepare Your Code
```bash
# In your project directory
npm install
```

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "ATC Dashboard"
git remote add origin https://github.com/YOUR_USERNAME/atc-dashboard.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repo
4. Click **"Deploy"**
5. ✅ **Done!** Your app is live

---

## Alternative: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# In your project directory, run:
vercel

# Follow the prompts and your app deploys instantly
```

---

## Alternative: Drag & Drop

1. Run `npm run build` in your project directory
2. Go to [vercel.com/new](https://vercel.com/new)
3. Drag your entire project folder into the upload area
4. Click "Deploy"

---

## After Deployment

✅ Your dashboard will be live at:
```
https://atc-dashboard-RANDOM.vercel.app
```

### Custom Domain (Optional)
1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., atc-ops.com)
3. Follow DNS setup instructions

---

## Troubleshooting

**"Cannot find module 'next'"**
→ Run `npm install` before deploying

**"Port already in use"**
→ Change port: `npm run dev -- -p 3001`

**"Build fails"**
→ Check `npm run build` works locally first

---

## Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Support: [vercel.com/support](https://vercel.com/support)
