# Database Schema and Security Policies

This document describes the database schema and Row-Level Security (RLS) policies for the College Event Bridge application.

## Database Schema

### 1. Profiles Table

Stores user metadata including unique identifiers and institutional information.

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  institution TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Events Table

Stores structured event information with a foreign key referencing the creator.

```sql
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
```

### 3. Comments Table

Enables user interaction and engagement on events.

```sql
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Row-Level Security (RLS) Policies

### Profiles Table Policies

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read all profiles
CREATE POLICY "Profiles are viewable by everyone" 
  ON profiles FOR SELECT 
  USING (true);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);
```

### Events Table Policies

```sql
-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view events
CREATE POLICY "Events are viewable by everyone" 
  ON events FOR SELECT 
  USING (true);

-- Allow authenticated users to create events
CREATE POLICY "Authenticated users can create events" 
  ON events FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

-- Allow users to update only their own events
CREATE POLICY "Users can update their own events" 
  ON events FOR UPDATE 
  USING (auth.uid() = created_by);

-- Allow users to delete only their own events
CREATE POLICY "Users can delete their own events" 
  ON events FOR DELETE 
  USING (auth.uid() = created_by);
```

### Comments Table Policies

```sql
-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view comments
CREATE POLICY "Comments are viewable by everyone" 
  ON comments FOR SELECT 
  USING (true);

-- Allow authenticated users to create comments
CREATE POLICY "Authenticated users can create comments" 
  ON comments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own comments
CREATE POLICY "Users can update their own comments" 
  ON comments FOR UPDATE 
  USING (auth.uid() = user_id);

-- Allow users to delete their own comments
CREATE POLICY "Users can delete their own comments" 
  ON comments FOR DELETE 
  USING (auth.uid() = user_id);
```

## Storage Buckets

### Event Images Bucket

```sql
-- Create storage bucket for event images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-images', 'event-images', true);

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

## Indexes

For optimal query performance:

```sql
-- Index on events for faster queries
CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_institution ON events(institution);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_event_date ON events(event_date);

-- Index on comments for faster queries
CREATE INDEX idx_comments_event_id ON comments(event_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
```

## Security Model

The security model implements:

1. **Authentication Layer**: Only authenticated users can create events and comments.
2. **Authorization Layer**: Database policies ensure `auth.uid() = created_by` for modifications.
3. **Storage Security**: Image uploads restricted to authenticated users, with public read access.
4. **Ownership Verification**: Users can only modify content they created.
