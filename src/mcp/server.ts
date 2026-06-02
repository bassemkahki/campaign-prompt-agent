import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { ConfigService } from '../services/config.js';
import { IngestionService } from '../ingestion/docling.js';
import { StorageService } from '../services/storage.js';
import { CreativeBriefSchema } from '../schema/brief.ts';
import { generateText, Output } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import path from 'path';

export class CampaignAgentServer {
  private server: Server;
  private configService: ConfigService;
  private ingestionService: IngestionService;
  private storageService: StorageService;

  constructor() {
    this.configService = new ConfigService();
    this.ingestionService = new IngestionService();
    this.storageService = new StorageService();
    this.server = new Server(
      {
        name: 'campaign-prompt-agent',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'ping',
            description: 'Ping the agent to verify connectivity',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'ingest_campaign_doc',
            description: 'Ingest PDF/PPTX/MD campaign documentation and extract a creative brief',
            inputSchema: {
              type: 'object',
              properties: {
                path: {
                  type: 'string',
                  description: 'Local path to the campaign document',
                },
              },
              required: ['path'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        if (name === 'ping') {
          const config = await this.configService.getConfig();
          return {
            content: [
              {
                type: 'text',
                text: `pong from ${config.projectName}`,
              },
            ],
          };
        }

        if (name === 'ingest_campaign_doc') {
          const docPath = args?.path as string;
          if (!docPath) {
            throw new Error('Missing path argument');
          }

          // 1. Parse document to Markdown
          const markdown = await this.ingestionService.convertToMarkdown(docPath);

          // 2. Extract structured brief using AI SDK
          const config = await this.configService.getConfig();
          if (!config.anthropicApiKey) {
            throw new Error('Anthropic API key not found in config.json');
          }

          const { output: brief } = await generateText({
            model: anthropic('claude-3-5-sonnet-latest', {
              apiKey: config.anthropicApiKey,
            }),
            output: Output.object({ schema: CreativeBriefSchema }),
            prompt: `Analyze the following campaign creative documentation and extract a structured creative brief.
            
            Markdown Content:
            ${markdown}`,
          });

          // 3. Persist to storage
          await this.storageService.ensureStorage();
          const briefId = path.basename(docPath, path.extname(docPath));
          await this.storageService.saveBrief(briefId, brief);

          return {
            content: [
              {
                type: 'text',
                text: `Successfully ingested ${path.basename(docPath)}. Brief extracted and saved as ${briefId}.json`,
              },
              {
                type: 'text',
                text: JSON.stringify(brief, null, 2),
              },
            ],
          };
        }

        throw new Error(`Tool not found: ${name}`);
      } catch (error: any) {
        console.error(`Error executing tool ${name}:`, error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async connect(transport: any) {
    await this.server.connect(transport);
  }
}

// Only run if this is the main module
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1].endsWith('server.ts')) {
  const server = new CampaignAgentServer();
  const transport = new StdioServerTransport();
  server.connect(transport).catch((error) => {
    console.error('Fatal error in MCP server:', error);
    process.exit(1);
  });
}
