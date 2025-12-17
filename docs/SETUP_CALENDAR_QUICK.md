# Quick Google Calendar Setup for Schedule Assistant

## ⚡ Fast Setup (5 minutes)

### Step 1: Create Google Cloud Project
1. Go to: https://console.cloud.google.com
2. Click "Select a Project" → "New Project"
3. Name: `Schedule Assistant`
4. Click "Create"

### Step 2: Enable Calendar API
1. In the search bar, type: `Google Calendar API`
2. Click "Enable"

### Step 3: Create OAuth 2.0 Credentials
1. Go to "Credentials" (left sidebar)
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. **Important:** If prompted, click "Configure OAuth Consent Screen"
   - User Type: **External**
   - App name: `Schedule Assistant`
   - User support email: `gevorgbablumyan43@gmail.com`
   - Add scope: `https://www.googleapis.com/auth/calendar`
   - Back to Credentials

4. Choose "Web application"
5. Fill in:
   - **Name:** `Schedule Assistant`
   - **Authorized JavaScript origins:** `http://localhost:3000`
   - **Authorized redirect URIs:** `http://localhost:3000/auth/callback`
6. Click "Create"

### Step 4: Copy Your Credentials
1. You'll see Client ID and Client Secret
2. **Copy them and paste into the `.env` file below**

### Step 5: Update .env File

Open `/Users/user/Desktop/Lesson1/.env` and replace:

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
USER_EMAIL=gevorgbablumyan43@gmail.com
```

With your actual values from Step 4.

### Step 6: Run the Server

```bash
cd /Users/user/Desktop/Lesson1
node server.mjs
```

Then open: `http://localhost:3000`

### Step 7: Connect Your Calendar

1. Click the blue "🔐 Connect Calendar" button
2. Sign in with: `gevorgbablumyan43@gmail.com`
3. Click "Allow" to give calendar access
4. Done! ✅

---

## What You Can Do Now

- ✅ Chat with AI about your schedule
- ✅ Ask "What's on my calendar today?"
- ✅ AI will show your actual Google Calendar events
- ✅ Save AI suggestions directly to your calendar
- ✅ Daily routine creation and management

---

## Troubleshooting

**"Invalid client" error:**
- Double-check Client ID and Client Secret in `.env`
- Make sure you copied them exactly

**"Redirect URI mismatch":**
- In Google Cloud Console, verify `http://localhost:3000/auth/callback` is listed under OAuth 2.0 Client IDs

**"Calendar API not enabled":**
- Go back to Google Cloud Console
- Search for "Google Calendar API"
- Click "Enable"

**Still having issues?**
- Check that your `.env` file has the correct credentials
- Clear browser cookies and try again
- Make sure the server is running (`node server.mjs`)
