# How to View the College Event Bridge Site

This guide will help you quickly view and run the College Event Bridge application on your local machine.

## Quick Start (View the Site Immediately)

Follow these simple steps to view the site:

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages. It takes about 1-2 minutes.

### Step 2: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
▲ Next.js 16.1.6
- Local:        http://localhost:3000
- ready in 2.3s
```

### Step 3: Open Your Browser

Open your web browser and go to:
```
http://localhost:3000
```

🎉 **That's it!** You should now see the College Event Bridge homepage.

## What You Can View Without Setup

**Without any additional configuration, you can view:**
- ✅ Homepage with feature descriptions
- ✅ Events listing page (will show "no events" message)
- ✅ Login/Registration pages (UI only)
- ✅ All page layouts and designs
- ✅ Mobile responsive views
- ✅ Navigation and routing

**What requires Supabase setup:**
- ❌ Creating an account
- ❌ Logging in
- ❌ Creating events
- ❌ Posting comments
- ❌ Image uploads

## Full Functionality Setup (Optional)

If you want to test the full functionality with authentication and database features, follow these additional steps:

### 1. Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

### 2. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project dashboard under Settings > API.

### 3. Set Up the Database

Follow the instructions in `DATABASE_SCHEMA.md` to create the necessary tables. You can:

1. Go to your Supabase project
2. Open the SQL Editor
3. Copy and paste the SQL commands from `DATABASE_SCHEMA.md`
4. Run them

### 4. Restart the Development Server

Stop the current server (Ctrl+C) and start it again:
```bash
npm run dev
```

Now all features will work! 🚀

## Viewing Different Pages

Once the server is running, you can navigate to:

- **Homepage**: http://localhost:3000
- **Events List**: http://localhost:3000/events
- **Login**: http://localhost:3000/auth/login
- **Register**: http://localhost:3000/auth/register
- **Create Event**: http://localhost:3000/events/create (requires login)

## Viewing on Mobile

To test the mobile-responsive design:

1. Open the site in your browser
2. Press F12 to open Developer Tools
3. Click the device/mobile icon (or press Ctrl+Shift+M)
4. Select a mobile device from the dropdown (e.g., iPhone SE, iPhone 12, etc.)

## Troubleshooting

### Issue: "npm: command not found"
**Solution**: You need to install Node.js first.
- Download from [https://nodejs.org](https://nodejs.org)
- Install Node.js (version 20 or higher)
- Restart your terminal

### Issue: "Port 3000 is already in use"
**Solution**: Either:
- Stop the other application using port 3000, OR
- Run on a different port:
```bash
npm run dev -- -p 3001
```
Then open http://localhost:3001

### Issue: "Cannot find module 'next'"
**Solution**: Make sure you ran `npm install` first:
```bash
npm install
```

### Issue: Pages show errors or won't load
**Solution**: 
1. Make sure the development server is running
2. Check the terminal for any error messages
3. Try restarting the server (Ctrl+C, then `npm run dev` again)

### Issue: "Failed to fetch" errors in browser console
**Solution**: This is expected if you haven't set up Supabase yet. The site will still display correctly, but database features won't work.

## Building for Production

If you want to create a production build:

```bash
npm run build
npm start
```

The production site will be available at http://localhost:3000

## Additional Resources

- **Full Setup Guide**: See `README.md`
- **Database Setup**: See `DATABASE_SCHEMA.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Validation Report**: See `VALIDATION_REPORT.md`

## Need Help?

If you're still having trouble viewing the site:

1. Check that you have Node.js 20+ installed: `node --version`
2. Make sure you're in the project directory: `cd event`
3. Verify dependencies are installed: check if `node_modules` folder exists
4. Look for error messages in the terminal
5. Open an issue on GitHub with the error message

---

**Quick Summary:**
```bash
# Clone and navigate to project (if not already there)
git clone https://github.com/NITISH-027/event.git
cd event

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

That's all you need to view the site! 🎉
