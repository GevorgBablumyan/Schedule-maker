# Architecture Diagram - Gemini Chatbot

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER / BROWSER                               │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    project.html                              │  │
│  │                  (Chat UI - Frontend)                        │  │
│  │                                                              │  │
│  │  ┌────────────────┐        ┌─────────────────┐             │  │
│  │  │  Chat Box      │        │  User Input     │             │  │
│  │  │  (messages)    │        │  + Send Button  │             │  │
│  │  └────────────────┘        └─────────────────┘             │  │
│  │                                    ▲                        │  │
│  │                                    │                        │  │
│  └────────────────────────────────────┼────────────────────────┘  │
│                                       │                            │
│                      script.js (Client-side Logic)                 │
│                      - addMessage()                                │
│                      - sendMessage()                               │
│                      - fetch(/api/generate)                        │
│                                       │                            │
│                                       │ HTTP POST                  │
│                                       ▼                            │
└──────────────────────────────────────────────────────────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                │                                             │
                ▼                                             ▼
        ┌──────────────────┐                        ┌─────────────────┐
        │  Static Files    │                        │   API Proxy     │
        │                  │                        │                 │
        │ - project.html   │                        │ /api/generate   │
        │ - script.js      │                        │                 │
        │ - style.css      │                        │ handleApiGenerate()
        │                  │                        │                 │
        └──────────────────┘                        └─────────────────┘
                │                                             │
                │                                             │
                └──────────────────┬──────────────────────────┘
                                   │
                        ┌──────────┴──────────┐
                        │                     │
                        ▼                     ▼
        ┌───────────────────────┐  ┌──────────────────────────┐
        │   server.mjs          │  │   Routes                 │
        │   (Node.js Server)    │  │                          │
        │                       │  │  GET /                   │
        │ - HTTP Server         │  │  → project.html          │
        │ - Port 3000           │  │                          │
        │ - Routes requests     │  │  POST /api/generate      │
        │ - Error handling      │  │  → Proxy to Gemini API   │
        │                       │  │                          │
        └───────────────────────┘  └──────────────────────────┘
                │
                │ 1. Read API Key
                │ 2. Validate prompt
                ▼
        ┌──────────────────────────┐
        │  apikey.txt              │
        │                          │
        │ (API Key Storage)        │
        │ - Securely stored        │
        │ - Read at startup        │
        │ - Never exposed to client│
        │                          │
        └──────────────────────────┘
                │
                │ 3. Forward request with API key
                ▼
        ┌────────────────────────────────────────┐
        │  Gemini API (Google Cloud)             │
        │                                        │
        │  Endpoint:                             │
        │  https://generativelanguage.googleapis │
        │  .com/v1/models/gemini-2.5-flash:     │
        │  generateContent?key={API_KEY}        │
        │                                        │
        │  Request body:                         │
        │  {                                     │
        │    "generationConfig": {               │
        │      "temperature": 0.7,               │
        │      "maxOutputTokens": 512            │
        │    },                                  │
        │    "contents": [{                      │
        │      "role": "user",                   │
        │      "parts": [{"text": "prompt"}]    │
        │    }]                                  │
        │  }                                     │
        │                                        │
        │  Model: gemini-2.5-flash              │
        │  - Fast inference                     │
        │  - Good quality                       │
        │  - Cost-effective                     │
        │                                        │
        └────────────────────────────────────────┘
                │
                │ 4. Return response
                ▼
        ┌────────────────────────────────────────┐
        │  API Response (JSON)                   │
        │                                        │
        │  {                                     │
        │    "candidates": [{                    │
        │      "content": {                      │
        │        "parts": [{                     │
        │          "text": "Model response..."   │
        │        }]                              │
        │      }                                 │
        │    }]                                  │
        │  }                                     │
        │                                        │
        └────────────────────────────────────────┘
                │
                │ 5. Parse & return to client
                │ Extract: candidates[0].content.parts[0].text
                ▼
        ┌────────────────────────────────────────┐
        │  HTTP Response (200 OK)                │
        │                                        │
        │  {                                     │
        │    "reply": "Model response text..."  │
        │  }                                     │
        │                                        │
        └────────────────────────────────────────┘
                │
                │ HTTP Response
                ▼
        ┌────────────────────────────────────────┐
        │  Browser (script.js)                   │
        │                                        │
        │  1. Receive JSON response              │
        │  2. Extract reply field                │
        │  3. Call addMessage(reply, 'bot')     │
        │  4. Display in chat box                │
        │                                        │
        └────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
