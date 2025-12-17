# 🚨 URGENT: Error 401: invalid_client - QUICK FIX

## The Problem:
Your `.env` file has **FAKE PLACEHOLDER VALUES**:
```
GOOGLE_CLIENT_ID=your_client_id_here       ← FAKE
GOOGLE_CLIENT_SECRET=your_client_secret_here ← FAKE
```

That's why you get: **Error 401: invalid_client**

---

## The Solution (5 MINUTES):

### STEP 1: Go to Google Cloud Console RIGHT NOW
**URL:** https://console.cloud.google.com

### STEP 2: Select Your Project
- At the very top, click on the project dropdown
- Look for: **"Schedule Assistant"** (you should have created this already)
- Click on it to select it

### STEP 3: Go to Credentials
- **Left sidebar** → Click **"Credentials"**

### STEP 4: Find Your OAuth App
- Look for section: **"OAuth 2.0 Client IDs"**
- You should see: **"Schedule Assistant Web"** (or similar name)
- **Click on it**

### STEP 5: Copy Client ID
You'll see a screen with:
```
Client ID: [LONG STRING]
Client Secret: [LONG STRING]
```

**COPY the Client ID:**
- Select the entire Client ID value
- Copy to clipboard (Cmd+C)

### STEP 6: Copy Client Secret
**COPY the Client Secret:**
- Select the entire Client Secret value  
- Copy to clipboard (Cmd+C)

---

## STEP 7: Update Your .env File

### Open VS Code
1. Open: `/Users/user/Desktop/Lesson1/.env`

### Replace Line 1:
**FIND:**
```
GOOGLE_CLIENT_ID=your_client_id_here
```

**REPLACE with:**
```
GOOGLE_CLIENT_ID=PASTE_YOUR_CLIENT_ID_HERE
```

Then paste your actual Client ID (Cmd+V)

Result should look like:
```
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
```

### Replace Line 2:
**FIND:**
```
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

**REPLACE with:**
```
GOOGLE_CLIENT_SECRET=PASTE_YOUR_CLIENT_SECRET_HERE
```

Then paste your actual Client Secret (Cmd+V)

Result should look like:
```
GOOGLE_CLIENT_SECRET=GOCSPX-1234567890abcdefghijklmnop
```

### SAVE THE FILE
**Cmd+S** (or File → Save)

---

## STEP 8: Verify It's Correct

Run:
```bash
cd /Users/user/Desktop/Lesson1
node check-credentials.mjs
```

You should see:
```
✅ Credentials look VALID!
```

If you still see:
```
❌ Credentials are INVALID
```

Then you copied them wrong. Go back to Google Cloud and copy again carefully.

---

## STEP 9: Restart Server

```bash
pkill -f "node server.mjs"
sleep 1
cd /Users/user/Desktop/Lesson1
node server.mjs
```

You should see:
```
✓ Server running at http://localhost:3000
```

---

## STEP 10: Try Again

1. Go to: http://localhost:3000
2. Click **"🔐 Connect Primary"**
3. Google OAuth popup should appear
4. Sign in with: `gevorgbablumyan43@gmail.com`
5. Click **ALLOW**
6. Should now say: ✅ **"Calendar Connected"**

---

## ⚠️ Common Copy/Paste Mistakes:

❌ **Copied wrong value** (Secret instead of ID)
- Credentials have different values
- Check you're copying the RIGHT one

❌ **Extra spaces** before or after
- `.env` values should have NO spaces
- Example: `GOOGLE_CLIENT_ID=abc123` (not ` abc123 `)

❌ **Didn't save .env file**
- Always do: **Cmd+S** after editing
- Check file is saved

❌ **Copied from wrong OAuth app**
- Make sure you're in: "Schedule Assistant Web"
- Not some other app

---

## 🎯 Quick Checklist:

- [ ] Opened Google Cloud Console
- [ ] Found "Schedule Assistant" project
- [ ] Went to Credentials
- [ ] Clicked on "Schedule Assistant Web"
- [ ] Copied Client ID
- [ ] Copied Client Secret
- [ ] Updated .env file
- [ ] Saved .env file (Cmd+S)
- [ ] Ran `node check-credentials.mjs` → showed ✅ VALID
- [ ] Restarted server
- [ ] Tried connecting → worked! ✅

---

## 🔑 YOUR CREDENTIALS SHOULD LOOK LIKE:

```
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xyzabc123456789
```

**NOT:**
```
GOOGLE_CLIENT_ID=your_client_id_here  ← WRONG
GOOGLE_CLIENT_SECRET=your_client_secret_here ← WRONG
```

---

## 💪 YOU'VE GOT THIS!

The error means you're close! You just need to copy the real credentials and paste them in. It's literally copy/paste - takes 2 minutes.

**Once you have the real credentials in `.env`, everything will work!** 🚀

**Let me know when you've done this!**
