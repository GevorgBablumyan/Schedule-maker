// Mock Google Calendar for testing without OAuth
// This saves events to a JSON file so you can see them

export async function saveMockCalendarEvent(eventData, filePath = './mock-calendar-events.json') {
  try {
    let events = [];
    try {
      const data = await import('fs/promises').then(fs => fs.readFile(filePath, 'utf8'));
      events = JSON.parse(data);
    } catch (e) {
      // File doesn't exist yet
      events = [];
    }

    events.push({
      ...eventData,
      createdAt: new Date().toISOString()
    });

    const fs = await import('fs/promises');
    await fs.writeFile(filePath, JSON.stringify(events, null, 2));
    
    return { success: true, id: eventData.summary + '-' + Date.now() };
  } catch (err) {
    console.error('Mock calendar save error:', err);
    throw err;
  }
}

export async function getMockCalendarEvents(filePath = './mock-calendar-events.json') {
  try {
    const fs = await import('fs/promises');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}
