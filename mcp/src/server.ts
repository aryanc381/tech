// this is my server that has 
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

function createServer() {
    // creating the high level mcp-server
    const server = new McpServer({ name: 'hello-server', version: '1.0.0' });

    // registering one tool called "greet"
    server.registerTool(
        "greet", // this is the tool name
        {
            description: "Say hello to a person", // main explanation that will help the LLM decide whether to pick this tool or not
            inputSchema: z.object({
                name: z.string().describe("The person to greet"), // explains the input
            }),
        },

        async ({ name }) => { // this code is what actually runs, the llm doesnt see this code, when the function is called with the argument "name", this function asynchronously runs. 
            return {
                content: [
                    {
                        type: "text",
                        text: `Hello ${name}!`,
                    },
                ],
            }
        }
    );
    return server;
}

void serveStdio(createServer);