import { describe, it, expect, beforeEach } from 'vitest';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { CampaignAgentServer } from '../src/mcp/server.js';
import fs from 'fs/promises';
import path from 'path';

describe('Ingestion Tool', () => {
  let server: CampaignAgentServer;
  let client: Client;
  let serverTransport: InMemoryTransport;
  let clientTransport: InMemoryTransport;

  beforeEach(async () => {
    server = new CampaignAgentServer();
    const [cTransport, sTransport] = InMemoryTransport.createLinkedPair();
    clientTransport = cTransport;
    serverTransport = sTransport;
    client = new Client({ name: "test-client", version: "1.0.0" }, { capabilities: {} });
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
