# MongoDB Atlas Setup Guide for EliteEdge

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Sign up for free
3. Create new cluster (free M0)
4. Choose cloud provider and region
5. Create cluster

## Step 2: Setup Database Access
1. Database Access > Add New Database User
2. Authentication Method: Password
3. Username: `eliteedge-admin`
4. Password: Generate secure password
5. Database User Privileges: Read and write to any database

## Step 3: Setup Network Access
1. Network Access > Add IP Address
2. Add Current IP Address
3. For production: Add 0.0.0.0/0 (allow from anywhere)

## Step 4: Get Connection String
1. Clusters > Connect
2. Choose "Connect your application"
3. Copy connection string
4. Replace <password> with your password

## Step 5: Deploy with Netlify/Vercel
Since GitHub Pages can't run server code, you'll need:
- Netlify Functions or Vercel Functions
- API endpoints for CRUD operations

This is more complex and requires serverless functions.