User Interaction:
┌─────────────────────────────────────────────────────────────────┐
│ 1. User types message in browser                               │
│ 2. Clicks "Send" button                                        │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ script.js: sendMessage()                                        │
│                                                                 │
│ - Get text from input field                                    │
│ - Display message in chat (addMessage(msg, 'user'))           │
│ - Clear input field                                            │
│ - Build JSON: { prompt: message }                             │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ HTTP POST /api/generate                                        │
│ Content-Type: application/json                                 │
│ Body: { "prompt": "user message" }                            │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ server.mjs: handleApiGenerate()                                │
│                                                                 │
│ 1. Parse request body                                          │
│ 2. Extract prompt                                              │
│ 3. Read API key from apikey.txt                               │
│ 4. Validate credentials exist                                  │
│ 5. Build Gemini API request body:                             │
│    {                                                           │
│      "generationConfig": { ... },                             │
│      "contents": [{ "role": "user", "parts": [...] }]        │
│    }                                                           │
│ 6. Send POST to Gemini API endpoint                           │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ Gemini API (Google Cloud)                                      │
│                                                                 │
│ Processes request with gemini-2.5-flash model                 │
│ Generates response text                                        │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ API Response (JSON)                                            │
│ {                                                              │
│   "candidates": [{                                            │
│     "content": {                                              │
│       "parts": [{                                            │
│         "text": "Generated response from Gemini"             │
│       }]                                                      │
│     }                                                         │
│   }]                                                          │
│ }                                                             │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ server.mjs: Parse response                                     │
│                                                                 │
│ - Extract: data.candidates[0].content.parts[0].text          │
│ - Build response: { "reply": "text..." }                      │
│ - Return HTTP 200 OK with JSON                                │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ HTTP Response (200 OK)                                         │
│ { "reply": "Generated response..." }                          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ script.js: Handle response                                     │
│                                                                 │
│ - Receive JSON response                                        │
│ - Check if response.ok                                        │
│ - Extract data.reply                                          │
│ - Call addMessage(reply, 'bot')                              │
│ - Display bot message in chat box                             │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ User sees bot response in chat interface                       │
│ Can continue typing and send more messages                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
/Users/user/Desktop/Lesson1/
│
├── server.mjs                 ← Node.js HTTP server (main)
│                              - Listens on port 3000
│                              - Routes static files
│                              - Proxies API requests
│
├── project.html               ← Web UI (frontend)
│                              - Chat interface
│                              - Input form
│                              - Message display
│
├── script.js                  ← Client-side logic
│                              - Event handlers
│                              - API calls
│                              - Message rendering
│
├── style.css                  ← UI styling
│                              - Chat box styling
│                              - Message formatting
│                              - Responsive design
│
├── package.json               ← Node.js config
│                              - Project metadata
│                              - Type: "module" (ESM)
│
├── apikey.txt                 ← API Key (SENSITIVE)
│                              - Stored securely
│                              - Never exposed to browser
│                              - Read by server only
│
├── index.mjs                  ← CLI alternative
│                              - Command-line interface
│                              - Interactive mode
│
├── list_models.mjs            ← Helper utility
│                              - Lists available models
│
├── test_request.mjs           ← Testing script
│                              - Manual API testing
│
├── README.md                  ← Documentation
│
└── ARCHITECTURE.md            ← This file
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ SECURITY LAYERS                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Browser (Insecure for secrets)                              │
│ ❌ No API key visible to user                               │
│ ❌ No direct calls to external APIs                         │
│ ✓ Only communicates with local server                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Local Server (Secure)                                       │
│ ✓ API key protected (never sent to browser)                │
│ ✓ Validates all requests                                    │
│ ✓ Filters malicious input                                   │
│ ✓ Handles authentication                                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ External API (Google Cloud)                                 │
│ ✓ HTTPS/TLS encryption in transit                          │
│ ✓ API key validation on server side                         │
│ ✓ Rate limiting                                             │
│ ✓ Audit logging                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Interaction

