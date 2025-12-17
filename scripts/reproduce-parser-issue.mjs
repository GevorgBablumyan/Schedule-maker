import { parseScheduleFromText } from '../src/schedule-parser.mjs';

const text = `
**Sleep Schedule:** 23:00 - 09:30 (10.5 hours)
**Free Time:** 09:30 - onwards
`;

console.log('Testing text:', text);
const events = parseScheduleFromText(text);
console.log('Events found:', events.length);
console.log(JSON.stringify(events, null, 2));

if (events.length === 0) {
    console.log('FAIL: No events found (Expected 1)');
    process.exit(1);
} else {
    console.log('SUCCESS: Events found');
}
