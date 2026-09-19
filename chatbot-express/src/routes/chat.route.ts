import express from 'express';
import OpenAI from 'openai';
import { env } from '../env.js';

const router = express.Router();

router.post('/', async(req, res) => {
    const request = req.body;
    const openai = new OpenAI({
        apiKey: `${env.CLOUDFLARE_API_TOKEN}`,
	    baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: request.question }],
        model: "@cf/ibm-granite/granite-4.0-h-micro"
    });

    const answer = chatCompletion.choices[0]?.message?.content;
    return res.json({ status: 200, msg: answer });
});


export default router;