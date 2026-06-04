import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { CampaignAgentServer } from '../src/mcp/server.js';
import fs from 'fs/promises';
import path from 'path';

const FIXTURE = path.join(process.cwd(), 'tests/fixtures/ingest-test.md');
const BRIEF_ID = 'ingest-test';
const SAVED_BRIEF = path.join(process.cwd(), '.campaign', 'briefs', `${BRIEF_ID}.json`);

const VALID_BRIEF = {
  brand: 'Test Brand',
  projectGoal: 'Test Goal',
  artDirection: { visualStyle: 'Modern', colorPalette: ['Blue'], lighting: 'Bright' },
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
      shotType: 'Test Shot Type',
    },
  ],
};

async function connect() {
  const server = new CampaignAgentServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: 'test-client', version: '1.0.0' }, { capabilities: {} });
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

describe('Ingestion Tool (keyless two-phase)', () => {
  beforeEach(async () => {
    await fs.mkdir(path.dirname(FIXTURE), { recursive: true });
    await fs.writeFile(FIXTURE, '# Test Campaign\n\nBrand: Test Brand\n\nShot 1: A subject in a studio.');
  });

  afterEach(async () => {
    await fs.rm(FIXTURE, { force: true }).catch(() => {});
    await fs.rm(SAVED_BRIEF, { force: true }).catch(() => {});
  });

  it('lists the ingest_campaign_doc tool', async () => {
    const client = await connect();
    const tools = await client.listTools();
    expect(tools.tools.some((t) => t.name === 'ingest_campaign_doc')).toBe(true);
  });

  it('phase 1: returns extraction instructions + parsed markdown and saves nothing', async () => {
    const client = await connect();

    const result: any = await client.callTool({
      name: 'ingest_campaign_doc',
      arguments: { path: FIXTURE },
    });

    expect(result.isError).toBeFalsy();
    const joined = result.content.map((c: any) => c.text).join('\n');
    expect(joined).toContain('ingest_campaign_doc'); // instructions reference the save step
    expect(joined).toContain('shotBreakdowns'); // schema skeleton present
    expect(joined).toContain('PARSED DOCUMENT'); // markdown handed back
    expect(joined).toContain('Test Campaign'); // the actual document content

    // Phase 1 must not persist a brief.
    const exists = await fs.stat(SAVED_BRIEF).then(() => true).catch(() => false);
    expect(exists).toBe(false);
  });

  it('phase 2: validates and saves the supplied brief', async () => {
    const client = await connect();

    const result: any = await client.callTool({
      name: 'ingest_campaign_doc',
      arguments: { path: FIXTURE, brief: VALID_BRIEF },
    });

    expect(result.isError).toBeFalsy();
    expect(result.content[0].text).toContain('Brief saved with 1 shot');

    const saved = JSON.parse(await fs.readFile(SAVED_BRIEF, 'utf-8'));
    expect(saved.brand).toBe('Test Brand');
    expect(saved.shotBreakdowns).toHaveLength(1);
  });

  it('phase 2: rejects a structurally invalid brief', async () => {
    const client = await connect();
    const { brand, ...invalid } = VALID_BRIEF as any;

    const result: any = await client.callTool({
      name: 'ingest_campaign_doc',
      arguments: { path: FIXTURE, brief: invalid },
    });

    expect(result.isError).toBe(true);
  });
});
