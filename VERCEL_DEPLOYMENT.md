# Deploy College Event Bridge to Vercel 🚀

This guide will walk you through deploying the College Event Bridge application to Vercel in just a few minutes.

## Prerequisites

Before you begin, make sure you have:
- ✅ A GitHub account
- ✅ A Vercel account (sign up free at [vercel.com](https://vercel.com))
- ✅ A Supabase project set up (see [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for setup)
- ✅ Your code pushed to a GitHub repository

## Quick Deployment Steps

### Step 1: Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Sign in to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Sign in with your **GitHub account**
4. Authorize Vercel to access your GitHub repositories

### Step 3: Import Your Project

1. On the Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find and select the **`event`** repository from the list
3. Click **"Import"**

### Step 4: Configure Your Project

Vercel will automatically detect that this is a Next.js project. You'll see a configuration screen:

#### Framework Preset
- ✅ Vercel will auto-detect **Next.js** - no changes needed

#### Build and Output Settings
- ✅ Build Command: `npm run build` (already set)
- ✅ Output Directory: `.next` (already set)
- ✅ Install Command: `npm install` (already set)

#### Root Directory
- ✅ Leave as `.` (root)

### Step 5: Add Environment Variables

This is the **most important step**! Add your Supabase credentials:

1. Scroll down to the **"Environment Variables"** section
2. Click **"Add"** for each variable below:

| Name | Value | Where to Find |
|------|-------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Supabase Dashboard → Settings → API → Project API keys → anon/public |
| `NEXT_PUBLIC_APP_NAME` | `College Event Bridge` | (Just type this) |

**Important:** 
- Click the dropdown and select **"All"** (Production, Preview, and Development) for each variable
- Make sure to copy the full anon key - it's very long!

### Step 6: Deploy!

1. Click the big **"Deploy"** button
2. Wait 2-3 minutes while Vercel:
   - Installs dependencies
   - Builds your application
   - Deploys to their global CDN

You'll see a live build log showing the progress. ☕

### Step 7: Configure Supabase Authentication URLs

Once deployed, you need to tell Supabase about your new domain:

1. Vercel will give you a URL like: `https://your-app.vercel.app`
2. Copy this URL
3. Go to your **Supabase Dashboard**
4. Navigate to **Authentication** → **URL Configuration**
5. Add your Vercel URL:
   - **Site URL:** `https://your-app.vercel.app`
   - **Redirect URLs:** Add `https://your-app.vercel.app/**`
6. Click **"Save"**

### Step 8: Test Your Deployment! 🎉

1. Click **"Visit"** on the Vercel success screen
2. Your app should now be live at `https://your-app.vercel.app`
3. Test the main features:
   - ✅ Homepage loads correctly
   - ✅ Can register a new account
   - ✅ Can log in
   - ✅ Can create an event
   - ✅ Can browse events
   - ✅ Can add comments

## Custom Domain (Optional)

Want to use your own domain like `events.yourschool.edu`?

1. In your Vercel project, go to **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain name
4. Follow Vercel's instructions to update your DNS settings
5. Wait for DNS propagation (usually 5-30 minutes)

Don't forget to update the Supabase redirect URLs with your custom domain!

## Automatic Deployments

🎊 **Good news!** Vercel automatically deploys your app whenever you push to GitHub:

- **Push to `main` branch** → Deploys to production (`your-app.vercel.app`)
- **Push to other branches** → Creates preview deployments for testing
- **Pull requests** → Get unique preview URLs for each PR

## Troubleshooting

### Build Fails: "Module not found"

**Solution:** Make sure all dependencies are in `package.json`:
```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### "Failed to connect to Supabase"

**Solution:** Check your environment variables:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
3. Make sure they're available for "Production" environment
4. Click **"Redeploy"** after fixing

### Login/Registration Not Working

**Solution:** Update Supabase redirect URLs:
1. Make sure your Vercel domain is added to Supabase → Authentication → URL Configuration
2. Include both Site URL and Redirect URLs
3. Wait a minute for changes to take effect

### "This page could not be found" (404)

**Solution:** 
1. Make sure you deployed the latest code
2. Check that the build completed successfully
3. Try redeploying: Vercel Dashboard → Deployments → ⋯ → Redeploy

### Environment Variables Not Working

**Solution:**
1. Environment variables need to be added BEFORE deployment or
2. After adding new variables, go to Deployments tab
3. Click ⋯ on latest deployment → "Redeploy"
4. Make sure variables are set for "Production" environment

## Monitoring Your Deployment

Vercel provides great monitoring tools:

- **Analytics**: See visitor stats (Vercel Dashboard → Analytics)
- **Logs**: Real-time logs (Vercel Dashboard → Logs)
- **Speed Insights**: Performance metrics
- **Error Tracking**: See production errors

## Updating Your Deployment

To update your live site, just push to GitHub:

```bash
git add .
git commit -m "Update feature X"
git push origin main
```

Vercel will automatically rebuild and deploy! 🚀

## Cost

Vercel's **Hobby (Free) plan** includes:
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ 100 GB bandwidth per month
- ✅ Serverless functions

Perfect for student projects and small college events apps!

## Need More Help?

- 📚 [Vercel Documentation](https://vercel.com/docs)
- 💬 [Vercel Community](https://github.com/vercel/vercel/discussions)
- 📧 [Supabase Documentation](https://supabase.com/docs)
- 🐛 [Open an issue](https://github.com/NITISH-027/event/issues) in this repository

## Security Checklist

Before going live, make sure:

- ✅ Environment variables are set correctly
- ✅ Supabase RLS policies are enabled (see DATABASE_SCHEMA.md)
- ✅ Email confirmation is enabled in Supabase (optional but recommended)
- ✅ Rate limiting is configured in Supabase
- ✅ Redirect URLs are properly configured

## Summary

That's it! You've successfully deployed College Event Bridge to Vercel. 🎉

**Quick recap:**
1. ✅ Pushed code to GitHub
2. ✅ Imported project to Vercel
3. ✅ Added environment variables
4. ✅ Deployed
5. ✅ Configured Supabase redirect URLs
6. ✅ Tested the live site

Your app is now accessible worldwide with automatic HTTPS, global CDN, and automatic deployments! 🌍

---

**Deployment Status:** 
- 🟢 Production: `https://your-app.vercel.app`
- 🟡 Preview: Auto-generated for each branch/PR
- 🔵 Development: `npm run dev` (local)
