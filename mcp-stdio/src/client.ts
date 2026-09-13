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
const greeting = await client.callTool({
    name: "greet",
    arguments: {
        name: "Aryan"
    }
});

const firstNum = 11
const secondNum = 200
const sum = await client.callTool({
    name: "add_numbers",
    arguments: {
        a: firstNum,
        b: secondNum
    }
});

// the server returns an array of content because MCP tools usually return multiple piences of content
for (const block of greeting.content) {
    if("text" in block) { console.log(`\nThe greeting tool call says ${block.text}`); }
}

for(const block of sum.content) {
    if("text" in block) { console.log(`The sum of ${firstNum} and ${secondNum} is ${block.text} `); }
}

await client.close();