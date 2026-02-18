# 🚀 Quick Deploy to Vercel

**Deploy College Event Bridge to Vercel in 5 minutes!**

## Before You Start

You need:
1. ✅ A Supabase project ([create one free](https://supabase.com))
2. ✅ Your Supabase credentials (URL and Anon Key)
3. ✅ This code on GitHub

## Deploy Now

### Option 1: One-Click Deploy (Easiest!)

Click this button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NITISH-027/event&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_APP_NAME&envDescription=Supabase%20credentials%20required&envLink=https://github.com/NITISH-027/event/blob/main/VERCEL_DEPLOYMENT.md)

Then:
1. Sign in with GitHub
2. Add these 3 environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
   - `NEXT_PUBLIC_APP_NAME` - `College Event Bridge`
3. Click Deploy
4. Wait 2-3 minutes ☕
5. Done! 🎉

### Option 2: Manual Import

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select this repository
5. Add environment variables (see above)
6. Click Deploy

## After Deployment

**Important:** Update Supabase redirect URLs

1. Copy your new Vercel URL (e.g., `https://your-app.vercel.app`)
2. Go to Supabase Dashboard → Authentication → URL Configuration
3. Add your URL:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`
4. Save

## Test It!

Visit your Vercel URL and test:
- ✅ Can view homepage
- ✅ Can register/login
- ✅ Can create events
- ✅ Can browse events

## Need Help?

- 📚 [Full Deployment Guide](VERCEL_DEPLOYMENT.md)
- ✅ [Deployment Checklist](VERCEL_CHECKLIST.md)
- 🗄️ [Database Setup](DATABASE_SCHEMA.md)

## Environment Variables

Where to find them:

**NEXT_PUBLIC_SUPABASE_URL:**
- Supabase Dashboard → Settings → API → Project URL

**NEXT_PUBLIC_SUPABASE_ANON_KEY:**
- Supabase Dashboard → Settings → API → Project API keys → anon/public

**NEXT_PUBLIC_APP_NAME:**
- Just type: `College Event Bridge`

## Troubleshooting

**Build failed?**
- Check that environment variables are correct
- Try redeploying

**Login not working?**
- Make sure you updated Supabase redirect URLs
- Wait 1 minute for changes to take effect

**Database errors?**
- Verify tables are created (see DATABASE_SCHEMA.md)
- Check RLS policies are enabled

---

**That's it!** Your College Event Bridge is now live on Vercel! 🌐✨
