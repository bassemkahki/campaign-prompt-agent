import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ConfigService } from '../src/services/config.js';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'config.json');

describe('ConfigService', () => {
  beforeEach(async () => {
    // Ensure config.json doesn't exist before each test
    try {
      await fs.unlink(CONFIG_PATH);
    } catch (e) {
      // Ignore if file doesn't exist
    }
  });

  afterEach(async () => {
    // Cleanup
    try {
      await fs.unlink(CONFIG_PATH);
    } catch (e) {
      // Ignore
    }
  });

  it('should load defaults if config.json is missing', async () => {
    const configService = new ConfigService();
    const config = await configService.getConfig();
    
    expect(config).toBeDefined();
    expect(config.projectName).toBe('Campaign Prompt Agent');
  });

  it('should load values from config.json if present', async () => {
    const mockConfig = {
      projectName: 'Custom Project',
      anthropicApiKey: 'test-key'
    };
    
    await fs.writeFile(CONFIG_PATH, JSON.stringify(mockConfig));
    
    const configService = new ConfigService();
    const config = await configService.getConfig();
    
    expect(config.projectName).toBe('Custom Project');
    expect(config.anthropicApiKey).toBe('test-key');
  });
});
