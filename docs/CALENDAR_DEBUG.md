# 🔧 Calendar Panel Debugging Guide

## Problem: Nothing appears in calendar panel

### Quick Checklist

✅ **Step 1: Check Server is Running**
```
Terminal should show:
✓ Server running at http://localhost:3000
```

✅ **Step 2: Test the Application**
1. Open http://localhost:3000
2. Type in chat: `"Monday 9:30-15:40 College, 19:00-21:00 Gym"`
3. Click SEND (not just Save)
4. Wait for AI response
5. Click "📅 Save to Calendar"

✅ **Step 3: Check Browser Console**
- Press F12 to open developer tools
- Go to CONSOLE tab
- Look for any red error messages
- If you see errors, they will help us debug

✅ **Step 4: Verify Calendar Files**
```bash
# Check if calendar directory exists
ls /Users/user/Desktop/Lesson1/calendars/

# Should show files like:
# gevorgbablumyan43_gmail_com.json
```

---

## Common Issues & Solutions

### Issue 1: Chat works but calendar doesn't load
**Solution:**
1. Make sure you SENT a message first
2. Click SAVE button only after AI responds
3. Check browser console for errors (F12)

### Issue 2: "No events scheduled yet" message
**Possible causes:**
- The schedule wasn't parsed correctly
- The AI response didn't contain time information
- The file saved but calendar view hasn't updated

**Try this:**
```
Type: "Monday 9:30-15:40 College, 19:00-21:00 Gym"
(Be very specific with times in HH:MM format)
```

### Issue 3: Getting errors in console
**Check if:**
1. Server is running (check terminal)
2. Calendar directory exists
3. You have write permissions

### Issue 4: "Error: 500" when saving
**This means:**
- Server encountered an error processing the schedule
- Check server terminal for detailed error message
- Try with a simpler schedule format

---

## How the Calendar Panel Works

### Flow:
```
You type schedule
       ↓
Click SEND
       ↓
AI responds
       ↓
lastAIResponse gets the text
       ↓
Click SAVE CALENDAR
       ↓
Server receives scheduleText
       ↓
Schedule parser extracts times/activities
       ↓
Events created and saved to JSON file
       ↓
loadCalendarEvents() runs
       ↓
Calendar panel updates with events
```

---

## Manual Test Commands

### Test 1: Verify server responds
```bash
curl http://localhost:3000
```

### Test 2: Test AI endpoint
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Test"}'
```

### Test 3: Test save endpoint
```bash
curl -X POST http://localhost:3000/api/calendar/save-schedule \
  -H "Content-Type: application/json" \
  -d '{"scheduleText":"Monday 9:30-15:40 College","email":"gevorgbablumyan43@gmail.com"}'
```

### Test 4: Test retrieve endpoint
```bash
curl "http://localhost:3000/api/calendar/saved-events?email=gevorgbablumyan43@gmail.com"
```

---

## What Should Happen Step-by-Step

### Step 1: You type and send
```
Input: "Monday 9:30-15:40 College"
Expected: Message appears in chat on LEFT
```

### Step 2: AI responds
```
AI: "I'll help organize your schedule...
    Monday 9:30 AM - 3:40 PM: College"
Expected: Response appears in chat on LEFT
```

### Step 3: You click Save
```
Click: "📅 Save to Calendar"
Expected: 
- System message: "Saving schedule..."
- System message: "✅ Added X events..."
- Calendar panel on RIGHT shows events
```

### Step 4: Calendar displays
```
RIGHT panel should show:
📍 Mon, Dec 17 · 09:30 AM - 03:40 PM
College

Total: 1
Today: 1
```

---

## If Nothing Works: Complete Reset

```bash
# 1. Kill server
pkill -9 node

# 2. Clear calendar files
rm /Users/user/Desktop/Lesson1/calendars/*.json

# 3. Restart server
cd /Users/user/Desktop/Lesson1
node server.mjs

# 4. Refresh browser
# Go to http://localhost:3000 in browser
# Press Cmd+R to refresh
```

---

## Browser Developer Tools (F12)

### Open Console:
1. Press F12
2. Click "Console" tab
3. Look for:
   - Red error messages ❌
   - Network warnings ⚠️
   - Success logs ✅

### Check Network Requests:
1. Press F12
2. Click "Network" tab
3. Perform an action (send message, save)
4. Look at the requests:
   - POST /api/generate - Should show response
   - POST /api/calendar/save-schedule - Should show success
   - GET /api/calendar/saved-events - Should show events

---

## Expected File Structure

```
/Users/user/Desktop/Lesson1/
├── server.mjs
├── index.html
├── custom-calendar.mjs
├── schedule-parser.mjs
└── calendars/
    ├── gevorgbablumyan43_gmail_com.json
    └── gevorg_bablumyan_tumo_org.json
```

---

## Quick Fixes to Try

1. **Refresh browser:** Cmd+R
2. **Hard refresh:** Cmd+Shift+R
3. **Check terminal:** Make sure server is running
4. **Try another browser:** Safari, Chrome, Firefox
5. **Clear browser cache:** Settings → Clear history
6. **Restart server:** pkill node, then node server.mjs

---

## Email Format

Make sure you're using exactly:
- **Primary:** `gevorgbablumyan43@gmail.com`
- **Secondary:** `gevorg.bablumyan@tumo.org`

(Case sensitive!)

---

## Still Not Working?

Check these files in order:
1. `/Users/user/Desktop/Lesson1/server.mjs` - Server code
2. `/Users/user/Desktop/Lesson1/index.html` - Frontend code
3. `/Users/user/Desktop/Lesson1/custom-calendar.mjs` - Storage
4. Terminal output - Error messages
5. Browser console (F12) - Errors from frontend

---

## What's Supposed to Be Displayed

**Calendar Panel should show:**
- Header: "📅 Your Calendar"
- Account info: "📧 Primary: gevorgbablumyan43@gmail.com"
- Event list or: "📭 No events scheduled yet"
- Each event: "📍 Mon, Dec 17 · 09:30 - 15:40" + "College"
- Stats: "Total: X   Today: Y"

---

*Still having issues? Check the server terminal for error messages - they'll tell you exactly what went wrong!* 🔍
