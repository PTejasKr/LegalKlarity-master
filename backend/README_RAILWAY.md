# LegalKlarity Backend - Railway Deployment

This document explains how to deploy the LegalKlarity backend to Railway.app.

## Prerequisites

1. A Railway.app account (you can use your friend's account if your free tier has expired)
2. A fork of the LegalKlarity repository on GitHub
3. Firebase service account credentials (for database and authentication)

## Deployment Steps

### 1. Fork the Repository
Have your friend fork the LegalKlarity repository to their GitHub account.

### 2. Add Firebase Service Account Key
Create a file named `serviceAccountKey.json` in the `backend/src/db/` directory with your Firebase service account credentials.

### 3. Create Railway Project
1. Log in to Railway.app with your friend's account
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose the forked LegalKlarity repository
5. Railway will automatically detect the `railway.json` configuration file

### 4. Configure Environment Variables
In the Railway dashboard, go to your project settings and add these environment variables:

```
# Required
FRONTEND_URL=https://legalklarity.netlify.app
PORT=8080

# AI Services (optional, can use mock mode)
GEMINI_API_KEY=your_gemini_api_key_here
USE_MOCK_API=true  # Set to false when you have real API keys

# For production, set USE_MOCK_API=false and provide a real GEMINI_API_KEY
```

### 5. Deploy
Railway will automatically build and deploy the application. The deployment URL will look like:
`https://your-project-name-production.up.railway.app`

### 6. Update Frontend Configuration
Once deployed, share the Railway URL with the repo owner who will update the Netlify environment variables:

```
VITE_API_BASE_URL=https://your-railway-url.up.railway.app
```

Then trigger a new deploy on Netlify.

## Development vs Production

The application automatically detects when it's running in a Railway environment and starts the standalone Express server instead of using Firebase Functions.

## Mock Mode

For development and testing without real API keys, the application can run in mock mode:
- Set `USE_MOCK_API=true`
- Leave AI API keys empty
- Firebase will run in mock mode if no service account is provided

This allows the application to function with simulated responses.