import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { parseScheduleFromText, createCalendarEventFromSchedule } from './schedule-parser.mjs';
import customCalendar from './custom-calendar.mjs';

// Load environment variables
dotenv.config();

// Read API key from environment or file
let apiKey;
if (process.env.GROQ_API_KEY) {
  apiKey = process.env.GROQ_API_KEY;
} else {
  try {
    apiKey = (await fs.readFile('./apikey.txt', 'utf8')).trim();
  } catch (e) {
    console.warn('⚠️ No API key found in apikey.txt or environment variables.');
  }
}

if (apiKey) {
  console.log('🔑 API Key loaded:', apiKey.substring(0, 10) + '...');
}
console.log('✓ Using Groq API for responses');
console.log('📅 Simple Custom Calendar - No Authentication Required!');

// Initialize custom calendar
await customCalendar.init();

// Parse request body
async function parseBody(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }
  return JSON.parse(body || '{}');
}


// Helper function to parse query string
function parseQuery(queryString) {
  const query = {};
  if (queryString) {
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      query[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
  }
  return query;
}

// Main request handler
export const requestHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    // Serve HTML on GET /
    if (req.method === 'GET' && req.url === '/') {
      const html = await fs.readFile('./public/index.html', 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }

    // Google OAuth callback - REMOVED (using custom calendar instead)
    if (req.method === 'GET' && req.url.startsWith('/auth/callback')) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end(`<html><body><h1>⚠️  Not using Google OAuth</h1><p>This app now uses a custom calendar system. No authentication needed!</p><a href="/">Go back</a></body></html>`);
      return;
    }

    // Get OAuth login URL - REMOVED (using custom calendar instead)
    if (req.method === 'GET' && req.url.startsWith('/auth/login')) {
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Custom calendar active - no OAuth needed!' }));
      return;
    }

    // Check calendar status
    if (req.method === 'GET' && req.url === '/api/calendar/status') {
      try {
        const stats = await customCalendar.getStats();

        res.writeHead(200);
        res.end(JSON.stringify({
          connected: true,
          system: 'custom-calendar',
          stats
        }));
        return;
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to get calendar status' }));
        return;
      }
    }

    // Get today's calendar events
    if (req.method === 'GET' && req.url.startsWith('/api/calendar/today')) {
      try {
        const today = new Date();
        const events = await customCalendar.getEventsByDate(today);

        if (events.length === 0) {
          res.writeHead(200);
          res.end(JSON.stringify({ reply: '📅 You have no events scheduled for today!' }));
          return;
        }

        const eventTexts = events.map(e => {
          const start = new Date(e.start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          return `${e.title} at ${start}`;
        });

        res.writeHead(200);
        res.end(JSON.stringify({
          reply: '📅 Your schedule for today:\n' + eventTexts.join('\n'),
          events: events
        }));
        return;
      } catch (err) {
        console.error('Calendar fetch error:', err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to fetch calendar events' }));
        return;
      }
    }

    // Save full schedule to custom calendar (Text based)
    if (req.method === 'POST' && req.url.startsWith('/api/calendar/save-schedule')) {
      const body = await parseBody(req);
      const { scheduleText } = body;

      if (!scheduleText) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Missing schedule text' }));
        return;
      }

      try {
        // Parse schedule
        const events = parseScheduleFromText(scheduleText);

        if (events.length === 0) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'No events found in schedule text' }));
          return;
        }

        const createdEvents = [];

        // Add all events to custom calendar
        for (const event of events) {
          try {
            const eventData = createCalendarEventFromSchedule(
              event.day,
              event.startTime,
              event.endTime,
              event.activity
            );

            const result = await customCalendar.addEvent({
              title: eventData.summary,
              start: eventData.start.dateTime,
              end: eventData.end.dateTime,
              description: eventData.description
            });

            createdEvents.push({
              day: event.day,
              activity: event.activity,
              time: `${event.startTime}-${event.endTime}`,
              id: result.id
            });
          } catch (err) {
            console.error(`Failed to create event for ${event.activity}:`, err.message);
          }
        }

        console.log(`✅ Saved ${createdEvents.length} events to calendar`);

        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          created: createdEvents.length,
          events: createdEvents,
          system: 'custom-calendar',
          reply: `✅ Added ${createdEvents.length} events to your calendar!`
        }));
        return;
      } catch (err) {
        console.error('Schedule save error:', err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to save schedule: ' + err.message }));
        return;
      }
    }

    // NEW: Batch add events directly (JSON)
    if (req.method === 'POST' && req.url === '/api/calendar/events') {
      const body = await parseBody(req);
      const { events } = body;

      if (!Array.isArray(events)) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'events array required' }));
        return;
      }

      try {
        const created = await customCalendar.addSchedule(events);
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, count: created.length }));
        return;
      } catch (err) {
        console.error('Batch add error:', err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
    }

    // NEW: Clear calendar endpoint
    if (req.method === 'DELETE' && req.url === '/api/calendar/clear') {
      try {
        await customCalendar.clearAll();
        res.writeHead(200);
        res.end(JSON.stringify({ success: true }));
        return;
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
    }


    // Handle API requests


    // Handle API requests
    if (req.method === 'POST' && req.url === '/api/generate') {
      const body = await parseBody(req);
      let mode = body.mode || 'schedule';
      let prompt = body.prompt?.trim();
      let shouldAddToCalendar = body.addToCalendar || false;

      if (!prompt) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'missing prompt' }));
        return;
      }

      // Define System Prompts
      const SYSTEM_PROMPTS = {
        schedule: 'You are a helpful Schedule Assistant. Be concise and practical. When suggesting tasks or events, format them clearly using the pattern "**Day:** HH:MM-HH:MM Activity". Format time as HH:MM (24-hour). IMPORTANT: Always calculate and explicitly mention the "Free Time" gaps in the schedule (hours where nothing is planned).',
        nutrition: 'You are a professional Nutritionist. RETURN JSON ONLY. Structure: { "html_response": "..." }. Content Rule: Start with a big, bold summary line like "2500 Calories • 180g Protein • 250g Carbs • 80g Fat". Then, strictly provide a "Daily Meal Example" section listing exactly what to eat (Breakfast, Lunch, Dinner, Snacks) with specific portions (e.g., "200g Chicken Breast"). Keep it simple, clean text only (no markdown symbols like * or #).',
        training: 'You are an expert Personal Trainer. PRECISE FORMAT REQUIRED. RETURN JSON ONLY. Output format: { "html_response": "...", "schedule": [...] }. CONTENT RULES: 1. "html_response": Start DIRECTLY with the header "**Workout Schedule**". Do NOT write an Overview or Introduction. Then, LIST EVERY DAY clearly using this format: "**Monday:** Warm-up 5 mins, Bench Press 3x10... Cool-down 5 mins". Use \\n for line breaks. 2. "schedule" Array: Must include "details" string for each day with the same full vertical list. Example object: { "day": "Monday", "activity": "Chest", "details": "Warm-up...\\nBench...\\nCool-down...", "start_time": "18:00", "duration_minutes": 60 }.'
      };
      const systemContent = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.schedule;

      // Call Groq API with retry logic (actual AI responses)
      let response;
      let attempts = 0;
      const maxAttempts = 3;

      while (attempts < maxAttempts) {
        attempts++;
        try {
          response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              response_format: { type: (mode === 'nutrition' || mode === 'training') ? 'json_object' : 'text' },
              messages: [
                {
                  role: 'system',
                  content: systemContent
                },
                { role: 'user', content: prompt }
              ],
              temperature: 0.7,
              max_tokens: 1024
            })
          });

          if (response.ok) {
            break; // Success - exit retry loop
          }

          if (response.status === 503 || response.status === 429) {
            if (attempts < maxAttempts) {
              console.log(`Attempt ${attempts}: API busy, retrying in 2 seconds...`);
              await new Promise(r => setTimeout(r, 2000));
              continue;
            }
          } else {
            break; // Non-recoverable error
          }
        } catch (err) {
          console.error(`Attempt ${attempts} error:`, err.message);
          if (attempts < maxAttempts) {
            await new Promise(r => setTimeout(r, 2000));
            continue;
          }
        }
      }

      if (!response || !response.ok) {
        const statusText = response ? `${response.status} ${response.statusText}` : 'Network error';
        const errorBody = response ? await response.text() : '';
        console.error('❌ Groq API Error:', statusText);
        console.error('Error details:', errorBody);

        res.writeHead(200);
        res.end(JSON.stringify({
          reply: `I'm temporarily unable to respond (${statusText}). Please try again in a moment!`,
          note: 'API unavailable',
          debug: errorBody
        }));
        return;
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'I couldn\'t generate a response. Please try again!';

      res.writeHead(200);
      res.end(JSON.stringify({
        reply
      }));
      return;
    }

    // Get saved schedule events
    if (req.method === 'GET' && req.url.startsWith('/api/calendar/saved-events')) {
      try {
        const events = await customCalendar.getEvents();
        res.writeHead(200);
        res.end(JSON.stringify({
          events,
          count: events.length,
          reply: events.length > 0
            ? `📅 You have ${events.length} saved events:\n${events.map((e, i) => `${i + 1}. ${e.title} - ${new Date(e.start).toLocaleString()}`).join('\n')}`
            : '📅 No saved events yet.'
        }));
        return;
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to fetch events' }));
        return;
      }
    }

  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'server-error', message: error.message }));
  }
};

const server = http.createServer(requestHandler);

// Only listen if run directly (not imported as a module for Vercel)
if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  server.listen(3000, () => {
    console.log('✓ Server running at http://localhost:3000');
  });
}
