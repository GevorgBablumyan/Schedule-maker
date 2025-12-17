# 📸 Visual Step-by-Step Guide

## What You Need to Do:

### Step 1: Get Google Credentials
1. Go to: https://console.cloud.google.com
2. Create Project → Name: "Schedule Assistant"
3. Enable APIs:
   - Google Calendar API
   - Google+ API
4. Create OAuth 2.0 Credentials:
   - Type: Web application
   - Redirect URI: http://localhost:3000/auth/callback
5. COPY: Client ID and Client Secret

### Step 2: Update .env File
Open: `/Users/user/Desktop/Lesson1/.env`

Change from:
```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

To:
```
GOOGLE_CLIENT_ID=<YOUR_ACTUAL_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_ACTUAL_CLIENT_SECRET>
```

Save the file.

### Step 3: Restart Server
```
node server.mjs
```

### Step 4: Connect Calendar
- Go to http://localhost:3000
- Click "🔐 Connect Calendar"
- Sign in with: gevorgbablumyan43@gmail.com
- Click "ALLOW"

### Step 5: Add Schedule
- Tell AI your schedule
- Click "📅 Save Schedule to Calendar"
- Events appear in Google Calendar!

---

## Expected Results:

✅ Server shows: "Server running at http://localhost:3000"
✅ OAuth button shows: "✅ Calendar Connected"
✅ Events appear in: https://calendar.google.com/calendar

---

## Questions?

Read these files:
- FIX_OAUTH_ERROR.md - Detailed error explanation
- OAUTH_SETUP_STEPS.md - Full setup guide
- GOOGLE_CALENDAR_SETUP.md - Original setup

Or contact: gevorgbablumyan43@gmail.com
