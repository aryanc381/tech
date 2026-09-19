import express from 'express';
import OpenAI from 'openai';
import { env } from '../env.js';

const router = express.Router();

router.post('/', async(req, res) => {
    const request = req.body;
    const openai = new OpenAI({
        apiKey: env.CLOUDFLARE_API_TOKEN,
	    baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCESS_KEY_ID}/ai/v1`,
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Make some robot noises" }],
        model: "@cf/meta/llama-3.1-8b-instruct"
    });
});


export default router;