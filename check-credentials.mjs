import dotenv from 'dotenv';
import fs from 'fs/promises';

// Load .env
dotenv.config();

console.log('\n=== Google OAuth Credentials Check ===\n');

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URI;
const userEmail = process.env.USER_EMAIL;

console.log('Current .env values:');
console.log('-'.repeat(50));
console.log(`GOOGLE_CLIENT_ID: ${clientId}`);
console.log(`GOOGLE_CLIENT_SECRET: ${clientSecret ? '(hidden)' : 'NOT SET'}`);
console.log(`GOOGLE_REDIRECT_URI: ${redirectUri}`);
console.log(`USER_EMAIL: ${userEmail}`);
console.log('-'.repeat(50));

// Check if valid
const isValid = 
  clientId && 
  !clientId.includes('your_client_id') &&
  clientSecret && 
  !clientSecret.includes('your_client_secret') &&
  clientId.includes('googleusercontent.com');

if (isValid) {
  console.log('\n✅ Credentials look VALID!');
  console.log('You can now use the calendar feature.');
} else {
  console.log('\n❌ Credentials are INVALID or PLACEHOLDER!');
  console.log('\nFollow these steps:');
  console.log('1. Read: OAUTH_SETUP_STEPS.md');
  console.log('2. Get real credentials from Google Cloud Console');
  console.log('3. Update .env file with actual values');
  console.log('4. Save and restart server');
}

console.log('\n');
