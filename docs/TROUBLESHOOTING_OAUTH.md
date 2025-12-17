# ✅ Troubleshooting Checklist - Why OAuth Isn't Working

## First: Check if Credentials Are Missing

Run this command:
```bash
cd /Users/user/Desktop/Lesson1
node check-credentials.mjs
```

### If you see ❌ INVALID:
**→ YOUR CREDENTIALS ARE MISSING OR WRONG**

Go to: `DETAILED_OAUTH_SETUP.md` and follow all steps.

---

## Checklist: Is Everything Set Up?

### 1. Do you have OAuth credentials from Google Cloud?
- [ ] YES - Go to Step 2
- [ ] NO - Follow: `DETAILED_OAUTH_SETUP.md` → Return here when done

### 2. Is your .env file updated?
```bash
cat /Users/user/Desktop/Lesson1/.env
```

Look for:
- [ ] `GOOGLE_CLIENT_ID=` (NOT `your_client_id_here`)
- [ ] `GOOGLE_CLIENT_SECRET=` (NOT `your_client_secret_here`)
- [ ] Both values look like long strings (not placeholders)

If NO → Update `.env` with real credentials from Google

### 3. Is the server running?
```bash
# Check if server is running
lsof -i :3000
```

If yes, you'll see: `node ... node server.mjs`
If no, start it:
```bash
cd /Users/user/Desktop/Lesson1
node server.mjs
```

- [ ] Server shows: `✓ Server running at http://localhost:3000`

### 4. Can you see the website?
Go to: http://localhost:3000

- [ ] I see the Schedule Assistant chat interface
- [ ] I see two buttons: "🔐 Connect Primary" and "🔐 Connect Secondary"

If NO → Server not running or wrong URL

### 5. Did you click a Connect button?
- [ ] YES - Go to Step 6
- [ ] NO - Click "🔐 Connect Primary"

### 6. What happened when you clicked?
- [ ] A new window opened (Google OAuth) → Go to Step 7
- [ ] Nothing happened → Check browser console (F12) for errors
- [ ] Error message appeared → See "Common Errors" below

### 7. Did you see a Google sign-in screen?
- [ ] YES → Continue to Step 8
- [ ] NO → Your credentials in `.env` are WRONG
  - Go back to Google Cloud Console
  - Copy Client ID and Secret again
  - Update `.env`
  - Restart server
  - Try again

### 8. Did you sign in successfully?
- [ ] YES - saw "Calendar Connected" or similar → ✅ DONE!
- [ ] NO → See "Common Errors" section below

### 9. Are both buttons now green (✅)?
- [ ] YES → Connect second account same way
- [ ] NO → One or both still showing "🔐 Connect"
  - This is normal if you only connected one
  - Click the other button to connect second account

---

## Common Errors & Fixes

### Error: "The OAuth client was not found"
**Cause:** Credentials in `.env` are invalid or placeholders

**Fix:**
1. Get real credentials from Google Cloud Console
2. Update `.env`
3. Run: `node check-credentials.mjs`
4. If still says INVALID, copy credentials again carefully
5. Restart server: `node server.mjs`

---

### Error: "Redirect URI mismatch"
**Cause:** Your redirect URI in Google doesn't match what code expects

**Fix:**
1. Go to Google Cloud Console
2. Go to Credentials → Click your OAuth app
3. Find "Authorized redirect URIs"
4. Make sure you have EXACTLY:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000`
5. NO https:// (use http://)
6. NO typos
7. Save changes
8. Restart server

---

### Error: "Invalid Client"
**Cause:** Client ID and/or Secret are wrong

**Fix:**
1. Go back to Google Cloud Console
2. Go to Credentials
3. Find your OAuth app: "Schedule Assistant Web"
4. Click on it
5. Copy the Client ID and Secret again
6. Paste into `.env` exactly (no extra spaces)
7. Test: `node check-credentials.mjs`
8. Should show ✅ VALID
9. Restart server

---

### Clicking "Connect" does nothing
**Cause:** Either credentials missing or server error

**Fix:**
1. Check server console (terminal window running `node server.mjs`)
2. Do you see any error messages? Copy them
3. Run: `node check-credentials.mjs`
4. Does it show ✅ VALID?
5. If YES: Restart browser, clear cache, try again
6. If NO: Update `.env` with real credentials

---

### OAuth popup shows wrong account
**Cause:** Browser has cached previous Google login

**Fix:**
Use one of these solutions:
1. **Sign out first:** https://accounts.google.com/logout
2. **Use "Use another account"** in OAuth popup
3. **Use Incognito/Private window** (Cmd+Shift+N)
4. **Clear browser cookies** (Settings → Clear browsing data)

See: `OAUTH_ACCOUNT_SELECTION.md` for details

---

### OAuth popup never appears
**Cause:** Credentials are invalid or missing

**Fix:**
1. Check `.env` file has real values (not placeholders)
2. Run: `node check-credentials.mjs`
3. Should show: ✅ Credentials look VALID!
4. If shows INVALID: Get real credentials from Google

---

### "Calendar not connected" error when trying to save
**Cause:** You haven't authorized the account yet

**Fix:**
1. Click "🔐 Connect Primary" button
2. Complete OAuth authorization
3. Button should turn green: ✅ Primary
4. Now try saving schedule again

---

## Quick Test

If everything is working, this should happen:

1. ✅ Go to http://localhost:3000
2. ✅ See "🔐 Connect Primary" and "🔐 Connect Secondary" buttons
3. ✅ Click "🔐 Connect Primary"
4. ✅ OAuth popup appears with Google login
5. ✅ Sign in with your email
6. ✅ Click ALLOW
7. ✅ Popup closes
8. ✅ Button turns green: "✅ Primary"
9. ✅ Can now save schedules to that calendar

If any step fails → Check the errors above

---

## Still Not Working?

**Before giving up, try this:**

1. **Kill all node processes:**
```bash
pkill -f "node"
```

2. **Delete any token files:**
```bash
cd /Users/user/Desktop/Lesson1
rm -f google-token.json google-tokens-multi.json
```

3. **Check `.env` file:**
```bash
cat .env
```
Make sure it has REAL credentials (not `your_client_id_here`)

4. **Start fresh:**
```bash
cd /Users/user/Desktop/Lesson1
node server.mjs
```

5. **Go to:** http://localhost:3000

6. **Try connecting again**

---

## Need Help?

Check these files in order:
1. `DETAILED_OAUTH_SETUP.md` - Step-by-step guide
2. `OAUTH_ACCOUNT_SELECTION.md` - Account selection issues
3. `DUAL_ACCOUNT_SETUP.md` - Two account setup

**The root issue 99% of the time:** Placeholder credentials in `.env`

**Solution:** Get real credentials from Google Cloud Console and update `.env`

That's it! Everything else is automatic after that. 🚀
