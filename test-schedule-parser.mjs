// test-schedule-parser.mjs
import { parseScheduleFromText } from './schedule-parser.mjs';

const testSchedule = `
**Monday**
* 09:30 - 15:40: College
* 19:00 - 21:00: Gym
* 21:00 - 23:00: Lessons and free time
* 23:00: Sleep

**Tuesday**
* 09:30 - 15:40: College
* 16:00 - 18:00: Homework
* 18:00 - 23:00: Free time
* 23:00: Sleep

**Wednesday**
* 09:30 - 15:40: College
* 16:00 - 18:00: Gym
* 18:00 - 20:00: Homework
* 20:00 - 23:00: Free time
* 23:00: Sleep

**Thursday**
* 09:30 - 15:40: College
* 16:00 - 18:00: TUMO
* 18:00 - 20:00: Homework
* 20:00 - 23:00: Free time
* 23:00: Sleep

**Friday**
* 09:30 - 15:40: College
* 16:00 - 18:00: Gym
* 18:00 - 20:00: Homework
* 20:00 - 23:00: Free time
* 23:00: Sleep

**Saturday**
* 11:00: Wake up
* 12:00 - 14:00: TUMO
* 14:00 - 18:00: Walk with friends
* 18:00 - onwards: Free time
`;

console.log('Testing schedule parser...\n');
const events = parseScheduleFromText(testSchedule);

console.log(`Found ${events.length} events:\n`);
events.forEach((event, i) => {
  console.log(`${i + 1}. ${event.day.toUpperCase()}`);
  console.log(`   Time: ${event.startTime} - ${event.endTime}`);
  console.log(`   Activity: ${event.activity}\n`);
});

if (events.length === 0) {
  console.log('❌ No events parsed!');
} else {
  console.log(`✅ Successfully parsed ${events.length} events`);
}
