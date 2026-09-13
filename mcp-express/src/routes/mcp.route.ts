import { NodeStreamableHTTPServerTransport } from '@modelcontextprotocol/node';
import express from 'express';
import { mcpServer } from '../server/mcp.js';

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        /* 
        Creates the bridge between Express HTTP and MCP.
        Express understands:
            req  → incoming HTTP request
            res  → outgoing HTTP response
            MCP understands: initialize, tools/list, tools/call, JSON-RPC messages
        This transport translates between those two worlds. 
        */
        const transport = new NodeStreamableHTTPServerTransport({
            sessionIdGenerator: undefined // we are doing stateless, when the mcp server will need memory, will we make this `sessionIdGenerator: () => randomUUID()`
        });

        // connects the mcp server to the transport http streamable layer
        await mcpServer.connect(transport);

        // this guy handles the request from http. 
        await transport.handleRequest(req, res, req.body);
    } catch(err) {
        return res.status(500).json({ err })
    }
});

export default router;