import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";

const client = new Client({ 
    name: "hello-client",
    version: "1.0.0"
});

const transport = new StdioClientTransport({ // so basically, since we are using stdio -> the client will start the server, in production this will not be the case. 
    command: "npx",
    args: ["tsx", "src/server.ts"]
});

// starts the server process and completes the handshake for mcp
await client.connect(transport)

// asking the server which tools it has
const { tools } = await client.listTools();

console.log("# Tools available on the server #");
for (const tool of tools) {
    console.log(`- ${tool.name}: ${tool.description}`);
}

// calling the greet tool we made on the server
const result = await client.callTool({
    name: "greet",
    arguments: {
        name: "Aryan"
    }
});

// the server returns an array of content because MCP tools usually return multiple piences of content
for (const block of result.content) {
    if("text" in block) { console.log(`Server says ${block.text}`); }
}

await client.close();