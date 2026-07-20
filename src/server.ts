import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const HAE_HOST = process.env.HAE_HOST || "localhost";
const HAE_PORT = parseInt(process.env.HAE_PORT || "9000");
const DEFAULT_TIMEOUT = parseInt(process.env.HAE_TIMEOUT || "86400000");

const server = new McpServer({
  name: "Health Auto Export",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Health Metrics
server.tool(
  "get_health_metrics",
  "Get health metrics data for a specified date range",
  {
    host: z
      .string()
      .optional()
      .describe(
        "Hostname or IP address of the target server (default: HAE_HOST env)",
      ),
    port: z
      .number()
      .min(1)
      .max(65535)
      .optional()
      .describe("Port number to connect to (default: HAE_PORT env)"),
    method: z.string().describe("JSON-RPC method name"),
    params: z
      .object({
        name: z.string().describe("Tool name to call: health_metrics"),
        arguments: z
          .object({
            start: z
              .string()
              .describe("Start timestamp (e.g., '2025-08-01 00:00:00 +0200')"),
            end: z
              .string()
              .describe("End timestamp (e.g., '2025-08-31 23:59:59 +0200')"),
            metrics: z
              .string()
              .describe(
                "Metrics to export as a comma separated list, or empty string for all metrics (e.g., 'step_count')",
              ),
            interval: z
              .string()
              .describe("Aggregation interval for metrics (e.g., 'days')"),
            aggregate: z.boolean().describe("Aggregate metrics (e.g. true)"),
          })
          .describe("Arguments for the health_metrics tool call"),
      })
      .describe("JSON-RPC parameters with name and arguments"),
    id: z
      .union([z.string(), z.number()])
      .optional()
      .describe("JSON-RPC request ID (default: auto-generated)"),
    timeout: z
      .number()
      .min(1000)
      .max(DEFAULT_TIMEOUT)
      .optional()
      .describe(
        `Connection timeout in milliseconds (default: ${DEFAULT_TIMEOUT})`,
      ),
  },
  handleRequest,
);

// Workouts
server.tool(
  "get_workouts",
  "Get workouts for a specified date range",
  {
    host: z
      .string()
      .optional()
      .describe(
        "Hostname or IP address of the target server (default: HAE_HOST env)",
      ),
    port: z
      .number()
      .min(1)
      .max(65535)
      .optional()
      .describe("Port number to connect to (default: HAE_PORT env)"),
    method: z.string().describe("JSON-RPC method name"),
    params: z
      .object({
        name: z.string().describe("Tool name to call: workouts"),
        arguments: z
          .object({
            start: z
              .string()
              .describe("Start timestamp (e.g. '2025-08-01 00:00:00 +0200')"),
            end: z
              .string()
              .describe("End timestamp (e.g. '2025-08-31 23:59:59 +0200')"),
            includeMetadata: z
              .boolean()
              .describe("Include health metric metadata (e.g. true)"),
            includeRoutes: z
              .boolean()
              .describe("Include route data (e.g. true)"),
            metadataAggregation: z
              .string()
              .describe(
                "Aggregation interval for health metric metadata (e.g. 'minutes' or 'seconds')",
              ),
          })
          .describe("Arguments for the workouts tool call"),
      })
      .describe("JSON-RPC parameters with name and arguments"),
    id: z
      .union([z.string(), z.number()])
      .optional()
      .describe("JSON-RPC request ID (default: auto-generated)"),
    timeout: z
      .number()
      .min(1000)
      .max(DEFAULT_TIMEOUT)
      .optional()
      .describe(
        `Connection timeout in milliseconds (default: ${DEFAULT_TIMEOUT})`,
      ),
  },
  handleRequest,
);

// Symptoms
server.tool(
  "get_symptoms",
  "Get symptoms data for a specified date range",
  {
    host: z
      .string()
      .optional()
      .describe(
        "Hostname or IP address of the target server (default: HAE_HOST env)",
      ),
    port: z
      .number()
      .min(1)
      .max(65535)
      .optional()
      .describe("Port number to connect to (default: HAE_PORT env)"),
    method: z.string().describe("JSON-RPC method name"),
    params: z
      .object({
        name: z.string().describe("Tool name to call: symptoms"),
        arguments: z
          .object({
            start: z
              .string()
              .describe("Start timestamp (e.g. '2025-08-01 00:00:00 +0200')"),
            end: z
              .string()
              .describe("End timestamp (e.g. '2025-08-31 23:59:59 +0200')"),
          })
          .describe("Arguments for the symptoms tool call"),
      })
      .describe("JSON-RPC parameters with name and arguments"),
    id: z
      .union([z.string(), z.number()])
      .optional()
      .describe("JSON-RPC request ID (default: auto-generated)"),
    timeout: z
      .number()
      .min(1000)
      .max(DEFAULT_TIMEOUT)
      .optional()
      .describe(
        `Connection timeout in milliseconds (default: ${DEFAULT_TIMEOUT})`,
      ),
  },
  handleRequest,
);

// State of Mind
server.tool(
  "get_state_of_mind",
  "Get state of mind data for a specified date range",
  {
    host: z
      .string()
      .optional()
      .describe(
        "Hostname or IP address of the target server (default: HAE_HOST env)",
      ),
    port: z
      .number()
      .min(1)
      .max(65535)
      .optional()
      .describe("Port number to connect to (default: HAE_PORT env)"),
    method: z.string().describe("JSON-RPC method name"),
    params: z
      .object({
        name: z.string().describe("Tool name to call: state_of_mind"),
        arguments: z
          .object({
            start: z
              .string()
              .describe("Start timestamp (e.g. '2025-08-01 00:00:00 +0200')"),
            end: z
              .string()
              .describe("End timestamp (e.g. '2025-08-31 23:59:59 +0200')"),
          })
          .describe("Arguments for the state_of_mind tool call"),
      })
      .describe("JSON-RPC parameters with name and arguments"),
    id: z
      .union([z.string(), z.number()])
      .optional()
      .describe("JSON-RPC request ID (default: auto-generated)"),
    timeout: z
      .number()
      .min(1000)
      .max(DEFAULT_TIMEOUT)
      .optional()
      .describe(
        `Connection timeout in milliseconds (default: ${DEFAULT_TIMEOUT})`,
      ),
  },
  handleRequest,
);

// Medications
server.tool(
  "get_medications",
  "Get medications data for a specified date range",
  {
    host: z
      .string()
      .optional()
      .describe(
        "Hostname or IP address of the target server (default: HAE_HOST env)",
      ),
    port: z
      .number()
      .min(1)
      .max(65535)
      .optional()
      .describe("Port number to connect to (default: HAE_PORT env)"),
    method: z.string().describe("JSON-RPC method name"),
    params: z
      .object({
        name: z.string().describe("Tool name to call: medications"),
        arguments: z
          .object({
            start: z
              .string()
              .describe("Start timestamp (e.g. '2025-08-01 00:00:00 +0200')"),
            end: z
              .string()
              .describe("End timestamp (e.g. '2025-08-31 23:59:59 +0200')"),
          })
          .describe("Arguments for the medications tool call"),
      })
      .describe("JSON-RPC parameters with name and arguments"),
    id: z
      .union([z.string(), z.number()])
      .optional()
      .describe("JSON-RPC request ID (default: auto-generated)"),
    timeout: z
      .number()
      .min(1000)
      .max(DEFAULT_TIMEOUT)
      .optional()
      .describe(
        `Connection timeout in milliseconds (default: ${DEFAULT_TIMEOUT})`,
      ),
  },
  handleRequest,
);

// Cycle Tracking
server.tool(
  "get_cycle_tracking",
  "Get cycle tracking data for a specified date range",
  {
    host: z
      .string()
      .optional()
      .describe(
        "Hostname or IP address of the target server (default: HAE_HOST env)",
      ),
    port: z
      .number()
      .min(1)
      .max(65535)
      .optional()
      .describe("Port number to connect to (default: HAE_PORT env)"),
    method: z.string().describe("JSON-RPC method name"),
    params: z
      .object({
        name: z.string().describe("Tool name to call: cycle_tracking"),
        arguments: z
          .object({
            start: z
              .string()
              .describe("Start timestamp (e.g. '2025-08-01 00:00:00 +0200')"),
            end: z
              .string()
              .describe("End timestamp (e.g. '2025-08-31 23:59:59 +0200')"),
          })
          .describe("Arguments for the cycle_tracking tool call"),
      })
      .describe("JSON-RPC parameters with name and arguments"),
    id: z
      .union([z.string(), z.number()])
      .optional()
      .describe("JSON-RPC request ID (default: auto-generated)"),
    timeout: z
      .number()
      .min(1000)
      .max(DEFAULT_TIMEOUT)
      .optional()
      .describe(
        `Connection timeout in milliseconds (default: ${DEFAULT_TIMEOUT})`,
      ),
  },
  handleRequest,
);

// ECG
server.tool(
  "get_ecg",
  "Get ecg data for a specified date range",
  {
    host: z
      .string()
      .optional()
      .describe(
        "Hostname or IP address of the target server (default: HAE_HOST env)",
      ),
    port: z
      .number()
      .min(1)
      .max(65535)
      .optional()
      .describe("Port number to connect to (default: HAE_PORT env)"),
    method: z.string().describe("JSON-RPC method name"),
    params: z
      .object({
        name: z.string().describe("Tool name to call: ecg"),
        arguments: z
          .object({
            start: z
              .string()
              .describe("Start timestamp (e.g. '2025-08-01 00:00:00 +0200')"),
            end: z
              .string()
              .describe("End timestamp (e.g. '2025-08-31 23:59:59 +0200')"),
          })
          .describe("Arguments for the ecg tool call"),
      })
      .describe("JSON-RPC parameters with name and arguments"),
    id: z
      .union([z.string(), z.number()])
      .optional()
      .describe("JSON-RPC request ID (default: auto-generated)"),
    timeout: z
      .number()
      .min(1000)
      .max(DEFAULT_TIMEOUT)
      .optional()
      .describe(
        `Connection timeout in milliseconds (default: ${DEFAULT_TIMEOUT})`,
      ),
  },
  handleRequest,
);

// Heart Notifications
server.tool(
  "get_heart_notifications",
  "Get heart notifications data for a specified date range",
  {
    host: z
      .string()
      .optional()
      .describe(
        "Hostname or IP address of the target server (default: HAE_HOST env)",
      ),
    port: z
      .number()
      .min(1)
      .max(65535)
      .optional()
      .describe("Port number to connect to (default: HAE_PORT env)"),
    method: z.string().describe("JSON-RPC method name"),
    params: z
      .object({
        name: z.string().describe("Tool name to call: heart_notifications"),
        arguments: z
          .object({
            start: z
              .string()
              .describe("Start timestamp (e.g. '2025-08-01 00:00:00 +0200')"),
            end: z
              .string()
              .describe("End timestamp (e.g. '2025-08-31 23:59:59 +0200')"),
          })
          .describe("Arguments for the heart_notifications tool call"),
      })
      .describe("JSON-RPC parameters with name and arguments"),
    id: z
      .union([z.string(), z.number()])
      .optional()
      .describe("JSON-RPC request ID (default: auto-generated)"),
    timeout: z
      .number()
      .min(1000)
      .max(DEFAULT_TIMEOUT)
      .optional()
      .describe(
        `Connection timeout in milliseconds (default: ${DEFAULT_TIMEOUT})`,
      ),
  },
  handleRequest,
);

interface HealthMetricsArgs {
  start: string;
  end: string;
}

async function handleRequest({
  host,
  port,
  method,
  params,
  id,
  timeout = DEFAULT_TIMEOUT,
}: {
  host?: string | undefined;
  port?: number | undefined;
  method: string;
  params: {
    name: string;
    arguments: HealthMetricsArgs;
  };
  id?: string | number | undefined;
  timeout?: number | undefined;
}): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const net = await import("net");

  // Explicitní host/port z volání vždy vítězí; env HAE_HOST/HAE_PORT je jen fallback
  const targetHost = host ?? HAE_HOST;
  const targetPort = port ?? HAE_PORT;
  const hostSource = host !== undefined ? "parametr" : `env HAE_HOST=${HAE_HOST}`;
  const portSource = port !== undefined ? "parametr" : `env HAE_PORT=${HAE_PORT}`;
  const targetDesc = `${targetHost}:${targetPort} (host: ${hostSource}, port: ${portSource}; requested: ${host ?? "-"}:${port ?? "-"})`;

  const requestId = id || Math.floor(Math.random() * 1000);
  const jsonrpcRequest = {
    jsonrpc: "2.0",
    id: requestId,
    method: "callTool",
    params: params || {},
  };

  const message = JSON.stringify(jsonrpcRequest);

  return new Promise((resolve) => {
    const client = new net.Socket();
    let responseData = "";
    let hasResponded = false;

    client.setTimeout(timeout);

    client.connect(targetPort, targetHost, () => {
      client.write(message);
    });

    client.on("data", (data) => {
      responseData += data.toString();
    });

    client.on("end", () => {
      if (!hasResponded) {
        hasResponded = true;
        let responseText = `JSON-RPC request to ${targetDesc} completed successfully.\n`;
        responseText += `Request: ${message}\n\n`;

        if (responseData) {
          try {
            const parsedResponse = JSON.parse(responseData);
            responseText += `Response: ${JSON.stringify(
              parsedResponse,
              null,
              2,
            )}`;
          } catch {
            responseText += `Raw Response: ${responseData}`;
          }
        } else {
          responseText += "No response data received";
        }

        resolve({
          content: [{ type: "text", text: responseText }],
        });
      }
    });

    client.on("error", (error) => {
      if (!hasResponded) {
        hasResponded = true;
        resolve({
          content: [
            {
              type: "text",
              text: `JSON-RPC request to ${targetDesc} failed: ${error.message}`,
            },
          ],
        });
      }
    });

    client.on("timeout", () => {
      if (!hasResponded) {
        hasResponded = true;
        client.destroy();
        resolve({
          content: [
            {
              type: "text",
              text: `JSON-RPC request to ${targetDesc} timed out after ${timeout}ms`,
            },
          ],
        });
      }
    });

    client.on("close", () => {
      if (!hasResponded) {
        hasResponded = true;
        resolve({
          content: [
            {
              type: "text",
              text: `JSON-RPC request to ${targetDesc} closed`,
            },
          ],
        });
      }
    });
  });
}

async function healthCheck(
  host: string,
  port: number,
  timeout: number = 5000,
): Promise<boolean> {
  const net = await import("net");

  return new Promise((resolve) => {
    const client = new net.Socket();
    let hasResponded = false;

    client.setTimeout(timeout);

    client.connect(port, host, () => {
      if (!hasResponded) {
        hasResponded = true;
        client.destroy();
        resolve(true);
      }
    });

    client.on("error", () => {
      if (!hasResponded) {
        hasResponded = true;
        resolve(false);
      }
    });

    client.on("timeout", () => {
      if (!hasResponded) {
        hasResponded = true;
        client.destroy();
        resolve(false);
      }
    });
  });
}

async function main() {
  console.error(`Starting Health Auto Export MCP Server...`);
  console.error(
    `Default target ${HAE_HOST}:${HAE_PORT} (env fallback — explicit host/port in tool calls take precedence)`,
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Health Auto Export MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
