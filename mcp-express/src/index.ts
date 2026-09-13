import express from 'express';
import mcpRouter from './routes/mcp.route.js';

const app = express();
app.use(express.json());

app.use("/mcp", mcpRouter);

app.get('/health', async (_req, res) => { return res.status(200).json({ msg: "MCP Server is live and healthy." }); });

app.listen(3000, () => { console.log(`MCP Server is listening at PORT 3000.`)});