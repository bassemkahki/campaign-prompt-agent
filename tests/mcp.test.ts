import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { CampaignAgentServer } from '../src/mcp/server.js';

describe('MCP Server', () => {
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

  it('should list the ping tool', async () => {
    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport)
    ]);

    const tools = await client.listTools();
    expect(tools.tools.some(t => t.name === 'ping')).toBe(true);
  });

  it('should return pong from ping tool', async () => {
    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport)
    ]);

    const result = await client.callTool({ name: 'ping', arguments: {} });
    expect(result.content[0].type).toBe('text');
    // @ts-ignore
    expect(result.content[0].text).toContain('pong');
  });

  it('should list the generate_soul_v2_prompt tool', async () => {
    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport)
    ]);

    const tools = await client.listTools();
    expect(tools.tools.some(t => t.name === 'generate_soul_v2_prompt')).toBe(true);
  });

  it('should list the generate_cinema_prompt tool', async () => {
    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport)
    ]);

    const tools = await client.listTools();
    expect(tools.tools.some(t => t.name === 'generate_cinema_prompt')).toBe(true);
  });

  it('should list the check_campaign_readiness tool', async () => {
    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport)
    ]);

    const tools = await client.listTools();
    expect(tools.tools.some(t => t.name === 'check_campaign_readiness')).toBe(true);
  });
});
