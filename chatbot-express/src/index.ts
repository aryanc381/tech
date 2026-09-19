import express from 'express';
import rootRouter from './routes/index.js';
import { env } from './env.js';

const app = express();

app.use('/api/v1', rootRouter);

app.listen(env.PORT, () => { console.log(`App is listening at PORT-${env.PORT}`)});