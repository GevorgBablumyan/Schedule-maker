# 🔴 ERROR FIX: "The OAuth client was not found"

This error means your Google OAuth credentials are **not configured**.

Currently, your `.env` file has **placeholder values**:
```
GOOGLE_CLIENT_ID=your_client_id_here  ❌ WRONG
GOOGLE_CLIENT_SECRET=your_client_secret_here  ❌ WRONG
```

---

## ✅ SOLUTION: Get Real Credentials (Takes 5 minutes)

### Quick Summary:
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Copy Client ID and Secret
4. Paste into `.env` file
5. Restart server
6. Done!

---

## 🎯 Detailed Steps:

### **1. Open Google Cloud Console**
- Go to: https://console.cloud.google.com/
- Sign in with: **gevorgbablumyan43@gmail.com**

### **2. Create a Project** (if you don't have one)
- Click "Select a Project" at the top
- Click "NEW PROJECT"
- Name: `Schedule Assistant`
- Click "CREATE"
- Wait 30 seconds

### **3. Enable APIs**
Search and enable these 2 APIs:
- `Google Calendar API` → Click ENABLE
- `Google+ API` → Click ENABLE

### **4. Go to Credentials**
- Click "Credentials" in left menu
- Click "+ CREATE CREDENTIALS"
- Select "OAuth 2.0 Client IDs"

### **5. Create OAuth Client**
If asked about "OAuth consent screen":
- Choose "External"
- App name: `Schedule Assistant`
- User support email: `gevorgbablumyan43@gmail.com`
- Click SAVE AND CONTINUE
- Add scope: `https://www.googleapis.com/auth/calendar`
- Click SAVE AND CONTINUE
- Back to CREDENTIALS

Then:
- Choose "Web application"
- Name: `Schedule Assistant Web`
- Add URI: `http://localhost:3000/auth/callback`
- Add URI: `http://localhost:3000`
- Click "CREATE"

### **6. Copy Your Credentials**
You'll see:
```
Client ID: 123456789-abcxyz.apps.googleusercontent.com
Client Secret: GOCSPX-xxxxxxxxxxxxx
```

**COPY BOTH VALUES**

---

## 📝 Update Your .env File

1. Open: `/Users/user/Desktop/Lesson1/.env`
2. Replace:
```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

With your actual values:
```
GOOGLE_CLIENT_ID=123456789-abcxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx
```

3. **SAVE the file** (Ctrl+S)

---

## ▶️ Restart Server

1. Stop the running server (Ctrl+C in terminal)
2. Start it again:
   ```bash
   cd /Users/user/Desktop/Lesson1
   node server.mjs
   ```
3. You should see: ✅ **Server running at http://localhost:3000**

---

## 🧪 Verify Credentials

Run this command to check:
```bash
cd /Users/user/Desktop/Lesson1
node check-credentials.mjs
```

If you see ✅ "Credentials look VALID", you're ready!

---

## 🔗 Try Again

1. Go to: http://localhost:3000
2. Click "🔐 Connect Calendar"
3. Sign in with: `gevorgbablumyan43@gmail.com`
4. Click "ALLOW"
5. ✅ Calendar should now be connected!

---

## 📝 Then Add Your Schedule

1. Tell the AI your weekly schedule:
   ```
   Here's my weekly schedule:
   Monday: 9:30-15:40 College, 19:00-21:00 Gym
   Tuesday: 9:30-15:40 College, 16:00-18:00 Homework
   ...
   Send this to my calendar
   ```

2. Click **"📅 Save Schedule to Calendar"**

3. ✅ All events will be added to your Google Calendar!

---

## ⚠️ IF IT STILL FAILS:

1. Check that redirect URI is EXACTLY: `http://localhost:3000/auth/callback`
2. Delete and recreate the OAuth app
3. Make sure you copied Client ID AND Secret (not just one)
4. Restart the server
5. Clear browser cache (or try in private/incognito mode)

**You've got this! 💪**
