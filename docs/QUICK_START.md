# 🎯 QUICK START - Custom Calendar

## ✅ Everything is Ready!

Your custom calendar system is **built, configured, and running**.

Server Status: **✓ Running at http://localhost:3000**

---

## 🚀 3-Step Quick Start

### Step 1: Open the Website
```
http://localhost:3000
```

You should see:
- Left side: Chat box
- Right side: Calendar panel
- Top: Account buttons

### Step 2: Tell the AI Your Schedule
```
Type in chat box: 
"Monday 9:30am-3:40pm College, 7pm-9pm Gym"
Press Enter
```

### Step 3: Click Save
```
Button: "📅 Save to Calendar"
(Events appear in right panel!)
```

---

## 🎮 Interactive Demo

Try this exact text:
```
Monday: 9:30-15:40 College, 19:00-21:00 Gym
Tuesday: 10:00-16:00 Work, 17:00-18:30 Yoga
Wednesday: 9:30-15:40 College, 18:00-20:00 Study
```

Expected result:
- 6 events appear in calendar
- All with correct times and dates
- First account: gevorgbablumyan43@gmail.com

---

## 🔀 Switch Accounts

1. Click **"📧 Secondary"** button
2. Calendar clears (different account)
3. Type a new schedule
4. Click Save
5. Events appear for secondary account
6. Click **"📧 Primary"** to see original events

---

## 📁 Where is the Data Stored?

```
/Users/user/Desktop/Lesson1/calendars/
├── gevorgbablumyan43_gmail_com.json     (Primary)
└── gevorg_bablumyan_tumo_org.json        (Secondary)
```

Each file contains JSON events that persist forever.

---

## ❓ FAQ

**Q: Do I need Google account?**  
A: No! Everything works locally.

**Q: Can I use both emails?**  
A: Yes! Switch with the top buttons.

**Q: Will events be saved if I close the browser?**  
A: Yes! They're in JSON files, always saved.

**Q: Can I delete all events?**  
A: Yes, delete the JSON files in `calendars/` folder.

**Q: What if the server stops?**  
A: Run `node server.mjs` again in terminal.

**Q: Can I export my calendar?**  
A: Coming soon! For now, events are in JSON files.

---

## 📊 System Status

| Component | Status |
|-----------|--------|
| Server | ✅ Running |
| Chat (Groq API) | ✅ Working |
| Calendar Storage | ✅ Active |
| Primary Account | ✅ Ready |
| Secondary Account | ✅ Ready |
| UI | ✅ Loaded |

---

## 📚 Full Documentation

- **CUSTOM_CALENDAR_GUIDE.md** - Complete features & API guide
- **IMPLEMENTATION_COMPLETE.md** - Technical details & architecture
- **schedule-parser.mjs** - How schedules are converted to events
- **custom-calendar.mjs** - Storage engine documentation

---

## 🎉 You're All Set!

Just open http://localhost:3000 and start using your custom calendar!

No setup. No authentication. No credentials. **Just works!**

---

**Pro Tips:**
- Use 24-hour time format: `9:30` not `9:30am`
- Include day names: `Monday`, `Tuesday`, etc.
- Use hyphens for times: `9:30-15:40` (start-end)
- One activity per time slot works best

**Example that works best:**
```
Monday: 9:30-15:40 College, 19:00-21:00 Gym
Tuesday: 10:00-16:00 Work
```

**Ready?** → **http://localhost:3000** ✨
