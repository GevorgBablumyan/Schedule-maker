import express from 'express';
import fs from 'fs/promises';

const router = express.Router();

let apiKey;
try {
    apiKey = process.env.GROQ_API_KEY || (await fs.readFile('./apikey.txt', 'utf8')).trim();
} catch (e) {
    console.warn('⚠️ No API key found for Fitness routes.');
}

const SYSTEM_PROMPT_TRAINING = 'You are an expert Personal Trainer. PRECISE FORMAT REQUIRED. RETURN JSON ONLY. Output format: { "html_response": "...", "schedule": [...] }. CORE RESPONSIBILITY: Adapt to "Health Problems". PREVIOUS WEEK FEEDBACK must trigger PROGRESSIVE OVERLOAD. CONTENT RULES: 1. "html_response": Start with "**Workout Schedule**". List days. CRITICAL: For EVERY exercise, follow this format: "Exercise Name (X sets, Y reps, Weight: Z)" followed by RAW HTML LINK: <a href="https://www.google.com/search?q=site:muscleandstrength.com+Exercise+Name" target="_blank" style="color:#3b82f6">🎥 View Guide</a>. DO NOT USE MARKDOWN. 2. "schedule": Array: { "day": "Monday", "activity": "Chest", "details": "...", "start_time": "18:00", "duration_minutes": 60 }. CRITICAL: "details" must list exercises vertically with stats and HTML LINK.';

router.post('/generate', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'missing prompt' });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                response_format: { type: 'json_object' },
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT_TRAINING },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 8000
            })
        });

        if (!response.ok) {
            throw new Error(`Groq API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'I couldn\'t generate a response. Please try again!';

        res.json({ reply });

    } catch (err) {
        console.error('Fitness API error:', err);
        res.status(500).json({
            reply: "I'm temporarily unable to respond. Please try again in a moment!",
            debug: err.message
        });
    }
});

export default router;
