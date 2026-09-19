import express from 'express';
import rootRouter from './routes/index.js';

const app = express();

app.use('/api/v1', rootRouter);