# Deployment Guide

This guide provides step-by-step instructions for deploying the College Event Bridge application.

## Prerequisites

- Node.js 20 or higher
- npm or yarn
- A Supabase account (free tier available at https://supabase.com)
- Git

## Step 1: Clone and Install

```bash
git clone https://github.com/NITISH-027/event.git
cd event
npm install
```

## Step 2: Set Up Supabase

### 2.1 Create a Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in project details:
   - Name: `college-event-bridge`
   - Database Password: (create a strong password)
   - Region: (choose closest to your users)
4. Wait for project setup to complete (1-2 minutes)

### 2.2 Get API Credentials

1. In your Supabase project dashboard, go to Settings > API
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (under Project API keys)

### 2.3 Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and replace with your actual values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_APP_NAME=College Event Bridge
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 3: Set Up Database

### 3.1 Create Tables

In your Supabase project, go to SQL Editor and run the following SQL:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  institution TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  institution TEXT NOT NULL,
  created_by UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3.2 Enable Row Level Security

Run this SQL to enable and configure RLS:

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Events are viewable by everyone" 
  ON events FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create events" 
  ON events FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own events" 
  ON events FOR UPDATE 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own events" 
  ON events FOR DELETE 
  USING (auth.uid() = created_by);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" 
  ON comments FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" 
  ON comments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
  ON comments FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
  ON comments FOR DELETE 
  USING (auth.uid() = user_id);
```

### 3.3 Create Indexes

Run this SQL to create performance indexes:

```sql
CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_institution ON events(institution);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_event_date ON events(event_date);
CREATE INDEX idx_comments_event_id ON comments(event_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
```

## Step 4: Set Up Storage

### 4.1 Create Storage Bucket

1. In Supabase dashboard, go to Storage
2. Click "New bucket"
3. Name it `event-images`
4. Set it as **Public** bucket
5. Click "Create bucket"

### 4.2 Configure Storage Policies

In SQL Editor, run:

```sql
-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload event images" 
  ON storage.objects FOR INSERT 
  WITH CHECK (
    bucket_id = 'event-images' 
    AND auth.role() = 'authenticated'
  );

-- Allow public read access to event images
CREATE POLICY "Event images are publicly accessible" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'event-images');

-- Allow users to update their own images
CREATE POLICY "Users can update their own event images" 
  ON storage.objects FOR UPDATE 
  USING (
    bucket_id = 'event-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own images
CREATE POLICY "Users can delete their own event images" 
  ON storage.objects FOR DELETE 
  USING (
    bucket_id = 'event-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Step 5: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your application!

## Step 6: Deploy to Production

### Option A: Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com and sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure environment variables:
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Add `NEXT_PUBLIC_APP_URL` (your Vercel domain)
6. Click "Deploy"

### Option B: Deploy to Other Platforms

Build the production bundle:

```bash
npm run build
npm start
```

The application will run on port 3000. Configure your hosting platform to:
- Run `npm run build` during build phase
- Run `npm start` to serve the application
- Set environment variables from Step 2.3

## Step 7: Configure Authentication Settings

In Supabase dashboard:

1. Go to Authentication > URL Configuration
2. Add your production URL to:
   - Site URL: `https://your-domain.com`
   - Redirect URLs: `https://your-domain.com/**`

## Step 8: Test Your Deployment

1. Visit your deployed application
2. Create a new account
3. Verify email (if email confirmation is enabled)
4. Create a test event
5. Browse events
6. Add comments to events

## Progressive Web App (PWA) Installation

Your users can install the app on their devices:

### On Mobile (iOS/Android):
1. Visit the website in a browser
2. Look for "Add to Home Screen" option
3. Follow the prompts

### On Desktop:
1. Visit the website in Chrome/Edge
2. Look for the install icon in the address bar
3. Click "Install"

## Android APK Generation (Optional)

To create an Android APK for demonstration:

1. Use a tool like Capacitor or PWA Builder:
   ```bash
   npm install -g @capacitor/cli
   npx cap init "College Event Bridge" "com.college.eventbridge"
   npx cap add android
   npm run build
   npx cap sync
   npx cap open android
   ```

2. In Android Studio, build the APK:
   - Build > Build Bundle(s) / APK(s) > Build APK(s)

## Troubleshooting

### Issue: "Invalid Supabase URL"
- Verify `.env.local` has correct values
- Restart the development server after changing environment variables

### Issue: "Row Level Security policy violation"
- Verify all RLS policies are created
- Check that user is authenticated when creating/editing content

### Issue: Images not uploading
- Verify storage bucket `event-images` is created and public
- Check storage policies are properly configured

### Issue: Build fails
- Run `npm install` again
- Check Node.js version (should be 20+)
- Clear `.next` folder: `rm -rf .next`

## Support

For issues and questions:
- Open an issue on GitHub
- Check the README.md for additional documentation
- Review DATABASE_SCHEMA.md for database details

## Security Checklist

Before going to production:

- [ ] Enable email confirmation in Supabase Auth settings
- [ ] Set up rate limiting for API endpoints
- [ ] Review and test all RLS policies
- [ ] Enable HTTPS on your domain
- [ ] Set up monitoring and logging
- [ ] Configure CORS properly
- [ ] Review storage bucket permissions
- [ ] Set up regular database backups
- [ ] Implement proper error tracking
- [ ] Add analytics (optional)
