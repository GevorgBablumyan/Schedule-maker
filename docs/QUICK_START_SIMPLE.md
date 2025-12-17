# 🚀 Quick Start - Simple Calendar (No Emails!)

## Status: ✅ READY TO USE!

Your simple calendar is ready. **NO EMAILS. NO ACCOUNTS. JUST EVENTS.**

---

## 📖 How to Use in 5 Steps

### 1️⃣ Open Website
Go to: **http://localhost:3000**

### 2️⃣ Type Your Schedule
In the LEFT chat box, type:
```
Monday 9:30-15:40 College, 19:00-21:00 Gym
```

### 3️⃣ Click SEND
Wait 5-10 seconds for AI response

### 4️⃣ Click "📅 Save to Calendar"
Save to your calendar

### 5️⃣ View Events
RIGHT panel shows all your events! ✅

---

## ✨ Examples

**Simple schedule:**
```
Monday 9:30-15:40 College
```

**Multiple times:**
```
Monday 9:30-15:40 College, 19:00-21:00 Gym
```

**Multiple days:**
```
Monday 9:30-15:40 College
Tuesday 10:00-12:00 Meeting
Wednesday 14:00-15:00 Gym
```

---

## 📝 Format Rules

✅ **Use 24-hour time:**
- `15:40` (3:40 PM) ✅
- `3:40` ❌ Won't work

✅ **Include day name:**
- `Monday 9:30-15:40` ✅
- `9:30-15:40` ⚠️ Less clear

✅ **Separate with commas:**
- `9:30-15:40 College, 19:00-21:00 Gym` ✅

---

## 🔧 Server Commands

**Start:**
```bash
node server.mjs
```

**Stop:**
```bash
pkill -9 node
```

**Test:**
```bash
node test-calendar-save.mjs
```

---

## 📁 Files

- `index.html` - The calendar app
- `server.mjs` - Backend
- `custom-calendar.mjs` - Calendar storage
- `schedule-parser.mjs` - Parses schedule text
- `calendars/events.json` - Your events (single file!)

---

## 🎯 Key Changes from Before

✅ **Removed:** All email logic  
✅ **Removed:** Account switcher buttons  
✅ **Removed:** Multiple calendar files  
✅ **Added:** Simple single calendar  
✅ **Added:** Clean file storage  

---

## 🎉 That's It!

Open http://localhost:3000 and start using your calendar!

**No setup. No credentials. No complications.**

Just add events and enjoy! ✨
