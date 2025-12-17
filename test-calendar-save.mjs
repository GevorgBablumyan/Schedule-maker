import { parseScheduleFromText, createCalendarEventFromSchedule } from './schedule-parser.mjs';
import customCalendar from './custom-calendar.mjs';

// Test the calendar save functionality (server running separately)
async function test() {
  console.log('🧪 Testing simplified calendar system...\n');
  
  // Initialize
  await customCalendar.init();
  
  // Test schedule text
  const scheduleText = "Monday 9:30-15:40 College, 19:00-21:00 Gym";
  
  console.log(`📝 Input: "${scheduleText}"\n`);
  
  // Parse the schedule
  console.log('1️⃣  Parsing schedule...');
  const events = parseScheduleFromText(scheduleText);
  console.log(`✅ Parsed ${events.length} events:`);
  events.forEach((e, i) => {
    console.log(`   ${i+1}. ${e.activity} (${e.day} ${e.startTime}-${e.endTime})`);
  });
  
  if (events.length === 0) {
    console.log('❌ ERROR: No events parsed!');
    return;
  }
  
  // Create event data
  console.log('\n2️⃣  Creating calendar events...');
  for (const event of events) {
    const eventData = createCalendarEventFromSchedule(
      event.day,
      event.startTime,
      event.endTime,
      event.activity
    );
    
    console.log(`   ✅ Created: ${event.activity}`);
    
    // Add to calendar (no email parameter)
    console.log(`3️⃣  Adding to calendar...`);
    const result = await customCalendar.addEvent({
      title: eventData.summary,
      start: eventData.start.dateTime,
      end: eventData.end.dateTime,
      description: eventData.description
    });
    console.log(`   ✅ Added: ${result.id}`);
  }
  
  // Verify saved
  console.log('\n4️⃣  Verifying saved events...');
  const saved = await customCalendar.getEvents();
  console.log(`✅ Found ${saved.length} events in calendar:`);
  saved.forEach((e, i) => {
    console.log(`   ${i+1}. ${e.title}`);
  });
  
  // Check file
  console.log('\n5️⃣  Checking calendar file...');
  const filePath = './calendars/events.json';
  console.log(`📁 File: ${filePath}`);
  
  const fs = await import('fs/promises');
  try {
    const stat = await fs.stat(filePath);
    console.log(`✅ File exists (${stat.size} bytes)`);
  } catch (err) {
    console.log(`❌ File not found: ${err.message}`);
  }
  
  console.log('\n✨ System is ready! Open http://localhost:3000');
}

test().catch(console.error);
