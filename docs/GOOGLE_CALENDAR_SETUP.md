# Complete Google Calendar Setup for Schedule Assistant

## Step 1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com
2. Click **"Select a Project"** at the top
3. Click **"NEW PROJECT"**
4. Name it: `Schedule Assistant`
5. Click **CREATE**
6. Wait for it to create (takes 30 seconds)

## Step 2: Enable Required APIs

1. In the search box at the top, search: `Google Calendar API`
2. Click the first result
3. Click **ENABLE**
4. Search again: `Google+ API`
5. Click **ENABLE**

## Step 3: Create OAuth 2.0 Credentials

1. Go to **Credentials** (left sidebar)
2. Click **CREATE CREDENTIALS** → **OAuth 2.0 Client IDs**
3. If prompted: **Configure OAuth Consent Screen**
   - User Type: Select **External**
   - App name: `Schedule Assistant`
   - User support email: `gevorgbablumyan43@gmail.com`
   - Developer contact: `gevorgbablumyan43@gmail.com`
   - Add Scope: Search for `calendar` and select `https://www.googleapis.com/auth/calendar`
   - Click **SAVE AND CONTINUE**
   - Back to **Credentials**

4. Click **CREATE CREDENTIALS** → **OAuth 2.0 Client IDs**
5. Choose **Web application**
6. Fill in:
   - **Name:** `Schedule Assistant Web`
   - **Authorized JavaScript origins:** `http://localhost:3000`
   - **Authorized redirect URIs:** `http://localhost:3000/auth/callback`
7. Click **CREATE**
8. **COPY** the Client ID and Client Secret that appear

## Step 4: Download and Save Credentials

1. Click the download icon (⬇️) next to your credentials
2. Rename the file to: `google-credentials.json`
3. Move it to: `/Users/user/Desktop/Lesson1/google-credentials.json`

## Step 5: Update .env File

Edit `/Users/user/Desktop/Lesson1/.env`:

```env
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
USER_EMAIL=gevorgbablumyan43@gmail.com
```

Replace the placeholders with values from Step 3.

## Step 6: Start Server and Test

```bash
cd /Users/user/Desktop/Lesson1
node server.mjs
```

Then go to: http://localhost:3000

## Step 7: Connect Your Calendar

1. Click the blue **"🔐 Connect Calendar"** button
2. Sign in with: `gevorgbablumyan43@gmail.com`
3. Click **ALLOW** when asked for permissions
4. Close the popup window
5. You should see **"✅ Calendar Connected"**

## Step 8: Add Your Schedule

1. Tell the AI your weekly schedule
2. Example: "Here's my schedule: Monday 9:30-15:40 College, 19:00-21:00 Gym..."
3. Click the **"📅 Save to Calendar"** button that appears
4. The events will be created in your Google Calendar!

## Verify It Works

Open Google Calendar: https://calendar.google.com/calendar/u/0/r/

You should see your new events from the Schedule Assistant!

---

## Troubleshooting

**"Invalid client" error:**
- Double-check Client ID and Secret in `.env`
- Make sure they match exactly from Google Cloud Console

**"Redirect URI mismatch":**
- In Google Cloud Console, verify the redirect URI is exactly: `http://localhost:3000/auth/callback`

**Calendar still not updating:**
- Make sure you clicked "ALLOW" in the OAuth popup
- Check browser console for error messages (F12)
- Verify the `.env` file has correct credentials

**"API not enabled":**
- Go back to Google Cloud Console
- Search for "Google Calendar API" and click ENABLE
- Do the same for "Google+ API"
