# 🔐 How to Fix Institutional Account OAuth Issue

## The Problem:

When you click "🔐 Connect Primary" or "🔐 Connect Secondary", Google's OAuth popup shows your **institutional account** (from your workspace/organization) instead of your personal Gmail account.

This happens because:
- Google remembers your last logged-in account
- Your institutional account may be your default
- Browser has cached credentials

---

## ✅ SOLUTION 1: Use "Use another account" (EASIEST)

When the OAuth popup appears:

1. **Look for the account selection screen**
   - You may see your institutional email first
   
2. **Click "Use another account"** link
   - Usually at the bottom of the account list
   - Or click the account switcher icon

3. **Enter your personal Gmail:**
   ```
   gevorgbablumyan43@gmail.com
   ```

4. **Enter password** and complete login

5. **Click ALLOW** to grant calendar access

**✅ DONE!** That account is now connected.

---

## ✅ SOLUTION 2: Sign Out First (If Solution 1 Fails)

1. **Before clicking "Connect"**, open a new browser tab

2. **Visit:** `https://accounts.google.com/logout`
   - This signs you out of ALL Google accounts

3. **Close that tab** and return to http://localhost:3000

4. **Click "🔐 Connect Primary"** button again

5. **Now Google will show account selection** (fresh state)

6. **Sign in with:**
   ```
   gevorgbablumyan43@gmail.com
   ```

7. **Click ALLOW**

**✅ DONE!** Connected with correct account.

---

## ✅ SOLUTION 3: Use Incognito/Private Mode (MOST RELIABLE)

This is the **most foolproof method**:

### macOS (Safari):
1. **Shift + Cmd + N** to open Private window
2. Go to: `http://localhost:3000`
3. Click "🔐 Connect Primary"
4. Sign in with: `gevorgbablumyan43@gmail.com`
5. Click ALLOW
6. Close private window
7. Main browser now has the token ✅

### macOS (Chrome):
1. **Shift + Cmd + N** to open Incognito window
2. Go to: `http://localhost:3000`
3. Click "🔐 Connect Primary"
4. Sign in with: `gevorgbablumyan43@gmail.com`
5. Click ALLOW
6. Close incognito window
7. Main browser now has the token ✅

### macOS (Firefox):
1. **Shift + Cmd + P** to open Private window
2. Follow same steps as above

**✅ DONE!** Now both private and main browser have the connection.

---

## ✅ SOLUTION 4: Clear Browser Cookies (Nuclear Option)

If none above work:

1. **Go to Settings** (Cmd + ,)
2. **Clear browsing data:**
   - Cookies and cached images
   - All time
3. **Restart browser**
4. Go to http://localhost:3000
5. Click "🔐 Connect Primary"
6. Fresh login with: `gevorgbablumyan43@gmail.com`

---

## 🔄 For Your Two Accounts:

### Connecting gevorgbablumyan43@gmail.com:
1. Click "🔐 Connect Primary"
2. Use one of the solutions above
3. Sign in with: `gevorgbablumyan43@gmail.com`

### Connecting gevorg.bablumyan@tumo.org:
1. Click "🔐 Connect Secondary"
2. Use the same solution (or different one)
3. Sign in with: `gevorg.bablumyan@tumo.org`

**Note:** You can use the same browser if you clear cookies between, or use different browser windows/tabs for each.

---

## ✅ What You Should See After Connecting:

In http://localhost:3000 header, you should see:
```
✅ gevorgbablumyan43@gmail.com | ❌ gevorg.bablumyan@tumo.org
```

Then after both are connected:
```
✅ gevorgbablumyan43@gmail.com | ✅ gevorg.bablumyan@tumo.org
```

---

## ⚠️ Troubleshooting

**Still showing institutional account?**
- Use **Solution 3 (Incognito mode)** - this always works
- Make absolutely sure you have the right email typed in

**Gets stuck at "Check your account"?**
- Wait 5-10 seconds
- If it times out, close and try again
- Make sure your internet connection is stable

**Authorization failed?**
- Check your credentials in `.env` file are correct
- Make sure Google Calendar API is enabled in Google Cloud Console
- Try Solution 4 (clear cookies)

**Can't switch between accounts in OAuth?**
- Click the account icon/name at the top of the popup
- Select "Use another account"
- Enter the email you want

---

## 🎯 Recommended Approach:

1. **For Primary account (gevorgbablumyan43@gmail.com):**
   - Use Solution 1 ("Use another account") - quick and easy

2. **For Secondary account (gevorg.bablumyan@tumo.org):**
   - Use Solution 3 (Incognito mode) - ensures clean state

This way both accounts authorize cleanly without confusion!

---

## 📱 Remember:

✅ You only need to authorize **ONCE** per account  
✅ After authorization, it remembers the token  
✅ You can add/switch accounts anytime  
✅ Both accounts work independently  

**Once you're connected, just tell the AI your schedule and it will save to the selected calendar!** 🚀
