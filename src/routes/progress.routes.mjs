import express from 'express';
import progressStore from '../progress-store.mjs';

const router = express.Router();

// Get all progress data
router.get('/', async (req, res) => {
    try {
        const progress = await progressStore.getProgress();
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

// Log weight
router.post('/weight', async (req, res) => {
    const { weight } = req.body;
    if (!weight) return res.status(400).json({ error: 'Weight is required' });

    try {
        const entry = await progressStore.logWeight(weight);
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: 'Failed to log weight' });
    }
});

// Log training
router.post('/training', async (req, res) => {
    const { trainingId, details } = req.body;
    try {
        const entry = await progressStore.logTraining(trainingId, details);
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: 'Failed to log training' });
    }
});

export default router;
