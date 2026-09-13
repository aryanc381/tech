import { McpServer } from "@modelcontextprotocol/server";
import z from 'zod';

// this is the mcp server that will be exposed via HTTPS to be accessed remotely. 
export const mcpServer = new McpServer({
    name: "add-numbers-server",
    version: "1.0.0"
});

mcpServer.registerTool(
    "add_numbers",
    {
        description: "Add two numbers together",
        inputSchema: z.object({
            a: z.number().describe("The first number"),
            b: z.number().describe("The second number")
        })
    },

    async ({ a, b }) => {
        const result = a * b;

        return {
            content: [
                {
                    type: "text",
                    text: `The addition of first and second number is ${result}.`
                },
                
            ],
        }
    }
)