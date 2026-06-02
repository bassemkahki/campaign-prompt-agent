import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { CampaignAgentServer } from '../src/mcp/server.js';
import fs from 'fs/promises';
import path from 'path';

vi.mock('ai', async () => {
  const actual = await vi.importActual('ai');
  return {
    ...actual,
    generateText: vi.fn().mockResolvedValue({
      output: {
        brand: 'Test Brand',
        projectGoal: 'Test Goal',
        artDirection: {
          visualStyle: 'Modern',
          colorPalette: ['Blue'],
          lighting: 'Bright'
        },
        mood: 'Energetic',
        constraints: [],
        deliverables: ['soul-v2']
      }
    })
  };
});

describe('Ingestion Tool', () => {
  let server: CampaignAgentServer;
  let client: Client;
  let serverTransport: InMemoryTransport;
  let clientTransport: InMemoryTransport;

  beforeEach(async () => {
    // Create a dummy config.json
    await fs.writeFile(path.join(process.cwd(), 'config.json'), JSON.stringify({
      anthropicApiKey: 'dummy-key'
    }));

    server = new CampaignAgentServer();
    const [cTransport, sTransport] = InMemoryTransport.createLinkedPair();
    clientTransport = cTransport;
    serverTransport = sTransport;
    client = new Client({ name: "test-client", version: "1.0.0" }, { capabilities: {} });
  });

  afterEach(async () => {
    try {
      await fs.unlink(path.join(process.cwd(), 'config.json'));
      await fs.unlink(path.join(process.cwd(), 'tests/fixtures/test.md'));
    } catch (e) {}
  });

  it('should list the ingest_campaign_doc tool', async () => {
    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport)
    ]);

    const tools = await client.listTools();
    expect(tools.tools.some(t => t.name === 'ingest_campaign_doc')).toBe(true);
  });

  it('should ingest a markdown file', async () => {
    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport)
    ]);

    // Create a dummy MD file
    const testMd = path.join(process.cwd(), 'tests/fixtures/test.md');
    await fs.mkdir(path.dirname(testMd), { recursive: true });
    await fs.writeFile(testMd, '# Test Campaign\nBrand: Test Brand');

    const result = await client.callTool({ 
      name: 'ingest_campaign_doc', 
      arguments: { path: testMd } 
    });

    expect(result.isError).toBeFalsy();
  });
});
