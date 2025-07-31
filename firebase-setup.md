# Firebase Setup Guide for EliteEdge

## Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Create a project"
3. Name it "EliteEdge" 
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Setup Firestore Database
1. In Firebase console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for now)
4. Select your region
5. Click "Done"

## Step 3: Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click "Web app" icon (</>)
4. Register app name: "EliteEdge"
5. Copy the config object (you'll need this)

## Step 4: Add Firebase to Your Project
Add this to your HTML head section:

```html
<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
```

## Step 5: Initialize Firebase
Create firebase-config.js with your config:

```javascript
// Replace with your actual config from Firebase console
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
```

## Step 6: Security Rules
In Firestore, update rules for public read, admin write:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```
