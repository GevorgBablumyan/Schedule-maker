# 🗓️ Google Calendar Integration - Quick Start

## The Vision
Your chatbot will read your Google Calendar and tell you:
- "Today you have: Team Meeting at 10am, Lunch with Sarah at 2pm, Project Review at 4:30pm"
- Auto-suggest tasks based on free time
- Help you organize your day

---

## Step-by-Step Setup (10 minutes)

### **Step 1: Create Google Cloud Project**

1. Go to https://console.cloud.google.com
2. Click "Select a Project" → "New Project"
3. Name: `Gemini Chatbot`
4. Click "Create" and wait

### **Step 2: Enable Google Calendar API**

1. Search for "Google Calendar API" in the search box
2. Click the result
3. Click "Enable"

### **Step 3: Create OAuth Credentials**

1. Go to "Credentials" (left sidebar)
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. If prompted: Click "Configure Consent Screen" first
   - User type: "External"
   - Fill in app name: "Gemini Chatbot"
   - Add email: gevorgbablumyan43@gmail.com
   - Click "Save and Continue" (skip optional fields)
   - Click "Save and Continue" again

4. Now create OAuth Client:
   - Application type: "Web application"
   - Name: "Gemini Chatbot"
   - **Authorized JavaScript origins:**
     ```
     http://localhost:3000
     ```
   - **Authorized redirect URIs:**
     ```
     http://localhost:3000/auth/callback
     ```
   - Click "Create"

5. **Copy your credentials:**
   - Client ID: (you'll see a popup)
   - Client Secret: (same popup)
   - Download as JSON (click download icon)

### **Step 4: Add Credentials to Your App**

Open `/Users/user/Desktop/Lesson1/.env` and fill in:

```env
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
USER_EMAIL=gevorgbablumyan43@gmail.com
```

Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with the values from Step 3.

### **Step 5: Restart Server**

```bash
pkill -f "node server.mjs"
cd /Users/user/Desktop/Lesson1
node server.mjs
```

### **Step 6: Test in Browser**

1. Open http://localhost:3000
2. Click **"🔐 Calendar"** button
3. Login with gevorgbablumyan43@gmail.com
4. Click "Allow" to grant calendar access
5. You should see "✅ Calendar Connected"

### **Step 7: Use It!**

Try asking:
- "What do I have today?"
- "Show my calendar"
- "What's on my schedule?"

The bot will respond:
```
📅 Your Calendar for Today

✓ 10:00 AM - Team Meeting
✓ 2:00 PM - Lunch with Sarah
✓ 4:30 PM - Project Review

Stay focused today! 💪
```

---

##  Troubleshooting

**"Invalid Client" Error:**
- Check .env file has correct credentials
- Make sure you're using Client ID and Secret (not API key)

**"Google didn't recognize this request":**
- Make sure you added http://localhost:3000/auth/callback in Google Cloud Console

**Calendar not showing events:**
- Make sure you clicked "Allow" on the Google permission screen
- Check that you have events on your calendar for today

**Server won't start:**
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill any process on that port
pkill -f "node server"

# Start fresh
node server.mjs
```

---

## How It Works (Technical)

```
You click "🔐 Calendar"
    ↓
Redirects to Google OAuth login
    ↓
You login & grant permission
    ↓
Returns to app with access token
    ↓
App fetches your calendar events
    ↓
Bot shows: "Today you have: [events]"
```

---

## Files Created

- `.env` - Your Google credentials (KEEP PRIVATE!)
- `SETUP_GOOGLE_CALENDAR.md` - Full detailed guide
- Updated `server.mjs` - Handles OAuth & calendar
- Updated `index.html` - Has "🔐 Calendar" button

---

**Once you complete these steps, your chatbot will be fully integrated with your Google Calendar!** 🎉

Questions? Check `SETUP_GOOGLE_CALENDAR.md` for detailed explanations.
