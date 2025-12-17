# Google Calendar Integration Plan

## Overview
Integrate Gemini chatbot responses with Google Calendar to automatically create events, tasks, or reminders based on what the bot outputs.

---

## Integration Methods (Easiest to Most Complex)

### **Option 1: Add Event Button (EASIEST) ⭐**
**Complexity:** Low | **Time:** 30 minutes  
**What it does:** Add a "📅 Save to Calendar" button that lets user manually save bot responses as calendar events.

**How it works:**
1. User asks: "Remind me to call John tomorrow at 2pm"
2. Bot responds: "I'll help you set a reminder..."
3. User clicks "📅 Save" button
4. Opens Google Calendar create dialog with pre-filled info
5. User confirms and event is created

**Implementation:**
```html
<button onclick="saveToCalendar()">📅 Save to Calendar</button>
```

```javascript
function saveToCalendar() {
  const response = document.querySelector('.msg.bot:last-child')?.textContent;
  if (!response) return;
  
  // Opens Google Calendar new event page with text pre-filled
  const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(response)}`;
  window.open(url, '_blank');
}
```

**Pros:** ✅ Super simple, no authentication needed, user has control  
**Cons:** ❌ Manual process, user must confirm each time

---

### **Option 2: Parse Response & Auto-Create Events (MODERATE) ⭐⭐**
**Complexity:** Medium | **Time:** 2-3 hours  
**What it does:** Automatically detect dates/times in responses and create calendar events.

**How it works:**
1. Bot response: "Meeting with John on Dec 20 at 3pm"
2. Server parses response for dates/times using NLP
3. Auto-creates event in Google Calendar via API
4. Shows notification: "✅ Event created: Meeting with John"

**Implementation:**
```javascript
// Parse response for date/time patterns
function extractDateTime(text) {
  const patterns = [
    /tomorrow at (\d{1,2}(?:am|pm))/i,
    /(\w+day) at (\d{1,2}:\d{2}(?:am|pm))/i,
    /(\d{1,2})\/(\d{1,2})\/(\d{4}) at (\d{1,2}:\d{2})/
  ];
  // ... parsing logic
}
```

**Pros:** ✅ Automatic, smarter, no extra clicks  
**Cons:** ❌ Requires Google Calendar API OAuth setup, parsing is tricky

---

### **Option 3: Full AI-Powered Calendar Assistant (ADVANCED) ⭐⭐⭐**
**Complexity:** High | **Time:** 4-6 hours  
**What it does:** Gemini understands calendar context and directly creates events.

**How it works:**
1. User: "Add lunch with Sarah next Tuesday at noon"
2. Gemini talks to Google Calendar API
3. Creates event automatically
4. Responds: "✅ Added 'Lunch with Sarah' for next Tuesday at 12pm"

**Requires:**
- Google Calendar API authentication
- Server-side OAuth flow
- Gemini can read calendar context
- Natural language event extraction

---

## Recommended: **Option 2 (Best Balance)**

Here's how to implement it step-by-step:

### **Step 1: Add Google Calendar API OAuth to server.mjs**

```javascript
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/auth/callback'
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
```

### **Step 2: Add OAuth Login Button to UI**

```html
<button id="loginBtn">🔐 Connect Google Calendar</button>
```

### **Step 3: Parse Response & Extract Events**

```javascript
async function extractAndCreateEvent(response) {
  const eventInfo = parseResponse(response);
  if (!eventInfo) return;
  
  const event = {
    summary: eventInfo.title,
    start: { dateTime: eventInfo.startTime },
    end: { dateTime: eventInfo.endTime },
    description: response
  };
  
  await fetch('/api/create-event', {
    method: 'POST',
    body: JSON.stringify(event)
  });
}
```

---

## Implementation Roadmap

```
Phase 1 (TODAY - 30 min):
├── Add "Save to Calendar" button (Option 1)
├── Opens Google Calendar in new tab
└── User manually creates event

Phase 2 (OPTIONAL - 2-3 hours):
├── Setup Google Calendar API credentials
├── Add OAuth login
├── Parse response for dates/times
└── Auto-create events via API

Phase 3 (ADVANCED - 4-6 hours):
├── Use Gemini to extract structured event data
├── Validate parsed events
├── Add error handling & confirmations
└── Read user's calendar for conflict detection
```

---

## Setup Instructions (Option 2 - Full Integration)

### **1. Create Google Cloud Project**

```bash
# Visit: https://console.cloud.google.com
# 1. Create new project
# 2. Enable "Google Calendar API"
# 3. Create OAuth 2.0 credentials (Web application)
#    - Authorized redirect URI: http://localhost:3000/auth/callback
# 4. Download credentials → save as google-credentials.json
```

### **2. Install Dependencies**

```bash
npm install googleapis google-auth-library
```

### **3. Update server.mjs**

Add OAuth endpoints:
```javascript
// Handle OAuth callback
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.send('✅ Google Calendar connected!');
});

// Create calendar event endpoint
app.post('/api/create-event', async (req, res) => {
  const event = req.body;
  const result = await calendar.events.insert({
    calendarId: 'primary',
    resource: event
  });
  res.json({ success: true, eventId: result.data.id });
});
```

### **4. Update index.html**

Add buttons:
```html
<button onclick="connectCalendar()">🔐 Connect Calendar</button>
<button onclick="autoCreateEvent()">📅 Auto-Save Event</button>
```

---

## Quick Start (Option 1 - Simplest)

Want to start TODAY? Use this super simple approach:

```javascript
function saveToCalendar() {
  const msgs = document.querySelectorAll('.msg');
  const lastBot = Array.from(msgs).reverse().find(m => m.classList.contains('bot'));
  
  if (!lastBot) {
    alert('No bot response to save');
    return;
  }
  
  const text = lastBot.textContent;
  const calendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(text)}`;
  window.open(calendarUrl, '_blank');
}
```

Add button to index.html:
```html
<button onclick="saveToCalendar()" style="background: #4CAF50;">📅 Save to Calendar</button>
```

**That's it! Takes 5 minutes to implement.**

---

## Environment Variables Needed

```bash
# For Option 2 (Full Integration):
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALENDAR_API_KEY=your_api_key
```

---

## Which Option Should You Choose?

| Need | Complexity | Time | Best For |
|------|-----------|------|----------|
| **Quick demo** | Low | 5 min | Option 1 |
| **Real usage** | Medium | 2-3 hrs | Option 2 |
| **Production app** | High | 4-6 hrs | Option 3 |

---

## Questions to Guide Decision

1. **Do you want users to manually approve each event?**  
   → Yes = Option 1  
   → No = Option 2/3

2. **Do you have Google API credentials ready?**  
   → No = Option 1  
   → Yes = Option 2/3

3. **Do you want Gemini to understand calendar context?**  
   → No = Option 2  
   → Yes = Option 3

---

Would you like me to implement:
- ✅ **Option 1** (5-minute quick add)
- ✅ **Option 2** (Full OAuth + parsing)
- ✅ **Option 3** (Advanced with context)

Let me know! 🎯
