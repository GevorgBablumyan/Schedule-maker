# ✅ Dual Gmail Account Setup Guide

Your Schedule Assistant now supports **TWO Gmail accounts**:
- **Primary:** gevorgbablumyan43@gmail.com
- **Secondary:** gevorg.bablumyan@tumo.org

---

## 📋 What You Need to Do:

### Step 1: Get OAuth Credentials (Same for Both Accounts)

1. Go to: **https://console.cloud.google.com**
2. Create ONE project: "Schedule Assistant"
3. Enable APIs:
   - Google Calendar API
   - Google+ API
4. Create OAuth 2.0 Credentials (Web application):
   - Redirect URI: `http://localhost:3000/auth/callback`
   - Additional URI: `http://localhost:3000`
5. Copy Client ID and Client Secret

### Step 2: Update .env File

Edit: `/Users/user/Desktop/Lesson1/.env`

```
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
PRIMARY_EMAIL=gevorgbablumyan43@gmail.com
SECONDARY_EMAIL=gevorg.bablumyan@tumo.org
```

### Step 3: Restart Server

```bash
cd /Users/user/Desktop/Lesson1
node server.mjs
```

### Step 4: Connect Both Calendars

Go to: http://localhost:3000

You'll see TWO buttons:
- **🔐 Connect Primary** - Connect gevorgbablumyan43@gmail.com
- **🔐 Connect Secondary** - Connect gevorg.bablumyan@tumo.org

Click each button and authorize access:
1. Click "🔐 Connect Primary"
2. Sign in with: `gevorgbablumyan43@gmail.com`
3. Click ALLOW
4. Repeat for Secondary account

After both are connected, you'll see:
- ✅ gevorgbablumyan43@gmail.com
- ✅ gevorg.bablumyan@tumo.org

---

## 🎯 How to Use:

### Adding Schedule to Primary Account:

1. Type your schedule
2. Click "📅 Save Schedule to Calendar"
3. It saves to: **gevorgbablumyan43@gmail.com**

### Adding Schedule to Secondary Account:

1. Click "✅ Secondary" button first
2. Type your schedule
3. Click "📅 Save Schedule to Calendar"
4. It saves to: **gevorg.bablumyan@tumo.org**

### Checking Both Calendars:

1. Ask: "What do I have today?"
2. The bot shows events from the currently selected account
3. Switch accounts using the buttons to see the other calendar

---

## 🔄 Account Switching

The interface shows which account is active:
- **Green (✅)** = Connected and available
- **Yellow (🔐)** = Not connected yet

Click any button to:
- **Connected accounts:** Switch to that account
- **Disconnected accounts:** Authorize and connect

---

## 📝 Example Workflow:

```
1. User: "I have a busy Monday schedule..."
   AI: "Here's your schedule formatted..."
   
2. User clicks: "📅 Save Schedule to Calendar"
   Result: Saved to currently selected email account
   
3. User clicks: "✅ Secondary" 
   Chat: "Switched to gevorg.bablumyan@tumo.org"
   
4. User: "I have another schedule for Tuesday..."
   AI: "Here's the Tuesday schedule..."
   
5. User clicks: "📅 Save Schedule to Calendar"
   Result: Saved to secondary account
```

---

## ✅ Verification

Check both calendars:
1. Open: https://calendar.google.com/calendar (for primary)
2. Sign in with each Gmail account
3. You should see your schedules in each calendar

---

## ⚠️ Troubleshooting

**Buttons showing "🔐 Connect" but should show "✅":**
- OAuth credentials in .env are invalid
- Follow Step 2 again with correct credentials

**Can't switch accounts:**
- Make sure both accounts are authorized
- Click the button for the account you want to use

**Schedules not saving:**
- Check that correct account is selected (look at the buttons)
- Verify OAuth credentials are valid
- Restart server

**Events missing from one calendar:**
- Sign into each Gmail account separately
- Check Google Calendar settings
- Verify API is enabled

---

## 🔑 Key Features:

✅ Use two Gmail accounts simultaneously  
✅ Switch between accounts with buttons  
✅ Save schedules independently to each  
✅ Check today's events for each account  
✅ Automatic schedule detection and formatting  
✅ Full OAuth integration with Google Calendar  

---

**You now have a complete dual-account Schedule Assistant!** 🎉
