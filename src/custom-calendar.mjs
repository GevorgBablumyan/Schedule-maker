import fs from 'fs/promises';
import path from 'path';

/**
 * Custom Calendar System - Simple Single-User Calendar
 * No email or authentication required
 */

const CALENDAR_FILE = process.env.VERCEL ? '/tmp/events.json' : './calendars/events.json';
const CALENDAR_DIR = process.env.VERCEL ? '/tmp' : './calendars';

class CustomCalendar {
  constructor() {
    this.calendarFile = CALENDAR_FILE;
    this.calendarDir = CALENDAR_DIR;
  }

  /**
   * Initialize calendar directory
   */
  async init() {
    try {
      await fs.mkdir(this.calendarDir, { recursive: true });
    } catch (error) {
      console.error('Error creating calendar directory:', error);
    }
  }

  /**
   * Load all events
   */
  async getEvents() {
    try {
      const data = await fs.readFile(this.calendarFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, return empty array
      return [];
    }
  }

  /**
   * Get events for a specific date
   */
  async getEventsByDate(date) {
    const allEvents = await this.getEvents();
    return allEvents.filter(event => {
      const eventDate = new Date(event.start).toDateString();
      return eventDate === new Date(date).toDateString();
    });
  }

  /**
   * Get events for a date range
   */
  async getEventsByDateRange(startDate, endDate) {
    const allEvents = await this.getEvents();
    const start = new Date(startDate);
    const end = new Date(endDate);

    return allEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate >= start && eventDate <= end;
    }).sort((a, b) => new Date(a.start) - new Date(b.start));
  }

  /**
   * Add a single event
   */
  async addEvent(eventData) {
    try {
      const events = await this.getEvents();

      const newEvent = {
        id: Date.now().toString(),
        title: eventData.title || 'Untitled',
        start: eventData.start,
        end: eventData.end,
        description: eventData.description || '',
        color: eventData.color || '#4285F4',
        createdAt: new Date().toISOString()
      };

      events.push(newEvent);
      await this.saveEvents(events);

      return newEvent;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }

  /**
   * Add multiple events from schedule
   */
  async addSchedule(scheduleEvents) {
    try {
      const events = await this.getEvents();
      const newEvents = [];

      for (const eventData of scheduleEvents) {
        const newEvent = {
          id: Date.now().toString() + Math.random(),
          title: eventData.title || eventData.activity || 'Untitled',
          start: new Date(eventData.start).toISOString(),
          end: new Date(eventData.end).toISOString(),
          description: eventData.description || '',
          color: eventData.color || '#4285F4',
          createdAt: new Date().toISOString()
        };

        events.push(newEvent);
        newEvents.push(newEvent);
      }

      await this.saveEvents(events);
      return newEvents;
    } catch (error) {
      console.error('Error adding schedule:', error);
      throw error;
    }
  }

  /**
   * Update an event
   */
  async updateEvent(eventId, updates) {
    try {
      const events = await this.getEvents();
      const eventIndex = events.findIndex(e => e.id === eventId);

      if (eventIndex === -1) {
        throw new Error('Event not found');
      }

      events[eventIndex] = { ...events[eventIndex], ...updates };
      await this.saveEvents(events);
      return events[eventIndex];
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  /**
   * Delete an event
   */
  async deleteEvent(eventId) {
    try {
      const events = await this.getEvents();
      const filteredEvents = events.filter(e => e.id !== eventId);

      if (filteredEvents.length === events.length) {
        throw new Error('Event not found');
      }

      await this.saveEvents(filteredEvents);
      return { success: true, message: 'Event deleted' };
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  /**
   * Save events to file
   */
  async saveEvents(events) {
    try {
      await this.init();
      await fs.writeFile(this.calendarFile, JSON.stringify(events, null, 2));
    } catch (error) {
      console.error('Error saving events:', error);
      throw error;
    }
  }

  /**
   * Get calendar statistics
   */
  async getStats() {
    try {
      const events = await this.getEvents();
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

      const todayEvents = events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= todayStart && eventDate < todayEnd;
      });

      return {
        total: events.length,
        today: todayEvents.length,
        upcoming: events.length
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return { total: 0, today: 0, upcoming: 0 };
    }
  }

  /**
   * Clear all events (useful for testing)
   */
  async clearAll() {
    try {
      await this.saveEvents([]);
      return { success: true, message: 'Calendar cleared' };
    } catch (error) {
      console.error('Error clearing calendar:', error);
      throw error;
    }
  }
}

// Export as default singleton
const calendar = new CustomCalendar();
export default calendar;
