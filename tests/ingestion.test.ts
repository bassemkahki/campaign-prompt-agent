import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { CampaignAgentServer } from '../src/mcp/server.js';
import fs from 'fs/promises';
import path from 'path';

vi.mock('../src/services/synthesis.js', () => {
  return {
    SynthesisService: vi.fn().mockImplementation(() => {
      return {
        extractBrief: vi.fn().mockResolvedValue({
          brand: 'Test Brand',
          projectGoal: 'Test Goal',
          artDirection: {
            visualStyle: 'Modern',
            colorPalette: ['Blue'],
            lighting: 'Bright'
          },
          mood: 'Energetic',
          constraints: [],
          deliverables: ['soul-v2'],
          shotBreakdowns: [
            {
              id: 'shot-1',
              description: 'A test shot',
              subject: 'Test Subject',
              outfit: 'Test Outfit',
              pose: 'Test Pose',
              environment: 'Test Environment',
              camera: 'Test Camera',
              lens: 'Test Lens',
              shotType: 'Test Shot Type'
            }
          ]
        })
      };
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
      anthropicApiKey: 'dummy-key',
      projectName: 'Test Project'
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

  it('should ingest a markdown file and report shots', async () => {
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
    const textContent = result.content[0].text;
    expect(textContent).toContain('Brief extracted with 1 shots');
  });
});
