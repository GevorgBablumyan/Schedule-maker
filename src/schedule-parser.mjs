// schedule-parser.mjs
// Parse schedule text and extract events

export function parseScheduleFromText(text) {
  const events = [];

  // Days of week
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Split text into lines
  const lines = text.split('\n');
  let currentDay = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase().trim();

    // Check if line contains a day name
    for (const day of days) {
      if (lowerLine.includes(day)) {
        currentDay = day;
        break;
      }
    }

    // IMPORTANT: Don't skip - process the line for times even if it contains a day name
    // This allows "Monday 9:30-15:40 College" to work

    // Look for time patterns: HH:MM - HH:MM
    const timeMatches = [...line.matchAll(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/g)];

    for (const timeMatch of timeMatches) {
      const startHour = parseInt(timeMatch[1]);
      const startMin = parseInt(timeMatch[2]);
      const endHour = parseInt(timeMatch[3]);
      const endMin = parseInt(timeMatch[4]);
      // Extract activity text after the time
      const timeEndIndex = timeMatch.index + timeMatch[0].length;
      let textAfter = line.substring(timeEndIndex).trim();

      // Clean up the text
      textAfter = textAfter
        .replace(/^[\s:\-,;•*]+/, '')
        .replace(/\*\*.*?\*\*/g, '') // Remove markdown bold
        .trim();

      // Get the activity - take first part before comma or asterisk
      let activity = textAfter.split(/[,;*]/)[0].trim() || 'Activity';

      // Clean up asterisks and special formatting
      activity = activity.replace(/\*/g, '').trim();

      const effectiveDay = currentDay || new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

      if (activity && activity.length > 0) {
        events.push({
          day: effectiveDay,
          startTime: `${startHour.toString().padStart(2, '0')}:${startMin.toString().padStart(2, '0')}`,
          endTime: `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`,
          activity: activity.substring(0, 100) // Limit length
        });
      }
    }
  }

  return events;
}

export function createCalendarEventFromSchedule(day, startTime, endTime, activity) {
  const dayMap = {
    'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4,
    'friday': 5, 'saturday': 6, 'sunday': 0
  };

  // Get next occurrence of this day
  const today = new Date();
  const targetDay = dayMap[day.toLowerCase()];
  const daysUntil = (targetDay - today.getDay() + 7) % 7;
  const nextDate = new Date(today);
  nextDate.setDate(nextDate.getDate() + daysUntil);

  // Parse time
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  const startDateTime = new Date(nextDate);
  startDateTime.setHours(startHour, startMin, 0);

  const endDateTime = new Date(nextDate);
  endDateTime.setHours(endHour, endMin, 0);

  return {
    summary: activity,
    description: `Auto-scheduled: ${day} ${startTime}-${endTime}`,
    start: { dateTime: startDateTime.toISOString() },
    end: { dateTime: endDateTime.toISOString() }
  };
}
