# Google Calendar Integration Setup

## Step 1: Create Google Cloud Project & OAuth Credentials

### A. Create Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a Project" → "New Project"
3. Name it: `Gemini Chatbot`
4. Click "Create"

### B. Enable APIs
1. Search for "Google Calendar API"
2. Click "Enable"
3. Search for "Google+ API" 
4. Click "Enable"

### C. Create OAuth 2.0 Credentials
1. Go to "Credentials" in left sidebar
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Fill in:
   - **Name:** `Gemini Chatbot`
   - **Authorized JavaScript origins:** `http://localhost:3000`
   - **Authorized redirect URIs:** `http://localhost:3000/auth/callback`
5. Click "Create"
6. Copy your `Client ID` and `Client Secret`

### D. Download Credentials
1. Click the download icon (arrow)
2. Save as `google-credentials.json` in your `/Users/user/Desktop/Lesson1/` folder

## Step 2: Create Environment File

Create `.env` file in `/Users/user/Desktop/Lesson1/`:

```
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
USER_EMAIL=gevorgbablumyan43@gmail.com
```

## Step 3: Install Dependencies

```bash
cd /Users/user/Desktop/Lesson1
npm install googleapis google-auth-library dotenv
```

## Step 4: Start Server

```bash
node server.mjs
```

Then open: `http://localhost:3000`

Click "🔐 Connect Calendar" button to authorize.

---

## How It Works

1. **User clicks "🔐 Connect Calendar"**
   ↓
2. **Redirects to Google OAuth login**
   ↓
3. **You approve access to calendar**
   ↓
4. **Returns to app with access token**
   ↓
5. **App fetches your calendar events**
   ↓
6. **Bot shows: "Today you have: [events]"**

---

## Troubleshooting

**"Invalid client" error:**
- Check Client ID matches in .env file
- Verify localhost:3000 is authorized

**"Unauthorized" error:**
- Make sure you clicked "Allow" on Google OAuth screen
- Clear browser cookies and try again

**"Calendar API disabled":**
- Go back to Google Cloud Console
- Make sure APIs are enabled

---

## What The Bot Will Say

After connecting, when you ask "what's on my calendar today?":

**Bot Response:**
```
📅 Your Calendar for Today (Dec 15)

✓ 10:00 AM - Team Meeting (30 min)
✓ 2:00 PM - Lunch with Sarah (1 hour)
✓ 4:30 PM - Project Review (1 hour)

Don't forget to stay hydrated! 💧
```

---

Ready? Follow the steps above and I'll update the code!
