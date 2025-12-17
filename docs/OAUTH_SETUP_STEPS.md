# ✅ STEP-BY-STEP: Get Real Google OAuth Credentials

**Follow EXACTLY - Do not skip any step!**

---

## Step 1: Go to Google Cloud Console
1. Open: **https://console.cloud.google.com/**
2. Sign in with: **gevorgbablumyan43@gmail.com**

---

## Step 2: Create a New Project
1. Look at the **TOP of the page**
2. Click on **"Select a Project"** (or your current project name)
3. Click **"NEW PROJECT"**
4. **Project name:** `Schedule Assistant`
5. Click **CREATE**
6. **Wait 30-60 seconds** for it to create
7. Once created, click to **OPEN** it

---

## Step 3: Enable Calendar API
1. In the **search box at the top**, type: `google calendar api`
2. Click the first result: **"Google Calendar API"**
3. Click the blue **ENABLE** button
4. Wait for it to enable (takes 10 seconds)

---

## Step 4: Enable Google+ API (Important!)
1. In the search box, type: `google+ api`
2. Click the result: **"Google+ API"**
3. Click **ENABLE**
4. Wait for it to enable

---

## Step 5: Create OAuth 2.0 Credentials
1. In the **left sidebar**, click **"Credentials"**
2. Click the blue **"+ CREATE CREDENTIALS"** button
3. From the dropdown, select: **"OAuth 2.0 Client IDs"**
4. **If you see a screen about "Create OAuth 2.0 Client ID":**
   - It might ask to configure the OAuth consent screen first
   - Click **"CONFIGURE CONSENT SCREEN"** if it appears
   - Choose: **External**
   - Fill in:
     - App name: `Schedule Assistant`
     - User support email: `gevorgbablumyan43@gmail.com`
     - Scroll down to "Developer contact information"
     - Developer email: `gevorgbablumyan43@gmail.com`
     - Click **SAVE AND CONTINUE**
   - On "Scopes" page, click **ADD OR REMOVE SCOPES**
     - Search for: `calendar`
     - Check: `https://www.googleapis.com/auth/calendar`
     - Click **UPDATE**
     - Click **SAVE AND CONTINUE**
   - Click **SAVE AND CONTINUE** again
   - Click **BACK TO CREDENTIALS**

5. Click **"+ CREATE CREDENTIALS"** → **"OAuth 2.0 Client IDs"** again
6. Choose application type: **"Web application"**
7. **Name:** `Schedule Assistant - Web`
8. Under **"Authorized redirect URIs"**, click **"ADD URI"**
9. Add these 2 URIs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000`
10. Click **CREATE**

---

## Step 6: Copy Your Credentials
1. You'll see a popup with **Client ID** and **Client Secret**
2. **COPY both values** - Write them down or keep the popup open
3. If the popup closes, go back to **Credentials** → Click your OAuth app → Copy from there

---

## Step 7: Update Your .env File
1. Go back to VS Code
2. Open `/Users/user/Desktop/Lesson1/.env`
3. **REPLACE** (keep the exact same format):

```
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
USER_EMAIL=gevorgbablumyan43@gmail.com
```

With your **ACTUAL** values:
```
GOOGLE_CLIENT_ID=123456789-abc123xyz789.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxx
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
USER_EMAIL=gevorgbablumyan43@gmail.com
```

**Make sure:**
- No quotes around the values
- No extra spaces
- Exact client ID and secret from Google

---

## Step 8: Restart Your Server
1. Stop the server: `Ctrl+C` in terminal
2. Start it again: `npm start` or `node server.mjs`
3. You should see: ✅ `Server running at http://localhost:3000`

---

## Step 9: Test It!
1. Go to: http://localhost:3000
2. Click **"🔐 Connect Calendar"**
3. Should now work! ✅

---

## ⚠️ Common Mistakes:

❌ **Using wrong redirect URI in Google Console**
- Must be EXACTLY: `http://localhost:3000/auth/callback`
- No https:// - use http://

❌ **Credentials not saved in .env**
- Make sure file is saved (Ctrl+S)
- Server must be restarted after saving

❌ **Using old/expired credentials**
- Always get fresh ones from Google Console
- If it still fails, delete the OAuth app and create a new one

---

## If Still Failing:

Try this to reset everything:
1. Stop server: `Ctrl+C`
2. Delete the OAuth app from Google Console
3. Create a NEW one with the exact steps above
4. Update .env with new credentials
5. Delete `./google-token.json` if it exists
6. Restart server
7. Try again

---

**Now follow these steps and you'll have working OAuth! ✅**
