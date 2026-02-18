# Vercel Deployment Checklist ✅

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment (Do Once)

### Supabase Setup
- [ ] Created Supabase project at https://supabase.com
- [ ] Noted down Project URL (Settings → API)
- [ ] Noted down Anon/Public Key (Settings → API)
- [ ] Created tables using SQL from DATABASE_SCHEMA.md
- [ ] Enabled Row Level Security (RLS) policies
- [ ] Created storage bucket named `event-images`
- [ ] Configured storage policies

### GitHub Setup
- [ ] Code is pushed to GitHub repository
- [ ] Repository is public or accessible to Vercel

### Vercel Account
- [ ] Created account at https://vercel.com
- [ ] Signed in with GitHub account
- [ ] Authorized Vercel to access your repositories

## Deployment Steps

### 1. Import Project
- [ ] Clicked "Add New..." → "Project" in Vercel dashboard
- [ ] Selected `event` repository from the list
- [ ] Clicked "Import"

### 2. Configure Environment Variables
Add these three variables:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase Project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase Anon Key  
- [ ] `NEXT_PUBLIC_APP_NAME` = College Event Bridge

For each variable:
- [ ] Selected "All" (Production, Preview, Development)
- [ ] Clicked "Add" to save

### 3. Deploy
- [ ] Clicked "Deploy" button
- [ ] Waited for build to complete (2-3 minutes)
- [ ] Verified deployment succeeded (green checkmark)
- [ ] Copied the deployment URL (e.g., `https://event-xyz.vercel.app`)

## Post-Deployment Configuration

### Update Supabase
- [ ] Opened Supabase Dashboard → Authentication → URL Configuration
- [ ] Added Vercel URL to **Site URL**: `https://your-app.vercel.app`
- [ ] Added to **Redirect URLs**: `https://your-app.vercel.app/**`
- [ ] Clicked "Save"

### Test Your Deployment
- [ ] Opened the Vercel URL in browser
- [ ] Homepage loads correctly
- [ ] Can navigate to /events page
- [ ] Can navigate to /auth/login page
- [ ] Can register a new account
- [ ] Can log in with new account
- [ ] Can create a new event
- [ ] Can view event details
- [ ] Can add comments to events
- [ ] Can view profile page
- [ ] Can log out

### Mobile Testing (Optional)
- [ ] Tested on mobile device or browser dev tools
- [ ] PWA manifest loads correctly
- [ ] Responsive design works on small screens
- [ ] Touch interactions work properly

## Troubleshooting

If something doesn't work:

### Build Failed
1. Check build logs in Vercel dashboard
2. Verify all dependencies are in package.json
3. Try building locally: `npm run build`

### Authentication Not Working
1. Verify environment variables are correct
2. Check Supabase redirect URLs include your Vercel domain
3. Look at browser console for errors
4. Verify Supabase project is active

### Database Errors
1. Confirm RLS policies are enabled
2. Check tables were created correctly
3. Verify storage bucket exists
4. Test database connection in Supabase dashboard

### Need to Redeploy?
1. Go to Vercel Dashboard → Your Project → Deployments
2. Find latest deployment
3. Click ⋯ menu → "Redeploy"

## Success! 🎉

Once all items are checked, your College Event Bridge app is:
- ✅ Live on the internet
- ✅ Automatically deployed on git push
- ✅ Secured with HTTPS
- ✅ Running on global CDN
- ✅ Ready for users!

## Next Steps

- [ ] Share the URL with your college community
- [ ] Add custom domain (optional)
- [ ] Monitor analytics in Vercel dashboard
- [ ] Set up email notifications for deployment status
- [ ] Consider upgrading Vercel plan if needed (free tier is usually enough)

## Resources

- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Detailed deployment guide
- [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) - Database setup instructions
- [DEPLOYMENT.md](DEPLOYMENT.md) - General deployment guide
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

**Deployment Date:** _________________

**Vercel URL:** _________________

**Supabase Project:** _________________

**Deployed By:** _________________
