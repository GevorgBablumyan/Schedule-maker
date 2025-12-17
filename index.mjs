import fs from 'fs/promises';
import readline from 'readline';

async function getAuth() {
  // Prefer a bearer token provided in the environment (for service accounts / gcloud):
  if (process.env.BEARER_TOKEN) return { type: 'bearer', token: process.env.BEARER_TOKEN };

  // Allow GOOGLE_API_KEY env var
  if (process.env.GOOGLE_API_KEY) return { type: 'apiKey', key: process.env.GOOGLE_API_KEY };

  // Fallback to reading ./apikey.txt
  try {
    const raw = await fs.readFile(new URL('./apikey.txt', import.meta.url), 'utf8');
    const key = raw.trim();
    if (key) return { type: 'apiKey', key };
  } catch (e) {
    // ignore
  }

  throw new Error('No API credentials found. Set BEARER_TOKEN or GOOGLE_API_KEY or create ./apikey.txt');
}

function makeUrl(model, key) {
  return `https://generativelanguage.googleapis.com/v1beta2/models/${model}:generateText?key=${encodeURIComponent(key)}`;
}

async function callModel(prompt, opts = {}) {
  const auth = await getAuth();
  console.log(auth)
  const model = opts.model || 'gemini-2.5-flash-lite';

  let url = `https://generativelanguage.googleapis.com/v1beta2/models/${model}:generateText`;

  const body = {
    prompt: { text: String(prompt) },
    temperature: typeof opts.temperature === 'number' ? opts.temperature : 0.2,
    maxOutputTokens: typeof opts.maxOutputTokens === 'number' ? opts.maxOutputTokens : 512
  };

  const headers = { 'Content-Type': 'application/json' };
  if (auth.type === 'bearer') {
    headers['Authorization'] = `Bearer ${auth.token}`;
  } else if (auth.type === 'apiKey') {
    // send key as query param
    url += `?key=${encodeURIComponent(auth.key)}`;
  }

  const resp = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`API error ${resp.status}: ${t}`);
  }

  const data = await resp.json();

  // Try several common response shapes to extract text safely.
  const tryPaths = [
    () => data.candidates && data.candidates[0] && (data.candidates[0].output || data.candidates[0].text || data.candidates[0].content),
    () => data.output && data.output[0] && data.output[0].content,
    () => data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content,
    () => data[0]
  ];

  for (const p of tryPaths) {
    try {
      const v = p();
      if (v == null) continue;
      // If it's an object with text fields, try to find text recursively
      if (typeof v === 'string') return v;
      if (typeof v === 'object') {
        // flatten possible nested content arrays
        const flat = JSON.stringify(v);
        // heuristic: find "text" fields
        if (v.text) return v.text;
        if (v.output) return v.output;
        if (v.content) {
          if (Array.isArray(v.content)) {
            // try to join any text fields
            const txts = v.content.map(c => c.text || c).filter(Boolean);
            if (txts.length) return txts.join('\n');
          }
          if (typeof v.content === 'string') return v.content;
        }
        // fallback to raw JSON string
        if (flat) return flat;
      }
    } catch (e) {
      // ignore and continue
    }
  }

  // If all else fails, return the full JSON for debugging
  return JSON.stringify(data, null, 2);
}

function startInteractive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.setPrompt('You> ');
  rl.prompt();
  rl.on('line', async (line) => {
    const trimmed = line.trim();
    if (!trimmed) { rl.prompt(); return; }
    if (trimmed.toLowerCase() === 'exit') { rl.close(); return; }
    try {
      const out = await callModel(trimmed);
      console.log('\nGemini>', out, '\n');
    } catch (e) {
      console.error('Error:', e.message);
    }
    rl.prompt();
  }).on('close', () => process.exit(0));
}

async function main() {
  const arg = process.argv.slice(2).join(' ');
  if (arg) {
    try {
      const out = await callModel(arg);
      console.log(out);
    } catch (e) {
      console.error('Error:', e.message);
      process.exit(1);
    }
  } else {
    console.log('Interactive Gemini CLI (model: gemini-2.5-flash-lite). Type a message and press Enter. Type "exit" to quit.');
    startInteractive();
  }
}

// Run main when invoked directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('index.mjs')) {
  main();
}
