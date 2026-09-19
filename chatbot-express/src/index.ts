import express from 'express';
import rootRouter from './routes/index.js';
import { env } from './env.js';

const app = express();
app.use(express.json());

app.use('/api/v1', rootRouter);

app.listen(3500, () => { console.log(`App is listening at PORT-${3500}`)});