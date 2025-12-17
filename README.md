# 📅 AI Schedule Assistant

A smart, privacy-focused scheduling assistant that helps you organize your day using AI. It converses with you to understand your plans and automatically creates a structured calendar.

![Project Banner](https://img.shields.io/badge/Status-Active-success) ![Node.js](https://img.shields.io/badge/Node.js-v18+-green) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

-   **🤖 AI Conversational Interface**: Chat naturally to plan your day (powered by Groq/Llama 3).
-   **📅 Custom Calendar System**: Built-in file-based calendar. **No Google Account required.**
-   **🔒 Privacy First**: Your data stays local (or in your private deployment). No external calendar syncing needed.
-   **⚡ Smart Parsing**: Automatically detects activities, times, and distinct "Free Time" slots in your day.
-   **🚀 Vercel Ready**: configured for easy serverless deployment.

## 🚀 Getting Started

### Prerequisites

-   Node.js installed (v16 or higher)
-   A [Groq API Key](https://console.groq.com/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/ai-schedule-assistant.git
    cd ai-schedule-assistant
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure API Key**:
    -   Create a `apikey.txt` file in the root directory and paste your Groq API key inside.
    -   *Or* create a `.env` file with `GROQ_API_KEY=your_key_here`.

4.  **Start the server**:
    ```bash
    npm start
    ```

5.  **Open in Browser**:
    Visit `http://localhost:3000` to start chatting!

## ☁️ Deployment

### Deploy to Vercel

This project is configured for seamless deployment on Vercel.

1.  **Install Vercel CLI**: `npm i -g vercel`
2.  **Deploy**: Run `vercel` in the project root.
3.  **Environment Variables**: go to Vercel Dashboard > Settings > Environment Variables and add `GROQ_API_KEY`.

> **⚠️ Note on Data Persistence**: When deployed to Vercel (Serverless), calendar data is stored in temporary storage (`/tmp`) and will be reset when the server goes to sleep. For permanent storage in production, consider connecting a database.

## 🛠️ Tech Stack

-   **Backend**: Node.js (Vanilla), HTTP Server
-   **Frontend**: HTML5, CSS3, Vanilla JavaScript
-   **AI**: Groq API (Llama 3.3 70b)
-   **Storage**: JSON-based file system

## 📂 Project Structure

```bash
├── src/
│   ├── server.mjs          # Main server logic & request handling
│   ├── custom-calendar.mjs # File-based calendar implementation
│   └── schedule-parser.mjs # Natural language schedule parser
├── public/                 # Static assets (HTML, CSS, JS)
├── api/                    # Vercel entry point
└── docs/                   # Documentation
```

## 📄 License

This project is licensed under the MIT License.