```
┌─────────┐
│ Browser │
└────┬────┘
     │
     │ (1) sendMessage()
     │     event: onclick
     ▼
┌──────────────┐
│  script.js   │
│              │
│ - Collects   │
│ - Validates  │
│ - Formats    │
└────┬─────────┘
     │
     │ (2) fetch('/api/generate', {
     │        method: 'POST',
     │        body: JSON.stringify({
     │          prompt: message
     │        })
     │      })
     ▼
┌─────────────────────────────────────┐
│        server.mjs                   │
│                                     │
│ ┌────────────────────────────────┐ │
│ │ handleApiGenerate()            │ │
│ │                                │ │
│ │ (3) Parse request              │ │
│ │ (4) Read apikey.txt            │ │
│ │ (5) Validate auth              │ │
│ │ (6) Build Gemini request       │ │
│ └─────────┬──────────────────────┘ │
│           │                        │
│ ┌─────────▼──────────────────────┐ │
│ │ HTTP Client (fetch)            │ │
│ │                                │ │
│ │ (7) POST to Gemini API         │ │
│ │     with API key in URL        │ │
│ └─────────┬──────────────────────┘ │
│           │                        │
│ ┌─────────▼──────────────────────┐ │
│ │ Response Parser                │ │
│ │                                │ │
│ │ (8) Parse JSON response        │ │
│ │ (9) Extract text               │ │
│ │ (10) Return { reply: "..." }   │ │
│ └────────────────────────────────┘ │
│                                     │
└─────────┬─────────────────────────────┘
          │
          │ (11) HTTP 200 + JSON
          ▼
┌──────────────────┐
│  script.js       │
│                  │
│ (12) resp.json() │
│ (13) .then()     │
│ (14) Display     │
└──────────────────┘
          │
          ▼
      Browser
      (Chat UI Updated)
```

---

## Key Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Server | Node.js (ESM) | HTTP server, API proxy |
| Frontend | HTML5 | Chat interface structure |
| Styling | CSS3 | Visual presentation |
| Client Logic | JavaScript | User interaction, API calls |
| API | Google Gemini API | Text generation |
| Protocol | HTTP/REST | Communication |
| Data Format | JSON | Request/response format |
| Storage | File System | API key storage |

---

## Request/Response Flow

### Successful Request:

```
Browser                    Server              Gemini API
   │                         │                     │
   ├─ POST /api/generate ─→  │                     │
   │   { prompt: "..." }     │                     │
   │                         ├─ POST with key ──→  │
   │                         │   { contents: [...] │
   │                         │   }                 │
   │                         │                     │
   │                         │  ← { candidates: [  │
   │                         │      { content: {   │
   │                         │        parts: [{     │
   │                         │          text: "..." │
   │                    ←────┤                     │
   │  { reply: "..." }       │                     │
   │                         │                     │
```

### Error Handling:

```
Browser              Server           Gemini API
   │                   │                  │
   ├─ POST ──→         │                  │
   │                   ├─ POST ──→        │
   │                   │                  ├─ Error
   │                   │    ← Error       │
   │    ← { error: "upstream", status: 400 }
   │
   User sees: "Error: upstream" with details
```

---

## Performance Considerations

```
┌─────────────────────────────────────────────┐
│ Optimization Points                         │
└─────────────────────────────────────────────┘

1. Static File Caching
   - HTML/CSS/JS served from local disk
   - Fast local access
   - No network latency

2. API Call Efficiency
   - Single request to Gemini per prompt
   - No redundant calls
   - Response parsed once

3. Temperature Control
   - temperature: 0.7 (balanced)
   - maxOutputTokens: 512 (reasonable limit)
   - Faster inference

4. Error Recovery
   - Fallback responses when offline
   - Graceful error messages
   - No crash on API failure
```

---

## Deployment Architecture

```
Development (Current):
┌──────────────┐
│   Localhost  │
│   :3000      │
│   (Desktop)  │
└──────────────┘

Production (Possible):
┌──────────────────┐      ┌─────────────┐
│  Cloud Server    │←────→│ Gemini API  │
│  (Heroku, AWS,   │      │ (Google)    │
│   GCP, etc.)     │      └─────────────┘
└──────────────────┘
     ↑
  Internet
     ↑
┌──────────────┐
│   Browser    │
│   (Anywhere) │
└──────────────┘
```

---

This architecture ensures:
✓ Security (API key never exposed to browser)
✓ Simplicity (Direct Node.js + REST calls)
✓ Scalability (Can be deployed to cloud)
✓ Maintainability (Clear separation of concerns)
✓ User Experience (Real-time chat interface)
