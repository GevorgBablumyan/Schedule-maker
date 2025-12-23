import express from 'express';
import cors from 'cors';
import path from 'path';
import url from 'url';
import fs from 'fs/promises';
import customCalendar from './custom-calendar.mjs';
import progressStore from './progress-store.mjs';

// Import Routes
import calendarRoutes from './routes/calendar.routes.mjs';
import healthRoutes from './routes/health.routes.mjs';
import fitnessRoutes from './routes/fitness.routes.mjs';
import chatRoutes from './routes/chat.routes.mjs';
import progressRoutes from './routes/progress.routes.mjs';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static Files
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Initialize Stores
await customCalendar.init();
await progressStore.init();

// Mount Routes
app.use('/api/calendar', calendarRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/fitness', fitnessRoutes);
app.use('/api/chat', chatRoutes); // Mapped to general chat
app.use('/api/progress', progressRoutes);

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Fallback for SPA (if needed, or just 404)
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

export default app;
