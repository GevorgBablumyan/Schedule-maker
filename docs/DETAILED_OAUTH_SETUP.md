# 🎬 COMPLETE Step-by-Step Video Guide to Get OAuth Credentials

## What You Need:
This takes about 10 minutes total.

---

## STEP 1: Open Google Cloud Console

1. **Open new browser tab**
2. Go to: ****
3. Sign in with any Google account (doesn't matter which one)

---

## STEP 2: Create a New Project

1. Look at the **TOP of the page**
2. You'll see: **"My First Project"** (or similar) - click it
3. A dropdown appears
4. Click **"NEW PROJECT"** button (top right)
5. **Project name:** Type `Schedule Assistant`
6. Click **CREATE**
7. **WAIT 60 seconds** for project to create

---

## STEP 3: Enable Google Calendar API

1. Once project is created, you're in the dashboard
2. Look at **top search bar** (magnifying glass)
3. Type: `google calendar api`
4. Click the first result
5. You'll see **"Google Calendar API"** page
6. Click the blue **ENABLE** button
7. **WAIT** for it to enable (10 seconds)

---

## STEP 4: Enable Google+ API (Required!)

1. Go back to search bar
2. Type: `google+ api`
3. Click result: **"Google+ API"**
4. Click **ENABLE**
5. **WAIT** for it to enable

---

## STEP 5: Create OAuth 2.0 Credentials

1. In **left sidebar**, click **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** (blue button, top)
3. **Dropdown menu appears** - select **"OAuth 2.0 Client IDs"**

### If you see "Configure OAuth Consent Screen":
This is normal. Do this:

1. Click **"CONFIGURE CONSENT SCREEN"** button
2. Choose: **"External"** (radio button, select it)
3. Click **CREATE**
4. Fill in the form:
   - **App name:** `Schedule Assistant`
   - **User support email:** `gevorgbablumyan43@gmail.com`
   - Scroll down to **Developer contact information**
   - **Email:** `gevorgbablumyan43@gmail.com`
5. Click **SAVE AND CONTINUE**

### On "Scopes" page:
1. Click **"ADD OR REMOVE SCOPES"**
2. Search for: `calendar`
3. Check the box next to: `https://www.googleapis.com/auth/calendar`
4. Click **UPDATE**
5. Click **SAVE AND CONTINUE**
6. Click **SAVE AND CONTINUE** again (on next page)
7. Click **BACK TO CREDENTIALS** (or go back to Credentials)

---

## STEP 6: Create OAuth Client ID

1. Back in Credentials, click **"+ CREATE CREDENTIALS"** again
2. Select **"OAuth 2.0 Client IDs"**
3. Choose application type: **"Web application"**
4. **Name:** `Schedule Assistant Web`
5. Scroll down to **"Authorized redirect URIs"**
6. Click **"ADD URI"** button
7. Type the first URI: `http://localhost:3000/auth/callback`
8. Click **"ADD URI"** again
9. Type the second URI: `http://localhost:3000`
10. Click **CREATE**

---

## STEP 7: Copy Your Credentials (IMPORTANT!)

1. **A popup appears** with your credentials
2. **YOU WILL SEE:**
   - Client ID (long string)
   - Client Secret (long string)

3. **DO THIS:**
   - **COPY** the Client ID (select and copy to clipboard)
   - **COPY** the Client Secret (select and copy to clipboard)
   - **SAVE THEM SOMEWHERE** (notepad, etc.)

4. **The popup will close** - don't worry, you can get them again

---

## STEP 8: Find Credentials Again (If Popup Closed)

1. In Google Cloud Console, go to **"Credentials"**
2. Under **"OAuth 2.0 Client IDs"**, you'll see your app
3. Click on it: **"Schedule Assistant Web"**
4. You'll see:
   - **Client ID**
   - **Client Secret**
5. Copy both

---

## STEP 9: Update Your .env File

1. **Go to VS Code**
2. **Open:** `/Users/user/Desktop/Lesson1/.env`
3. **Find these lines:**
```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

4. **REPLACE them with your actual values:**

Example (your values will be different):
```
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-1234567890abcdefghijklmnop
```

**Important:**
- ✅ NO quotes around values
- ✅ NO extra spaces
- ✅ Exact copy from Google

5. **SAVE THE FILE** (Cmd+S)

---

## STEP 10: Verify Credentials Are Correct

1. Open terminal
2. Run: 
```bash
cd /Users/user/Desktop/Lesson1
node check-credentials.mjs
```

3. **You should see:**
```
✅ Credentials look VALID!
```

If you see:
```
❌ Credentials are INVALID
```

Go back and copy the credentials again.

---

## STEP 11: Restart Server

1. **Stop any running server** (Ctrl+C in terminal)
2. Run:
```bash
cd /Users/user/Desktop/Lesson1
node server.mjs
```

3. You should see:
```
✓ Server running at http://localhost:3000
```

---

## STEP 12: Test Connection

1. Go to: **http://localhost:3000**
2. Click **"🔐 Connect Primary"** button
3. **OAuth popup should appear** (Google login)
4. Sign in with: `gevorgbablumyan43@gmail.com`
5. Click **ALLOW**
6. Popup closes
7. You should see: **✅ gevorgbablumyan43@gmail.com** (button turns green)

---

## ✅ YOU'RE DONE!

If you get this far:
- ✅ Primary account connected
- ✅ Ready to use secondary account
- ✅ Can start adding schedules

---

## 🆘 COMMON MISTAKES:

❌ **"Invalid Client" error:**
- Your credentials in `.env` are wrong
- Go back to Step 8 and copy again carefully

❌ **"Redirect URI mismatch":**
- In Google Cloud, redirect URI must be EXACTLY: `http://localhost:3000/auth/callback`
- Check no typos

❌ **Server won't start:**
- Make sure `.env` file is saved
- Check for typos in file

❌ **Can't find Client ID in Google Console:**
- Make sure you're in the right project
- Go to Credentials → OAuth 2.0 Client IDs
- Click on your app name

---

## 📸 SCREENSHOTS TO LOOK FOR:

**When you see "OAuth 2.0 Client ID created":**
```
Client ID: [LONG STRING].apps.googleusercontent.com
Client Secret: GOCSPX-[LONG STRING]
```

That's what you need to copy!

---

## 🎯 SUMMARY:

| Step | What to Do | Time |
|------|-----------|------|
| 1 | Open Google Cloud Console | 1 min |
| 2 | Create project | 2 min |
| 3-4 | Enable 2 APIs | 2 min |
| 5-6 | Create OAuth credentials | 3 min |
| 7-9 | Copy credentials | 1 min |
| 10-11 | Update .env and restart | 2 min |
| 12 | Test connection | 1 min |
| **TOTAL** | | **~15 min** |

---

## 💡 TIPS:

- Keep Google Cloud Console tab open while doing this
- Have .env file open in VS Code while copying
- Don't close the credentials popup until you've copied both values
- If popup closes, just click on your app in Credentials to see them again

**You've got this! The hardest part is getting the credentials from Google. Everything else is automatic!** 🚀
