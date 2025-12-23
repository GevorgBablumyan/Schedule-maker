import express from 'express';
import { parseScheduleFromText, createCalendarEventFromSchedule } from '../schedule-parser.mjs';
import customCalendar from '../custom-calendar.mjs';

const router = express.Router();

// Initialize custom calendar (idempotent)
// We'll call this in app init, but good to ensure
// await customCalendar.init(); 

// Check calendar status
router.get('/status', async (req, res) => {
    try {
        const stats = await customCalendar.getStats();
        res.json({
            connected: true,
            system: 'custom-calendar',
            stats
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get calendar status' });
    }
});

// Get today's calendar events
router.get('/today', async (req, res) => {
    try {
        const today = new Date();
        const events = await customCalendar.getEventsByDate(today);

        if (events.length === 0) {
            return res.json({ reply: '📅 You have no events scheduled for today!', events: [] });
        }

        const eventTexts = events.map(e => {
            const start = new Date(e.start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
            return `${e.title} at ${start}`;
        });

        res.json({
            reply: '📅 Your schedule for today:\n' + eventTexts.join('\n'),
            events: events
        });
    } catch (err) {
        console.error('Calendar fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch calendar events' });
    }
});

// Save full schedule to custom calendar (Text based)
router.post('/save-schedule', async (req, res) => {
    const { scheduleText } = req.body;

    if (!scheduleText) {
        return res.status(400).json({ error: 'Missing schedule text' });
    }

    try {
        // Parse schedule
        const events = parseScheduleFromText(scheduleText);

        if (events.length === 0) {
            return res.status(400).json({ error: 'No events found in schedule text' });
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

        res.json({
            success: true,
            created: createdEvents.length,
            events: createdEvents,
            system: 'custom-calendar',
            reply: `✅ Added ${createdEvents.length} events to your calendar!`
        });
    } catch (err) {
        console.error('Schedule save error:', err);
        res.status(500).json({ error: 'Failed to save schedule: ' + err.message });
    }
});

// Batch add events directly (JSON)
router.post('/events', async (req, res) => {
    const { events } = req.body;

    if (!Array.isArray(events)) {
        return res.status(400).json({ error: 'events array required' });
    }

    try {
        const created = await customCalendar.addSchedule(events);
        res.json({ success: true, count: created.length });
    } catch (err) {
        console.error('Batch add error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Clear calendar endpoint
router.delete('/clear', async (req, res) => {
    try {
        await customCalendar.clearAll();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get saved schedule events
router.get('/saved-events', async (req, res) => {
    try {
        const events = await customCalendar.getEvents();
        res.json({
            events,
            count: events.length,
            reply: events.length > 0
                ? `📅 You have ${events.length} saved events:\n${events.map((e, i) => `${i + 1}. ${e.title} - ${new Date(e.start).toLocaleString()}`).join('\n')}`
                : '📅 No saved events yet.'
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

export default router;
