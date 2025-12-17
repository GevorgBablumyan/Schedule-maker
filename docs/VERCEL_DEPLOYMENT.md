# Deploying to Vercel

Your project is now ready to be deployed to Vercel!

## Prerequisites
1.  A [Vercel account](https://vercel.com).
2.  Your **Groq API Key**.

## Option A: Deploy via Vercel CLI (Recommended)

1.  **Install Vercel CLI**:
    ```bash
    npm install -g vercel
    ```

2.  **Login**:
    ```bash
    vercel login
    ```

3.  **Deploy**:
    Run this command in your project folder:
    ```bash
    vercel
    ```

4.  **Configure**:
    -   Vercel will ask a few questions. Press `Enter` to accept defaults.
    -   **Important**: When asked, **link your project**.

5.  **Set Environment Variables**:
    After the first deployment attempt (or during setup), go to your Vercel Dashboard:
    -   Select your project.
    -   Go to **Settings** > **Environment Variables**.
    -   Add `GROQ_API_KEY` with your actual API key value.
    -   Redeploy if needed.

## Option B: Deploy via GitHub

1.  Push your code to a GitHub repository.
2.  Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** > **"Project"**.
3.  Import your GitHub repository.
4.  In the "Environment Variables" section, add `GROQ_API_KEY`.
5.  Click **Deploy**.

## ⚠️ Important Note on Data
Vercel is a "serverless" platform. Files you save (like the calendar) are **temporary**.
-   **Behavior**: Your schedule will be saved to `/tmp`.
-   **Persistence**: Data will be wiped when the server "sleeps" (usually after a few minutes of inactivity).
-   **Solution**: For a real production app, you would need a database (like MongoDB or PostgreSQL). For this demo, using `/tmp` works but data is ephemeral.
