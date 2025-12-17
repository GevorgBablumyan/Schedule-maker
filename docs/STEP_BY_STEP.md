# 🎯 How to Use Your Calendar - Step by Step

## Status: ✅ READY TO USE!

The calendar panel issue has been **FIXED**. Here's exactly what to do:

---

## 📖 Complete Step-by-Step Guide

### STEP 1️⃣: Open the Website
Go to: **http://localhost:3000**

You should see:
```
┌─────────────────────────────────────────┐
│  💬 Chat         │    📅 Calendar      │
│  [🧑 Primary ][👥 Secondary]            │
│  ┌──────────┐    ┌──────────────────┐   │
│  │ Messages │    │ Events display   │   │
│  │          │    │ here (empty now) │   │
│  └──────────┘    └──────────────────┘   │
│  [Type...] [Send] [Save to Calendar]   │
└─────────────────────────────────────────┘
```

---

### STEP 2️⃣: Tell the AI About Your Schedule

In the **LEFT** chat box, type exactly:
```
Monday 9:30-15:40 College, 19:00-21:00 Gym
```

Then click **SEND** (or press ENTER)

**You should see:**
- Your message appears in chat (blue box on right)
- Spinner/loading indicator
- AI response appears (gray box on left)

---

### STEP 3️⃣: Wait for AI Response

The AI will respond with something like:
```
Got it! Here's your schedule:
- Monday 9:30 AM - 3:40 PM: College  
- Monday 7:00 PM - 9:00 PM: Gym
```

(This takes 5-10 seconds)

---

### STEP 4️⃣: Save to Calendar

Click the green button: **"📅 Save to Calendar"**

You should see:
```
System message: "Saving schedule to gevorgbablumyan43@gmail.com..."
System message: "✅ Added 2 events to your calendar!"
```

---

### STEP 5️⃣: Check the Calendar Panel

Look at the **RIGHT** side - you should now see:

```
📅 Your Calendar
📧 Primary: gevorgbablumyan43@gmail.com

📍 Mon, Dec 17 · 09:30 AM - 03:40 PM
College

📍 Mon, Dec 17 · 07:00 PM - 09:00 PM  
Gym

Total: 2
Today: 2
```

✅ **SUCCESS!** Calendar panel is working!

---

## 🔄 Try With Different Schedules

### Example 2: Full Week
```
Monday: 9:30-15:40 College, 19:00-21:00 Gym
Tuesday: 10:00-16:00 Work
Wednesday: 9:30-15:40 College
```

### Example 3: Just Times
```
9:30-15:40 College
19:00-21:00 Gym
```

### Example 4: Natural Language
```
College from 9:30 to 15:40, then Gym at 19:00 for 2 hours
```

---

## 💡 Tips for Best Results

✅ **Use 24-hour time format:**
- `15:40` (3:40 PM) ✅ Good
- `3:40 PM` ⚠️ Also works
- `3:40` ❌ Might not work

✅ **Include day names:**
- `Monday 9:30-15:40` ✅ Best
- `9:30-15:40` ⚠️ Also works

✅ **Be specific with times:**
- `9:30-15:40` ✅ Good
- `morning class` ❌ Too vague

✅ **One activity per time slot:**
- `Monday 9:30-15:40 College, 19:00-21:00 Gym` ✅
- `Monday 9:30-15:40 College and Gym` ❌ Confusing

---

## 🔀 Switch Between Accounts

### Primary Account (Default)
```
Email: gevorgbablumyan43@gmail.com
Button: 📧 Primary
```

### Secondary Account
```
Email: gevorg.bablumyan@tumo.org
Button: 📧 Secondary
```

**How to switch:**
1. Click **"📧 Secondary"** button
2. Calendar panel clears (different account, no events)
3. Type a NEW schedule
4. Click SEND
5. Click SAVE
6. Events appear for secondary account

**To go back:**
1. Click **"📧 Primary"** button
2. Calendar shows primary account's events
3. All your primary events are still there!

---

## ❓ Troubleshooting

### Q: Calendar panel is empty
**A:** Make sure you:
1. ✅ Clicked SEND (not just typed)
2. ✅ Waited for AI response
3. ✅ Clicked "📅 Save to Calendar"
4. ✅ Refreshed browser (Cmd+R)

### Q: "No events scheduled yet" message
**A:** Your schedule might not have parsed. Try:
1. Use exact format: `Monday 9:30-15:40 College`
2. Include times in HH:MM format
3. Separate activities with commas

### Q: Getting an error
**A:** Check:
1. Server is running (terminal shows ✓)
2. Website is http://localhost:3000
3. Try pressing Cmd+R to refresh

### Q: Events don't show after saving
**A:**
1. Open browser console (F12)
2. Go to Network tab
3. Perform the save action
4. Look for any red errors
5. Check if /api/calendar/saved-events returns data

---

## 📱 Mobile Support

The calendar works on phones/tablets too!

1. Find your Mac's IP address
2. On phone, go to: `http://<mac-ip>:3000`
3. Works the same way!

---

## 💾 Your Data

**Where it's stored:**
```
/Users/user/Desktop/Lesson1/calendars/
├── gevorgbablumyan43_gmail_com.json
└── gevorg_bablumyan_tumo_org.json
```

**Important:**
- ✅ Stored locally (not uploaded)
- ✅ Survives browser refresh
- ✅ Survives server restart
- ✅ Safe and private
- ✅ Can be backed up easily

---

## 🎯 Common Workflows

### Workflow 1: Quick Daily Schedule
```
1. Type: "Monday 9-5 work, 6-7 gym"
2. Send
3. Click Save
4. Done!
```

### Workflow 2: Multiple Accounts
```
Primary account:
  Type schedule + Save
  
Secondary account:
  Click secondary button
  Type different schedule
  Save
```

### Workflow 3: Weekly Planning
```
Type entire week:
"Monday 9-5 work
Tuesday 9-5 work
Wednesday 9-5 work, 6-7 meeting
Thursday 9-5 work
Friday 9-5 work, 6-10 party"

Send + Save = All 6 events saved!
```

---

## ✨ What's Working Now

✅ Chat with AI  
✅ Schedule parsing  
✅ Event creation  
✅ Calendar display  
✅ Dual accounts  
✅ Local storage  
✅ Mobile responsive  
✅ Event persistence  

---

## 🚀 You're Ready!

Just open http://localhost:3000 and start using your calendar!

**The system is complete and fully functional.** 🎉

No setup needed. No credentials. No authentication.  
Just open, type, save, and enjoy! ✨

---

*Need help? Check:*
- **Quick questions:** QUICK_START.md
- **Detailed info:** CUSTOM_CALENDAR_GUIDE.md
- **Troubleshooting:** CALENDAR_DEBUG.md
- **What was fixed:** FIX_SUMMARY.md
