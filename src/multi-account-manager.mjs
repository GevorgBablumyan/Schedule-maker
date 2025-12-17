// multi-account-manager.mjs
// Manage multiple Google Calendar accounts

import fs from 'fs/promises';
import { google } from 'googleapis';

export class MultiAccountManager {
  constructor(clientId, clientSecret, redirectUri) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.tokens = {}; // Store tokens for each account
    this.oauth2Clients = {}; // Store OAuth clients for each account
  }

  // Load saved tokens for all accounts
  async loadTokens() {
    try {
      const data = await fs.readFile('./google-tokens-multi.json', 'utf8');
      this.tokens = JSON.parse(data);
      console.log(`✓ Loaded tokens for ${Object.keys(this.tokens).length} accounts`);
    } catch (e) {
      console.log('⚠️  No saved tokens found. Users need to authorize accounts.');
      this.tokens = {};
    }

    // Create OAuth2 clients for each account
    for (const email in this.tokens) {
      this.createOAuthClient(email);
    }
  }

  // Create OAuth2 client for specific account
  createOAuthClient(email) {
    const oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectUri
    );

    if (this.tokens[email]) {
      oauth2Client.setCredentials(this.tokens[email]);
    }

    this.oauth2Clients[email] = oauth2Client;
    return oauth2Client;
  }

  // Get OAuth URL for authorization
  getAuthUrl(email) {
    const oauth2Client = this.createOAuthClient(email);
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
      state: email, // Pass email as state to identify account after callback
      login_hint: email, // Force the specific email to be used
      prompt: 'select_account' // Always show account selection
    });
  }

  // Handle OAuth callback
  async handleCallback(code, email) {
    if (!email) {
      throw new Error('Email not provided');
    }

    const oauth2Client = this.createOAuthClient(email);

    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Save token for this account
      this.tokens[email] = tokens;
      await this.saveTokens();

      console.log(`✓ Authorized: ${email}`);
      return { success: true, email };
    } catch (err) {
      console.error(`Authorization error for ${email}:`, err.message);
      throw err;
    }
  }

  // Save all tokens
  async saveTokens() {
    try {
      await fs.writeFile('./google-tokens-multi.json', JSON.stringify(this.tokens, null, 2));
    } catch (err) {
      console.error('Failed to save tokens:', err);
    }
  }

  // Get Calendar API instance for email
  getCalendarAPI(email) {
    if (!this.oauth2Clients[email]) {
      throw new Error(`No OAuth client for ${email}`);
    }

    return google.calendar({
      version: 'v3',
      auth: this.oauth2Clients[email]
    });
  }

  // Check if account is authorized
  isAuthorized(email) {
    return !!this.tokens[email];
  }

  // Get all authorized accounts
  getAuthorizedAccounts() {
    return Object.keys(this.tokens);
  }

  // Revoke authorization for account
  async revokeAuthorization(email) {
    try {
      if (this.oauth2Clients[email]) {
        await this.oauth2Clients[email].revokeCredentials();
      }
      delete this.tokens[email];
      delete this.oauth2Clients[email];
      await this.saveTokens();
      console.log(`✓ Revoked authorization for: ${email}`);
      return { success: true };
    } catch (err) {
      console.error(`Failed to revoke authorization for ${email}:`, err);
      throw err;
    }
  }

  // Create calendar event for specific account
  async createEvent(email, eventData) {
    if (!this.isAuthorized(email)) {
      throw new Error(`Account ${email} is not authorized`);
    }

    const calendar = this.getCalendarAPI(email);

    try {
      const result = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: eventData
      });

      console.log(`✓ Event created for ${email}: ${eventData.summary}`);
      return result.data;
    } catch (err) {
      console.error(`Failed to create event for ${email}:`, err.message);
      throw err;
    }
  }

  // Get today's events for account
  async getTodayEvents(email) {
    if (!this.isAuthorized(email)) {
      throw new Error(`Account ${email} is not authorized`);
    }

    const calendar = this.getCalendarAPI(email);

    try {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

      const events = await calendar.events.list({
        calendarId: 'primary',
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      });

      return events.data.items || [];
    } catch (err) {
      console.error(`Failed to fetch events for ${email}:`, err.message);
      throw err;
    }
  }
}
