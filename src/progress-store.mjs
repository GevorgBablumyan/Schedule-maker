import fs from 'fs/promises';
import path from 'path';

const PROGRESS_FILE = process.env.VERCEL ? '/tmp/progress.json' : './calendars/progress.json';
const PROGRESS_DIR = process.env.VERCEL ? '/tmp' : './calendars';

class ProgressStore {
    constructor() {
        this.progressFile = PROGRESS_FILE;
        this.progressDir = PROGRESS_DIR;
    }

    async init() {
        try {
            await fs.mkdir(this.progressDir, { recursive: true });
        } catch (error) {
            console.error('Error creating progress directory:', error);
        }
    }

    async getProgress() {
        try {
            const data = await fs.readFile(this.progressFile, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return { weightLogs: [], trainingLogs: [] };
        }
    }

    async logWeight(weight) {
        const progress = await this.getProgress();
        const entry = {
            id: Date.now().toString(),
            weight: parseFloat(weight),
            date: new Date().toISOString()
        };
        progress.weightLogs.push(entry);
        await this.saveProgress(progress);
        return entry;
    }

    async logTraining(trainingId, details) {
        const progress = await this.getProgress();
        const entry = {
            id: Date.now().toString(),
            trainingId,
            details,
            date: new Date().toISOString()
        };
        progress.trainingLogs.push(entry);
        await this.saveProgress(progress);
        return entry;
    }

    async saveProgress(progress) {
        try {
            await this.init();
            await fs.writeFile(this.progressFile, JSON.stringify(progress, null, 2));
        } catch (error) {
            console.error('Error saving progress:', error);
            throw error;
        }
    }
}

const progressStore = new ProgressStore();
export default progressStore;
