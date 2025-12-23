import express from 'express';
import fs from 'fs/promises';

const router = express.Router();

let apiKey;
try {
    apiKey = process.env.GROQ_API_KEY || (await fs.readFile('./apikey.txt', 'utf8')).trim();
} catch (e) {
    console.warn('⚠️ No API key found for Chat routes.');
}

const SYSTEM_PROMPT_SCHEDULE = 'You are a helpful Schedule Assistant. Be concise and practical. When suggesting tasks or events, format them clearly using the pattern "**Day:** HH:MM-HH:MM Activity". Format time as HH:MM (24-hour). IMPORTANT: Only include specific activities requested by the user. DO NOT use generic placeholders like "Activity" or "Free Time". If a time slot is not explicitly filled by a request, leave it out of the listed activities.';

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
                response_format: { type: 'text' },
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT_SCHEDULE },
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
        console.error('Chat API error:', err);
        res.status(500).json({
            reply: "I'm temporarily unable to respond. Please try again in a moment!",
            debug: err.message
        });
    }
});

export default router;
