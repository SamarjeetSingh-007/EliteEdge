# Supabase Setup Guide for EliteEdge

## Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub
4. Click "New project"
5. Name: "EliteEdge"
6. Database password: Create strong password
7. Region: Choose closest to you
8. Click "Create new project"

## Step 2: Create Projects Table
1. Go to Table Editor in Supabase dashboard
2. Click "Create a new table"
3. Table name: `projects`
4. Add columns:
   - `id` (int8, primary key, auto-increment)
   - `title` (text)
   - `description` (text)
   - `image` (text)
   - `project_link` (text)
   - `github_link` (text)
   - `technologies` (text[])
   - `category` (text)
   - `created_at` (timestamptz, default now())

## Step 3: Setup Row Level Security
1. Go to Authentication > Policies
2. Enable RLS on projects table
3. Create policy:
   - Policy name: "Public read access"
   - Command: SELECT
   - Target roles: public
   - Using expression: `true`

## Step 4: Get API Keys
1. Go to Settings > API
2. Copy:
   - Project URL
   - `anon` public key

## Step 5: Add Supabase to Project
Add to HTML head:

```html
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
```

## Step 6: Initialize Supabase
Create supabase-config.js:

```javascript
const supabaseUrl = 'your-project-url'
const supabaseKey = 'your-anon-key'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)
```
